const Increase = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx={8} cy={8} r={8} fill="#DFF5E8" />
    <path
      d="M5.454 9.243l2.117-3.528a.5.5 0 01.858 0l2.117 3.528a.5.5 0 01-.43.757H5.884a.5.5 0 01-.429-.757z"
      fill="#5DCE8D"
    />
  </svg>
);

const Decrease = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx={8} cy={8} r={8} fill="#FFEAEE" />
    <path
      d="M10.546 6.757l-2.117 3.528a.5.5 0 01-.858 0L5.454 6.757A.5.5 0 015.884 6h4.233a.5.5 0 01.429.757z"
      fill="#E9506B"
    />
  </svg>
);

const ArrowCircle = {
  Increase,
  Decrease,
};

export default ArrowCircle;
