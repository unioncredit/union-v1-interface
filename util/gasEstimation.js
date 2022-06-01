export const makeTxWithGasEstimate = async (
  contract,
  func,
  params,
  fallbackLimit
) => {
  let gasLimit;
  try {
    const estimateGas = await contract.estimateGas[func](...params);
    gasLimit = (parseFloat(estimateGas.toString()) * 1.1).toFixed(0);
  } catch (err) {
    gasLimit = fallbackLimit || 800000;
  }

  return contract[func](...params, { gasLimit });
};
