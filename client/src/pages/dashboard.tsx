import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Calendar, Clock, Trophy, TrendingUp, Award, ChevronRight } from "lucide-react";
import type { Master, Class } from "@shared/schema";
import { useAuth } from "@/lib/auth";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

const beltProgress: Record<string, number> = {
  "White Belt": 10,
  "Yellow Belt": 25,
  "Orange Belt": 35,
  "Green Belt": 50,
  "Blue Belt": 65,
  "Purple Belt": 75,
  "Brown Belt": 85,
  "Black Belt": 100,
};

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  const { data: masters, isLoading: mastersLoading } = useQuery<Master[]>({
    queryKey: ["/api/masters"],
  });

  const { data: classes, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const isLoading = mastersLoading || classesLoading;
  const upcomingClasses = classes?.slice(0, 3) || [];
  const recommendedMasters = masters?.slice(0, 3) || [];

  const displayName = user?.name || "Young Champion";
  const belt = user?.beltRank || "White Belt";
  const progress = beltProgress[belt] || 10;
  const nextBelt = Object.keys(beltProgress).find(b => beltProgress[b] > progress) || "Black Belt";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-24 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <TrendingUp className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Track Your Progress</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign up as a student to track your training, belt progress, and tournament history.</p>
          <Link href="/signup?role=student">
            <Button className="bg-[#FF6B35] text-white w-full" data-testid="button-signup-student">Join as Student</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-[#1B2A4A] to-[#2D4470] p-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <img src={logoPath} alt="Sparout" className="h-8 w-8 object-contain" />
            <div>
              <p className="text-white/70 text-sm">Welcome back</p>
              <h1 className="text-xl font-bold text-white" data-testid="text-dashboard-name">{displayName}</h1>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-md bg-[#FF6B35]/20 flex items-center justify-center">
                <Award className="w-7 h-7 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-white font-medium" data-testid="text-belt-rank">{belt}</span>
                  <span className="text-white/60 text-xs">{progress}% to {nextBelt}</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-2">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-classes-count">0</div>
            <div className="text-xs text-muted-foreground">Classes Taken</div>
          </Card>
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-tournaments-count">0</div>
            <div className="text-xs text-muted-foreground">Tournaments</div>
          </Card>
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-hours-count">0</div>
            <div className="text-xs text-muted-foreground">Training Hours</div>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Classes</h2>
            <Link href="/discover">
              <Button variant="ghost" size="sm" className="text-[#FF6B35]" data-testid="link-view-all-classes">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-md" />)}
            </div>
          ) : upcomingClasses.length === 0 ? (
            <Card className="p-6 text-center border-card-border">
              <Calendar className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No upcoming classes</p>
              <Link href="/discover">
                <Button size="sm" className="mt-3" data-testid="button-find-class">Find a Class</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingClasses.map((cls) => {
                const master = masters?.find(m => m.id === cls.masterId);
                return (
                  <Card key={cls.id} className="p-4 border-card-border" data-testid={`card-upcoming-${cls.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">{cls.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {master?.name} - {cls.date} at {cls.time}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">{cls.martialArt}</Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-lg font-semibold text-foreground">Recommended Masters</h2>
            <Link href="/discover">
              <Button variant="ghost" size="sm" className="text-[#FF6B35]" data-testid="link-view-all-masters">
                See All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recommendedMasters.map((master) => (
              <Link key={master.id} href={`/masters/${master.id}`}>
                <Card className="p-4 cursor-pointer hover-elevate border-card-border mb-3" data-testid={`card-rec-master-${master.id}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                      {master.photoUrl ? (
                        <img src={master.photoUrl} alt={master.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                          {master.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">{master.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {master.rating}
                        </span>
                        <span>{master.martialArts.join(", ")}</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">${master.pricePerClass}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
