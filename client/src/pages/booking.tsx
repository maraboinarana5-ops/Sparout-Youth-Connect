import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign, CheckCircle2, Loader2, ChevronRight } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Class, Master } from "@shared/schema";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM",
];

const availableDates = [
  "March 5, 2026", "March 7, 2026", "March 10, 2026",
  "March 12, 2026", "March 14, 2026", "March 17, 2026",
];

export default function Booking() {
  const [, params] = useRoute("/book/:classId");
  const classId = params?.classId;
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { data: cls, isLoading } = useQuery<Class>({
    queryKey: ["/api/classes", classId],
    enabled: !!classId,
  });

  const { data: masters } = useQuery<Master[]>({
    queryKey: ["/api/masters"],
  });

  const master = masters?.find(m => m.id === cls?.masterId);

  const bookMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/bookings", {
        studentId: "demo-student",
        classId: classId,
        status: "pending",
      });
      return res.json();
    },
    onSuccess: () => {
      setStep(3);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/classes"] });
    },
    onError: (error: Error) => {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    },
  });

  if (isLoading || !cls) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-booking-confirmed">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your class has been booked successfully. You'll receive a confirmation shortly.
          </p>
          <Card className="p-4 mb-6 text-left border-card-border">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Class</span>
                <span className="font-medium text-foreground">{cls.title}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">{selectedDate || cls.date}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">{selectedTime || cls.time}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-medium text-foreground">{master?.name || "TBD"}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium text-foreground">${cls.price}</span>
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-2">
            <Link href="/discover">
              <Button className="w-full bg-[#FF6B35] text-white" data-testid="button-back-discover">
                Back to Discover
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full" data-testid="button-go-home">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          {step === 1 ? (
            <Link href={master ? `/masters/${master.id}` : "/discover"}>
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setStep(1)} data-testid="button-back-step">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="font-bold text-lg text-foreground">Book a Class</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${step >= 1 ? "bg-[#FF6B35] text-white" : "bg-muted text-muted-foreground"}`} data-testid="step-1-indicator">1</div>
          <div className={`flex-1 h-1 rounded ${step >= 2 ? "bg-[#FF6B35]" : "bg-muted"}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${step >= 2 ? "bg-[#FF6B35] text-white" : "bg-muted text-muted-foreground"}`} data-testid="step-2-indicator">2</div>
          <div className={`flex-1 h-1 rounded ${step >= 3 ? "bg-[#FF6B35]" : "bg-muted"}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${step >= 3 ? "bg-[#FF6B35] text-white" : "bg-muted text-muted-foreground"}`} data-testid="step-3-indicator">3</div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Pick Date & Time</h2>
            <p className="text-sm text-muted-foreground mb-4">Select your preferred date and time slot for {cls.title}</p>

            {master && (
              <div className="flex items-center gap-3 mb-6 p-3 rounded-md bg-muted/50">
                <div className="w-10 h-10 rounded-md bg-muted overflow-hidden flex-shrink-0">
                  {master.photoUrl ? (
                    <img src={master.photoUrl} alt={master.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-muted-foreground">
                      {master.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{master.name}</p>
                  <p className="text-xs text-muted-foreground">{master.martialArts.join(", ")}</p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Select Date</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-md border text-sm font-medium text-left transition-colors ${
                      selectedDate === date
                        ? "border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35]"
                        : "border-border bg-background text-foreground hover:border-[#FF6B35]/50"
                    }`}
                    data-testid={`date-${date.replace(/[, ]/g, "-")}`}
                  >
                    <Calendar className="w-3.5 h-3.5 mb-1" />
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Select Time</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-md border text-sm font-medium text-center transition-colors ${
                      selectedTime === time
                        ? "border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35]"
                        : "border-border bg-background text-foreground hover:border-[#FF6B35]/50"
                    }`}
                    data-testid={`time-${time.replace(/[: ]/g, "-")}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-[#FF6B35] text-white"
              size="lg"
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(2)}
              data-testid="button-next-step"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Review Booking</h2>
            <p className="text-sm text-muted-foreground mb-4">Confirm your class details before booking</p>

            <Card className="p-6 mb-4 border-card-border">
              <h3 className="text-xl font-bold text-foreground mb-4">{cls.title}</h3>

              {master && (
                <div className="flex items-center gap-3 mb-4 p-3 rounded-md bg-muted/50">
                  <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                    {master.photoUrl ? (
                      <img src={master.photoUrl} alt={master.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-muted-foreground">
                        {master.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{master.name}</p>
                    <p className="text-xs text-muted-foreground">{master.martialArts.join(", ")}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-foreground">{selectedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-foreground">{selectedTime} ({cls.durationMinutes} minutes)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-foreground">{cls.location}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-4 border-card-border">
              <h3 className="font-semibold text-foreground mb-3">Payment Summary</h3>
              <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Class fee</span>
                  <span className="text-foreground">${cls.price}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Platform fee</span>
                  <span className="text-foreground">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between gap-2 text-sm font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">${cls.price}</span>
              </div>
            </Card>

            <div className="text-xs text-muted-foreground text-center mb-4">
              By confirming, you agree to the class policies and cancellation terms.
            </div>

            <Button
              className="w-full bg-[#FF6B35] text-white"
              size="lg"
              onClick={() => bookMutation.mutate()}
              disabled={bookMutation.isPending}
              data-testid="button-confirm-booking"
            >
              {bookMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Confirming...
                </>
              ) : (
                `Confirm Booking - $${cls.price}`
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
