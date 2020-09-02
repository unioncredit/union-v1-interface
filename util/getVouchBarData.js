/**
 * @name getVouchBarData
 * @param {Array} vouchData
 */
export default function getVouchBarData(vouchData) {
  if (!vouchData || vouchData.length === 0) return [];

  const vouches = vouchData
    .map(({ vouched, address }) => ({
      address,
      vouched: Number(vouched),
    }))
    .sort((a, b) => b.vouched - a.vouched);

  const vouchTotal = vouches
    .map(({ vouched }) => vouched)
    .reduce((acc, cur) => acc + cur);

  return vouches.map(({ vouched, address }) => ({
    address,
    width: (vouched / vouchTotal) * 100,
  }));
}

export function getVouchTotal(vouchData) {
  if (!vouchData || vouchData.length === 0) return [];

  const vouches = vouchData
    .map(({ vouched }) => Number(vouched))
    .sort((a, b) => b - a);

  const vouchTotal = vouches.reduce((acc, cur) => acc + cur);

  return vouchTotal;
}
