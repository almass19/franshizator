"use client";

export default function Header({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <header
      className="
        flex items-center justify-between
        px-[60px] h-20
        border-b border-gold/20

        max-md:fixed max-md:top-0 max-md:left-0 max-md:right-0 max-md:z-100
        max-md:px-4 max-md:h-[52px]
        max-md:bg-navy/92 max-md:backdrop-blur-[16px]
        max-md:border-b max-md:border-gold/15

        max-lg:px-[30px]
      "
    >
      <div className="flex items-center">
        <div
          className="
            bg-linear-to-br from-gold to-gold-light
            text-navy font-extrabold text-sm tracking-[1.5px]
            px-5 py-2.5 rounded-lg uppercase whitespace-nowrap
            max-md:text-[10px] max-md:px-2.5 max-md:py-1.5 max-md:tracking-[1px]
          "
        >
          Франшизатор
        </div>
      </div>

      <div className="flex items-center gap-5 max-md:gap-2.5">
        <button
          onClick={onOpenModal}
          className="
            flex items-center gap-2
            bg-transparent border-2 border-gold rounded-full
            px-6 py-2.5 text-sm font-semibold text-gold
            cursor-pointer transition-all duration-200
            hover:bg-gold hover:text-navy

            max-md:px-3.5 max-md:py-[7px] max-md:text-[11px] max-md:gap-[5px] max-md:border-[1.5px]
          "
        >
          <span>Оставить заявку</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="max-md:w-3 max-md:h-3"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
