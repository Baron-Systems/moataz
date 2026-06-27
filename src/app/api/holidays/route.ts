import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

function normalizeDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

export async function GET() {
  try {
    const holidays = await prisma.holiday.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(holidays);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { title, startDate, endDate, isFullDay, startTime, endTime } = body;

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const holiday = await prisma.holiday.create({
      data: {
        title,
        startDate: normalizeDate(startDate),
        endDate: normalizeDate(endDate),
        isFullDay: isFullDay ?? true,
        startTime: isFullDay ? null : startTime,
        endTime: isFullDay ? null : endTime,
      },
    });

    return NextResponse.json(holiday, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create holiday" }, { status: 500 });
  }
}
