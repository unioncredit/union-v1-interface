export default function handleTxError(err) {
  console.error(err);

  if (err.code && err.code === 4001) return "Denied transaction signature";
  if (err.code && err.code === -32000) return "Transaction failed";

  return "Something went wrong";
}
