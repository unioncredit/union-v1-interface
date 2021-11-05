import dayjs from "dayjs";

export default function formatDateTime(ts) {
  // because js has dumb timestamps
  const jsts = Number(ts) * 1000;
  return dayjs(jsts).format("HH:MM DD MMM");
}
