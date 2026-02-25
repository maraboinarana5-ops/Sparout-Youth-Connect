"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, User, Trophy } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/masters", label: "Masters", icon: Search },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/partners", label: "Partners", icon: Trophy },
  { href: "/login", label: "Account", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-[9999]" data-testid="mobile-nav">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-md transition-colors ${
                active ? "text-orange" : "text-gray-500"
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
