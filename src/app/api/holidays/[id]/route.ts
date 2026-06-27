import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

function normalizeDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, startDate, endDate, isFullDay, startTime, endTime } = body;

    const holiday = await prisma.holiday.update({
      where: { id: parseInt(id) },
      data: {
        title,
        startDate: normalizeDate(startDate),
        endDate: normalizeDate(endDate),
        isFullDay: isFullDay ?? true,
        startTime: isFullDay ? null : startTime,
        endTime: isFullDay ? null : endTime,
      },
    });

    return NextResponse.json(holiday);
  } catch {
    return NextResponse.json({ error: "Failed to update holiday" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.holiday.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete holiday" }, { status: 500 });
  }
}
