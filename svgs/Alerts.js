export const Loading = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
      fill="#068DFE"
      fillOpacity={0.1}
    />
    <path
      opacity={0.1}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 28.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666zm0-1.785a6.548 6.548 0 100-13.095 6.548 6.548 0 000 13.095z"
      fill="#418CFC"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.333 20A8.333 8.333 0 0120 28.333v-1.785A6.548 6.548 0 1013.453 20h-1.786a8.333 8.333 0 0116.666 0z"
      fill="#418CFC"
    />
  </svg>
);

export const Failure = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
      fill="#E61744"
      fillOpacity={0.1}
    />
    <path
      d="M28.532 24.376l-7.33-12.196A1.39 1.39 0 0020 11.5a1.39 1.39 0 00-1.2.68l-7.333 12.196A1.404 1.404 0 0012.67 26.5h14.663a1.403 1.403 0 001.2-2.124zM20.417 24h-.834a.417.417 0 01-.416-.417v-.833c0-.23.186-.417.416-.417h.834c.23 0 .416.187.416.417v.833c0 .23-.186.417-.416.417zM20 20.667a.834.834 0 01-.833-.834v-2.5a.834.834 0 011.666 0v2.5c0 .46-.373.834-.833.834z"
      fill="#E61744"
    />
  </svg>
);

export const Success = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
      fill="#5DCE8D"
      fillOpacity={0.1}
    />
    <path
      d="M26.65 14.992a.833.833 0 00-.573.252L17.5 23.822l-2.744-2.744a.832.832 0 00-1.435.585.835.835 0 00.256.593l3.334 3.334a.833.833 0 001.178 0l9.167-9.167a.833.833 0 00-.606-1.43z"
      fill="#5DCE8D"
    />
  </svg>
);

export const Pending = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx={20} cy={20} r={20} fill="#FE9F7C" fillOpacity={0.2} />
    <path
      d="M20 11.667c-.69 0-1.25.56-1.25 1.25v.579A4.998 4.998 0 0015 18.333v5l-1.28.964h-.001a.834.834 0 00.447 1.536h11.667a.834.834 0 00.448-1.536L25 23.333v-5a4.998 4.998 0 00-3.75-4.837v-.58c0-.69-.56-1.25-1.25-1.25zm-1.667 15c0 .916.75 1.666 1.667 1.666.916 0 1.666-.75 1.666-1.666h-3.333z"
      fill="#FE9F7C"
    />
  </svg>
);
