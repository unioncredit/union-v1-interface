const Spinner = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2.143a7.857 7.857 0 100-15.714 7.857 7.857 0 000 15.714z"
      fill="#EDF1F3"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10v-2.143A7.857 7.857 0 104.143 12H2C2 6.477 6.477 2 12 2s10 4.477 10 10z"
      fill="#A2AFB8"
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        from="0 12 12"
        repeatCount="indefinite"
        to="360 12 12"
        type="rotate"
      />
    </path>
  </svg>
);

export default Spinner;
