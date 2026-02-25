import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, Users, DollarSign, Star, ChevronRight, Clock, Plus } from "lucide-react";
import type { Class, Booking } from "@shared/schema";
import { useAuth } from "@/lib/auth";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

export default function MasterDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const { data: classes, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes"],
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const isLoading = classesLoading || bookingsLoading;
  const myClasses = classes?.slice(0, 5) || [];
  const pendingBookings = bookings?.filter(b => b.status === "pending").slice(0, 5) || [];
  const totalBookings = bookings?.length || 0;

  if (!isAuthenticated) {
    setLocation("/signup?role=master");
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-[120px]">
      <div className="bg-gradient-to-br from-[#1B2A4A] to-[#2D4470] p-6 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoPath} alt="Sparout" className="h-8 w-8 object-contain" />
            <div>
              <p className="text-white/70 text-sm">Master Dashboard</p>
              <h1 className="text-xl font-bold text-white" data-testid="text-master-name">{user?.name || "Master"}</h1>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-[#FF6B35]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">Teaching Overview</h3>
                <p className="text-white/60 text-xs">Manage your classes, bookings, and students</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-2">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-my-classes-count">{myClasses.length}</div>
            <div className="text-xs text-muted-foreground">My Classes</div>
          </Card>
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-bookings-count">{totalBookings}</div>
            <div className="text-xs text-muted-foreground">Bookings</div>
          </Card>
          <Card className="p-3 text-center border-card-border">
            <div className="text-2xl font-bold text-[#FF6B35]" data-testid="text-pending-count">{pendingBookings.length}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-lg font-semibold text-foreground">My Classes</h2>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-md" />)}
            </div>
          ) : myClasses.length === 0 ? (
            <Card className="p-6 text-center border-card-border">
              <Calendar className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No classes yet</p>
              <p className="text-xs text-muted-foreground mt-1">Your classes will appear here once created</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {myClasses.map((cls) => (
                <Card key={cls.id} className="p-4 border-card-border" data-testid={`card-class-${cls.id}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#FF6B35]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">{cls.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {cls.date} at {cls.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {cls.spotsRemaining}/{cls.maxStudents}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">{cls.martialArt}</Badge>
                      <div className="text-sm font-semibold text-foreground mt-1">${cls.price}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Pending Bookings</h2>
          {isLoading ? (
            <Skeleton className="h-20 w-full rounded-md" />
          ) : pendingBookings.length === 0 ? (
            <Card className="p-6 text-center border-card-border">
              <Users className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No pending bookings</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {pendingBookings.map((booking) => (
                <Card key={booking.id} className="p-4 border-card-border" data-testid={`card-booking-${booking.id}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground">Booking #{booking.id.slice(0, 8)}</h3>
                      <p className="text-xs text-muted-foreground">Status: {booking.status}</p>
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-xs">Pending</Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/tournaments">
              <Card className="p-4 cursor-pointer hover-elevate border-card-border text-center" data-testid="card-action-tournaments">
                <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Tournaments</p>
                <p className="text-xs text-muted-foreground">Browse events</p>
              </Card>
            </Link>
            <Link href="/profile">
              <Card className="p-4 cursor-pointer hover-elevate border-card-border text-center" data-testid="card-action-profile">
                <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">My Profile</p>
                <p className="text-xs text-muted-foreground">Manage settings</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
