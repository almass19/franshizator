"use client";

import { useState, useEffect, useCallback } from "react";

export default function Modal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSubmitting(false);
      setError("");
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      business: (form.elements.namedItem("business") as HTMLTextAreaElement)
        .value,
    };

    // Meta Pixel event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead", data);
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Ошибка отправки");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить заявку");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[1000]
        flex items-center justify-center
        bg-black/60

        max-md:items-end
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          bg-navy-light rounded-[20px] p-10
          w-full max-w-[460px] relative
          shadow-[0_20px_60px_rgba(0,0,0,0.3)]

          max-md:m-0 max-md:px-5 max-md:pt-7 max-md:pb-9
          max-md:rounded-t-3xl max-md:rounded-b-none
          max-md:max-w-full max-md:max-h-[90vh] max-md:overflow-y-auto
          max-md:anim-slide-up
        "
      >
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            w-9 h-9 border-none bg-gold/15 rounded-full
            flex items-center justify-center
            text-xl text-gold cursor-pointer
            transition-colors hover:bg-gold/30
          "
        >
          &times;
        </button>

        {!submitted ? (
          <div>
            <h2 className="text-2xl font-extrabold mb-2 max-md:text-xl">
              Оставьте заявку
            </h2>
            <p className="text-sm text-beige-muted mb-6 leading-relaxed max-md:text-[13px] max-md:mb-5">
              Мы свяжемся с вами и проведём бесплатную консультацию по упаковке
              вашего бизнеса во франшизу
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 max-md:mb-3">
                <label className="block text-[13px] font-semibold text-beige mb-1.5">
                  Ваше имя
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Как к вам обращаться?"
                  required
                  className="
                    w-full py-3.5 px-4
                    border-2 border-gold/30 rounded-[10px]
                    text-[15px] font-inherit
                    bg-white/5 text-beige outline-none
                    transition-colors focus:border-gold
                    max-md:p-3.5 max-md:text-base max-md:rounded-xl
                  "
                />
              </div>
              <div className="mb-4 max-md:mb-3">
                <label className="block text-[13px] font-semibold text-beige mb-1.5">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="
                    w-full py-3.5 px-4
                    border-2 border-gold/30 rounded-[10px]
                    text-[15px] font-inherit
                    bg-white/5 text-beige outline-none
                    transition-colors focus:border-gold
                    max-md:p-3.5 max-md:text-base max-md:rounded-xl
                  "
                />
              </div>
              <div className="mb-4 max-md:mb-3">
                <label className="block text-[13px] font-semibold text-beige mb-1.5">
                  Чем занимается ваш бизнес?
                </label>
                <textarea
                  name="business"
                  placeholder="Кратко опишите вашу сферу деятельности"
                  required
                  className="
                    w-full py-3.5 px-4
                    border-2 border-gold/30 rounded-[10px]
                    text-[15px] font-inherit resize-y min-h-20
                    bg-white/5 text-beige outline-none
                    transition-colors focus:border-gold
                    max-md:p-3.5 max-md:text-base max-md:rounded-xl max-md:min-h-[70px]
                  "
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm mb-3">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="
                  w-full py-[18px] mt-2
                  bg-linear-to-br from-gold-light to-gold
                  text-navy text-base font-bold uppercase tracking-wide
                  border-none rounded-xl cursor-pointer
                  transition-all duration-200
                  hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(196,162,101,0.35)]
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none
                  max-md:py-[18px] max-md:text-base max-md:rounded-2xl
                "
              >
                {submitting ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-5">
            <svg
              viewBox="0 0 24 24"
              className="w-16 h-16 fill-gold mx-auto mb-4"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <h3 className="text-[22px] font-extrabold mb-2">
              Заявка отправлена!
            </h3>
            <p className="text-beige-muted">
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
