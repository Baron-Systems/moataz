import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const schedule = await prisma.workSchedule.findMany({
      orderBy: { dayOfWeek: "asc" },
    });
    return NextResponse.json(schedule);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { dayOfWeek, startTime, endTime, isActive } = body;

    if (dayOfWeek === undefined || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.workSchedule.findFirst({
      where: { dayOfWeek: parseInt(dayOfWeek) },
    });

    if (existing) {
      const updated = await prisma.workSchedule.update({
        where: { id: existing.id },
        data: { startTime, endTime, isActive: isActive ?? true },
      });
      return NextResponse.json(updated);
    }

    const created = await prisma.workSchedule.create({
      data: {
        dayOfWeek: parseInt(dayOfWeek),
        startTime,
        endTime,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save work schedule" }, { status: 500 });
  }
}
