function parseMs(milliseconds) {
  if (typeof milliseconds !== "number") {
    throw new TypeError("Expected a number");
  }

  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
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
  const ms = Number(secondsUntilDue.toString()) * 1000;

  const { days, hours, minutes } = parseMs(ms);

  return `in ${days > 0 ? `${days}d` : ""} ${hours > 0 ? `${hours}h` : ""} ${
    minutes > 0 ? `${minutes}m` : ""
  }`;
};
