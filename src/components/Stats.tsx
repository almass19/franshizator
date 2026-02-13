const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gold">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
      </svg>
    ),
    number: "170+",
    label: "компаний упаковали",
    labelDesktop: (
      <>
        компаний упаковали
        <br />с 2017 года
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gold">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
      </svg>
    ),
    number: "678+",
    label: "франшиз продали лично",
    labelDesktop: (
      <>
        франшиз <br />
        продали лично
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gold">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
    number: "3,5 млн $",
    label: "на проданных франшизах",
    labelDesktop: (
      <>
        на проданных <br />
        франшизах
      </>
    ),
  },
];

export default function Stats() {
  return (
    <div
      className="
        flex gap-[50px] mb-[35px]

        max-lg:justify-center max-lg:flex-wrap max-lg:gap-[30px]

        max-md:gap-0 max-md:mb-20 max-md:w-full
        max-md:bg-navy/60 max-md:backdrop-blur-sm max-md:border max-md:border-gold/20
        max-md:rounded-[14px] max-md:py-3
      "
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="
            flex flex-col

            max-md:flex-1 max-md:items-center max-md:text-center
            max-md:[&:not(:last-child)]:border-r max-md:[&:not(:last-child)]:border-gold/15
          "
        >
          {/* Icon — mobile only */}
          <div
            className="
              hidden max-md:flex
              items-center justify-center
              w-7 h-7 mx-auto mb-1.5
              bg-gold/12 rounded-lg
            "
          >
            {stat.icon}
          </div>

          <div
            className="
              text-[28px] font-extrabold leading-tight
              max-md:text-lg
            "
          >
            {stat.number}
          </div>
          <div
            className="
              text-[15px] text-beige-muted mt-1 leading-[1.4]
              max-md:text-[10px] max-md:mt-0.5 max-md:leading-[1.3]
            "
          >
            <span className="hidden md:inline">{stat.labelDesktop}</span>
            <span className="md:hidden">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
