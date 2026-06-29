"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { LENITY, SERIF } from "@/theme/lenity";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await loginAction({ password });
    setLoading(false);
    if (res.success) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError(res.error ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: LENITY.soft }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border p-8 bg-[#0d1229]"
        style={{ borderColor: LENITY.line }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: LENITY.accentSoft }}
        >
          <Lock className="w-5 h-5" style={{ color: LENITY.ink }} />
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: SERIF, color: LENITY.ink }}>
          Admin Login
        </h1>
        <p className="text-sm mb-6" style={{ color: LENITY.muted }}>
          Hariwatika CRM — sign in to manage content.
        </p>

        <label className="block text-sm font-medium mb-1" style={{ color: LENITY.ink }}>
          Password
        </label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none mb-4"
          style={{ borderColor: LENITY.line, color: LENITY.ink }}
        />

        {error && <p className="text-sm font-medium mb-4" style={{ color: LENITY.red }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-3 font-bold transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center"
          style={{ background: LENITY.accent, color: LENITY.ink }}
        >
          {loading ? (
            <span className="animate-spin border-2 border-t-transparent rounded-full w-5 h-5" style={{ borderColor: LENITY.ink, borderTopColor: "transparent" }} />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
