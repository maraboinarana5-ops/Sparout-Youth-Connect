import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2, Target, Flame, Eye } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import logoPath from "@assets/ChatGPT_Image_Feb_24,_2026,_08_05_48_PM_1771981595797.png";

const martialArts = ["Karate", "Taekwondo", "Jiu-Jitsu", "Boxing", "MMA", "Muay Thai"];
const beltRanks = ["White Belt", "Yellow Belt", "Orange Belt", "Green Belt", "Blue Belt", "Purple Belt", "Brown Belt", "Black Belt"];

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const urlParams = new URLSearchParams(window.location.search);
  const initialRole = urlParams.get("role") || "";
  const [role, setRole] = useState(initialRole);

  const [studentForm, setStudentForm] = useState({ name: "", age: "", martialArt: "", beltRank: "", goal: "" });
  const [masterForm, setMasterForm] = useState({ name: "", email: "", bio: "", martialArts: [] as string[], yearsExperience: "", pricePerClass: "", city: "", state: "" });
  const [parentForm, setParentForm] = useState({ name: "", email: "", phone: "" });

  const studentMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/students", {
        ...studentForm,
        age: parseInt(studentForm.age),
        email: `${studentForm.name.toLowerCase().replace(/\s/g, "")}@sparout.com`,
      });
      return res.json();
    },
    onSuccess: (data) => {
      login({
        id: data.id,
        name: studentForm.name,
        email: `${studentForm.name.toLowerCase().replace(/\s/g, "")}@sparout.com`,
        role: "student",
        martialArt: studentForm.martialArt,
        beltRank: studentForm.beltRank,
        age: parseInt(studentForm.age),
      });
      toast({ title: "Welcome to Sparout!", description: "Your student account is ready." });
      setLocation("/dashboard");
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const masterMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/masters", {
        ...masterForm,
        yearsExperience: parseInt(masterForm.yearsExperience),
        pricePerClass: masterForm.pricePerClass,
        verified: false,
      });
      return res.json();
    },
    onSuccess: (data) => {
      login({
        id: data.id,
        name: masterForm.name,
        email: masterForm.email,
        role: "master",
      });
      toast({ title: "Welcome to Sparout!", description: "Your master account is ready." });
      setLocation("/master-dashboard");
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const parentMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/parents", parentForm);
      return res.json();
    },
    onSuccess: (data) => {
      login({
        id: data.id,
        name: parentForm.name,
        email: parentForm.email,
        role: "parent",
      });
      toast({ title: "Welcome to Sparout!", description: "Your parent account is ready." });
      setLocation("/parent-dashboard");
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  if (!role) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <Link href="/"><Button variant="ghost" size="icon" data-testid="button-back"><ArrowLeft className="h-4 w-4" /></Button></Link>
            <div className="flex items-center gap-2">
              <img src={logoPath} alt="Sparout" className="h-7 w-7 object-contain" />
              <h1 className="font-bold text-lg text-foreground">Join Sparout</h1>
            </div>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Role</h2>
            <p className="text-muted-foreground">Select how you'd like to use Sparout</p>
          </div>
          <div className="grid gap-4 max-w-md mx-auto">
            <Card className="p-5 cursor-pointer hover-elevate border-card-border" onClick={() => setRole("student")} data-testid="card-role-student">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Student</h3>
                  <p className="text-sm text-muted-foreground">Find classes, train, and compete</p>
                </div>
              </div>
            </Card>
            <Card className="p-5 cursor-pointer hover-elevate border-card-border" onClick={() => setRole("master")} data-testid="card-role-master">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-[#1B2A4A]/10 dark:bg-[#1B2A4A]/30 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-[#1B2A4A] dark:text-[#6B8FD4]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Master</h3>
                  <p className="text-sm text-muted-foreground">Teach, manage classes, and grow</p>
                </div>
              </div>
            </Card>
            <Card className="p-5 cursor-pointer hover-elevate border-card-border" onClick={() => setRole("parent")} data-testid="card-role-parent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Parent</h3>
                  <p className="text-sm text-muted-foreground">Monitor and support your child</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setRole("")} data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-bold text-lg text-foreground capitalize">{role} Registration</h1>
        </div>
      </header>
      <div className="max-w-lg mx-auto px-4 py-6 pb-10">
        {role === "student" && (
          <Card className="p-6 border-card-border">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <Input value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} placeholder="Enter your name" data-testid="input-student-name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Age</label>
                <Input type="number" value={studentForm.age} onChange={(e) => setStudentForm({ ...studentForm, age: e.target.value })} placeholder="Your age" data-testid="input-student-age" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Martial Art</label>
                <Select value={studentForm.martialArt} onValueChange={(v) => setStudentForm({ ...studentForm, martialArt: v })}>
                  <SelectTrigger data-testid="select-student-art"><SelectValue placeholder="Choose a style" /></SelectTrigger>
                  <SelectContent>
                    {martialArts.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Belt Rank</label>
                <Select value={studentForm.beltRank} onValueChange={(v) => setStudentForm({ ...studentForm, beltRank: v })}>
                  <SelectTrigger data-testid="select-student-belt"><SelectValue placeholder="Current belt" /></SelectTrigger>
                  <SelectContent>
                    {beltRanks.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Goal</label>
                <Textarea value={studentForm.goal} onChange={(e) => setStudentForm({ ...studentForm, goal: e.target.value })} placeholder="What do you want to achieve?" data-testid="input-student-goal" />
              </div>
              <Button className="w-full bg-[#FF6B35] text-white" size="lg" onClick={() => studentMutation.mutate()} disabled={!studentForm.name || !studentForm.age || !studentForm.martialArt || !studentForm.beltRank || studentMutation.isPending} data-testid="button-submit-student">
                {studentMutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create Account"}
              </Button>
            </div>
          </Card>
        )}

        {role === "master" && (
          <Card className="p-6 border-card-border">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <Input value={masterForm.name} onChange={(e) => setMasterForm({ ...masterForm, name: e.target.value })} placeholder="Your name" data-testid="input-master-name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input type="email" value={masterForm.email} onChange={(e) => setMasterForm({ ...masterForm, email: e.target.value })} placeholder="your@email.com" data-testid="input-master-email" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
                <Textarea value={masterForm.bio} onChange={(e) => setMasterForm({ ...masterForm, bio: e.target.value })} placeholder="Tell us about your experience" data-testid="input-master-bio" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Martial Arts</label>
                <div className="flex gap-2 flex-wrap">
                  {martialArts.map(a => (
                    <div key={a} className="flex items-center gap-1.5">
                      <Checkbox checked={masterForm.martialArts.includes(a)} onCheckedChange={(c) => {
                        setMasterForm({ ...masterForm, martialArts: c ? [...masterForm.martialArts, a] : masterForm.martialArts.filter(x => x !== a) });
                      }} data-testid={`checkbox-art-${a}`} />
                      <span className="text-sm text-foreground">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Years Experience</label>
                  <Input type="number" value={masterForm.yearsExperience} onChange={(e) => setMasterForm({ ...masterForm, yearsExperience: e.target.value })} placeholder="Years" data-testid="input-master-exp" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Price/Class ($)</label>
                  <Input type="number" value={masterForm.pricePerClass} onChange={(e) => setMasterForm({ ...masterForm, pricePerClass: e.target.value })} placeholder="Price" data-testid="input-master-price" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">City</label>
                  <Input value={masterForm.city} onChange={(e) => setMasterForm({ ...masterForm, city: e.target.value })} placeholder="City" data-testid="input-master-city" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">State</label>
                  <Input value={masterForm.state} onChange={(e) => setMasterForm({ ...masterForm, state: e.target.value })} placeholder="State" data-testid="input-master-state" />
                </div>
              </div>
              <Button className="w-full bg-[#FF6B35] text-white" size="lg" onClick={() => masterMutation.mutate()} disabled={!masterForm.name || !masterForm.email || masterForm.martialArts.length === 0 || !masterForm.pricePerClass || !masterForm.city || !masterForm.state || masterMutation.isPending} data-testid="button-submit-master">
                {masterMutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create Account"}
              </Button>
            </div>
          </Card>
        )}

        {role === "parent" && (
          <Card className="p-6 border-card-border">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <Input value={parentForm.name} onChange={(e) => setParentForm({ ...parentForm, name: e.target.value })} placeholder="Your name" data-testid="input-parent-name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input type="email" value={parentForm.email} onChange={(e) => setParentForm({ ...parentForm, email: e.target.value })} placeholder="your@email.com" data-testid="input-parent-email" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <Input value={parentForm.phone} onChange={(e) => setParentForm({ ...parentForm, phone: e.target.value })} placeholder="(555) 123-4567" data-testid="input-parent-phone" />
              </div>
              <Button className="w-full bg-[#FF6B35] text-white" size="lg" onClick={() => parentMutation.mutate()} disabled={!parentForm.name || !parentForm.email || parentMutation.isPending} data-testid="button-submit-parent">
                {parentMutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create Account"}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
