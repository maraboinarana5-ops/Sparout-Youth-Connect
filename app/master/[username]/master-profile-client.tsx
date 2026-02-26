"use client";
import Link from "next/link";
import { ArrowLeft, Star, Shield, MapPin, Clock, Users, Award, Phone, Mail, MessageCircle, Check } from "lucide-react";

type MasterData = {
  username: string;
  name: string;
  styles: string[];
  city: string;
  state: string;
  rating: number;
  totalReviews: number;
  price: number;
  priceMonthly: number;
  experience: number;
  verified: boolean;
  students: number;
  bio: string;
  certifications: string[];
  formats: string[];
  phone: string;
  whatsapp: string;
  email: string;
  schedule: { day: string; time: string }[];
  reviewsList: { name: string; rating: number; text: string; date: string }[];
};

export default function MasterProfileClient({ master }: { master: MasterData }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-navy via-navy-400 to-navy-300">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 left-4 z-10">
          <Link href="/masters" className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-black/50 transition-colors" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-28">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6" data-testid="card-master-info">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-24 h-24 rounded-xl bg-orange/10 flex items-center justify-center text-orange text-3xl font-bold flex-shrink-0 -mt-14 border-4 border-white shadow-md">
              {master.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-navy" data-testid="text-master-name">{master.name}</h1>
                {master.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange/10 text-orange text-xs font-semibold rounded-full">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {master.styles.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-navy/5 text-navy rounded-full font-medium">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5" /> {master.city}, {master.state}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <Clock className="w-5 h-5 text-orange mx-auto mb-1" />
              <div className="text-lg font-bold text-navy">{master.experience}</div>
              <div className="text-xs text-gray-500">Years Exp.</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <Users className="w-5 h-5 text-orange mx-auto mb-1" />
              <div className="text-lg font-bold text-navy">{master.students}</div>
              <div className="text-xs text-gray-500">Students</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <Star className="w-5 h-5 text-gold fill-gold mx-auto mb-1" />
              <div className="text-lg font-bold text-navy">{master.rating}</div>
              <div className="text-xs text-gray-500">{master.totalReviews} reviews</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50">
              <Award className="w-5 h-5 text-orange mx-auto mb-1" />
              <div className="text-lg font-bold text-navy">{master.certifications.length}</div>
              <div className="text-xs text-gray-500">Certifications</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">About</h2>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line" data-testid="text-bio">{master.bio}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Certifications</h2>
          <div className="space-y-2">
            {master.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" /> {cert}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Training Formats</h2>
          <div className="flex flex-wrap gap-2">
            {master.formats.map((f) => (
              <span key={f} className="px-3 py-1.5 bg-orange/10 text-orange text-sm font-medium rounded-lg">{f}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">Per Session</div>
              <div className="text-2xl font-bold text-navy">&#8377;{master.price}</div>
            </div>
            <div className="p-4 rounded-lg border border-orange/30 bg-orange/5">
              <div className="text-sm text-gray-500 mb-1">Monthly</div>
              <div className="text-2xl font-bold text-orange">&#8377;{master.priceMonthly}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Schedule</h2>
          <div className="space-y-2">
            {master.schedule.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 text-sm">
                <span className="font-medium text-navy">{s.day}</span>
                <span className="text-gray-500">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-3">Contact</h2>
          <div className="space-y-3">
            <a href={`tel:${master.phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors" data-testid="link-phone">
              <Phone className="w-4 h-4 text-orange" /> {master.phone}
            </a>
            <a href={`mailto:${master.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors" data-testid="link-email">
              <Mail className="w-4 h-4 text-orange" /> {master.email}
            </a>
            <a href={`https://wa.me/${master.whatsapp?.replace(/\s+/g, "").replace("+", "")}`} target="_blank" className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy transition-colors" data-testid="link-whatsapp">
              <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-4">Reviews ({master.totalReviews})</h2>
          <div className="space-y-4">
            {master.reviewsList.map((r, i) => (
              <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0" data-testid={`review-${i}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-xs font-bold text-orange">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-navy">{r.name}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < r.rating ? "text-gold fill-gold" : "text-gray-200"}`} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">{r.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-[999]" data-testid="sticky-book-bar">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-gray-500">Starting at</div>
            <div className="text-xl font-bold text-navy">&#8377;{master.price}<span className="text-xs font-normal text-gray-400">/session</span></div>
          </div>
          <Link href={`/bookings?master=${master.username}`} className="px-8 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors" data-testid="button-book-session">
            Book a Session
          </Link>
        </div>
      </div>
    </div>
  );
}
