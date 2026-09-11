import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const bookings = await prisma.booking.findMany({
    include: { plan: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}

export async function PATCH(req) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await req.json();
  const { id, status } = body;
  const allowed = ["Requested", "Confirmed", "Completed", "Cancelled"];

  if (!id || !allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid id or status." }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}
