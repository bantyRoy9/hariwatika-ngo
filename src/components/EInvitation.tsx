"use client";

import { useState } from "react";
import { Heart, Calendar, MapPin } from "lucide-react";

interface EInvitationProps {
  groomName?: string;
  brideName?: string;
  date?: string;
  venue?: string;
  time?: string;
  hostFamily?: string;
}

export default function EInvitation({
  groomName = "Ramesh Kumar",
  brideName = "Sunita Devi",
  date = "15 February 2025",
  venue = "Sukanya Utsav Bhawan, Hariwatika Chowk, Bettiah",
  time = "11:00 AM",
  hostFamily = "Yadav Family",
}: EInvitationProps) {
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({ groomName, brideName, date, venue, time, hostFamily });

  const handlePrint = () => {
    const content = document.getElementById("einvitation-content");
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Wedding Invitation</title>
          <link href="https://fonts.googleapis.com/css2?family=Literata:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; padding: 0; background: #fff8f0; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          </style>
        </head>
        <body>${content.outerHTML}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-4">
      {/* Invitation Card */}
      <div
        id="einvitation-content"
        className="max-w-sm mx-auto border-4 border-[#855300] rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff8f0 0%, #fffbf5 50%, #fff3e0 100%)" }}
      >
        {/* Top Banner */}
        <div className="bg-[#855300] text-white text-center py-3 px-4">
          <p className="text-[10px] font-medium opacity-90 tracking-wider uppercase">
            Hariwatika Shiv Mandir Vivah Sewa Samiti
          </p>
          <p className="text-[11px] opacity-80">सादर आमंत्रण</p>
        </div>

        {/* Mandap Decoration */}
        <div className="text-center py-4">
          <div className="text-4xl mb-1">🕉️</div>
          <p
            className="text-[#855300] text-xl font-bold italic"
            style={{ fontFamily: "'Literata', serif" }}
          >
            शुभ विवाह
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="h-px w-16 bg-[#F4A433]" />
            <Heart className="w-3 h-3 text-[#F4A433] fill-[#F4A433]" />
            <div className="h-px w-16 bg-[#F4A433]" />
          </div>
        </div>

        {/* Names */}
        <div className="text-center px-6 pb-4">
          <p
            className="text-2xl font-bold text-[#1b1c19]"
            style={{ fontFamily: "'Literata', serif" }}
          >
            {fields.groomName}
          </p>
          <p className="text-[#524435] text-xs my-1">weds</p>
          <p
            className="text-2xl font-bold text-[#855300]"
            style={{ fontFamily: "'Literata', serif" }}
          >
            {fields.brideName}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-[#F4A433]/40" />

        {/* Details */}
        <div className="px-6 py-4 space-y-2">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#855300] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#524435] font-medium uppercase tracking-wide">Date & Time</p>
              <p className="text-sm font-semibold text-[#1b1c19]">{fields.date} at {fields.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#855300] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[10px] text-[#524435] font-medium uppercase tracking-wide">Venue</p>
              <p className="text-sm font-semibold text-[#1b1c19]">{fields.venue}</p>
            </div>
          </div>
        </div>

        {/* Host */}
        <div className="bg-[#855300]/10 px-6 py-3 text-center">
          <p className="text-[10px] text-[#524435]">Hosted by</p>
          <p className="text-sm font-semibold text-[#855300]">{fields.hostFamily}</p>
          <p className="text-[9px] text-[#524435] mt-1">Assisted by Hariwatika Vivah Sewa Samiti</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => setEditing(!editing)}
          className="border border-[#855300] text-[#855300] hover:bg-[#855300] hover:text-white rounded-full px-5 py-2 text-xs font-semibold transition-colors"
        >
          {editing ? "Done Editing" : "Customize"}
        </button>
        <button
          onClick={handlePrint}
          className="bg-[#855300] text-white hover:bg-[#653e00] rounded-full px-5 py-2 text-xs font-semibold transition-colors"
        >
          Print Invitation
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`🕉️ You are cordially invited to the wedding of ${fields.groomName} & ${fields.brideName} on ${fields.date} at ${fields.time}. Venue: ${fields.venue}. Hosted by ${fields.hostFamily}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white rounded-full px-5 py-2 text-xs font-semibold hover:bg-[#1da851] transition-colors"
        >
          Share on WhatsApp
        </a>
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="bg-[#0d1229] rounded-xl border border-[#63d2ff]/20 p-4 space-y-3">
          <h4 className="font-semibold text-[#e8f4ff] text-sm">Edit Invitation Details</h4>
          {[
            { key: "groomName", label: "Groom Name" },
            { key: "brideName", label: "Bride Name" },
            { key: "date", label: "Date" },
            { key: "time", label: "Time" },
            { key: "venue", label: "Venue" },
            { key: "hostFamily", label: "Host Family" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs text-[#7a8fad] mb-1">{label}</label>
              <input
                type="text"
                value={fields[key as keyof typeof fields]}
                onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                className="w-full border border-[#63d2ff]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#63d2ff] bg-[#111630] text-[#e8f4ff]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
