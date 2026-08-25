"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border border-ink bg-paper px-[14px] py-[13px] font-sans text-[17px] font-light text-ink outline-none focus:border-accent";
const labelClass =
  "mb-3 block text-[10px] tracking-[0.24em] text-muted uppercase";

export default function ContactForm({ enabled }: { enabled: boolean }) {
  const t = useTranslations("contact.form");
  const tErrors = useTranslations("contact.form.errors");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  /** Maps an API error code to localised copy, falling back to the generic one. */
  function describe(code: string | undefined): string {
    const known = [
      "invalid_json",
      "missing_fields",
      "invalid_email",
      "not_configured",
      "send_failed",
    ];
    return tErrors(known.includes(code ?? "") ? (code as string) : "send_failed");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setStatus("error");
        setError(describe(body?.error));
        return;
      }
      setStatus("sent");
    } catch {
      // Network failure before the request reached us.
      setStatus("error");
      setError(describe("send_failed"));
    }
  }

  const fields = [
    { name: "name", label: t("name"), placeholder: t("namePlaceholder"), type: "text" },
    { name: "email", label: t("email"), placeholder: t("emailPlaceholder"), type: "email" },
    { name: "country", label: t("country"), placeholder: t("countryPlaceholder"), type: "text" },
    { name: "interest", label: t("interest"), placeholder: t("interestPlaceholder"), type: "text" },
  ];

  return (
    <form onSubmit={onSubmit}>
      {!enabled && (
        <p className="mb-10 border border-accent bg-surface-alt px-7 py-5 text-[15px] leading-[1.8] text-body">
          {t("comingSoon")}
        </p>
      )}

      <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 sm:gap-y-11 sm:gap-x-10">
        {fields.map((f) => (
          <div key={f.name}>
            <label className={labelClass} htmlFor={f.name}>
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.name === "name" || f.name === "email"}
              placeholder={f.placeholder}
              disabled={!enabled}
              className={`${fieldClass} disabled:opacity-50`}
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t("messagePlaceholder")}
            disabled={!enabled}
            className={`${fieldClass} resize-none disabled:opacity-50`}
          />
        </div>
      </div>

      <div className="mt-[52px] flex flex-wrap items-center gap-[30px]">
        <button
          type="submit"
          disabled={!enabled || status === "sending" || status === "sent"}
          className="cursor-pointer border border-ink px-[42px] py-4 text-[11px] tracking-label uppercase transition-colors hover:border-accent hover:bg-accent hover:text-paper disabled:cursor-default disabled:opacity-60"
        >
          {status === "sent" ? t("sent") : t("submit")}
        </button>
        <p className="max-w-[34ch] text-[13px] leading-[1.8] text-muted">{t("note")}</p>
      </div>

      {status === "error" && error && (
        <p className="mt-6 text-[13px] text-accent" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
