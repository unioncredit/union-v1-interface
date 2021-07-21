const Right = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.707 3.293L15.914 8.5l-5.207 5.207-1.414-1.414L12.086 9.5H1v-2h11.086L9.293 4.707l1.414-1.414z"
      fill="#F4998E"
    />
  </svg>
);

const Left = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.293 3.293L.086 8.5l5.207 5.207 1.414-1.414L3.914 9.5H15v-2H3.914l2.793-2.793-1.414-1.414z"
      fill="#F4998E"
    />
  </svg>
);

const LinkArrow = {
  Left,
  Right,
};

export default LinkArrow;
