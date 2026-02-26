import Link from "next/link";
import { Search, ArrowRight, Shield, Users, MapPin, Zap, ChevronRight, Star, Award } from "lucide-react";
import { prisma } from "@/lib/prisma";

const martialArts = [
  { name: "Karate" }, { name: "MMA" }, { name: "Jiu-Jitsu" }, { name: "Taekwondo" },
  { name: "Boxing" }, { name: "Muay Thai" }, { name: "Kung Fu" }, { name: "Krav Maga" },
  { name: "Judo" }, { name: "Wrestling" }, { name: "Kickboxing" }, { name: "Kalaripayattu" },
  { name: "Silambam" }, { name: "Gatka" }, { name: "Ring Fight" },
];

const steps = [
  { icon: Search, title: "Search", desc: "Find masters by martial art, city, or training format" },
  { icon: Users, title: "Connect", desc: "Book a session and connect with your ideal instructor" },
  { icon: Zap, title: "Train", desc: "Begin your martial arts journey with expert guidance" },
];

const testimonials = [
  { name: "Ananya R.", role: "Student, Mumbai", text: "Sparout helped me find the perfect Karate master. My daughter has grown so much in confidence!", rating: 5 },
  { name: "Vikram S.", role: "Master, Delhi", text: "The platform has connected me with dedicated students who are passionate about martial arts.", rating: 5 },
  { name: "Meera P.", role: "Parent, Bangalore", text: "I love being able to track my son's progress and manage his classes all in one place.", rating: 5 },
];

