import { useWeb3React } from "@web3-react/core";
import { GOLDEN_TICKET_NFT_ADDRESS } from "constants/variables";
import useSWR from "swr";
import useContract from "./useContract";

const GOLDEN_TICKET = {
  address: GOLDEN_TICKET_NFT_ADDRESS,
  /**
   * Uses new Human-Readable ABI Standard
   * @see https://docs.ethers.io/v5/api/utils/abi/formats/#abi-formats--human-readable-abi
   *
   * ERC-1155 Multi Token Standard
   * @see https://eips.ethereum.org/EIPS/eip-1155
   */
  abi: [
    "function balanceOf(address _owner, uint256 _id) external view returns (uint256)",
  ],
  /**
   * ERC-1155 Token ID
   */
  id: "",
};

const hasGoldenTicket = (contract) => async (_, account) => {
  const balanceOf = await contract.balanceOf(account, GOLDEN_TICKET.id);

  if (balanceOf) return true;

  return false;
};

export default function useGoldenTicket() {
  const { account, library } = useWeb3React();

  const ticketContract = useContract(GOLDEN_TICKET.address, GOLDEN_TICKET.abi);

  const shouldFetch =
    typeof account === "string" && !!library && !!ticketContract;

  const { data } = useSWR(
    shouldFetch ? ["GoldenTicket", account] : null,
    hasGoldenTicket(ticketContract)
  );

  return data;
}
