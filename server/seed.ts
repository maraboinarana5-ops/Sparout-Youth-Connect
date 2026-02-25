import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { masters, classes, tournaments, reviews, students } from "@shared/schema";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export async function seedDatabase() {
  const existingMasters = await db.select().from(masters);
  if (existingMasters.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  console.log("Seeding database...");

  const seedMasters = await db.insert(masters).values([
    {
      name: "Sensei Hiroshi Tanaka",
      email: "hiroshi@sparout.com",
      phone: "(555) 101-2001",
      bio: "A 5th-degree black belt in Shotokan Karate with over 20 years of experience training youth competitors. Sensei Tanaka has led teams to national championships and specializes in building confidence and discipline in young athletes.",
      photoUrl: "/images/master-karate.png",
      martialArts: ["Karate"],
      yearsExperience: 22,
      verified: true,
      rating: "4.90",
      pricePerClass: "45.00",
      city: "Los Angeles",
      state: "CA",
      studentsCount: 156,
      winsCount: 89,
    },
    {
      name: "Master Jin-Soo Park",
      email: "jinsoo@sparout.com",
      phone: "(555) 102-2002",
      bio: "Olympic-level Taekwondo instructor and former Team USA coach. Master Park brings world-class technique and an inspiring teaching style, making advanced skills accessible to students of all ages.",
      photoUrl: "/images/master-taekwondo.png",
      martialArts: ["Taekwondo"],
      yearsExperience: 18,
      verified: true,
      rating: "4.85",
      pricePerClass: "55.00",
      city: "Houston",
      state: "TX",
      studentsCount: 210,
      winsCount: 134,
    },
    {
      name: "Professor Carlos Silva",
      email: "carlos@sparout.com",
      phone: "(555) 103-2003",
      bio: "3rd-degree black belt in Brazilian Jiu-Jitsu and IBJJF Pan American medalist. Professor Silva focuses on technique over strength, teaching students the art of leverage and ground control in a safe, encouraging environment.",
      photoUrl: "/images/master-jiujitsu.png",
      martialArts: ["Jiu-Jitsu"],
      yearsExperience: 15,
      verified: true,
      rating: "4.92",
      pricePerClass: "50.00",
      city: "Miami",
      state: "FL",
      studentsCount: 98,
      winsCount: 67,
    },
    {
      name: "Coach Marcus Williams",
      email: "marcus@sparout.com",
      phone: "(555) 104-2004",
      bio: "Former professional boxer and certified USA Boxing coach with a passion for youth development. Coach Williams combines footwork drills, defensive techniques, and conditioning into fun, high-energy classes.",
      photoUrl: "/images/master-boxing.png",
      martialArts: ["Boxing"],
      yearsExperience: 12,
      verified: true,
      rating: "4.78",
      pricePerClass: "40.00",
      city: "Chicago",
      state: "IL",
      studentsCount: 124,
      winsCount: 56,
    },
    {
      name: "Coach Elena Rodriguez",
      email: "elena@sparout.com",
      phone: "(555) 105-2005",
      bio: "Certified MMA instructor and former Invicta FC competitor. Coach Rodriguez specializes in a well-rounded approach combining striking and grappling, with a strong emphasis on safety and personal growth for young athletes.",
      photoUrl: "/images/master-mma.png",
      martialArts: ["MMA", "Boxing", "Jiu-Jitsu"],
      yearsExperience: 10,
      verified: true,
      rating: "4.88",
      pricePerClass: "60.00",
      city: "San Diego",
      state: "CA",
      studentsCount: 87,
      winsCount: 42,
    },
    {
      name: "Kru Somsak Chai",
      email: "somsak@sparout.com",
      phone: "(555) 106-2006",
      bio: "Authentic Muay Thai instructor trained in Bangkok, Thailand with 16 years of experience. Kru Somsak combines traditional Muay Thai techniques with modern training methods, creating a unique and effective program for youth.",
      photoUrl: "/images/master-muaythai.png",
      martialArts: ["Muay Thai"],
      yearsExperience: 16,
      verified: true,
      rating: "4.82",
      pricePerClass: "48.00",
      city: "New York",
      state: "NY",
      studentsCount: 142,
      winsCount: 78,
    },
  ]).returning();

  const seedStudents = await db.insert(students).values([
    { name: "Alex Kim", email: "alex@example.com", age: 14, martialArt: "Karate", beltRank: "Blue Belt", goal: "Compete in national championships" },
    { name: "Sophie Chen", email: "sophie@example.com", age: 12, martialArt: "Taekwondo", beltRank: "Green Belt", goal: "Earn my black belt" },
    { name: "Marcus Jr.", email: "marcusjr@example.com", age: 10, martialArt: "Jiu-Jitsu", beltRank: "White Belt", goal: "Learn self-defense" },
  ]).returning();

  for (const master of seedMasters) {
    const dates = ["2026-03-01", "2026-03-03", "2026-03-05"];
    const times = ["10:00 AM", "2:00 PM", "4:30 PM"];
    for (let i = 0; i < 3; i++) {
      await db.insert(classes).values({
        masterId: master.id,
        title: `${master.martialArts[0]} - ${i === 0 ? "Beginners" : i === 1 ? "Intermediate" : "Advanced"}`,
        martialArt: master.martialArts[0],
        date: dates[i],
        time: times[i],
        durationMinutes: 60,
        price: master.pricePerClass,
        maxStudents: 12,
        spotsRemaining: 12 - Math.floor(Math.random() * 8),
        location: `${master.city} Training Center`,
      });
    }
  }

  await db.insert(tournaments).values([
    {
      name: "Spring Youth Karate Championship",
      description: "The premier youth karate tournament of the spring season. Athletes from across the state compete in kata and kumite divisions, showcasing their skills and sportsmanship.",
      martialArt: "Karate",
      ageMin: 8,
      ageMax: 16,
      date: "2026-04-15",
      location: "LA Convention Center",
      city: "Los Angeles",
      state: "CA",
      entryFee: "35.00",
      maxParticipants: 120,
      spotsRemaining: 47,
      rules: "WKF rules apply. All participants must have valid insurance and a medical certificate. Safety gear is mandatory.",
      featured: true,
    },
    {
      name: "National Youth BJJ Open",
      description: "A highly anticipated Brazilian Jiu-Jitsu competition for young grapplers. Divisions by age, weight, and belt rank ensure fair and exciting matchups at every level.",
      martialArt: "Jiu-Jitsu",
      ageMin: 10,
      ageMax: 18,
      date: "2026-05-20",
      location: "Miami Beach Convention Center",
      city: "Miami",
      state: "FL",
      entryFee: "45.00",
      maxParticipants: 200,
      spotsRemaining: 123,
      rules: "IBJJF rules apply. Gi and No-Gi divisions available. Weigh-in required on tournament day.",
      featured: false,
    },
    {
      name: "Junior Taekwondo Invitational",
      description: "An exciting invitational tournament for young Taekwondo athletes. Features poomsae and sparring divisions with trophies for top performers in every age group.",
      martialArt: "Taekwondo",
      ageMin: 6,
      ageMax: 14,
      date: "2026-06-10",
      location: "Houston Sports Arena",
      city: "Houston",
      state: "TX",
      entryFee: "30.00",
      maxParticipants: 150,
      spotsRemaining: 89,
      rules: "WT rules apply. Electronic scoring system. All protective gear must be approved.",
      featured: true,
    },
  ]);

  const reviewTexts = [
    { rating: 5, comment: "Incredible instructor! My son has gained so much confidence and skill in just a few months.", name: "Sarah M." },
    { rating: 5, comment: "The best training experience for kids. Patient, knowledgeable, and truly cares about each student.", name: "David L." },
    { rating: 4, comment: "Great classes with a focus on discipline and fun. My daughter looks forward to every session.", name: "Jennifer K." },
    { rating: 5, comment: "A truly gifted teacher. You can see the passion and expertise in every class.", name: "Michael R." },
    { rating: 4, comment: "Wonderful program for young athletes. The structured curriculum really shows results.", name: "Amanda T." },
  ];

  for (const master of seedMasters) {
    const shuffled = [...reviewTexts].sort(() => Math.random() - 0.5);
    for (let i = 0; i < 3; i++) {
      await db.insert(reviews).values({
        masterId: master.id,
        studentId: seedStudents[i % seedStudents.length].id,
        studentName: shuffled[i].name,
        rating: shuffled[i].rating,
        comment: shuffled[i].comment,
      });
    }
  }

  console.log("Database seeded successfully!");
}
