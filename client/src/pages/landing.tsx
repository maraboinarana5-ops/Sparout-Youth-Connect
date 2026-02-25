import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, Eye, Star, ChevronRight, Flame, Trophy, Target } from "lucide-react";
import { useAuth } from "@/lib/auth";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

export default function Landing() {
  const { user, isAuthenticated } = useAuth();

  const dashboardPath = !isAuthenticated ? "/login" : "/progress";

  return (
    <div className="min-h-screen bg-background pb-[120px]">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src={logoPath} alt="Sparout" className="h-9 w-9 object-contain" />
            <span className="text-xl font-bold text-[#1B2A4A] dark:text-white tracking-tight">Sparout</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/discover">
              <Button variant="ghost" size="sm" data-testid="link-discover">Discover</Button>
            </Link>
            <Link href="/tournaments">
              <Button variant="ghost" size="sm" data-testid="link-tournaments">Tournaments</Button>
            </Link>
            <Link href={dashboardPath}>
              <Button size="sm" data-testid="button-get-started">{isAuthenticated ? "Dashboard" : "Get Started"}</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-[#1B2A4A] via-[#243656] to-[#1B2A4A] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#FF6B35] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-[#FF6B35] rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <img src={logoPath} alt="Sparout" className="h-20 w-20 object-contain mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Where Champions{" "}
              <span className="text-[#FF6B35]">Begin</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              The youth martial arts platform connecting students with verified masters, empowering parents, and organizing tournaments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login">
                <Button size="lg" className="bg-[#FF6B35] text-white px-8 text-base" data-testid="button-hero-cta">
                  Start Your Journey
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/discover">
                <Button size="lg" variant="outline" className="border-white/30 text-white backdrop-blur-sm bg-white/5 px-8 text-base" data-testid="button-hero-discover">
                  Find a Master
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Choose Your Path</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Whether you're a student, master, or parent — Sparout has a place for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/login">
              <Card className="p-6 cursor-pointer group hover-elevate transition-all border-card-border">
                <div className="w-14 h-14 rounded-md bg-[#FF6B35]/10 flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-[#FF6B35]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">I'm a Student</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Find your martial art, train with verified masters, and compete in tournaments. Track your progress from white belt to champion.
                </p>
                <span className="text-sm font-medium text-[#FF6B35] flex items-center gap-1">
                  Get Started <ChevronRight className="w-3 h-3" />
                </span>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="p-6 cursor-pointer group hover-elevate transition-all border-card-border">
                <div className="w-14 h-14 rounded-md bg-[#1B2A4A]/10 dark:bg-[#1B2A4A]/30 flex items-center justify-center mb-4">
                  <Flame className="w-7 h-7 text-[#1B2A4A] dark:text-[#6B8FD4]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">I'm a Master</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Share your expertise, manage classes, and connect with the next generation of martial artists. Grow your school.
                </p>
                <span className="text-sm font-medium text-[#FF6B35] flex items-center gap-1">
                  Join as Master <ChevronRight className="w-3 h-3" />
                </span>
              </Card>
            </Link>

            <Link href="/login">
              <Card className="p-6 cursor-pointer group hover-elevate transition-all border-card-border">
                <div className="w-14 h-14 rounded-md bg-green-500/10 flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">I'm a Parent</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Monitor your child's progress, manage schedules, and connect with verified, trusted instructors. Stay informed.
                </p>
                <span className="text-sm font-medium text-[#FF6B35] flex items-center gap-1">
                  Join as Parent <ChevronRight className="w-3 h-3" />
                </span>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Verified Masters</h3>
              <p className="text-sm text-muted-foreground">Every instructor is background-checked and credential-verified for your peace of mind.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Safe Community</h3>
              <p className="text-sm text-muted-foreground">A trusted community designed for youth with parental oversight and monitoring tools.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Tournament Ready</h3>
              <p className="text-sm text-muted-foreground">Discover and compete in organized tournaments across all martial arts disciplines.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Ready to Begin?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">Join our growing community of students, masters, and parents across all martial arts disciplines.</p>
          <Link href="/login">
            <Button size="lg" className="bg-[#FF6B35] text-white px-10" data-testid="button-bottom-cta">
              Join Sparout Today
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-[#1B2A4A] py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={logoPath} alt="Sparout" className="h-8 w-8 object-contain" />
              <span className="text-white font-bold">Sparout</span>
              <span className="text-white/60 text-sm ml-2">Where Champions Begin</span>
            </div>
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <span>About</span>
              <span>Contact</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
