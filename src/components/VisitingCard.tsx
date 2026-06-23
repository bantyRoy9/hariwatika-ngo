"use client";

import { Heart, Phone, Mail, MapPin } from "lucide-react";

interface VisitingCardProps {
  name: string;
  designation: string;
  mobile?: string;
  email?: string;
}

export default function VisitingCard({ name, designation, mobile, email }: VisitingCardProps) {
  const handlePrint = () => {
    const printContent = document.getElementById("visiting-card-print");
    if (!printContent) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Visiting Card - ${name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Literata:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; padding: 20px; background: white; font-family: 'Plus Jakarta Sans', sans-serif; }
            .card { width: 3.5in; height: 2in; border: 3px solid #855300; border-radius: 12px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: linear-gradient(135deg, #fff8f0, #ffffff); display: flex; flex-direction: column; justify-content: space-between; }
            .header { display: flex; align-items: center; gap: 8px; }
            .logo { width: 32px; height: 32px; background: #855300; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; }
            .org { font-family: 'Literata', serif; }
            .org-name { font-size: 11px; font-weight: 700; color: #855300; }
            .org-sub { font-size: 8px; color: #524435; }
            .name { font-family: 'Literata', serif; font-size: 16px; font-weight: 700; color: #1b1c19; }
            .designation { font-size: 11px; color: #855300; font-weight: 600; margin-bottom: 6px; }
            .contact { font-size: 9px; color: #524435; display: flex; gap: 12px; flex-wrap: wrap; }
            .contact span { display: flex; align-items: center; gap: 3px; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div>
      {/* Card Preview */}
      <div
        id="visiting-card-print"
        className="w-full max-w-xs border-2 border-[#855300] rounded-xl p-4 bg-gradient-to-br from-orange-50 to-white"
        style={{ aspectRatio: "1.75 / 1" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-full bg-[#855300] flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-white fill-white" />
          </span>
          <div>
            <div
              className="text-[10px] font-bold text-[#855300] leading-tight"
              style={{ fontFamily: "'Literata', serif" }}
            >
              Hariwatika Shiv Mandir
            </div>
            <div className="text-[8px] text-[#524435]">Vivah Sewa Samiti</div>
          </div>
          <div className="ml-auto h-px flex-1 bg-[#855300]/20" />
        </div>

        {/* Name */}
        <div
          className="text-base font-bold text-[#1b1c19] leading-tight"
          style={{ fontFamily: "'Literata', serif" }}
        >
          {name}
        </div>
        <div className="text-[11px] font-semibold text-[#855300] mb-2">{designation}</div>

        {/* Contact */}
        <div className="flex flex-wrap gap-3 text-[9px] text-[#524435]">
          {mobile && (
            <span className="flex items-center gap-1">
              <Phone className="w-2.5 h-2.5 text-[#855300]" />
              {mobile}
            </span>
          )}
          {email && (
            <span className="flex items-center gap-1">
              <Mail className="w-2.5 h-2.5 text-[#855300]" />
              {email}
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-[#855300]" />
            Bettiah, Bihar
          </span>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-3 border border-[#855300] text-[#855300] hover:bg-[#855300] hover:text-white rounded-full px-4 py-2 text-xs font-semibold transition-colors"
      >
        Print Visiting Card
      </button>
    </div>
  );
}
