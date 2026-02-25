"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Shield, Star, MapPin, Check, X, Eye } from "lucide-react";

const masters = [
  { id: 1, name: "Sensei Rajesh Kumar", username: "sensei-rajesh", style: "Karate", city: "Mumbai", rating: 4.9, students: 45, verified: true, featured: true, status: "active" },
  { id: 2, name: "Coach Priya Sharma", username: "coach-priya", style: "MMA", city: "Hyderabad", rating: 4.8, students: 32, verified: true, featured: false, status: "active" },
  { id: 3, name: "Guru Ravi Nair", username: "guru-ravi", style: "Kalaripayattu", city: "Chennai", rating: 4.7, students: 60, verified: true, featured: true, status: "active" },
  { id: 4, name: "Coach Deepak Rao", username: "coach-deepak", style: "Boxing", city: "Chennai", rating: 0, students: 0, verified: false, featured: false, status: "pending" },
  { id: 5, name: "Guru Meera Devi", username: "guru-meera", style: "Kalaripayattu", city: "Kochi", rating: 0, students: 0, verified: false, featured: false, status: "pending" },
];

export default function AdminMastersPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? masters : filter === "Verified" ? masters.filter(m => m.verified) : filter === "Pending" ? masters.filter(m => !m.verified) : masters.filter(m => m.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-3" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Master Management</h1>
          <p className="text-white/60 text-sm mt-1">Verify, feature, and manage masters</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6">
          {["All", "Verified", "Pending", "Featured"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-orange text-white" : "bg-white text-gray-600 border border-gray-200"}`} data-testid={`filter-${f.toLowerCase()}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((master) => (
            <div key={master.id} className="bg-white rounded-xl border border-gray-100 p-5" data-testid={`master-row-${master.id}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange font-bold">
                    {master.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-navy">{master.name}</h3>
                      {master.verified && <Shield className="w-4 h-4 text-orange" />}
                      {master.featured && <Star className="w-4 h-4 text-gold fill-gold" />}
                    </div>
                    <div className="text-sm text-gray-500">{master.style} &middot; {master.city} &middot; {master.students} students</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!master.verified && (
                    <>
                      <button className="px-3 py-1.5 text-xs font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1" data-testid={`button-verify-${master.id}`}>
                        <Check className="w-3 h-3" /> Verify
                      </button>
                      <button className="px-3 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1" data-testid={`button-reject-${master.id}`}>
                        <X className="w-3 h-3" /> Reject
                      </button>
                    </>
                  )}
                  <button className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${master.featured ? "bg-gold/10 text-gold border border-gold/30" : "bg-gray-100 text-gray-500"}`} data-testid={`button-feature-${master.id}`}>
                    <Star className="w-3 h-3" /> {master.featured ? "Featured" : "Feature"}
                  </button>
                  <Link href={`/master/${master.username}`} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                    <Eye className="w-3 h-3" /> View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
