import Link from "next/link";

export function Footer() {
  return (
    <footer className="hidden md:block bg-navy text-white/70 border-t border-white/10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center font-bold text-white text-sm">S</div>
              <span className="text-xl font-bold text-white tracking-tight">Sparout</span>
            </div>
            <p className="text-sm leading-relaxed">
              India's premier martial arts marketplace. Find verified masters, track your journey, and compete.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/masters" className="hover:text-white transition-colors">Browse Masters</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm">
          <p>2026 Sparout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
