import stream from "stream";
import { createCanvas, Image, loadImage, registerFont } from "canvas";
import getProfileAvatar from "./profileAvatar";
import getProfileDetails from "./profileDetails";
import formatDateTime from "util/formatDateTime";

export default async function handler(req, res) {
  const address = req.query.address;
  const width = 1200;
  const height = 600;

  const details = await getProfileDetails(address);

  registerFont("public/inter.ttf", { family: "Inter" });

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#fff";
  context.fillRect(2, 0, width, height);
  context.fillStyle = "#44403C";

  // profile image
  context.save();
  context.beginPath();
  context.arc(200, 200, 120, 0, Math.PI * 2);
  context.closePath();
  context.clip();

  const img0 = await loadImage(details.image || getProfileAvatar(240, address));
  context.drawImage(img0, 200 - 120, 200 - 120, 240, 240);
  context.restore();

  context.textBaseline = "top";

  // ENS text
  const ensText = details.name;
  context.font = "48px Inter";
  context.fillText(ensText, 380, 130);

  const addressText = address;
  context.font = "28px Inter";
  context.fillText(addressText, 380, 200);

  // union logo image
  const img = new Image();
  img.onload = function () {
    const width = 77;
    const height = 32;
    const scale = 2;
    context.drawImage(img, 100, 500, width * scale, height * scale);
  };
  img.src = "public/logo.png";

  const infoTextSpacing = 48;
  const infoTextStartOffset = 280;

  const infoText = [
    details.memberSince > 0
      ? `Union member since ${formatDateTime(details.memberSince)}`
      : "Not yet a Union member",
    "Credit Limit: N/A",
    "Vouching for N/A addresses",
    "Recieving vouches from N/A addresses",
  ];

  context.font = "28px Inter";
  for (let i = 0; i < infoText.length; i++) {
    context.fillText(
      infoText[i],
      380,
      infoTextStartOffset + i * infoTextSpacing
    );
  }

  const buffer = canvas.toBuffer("image/png");

  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  bufferStream.pipe(res);
}
