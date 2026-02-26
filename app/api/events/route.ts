import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany({
    include: { federation: true },
    orderBy: { createdAt: "desc" },
  });

  const result = events.map((e) => ({
    id: String(e.id),
    title: e.title,
    description: e.description ?? "",
    martialArt: e.martialArt,
    date: e.date,
    city: e.city,
    state: e.state,
    ageGroups: e.ageGroups,
    weightClasses: e.weightClasses,
    entryFee: e.entryFee ?? "0",
    spotsLeft: e.spotsLeft ?? 0,
    federation: e.federation?.name ?? null,
  }));

  return NextResponse.json(result);
}
