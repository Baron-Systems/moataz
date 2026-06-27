import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SLOT_MINUTES = 30;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function normalizeDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

function getBlockedRanges(
  schedule: { startTime: string; endTime: string },
  holidays: { isFullDay: boolean; startTime?: string | null; endTime?: string | null }[],
  timeBlocks: { startTime: string; endTime: string }[]
): { start: number; end: number }[] {
  const ranges: { start: number; end: number }[] = [];
  const dayStart = timeToMinutes(schedule.startTime);
  const dayEnd = timeToMinutes(schedule.endTime);

  for (const h of holidays) {
    if (h.isFullDay) {
      ranges.push({ start: dayStart, end: dayEnd });
    } else if (h.startTime && h.endTime) {
      ranges.push({
        start: Math.max(dayStart, timeToMinutes(h.startTime)),
        end: Math.min(dayEnd, timeToMinutes(h.endTime)),
      });
    }
  }

  for (const tb of timeBlocks) {
    ranges.push({
      start: Math.max(dayStart, timeToMinutes(tb.startTime)),
      end: Math.min(dayEnd, timeToMinutes(tb.endTime)),
    });
  }

  return ranges;
}

function isSlotBlocked(slotStart: number, slotEnd: number, blockedRanges: { start: number; end: number }[]): boolean {
  for (const range of blockedRanges) {
    if (slotStart < range.end && slotEnd > range.start) {
      return true;
    }
  }
  return false;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");
    const visitTypeId = searchParams.get("visitTypeId");

    if (!dateStr || !visitTypeId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const date = normalizeDate(dateStr);
    const dayOfWeek = date.getUTCDay();

    const schedule = await prisma.workSchedule.findFirst({
      where: { dayOfWeek, isActive: true },
    });

    if (!schedule) {
      return NextResponse.json({ slots: [] });
    }

    const dayStart = timeToMinutes(schedule.startTime);
    const dayEnd = timeToMinutes(schedule.endTime);

    const holidays = await prisma.holiday.findMany({
      where: {
        startDate: { lte: date },
        endDate: { gte: date },
      },
    });

    const timeBlocks = await prisma.timeBlock.findMany({
      where: { date },
    });

    const blockedRanges = getBlockedRanges(schedule, holidays, timeBlocks);

    // Full day off
    if (blockedRanges.some((r) => r.start === dayStart && r.end === dayEnd)) {
      return NextResponse.json({ slots: [] });
    }

    const visitType = await prisma.visitType.findUnique({
      where: { id: parseInt(visitTypeId) },
    });

    if (!visitType || !visitType.isActive) {
      return NextResponse.json({ slots: [] });
    }

    const requiredSlots = visitType.slotCount || 1;

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date,
        status: { not: "cancelled" },
      },
    });

    // Build a set of occupied slot start times
    const occupiedSlots = new Set<number>();

    // Mark slots covered by blocked ranges
    for (let m = dayStart; m < dayEnd; m += SLOT_MINUTES) {
      if (isSlotBlocked(m, m + SLOT_MINUTES, blockedRanges)) {
        occupiedSlots.add(m);
      }
    }

    // Mark slots covered by existing appointments
    for (const appt of existingAppointments) {
      const apptStart = timeToMinutes(appt.time);
      const apptSlots = appt.slotsReserved || 1;
      for (let i = 0; i < apptSlots; i++) {
        occupiedSlots.add(apptStart + i * SLOT_MINUTES);
      }
    }

    const slots: { time: string; duration: number }[] = [];

    // Check each possible start slot
    for (let m = dayStart; m + requiredSlots * SLOT_MINUTES <= dayEnd; m += SLOT_MINUTES) {
      let free = true;
      for (let i = 0; i < requiredSlots; i++) {
        if (occupiedSlots.has(m + i * SLOT_MINUTES)) {
          free = false;
          break;
        }
      }

      if (free) {
        slots.push({
          time: minutesToTime(m),
          duration: requiredSlots * SLOT_MINUTES,
        });
      }
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Available slots error:", error);
    return NextResponse.json({ error: "Failed to get slots" }, { status: 500 });
  }
}
