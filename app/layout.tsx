import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileNav } from "@/components/mobile-nav";

export const metadata: Metadata = {
  title: "Sparout - Find Your Master. Build Your Legacy.",
  description: "India's premier martial arts marketplace. Connect with verified masters, track your journey, and compete in tournaments.",
  openGraph: {
    title: "Sparout - Martial Arts Marketplace",
    description: "Find verified martial arts masters near you. Train in Karate, MMA, Jiu-Jitsu, Taekwondo, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
