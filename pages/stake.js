import Button from "@components/button";
import StakeCard from "@components/stakeCard";
import StakeTable from "@components/stakeTable";
import TrustModal from "@components/trustModal";
import { TOKENS } from "@constants/index";
import { useTrustModalToggle } from "@contexts/Stake";
import { getRewards } from "@lib/contracts/getRewards";
import { getRewardsMultiplier } from "@lib/contracts/getRewardsMultiplier";
import { getStakeAmount } from "@lib/contracts/getStakeAmount";
import { getSupplyPerYear } from "@lib/contracts/getSupplyPerYear";
import { getTrust } from "@lib/contracts/getTrust";
import { stake } from "@lib/contracts/stake";
import { unstake } from "@lib/contracts/unstake";
import { vouch } from "@lib/contracts/vouch";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Stake() {
  const { account, library, chainId } = useWeb3React();

  const toggleTrustModal = useTrustModalToggle();

  const [totalStake, setTotalStake] = useState("N/A");
  const [utilizedStake, setUtilizedStake] = useState("N/A");
  const [defaultedStake, setDefaultedStake] = useState("N/A");
  const [withdrawableStake, setWithdrawableStake] = useState("N/A");
  const [rewards, setRewards] = useState("N/A");
  const [upy, setUpy] = useState("N/A");
  const [rewardsMultiplier, setRewardsMultiplier] = useState("N/A");
  const [trustData, setTrustData] = useState([]);

  useEffect(() => {
    if (library) {
      getStakeData();
      getRewardData();
      getUpyData();
      getRewardsMultiplierData();
      getTrustData();
    }
  }, []);

  const getStakeData = async () => {
    const res = await getStakeAmount(
      account,
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setTotalStake(res.stakingAmount.toString());
    setUtilizedStake(res.lendingAmount.toString());
    setDefaultedStake(res.freezeAmount.toString());
    setWithdrawableStake(res.stakingAmount.sub(res.vouchingAmount).toString());
  };

  const getRewardData = async () => {
    const res = await getRewards(TOKENS[chainId]["DAI"], library, chainId);
    setRewards(res.toString());
  };

  const getUpyData = async () => {
    const res = await getSupplyPerYear(
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setUpy(res.toString());
  };

  const getRewardsMultiplierData = async () => {
    const res = await getRewardsMultiplier(
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setRewardsMultiplier(res);
  };

  const getTrustData = async () => {
    const res = await getTrust(
      account,
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setTrustData(res);
  };

  // trustData = useMemo(
  //   () => [],
  //   []
  // );

  const onDeposit = async (amount) => {
    await stake(TOKENS[chainId]["DAI"], amount, library, chainId);
  };

  const onWithdraw = async (amount) => {
    await unstake(TOKENS[chainId]["DAI"], amount, library, chainId);
  };

  const onTrust = async (address, amount) => {
    await vouch(address, TOKENS[chainId]["DAI"], amount, library, chainId);
  };

  /**
   * @todo Hook up to contract
   * @description memoized array of objects
   * @example useMemo(
    () => [
      {
        address: "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
        vouched: 250,
        used: 100,
        health: 75
      },
      {
        address: "0xc92df132c0588c3d337d2e70225a9e85f2338088",
        vouched: 400,
        used: 250,
        health: 50
      }
    ],
    []
  )
   */

  const stakeCardData = {
    totalStake: `${totalStake} DAI`,
    utilizedStake: `${utilizedStake} DAI`,
    defaultedStake: `${defaultedStake} DAI`,
    withdrawableStake: `${withdrawableStake} DAI`,
    rewardsMultiplier: `${rewardsMultiplier}x`,
    rewards: `${rewards} UNION`,
    upy: `${upy} UNION`,
  };

  return (
    <div>
      <Head>
        <title>Stake | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="flex -mx-2 mb-5">
          <div className="w-5/12 px-2">
            <h1 className="leading-loose">Stake</h1>
          </div>

          <div className="w-7/12 px-2">
            <div className="flex justify-between items-center">
              <h2 className="leading-loose">Addresses You Trust</h2>

              <Button invert onClick={toggleTrustModal}>
                Trust a new member
              </Button>
            </div>
          </div>
        </div>

        <div className="flex -mx-2">
          <div className="w-5/12 px-2">
            <StakeCard
              data={stakeCardData}
              onDeposit={onDeposit}
              onWithdraw={onWithdraw}
            />
          </div>

          <div className="w-7/12 px-2">
            <StakeTable data={trustData} />
          </div>
        </div>
      </div>

      <TrustModal onTrust={onTrust} />
    </div>
  );
}
