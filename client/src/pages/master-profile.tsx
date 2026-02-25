import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Star, ShieldCheck, MapPin, Clock, Users, Trophy, Calendar, DollarSign } from "lucide-react";
import type { Master, Class, Review } from "@shared/schema";

export default function MasterProfile() {
  const [, params] = useRoute("/masters/:id");
  const masterId = params?.id;

  const { data: master, isLoading } = useQuery<Master>({
    queryKey: ["/api/masters", masterId],
    enabled: !!masterId,
  });

  const { data: classes } = useQuery<Class[]>({
    queryKey: ["/api/classes/master", masterId],
    enabled: !!masterId,
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews", masterId],
    enabled: !!masterId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-40">
        <div className="h-64 bg-muted" />
        <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10 space-y-4">
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
      </div>
    );
  }

  if (!master) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Master not found</h2>
          <Link href="/discover"><Button>Back to Discover</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-[#1B2A4A] to-[#243656]">
        <div className="absolute inset-0 bg-black/20" />
        {master.photoUrl && (
          <img
            src={master.photoUrl}
            alt={master.name}
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 z-10">
          <Link href="/discover">
            <Button variant="outline" size="icon" className="border-white/30 text-white backdrop-blur-sm bg-white/5" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-10">
        <Card className="p-6 mb-6 border-card-border">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-24 h-24 rounded-md bg-muted overflow-hidden flex-shrink-0 -mt-12 sm:-mt-12 border-4 border-card">
              {master.photoUrl ? (
                <img src={master.photoUrl} alt={master.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                  {master.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{master.name}</h1>
                {master.verified && (
                  <Badge className="bg-[#FF6B35] text-white text-xs">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mb-3 flex-wrap">
                {master.martialArts.map((art) => (
                  <Badge key={art} variant="secondary" className="text-xs">{art}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {master.city}, {master.state}
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{master.bio}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 rounded-md bg-muted/50">
              <Clock className="w-5 h-5 text-[#FF6B35] mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{master.yearsExperience}</div>
              <div className="text-xs text-muted-foreground">Years Exp.</div>
            </div>
            <div className="text-center p-3 rounded-md bg-muted/50">
              <Users className="w-5 h-5 text-[#FF6B35] mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{master.studentsCount || 0}</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div className="text-center p-3 rounded-md bg-muted/50">
              <Trophy className="w-5 h-5 text-[#FF6B35] mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{master.winsCount || 0}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="text-center p-3 rounded-md bg-muted/50">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{master.rating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>
        </Card>

        {classes && classes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Available Classes</h2>
            <div className="space-y-3">
              {classes.map((cls) => (
                <Card key={cls.id} className="p-4 border-card-border" data-testid={`card-class-${cls.id}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">{cls.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {cls.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {cls.time}
                        </span>
                        <span>{cls.durationMinutes} min</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <span className="text-muted-foreground">{cls.spotsRemaining} spots left</span>
                        <span className="font-semibold text-foreground">${cls.price}</span>
                      </div>
                    </div>
                    <Link href={`/book/${cls.id}`}>
                      <Button size="sm" data-testid={`button-book-class-${cls.id}`}>Book</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {reviews && reviews.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Reviews</h2>
            <div className="space-y-3">
              {reviews.map((review) => (
                <Card key={review.id} className="p-4 border-card-border" data-testid={`card-review-${review.id}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-sm font-semibold text-[#FF6B35]">
                      {review.studentName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{review.studentName}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-muted"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-[80px] left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">Starting at</div>
            <div className="text-xl font-bold text-foreground">${master.pricePerClass}<span className="text-sm font-normal text-muted-foreground">/class</span></div>
          </div>
          <Link href={classes && classes.length > 0 ? `/book/${classes[0].id}` : "/discover"}>
            <Button size="lg" className="bg-[#FF6B35] text-white px-8" data-testid="button-sticky-book">
              Book a Class
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
