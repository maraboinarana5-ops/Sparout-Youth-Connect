import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Discover from "@/pages/discover";
import MasterProfile from "@/pages/master-profile";
import Booking from "@/pages/booking";
import Tournaments from "@/pages/tournaments";
import TournamentDetail from "@/pages/tournament-detail";
import Signup from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import { BottomNav } from "@/components/bottom-nav";

const pagesWithoutBottomNav = ["/signup", "/book"];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/discover" component={Discover} />
      <Route path="/masters/:id" component={MasterProfile} />
      <Route path="/book/:classId" component={Booking} />
      <Route path="/tournaments" component={Tournaments} />
      <Route path="/tournaments/:id" component={TournamentDetail} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const showBottomNav = !pagesWithoutBottomNav.some(p => location.startsWith(p));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        {showBottomNav && <BottomNav />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
