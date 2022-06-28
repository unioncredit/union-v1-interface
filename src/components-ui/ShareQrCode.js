import QRCode from "qrcode.react";

const ShareQRCode = ({ link, size = 120 }) => (
  <QRCode
    value={link}
    fgColor="#032437"
    size={size}
    renderAs="svg"
    className="qrcode share-qrcode"
  />
);

export default ShareQRCode;
