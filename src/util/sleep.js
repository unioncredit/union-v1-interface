export function sleep(n) {
  return new Promise((res) => {
    setTimeout(res, 1000 * n);
  });
}
