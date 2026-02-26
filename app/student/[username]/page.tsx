import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award, Target, Calendar, Trophy, TrendingUp, BookOpen } from "lucide-react";

export default async function StudentProfilePage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const student = await prisma.studentProfile.findUnique({
    where: { username },
    include: { user: true, journey: true },
  });

  if (!student) notFound();

  const stats = {
    totalTraining: `${student.journey.length} styles`,
    competitions: student.journey.reduce((sum, j) => sum + j.achievements.length, 0),
    medals: student.journey.reduce((sum, j) => sum + j.achievements.filter(a => a.toLowerCase().includes("gold") || a.toLowerCase().includes("silver") || a.toLowerCase().includes("bronze") || a.toLowerCase().includes("champion")).length, 0),
    styles: student.journey.length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-navy via-navy-400 to-navy-300 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-4" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl bg-orange/20 flex items-center justify-center text-orange text-2xl font-bold flex-shrink-0">
              {student.user.fullName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-student-name">{student.user.fullName}</h1>
              <p className="text-white/60 text-sm">{student.age} years old &middot; {student.user.city}, {student.user.state}</p>
              <p className="text-white/70 text-sm mt-2 max-w-lg">{student.goals}</p>
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
            <div className="text-lg font-bold text-navy">{stats.totalTraining}</div>
            <div className="text-xs text-gray-500">Training</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <Trophy className="w-5 h-5 text-orange mx-auto mb-1" />
            <div className="text-lg font-bold text-navy">{stats.competitions}</div>
            <div className="text-xs text-gray-500">Achievements</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <Award className="w-5 h-5 text-gold mx-auto mb-1" />
            <div className="text-lg font-bold text-navy">{stats.medals}</div>
            <div className="text-xs text-gray-500">Medals</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <BookOpen className="w-5 h-5 text-orange mx-auto mb-1" />
            <div className="text-lg font-bold text-navy">{stats.styles}</div>
            <div className="text-xs text-gray-500">Styles</div>
          </div>
        </div>

        {student.goals && (
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-orange" />
              <h2 className="text-lg font-bold text-navy">Goals</h2>
            </div>
            <p className="text-sm text-gray-600">{student.goals}</p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange" />
            <h2 className="text-lg font-bold text-navy">Martial Arts Journey</h2>
          </div>
          <div className="space-y-6">
            {student.journey.map((j, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-orange/30" data-testid={`journey-${i}`}>
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-orange" />
                <div className="mb-2">
                  <h3 className="font-semibold text-navy">{j.style}</h3>
                  <p className="text-sm text-gray-500">{j.rank} &middot; Since {j.startDate}</p>
                  {j.instructor && <p className="text-xs text-gray-400 mt-0.5">Instructor: {j.instructor}</p>}
                </div>
                {j.achievements.length > 0 && (
                  <div className="space-y-1">
                    {j.achievements.map((a, k) => (
                      <div key={k} className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-3.5 h-3.5 text-gold flex-shrink-0" /> {a}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
