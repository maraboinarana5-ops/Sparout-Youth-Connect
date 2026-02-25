import { Link, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Shield, LogOut, ChevronRight, Award, BookOpen, Trophy, Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background pb-0 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Not Logged In</h2>
          <p className="text-sm text-muted-foreground mb-6">Create an account to track your progress and manage your profile.</p>
          <Link href="/login">
            <Button className="bg-[#FF6B35] text-white w-full" data-testid="button-login-cta">Sign Up / Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const roleLabel = user.role === "master" ? "Master Account" : user.role === "parent" ? "Parent Account" : "Student Account";

  return (
    <div className="min-h-screen bg-background pb-0">
      <div className="bg-gradient-to-br from-[#1B2A4A] to-[#2D4470] p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FF6B35]/20 flex items-center justify-center border-2 border-[#FF6B35]/30">
              <User className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white" data-testid="text-profile-name">{user.name}</h1>
              <p className="text-white/60 text-sm" data-testid="text-profile-role">{roleLabel}</p>
              <div className="flex items-center gap-1 mt-1">
                {user.beltRank && <Badge className="bg-[#FF6B35]/20 text-[#FF6B35] text-xs border-0">{user.beltRank}</Badge>}
                {user.martialArt && <Badge className="bg-white/10 text-white/80 text-xs border-0">{user.martialArt}</Badge>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {user.role === "student" && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-4 text-center border-card-border">
              <Award className="w-6 h-6 text-[#FF6B35] mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{user.beltRank || "White Belt"}</div>
              <div className="text-xs text-muted-foreground">Current Rank</div>
            </Card>
            <Card className="p-4 text-center border-card-border">
              <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">0</div>
              <div className="text-xs text-muted-foreground">Tournaments</div>
            </Card>
          </div>
        )}

        <div className="space-y-2 mb-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Account</h2>
          <Card className="border-card-border divide-y divide-border">
            <button className="w-full p-4 flex items-center gap-3 text-left" data-testid="button-edit-profile">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground flex-1">Edit Profile</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center gap-3 text-left" data-testid="button-notifications">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground flex-1">Notifications</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center gap-3 text-left" data-testid="button-privacy">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground flex-1">Privacy & Safety</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-full p-4 flex items-center gap-3 text-left" data-testid="button-settings">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground flex-1">Settings</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </Card>
        </div>

        <div className="space-y-2 mb-6">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
            {user.role === "master" ? "Teaching" : user.role === "parent" ? "Monitoring" : "Training"}
          </h2>
          <Card className="border-card-border divide-y divide-border">
            <Link href="/progress">
              <button className="w-full p-4 flex items-center gap-3 text-left" data-testid="button-progress">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground flex-1">
                  {user.role === "master" ? "My Classes" : user.role === "parent" ? "Child Monitor" : "Training History"}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </Link>
            <Link href="/tournaments">
              <button className="w-full p-4 flex items-center gap-3 text-left" data-testid="button-my-tournaments">
                <Trophy className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground flex-1">Tournaments</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </Link>
            <Link href="/discover">
              <button className="w-full p-4 flex items-center gap-3 text-left" data-testid="button-find-masters">
                <Star className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground flex-1">Find Masters</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </Link>
          </Card>
        </div>

        <Button variant="outline" className="w-full text-red-500 border-red-200 dark:border-red-900" onClick={handleLogout} data-testid="button-logout">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logoPath} alt="Sparout" className="h-6 w-6 object-contain opacity-50" />
            <span className="text-xs text-muted-foreground">Sparout v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
