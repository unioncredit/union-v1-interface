import parseMs from "parse-ms";
import dayjs from "dayjs";

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
