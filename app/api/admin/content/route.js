import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await req.json();
  const { heroTitle, heroSubtitle, description } = body;

  if (!heroTitle || !heroSubtitle || !description) {
    return NextResponse.json(
      { error: "Title, subtitle, and description are all required." },
      { status: 400 }
    );
  }

  const content = await prisma.siteContent.upsert({
    where: { id: "main" },
    update: { heroTitle, heroSubtitle, description },
    create: { id: "main", heroTitle, heroSubtitle, description },
  });

  return NextResponse.json(content);
}
