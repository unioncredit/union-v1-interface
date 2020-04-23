export default ({ size = 16, light }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.997 2a6 6 0 100 12 6 6 0 000-12zM.663 8A7.333 7.333 0 1115.33 8 7.333 7.333 0 01.663 8z"
      opacity={light ? 0.2 : 1}
      fill="#CECECE"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.996 4.667a.667.667 0 100 1.333h.007a.667.667 0 000-1.333h-.007zM8.662 8A.667.667 0 107.33 8v2.667a.667.667 0 101.333 0V8z"
      fill={light ? "#CECECE" : "#28293D"}
    />
  </svg>
);
