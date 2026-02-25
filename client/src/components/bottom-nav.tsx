import { Link, useLocation } from "wouter";
import { Home, Search, Trophy, TrendingUp, User } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/discover", label: "Discover", icon: Search },
  { path: "/tournaments", label: "Tournaments", icon: Trophy },
  { path: "/dashboard", label: "Progress", icon: TrendingUp },
  { path: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-50 safe-area-bottom" data-testid="nav-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link key={item.path} href={item.path}>
              <button
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-md transition-colors ${
                  active ? "text-[#FF6B35]" : "text-muted-foreground"
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
