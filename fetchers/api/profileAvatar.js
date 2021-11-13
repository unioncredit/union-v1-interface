import md5 from "md5";
import { createCanvas } from "canvas";

/**
 *  Copy of code used by avatar component
 */
function getProfileAvatar(size, string) {
  const count = 5;
  const width = size;
  const height = size;
  const padding = 0;

  let fg = "#" + string.slice(2, 8);
  let bg = "#" + string.slice(2, 8) + "55";

  let hash = md5(string);
  let block = Math.floor(size / count);
  let hashcolor = hash.slice(0, 6);

  const canvas = createCanvas(width, height);

  let pad = padding;
  canvas.width = block * count + pad;
  canvas.height = block * count + pad;
  let arr = hash.split("").map((el) => {
    el = parseInt(el, 16);
    if (el < 8) {
      return 0;
    } else {
      return 1;
    }
  });

  let map = [];

  map[0] = map[4] = arr.slice(0, 5);
  map[1] = map[3] = arr.slice(5, 10);
  map[2] = arr.slice(10, 15);

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  map.forEach((row, i) => {
    row.forEach((el, j) => {
      if (el) {
        ctx.fillStyle = fg ? fg : "#" + hashcolor;
        ctx.fillRect(
          block * i + pad,
          block * j + pad,
          block - pad,
          block - pad
        );
      } else {
        ctx.fillStyle = bg;
        ctx.fillRect(
          block * i + pad,
          block * j + pad,
          block - pad,
          block - pad
        );
      }
    });
  });

  return canvas.toBuffer("image/png");
}

module.exports = getProfileAvatar;
