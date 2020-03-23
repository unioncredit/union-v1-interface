import Jazzicon, { jsNumberForAddress } from "react-jazzicon-custom-colors";

const jazziconTheme = [
  "#01888c",
  "#fc7500",
  "#034f5d",
  "#f73f01",
  "#fc1960",
  "#c7144c",
  "#f3c100",
  "#1598f2",
  "#2465e1",
  "#f19e02",
];

const Identicon = ({ address, large = false }) => {
  return (
    <Jazzicon
      color={jazziconTheme}
      diameter={large ? 32 : 18}
      seed={jsNumberForAddress(address)}
    />
  );
};

export default Identicon;
