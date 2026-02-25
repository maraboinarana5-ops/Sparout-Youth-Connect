import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-7xl font-bold text-navy/10 mb-4">404</div>
        <h1 className="text-2xl font-bold text-navy mb-2" data-testid="text-404">Page Not Found</h1>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors" data-testid="button-go-home">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
