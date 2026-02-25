"use client";
import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Trophy, ChevronRight, Filter } from "lucide-react";

const sampleEvents = [
  { id: "1", title: "National Karate Championship 2026", description: "Annual national-level karate tournament open to all belt levels. Kata and kumite divisions.", martialArt: "Karate", date: "March 15, 2026", city: "Mumbai", state: "Maharashtra", ageGroups: ["8-12", "13-17", "18+"], weightClasses: ["Lightweight", "Middleweight", "Heavyweight"], entryFee: "500", spotsLeft: 120, federation: "Karate India" },
  { id: "2", title: "Ring Fight Championship - Delhi", description: "International Ring Fight Federation sanctioned event. Professional and amateur divisions.", martialArt: "MMA", date: "April 2, 2026", city: "New Delhi", state: "Delhi", ageGroups: ["18+"], weightClasses: ["Flyweight", "Bantamweight", "Featherweight", "Lightweight", "Welterweight", "Middleweight", "Heavyweight"], entryFee: "1,000", spotsLeft: 64, federation: "Ring Fight" },
  { id: "3", title: "South India Taekwondo Open", description: "Regional championship featuring poomsae and sparring events.", martialArt: "Taekwondo", date: "April 20, 2026", city: "Chennai", state: "Tamil Nadu", ageGroups: ["10-14", "15-18", "19+"], weightClasses: ["Fin", "Fly", "Bantam", "Feather", "Light", "Welter", "Middle", "Heavy"], entryFee: "400", spotsLeft: 200, federation: "Taekwondo Federation of India" },
  { id: "4", title: "Jiu-Jitsu Grand Prix - Bangalore", description: "Gi and No-Gi divisions. All belt levels welcome.", martialArt: "Jiu-Jitsu", date: "May 10, 2026", city: "Bangalore", state: "Karnataka", ageGroups: ["16+"], weightClasses: ["Rooster", "Light Feather", "Feather", "Light", "Middle", "Medium Heavy", "Heavy", "Super Heavy", "Ultra Heavy"], entryFee: "800", spotsLeft: 80, federation: null },
];

export default function EventsPage() {
  const [filter, setFilter] = useState("All");
  const arts = ["All", ...new Set(sampleEvents.map(e => e.martialArt))];
  const filtered = filter === "All" ? sampleEvents : sampleEvents.filter(e => e.martialArt === filter);

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
            <button
              key={art}
              onClick={() => setFilter(art)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === art ? "bg-orange text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-orange/30"}`}
              data-testid={`filter-${art.toLowerCase().replace(/\s/g, "-")}`}
            >
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
                    <span className="text-xs font-bold text-orange uppercase">{event.date.split(" ")[0].slice(0, 3)}</span>
                    <span className="text-lg font-bold text-navy">{event.date.split(" ")[1].replace(",", "")}</span>
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
