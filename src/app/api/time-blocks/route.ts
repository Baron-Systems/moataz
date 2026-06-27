import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

function normalizeDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

export async function GET() {
  try {
    const blocks = await prisma.timeBlock.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(blocks);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { title, date, startTime, endTime } = body;

    if (!title || !date || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const block = await prisma.timeBlock.create({
      data: {
        title,
        date: normalizeDate(date),
        startTime,
        endTime,
      },
    });

    return NextResponse.json(block, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create time block" }, { status: 500 });
  }
}
