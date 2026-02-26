import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.createMany({
    data: [
      { email: "admin@sparout.com", passwordHash: "$2b$10$placeholder", fullName: "Sparout Admin", role: "admin", city: "Mumbai", state: "Maharashtra", isActive: true, isVerified: true },
      { email: "rajesh@sparout.com", passwordHash: "$2b$10$placeholder", fullName: "Guru Rajesh Kumar", role: "master", phone: "+91 98765 43210", city: "Mumbai", state: "Maharashtra", isActive: true, isVerified: true },
      { email: "priya@sparout.com", passwordHash: "$2b$10$placeholder", fullName: "Sensei Priya Sharma", role: "master", phone: "+91 87654 32109", city: "Hyderabad", state: "Telangana", isActive: true, isVerified: true },
      { email: "arjun@sparout.com", passwordHash: "$2b$10$placeholder", fullName: "Coach Arjun Reddy", role: "master", phone: "+91 76543 21098", city: "Delhi", state: "Delhi", isActive: true, isVerified: true },
      { email: "deepa@sparout.com", passwordHash: "$2b$10$placeholder", fullName: "Master Deepa Nair", role: "master", phone: "+91 65432 10987", city: "Bangalore", state: "Karnataka", isActive: true, isVerified: true },
      { email: "suresh@sparout.com", passwordHash: "$2b$10$placeholder", fullName: "Guru Suresh Pillai", role: "master", phone: "+91 54321 09876", city: "Chennai", state: "Tamil Nadu", isActive: true, isVerified: true },
      { email: "amit@sparout.com", passwordHash: "$2b$10$placeholder", fullName: "Coach Amit Patel", role: "master", phone: "+91 43210 98765", city: "Pune", state: "Maharashtra", isActive: true, isVerified: true },
      { email: "aarav@example.com", passwordHash: "$2b$10$placeholder", fullName: "Aarav Mehta", role: "student", city: "Mumbai", state: "Maharashtra", isActive: true, isVerified: false },
      { email: "sneha@example.com", passwordHash: "$2b$10$placeholder", fullName: "Sneha Kapoor", role: "student", city: "Bangalore", state: "Karnataka", isActive: true, isVerified: false },
      { email: "ravi@example.com", passwordHash: "$2b$10$placeholder", fullName: "Ravi Kumar", role: "parent", city: "Delhi", state: "Delhi", isActive: true, isVerified: false },
    ],
  });

  const users = await prisma.user.findMany();
  const userMap = Object.fromEntries(users.map((u) => [u.email, u.id]));

  await prisma.masterProfile.createMany({
    data: [
      { userId: userMap["rajesh@sparout.com"], username: "guru-rajesh", styles: ["Karate", "Judo"], bio: "3rd Dan Black Belt in Shotokan Karate with over 15 years of competitive and teaching experience across India.", experience: 15, certifications: ["3rd Dan Black Belt - Karate India", "National Level Referee - Karate India", "Sports Science Certificate - NSNIS Patiala"], formats: ["In-Person", "Group Class", "Private Session"], pricePerClass: 800, priceMonthly: 5000, whatsapp: "+91 98765 43210", isFeatured: true, gallery: [], schedule: { days: [{ day: "Mon", time: "6:00 AM - 8:00 AM" }, { day: "Wed", time: "6:00 AM - 8:00 AM" }, { day: "Fri", time: "6:00 AM - 8:00 AM" }, { day: "Sat", time: "9:00 AM - 11:00 AM" }] } },
      { userId: userMap["priya@sparout.com"], username: "sensei-priya", styles: ["Taekwondo", "Kickboxing"], bio: "National Taekwondo gold medalist with a passion for empowering women through combat sports.", experience: 10, certifications: ["4th Dan Black Belt - Taekwondo Federation of India", "Kickboxing Instructor - WAKO India"], formats: ["In-Person", "Private Session"], pricePerClass: 600, priceMonthly: 4000, whatsapp: "+91 87654 32109", isFeatured: true, gallery: [], schedule: { days: [{ day: "Tue", time: "7:00 AM - 9:00 AM" }, { day: "Thu", time: "7:00 AM - 9:00 AM" }, { day: "Sat", time: "10:00 AM - 12:00 PM" }] } },
      { userId: userMap["arjun@sparout.com"], username: "coach-arjun", styles: ["MMA", "Boxing"], bio: "Former national MMA champion and professional boxer. 12 years training fighters across India.", experience: 12, certifications: ["MMA Black Belt - AIMMAA", "Boxing Coach Level 3 - BFI"], formats: ["In-Person", "Group Class", "Private Session"], pricePerClass: 1200, priceMonthly: 8000, whatsapp: "+91 76543 21098", isFeatured: true, gallery: [], schedule: { days: [{ day: "Mon", time: "5:30 AM - 7:30 AM" }, { day: "Wed", time: "5:30 AM - 7:30 AM" }, { day: "Fri", time: "5:30 AM - 7:30 AM" }, { day: "Sun", time: "7:00 AM - 9:00 AM" }] } },
      { userId: userMap["deepa@sparout.com"], username: "master-deepa", styles: ["Jiu-Jitsu", "Judo"], bio: "India's first female BJJ brown belt and national Judo silver medalist.", experience: 14, certifications: ["BJJ Brown Belt - IBJJF", "Judo 2nd Dan - Judo Federation of India"], formats: ["In-Person", "Private Session"], pricePerClass: 1000, priceMonthly: 6500, whatsapp: "+91 65432 10987", isFeatured: true, gallery: [], schedule: { days: [{ day: "Tue", time: "6:00 AM - 8:00 AM" }, { day: "Thu", time: "6:00 AM - 8:00 AM" }, { day: "Sat", time: "8:00 AM - 10:00 AM" }] } },
      { userId: userMap["suresh@sparout.com"], username: "guru-suresh", styles: ["Muay Thai", "Kalaripayattu"], bio: "18 years blending Muay Thai strikes with ancient Kalaripayattu warrior arts.", experience: 18, certifications: ["Muay Thai Kru - Rajadamnern Stadium", "CVN Kalari Certified"], formats: ["In-Person", "Group Class"], pricePerClass: 700, priceMonthly: 4500, whatsapp: "+91 54321 09876", isFeatured: false, gallery: [], schedule: { days: [{ day: "Mon", time: "5:30 AM - 7:30 AM" }, { day: "Wed", time: "5:30 AM - 7:30 AM" }, { day: "Fri", time: "5:30 AM - 7:30 AM" }, { day: "Sun", time: "7:00 AM - 9:00 AM" }] } },
      { userId: userMap["amit@sparout.com"], username: "coach-amit", styles: ["Kickboxing", "Boxing"], bio: "Former Maharashtra state boxing champion with 8 years of coaching experience.", experience: 8, certifications: ["Boxing Coach Level 2 - BFI", "Kickboxing Instructor - WAKO India"], formats: ["In-Person", "Group Class"], pricePerClass: 900, priceMonthly: 5500, whatsapp: "+91 43210 98765", isFeatured: false, gallery: [], schedule: { days: [{ day: "Mon", time: "6:00 AM - 8:00 AM" }, { day: "Wed", time: "6:00 AM - 8:00 AM" }, { day: "Fri", time: "6:00 AM - 8:00 AM" }, { day: "Sat", time: "9:00 AM - 11:00 AM" }] } },
    ],
  });

  await prisma.studentProfile.createMany({
    data: [
      { userId: userMap["aarav@example.com"], username: "aarav-mehta", age: 14, goals: "Achieve Black Belt by 2027. Compete at national level.", profileCompleteness: 85 },
      { userId: userMap["sneha@example.com"], username: "sneha-kapoor", age: 22, goals: "Compete in amateur MMA by end of 2026.", profileCompleteness: 70 },
    ],
  });

  const students = await prisma.studentProfile.findMany();
  const studentMap = Object.fromEntries(students.map((s) => [s.username, s.id]));

  await prisma.martialArtsJourney.createMany({
    data: [
      { studentId: studentMap["aarav-mehta"], style: "Karate", rank: "Purple Belt (3rd Kyu)", startDate: "2023", achievements: ["State Championship Bronze 2025", "District Champion 2024", "Best Kata Award 2024"], instructor: "Guru Rajesh Kumar" },
      { studentId: studentMap["aarav-mehta"], style: "Judo", rank: "Yellow Belt", startDate: "2025", achievements: ["Regional Competition Participant"], instructor: "Master Deepa Nair" },
      { studentId: studentMap["sneha-kapoor"], style: "Jiu-Jitsu", rank: "Blue Belt", startDate: "2024", achievements: ["Bangalore Open Silver 2025"], instructor: "Master Deepa Nair" },
      { studentId: studentMap["sneha-kapoor"], style: "MMA", rank: "Beginner", startDate: "2026", achievements: [], instructor: "Coach Arjun Reddy" },
    ],
  });

  await prisma.federation.createMany({
    data: [
      { name: "Ring Fight", description: "International Ring Fight Federation - India's premier combat sports organization promoting professional and amateur fighting events across the country.", websiteUrl: "https://singular-frangipane-2925f4.netlify.app/", isPartner: true },
      { name: "Karate India", description: "Official governing body for Karate in India, affiliated with the World Karate Federation.", websiteUrl: "https://karateindia.org", isPartner: true },
      { name: "Taekwondo Federation of India", description: "National federation for Taekwondo, affiliated with World Taekwondo.", websiteUrl: "https://taekwondoindia.org", isPartner: false },
    ],
  });

  const federations = await prisma.federation.findMany();
  const fedMap = Object.fromEntries(federations.map((f) => [f.name, f.id]));

  await prisma.event.createMany({
    data: [
      { title: "National Karate Championship 2026", description: "Annual national-level karate tournament open to all belt levels. Kata and kumite divisions.", martialArt: "Karate", date: "March 15, 2026", city: "Mumbai", state: "Maharashtra", ageGroups: ["8-12", "13-17", "18+"], weightClasses: ["Lightweight", "Middleweight", "Heavyweight"], entryFee: "500", spotsLeft: 120, federationId: fedMap["Karate India"] },
      { title: "Ring Fight Championship - Delhi", description: "International Ring Fight Federation sanctioned event. Professional and amateur divisions.", martialArt: "Ring Fight", date: "April 2, 2026", city: "New Delhi", state: "Delhi", ageGroups: ["18+"], weightClasses: ["Flyweight", "Bantamweight", "Featherweight", "Lightweight", "Welterweight", "Middleweight", "Heavyweight"], entryFee: "1,000", spotsLeft: 64, federationId: fedMap["Ring Fight"] },
      { title: "South India Taekwondo Open", description: "Regional championship featuring poomsae and sparring events.", martialArt: "Taekwondo", date: "April 20, 2026", city: "Chennai", state: "Tamil Nadu", ageGroups: ["10-14", "15-18", "19+"], weightClasses: ["Fin", "Fly", "Bantam", "Feather", "Light", "Welter", "Middle", "Heavy"], entryFee: "400", spotsLeft: 200, federationId: fedMap["Taekwondo Federation of India"] },
      { title: "Jiu-Jitsu Grand Prix - Bangalore", description: "Gi and No-Gi divisions. All belt levels welcome.", martialArt: "Jiu-Jitsu", date: "May 10, 2026", city: "Bangalore", state: "Karnataka", ageGroups: ["16+"], weightClasses: ["Rooster", "Light Feather", "Feather", "Light", "Middle", "Medium Heavy", "Heavy", "Super Heavy", "Ultra Heavy"], entryFee: "800", spotsLeft: 80 },
    ],
  });

  await prisma.review.createMany({
    data: [
      { authorId: userMap["aarav@example.com"], targetId: userMap["rajesh@sparout.com"], rating: 5, text: "Exceptional training and personal attention. Rajesh sir pushes you to be your best while maintaining a supportive environment." },
      { authorId: userMap["sneha@example.com"], targetId: userMap["rajesh@sparout.com"], rating: 5, text: "My son has been training here for 6 months and the improvement is incredible. Discipline, confidence, and physical fitness all improved." },
      { authorId: userMap["ravi@example.com"], targetId: userMap["rajesh@sparout.com"], rating: 4, text: "Great traditional karate training. The only reason for 4 stars is the limited schedule options." },
      { authorId: userMap["sneha@example.com"], targetId: userMap["deepa@sparout.com"], rating: 5, text: "Master Deepa is an incredible Jiu-Jitsu instructor. Her technique breakdowns are so clear." },
      { authorId: userMap["aarav@example.com"], targetId: userMap["arjun@sparout.com"], rating: 5, text: "Coach Arjun's MMA classes are intense but rewarding. You feel like a real fighter." },
    ],
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
