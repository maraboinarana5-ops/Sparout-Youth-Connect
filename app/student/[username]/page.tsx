"use client";
import Link from "next/link";
import { ArrowLeft, Award, Target, Calendar, Star, Shield, TrendingUp, BookOpen, Trophy } from "lucide-react";

const studentData: Record<string, any> = {
  "aarav-mehta": {
    name: "Aarav Mehta",
    age: 14,
    city: "Mumbai",
    state: "Maharashtra",
    bio: "Passionate martial artist with 3 years of Karate training. Currently preparing for my Brown Belt examination. I love the discipline and focus that martial arts brings to my life.",
    goals: "Achieve Black Belt by 2027. Compete at national level.",
    profileCompleteness: 85,
    journey: [
      { style: "Karate", rank: "Purple Belt (3rd Kyu)", startDate: "2023", achievements: ["State Championship Bronze 2025", "District Champion 2024", "Best Kata Award 2024"], instructor: "Guru Rajesh Kumar" },
      { style: "Judo", rank: "Yellow Belt", startDate: "2025", achievements: ["Regional Competition Participant"], instructor: "Master Deepa Nair" },
    ],
    stats: { totalTraining: "3 years", competitions: 5, medals: 3, styles: 2 },
    upcomingClasses: [
      { day: "Mon, Feb 26", time: "6:00 AM", style: "Karate", instructor: "Guru Rajesh" },
      { day: "Wed, Feb 28", time: "6:00 AM", style: "Karate", instructor: "Guru Rajesh" },
    ],
  },
  "sneha-kapoor": {
    name: "Sneha Kapoor",
    age: 22,
    city: "Bangalore",
    state: "Karnataka",
    bio: "Software engineer by day, martial artist by passion. Training in Jiu-Jitsu for 2 years and recently started MMA.",
    goals: "Compete in amateur MMA by end of 2026.",
    profileCompleteness: 70,
    journey: [
      { style: "Jiu-Jitsu", rank: "Blue Belt", startDate: "2024", achievements: ["Bangalore Open Silver 2025"], instructor: "Master Deepa Nair" },
      { style: "MMA", rank: "Beginner", startDate: "2026", achievements: [], instructor: "Coach Arjun Reddy" },
    ],
    stats: { totalTraining: "2 years", competitions: 2, medals: 1, styles: 2 },
    upcomingClasses: [
      { day: "Tue, Feb 27", time: "7:00 AM", style: "MMA", instructor: "Coach Arjun" },
    ],
  },
};

export default function StudentProfilePage({ params }: { params: { username: string } }) {
  const student = studentData[params.username];

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-navy mb-2">Student not found</h2>
          <Link href="/" className="text-orange hover:underline">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-navy via-navy-400 to-navy-300 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-4" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl bg-orange/20 flex items-center justify-center text-orange text-2xl font-bold flex-shrink-0">
              {student.name.split(" ").map((n: string) => n[0]).join("")}
            </div>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-student-name">{student.name}</h1>
              <p className="text-white/60 text-sm">{student.age} years old &middot; {student.city}, {student.state}</p>
              <p className="text-white/70 text-sm mt-2 max-w-lg">{student.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy">Profile Completeness</span>
            <span className="text-sm font-bold text-orange">{student.profileCompleteness}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange rounded-full transition-all" style={{ width: `${student.profileCompleteness}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <Calendar className="w-5 h-5 text-orange mx-auto mb-1" />
            <div className="text-lg font-bold text-navy">{student.stats.totalTraining}</div>
            <div className="text-xs text-gray-500">Training</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <Trophy className="w-5 h-5 text-orange mx-auto mb-1" />
            <div className="text-lg font-bold text-navy">{student.stats.competitions}</div>
            <div className="text-xs text-gray-500">Competitions</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <Award className="w-5 h-5 text-gold mx-auto mb-1" />
            <div className="text-lg font-bold text-navy">{student.stats.medals}</div>
            <div className="text-xs text-gray-500">Medals</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <BookOpen className="w-5 h-5 text-orange mx-auto mb-1" />
            <div className="text-lg font-bold text-navy">{student.stats.styles}</div>
            <div className="text-xs text-gray-500">Styles</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-orange" />
            <h2 className="text-lg font-bold text-navy">Goals</h2>
          </div>
          <p className="text-sm text-gray-600">{student.goals}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange" />
            <h2 className="text-lg font-bold text-navy">Martial Arts Journey</h2>
          </div>
          <div className="space-y-6">
            {student.journey.map((j: any, i: number) => (
              <div key={i} className="relative pl-6 border-l-2 border-orange/30" data-testid={`journey-${i}`}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-orange" />
                <div className="mb-2">
                  <h3 className="font-semibold text-navy">{j.style}</h3>
                  <p className="text-sm text-gray-500">{j.rank} &middot; Since {j.startDate}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Instructor: {j.instructor}</p>
                </div>
                {j.achievements.length > 0 && (
                  <div className="space-y-1">
                    {j.achievements.map((a: string, k: number) => (
                      <div key={k} className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {student.upcomingClasses.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Upcoming Classes</h2>
            <div className="space-y-3">
              {student.upcomingClasses.map((cls: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50" data-testid={`class-${i}`}>
                  <div>
                    <span className="text-sm font-medium text-navy">{cls.day}</span>
                    <span className="text-sm text-gray-400 ml-2">{cls.time}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {cls.style} &middot; {cls.instructor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
