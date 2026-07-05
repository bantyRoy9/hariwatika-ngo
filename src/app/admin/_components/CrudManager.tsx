"use client";

import { useState } from "react";
import { LENITY } from "@/theme/lenity";
import { createRecord, updateRecord, deleteRecord } from "@/app/actions/content";
import { Btn, Card, ConfirmDelete, Label, TextInput, TextArea, BilingualField } from "./ui";
import ImageField from "./ImageField";

export type FieldType = "text" | "textarea" | "number" | "bilingual" | "bilingual-area" | "image" | "checkbox" | "select" | "tags";

export type FieldDef = {
  // For bilingual fields, `name` is the EN column and `nameHi` the HI column.
  name: string;
  nameHi?: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[]; // for select
  placeholder?: string;
};

export type Row = Record<string, unknown> & { id: number };

type Props = {
  model: string;
  fields: FieldDef[];
  rows: Row[];
  /** which field to show as the row title in the list */
  titleField: string;
  media: { id: number; url: string; alt: string }[];
  singularName: string;
};

function emptyDraft(fields: FieldDef[]): Record<string, unknown> {
  const d: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === "number") d[f.name] = 0;
    else if (f.type === "checkbox") d[f.name] = true;
    else if (f.type === "tags") d[f.name] = "[]";
    else {
      d[f.name] = "";
      if (f.nameHi) d[f.nameHi] = "";
    }
  }
  return d;
}

export default function CrudManager({ model, fields, rows, titleField, media, singularName }: Props) {
  const [list, setList] = useState<Row[]>(rows);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const startCreate = () => {
    setEditId(null);
    setEditing(emptyDraft(fields));
    setError("");
  };
  const startEdit = (row: Row) => {
    setEditId(row.id);
    setEditing({ ...row });
    setError("");
  };
  const cancel = () => {
    setEditing(null);
    setEditId(null);
  };

  const set = (k: string, v: unknown) => setEditing((d) => ({ ...(d ?? {}), [k]: v }));

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    setError("");
    try {
      // strip id/createdAt for writes
      const { id, createdAt, ...data } = editing as Row & { createdAt?: unknown };
      void id;
      void createdAt;
      if (editId == null) {
        const created = (await createRecord(model, data)) as Row;
        setList((l) => [...l, created]);
      } else {
        const updated = (await updateRecord(model, editId, data)) as Row;
        setList((l) => l.map((r) => (r.id === editId ? updated : r)));
      }
      cancel();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: number) => {
    setBusy(true);
    try {
      await deleteRecord(model, id);
      setList((l) => l.filter((r) => r.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  if (editing) {
    return (
      <Card>
        <div className="flex flex-col gap-4">
          {fields.map((f) => (
            <FieldEditor key={f.name} field={f} draft={editing} set={set} media={media} />
          ))}
          {error && <p className="text-sm" style={{ color: LENITY.red }}>{error}</p>}
          <div className="flex gap-2">
            <Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</Btn>
            <Btn variant="ghost" onClick={cancel}>Cancel</Btn>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <Btn onClick={startCreate}>+ Add {singularName}</Btn>
      </div>
      {error && <p className="text-sm" style={{ color: LENITY.red }}>{error}</p>}
      {list.length === 0 && <p className="text-sm" style={{ color: LENITY.adminMuted }}>No items yet.</p>}
      {list
        .slice()
        .sort((a, b) => (Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0)))
        .map((row) => (
          <Card key={row.id} className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium truncate" style={{ color: LENITY.adminInk }}>
              {String(row[titleField] ?? `#${row.id}`)}
            </span>
            <div className="flex gap-2 shrink-0">
              <Btn variant="ghost" onClick={() => startEdit(row)}>Edit</Btn>
              <ConfirmDelete onConfirm={() => remove(row.id)} />
            </div>
          </Card>
        ))}
    </div>
  );
}

function FieldEditor({
  field,
  draft,
  set,
  media,
}: {
  field: FieldDef;
  draft: Record<string, unknown>;
  set: (k: string, v: unknown) => void;
  media: { id: number; url: string; alt: string }[];
}) {
  const v = (k: string) => String(draft[k] ?? "");

  switch (field.type) {
    case "bilingual":
    case "bilingual-area":
      return (
        <BilingualField
          label={field.label}
          en={v(field.name)}
          hi={v(field.nameHi ?? "")}
          onEn={(val) => set(field.name, val)}
          onHi={(val) => set(field.nameHi ?? "", val)}
          textarea={field.type === "bilingual-area"}
        />
      );
    case "textarea":
      return (
        <div>
          <Label>{field.label}</Label>
          <TextArea value={v(field.name)} onChange={(e) => set(field.name, e.target.value)} />
        </div>
      );
    case "number":
      return (
        <div>
          <Label>{field.label}</Label>
          <TextInput type="number" value={v(field.name)} onChange={(e) => set(field.name, Number(e.target.value))} />
        </div>
      );
    case "checkbox":
      return (
        <label className="flex items-center gap-2 text-sm" style={{ color: LENITY.adminInk }}>
          <input type="checkbox" checked={Boolean(draft[field.name])} onChange={(e) => set(field.name, e.target.checked)} />
          {field.label}
        </label>
      );
    case "select":
      return (
        <div>
          <Label>{field.label}</Label>
          <select
            value={v(field.name)}
            onChange={(e) => set(field.name, e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            style={{ borderColor: LENITY.line, color: LENITY.adminInk, background: "#111630" }}
          >
            <option value="">—</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      );
    case "tags":
      // stored as JSON array string; edit as comma-separated
      return (
        <div>
          <Label>{field.label} (comma separated)</Label>
          <TextInput
            value={(() => {
              try { return (JSON.parse(v(field.name) || "[]") as string[]).join(", "); } catch { return v(field.name); }
            })()}
            onChange={(e) => set(field.name, JSON.stringify(e.target.value.split(",").map((s) => s.trim()).filter(Boolean)))}
          />
        </div>
      );
    case "image":
      return (
        <div>
          <Label>{field.label}</Label>
          <ImageField value={v(field.name)} onChange={(url) => set(field.name, url)} media={media} />
        </div>
      );
    default:
      return (
        <div>
          <Label>{field.label}</Label>
          <TextInput value={v(field.name)} placeholder={field.placeholder} onChange={(e) => set(field.name, e.target.value)} />
        </div>
      );
  }
}
