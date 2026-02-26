"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Users, Trophy, ChevronRight } from "lucide-react";

type EventItem = {
  id: string;
  title: string;
  description: string;
  martialArt: string;
  date: string;
  city: string;
  state: string;
  ageGroups: string[];
  weightClasses: string[];
  entryFee: string;
  spotsLeft: number;
  federation: string | null;
};

export default function EventsClient({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState("All");
  const arts = ["All", ...new Set(events.map(e => e.martialArt))];
  const filtered = filter === "All" ? events : events.filter(e => e.martialArt === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-orange" />
            <h1 className="text-3xl font-bold" data-testid="text-page-title">Events & Tournaments</h1>
          </div>
          <p className="text-white/60">Upcoming competitions and events across India</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {arts.map((art) => (
            <button key={art} onClick={() => setFilter(art)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === art ? "bg-orange text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-orange/30"}`} data-testid={`filter-${art.toLowerCase().replace(/\s/g, "-")}`}>
              {art}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} data-testid={`card-event-${event.id}`}>
              <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-orange/10 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange uppercase">{event.date.split(" ")[0]?.slice(0, 3)}</span>
                    <span className="text-lg font-bold text-navy">{event.date.split(" ")[1]?.replace(",", "")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-navy">{event.title}</h3>
                      <span className="text-xs px-2 py-0.5 bg-navy/5 text-navy rounded-full">{event.martialArt}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.city}, {event.state}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.spotsLeft} spots</span>
                      <span>Entry: &#8377;{event.entryFee}</span>
                      {event.federation && <span className="text-orange font-medium">{event.federation}</span>}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
