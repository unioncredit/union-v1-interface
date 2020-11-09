import { memo } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon-custom-colors";

const jazziconTheme = [
  "#418CFC",
  "#FDAFA6",
  "#A6B9FD",
  "#F4DBD8",
  "#A6D3FD",
  "#2900A0",
  "#E8F1E9",
  "#F9C4BE",
  "#48666A",
];

/**
 * @name Identicon
 * @param {object} props
 * @param {string} props.address
 * @param {(18|24|32|48|72)} props.size
 */
const Identicon = ({ address, size = 18 }) => {
  return (
    <Jazzicon
      colors={jazziconTheme}
      diameter={size}
      seed={jsNumberForAddress(address)}
    />
  );
};

export default memo(Identicon);
