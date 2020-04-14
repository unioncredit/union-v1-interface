import QRCode from "qrcode.react";

const ShareQRCode = ({ link, size = 104 }) => (
  <QRCode value={link} fgColor="#032437" size={size} renderAs="svg" />
);

export default ShareQRCode;
