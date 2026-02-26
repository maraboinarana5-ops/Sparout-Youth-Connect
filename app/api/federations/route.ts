import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const federations = await prisma.federation.findMany({
    orderBy: { isPartner: "desc" },
  });

  return NextResponse.json(
    federations.map((f) => ({
      id: f.id,
      name: f.name,
      description: f.description ?? "",
      logoUrl: f.logoUrl,
      websiteUrl: f.websiteUrl ?? "",
      isPartner: f.isPartner,
    }))
  );
}
