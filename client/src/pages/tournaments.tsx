import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Trophy, Star } from "lucide-react";
import type { Tournament } from "@shared/schema";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState("all");

  const { data: tournaments, isLoading } = useQuery<Tournament[]>({
    queryKey: ["/api/tournaments"],
  });

  const filtered = tournaments?.filter((t) => {
    if (activeTab === "all") return true;
    return t.martialArt.toLowerCase().replace(/[- ]/g, "") === activeTab;
  }) || [];

  const featured = tournaments?.find(t => t.featured);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FF6B35]" />
            <h1 className="font-bold text-lg text-foreground">Tournament Hub</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {featured && (
          <div className="mb-6">
            <Card className="overflow-visible bg-gradient-to-br from-[#1B2A4A] to-[#2D4470] text-white p-6 border-0">
              <div className="flex items-start gap-2 mb-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Featured Tournament</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">{featured.name}</h2>
              <p className="text-sm text-white/70 mb-4 line-clamp-2">{featured.description}</p>
              <div className="flex items-center gap-4 text-sm text-white/80 mb-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {featured.city}, {featured.state}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {featured.spotsRemaining} spots left
                </span>
              </div>
              <Link href={`/tournaments/${featured.id}`}>
                <Button className="bg-[#FF6B35] text-white" data-testid="button-featured-register">
                  Register Now - ${featured.entryFee}
                </Button>
              </Link>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full overflow-x-auto flex justify-start">
            <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
            <TabsTrigger value="karate" data-testid="tab-karate">Karate</TabsTrigger>
            <TabsTrigger value="taekwondo" data-testid="tab-tkd">Taekwondo</TabsTrigger>
            <TabsTrigger value="jiujitsu" data-testid="tab-bjj">Jiu-Jitsu</TabsTrigger>
            <TabsTrigger value="boxing" data-testid="tab-boxing">Boxing</TabsTrigger>
            <TabsTrigger value="mma" data-testid="tab-mma">MMA</TabsTrigger>
            <TabsTrigger value="muaythai" data-testid="tab-mt">Muay Thai</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No tournaments found</h3>
            <p className="text-sm text-muted-foreground">Check back soon for upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((tournament) => (
              <Link key={tournament.id} href={`/tournaments/${tournament.id}`}>
                <Card className="p-4 cursor-pointer hover-elevate transition-all border-card-border mb-4" data-testid={`card-tournament-${tournament.id}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-foreground">{tournament.name}</h3>
                        <Badge variant="secondary" className="text-xs">{tournament.martialArt}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Ages {tournament.ageMin} - {tournament.ageMax}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {tournament.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {tournament.city}, {tournament.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {tournament.spotsRemaining} spots
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-foreground">${tournament.entryFee}</div>
                      <Button size="sm" className="mt-2" data-testid={`button-register-${tournament.id}`}>Register</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
