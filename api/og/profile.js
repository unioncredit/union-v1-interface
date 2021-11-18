import stream from "stream";
import path from "path";
import { registerFont, createCanvas, Image, loadImage } from "canvas";
import getProfileAvatar from "../../fetchers/profileAvatar";
import getProfileDetails from "../../fetchers/profileDetails";
import formatDateTime from "../../util/formatDateTime";

function roundRect(ctx, x, y, width, height, radius) {
  radius = { tl: radius, tr: radius, br: radius, bl: radius };
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  ctx.fill();
}

export default async function handler(req, res) {
  const address = req.query.address;
  const width = 1200;
  const height = 600;

  registerFont(path.resolve(__dirname, "../../public/arial.ttf"), {
    family: "arial",
  });

  const details = await getProfileDetails(address);

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  const centerTextOffset = (text) => {
    const textMeasure = context.measureText(text);
    return (width - textMeasure.width) / 2;
  };

  context.fillStyle = "#F5F5F4";
  context.fillRect(2, 0, width, height);
  context.fillStyle = "#44403C";

  const startOffset = 158;

  const profilePositionX = 600;
  const profilePositionY = startOffset;
  const profileRadius = 64;

  // profile image
  context.save();
  context.beginPath();
  context.arc(
    profilePositionX,
    profilePositionY,
    profileRadius,
    0,
    Math.PI * 2
  );
  context.closePath();
  context.clip();

  const img0 = await loadImage(details.image || getProfileAvatar(240, address));
  context.drawImage(
    img0,
    profilePositionX - profileRadius,
    profilePositionY - profileRadius,
    profileRadius * 2,
    profileRadius * 2
  );
  context.restore();

  if (details.memberSince > 0) {
    // profile border
    context.beginPath();
    context.arc(
      profilePositionX,
      profilePositionY,
      profileRadius + 6,
      0,
      Math.PI * 2
    );
    context.closePath();
    context.lineWidth = 4;
    context.strokeStyle = "#3B82F6";
    context.stroke();

    // profile member badge
    context.beginPath();
    context.arc(
      profilePositionX + profileRadius - 14,
      profilePositionY + profileRadius - 14,
      16,
      0,
      Math.PI * 2
    );
    context.fillStyle = "#3B82F6";
    context.fill();

    // tick image
    const tickImg = new Image();
    tickImg.onload = function () {
      context.drawImage(
        tickImg,
        profilePositionX + profileRadius - 14 - 8,
        profilePositionY + profileRadius - 14 - 6,
        16,
        12
      );
    };
    tickImg.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABNSURBVHgBrY9BCgAgCAT9uf6sp20eDCTEVBro1M6AREMAsD7QhCOPAl5uB25ZkT+y++S2bAMPt2QbSRRB5+YgsspyEqnLSaQuBxF5bTehHAnGo08F1AAAAABJRU5ErkJggg==";
  }

  context.textBaseline = "top";

  // ENS text
  context.fillStyle = "black";
  const ensText = details.name;
  context.font = "40px arial";
  context.fillText(ensText, centerTextOffset(ensText), startOffset + 86);

  const addressText = address;
  context.fillStyle = "#A8A29E";
  context.font = "24px arial";
  context.fillText(
    addressText,
    centerTextOffset(addressText),
    startOffset + 138
  );

  context.font = "28px arial";
  let infoText, fillColor, textColor;
  if (details.memberSince > 0) {
    infoText = `Member since ${formatDateTime(details.memberSince)}`;
    textColor = "#3B82F6";
    fillColor = "#DBEAFE";
  } else {
    // not a member;
    infoText = "Not yet a member";
    textColor = "#F59E0B";
    fillColor = "#FEF3C7";
  }

  const infoTextOffset = startOffset + 176;
  const infoTextPadding = 12;
  const infoTextMeasure = context.measureText(infoText);
  context.fillStyle = fillColor;
  roundRect(
    context,
    (width - infoTextMeasure.width - infoTextPadding * 2) / 2,
    infoTextOffset + 2,
    infoTextMeasure.width + infoTextPadding * 2,
    28 + infoTextPadding,
    12
  );
  context.fillStyle = textColor;
  context.fillText(infoText, centerTextOffset(infoText), infoTextOffset + 3);

  // union logo image
  const img = new Image();
  img.onload = function () {
    const imageWidth = 77;
    const imageHeight = 32;
    const scale = 1.4;
    context.drawImage(
      img,
      (width - imageWidth * scale) / 2,
      518,
      imageWidth * scale,
      imageHeight * scale
    );
  };
  img.src =
    "data:image/png;base64,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";

  const buffer = canvas.toBuffer("image/png");
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  res.setHeader("Content-Type", "image/png");
  bufferStream.pipe(res);
}
