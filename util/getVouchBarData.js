/**
 * @name getVouchBarData
 * @param {Array} vouchData
 */
export default function getVouchBarData(vouchData) {
  if (!vouchData || vouchData.length === 0) return [];

  const vouches = vouchData
    .map(({ vouched }) => Number(vouched))
    .sort((a, b) => b - a);

  const vouchTotal = vouches.reduce((acc, cur) => acc + cur);

  return vouches.map((vouch) => (vouch / vouchTotal) * 100);
}

export function getVouchTotal(vouchData) {
  if (!vouchData || vouchData.length === 0) return [];

  const vouches = vouchData
    .map(({ vouched }) => Number(vouched))
    .sort((a, b) => b - a);

  const vouchTotal = vouches.reduce((acc, cur) => acc + cur);

  return vouchTotal;
}
