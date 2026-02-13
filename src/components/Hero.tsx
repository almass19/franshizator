"use client";

import Image from "next/image";
import Stats from "./Stats";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        className="
          flex items-start justify-between
          px-[60px] pt-[50px] pb-0
          min-h-[calc(100vh-80px)] overflow-hidden relative

          max-lg:px-[30px] max-lg:pt-10
          max-lg:flex-col max-lg:text-center max-lg:min-h-auto max-lg:items-center

          max-md:p-0 max-md:min-h-[100svh] max-md:overflow-hidden
        "
      >
        {/* Fullscreen image — mobile */}
        <div
          className="
            relative shrink-0 w-[480px] h-[600px] overflow-hidden rounded-[30px]

            max-lg:w-[380px] max-lg:h-[480px] max-lg:mt-10 max-lg:rounded-3xl max-lg:order-2

            max-md:absolute max-md:inset-0 max-md:w-full max-md:h-full max-md:rounded-none max-md:order-none
          "
        >
          <Image
            src="/images/IMG_1309.jpg"
            alt="Адель Гусманов — основатель Франшизатор"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Dark gradient overlay — mobile only */}
          <div className="hidden max-md:block absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        </div>

        {/* Content overlay on image (mobile) / normal flow (desktop) */}
        <div
          className="
            max-w-[620px] shrink-0 pt-5

            max-lg:max-w-full max-lg:pt-0 max-lg:order-1

            max-md:relative max-md:z-10 max-md:max-w-full
            max-md:mt-auto max-md:px-5 max-md:pb-8 max-md:pt-0
            max-md:flex max-md:flex-col max-md:justify-end max-md:min-h-[100svh]
          "
        >
          {/* Spacer to push content to bottom on mobile */}
          <div className="hidden max-md:block max-md:flex-1" />

          <h1
            className="
              text-5xl font-extrabold leading-[1.15] tracking-tight mb-5 uppercase
              anim-fade-up

              max-lg:text-4xl

              max-md:text-[26px] max-md:mb-3 max-md:leading-[1.2] max-md:tracking-[-0.3px] max-md:text-left
              max-md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
            "
          >
            Упаковка и продажа вашей франшизы под ключ
          </h1>

          <p
            className="
              text-lg leading-relaxed text-beige-muted mb-3
              anim-fade-up anim-delay-2

              max-md:text-sm max-md:leading-[1.5] max-md:mb-5 max-md:text-beige/80
              max-md:drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]
            "
          >
            Полное сопровождение после запуска: от первой продажи до построения
            франчайзинговой сети
          </p>

          {/* Offer badge — desktop & tablet only */}
          <div
            className="
              inline-block bg-gold/10 border-l-4 border-gold
              py-3.5 px-5 text-[15px] font-semibold text-beige
              leading-relaxed mb-[35px] rounded-r-lg
              anim-fade-up anim-delay-3

              max-lg:text-left max-lg:block

              max-md:hidden
            "
          >
            <span className="text-gold">Специальное предложение</span>{" "}
            для предпринимателей
            <br /> с прибылью от 2 000 000 тенге в месяц
          </div>

          {/* Stats — desktop & tablet only (mobile stats are below hero) */}
          <div className="anim-fade-up anim-delay-4 max-md:hidden">
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

              max-md:w-full max-md:text-center max-md:py-4.5 max-md:text-[15px]
              max-md:font-bold max-md:rounded-2xl max-md:tracking-[0.3px]
              max-md:shadow-[0_4px_24px_rgba(196,162,101,0.5)]
              max-md:anim-pulse
            "
          >
            Получить консультацию
          </button>
        </div>
      </section>

      {/* ===== MOBILE STATS SECTION (below hero) ===== */}
      <section className="hidden max-md:block px-5 py-8 bg-navy">
        {/* Offer badge — mobile */}
        <div
          className="
            bg-gold/10 border-l-[3px] border-gold
            py-3 px-4 text-[13px] font-medium text-beige
            leading-[1.5] mb-6 rounded-r-xl
            anim-fade-up
          "
        >
          <span className="text-gold font-bold">Специальное предложение</span>{" "}
          для предпринимателей с прибылью от 2 000 000 тенге в месяц
        </div>

        <div className="anim-fade-up anim-delay-1">
          <Stats />
        </div>
      </section>
    </>
  );
}