export default async function HomePage() {
  const mastersData = await prisma.masterProfile.findMany({
    where: { isFeatured: true },
    include: { user: true },
    take: 6,
  });

  const reviewCounts = await prisma.review.groupBy({
    by: ["targetId"],
    _count: true,
    _avg: { rating: true },
  });
  const reviewMap = Object.fromEntries(
    reviewCounts.map((r) => [r.targetId, { count: r._count, avg: r._avg.rating ?? 0 }])
  );

  const featuredMasters = mastersData.map((m) => ({
    id: m.id,
    username: m.username,
    name: m.user.fullName,
    style: m.styles[0] ?? "Martial Arts",
    city: m.user.city ?? "",
    rating: reviewMap[m.userId]?.avg ? Math.round(reviewMap[m.userId].avg * 10) / 10 : 4.8,
    reviews: reviewMap[m.userId]?.count ?? 0,
    price: m.pricePerClass ?? 0,
    experience: m.experience,
    verified: m.user.isVerified,
  }));

  const eventsData = await prisma.event.findMany({
    take: 2,
    orderBy: { createdAt: "asc" },
  });

  const federationsData = await prisma.federation.findMany({
    where: { isPartner: true },
  });

  const totalMasters = await prisma.masterProfile.count();
  const totalStudents = await prisma.studentProfile.count();

  return (
    <div>
      <section className="relative bg-navy text-white overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-400 to-navy opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
              Find Your Master.<br />
              <span className="text-orange">Build Your Legacy.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
              Connect with verified martial arts instructors across India. Train in Karate, MMA, Jiu-Jitsu, and 10+ disciplines.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search by martial art or city..." className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange" data-testid="input-hero-search" />
              </div>
              <Link href="/masters" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors" data-testid="button-explore">
                Explore Masters <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-navy" data-testid="stat-masters">{totalMasters > 100 ? `${totalMasters}+` : `${totalMasters}`}</div>
              <div className="text-sm text-gray-500">Verified Masters</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-navy" data-testid="stat-students">{totalStudents > 100 ? `${totalStudents.toLocaleString()}+` : `${totalStudents}`}</div>
              <div className="text-sm text-gray-500">Active Students</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-navy" data-testid="stat-arts">15+</div>
              <div className="text-sm text-gray-500">Martial Arts</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-navy" data-testid="stat-cities">50+</div>
              <div className="text-sm text-gray-500">Cities</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20" data-testid="featured-masters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy">Featured Masters</h2>
              <p className="text-gray-500 mt-1">Top-rated instructors handpicked for you</p>
            </div>
            <Link href="/masters" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-orange hover:text-orange-600 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredMasters.map((master) => (
              <Link key={master.id} href={`/master/${master.username}`} data-testid={`card-master-${master.id}`}>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-40 bg-gradient-to-br from-navy-300 to-navy flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-orange/20 flex items-center justify-center text-orange text-2xl font-bold">
                      {master.name.charAt(0)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="font-semibold text-navy truncate">{master.name}</h3>
                      {master.verified && <Shield className="w-4 h-4 text-orange flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{master.style} &middot; {master.experience}yr exp</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <MapPin className="w-3.5 h-3.5" /> {master.city}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="text-sm font-semibold text-navy">{master.rating}</span>
                        <span className="text-xs text-gray-400">({master.reviews})</span>
                      </div>
                      <span className="text-sm font-bold text-navy">&#8377;{master.price}<span className="text-xs font-normal text-gray-400">/session</span></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/masters" className="inline-flex items-center gap-1 text-sm font-semibold text-orange">
              View All Masters <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" data-testid="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">How It Works</h2>
          <p className="text-gray-500 mb-12">Get started in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center" data-testid={`step-${i + 1}`}>
                <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-orange" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20" data-testid="browse-arts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">Browse by Martial Art</h2>
          <p className="text-gray-500 text-center mb-10">Explore masters across 15+ disciplines</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {martialArts.map((art) => (
              <Link key={art.name} href={`/masters?style=${encodeURIComponent(art.name)}`} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-100 hover:border-orange/30 hover:shadow-md transition-all group" data-testid={`art-${art.name.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="w-12 h-12 rounded-xl bg-navy/5 group-hover:bg-orange/10 flex items-center justify-center transition-colors">
                  <Award className="w-6 h-6 text-navy group-hover:text-orange transition-colors" />
                </div>
                <span className="text-xs font-semibold text-navy text-center">{art.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" data-testid="events-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy">Upcoming Events</h2>
              <p className="text-gray-500 mt-1">Tournaments and competitions near you</p>
            </div>
            <Link href="/events" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-orange hover:text-orange-600 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {eventsData.map((event) => {
              const dateStr = event.date;
              const parts = dateStr.split(" ");
              const month = parts[0]?.slice(0, 3).toUpperCase() ?? "";
              const day = parts[1]?.replace(",", "") ?? "";
              return (
                <Link key={event.id} href={`/events/${event.id}`} className="rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow" data-testid={`event-${event.id}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-orange/10 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-orange uppercase">{month}</span>
                      <span className="text-lg font-bold text-navy">{day}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{event.description?.slice(0, 80)}...</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.city}, {event.state}</span>
                        <span>Entry: &#8377;{event.entryFee}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 md:py-20 text-white" data-testid="partners-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Partner Federations</h2>
          <p className="text-white/60 mb-10">Trusted by leading martial arts organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {federationsData.map((fed) => (
              <Link key={fed.id} href={fed.websiteUrl ?? "#"} target="_blank" className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" data-testid={`partner-${fed.name.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="w-16 h-16 rounded-full bg-orange/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-orange" />
                </div>
                <span className="font-semibold">{fed.name}</span>
                <span className="text-xs text-white/50 max-w-[200px] text-center">{fed.description?.slice(0, 60)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">What People Say</h2>
          <p className="text-gray-500 text-center mb-10">Hear from our community</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100" data-testid={`testimonial-${i}`}>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orange py-16 md:py-20 text-white text-center" data-testid="cta-section">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-white/80 mb-8">Join thousands of students and masters on Sparout.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="px-8 py-3 bg-white text-orange font-semibold rounded-lg hover:bg-gray-100 transition-colors" data-testid="button-cta-signup">Sign Up Free</Link>
            <Link href="/masters" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors" data-testid="button-cta-browse">Browse Masters</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
