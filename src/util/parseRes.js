import { formatUnits } from "@ethersproject/units";

const parseRes = (res, decimals = 2) =>
  Number(formatUnits(res, 18)).toFixed(decimals);

export default parseRes;
