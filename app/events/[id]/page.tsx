"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Trophy, Clock, Check, ChevronRight } from "lucide-react";

const eventsData: Record<string, any> = {
  "1": { title: "National Karate Championship 2026", description: "Annual national-level karate tournament open to all belt levels. Featuring kata and kumite divisions with experienced referees. This is the premier karate event in India, attracting participants from all states.", martialArt: "Karate", date: "March 15, 2026", endDate: "March 17, 2026", city: "Mumbai", state: "Maharashtra", ageGroups: ["8-12", "13-17", "18+"], weightClasses: ["Lightweight (Under 60kg)", "Middleweight (60-75kg)", "Heavyweight (75kg+)"], entryFee: "500", contactInfo: "karateindia@email.com | +91 98765 43210", spotsLeft: 120, maxParticipants: 300, federation: "Karate India", rules: "All participants must wear approved protective gear. Kata and kumite will be judged by WKF-certified referees. Each match is 3 minutes with 1-minute overtime if needed." },
  "2": { title: "Ring Fight Championship - Delhi", description: "International Ring Fight Federation sanctioned event. Professional and amateur divisions available. This is the flagship event of the Ring Fight Federation in India.", martialArt: "MMA", date: "April 2, 2026", endDate: "April 3, 2026", city: "New Delhi", state: "Delhi", ageGroups: ["18+"], weightClasses: ["Flyweight (57kg)", "Bantamweight (61kg)", "Featherweight (66kg)", "Lightweight (70kg)", "Welterweight (77kg)", "Middleweight (84kg)", "Heavyweight (93kg+)"], entryFee: "1,000", contactInfo: "ringfight@email.com | +91 87654 32109", spotsLeft: 64, maxParticipants: 128, federation: "Ring Fight", rules: "Standard Ring Fight rules apply. 3 rounds of 5 minutes each. Striking and grappling allowed. No elbows to the head." },
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [interested, setInterested] = useState(false);
  const event = eventsData[params.id];

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-navy mb-2">Event not found</h2>
          <Link href="/events" className="text-orange hover:underline">Browse all events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/events" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-4" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 bg-orange/20 text-orange rounded-full font-medium">{event.martialArt}</span>
            {event.federation && <span className="text-xs px-2 py-0.5 bg-white/10 text-white/70 rounded-full">{event.federation}</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-event-title">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-600 leading-relaxed mb-6">{event.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange" />
              <div>
                <div className="text-xs text-gray-500">Date</div>
                <div className="text-sm font-medium text-navy">{event.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange" />
              <div>
                <div className="text-xs text-gray-500">Location</div>
                <div className="text-sm font-medium text-navy">{event.city}, {event.state}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange" />
              <div>
                <div className="text-xs text-gray-500">Spots Left</div>
                <div className="text-sm font-medium text-navy">{event.spotsLeft} / {event.maxParticipants}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-orange" />
              <div>
                <div className="text-xs text-gray-500">Entry Fee</div>
                <div className="text-sm font-medium text-navy">&#8377;{event.entryFee}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Age Groups</h2>
          <div className="flex flex-wrap gap-2">
            {event.ageGroups.map((ag: string) => (
              <span key={ag} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">{ag}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Weight Classes</h2>
          <div className="flex flex-wrap gap-2">
            {event.weightClasses.map((wc: string) => (
              <span key={wc} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">{wc}</span>
            ))}
          </div>
        </div>

        {event.rules && (
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-navy mb-3">Rules & Guidelines</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{event.rules}</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Contact</h2>
          <p className="text-sm text-gray-600">{event.contactInfo}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setInterested(!interested)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors text-sm ${interested ? "bg-navy text-white" : "bg-white border-2 border-navy text-navy hover:bg-navy/5"}`}
            data-testid="button-interested"
          >
            {interested ? "Interested" : "Mark as Interested"}
          </button>
          <Link
            href={event.registrationUrl || "#"}
            className="flex-1 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm text-center"
            data-testid="button-register"
          >
            Register Now - &#8377;{event.entryFee}
          </Link>
        </div>
      </div>
    </div>
  );
}
