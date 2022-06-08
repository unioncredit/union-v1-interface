import dayjs from "dayjs";

function parseMs(milliseconds) {
	if (typeof milliseconds !== 'number') {
		throw new TypeError('Expected a number');
	}

	return {
		days: Math.trunc(milliseconds / 86400000),
		hours: Math.trunc(milliseconds / 3600000) % 24,
		minutes: Math.trunc(milliseconds / 60000) % 60,
		seconds: Math.trunc(milliseconds / 1000) % 60,
		milliseconds: Math.trunc(milliseconds) % 1000,
		microseconds: Math.trunc(milliseconds * 1000) % 1000,
		nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
	};
}

/**
 * @name formatDueDate
 * @param {Number} secondsUntilDue
 */
export const formatDueDate = (secondsUntilDue) => {
  /**
   * Convert seconds to Milliseconds
   */
  const ms = secondsUntilDue * 1000;

  const { days, hours, minutes } = parseMs(ms);

  if (days < 1 && hours <= 12) {
    return `in ${hours}h ${minutes}m`;
  }

  if (days <= 1) {
    return `in ${hours} hours`;
  }

  if (days <= 7 && hours >= 22) {
    return `in ${days + 1} days`;
  }

  if (days <= 7) {
    return `in ${days}d ${hours}h`;
  }

  if (days > 7 && days <= 14) {
    return `in ${days} days`;
  }

  if (days > 14) {
    return dayjs().add(ms, "millisecond").format("[on] MMM D");
  }
};
