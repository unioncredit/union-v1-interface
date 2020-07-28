import { useWeb3React } from "@web3-react/core";

const hexlify = (message) =>
  "0x" + Buffer.from(message, "utf8").toString("hex");

export default function usePersonalSign() {
  const { library, account } = useWeb3React();

  return async (message) =>
    library.send("personal_sign", [hexlify(message), account]);
}
