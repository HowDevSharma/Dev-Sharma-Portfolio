"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Two-step note: message first, then an email address. Posts to /api/contact. */
export function ContactForm() {
  const id = useId();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [values, setValues] = useState({ message: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const total = contact.steps.length;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (step === 0) {
      if (values.message.trim().length < 3) return setError("Add a few words first.");
      return setStep(1);
    }
    if (!EMAIL.test(values.email.trim())) return setError("That email doesn't look quite right.");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  const field = step < 2 ? contact.steps[step] : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative w-full max-w-md bg-butter p-5 text-left shadow-[0_18px_40px_-22px_rgb(22_20_15/0.55)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {field ? (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <label htmlFor={`${id}-${field.name}`} className="label block text-[12px]">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={`${id}-${field.name}`}
                name={field.name}
                rows={4}
                autoFocus={false}
                placeholder={field.placeholder}
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                className="mt-3 w-full resize-none bg-transparent text-lg leading-snug placeholder:text-ink/45 focus:outline-none"
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
              />
            ) : (
              <input
                id={`${id}-${field.name}`}
                name={field.name}
                type="email"
                autoComplete="email"
                placeholder={field.placeholder}
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                className="mt-3 w-full border-b-[1.5px] border-ink/30 bg-transparent py-2 text-lg placeholder:text-ink/45 focus:border-ink focus:outline-none"
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 py-6"
            role="status"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-lime">
              <Icon name="check" size={18} />
            </span>
            <p className="text-lg leading-snug">{contact.success}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p id={`${id}-error`} role="alert" className="min-h-5 pt-2 text-sm text-tangerine-deep">
        {error}
      </p>

      <div className="absolute -bottom-4 left-4 flex gap-2">
        {step === 1 && (
          <button
            type="button"
            onClick={() => {
              setError(null);
              setStep(0);
            }}
            className="label flex items-center gap-1.5 bg-card px-3 py-2.5 text-[11px] ring-1 ring-ink"
          >
            <Icon name="arrowLeft" size={12} /> Back
          </button>
        )}
        {step < 2 ? (
          <button
            type="submit"
            disabled={sending}
            className="label flex items-center gap-2 bg-ink px-3.5 py-2.5 text-[11px] text-paper transition-colors hover:bg-cobalt disabled:opacity-60"
          >
            {step === 0 ? "Next" : sending ? "Sending…" : "Send"} ({step + 1}/{total})
            <Icon name={step === 0 ? "arrowRight" : "send"} size={12} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setValues({ message: "", email: "" });
              setStep(0);
            }}
            className="label bg-ink px-3.5 py-2.5 text-[11px] text-paper"
          >
            Write another
          </button>
        )}
      </div>
    </form>
  );
}
