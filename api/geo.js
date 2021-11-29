import geoip from "geoip-lite";

export default function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const geo = geoip.lookup(ip);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(geo);
}
