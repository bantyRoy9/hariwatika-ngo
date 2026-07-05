import "server-only";

type SendTemplateInput = {
  to: string;
  contentSid: string;
  contentVariables: string[];
};

export type TwilioSendResult =
  | { ok: true; messageSid: string }
  | { ok: false; code: string; message: string };

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export async function sendTemplateMessage(input: SendTemplateInput): Promise<TwilioSendResult> {
  const accountSid = requireEnv("TWILIO_ACCOUNT_SID");
  const authToken = requireEnv("TWILIO_AUTH_TOKEN");
  const from = requireEnv("TWILIO_WHATSAPP_FROM");

  const body = new URLSearchParams({
    To: `whatsapp:${input.to}`,
    From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
    ContentSid: input.contentSid,
    ContentVariables: JSON.stringify(
      Object.fromEntries(input.contentVariables.map((value, index) => [String(index + 1), value])),
    ),
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    },
  );

  const payload = (await response.json()) as {
    sid?: string;
    code?: number | string;
    message?: string;
  };

  if (!response.ok || !payload.sid) {
    return {
      ok: false,
      code: String(payload.code ?? response.status),
      message: payload.message ?? "Twilio request failed",
    };
  }

  return { ok: true, messageSid: payload.sid };
}
