"use client";
import { useState } from "react";
import { User, Lock, Bell, Shield, Check, ArrowRight } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [fullName, setFullName] = useState("Aarav Mehta");
  const [email, setEmail] = useState("aarav@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [city, setCity] = useState("Mumbai");
  const [bio, setBio] = useState("Passionate martial artist.");

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [bookingNotifs, setBookingNotifs] = useState(true);
  const [eventNotifs, setEventNotifs] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Settings</h1>
          <p className="text-white/60 text-sm mt-1">Manage your account preferences</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "bg-orange text-white" : "bg-white text-gray-600 border border-gray-200"
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-phone" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-city" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent resize-none" data-testid="input-bio" />
              </div>
              <button onClick={handleSave} className="px-6 py-2.5 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm flex items-center gap-2" data-testid="button-save">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Current Password</label>
                <input type="password" placeholder="Enter current password" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-current-password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">New Password</label>
                <input type="password" placeholder="Enter new password" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-new-password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-confirm-password" />
              </div>
              <button onClick={handleSave} className="px-6 py-2.5 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm" data-testid="button-update-password">
                Update Password
              </button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50">
                <div>
                  <div className="text-sm font-medium text-navy">Email Notifications</div>
                  <div className="text-xs text-gray-500">Receive updates via email</div>
                </div>
                <input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} className="w-5 h-5 text-orange focus:ring-orange rounded" data-testid="toggle-email" />
              </label>
              <label className="flex items-center justify-between p-3 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50">
                <div>
                  <div className="text-sm font-medium text-navy">Booking Updates</div>
                  <div className="text-xs text-gray-500">Get notified about booking confirmations and changes</div>
                </div>
                <input type="checkbox" checked={bookingNotifs} onChange={(e) => setBookingNotifs(e.target.checked)} className="w-5 h-5 text-orange focus:ring-orange rounded" data-testid="toggle-booking" />
              </label>
              <label className="flex items-center justify-between p-3 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50">
                <div>
                  <div className="text-sm font-medium text-navy">Event Reminders</div>
                  <div className="text-xs text-gray-500">Get reminders for upcoming events and tournaments</div>
                </div>
                <input type="checkbox" checked={eventNotifs} onChange={(e) => setEventNotifs(e.target.checked)} className="w-5 h-5 text-orange focus:ring-orange rounded" data-testid="toggle-events" />
              </label>
              <button onClick={handleSave} className="px-6 py-2.5 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm flex items-center gap-2" data-testid="button-save-notifs">
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Preferences"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
