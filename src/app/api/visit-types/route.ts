import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const types = await prisma.visitType.findMany({
      where: { isActive: true },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(types);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, slotCount, isActive } = body;

    if (!name || !slotCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const type = await prisma.visitType.create({
      data: {
        name,
        slotCount: parseInt(slotCount),
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(type, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create visit type" }, { status: 500 });
  }
}
