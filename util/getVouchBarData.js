/**
 * @name getVouchBarData
 * @param {Array} vouchData
 */
export default function getVouchBarData(vouchData) {
  return vouchData.length > 0
    ? vouchData.map(({ vouched }) => parseFloat(vouched))
    : [];
}
