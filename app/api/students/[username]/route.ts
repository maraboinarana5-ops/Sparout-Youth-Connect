import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { username: string } }) {
  const student = await prisma.studentProfile.findUnique({
    where: { username: params.username },
    include: { user: true, journey: true },
  });

  if (!student) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: student.user.fullName,
    age: student.age,
    city: student.user.city,
    state: student.user.state,
    bio: student.user.avatarUrl ?? student.goals ?? "",
    goals: student.goals ?? "",
    profileCompleteness: student.profileCompleteness,
    journey: student.journey.map((j) => ({
      style: j.style,
      rank: j.rank ?? "",
      startDate: j.startDate ?? "",
      achievements: j.achievements,
      instructor: j.instructor ?? "",
    })),
    stats: {
      totalTraining: `${student.journey.length} styles`,
      competitions: 0,
      medals: 0,
      styles: student.journey.length,
    },
  });
}
