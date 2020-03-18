/**
 * @name withinRange
 *
 * @param {Obbject} props
 * @param {String} propName
 * @param {String} componentName
 * @param {Number} min
 * @param {Number} max
 *
 * @returns {null|Error}
 */
export default function withinRange(
  props,
  propName,
  componentName,
  min = 0,
  max = 100
) {
  componentName = componentName || "Anonymous";

  if (props[propName]) {
    const value = props[propName];

    if (typeof value === "number")
      return value >= min && value <= max
        ? null
        : new Error(
            `${propName} in ${componentName} is not within ${min} to ${max}`
          );
  }

  return null;
}
