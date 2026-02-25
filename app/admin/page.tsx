"use client";
import { useState } from "react";
import Link from "next/link";
import { Users, Award, Calendar, TrendingUp, Shield, Star, BarChart3, Settings, ChevronRight, UserCheck, UserX, Eye } from "lucide-react";

const stats = [
  { label: "Total Users", value: "5,247", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Verified Masters", value: "203", change: "+8%", icon: Shield, color: "text-orange", bg: "bg-orange-50" },
  { label: "Active Students", value: "4,891", change: "+15%", icon: UserCheck, color: "text-green-500", bg: "bg-green-50" },
  { label: "Upcoming Events", value: "12", change: "+3", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
];

const recentUsers = [
  { id: 1, name: "Aarav Mehta", email: "aarav@example.com", role: "student", status: "active", joined: "Feb 24, 2026" },
  { id: 2, name: "Kavitha Menon", email: "kavitha@example.com", role: "master", status: "pending", joined: "Feb 23, 2026" },
  { id: 3, name: "Ravi Kumar", email: "ravi@example.com", role: "parent", status: "active", joined: "Feb 22, 2026" },
  { id: 4, name: "Simran Kaur", email: "simran@example.com", role: "student", status: "active", joined: "Feb 21, 2026" },
  { id: 5, name: "Rohan Iyer", email: "rohan@example.com", role: "master", status: "pending", joined: "Feb 20, 2026" },
];

const pendingMasters = [
  { id: 1, name: "Kavitha Menon", style: "Silambam", city: "Chennai", experience: 10, applied: "Feb 23, 2026" },
  { id: 2, name: "Rohan Iyer", style: "Kalaripayattu", city: "Kochi", experience: 15, applied: "Feb 20, 2026" },
];

const navItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/masters", label: "Masters", icon: Shield },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/federations", label: "Federations", icon: Award },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-admin-title">Admin Dashboard</h1>
              <p className="text-white/60 text-sm mt-1">Manage Sparout platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                item.href === "/admin" ? "bg-orange text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-orange/30"
              }`}
              data-testid={`nav-admin-${item.label.toLowerCase()}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-green-500">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-navy">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy">Recent Users</h2>
              <Link href="/admin/users" className="text-sm text-orange hover:text-orange-600 font-medium">View All</Link>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0" data-testid={`user-row-${user.id}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-xs font-bold text-navy">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-navy">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user.role === "master" ? "bg-orange/10 text-orange" : user.role === "parent" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                    }`}>{user.role}</span>
                    <span className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-green-400" : "bg-yellow-400"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy">Pending Master Verifications</h2>
              <Link href="/admin/masters" className="text-sm text-orange hover:text-orange-600 font-medium">View All</Link>
            </div>
            <div className="space-y-4">
              {pendingMasters.map((master) => (
                <div key={master.id} className="p-4 rounded-lg border border-gray-100" data-testid={`pending-master-${master.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-navy text-sm">{master.name}</h3>
                    <span className="text-xs text-gray-400">{master.applied}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">{master.style} &middot; {master.city} &middot; {master.experience}yr exp</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-xs font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" data-testid={`button-approve-${master.id}`}>
                      Approve
                    </button>
                    <button className="flex-1 py-2 text-xs font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" data-testid={`button-reject-${master.id}`}>
                      Reject
                    </button>
                    <button className="py-2 px-3 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
