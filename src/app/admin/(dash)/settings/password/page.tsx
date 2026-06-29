"use client";

import { useState } from "react";
import { changePasswordAction } from "@/app/actions/auth";
import { PageTitle, Card, Label, TextInput, Btn } from "../../../_components/ui";
import { LENITY } from "@/theme/lenity";

export default function ChangePasswordPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");
    if (next !== confirm) { setError("New passwords do not match"); return; }
    setBusy(true);
    const res = await changePasswordAction({ current, next });
    setBusy(false);
    if (res.success) {
      setMsg("Password updated.");
      setCurrent(""); setNext(""); setConfirm("");
    } else {
      setError(res.error ?? "Failed");
    }
  };

  return (
    <div className="max-w-md">
      <PageTitle title="Change Password" subtitle="Update the admin login password." />
      <Card>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div><Label>Current password</Label><TextInput type="password" value={current} onChange={(e) => setCurrent(e.target.value)} /></div>
          <div><Label>New password</Label><TextInput type="password" value={next} onChange={(e) => setNext(e.target.value)} /></div>
          <div><Label>Confirm new password</Label><TextInput type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div>
          {error && <p className="text-sm" style={{ color: LENITY.red }}>{error}</p>}
          {msg && <p className="text-sm" style={{ color: "green" }}>{msg}</p>}
          <Btn disabled={busy}>{busy ? "Saving…" : "Update password"}</Btn>
        </form>
      </Card>
    </div>
  );
}
