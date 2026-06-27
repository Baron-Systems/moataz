import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SLOT_MINUTES = 30;

function normalizeDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function addMinutes(time: string, minutes: number): string {
  return minutesToTime(timeToMinutes(time) + minutes);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    const where: { date?: Date; status?: string } = {};
    if (date) {
      where.date = normalizeDate(date);
    }
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, visitTypeId, date, time, description } = body;

    if (!fullName || !phone || !visitTypeId || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (fullName.length > 50) {
      return NextResponse.json({ error: "Name must be 50 characters or less" }, { status: 400 });
    }

    if (phone.length > 13) {
      return NextResponse.json({ error: "Phone must be 13 characters or less" }, { status: 400 });
    }

    const visitType = await prisma.visitType.findUnique({
      where: { id: parseInt(visitTypeId) },
    });

    if (!visitType) {
      return NextResponse.json({ error: "Invalid visit type" }, { status: 400 });
    }

    const appointmentDate = normalizeDate(date);
    const slotsReserved = visitType.slotCount || 1;
    const startMinutes = timeToMinutes(time);
    const endMinutes = startMinutes + slotsReserved * SLOT_MINUTES;

    // Check for conflicts with any occupied slot in the range
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        date: appointmentDate,
        status: { not: "cancelled" },
      },
    });

    for (const appt of existingAppointments) {
      const apptStart = timeToMinutes(appt.time);
      const apptEnd = apptStart + (appt.slotsReserved || 1) * SLOT_MINUTES;
      if (startMinutes < apptEnd && endMinutes > apptStart) {
        return NextResponse.json({ error: "Time slot already booked" }, { status: 409 });
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        fullName,
        phone,
        visitType: visitType.name,
        date: appointmentDate,
        time,
        slotsReserved,
        description: description || "",
        status: "pending",
      },
    });

    // Generate WhatsApp notification URL
    let whatsappUrl = "";
    try {
      const doctorPhone = process.env.DOCTOR_WHATSAPP || "972568507260";
      const formattedDate = new Date(date).toLocaleDateString("ar-SA");
      const endTime = addMinutes(time, slotsReserved * SLOT_MINUTES);
      const message = `📅 حجز جديد - مركز D.F.C

👤 الاسم: ${fullName}
📱 الجوال: ${phone}
🩺 نوع الزيارة: ${visitType.name}
📆 التاريخ: ${formattedDate}
🕒 الوقت: ${time} - ${endTime}
📝 وصف الحالة: ${description || "لا يوجد"}`;

      whatsappUrl = `https://wa.me/${doctorPhone}?text=${encodeURIComponent(message)}`;
    } catch {
      // Silent fail - don't block booking if notification fails
    }

    return NextResponse.json({ appointment, whatsappUrl }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
