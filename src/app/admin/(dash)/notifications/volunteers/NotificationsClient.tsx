"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { retryVolunteerNotification, sendVolunteerNotification } from "@/app/actions/notifications";
import { Btn, Card, Label, TextInput } from "../../../_components/ui";
import { LENITY } from "@/theme/lenity";
import { computeSelectAllState } from "@/features/notifications/utils";

type VolunteerRow = {
  id: number;
  volunteerId: string;
  name: string;
  mobile: string;
  skills: string[];
  availability: string;
  createdAtLabel: string;
};

type TemplateOption = {
  id: number;
  key: string;
  displayName: string;
  language: string;
  variables: string[];
};

type CampaignRow = {
  id: number;
  status: string;
  language: string;
  totalSelected: number;
  sentCount: number;
  failedCount: number;
  pendingCount: number;
  createdAtLabel: string;
  templateDisplayName: string;
  variableValues: Record<string, string>;
  deliveries: Array<{
    id: number;
    recipientName: string;
    recipientMobile: string;
    normalizedMobile: string | null;
    status: string;
    providerMessageSid: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    retryCount: number;
  }>;
};

type Props = {
  volunteers: VolunteerRow[];
  templates: TemplateOption[];
  campaigns: CampaignRow[];
};

export default function NotificationsClient({ volunteers, templates, campaigns }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<"hi" | "en">(
    templates.find((template) => template.language === "hi") ? "hi" : "en",
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    templates.find((template) => template.language === "hi")?.id ?? templates[0]?.id ?? null,
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [retryingId, setRetryingId] = useState<number | null>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const filteredVolunteers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return volunteers;
    return volunteers.filter((volunteer) =>
      [
        volunteer.volunteerId,
        volunteer.name,
        volunteer.mobile,
        volunteer.availability,
        volunteer.skills.join(", "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query, volunteers]);

  const visibleIds = useMemo(() => filteredVolunteers.map((volunteer) => volunteer.id), [filteredVolunteers]);
  const selectAllState = useMemo(
    () => computeSelectAllState(selectedIds, visibleIds),
    [selectedIds, visibleIds],
  );

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectAllState.indeterminate;
    }
  }, [selectAllState.indeterminate]);

  const languageTemplates = useMemo(
    () => templates.filter((template) => template.language === language),
    [templates, language],
  );

  const selectedTemplate =
    languageTemplates.find((template) => template.id === selectedTemplateId) ?? null;

  const toggleVolunteer = (id: number) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]));
  };

  const toggleSelectAllVisible = () => {
    setSelectedIds((current) => {
      if (selectAllState.checked) {
        return current.filter((id) => !visibleIds.includes(id));
      }
      return Array.from(new Set([...current, ...visibleIds]));
    });
  };

  const sendDisabled = selectedIds.length === 0 || !selectedTemplate || submitting;

  const handleLanguageChange = (nextLanguage: "hi" | "en") => {
    setLanguage(nextLanguage);
    const nextTemplate = templates.find((template) => template.language === nextLanguage) ?? null;
    setSelectedTemplateId(nextTemplate?.id ?? null);
    setValues(Object.fromEntries((nextTemplate?.variables ?? []).map((key) => [key, ""])));
  };

  const handleTemplateChange = (templateId: number) => {
    const nextTemplate = languageTemplates.find((template) => template.id === templateId) ?? null;
    setSelectedTemplateId(nextTemplate?.id ?? null);
    setValues((current) =>
      Object.fromEntries((nextTemplate?.variables ?? []).map((key) => [key, current[key] ?? ""])),
    );
  };

  const handleSend = async () => {
    if (!selectedTemplate) return;
    setSubmitting(true);
    setError("");
    setMessage("");

    const result = await sendVolunteerNotification({
      templateId: selectedTemplate.id,
      language,
      selectedVolunteerIds: selectedIds,
      values,
    });

    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setMessage(`Campaign sent. ${result.sentCount} succeeded, ${result.failedCount} failed.`);
    setSelectedIds([]);
    setValues(Object.fromEntries(selectedTemplate.variables.map((key) => [key, ""])));
    router.refresh();
  };

  const handleRetry = async (campaignId: number) => {
    setRetryingId(campaignId);
    setError("");
    setMessage("");
    const result = await retryVolunteerNotification(campaignId);
    setRetryingId(null);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setMessage(`Retry started for campaign #${campaignId}.`);
    router.refresh();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <Card className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: LENITY.adminInk }}>Select Volunteers</h2>
            <p className="text-sm" style={{ color: LENITY.adminMuted }}>
              {selectedIds.length} selected out of {volunteers.length}
            </p>
          </div>
          <TextInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, mobile, skill, availability…"
            className="md:max-w-sm"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ borderColor: LENITY.adminLine }}>
          <label className="flex items-center gap-3 text-sm font-medium" style={{ color: LENITY.adminInk }}>
            <input
              ref={selectAllRef}
              type="checkbox"
              checked={selectAllState.checked}
              onChange={toggleSelectAllVisible}
              className="h-4 w-4"
            />
            Select all visible volunteers
          </label>
          <span className="text-xs" style={{ color: LENITY.adminMuted }}>
            {selectAllState.selectedVisibleCount}/{selectAllState.visibleCount} visible selected
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border" style={{ borderColor: LENITY.adminLine }}>
          <div className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead style={{ background: LENITY.adminSoft }}>
                <tr>
                  <th className="px-3 py-2 text-left" />
                  <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Volunteer</th>
                  <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Mobile</th>
                  <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Skills</th>
                  <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Availability</th>
                  <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-center" style={{ color: LENITY.adminMuted }}>
                      No volunteers match the current search.
                    </td>
                  </tr>
                ) : (
                  filteredVolunteers.map((volunteer) => {
                    const checked = selectedIds.includes(volunteer.id);
                    return (
                      <tr key={volunteer.id} className="border-t" style={{ borderColor: LENITY.adminLine }}>
                        <td className="px-3 py-3 align-top">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleVolunteer(volunteer.id)}
                            className="mt-1 h-4 w-4"
                          />
                        </td>
                        <td className="px-3 py-3 align-top">
                          <div className="font-medium" style={{ color: LENITY.adminInk }}>{volunteer.name}</div>
                          <div className="text-xs font-mono" style={{ color: LENITY.adminMuted }}>{volunteer.volunteerId}</div>
                        </td>
                        <td className="px-3 py-3 align-top" style={{ color: LENITY.adminInk }}>{volunteer.mobile}</td>
                        <td className="px-3 py-3 align-top" style={{ color: LENITY.adminInk }}>{volunteer.skills.join(", ")}</td>
                        <td className="px-3 py-3 align-top" style={{ color: LENITY.adminInk }}>{volunteer.availability}</td>
                        <td className="px-3 py-3 align-top" style={{ color: LENITY.adminInk }}>{volunteer.createdAtLabel}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: LENITY.adminInk }}>Compose Campaign</h2>
            <p className="text-sm" style={{ color: LENITY.adminMuted }}>
              WhatsApp templates only. Twilio sends immediately after confirmation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Language</Label>
              <select
                value={language}
                onChange={(event) => handleLanguageChange(event.target.value as "hi" | "en")}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: LENITY.line, color: LENITY.ink, background: "#111630" }}
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <Label>Template</Label>
              <select
                value={selectedTemplate?.id ?? ""}
                onChange={(event) => handleTemplateChange(Number(event.target.value))}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: LENITY.line, color: LENITY.ink, background: "#111630" }}
              >
                {languageTemplates.length === 0 ? (
                  <option value="">No templates configured</option>
                ) : (
                  languageTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.displayName}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {selectedTemplate && selectedTemplate.variables.length > 0 ? (
            <div className="space-y-3">
              {selectedTemplate.variables.map((variable) => (
                <div key={variable}>
                  <Label>{variable}</Label>
                  <TextInput
                    value={values[variable] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [variable]: event.target.value }))}
                    placeholder={`Enter ${variable}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: LENITY.adminMuted }}>
              {selectedTemplate ? "This template has no variables." : "Choose a template to continue."}
            </p>
          )}

          <div className="rounded-xl border p-4" style={{ borderColor: LENITY.adminLine }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: LENITY.adminInk }}>Review</h3>
            <div className="space-y-1 text-sm" style={{ color: LENITY.adminMuted }}>
              <p>Selected volunteers: <span style={{ color: LENITY.adminInk }}>{selectedIds.length}</span></p>
              <p>Language: <span style={{ color: LENITY.adminInk }}>{language === "hi" ? "Hindi" : "English"}</span></p>
              <p>Template: <span style={{ color: LENITY.adminInk }}>{selectedTemplate?.displayName ?? "None"}</span></p>
            </div>
          </div>

          {error && <p className="text-sm" style={{ color: LENITY.red }}>{error}</p>}
          {message && <p className="text-sm" style={{ color: "#4ade80" }}>{message}</p>}

          <Btn onClick={handleSend} disabled={sendDisabled}>
            {submitting ? "Sending…" : "Send campaign"}
          </Btn>
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: LENITY.adminInk }}>Campaign History</h2>
            <p className="text-sm" style={{ color: LENITY.adminMuted }}>
              Review sent campaigns, delivery details, and retry failed rows.
            </p>
          </div>

          <div className="space-y-3">
            {campaigns.length === 0 ? (
              <p className="text-sm" style={{ color: LENITY.adminMuted }}>No notification campaigns yet.</p>
            ) : (
              campaigns.map((campaign) => (
                <details
                  key={campaign.id}
                  className="rounded-xl border p-4"
                  style={{ borderColor: LENITY.adminLine }}
                >
                  <summary className="cursor-pointer list-none">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-semibold" style={{ color: LENITY.adminInk }}>
                          #{campaign.id} · {campaign.templateDisplayName}
                        </p>
                        <p className="text-xs" style={{ color: LENITY.adminMuted }}>
                          {campaign.createdAtLabel} · {campaign.language === "hi" ? "Hindi" : "English"} · {campaign.status}
                        </p>
                      </div>
                      <div className="text-xs md:text-sm" style={{ color: LENITY.adminMuted }}>
                        Sent {campaign.sentCount} / Failed {campaign.failedCount} / Pending {campaign.pendingCount}
                      </div>
                    </div>
                  </summary>

                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(campaign.variableValues).map(([key, value]) => (
                        <span
                          key={key}
                          className="rounded-full px-3 py-1 text-xs"
                          style={{ background: LENITY.adminSoft, color: LENITY.adminInk }}
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>

                    <div className="overflow-auto rounded-lg border" style={{ borderColor: LENITY.adminLine }}>
                      <table className="w-full text-sm">
                        <thead style={{ background: LENITY.adminSoft }}>
                          <tr>
                            <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Recipient</th>
                            <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Mobile</th>
                            <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Status</th>
                            <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Provider ID</th>
                            <th className="px-3 py-2 text-left" style={{ color: LENITY.adminMuted }}>Error</th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaign.deliveries.map((delivery) => (
                            <tr key={delivery.id} className="border-t" style={{ borderColor: LENITY.adminLine }}>
                              <td className="px-3 py-2" style={{ color: LENITY.adminInk }}>{delivery.recipientName}</td>
                              <td className="px-3 py-2" style={{ color: LENITY.adminInk }}>
                                {delivery.recipientMobile}
                                {delivery.normalizedMobile ? (
                                  <div className="text-xs" style={{ color: LENITY.adminMuted }}>{delivery.normalizedMobile}</div>
                                ) : null}
                              </td>
                              <td className="px-3 py-2" style={{ color: LENITY.adminInk }}>
                                {delivery.status}
                                {delivery.retryCount > 0 ? (
                                  <div className="text-xs" style={{ color: LENITY.adminMuted }}>
                                    Retry #{delivery.retryCount}
                                  </div>
                                ) : null}
                              </td>
                              <td className="px-3 py-2 font-mono text-xs" style={{ color: LENITY.adminInk }}>
                                {delivery.providerMessageSid ?? "—"}
                              </td>
                              <td className="px-3 py-2" style={{ color: delivery.errorMessage ? LENITY.red : LENITY.adminInk }}>
                                {delivery.errorMessage ?? "—"}
                                {delivery.errorCode ? (
                                  <div className="text-xs" style={{ color: LENITY.adminMuted }}>{delivery.errorCode}</div>
                                ) : null}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <Btn
                      onClick={() => handleRetry(campaign.id)}
                      disabled={campaign.failedCount === 0 || retryingId === campaign.id}
                      variant="ghost"
                    >
                      {retryingId === campaign.id ? "Retrying…" : "Retry failed deliveries"}
                    </Btn>
                  </div>
                </details>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
