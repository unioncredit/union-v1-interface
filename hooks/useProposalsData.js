import delay from "lib/delay";
import useSWR from "swr";

const getProposals = async () => {
  await delay(100);

  return [
    {
      id: 1,
      proposer: "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
      eta: 1601394741,
      targets: [
        "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
        "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
      ],
      values: [0, 1, 2],
      signatures: [
        "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
        "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
      ],
      calldatas: ["0x...", "0x..."],
      startBlock: 10958266,
      endBlock: 10958260,
      forVotes: 1000,
      againstVotes: 500,
      canceled: false,
      executed: true,
      receipts: [
        {
          hasVoted: true,
          support: true,
          votes: 400,
        },
        {
          hasVoted: true,
          support: true,
          votes: 300,
        },
        {
          hasVoted: true,
          support: true,
          votes: 300,
        },
        {
          hasVoted: true,
          support: false,
          votes: 500,
        },
      ],
    },
  ];
};

export default function useProposalsData() {
  return useSWR("ProposalsData", getProposals, {
    refreshInterval: 10 * 1000,
    dedupingInterval: 10 * 1000,
  });
}
