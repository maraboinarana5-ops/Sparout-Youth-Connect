"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, MapPin, Calendar, Shield, Camera, BookOpen, Users } from "lucide-react";

const martialArtsOptions = ["Karate", "MMA", "Jiu-Jitsu", "Taekwondo", "Boxing", "Muay Thai", "Kung Fu", "Krav Maga", "Judo", "Wrestling", "Kickboxing", "Kalaripayattu", "Silambam", "Gatka"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("student");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [goals, setGoals] = useState("");
  const [bio, setBio] = useState("");

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
  };

  const totalSteps = role === "master" ? 4 : 3;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-orange mx-auto flex items-center justify-center font-bold text-white text-lg mb-4">S</div>
          <h1 className="text-2xl font-bold text-navy" data-testid="text-onboarding-title">Complete Your Profile</h1>
          <p className="text-gray-500 mt-1">Step {step} of {totalSteps}</p>
        </div>

        <div className="flex items-center gap-2 mb-6 max-w-xs mx-auto">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-orange text-white" : "bg-gray-200 text-gray-500"}`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < totalSteps - 1 && <div className={`flex-1 h-1 rounded ${step > i + 1 ? "bg-green-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy mb-2">Location</h2>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Mumbai" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-city" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">State</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g., Maharashtra" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-state" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy mb-2">Martial Arts Interests</h2>
              <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 gap-2">
                {martialArtsOptions.map((art) => (
                  <button
                    key={art}
                    onClick={() => toggleStyle(art)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                      selectedStyles.includes(art) ? "bg-orange text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                    data-testid={`style-${art.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {art}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && role !== "master" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy mb-2">About You</h2>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Experience Level</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="select-experience">
                  <option value="">Select level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3-5 years)</option>
                  <option value="expert">Expert (5+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Goals</label>
                <textarea value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="What do you want to achieve?" rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent resize-none" data-testid="input-goals" />
              </div>
            </div>
          )}

          {step === 3 && role === "master" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-navy mb-2">Teaching Details</h2>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Years of Experience</label>
                <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g., 10" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-experience" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell students about yourself and your teaching style..." rows={4} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent resize-none" data-testid="input-bio" />
              </div>
            </div>
          )}

          {step === 4 && role === "master" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Profile Complete!</h3>
              <p className="text-sm text-gray-500 mb-2">Your profile is under review for verification.</p>
              <p className="text-xs text-gray-400 mb-6">You'll receive a notification once approved.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors" data-testid="button-go-home">
                Go to Homepage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {step === 3 && role !== "master" && (
            <div className="mt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors" data-testid="button-go-home">
                Start Exploring <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {!((step === 3 && role !== "master") || (step === 4 && role === "master")) && (
            <div className="flex items-center justify-between mt-6">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-navy transition-colors" data-testid="button-prev">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm flex items-center gap-2"
                data-testid="button-next"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
