"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Contact Us</h1>
          <p className="text-white/60">Get in touch with the Sparout team</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-bold text-navy mb-4">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-5 h-5 text-orange" />
                  <span>hello@sparout.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-5 h-5 text-orange" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-5 h-5 text-orange" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">Message Sent!</h3>
                <p className="text-sm text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" required data-testid="input-email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" rows={4} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent resize-none" required data-testid="input-message" />
                </div>
                <button type="submit" className="w-full py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2" data-testid="button-send">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
