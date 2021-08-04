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

export const Identicon = memo(({
  address,
  size = 18,
}) => {
  return (
    <Jazzicon
      colors={jazziconTheme}
      diameter={size}
      seed={jsNumberForAddress(address)}
    />
  );
});
