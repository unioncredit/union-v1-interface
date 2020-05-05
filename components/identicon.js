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

const Identicon = memo(({ address, extraLarge = false, large = false }) => {
  return (
    <Jazzicon
      colors={jazziconTheme}
      diameter={extraLarge ? 72 : large ? 32 : 18}
      seed={jsNumberForAddress(address)}
    />
  );
});

export default Identicon;
