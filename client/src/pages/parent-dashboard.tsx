import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Calendar, MapPin, ShieldCheck, Clock, Bell, ChevronRight, BookOpen, Users } from "lucide-react";
import type { Master, Class, Tournament } from "@shared/schema";
import { useAuth } from "@/lib/auth";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

export default function ParentDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const { data: masters, isLoading: mastersLoading } = useQuery<Master[]>({
    queryKey: ["/api/masters"],
  });

  const { data: classes, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const { data: tournaments, isLoading: tournamentsLoading } = useQuery<Tournament[]>({
    queryKey: ["/api/tournaments"],
  });

  const isLoading = mastersLoading || classesLoading || tournamentsLoading;
  const upcomingClasses = classes?.slice(0, 3) || [];
  const upcomingTournaments = tournaments?.slice(0, 2) || [];
  const verifiedMasters = masters?.filter(m => m.verified).slice(0, 3) || [];

  if (!isAuthenticated) {
    setLocation("/signup?role=parent");
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-0">
      <div className="bg-gradient-to-br from-[#1B2A4A] to-[#2D4470] p-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoPath} alt="Sparout" className="h-8 w-8 object-contain" />
            <div>
              <p className="text-white/70 text-sm">Parent Dashboard</p>
              <h1 className="text-xl font-bold text-white" data-testid="text-parent-name">{user?.name || "Parent"}</h1>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-green-500/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">Child Monitoring</h3>
                <p className="text-white/60 text-xs">View schedules, verified masters, and upcoming events</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-2">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-schedule-count">{upcomingClasses.length}</div>
            <div className="text-xs text-muted-foreground">Scheduled</div>
          </Card>
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-verified-count">{verifiedMasters.length}</div>
            <div className="text-xs text-muted-foreground">Verified Masters</div>
          </Card>
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-event-count">{upcomingTournaments.length}</div>
            <div className="text-xs text-muted-foreground">Events</div>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Schedule</h2>
            <Link href="/discover">
              <Button variant="ghost" size="sm" className="text-[#FF6B35]" data-testid="link-view-classes">
                Browse <ChevronRight className="w-3 h-3 ml-1" />
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
              <p className="text-sm text-muted-foreground">No classes scheduled yet</p>
              <Link href="/discover">
                <Button size="sm" className="mt-3 bg-[#FF6B35] text-white" data-testid="button-find-class">Find a Class</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingClasses.map((cls) => {
                const master = masters?.find(m => m.id === cls.masterId);
                return (
                  <Card key={cls.id} className="p-4 border-card-border" data-testid={`card-schedule-${cls.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">{cls.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {master?.name} {master?.verified && " (Verified)"} - {cls.date} at {cls.time}
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
            <h2 className="text-lg font-semibold text-foreground">Verified Masters</h2>
            <Link href="/discover">
              <Button variant="ghost" size="sm" className="text-[#FF6B35]" data-testid="link-view-masters">
                See All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map(i => <Skeleton key={i} className="h-20 w-full rounded-md" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {verifiedMasters.map((master) => (
                <Link key={master.id} href={`/masters/${master.id}`}>
                  <Card className="p-4 cursor-pointer hover-elevate border-card-border mb-3" data-testid={`card-verified-master-${master.id}`}>
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
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-medium text-sm text-foreground truncate">{master.name}</h3>
                          <ShieldCheck className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground">{master.martialArts.join(", ")} - {master.yearsExperience} yrs exp</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {master.city}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Tournaments</h2>
            <Link href="/tournaments">
              <Button variant="ghost" size="sm" className="text-[#FF6B35]" data-testid="link-view-tournaments">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <Skeleton className="h-20 w-full rounded-md" />
          ) : upcomingTournaments.length === 0 ? (
            <Card className="p-6 text-center border-card-border">
              <p className="text-sm text-muted-foreground">No upcoming tournaments</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingTournaments.map((t) => (
                <Link key={t.id} href={`/tournaments/${t.id}`}>
                  <Card className="p-4 cursor-pointer hover-elevate border-card-border mb-3" data-testid={`card-tournament-${t.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">{t.name}</h3>
                        <p className="text-xs text-muted-foreground">{t.date} - {t.city}, {t.state}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{t.martialArt}</Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
