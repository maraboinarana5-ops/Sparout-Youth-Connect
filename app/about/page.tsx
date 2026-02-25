import { Award, Users, Globe, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-page-title">About Sparout</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            India's first dedicated martial arts marketplace connecting students with verified masters across 14+ disciplines.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Sparout was born from a simple belief: everyone deserves access to quality martial arts training. We're building a platform that makes it easy for students and parents to discover, connect with, and learn from the best martial arts instructors in India.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Whether you're looking for a Karate dojo in Mumbai, an MMA gym in Delhi, or a traditional Kalaripayattu master in Kerala, Sparout brings the entire martial arts community together in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <Award className="w-8 h-8 text-orange mb-3" />
            <h3 className="text-lg font-bold text-navy mb-2">Vision</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              To become the world's leading martial arts platform, starting from India and expanding globally — empowering millions to discover their inner warrior.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <Globe className="w-8 h-8 text-orange mb-3" />
            <h3 className="text-lg font-bold text-navy mb-2">Values</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discipline, respect, and continuous improvement — the core values of martial arts guide everything we build at Sparout.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Why Sparout?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-4 h-4 text-orange" />
              </div>
              <div>
                <h4 className="font-semibold text-navy text-sm">Verified Masters</h4>
                <p className="text-sm text-gray-500">Every master is vetted for credentials, experience, and teaching quality.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-4 h-4 text-orange" />
              </div>
              <div>
                <h4 className="font-semibold text-navy text-sm">Community Driven</h4>
                <p className="text-sm text-gray-500">Reviews, ratings, and profiles help you find the perfect match for your goals.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Globe className="w-4 h-4 text-orange" />
              </div>
              <div>
                <h4 className="font-semibold text-navy text-sm">All Disciplines</h4>
                <p className="text-sm text-gray-500">From Karate and MMA to Kalaripayattu and Gatka — every martial art has a home on Sparout.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
