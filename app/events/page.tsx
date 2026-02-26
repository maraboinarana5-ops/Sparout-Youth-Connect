import { prisma } from "@/lib/prisma";
import EventsClient from "./events-client";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    include: { federation: true },
    orderBy: { createdAt: "asc" },
  });

  const eventsData = events.map((e) => ({
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

  return <EventsClient events={eventsData} />;
}
