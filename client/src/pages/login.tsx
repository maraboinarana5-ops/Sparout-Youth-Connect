import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("signup");

  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", role: "" as string });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const signupMutation = useMutation({
    mutationFn: async () => {
      const role = signupForm.role as "student" | "master" | "parent";
      let endpoint = "/api/students";
      let body: Record<string, unknown> = {
        name: signupForm.name,
        email: signupForm.email,
      };

      if (role === "student") {
        endpoint = "/api/students";
        body = { ...body, age: 14, martialArt: "Karate", beltRank: "White Belt", goal: "Get started" };
      } else if (role === "master") {
        endpoint = "/api/masters";
        body = { ...body, bio: "", martialArts: ["Karate"], yearsExperience: 1, pricePerClass: "40", city: "New York", state: "NY", verified: false };
      } else {
        endpoint = "/api/parents";
        body = { ...body, phone: "" };
      }

      const res = await apiRequest("POST", endpoint, body);
      return res.json();
    },
    onSuccess: (data) => {
      const role = signupForm.role as "student" | "master" | "parent";
      login({
        id: data.id,
        name: signupForm.name,
        email: signupForm.email,
        role,
      });
      toast({ title: "Welcome to Sparout!", description: "Your account has been created." });
      setLocation("/");
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/students");
      const students = await res.json();
      const found = students.find((s: { email: string }) => s.email === loginForm.email);
      if (found) return { ...found, role: "student" };

      const res2 = await fetch("/api/masters");
      const masters = await res2.json();
      const foundM = masters.find((m: { email: string }) => m.email === loginForm.email);
      if (foundM) return { ...foundM, role: "master" };

      const res3 = await fetch("/api/parents");
      const parents = await res3.json();
      const foundP = parents.find((p: { email: string }) => p.email === loginForm.email);
      if (foundP) return { ...foundP, role: "parent" };

      throw new Error("No account found with that email");
    },
    onSuccess: (data: { id: string; name: string; email: string; role: "student" | "master" | "parent"; martialArt?: string; beltRank?: string; age?: number }) => {
      login({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        martialArt: data.martialArt,
        beltRank: data.beltRank,
        age: data.age,
      });
      toast({ title: "Welcome back!", description: `Logged in as ${data.name}` });
      setLocation("/");
    },
    onError: (e: Error) => toast({ title: "Login failed", description: e.message, variant: "destructive" }),
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <img src={logoPath} alt="Sparout" className="h-7 w-7 object-contain" />
            <h1 className="font-bold text-lg text-foreground">Sparout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <img src={logoPath} alt="Sparout" className="h-16 w-16 object-contain mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground">Welcome to Sparout</h2>
          <p className="text-sm text-muted-foreground mt-1">Where Champions Begin</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login" data-testid="tab-login">Log In</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="mt-6">
            <Card className="p-6 border-card-border">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    placeholder="Enter your name"
                    data-testid="input-signup-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    placeholder="your@email.com"
                    data-testid="input-signup-email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                  <Input
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    placeholder="Create a password"
                    data-testid="input-signup-password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Role</label>
                  <Select value={signupForm.role} onValueChange={(v) => setSignupForm({ ...signupForm, role: v })}>
                    <SelectTrigger data-testid="select-signup-role">
                      <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full bg-[#FF6B35] text-white"
                  size="lg"
                  onClick={() => signupMutation.mutate()}
                  disabled={!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.role || signupMutation.isPending}
                  data-testid="button-signup-submit"
                >
                  {signupMutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create Account"}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="login" className="mt-6">
            <Card className="p-6 border-card-border">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="your@email.com"
                    data-testid="input-login-email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                  <Input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Your password"
                    data-testid="input-login-password"
                  />
                </div>
                <Button
                  className="w-full bg-[#FF6B35] text-white"
                  size="lg"
                  onClick={() => loginMutation.mutate()}
                  disabled={!loginForm.email || !loginForm.password || loginMutation.isPending}
                  data-testid="button-login-submit"
                >
                  {loginMutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Logging in...</> : "Log In"}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
