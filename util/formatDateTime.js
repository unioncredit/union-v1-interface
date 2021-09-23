import dayjs from "dayjs";

export default function formatDateTime(ts) {
  return dayjs(ts).format("HH:MM DD MMM");
}
