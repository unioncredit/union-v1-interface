/**
 * @name wrapper
 * @param {Function} fn
 *
 * @note WIP
 */
export default wrapper = (fn, isMounted) =>
  async function () {
    try {
      if (isMounted) {
        return await fn.apply(this, arguments);
      }
    } catch (err) {
      if (isMounted) {
        console.error(err);
      }
    }
  };
