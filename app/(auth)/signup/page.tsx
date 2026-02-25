"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const roles = [
  { id: "student", label: "Student", desc: "I want to learn martial arts" },
  { id: "master", label: "Master / Coach", desc: "I want to teach and find students" },
  { id: "parent", label: "Parent", desc: "I want to manage my child's training" },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    setStep(2);
  };

  const handleStepTwo = () => {
    if (!role) return;
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-orange mx-auto flex items-center justify-center font-bold text-white text-lg mb-4">S</div>
          <h1 className="text-2xl font-bold text-navy" data-testid="text-signup-title">
            {step === 1 ? "Create Your Account" : step === 2 ? "Choose Your Role" : "You're All Set!"}
          </h1>
          <p className="text-gray-500 mt-1">
            {step === 1 ? "Start your martial arts journey today" : step === 2 ? "How will you use Sparout?" : "Welcome to the Sparout community"}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6 max-w-xs mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-orange text-white" : "bg-gray-200 text-gray-500"}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 rounded ${step > s ? "bg-orange" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {step === 1 && (
            <form onSubmit={handleStepOne} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent pr-10" required minLength={6} data-testid="input-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2" data-testid="button-next">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${role === r.id ? "border-orange bg-orange/5" : "border-gray-100 hover:border-gray-200"}`}
                  data-testid={`role-${r.id}`}
                >
                  <div className="font-semibold text-navy text-sm">{r.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                </button>
              ))}
              <button
                onClick={handleStepTwo}
                disabled={!role}
                className="w-full py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                data-testid="button-complete"
              >
                Complete Setup <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">Account Created!</h3>
              <p className="text-sm text-gray-500 mb-6">Welcome to Sparout, {fullName}. You're registered as a {role}.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors" data-testid="button-go-home">
                Go to Homepage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-orange hover:text-orange-600" data-testid="link-login">Log In</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
