import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, Trophy, TrendingUp, ChevronRight, Clock } from "lucide-react";

export default async function ParentDashboard() {
  const students = await prisma.studentProfile.findMany({
    include: {
      user: true,
      journey: true,
    },
    take: 5,
  });

  const events = await prisma.event.findMany({ take: 3, orderBy: { createdAt: "asc" } });

  const children = students.map((s) => ({
    id: s.id,
    name: s.user.fullName,
    username: s.username,
    age: s.age,
    currentStyle: s.journey[0]?.style ?? "N/A",
    rank: s.journey[0]?.rank ?? "Beginner",
    instructor: s.journey[0]?.instructor ?? "N/A",
    progress: s.profileCompleteness,
    recentAchievements: s.journey.flatMap((j) => j.achievements).slice(0, 2),
    upcomingEvents: events.slice(0, 1).map((e) => ({ name: e.title, date: e.date })),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Parent Dashboard</h1>
          <p className="text-white/60 text-sm mt-1">Manage your children&apos;s martial arts training</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg font-bold text-navy mb-4">Your Children</h2>
        <div className="space-y-4 mb-8">
          {children.map((child) => (
            <div key={child.id} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`child-card-${child.id}`}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange text-xl font-bold">
                    {child.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <Link href={`/student/${child.username}`} className="text-lg font-semibold text-navy hover:text-orange transition-colors">
                      {child.name}
                    </Link>
                    <p className="text-sm text-gray-500">{child.age} years old &middot; {child.currentStyle} &middot; {child.rank}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Instructor: {child.instructor}</p>
                  </div>
                </div>
                <Link href={`/student/${child.username}`} className="px-4 py-2 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
                  View Profile <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Clock className="w-4 h-4 text-orange" /> Current Style
                  </div>
                  <div className="text-sm font-medium text-navy">{child.currentStyle} - {child.rank}</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <TrendingUp className="w-4 h-4 text-orange" /> Progress
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1.5">
                    <div className="h-full bg-orange rounded-full" style={{ width: `${child.progress}%` }} />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Trophy className="w-4 h-4 text-gold" /> Recent Achievement
                  </div>
                  <div className="text-sm font-medium text-navy">{child.recentAchievements[0] || "None yet"}</div>
                </div>
              </div>

              {child.upcomingEvents.length > 0 && (
                <div className="mt-4 p-3 rounded-lg border border-orange/20 bg-orange/5">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-orange" />
                    <span className="font-medium text-navy">Upcoming: {child.upcomingEvents[0].name}</span>
                    <span className="text-gray-400">&middot; {child.upcomingEvents[0].date}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/masters" className="flex-1 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-center text-sm" data-testid="button-find-master">
            Find a New Master
          </Link>
          <Link href="/events" className="flex-1 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy/5 transition-colors text-center text-sm" data-testid="button-browse-events">
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
}
