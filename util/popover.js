import { getCollisions } from "@reach/popover";

/**
 * @name getTopPosition
 *
 * @param {import("@reach/rect").PRect} targetRect
 * @param {import("@reach/rect").PRect} popoverRect
 */
export function getTopPosition(targetRect, popoverRect) {
  const { directionUp } = getCollisions(targetRect, popoverRect);
  return {
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset}px`,
  };
}

/**
 * @name getPosition
 *
 * @param {import("@reach/rect").PRect} targetRect
 * @param {import("@reach/rect").PRect} popoverRect
 */
export function getPosition(targetRect, popoverRect) {
  if (!targetRect || !popoverRect) {
    return {};
  }

  return {
    left: targetRect.left - popoverRect.width / 2 + 16 + window.pageXOffset,
    ...getTopPosition(targetRect, popoverRect),
  };
}
