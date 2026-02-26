import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MasterProfileClient from "./master-profile-client";

export default async function MasterProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const master = await prisma.masterProfile.findUnique({
    where: { username },
    include: { user: true },
  });

  if (!master) notFound();

  const reviews = await prisma.review.findMany({
    where: { targetId: master.userId },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const schedule = (master.schedule as any)?.days ?? [];

  const data = {
    username: master.username,
    name: master.user.fullName,
    styles: master.styles,
    city: master.user.city ?? "",
    state: master.user.state ?? "",
    rating: Math.round(avgRating * 10) / 10,
    totalReviews: reviews.length,
    price: master.pricePerClass ?? 0,
    priceMonthly: master.priceMonthly ?? 0,
    experience: master.experience,
    verified: master.user.isVerified,
    students: 0,
    bio: master.bio ?? "",
    certifications: master.certifications,
    formats: master.formats,
    phone: master.user.phone ?? "",
    whatsapp: master.whatsapp ?? "",
    email: master.user.email,
    schedule,
    reviewsList: reviews.map((r) => ({
      name: r.author.fullName,
      rating: r.rating,
      text: r.text ?? "",
      date: r.createdAt.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
    })),
  };

  return <MasterProfileClient master={data} />;
}
