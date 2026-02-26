import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
    include: { federation: true },
  });

  if (!event) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: String(event.id),
    title: event.title,
    description: event.description ?? "",
    martialArt: event.martialArt,
    date: event.date,
    city: event.city,
    state: event.state,
    ageGroups: event.ageGroups,
    weightClasses: event.weightClasses,
    entryFee: event.entryFee ?? "0",
    spotsLeft: event.spotsLeft ?? 0,
    federation: event.federation?.name ?? null,
    federationUrl: event.federation?.websiteUrl ?? null,
  });
}
