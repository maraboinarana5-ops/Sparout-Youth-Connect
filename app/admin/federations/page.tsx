"use client";
import Link from "next/link";
import { ArrowLeft, Plus, Award, Globe, Star, Edit, Trash2 } from "lucide-react";

const federations = [
  { id: 1, name: "Ring Fight", description: "International Ring Fight Federation", websiteUrl: "https://singular-frangipane-2925f4.netlify.app/", featured: true, events: 3 },
  { id: 2, name: "Karate India", description: "National governing body for Karate in India", websiteUrl: "#", featured: false, events: 5 },
  { id: 3, name: "Taekwondo Federation of India", description: "Official Taekwondo federation affiliated with World Taekwondo", websiteUrl: "#", featured: false, events: 2 },
];

export default function AdminFederationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-3" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-page-title">Federation Management</h1>
              <p className="text-white/60 text-sm mt-1">{federations.length} partner federations</p>
            </div>
            <button className="px-4 py-2 bg-orange text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2" data-testid="button-add-federation">
              <Plus className="w-4 h-4" /> Add Federation
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {federations.map((fed) => (
            <div key={fed.id} className={`bg-white rounded-xl border p-5 ${fed.featured ? "border-orange/30" : "border-gray-100"}`} data-testid={`federation-row-${fed.id}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${fed.featured ? "bg-orange/10" : "bg-gray-100"}`}>
                    <Award className={`w-6 h-6 ${fed.featured ? "text-orange" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-navy">{fed.name}</h3>
                      {fed.featured && <Star className="w-4 h-4 text-gold fill-gold" />}
                    </div>
                    <div className="text-sm text-gray-500">{fed.description} &middot; {fed.events} events</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${fed.featured ? "bg-gold/10 text-gold border border-gold/30" : "bg-gray-100 text-gray-500"}`} data-testid={`button-feature-${fed.id}`}>
                    <Star className="w-3 h-3 inline mr-1" /> {fed.featured ? "Featured" : "Feature"}
                  </button>
                  <a href={fed.websiteUrl} target="_blank" className="px-3 py-1.5 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Website
                  </a>
                  <button className="px-3 py-1.5 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-3 h-3" />
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
