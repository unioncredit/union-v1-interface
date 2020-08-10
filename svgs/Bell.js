const Bell = ({ size = 24, pending = false }) => (
  <svg
    className={pending ? "pending" : undefined}
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path d="M12 2a1.5 1.5 0 00-1.5 1.5v.695A5.997 5.997 0 006 10v6l-1.535 1.156h-.002A1 1 0 005 19h14a1 1 0 00.537-1.844L18 16v-6a5.997 5.997 0 00-4.5-5.805V3.5A1.5 1.5 0 0012 2zm-2 18c0 1.1.9 2 2 2s2-.9 2-2h-4z" />
    <circle cx={17} cy={6} r={4} />
    <style jsx>{`
      svg,
      circle {
        transition: fill 150ms;
      }

      svg {
        fill: #e8e9ef;
      }
      svg.pending {
        fill: #032437;
      }

      circle {
        fill: rgba(65, 140, 252, 0);
        stroke: #fff;
        stroke-width: 2px;
      }
      .pending circle {
        fill: rgba(65, 140, 252, 1);
      }
    `}</style>
  </svg>
);

export default Bell;
