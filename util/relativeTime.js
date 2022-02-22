export default function relativeTime(timestamp) {
  const sInDay = 60 * 60 * 24;
  const sInHour = 60 * 60;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const deltaTimestamp = Math.abs(timestamp - currentTimestamp);

  const dayCount = Math.floor(deltaTimestamp / sInDay);
  const hourCount = Math.floor((deltaTimestamp - dayCount * sInDay) / sInHour);

  if (timestamp < currentTimestamp) {
    return `${dayCount}d ${hourCount}h ago`;
  }

  return `in ${dayCount}d ${hourCount}h`;
}
