import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Shield, CheckCircle2, Loader2, FileText } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Tournament } from "@shared/schema";

export default function TournamentDetail() {
  const [, params] = useRoute("/tournaments/:id");
  const tournamentId = params?.id;
  const { toast } = useToast();
  const [weightClass, setWeightClass] = useState("");
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [registered, setRegistered] = useState(false);

  const { data: tournament, isLoading } = useQuery<Tournament>({
    queryKey: ["/api/tournaments", tournamentId],
    enabled: !!tournamentId,
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/tournament-registrations", {
        tournamentId,
        studentId: "demo-student",
        weightClass,
        status: "registered",
      });
      return res.json();
    },
    onSuccess: () => {
      setRegistered(true);
      queryClient.invalidateQueries({ queryKey: ["/api/tournaments"] });
    },
    onError: (error: Error) => {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-48 w-full rounded-md mb-4" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Tournament not found</h2>
          <Link href="/tournaments"><Button>Back to Tournaments</Button></Link>
        </div>
      </div>
    );
  }

  if (registered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Registration Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            You've been registered for {tournament.name}. Good luck!
          </p>
          <Link href="/tournaments">
            <Button className="w-full bg-[#FF6B35] text-white" data-testid="button-back-tournaments">
              Back to Tournament Hub
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/tournaments">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="font-bold text-lg text-foreground truncate">{tournament.name}</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Card className="p-6 mb-6 border-card-border">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="secondary">{tournament.martialArt}</Badge>
            <Badge variant="outline" className="text-xs">Ages {tournament.ageMin}-{tournament.ageMax}</Badge>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">{tournament.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tournament.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF6B35]" />
              <div>
                <div className="text-xs text-muted-foreground">Date</div>
                <div className="font-medium text-foreground">{tournament.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6B35]" />
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="font-medium text-foreground">{tournament.city}, {tournament.state}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FF6B35]" />
              <div>
                <div className="text-xs text-muted-foreground">Spots Left</div>
                <div className="font-medium text-foreground">{tournament.spotsRemaining} / {tournament.maxParticipants}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#FF6B35]" />
              <div>
                <div className="text-xs text-muted-foreground">Entry Fee</div>
                <div className="font-medium text-foreground">${tournament.entryFee}</div>
              </div>
            </div>
          </div>
        </Card>

        {tournament.rules && (
          <Card className="p-6 mb-6 border-card-border">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#FF6B35]" />
              <h3 className="font-semibold text-foreground">Rules & Guidelines</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{tournament.rules}</p>
          </Card>
        )}

        <Card className="p-6 mb-6 border-card-border">
          <h3 className="font-semibold text-foreground mb-4">Registration Form</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Weight Class</label>
              <Select value={weightClass} onValueChange={setWeightClass}>
                <SelectTrigger data-testid="select-weight-class">
                  <SelectValue placeholder="Select weight class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flyweight">Flyweight (Under 50kg)</SelectItem>
                  <SelectItem value="bantamweight">Bantamweight (50-55kg)</SelectItem>
                  <SelectItem value="featherweight">Featherweight (55-60kg)</SelectItem>
                  <SelectItem value="lightweight">Lightweight (60-65kg)</SelectItem>
                  <SelectItem value="welterweight">Welterweight (65-70kg)</SelectItem>
                  <SelectItem value="middleweight">Middleweight (70-80kg)</SelectItem>
                  <SelectItem value="heavyweight">Heavyweight (80kg+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="waiver"
                checked={waiverAccepted}
                onCheckedChange={(v) => setWaiverAccepted(v === true)}
                data-testid="checkbox-waiver"
              />
              <label htmlFor="waiver" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the tournament rules, waive liability, and confirm the participant has a valid medical certificate and insurance.
              </label>
            </div>
          </div>
        </Card>

        <Button
          className="w-full bg-[#FF6B35] text-white"
          size="lg"
          disabled={!weightClass || !waiverAccepted || registerMutation.isPending}
          onClick={() => registerMutation.mutate()}
          data-testid="button-submit-registration"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registering...
            </>
          ) : (
            `Register - $${tournament.entryFee}`
          )}
        </Button>
      </div>
    </div>
  );
}
