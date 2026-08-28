"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Pre-order enquiry form.
 *
 * Deliberately different from the contact form: it asks about the vessel a
 * visitor has in mind rather than a general message, per the client's brief.
 * Inputs use a bottom rule only, which is what the brief asked for.
 */

const fieldClass =
  "w-full border-0 border-b border-ink bg-transparent px-0 pt-2 pb-3 font-sans text-[17px] font-light text-ink outline-none focus:border-accent placeholder:text-muted disabled:opacity-50";
const labelClass = "mb-2 block text-[10px] tracking-[0.24em] text-muted uppercase";

export default function PreOrderForm({ enabled }: { enabled: boolean }) {
  const t = useTranslations("preOrder.form");
  const tContact = useTranslations("contact.form");
  const locale = useLocale();

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function describe(code: string | undefined): string {
    const known = [
      "invalid_json",
      "missing_fields",
      "invalid_email",
      "not_configured",
      "send_failed",
    ];
    return tContact(`errors.${known.includes(code ?? "") ? code : "send_failed"}`);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      country: form.get("phone"),
      interest: [form.get("model"), form.get("concept")].filter(Boolean).join(" · "),
      message: [
        form.get("message"),
        form.get("wantsInfo") ? t("wantsInfoSummary") : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
      // Distinguishes these enquiries from contact form submissions.
      subject: t("subject"),
      locale,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setStatus("error");
        setError(describe(body?.error));
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(describe("send_failed"));
    }
  }

  const models = [
    t("models.superyacht"),
    t("models.explorer"),
    t("models.motorYacht"),
    t("models.commercial"),
    t("models.custom"),
  ];
  const concepts = [
    t("concepts.minimalist"),
    t("concepts.family"),
    t("concepts.charter"),
    t("concepts.explorer"),
  ];

  return (
    <form onSubmit={onSubmit} className="mt-16">
      {!enabled && (
        <p className="mb-12 border border-accent bg-surface-alt px-7 py-5 text-[15px] leading-[1.8] text-body">
          {tContact("comingSoon")}
        </p>
      )}

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-14">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="po-name">
            {t("name")}
          </label>
          <input
            id="po-name"
            name="name"
            required
            disabled={!enabled}
            placeholder={t("namePlaceholder")}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="po-email">
            {t("email")}
          </label>
          <input
            id="po-email"
            name="email"
            type="email"
            required
            disabled={!enabled}
            placeholder={t("emailPlaceholder")}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="po-phone">
            {t("phone")}
          </label>
          <input
            id="po-phone"
            name="phone"
            type="tel"
            disabled={!enabled}
            placeholder={t("phonePlaceholder")}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="po-model">
            {t("model")}
          </label>
          <select id="po-model" name="model" disabled={!enabled} className={fieldClass}>
            <option value="">{t("choose")}</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="po-concept">
            {t("concept")}
          </label>
          <select
            id="po-concept"
            name="concept"
            disabled={!enabled}
            className={fieldClass}
          >
            <option value="">{t("choose")}</option>
            {concepts.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="po-message">
            {t("message")}
          </label>
          <textarea
            id="po-message"
            name="message"
            rows={4}
            disabled={!enabled}
            placeholder={t("messagePlaceholder")}
            className={`${fieldClass} resize-none`}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-4 sm:col-span-2">
          <input
            type="checkbox"
            name="wantsInfo"
            disabled={!enabled}
            className="mt-1 h-4 w-4 shrink-0 accent-accent"
          />
          <span className="text-[15px] leading-[1.7] text-body">{t("wantsInfo")}</span>
        </label>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-8">
        <button
          type="submit"
          disabled={!enabled || status === "sending" || status === "sent"}
          className="cursor-pointer border border-ink px-12 py-5 text-[12px] tracking-label uppercase transition-colors hover:border-accent hover:bg-accent hover:text-paper disabled:cursor-default disabled:opacity-60"
        >
          {status === "sent" ? tContact("sent") : t("cta")}
        </button>
        <p className="max-w-[36ch] text-[13px] leading-[1.8] text-muted">
          {tContact("note")}
        </p>
      </div>

      {status === "error" && error && (
        <p role="alert" className="mt-6 text-[14px] text-accent">
          {error}
        </p>
      )}
    </form>
  );
}
