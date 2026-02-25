"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Send, Check, MessageCircle } from "lucide-react";

const martialArtOptions = ["Karate", "MMA", "Jiu-Jitsu", "Taekwondo", "Boxing", "Muay Thai", "Kung Fu", "Krav Maga", "Judo", "Wrestling", "Kickboxing", "Kalaripayattu", "Other"];

function BookingsContent() {
  const searchParams = useSearchParams();
  const masterUsername = searchParams.get("master") || "";
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [martialArt, setMartialArt] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-navy mb-2" data-testid="text-booking-confirmed">Booking Request Sent!</h1>
          <p className="text-gray-500 mb-6">
            Your session request has been sent to the master. You'll receive a confirmation once they accept.
          </p>
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 text-left text-sm space-y-2">
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium text-orange">Pending</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium text-navy">{preferredDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium text-navy">{preferredTime}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Martial Art</span><span className="font-medium text-navy">{martialArt}</span></div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/masters" className="w-full py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-center" data-testid="button-browse-more">Browse More Masters</Link>
            <Link href="/" className="w-full py-3 bg-gray-100 text-navy font-semibold rounded-lg hover:bg-gray-200 transition-colors text-center" data-testid="button-go-home">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href={masterUsername ? `/master/${masterUsername}` : "/masters"} className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-3" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Book a Session</h1>
          <p className="text-white/60 text-sm mt-1">Send a booking request to the master</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-email" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Session Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Martial Art Interested In</label>
                <select value={martialArt} onChange={(e) => setMartialArt(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="select-martial-art">
                  <option value="">Select a martial art</option>
                  {martialArtOptions.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Preferred Date</label>
                  <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Preferred Time</label>
                  <input type="time" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-time" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Message (optional)</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell the master about your goals, experience level, or any questions..." rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent resize-none" data-testid="input-message" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2" data-testid="button-submit-booking">
            Send Booking Request <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <BookingsContent />
    </Suspense>
  );
}
