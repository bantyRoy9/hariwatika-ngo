"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { donations } from "@/data/donations";
import { members } from "@/data/members";
import EInvitation from "@/components/EInvitation";
import VisitingCard from "@/components/VisitingCard";
import {
  Download,
  Printer,
  Users,
  IndianRupee,
  MessageCircle,
  CreditCard,
  Mail,
  LayoutDashboard,
  Settings,
  Send,
} from "lucide-react";

type AdminTab = "donations" | "members" | "greetings" | "invitations";

// Safe xlsx import
let XLSX: typeof import("xlsx") | null = null;
if (typeof window !== "undefined") {
  import("xlsx").then((m) => { XLSX = m; }).catch(() => {});
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("donations");
  const [greeting, setGreeting] = useState({ message: "", name: "" });
  const [greetingSent, setGreetingSent] = useState(false);
  const [editMember, setEditMember] = useState<number | null>(null);
  const [memberData, setMemberData] = useState(members.map((m) => ({ ...m })));

  const totalDonations = donations.reduce((s, d) => s + d.amount, 0);
  const confirmedDonations = donations.filter((d) => d.status === "confirmed").length;

  const exportToExcel = () => {
    if (!XLSX) {
      alert("Excel library loading, please try again.");
      return;
    }
    const data = donations.map((d) => ({
      ID: d.id,
      Name: d.name,
      Mobile: d.mobile,
      Email: d.email || "—",
      Address: d.address,
      Amount: `₹${d.amount}`,
      Purpose: d.purpose,
      Date: d.date,
      Status: d.status,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donations");
    XLSX.writeFile(wb, `Hariwatika_Donations_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handlePrintDonations = () => {
    window.print();
  };

  const sendGreeting = () => {
    setGreetingSent(true);
    setTimeout(() => setGreetingSent(false), 3000);
  };

  const tabs: { id: AdminTab; icon: React.FC<{ className?: string }>; label: string }[] = [
    { id: "donations", icon: IndianRupee, label: "Donations" },
    { id: "members", icon: Users, label: "Members" },
    { id: "greetings", icon: Mail, label: "Greetings" },
    { id: "invitations", icon: CreditCard, label: "E-Invitations" },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-10 relative"
          style={{ background: "linear-gradient(135deg, #1b0d00 0%, #3d1f00 100%)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4A433] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Literata', serif" }}
                >
                  Admin Dashboard
                </h1>
                <p className="text-white/60 text-sm">Hariwatika Shiv Mandir Vivah Sewa Samiti</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 40" className="w-full" style={{ display: "block" }}>
              <path d="M0,20 C400,40 800,0 1200,20 L1200,40 L0,40 Z" fill="#fbf9f4" />
            </svg>
          </div>
        </section>

        <section className="py-10 bg-[#fbf9f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Donations", value: `₹${totalDonations.toLocaleString("en-IN")}`, color: "#855300" },
                { label: "Confirmed", value: confirmedDonations, color: "#006d3e" },
                { label: "Total Donors", value: donations.length, color: "#855300" },
                { label: "Team Members", value: members.length, color: "#006d3e" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-[#e4e2dd] p-5 text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Literata', serif", color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#524435] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-[#e4e2dd] overflow-hidden">
              <div className="flex overflow-x-auto border-b border-[#e4e2dd]">
                {tabs.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === id
                        ? "border-[#855300] text-[#855300] bg-orange-50"
                        : "border-transparent text-[#524435] hover:text-[#855300]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* ── DONATIONS TAB ── */}
              {activeTab === "donations" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h2
                      className="font-semibold text-[#1b1c19] text-lg"
                      style={{ fontFamily: "'Literata', serif" }}
                    >
                      Donation Records
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={exportToExcel}
                        className="flex items-center gap-1.5 bg-[#006d3e] text-white rounded-full px-4 py-2 text-xs font-semibold hover:bg-[#005530] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export Excel
                      </button>
                      <button
                        onClick={handlePrintDonations}
                        className="flex items-center gap-1.5 border border-[#855300] text-[#855300] rounded-full px-4 py-2 text-xs font-semibold hover:bg-orange-50 transition-colors no-print"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-[#e4e2dd]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#fbf9f4] border-b border-[#e4e2dd]">
                          {["#", "Name", "Mobile", "Address", "Amount", "Purpose", "Date", "Status"].map(
                            (h) => (
                              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#524435] whitespace-nowrap">
                                {h}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {donations.map((d) => (
                          <tr key={d.id} className="border-b border-[#e4e2dd] hover:bg-orange-50/50 transition-colors">
                            <td className="px-4 py-3 text-[#524435] text-xs">{d.id}</td>
                            <td className="px-4 py-3 font-medium text-[#1b1c19] whitespace-nowrap">{d.name}</td>
                            <td className="px-4 py-3 text-[#524435]">{d.mobile}</td>
                            <td className="px-4 py-3 text-[#524435] text-xs max-w-[150px] truncate">{d.address}</td>
                            <td className="px-4 py-3 font-semibold text-[#006d3e] whitespace-nowrap">
                              ₹{d.amount.toLocaleString("en-IN")}
                            </td>
                            <td className="px-4 py-3 text-[#524435] text-xs whitespace-nowrap">{d.purpose}</td>
                            <td className="px-4 py-3 text-[#524435] text-xs whitespace-nowrap">{d.date}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${
                                  d.status === "confirmed"
                                    ? "bg-green-100 text-[#006d3e]"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {d.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── MEMBERS TAB ── */}
              {activeTab === "members" && (
                <div className="p-6">
                  <h2
                    className="font-semibold text-[#1b1c19] text-lg mb-4"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    Member Management
                  </h2>
                  <div className="space-y-3">
                    {memberData.map((m) => (
                      <div key={m.id} className="flex items-center gap-4 p-4 rounded-xl border border-[#e4e2dd] hover:bg-orange-50/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#855300] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {m.initials}
                        </div>
                        {editMember === m.id ? (
                          <div className="flex flex-1 gap-3 flex-wrap">
                            <input
                              className="border border-[#e4e2dd] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#855300] flex-1 min-w-[120px]"
                              value={m.name}
                              onChange={(e) =>
                                setMemberData((prev) =>
                                  prev.map((x) => x.id === m.id ? { ...x, name: e.target.value } : x)
                                )
                              }
                            />
                            <input
                              className="border border-[#e4e2dd] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#855300] flex-1 min-w-[120px]"
                              value={m.designation}
                              onChange={(e) =>
                                setMemberData((prev) =>
                                  prev.map((x) => x.id === m.id ? { ...x, designation: e.target.value } : x)
                                )
                              }
                            />
                            <button
                              onClick={() => setEditMember(null)}
                              className="bg-[#855300] text-white rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-[#653e00] transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-1 items-center justify-between">
                            <div>
                              <p className="font-medium text-[#1b1c19] text-sm">{m.name}</p>
                              <p className="text-xs text-[#855300]">{m.designation}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditMember(m.id)}
                                className="flex items-center gap-1 border border-[#e4e2dd] text-[#524435] rounded-full px-3 py-1 text-xs hover:border-[#855300] hover:text-[#855300] transition-colors"
                              >
                                <Settings className="w-3 h-3" /> Edit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Visiting Card Section */}
                  <div className="mt-8 border-t border-[#e4e2dd] pt-6">
                    <h3
                      className="font-semibold text-[#1b1c19] mb-4"
                      style={{ fontFamily: "'Literata', serif" }}
                    >
                      Generate Visiting Cards
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {memberData.slice(0, 6).map((m) => (
                        <VisitingCard
                          key={m.id}
                          name={m.name}
                          designation={m.designation}
                          mobile="+91 9473331919"
                          email="hariwatikaseva@gmail.com"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── GREETINGS TAB ── */}
              {activeTab === "greetings" && (
                <div className="p-6 max-w-xl">
                  <h2
                    className="font-semibold text-[#1b1c19] text-lg mb-4"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    Send Greetings
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Recipient Name</label>
                      <input
                        type="text"
                        value={greeting.name}
                        onChange={(e) => setGreeting({ ...greeting, name: e.target.value })}
                        placeholder="Enter recipient name"
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1b1c19] mb-1">Greeting Message</label>
                      <textarea
                        rows={4}
                        value={greeting.message}
                        onChange={(e) => setGreeting({ ...greeting, message: e.target.value })}
                        placeholder="Type your greeting message..."
                        className="w-full border border-[#e4e2dd] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#855300] resize-none"
                      />
                    </div>

                    {/* Quick Templates */}
                    <div>
                      <p className="text-xs text-[#524435] mb-2 font-medium">Quick Templates:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "🎉 Happy Birthday! May God bless you.",
                          "🕉️ Happy Diwali from Hariwatika Samiti!",
                          "🌸 Happy New Year! May this year bring peace and prosperity.",
                          "💐 Congratulations on your wedding!",
                        ].map((t) => (
                          <button
                            key={t}
                            onClick={() => setGreeting({ ...greeting, message: t })}
                            className="text-xs bg-orange-50 text-[#855300] border border-orange-200 rounded-full px-3 py-1.5 hover:bg-orange-100 transition-colors text-left"
                          >
                            {t.slice(0, 30)}...
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`नमस्ते ${greeting.name}!\n\n${greeting.message}\n\n— Hariwatika Shiv Mandir Vivah Sewa Samiti`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1da851] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Send via WhatsApp
                      </a>
                      <button
                        onClick={sendGreeting}
                        className="flex items-center gap-2 bg-[#855300] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#653e00] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        {greetingSent ? "Sent!" : "Send SMS (Mock)"}
                      </button>
                    </div>
                    {greetingSent && (
                      <p className="text-xs text-[#006d3e] font-medium">✓ Greeting sent successfully (mock)</p>
                    )}
                  </div>
                </div>
              )}

              {/* ── INVITATIONS TAB ── */}
              {activeTab === "invitations" && (
                <div className="p-6">
                  <h2
                    className="font-semibold text-[#1b1c19] text-lg mb-4"
                    style={{ fontFamily: "'Literata', serif" }}
                  >
                    E-Invitation Designer
                  </h2>
                  <EInvitation />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
