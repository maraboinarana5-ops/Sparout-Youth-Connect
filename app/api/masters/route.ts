import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const masters = await prisma.masterProfile.findMany({
    include: { user: true },
    orderBy: { isFeatured: "desc" },
  });

  const reviewCounts = await prisma.review.groupBy({
    by: ["targetId"],
    _count: true,
    _avg: { rating: true },
  });
  const reviewMap = Object.fromEntries(
    reviewCounts.map((r) => [r.targetId, { count: r._count, avg: r._avg.rating ?? 0 }])
  );

  const result = masters.map((m) => ({
    id: m.id,
    username: m.username,
    name: m.user.fullName,
    styles: m.styles,
    city: m.user.city,
    state: m.user.state,
    rating: reviewMap[m.userId]?.avg ? Math.round(reviewMap[m.userId].avg * 10) / 10 : 0,
    reviews: reviewMap[m.userId]?.count ?? 0,
    price: m.pricePerClass ?? 0,
    experience: m.experience,
    verified: m.user.isVerified,
    format: m.formats[0] ?? "In-Person",
    gender: "Male",
    students: 0,
    bio: m.bio ?? "",
    isFeatured: m.isFeatured,
  }));

  return NextResponse.json(result);
}
