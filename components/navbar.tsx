"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/masters", label: "Browse Masters" },
  { href: "/events", label: "Events" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center font-bold text-white text-sm">S</div>
            <span className="text-xl font-bold tracking-tight">Sparout</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10"
                data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
              data-testid="link-login"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-semibold bg-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
              data-testid="link-signup"
            >
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy-600">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                href="/login"
                className="block px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 text-sm font-semibold text-center bg-orange text-white rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
