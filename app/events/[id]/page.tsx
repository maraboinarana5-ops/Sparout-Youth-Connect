import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EventDetailClient from "./event-detail-client";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const eventId = parseInt(id);
  if (isNaN(eventId)) notFound();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { federation: true },
  });

  if (!event) notFound();

  return (
    <EventDetailClient
      event={{
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
      }}
    />
  );
}
