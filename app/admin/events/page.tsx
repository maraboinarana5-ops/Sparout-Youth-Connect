"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Calendar, MapPin, Edit, Trash2 } from "lucide-react";

const events = [
  { id: "1", title: "National Karate Championship 2026", date: "March 15, 2026", city: "Mumbai", martialArt: "Karate", participants: 180, maxParticipants: 300, status: "upcoming" },
  { id: "2", title: "Ring Fight Championship - Delhi", date: "April 2, 2026", city: "New Delhi", martialArt: "MMA", participants: 64, maxParticipants: 128, status: "upcoming" },
  { id: "3", title: "South India Taekwondo Open", date: "April 20, 2026", city: "Chennai", martialArt: "Taekwondo", participants: 100, maxParticipants: 200, status: "upcoming" },
  { id: "4", title: "Jiu-Jitsu Grand Prix - Bangalore", date: "May 10, 2026", city: "Bangalore", martialArt: "Jiu-Jitsu", participants: 50, maxParticipants: 80, status: "upcoming" },
];

export default function AdminEventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-3" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-page-title">Event Management</h1>
              <p className="text-white/60 text-sm mt-1">{events.length} events</p>
            </div>
            <button className="px-4 py-2 bg-orange text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2" data-testid="button-add-event">
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl border border-gray-100 p-5" data-testid={`event-row-${event.id}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange/10 flex flex-col items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">{event.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                      <span>{event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.city}</span>
                      <span>{event.martialArt}</span>
                      <span>{event.participants}/{event.maxParticipants} registered</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/events/${event.id}`} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                    <Edit className="w-3 h-3" /> Edit
                  </Link>
                  <button className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1" data-testid={`button-delete-${event.id}`}>
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
