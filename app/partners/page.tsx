import Link from "next/link";
import { Award, ExternalLink, Globe } from "lucide-react";

const partners = [
  { id: 1, name: "Ring Fight", description: "International Ring Fight Federation - Promoting professional ring fighting across the globe. Organizers of championship-level MMA and kickboxing events in India.", websiteUrl: "https://singular-frangipane-2925f4.netlify.app/", featured: true },
  { id: 2, name: "Karate India", description: "National governing body for Karate in India. Affiliated with World Karate Federation. Organizes national championships and selects athletes for international competition.", websiteUrl: "#", featured: false },
  { id: 3, name: "Taekwondo Federation of India", description: "Official federation for Taekwondo in India. Affiliated with World Taekwondo. Promotes the Korean martial art across all Indian states.", websiteUrl: "#", featured: false },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Partner Federations</h1>
          <p className="text-white/60">Trusted martial arts organizations on Sparout</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`bg-white rounded-xl border p-6 ${partner.featured ? "border-orange/30 ring-1 ring-orange/10" : "border-gray-100"}`}
              data-testid={`card-partner-${partner.id}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${partner.featured ? "bg-orange/10" : "bg-gray-100"}`}>
                  <Award className={`w-8 h-8 ${partner.featured ? "text-orange" : "text-gray-400"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-navy">{partner.name}</h2>
                    {partner.featured && (
                      <span className="text-xs px-2 py-0.5 bg-orange/10 text-orange rounded-full font-semibold">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{partner.description}</p>
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-orange hover:text-orange-600 transition-colors"
                    data-testid={`link-partner-website-${partner.id}`}
                  >
                    <Globe className="w-4 h-4" /> Visit Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
