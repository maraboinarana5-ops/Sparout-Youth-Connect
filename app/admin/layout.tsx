"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("sparout_admin_auth");
    if (adminAuth === "true") {
      setIsAuthed(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!isAuthed) {
    return <AdminGate onSuccess={() => setIsAuthed(true)} />;
  }

  return <>{children}</>;
}

function AdminGate({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@sparout.com" && password === "admin123") {
      sessionStorage.setItem("sparout_admin_auth", "true");
      onSuccess();
    } else {
      setError("Invalid admin credentials. Access denied.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-orange" />
          </div>
          <h1 className="text-2xl font-bold text-navy" data-testid="text-admin-gate-title">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-1">This area is restricted to authorized administrators</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg" data-testid="text-admin-error">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              placeholder="admin@sparout.com"
              required
              data-testid="input-admin-email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              placeholder="Enter admin password"
              required
              data-testid="input-admin-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-navy text-white font-semibold rounded-lg hover:bg-navy-400 transition-colors"
            data-testid="button-admin-login"
          >
            Access Admin Panel
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Not an admin? <Link href="/" className="text-orange hover:underline">Go back to homepage</Link>
        </p>
      </div>
    </div>
  );
}
