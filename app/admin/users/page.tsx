"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, Users, Shield, UserCheck, UserX, MoreVertical } from "lucide-react";

const allUsers = [
  { id: 1, name: "Sensei Rajesh Kumar", email: "rajesh@sparout.com", role: "master", status: "active", verified: true, joined: "Jan 15, 2026", city: "Mumbai" },
  { id: 2, name: "Coach Priya Sharma", email: "priya@sparout.com", role: "master", status: "active", verified: true, joined: "Jan 20, 2026", city: "Hyderabad" },
  { id: 3, name: "Master Chen Wei", email: "chen@sparout.com", role: "master", status: "active", verified: true, joined: "Dec 10, 2025", city: "Delhi" },
  { id: 4, name: "Aarav Mehta", email: "aarav@example.com", role: "student", status: "active", verified: false, joined: "Feb 24, 2026", city: "Mumbai" },
  { id: 5, name: "Sneha Kapoor", email: "sneha@example.com", role: "student", status: "active", verified: false, joined: "Feb 20, 2026", city: "Bangalore" },
  { id: 6, name: "Ravi Kumar", email: "ravi@example.com", role: "parent", status: "active", verified: false, joined: "Feb 22, 2026", city: "Delhi" },
  { id: 7, name: "Deepak Rao", email: "deepak@example.com", role: "master", status: "pending", verified: false, joined: "Feb 20, 2026", city: "Chennai" },
  { id: 8, name: "Simran Kaur", email: "simran@example.com", role: "student", status: "inactive", verified: false, joined: "Feb 21, 2026", city: "Amritsar" },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = allUsers.filter((u) => {
    const matchSearch = !searchTerm || u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-3" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold" data-testid="text-page-title">User Management</h1>
          <p className="text-white/60 text-sm mt-1">{allUsers.length} total users</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange focus:border-transparent" data-testid="input-search" />
          </div>
          <div className="flex gap-2">
            {["All", "Master", "Student", "Parent"].map((role) => (
              <button key={role} onClick={() => setRoleFilter(role)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${roleFilter === role ? "bg-orange text-white" : "bg-white text-gray-600 border border-gray-200"}`} data-testid={`filter-${role.toLowerCase()}`}>
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">City</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Joined</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors" data-testid={`user-row-${user.id}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-xs font-bold text-navy">
                          {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-navy flex items-center gap-1">
                            {user.name}
                            {user.verified && <Shield className="w-3.5 h-3.5 text-orange" />}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.role === "master" ? "bg-orange/10 text-orange" : user.role === "parent" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                      }`}>{user.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.status === "active" ? "bg-green-100 text-green-600" : user.status === "pending" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-500"
                      }`}>{user.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user.city}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{user.joined}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1 hover:bg-gray-100 rounded" data-testid={`button-actions-${user.id}`}>
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
