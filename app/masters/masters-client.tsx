"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Star, Shield, MapPin, Filter } from "lucide-react";

type Master = {
  id: number;
  username: string;
  name: string;
  styles: string[];
  city: string;
  state: string;
  rating: number;
  reviews: number;
  price: number;
  experience: number;
  verified: boolean;
  format: string;
  bio: string;
  isFeatured: boolean;
};

const allStyles = ["All Styles", "Karate", "MMA", "Jiu-Jitsu", "Taekwondo", "Boxing", "Muay Thai", "Kung Fu", "Krav Maga", "Judo", "Wrestling", "Kickboxing", "Kalaripayattu", "Silambam", "Gatka", "Ring Fight"];
const indianCities = ["All Cities", "Mumbai", "Delhi", "Hyderabad", "Bangalore", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Amritsar"];
const formats = ["All Formats", "In-Person", "Online", "Group Class", "Private Session"];
const sortOptions = ["Rating: High to Low", "Price: Low to High", "Price: High to Low", "Most Experienced", "Newest"];

export default function MastersClient({ masters }: { masters: Master[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [styleFilter, setStyleFilter] = useState("All Styles");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [formatFilter, setFormatFilter] = useState("All Formats");
  const [sortBy, setSortBy] = useState("Rating: High to Low");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = masters
    .filter((m) => {
      const matchSearch = !searchTerm || m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.city.toLowerCase().includes(searchTerm.toLowerCase()) || m.styles.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchStyle = styleFilter === "All Styles" || m.styles.includes(styleFilter);
      const matchCity = cityFilter === "All Cities" || m.city === cityFilter;
      const matchFormat = formatFilter === "All Formats" || m.format === formatFilter;
      return matchSearch && matchStyle && matchCity && matchFormat;
    })
    .sort((a, b) => {
      if (sortBy === "Rating: High to Low") return b.rating - a.rating;
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Most Experienced") return b.experience - a.experience;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Find Your Master</h1>
          <p className="text-white/60 mb-6">Browse verified martial arts instructors across India</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by name, martial art, or city..." className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} data-testid="input-search" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium" data-testid="button-toggle-filters">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <select value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="select-style">
                {allStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="select-city">
                {indianCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={formatFilter} onChange={(e) => setFormatFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="select-format">
                {formats.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="select-sort">
                {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-4" data-testid="text-result-count">{filtered.length} masters found</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((master) => (
            <Link key={master.id} href={`/master/${master.username}`} data-testid={`card-master-${master.id}`}>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-navy-300 to-navy flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-orange/20 flex items-center justify-center text-orange text-xl font-bold">
                    {master.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-semibold text-navy truncate">{master.name}</h3>
                    {master.verified && <Shield className="w-4 h-4 text-orange flex-shrink-0" />}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {master.styles.map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{s}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{master.bio}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{master.city}, {master.state}</span>
                    <span className="text-gray-300">|</span>
                    <span>{master.experience}yr exp</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-semibold text-navy">{master.rating}</span>
                      <span className="text-xs text-gray-400">({master.reviews})</span>
                    </div>
                    <span className="text-sm font-bold text-navy">&#8377;{master.price}<span className="text-xs font-normal text-gray-400">/session</span></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy mb-1">No masters found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
