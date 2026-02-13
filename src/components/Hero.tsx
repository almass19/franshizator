"use client";

import Image from "next/image";
import Stats from "./Stats";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <>
      <section
        className="
          flex items-start justify-between
          px-[60px] pt-[50px] pb-0
          min-h-[calc(100vh-80px)] overflow-hidden relative

          max-lg:px-[30px] max-lg:pt-10
          max-lg:flex-col max-lg:text-center max-lg:min-h-auto max-lg:items-center

          max-md:p-0 max-md:h-[100svh] max-md:min-h-0 max-md:overflow-hidden
        "
      >
        {/* ===== FULLSCREEN BACKGROUND IMAGE (mobile) / normal card (desktop) ===== */}
        <div
          className="
            relative shrink-0 w-[480px] h-[600px] overflow-hidden rounded-[30px]

            max-lg:w-[380px] max-lg:h-[480px] max-lg:mt-10 max-lg:rounded-3xl max-lg:order-2

            max-md:absolute max-md:inset-0 max-md:w-full max-md:h-full max-md:rounded-none max-md:mt-0
          "
        >
          <Image
            src="/images/IMG_1309.jpg"
            alt="Адель Гусманов — основатель Франшизатор"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient overlay — mobile only */}
          <div className="hidden max-md:block absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/20 to-navy/90" />
        </div>

        {/* ===== MOBILE OVERLAY: all content over the fullscreen image ===== */}
        <div
          className="
            hidden
            max-md:flex max-md:flex-col max-md:relative max-md:z-10
            max-md:w-full max-md:h-[100svh] max-md:pt-[90px] max-md:pb-5 max-md:px-5
          "
        >
          {/* Top: Title */}
          <div className="flex flex-col">
            <h1
              className="
                text-[22px] font-extrabold leading-[1.2] tracking-[-0.3px]
                text-center uppercase
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
                anim-fade-up
              "
            >
              Упаковка и продажа вашей франшизы под ключ
            </h1>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom: Offer + subtitle + Stats + CTA */}
          <div className="flex flex-col gap-3">
            <div
              className="
                bg-navy/60 backdrop-blur-sm border-l-[3px] border-gold
                py-2.5 px-3.5 text-[12px] font-medium text-beige
                leading-[1.4] rounded-r-xl
                anim-fade-up anim-delay-1
              "
            >
              <span className="text-gold font-bold">Специальное предложение</span>{" "}
              для предпринимателей с прибылью от 2 000 000 тенге в месяц
            </div>

            <p
              className="
                text-[13px] leading-[1.4] text-beige
                drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]
                anim-fade-up anim-delay-2
              "
            >
              Полное сопровождение после запуска: от первой продажи до построения
              франчайзинговой сети
            </p>

            <div className="anim-fade-up anim-delay-3">
              <Stats />
            </div>

            <button
              onClick={onOpenModal}
              className="
                w-full text-center py-3.5 text-[15px]
                bg-linear-to-br from-gold-light to-gold
                text-navy font-bold uppercase tracking-[0.3px]
                border-none rounded-2xl cursor-pointer
                shadow-[0_4px_24px_rgba(196,162,101,0.5)]
                anim-fade-up anim-delay-4
              "
            >
              Получить консультацию
            </button>
          </div>
        </div>

        {/* ===== DESKTOP CONTENT (unchanged) ===== */}
        <div
          className="
            max-w-[620px] shrink-0 pt-5

            max-lg:max-w-full max-lg:pt-0 max-lg:order-1

            max-md:hidden
          "
        >
          <h1
            className="
              text-5xl font-extrabold leading-[1.15] tracking-tight mb-5 uppercase
              anim-fade-up
              max-lg:text-4xl
            "
          >
            Упаковка и продажа вашей франшизы под ключ
          </h1>

          <p
            className="
              text-lg leading-relaxed text-beige-muted mb-3
              anim-fade-up anim-delay-2
            "
          >
            Полное сопровождение после запуска: от первой продажи до построения
            франчайзинговой сети
          </p>

          <div
            className="
              inline-block bg-gold/10 border-l-4 border-gold
              py-3.5 px-5 text-[15px] font-semibold text-beige
              leading-relaxed mb-[35px] rounded-r-lg
              anim-fade-up anim-delay-3
              max-lg:text-left max-lg:block
            "
          >
            <span className="text-gold">Специальное предложение</span>{" "}
            для предпринимателей
            <br /> с прибылью от 2 000 000 тенге в месяц
          </div>

          <div className="anim-fade-up anim-delay-4">
            <Stats />
          </div>

          <button
            onClick={onOpenModal}
            className="
              inline-block bg-linear-to-br from-gold-light to-gold
              text-navy text-base font-bold uppercase tracking-wide
              py-5 px-10 border-none rounded-xl cursor-pointer
              transition-all duration-200
              hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(196,162,101,0.35)]
              anim-fade-up anim-delay-5
              max-lg:py-4 max-lg:px-8 max-lg:text-sm
            "
          >
            Получить консультацию
          </button>
        </div>
      </section>
    </>
  );
}
