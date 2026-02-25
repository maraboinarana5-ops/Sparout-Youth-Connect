import { Link, useLocation } from "wouter";
import { Home, Search, Trophy, TrendingUp, User, BookOpen, Eye } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function BottomNav() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const getNavItems = () => {
    if (!isAuthenticated || !user) {
      return [
        { path: "/", label: "Home", icon: Home },
        { path: "/discover", label: "Discover", icon: Search },
        { path: "/tournaments", label: "Tournaments", icon: Trophy },
        { path: "/signup", label: "Join", icon: User },
      ];
    }

    if (user.role === "master") {
      return [
        { path: "/", label: "Home", icon: Home },
        { path: "/master-dashboard", label: "Dashboard", icon: BookOpen },
        { path: "/tournaments", label: "Tournaments", icon: Trophy },
        { path: "/profile", label: "Profile", icon: User },
      ];
    }

    if (user.role === "parent") {
      return [
        { path: "/", label: "Home", icon: Home },
        { path: "/parent-dashboard", label: "Monitor", icon: Eye },
        { path: "/discover", label: "Discover", icon: Search },
        { path: "/profile", label: "Profile", icon: User },
      ];
    }

    return [
      { path: "/", label: "Home", icon: Home },
      { path: "/discover", label: "Discover", icon: Search },
      { path: "/tournaments", label: "Tournaments", icon: Trophy },
      { path: "/dashboard", label: "Progress", icon: TrendingUp },
      { path: "/profile", label: "Profile", icon: User },
    ];
  };

  const navItems = getNavItems();

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
