import Button from "@components/button";
import StakeCard from "@components/stakeCard";
import StakeTable from "@components/stakeTable";
import TrustModal from "@components/trustModal";
import { TOKENS } from "@constants/index";
import { useEmailModalToggle } from "@contexts/Application";
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
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Stake() {
  const { account, library, chainId } = useWeb3React();
  const toggleTrustModal = useTrustModalToggle();
  const toggleEmailModal = useEmailModalToggle();

  const [totalStake, setTotalStake] = useState("N/A");
  const [utilizedStake, setUtilizedStake] = useState("N/A");
  const [defaultedStake, setDefaultedStake] = useState("N/A");
  const [withdrawableStake, setWithdrawableStake] = useState("N/A");
  const [rewards, setRewards] = useState("N/A");
  const [upy, setUpy] = useState("N/A");
  const [rewardsMultiplier, setRewardsMultiplier] = useState(0);
  const [trustData, setTrustData] = useState([]);
  const [signer, setSigner] = useState(undefined);

  const { email_modal_completed } = parseCookies();

  useEffect(() => {
    if (library && account) {
      getStakeData();
      getRewardData();
      getUpyData();
      getRewardsMultiplierData();
      getTrustData();
      setSigner(library.getSigner());
    }
  }, [library, account]);

  useEffect(() => {
    if (!email_modal_completed) toggleEmailModal();
  }, [email_modal_completed]);

  const getStakeData = async () => {
    const res = await getStakeAmount(
      account,
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setTotalStake(res.stakingAmount);
    setUtilizedStake(res.lendingAmount);
    setDefaultedStake(res.freezeAmount);
    setWithdrawableStake(res.stakingAmount.sub(res.vouchingAmount));
  };

  const getRewardData = async () => {
    const res = await getRewards(TOKENS[chainId]["DAI"], library, chainId);
    setRewards(res);
  };

  const getUpyData = async () => {
    const res = await getSupplyPerYear(
      TOKENS[chainId]["DAI"],
      library,
      chainId
    );
    setUpy(res);
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

  const onDeposit = async (amount) => {
    await stake(TOKENS[chainId]["DAI"], amount, signer, chainId);
  };

  const onWithdraw = async (amount) => {
    await unstake(TOKENS[chainId]["DAI"], amount, signer, chainId);
  };

  const onTrust = async (address, amount) => {
    await vouch(address, TOKENS[chainId]["DAI"], amount, signer, chainId);
  };

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
      </Head>

      <div className="container">
        <div className="flex -mx-2 mb-4">
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
