import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js/bignumber.mjs";
import Button from "components/button";
import ManagerModal from "components/ManagerModal";
import { useManagerModalToggle } from "components/ManagerModal/state";
import MarketModal from "components/MarketModal";
import { useMarketModalToggle } from "components/MarketModal/state";
import INTEREST_RATE_ABI from "constants/abis/IInterestRateModel.json";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import { BLOCKS_PER_YEAR } from "constants/variables";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import useAssetContract from "hooks/contracts/useAssetContract";
import useCompoundContract from "hooks/contracts/useCompoundContract";
import useCurrentToken from "hooks/useCurrentToken";
import useMarketRegistryContract from "hooks/contracts/useMarketRegistryContract";
import useUserContract from "hooks/contracts/useUserContract";
import { Fragment, useState } from "react";

const parseRes = (res, decimals = 2) =>
  Number(formatUnits(res, 18)).toFixed(decimals);

const WAD = 1e18;

export default function AdminView() {
  const { library, chainId } = useWeb3React();

  const toggleMarketModal = useMarketModalToggle();
  const toggleManagerModal = useManagerModalToggle();

  const curToken = useCurrentToken();
  const assetContract = useAssetContract();
  const compoundContract = useCompoundContract();
  const userContract = useUserContract();
  const marketRegistryContract = useMarketRegistryContract();

  let marketContract;
  let interestRateContract;

  const [totalStake, setTotalStake] = useState(0);
  const [frozenStake, setFrozenStake] = useState(0);
  const [memberFee, setMemberFee] = useState(0);
  const [overdueBlocks, setOverdueBlocks] = useState(0);
  const [originationFee, setOriginationFee] = useState(0);
  const [totalBorrows, setTotalBorrows] = useState(0);
  const [debtCeiling, setDebtCeiling] = useState(0);
  const [maxBorrow, setMaxBorrow] = useState(0);
  const [minLoan, setMinLoan] = useState(0);
  const [apr, setApr] = useState(0);
  const [lendingPoolBalance, setLendingPoolBalance] = useState(0);
  const [compoundBalance, setCompoundBalance] = useState(0);

  useAutoEffect(() => {
    let isMounted = true;

    async function fetchMarketData() {
      try {
        if (isMounted) {
          const marketAddress = await marketRegistryContract.tokens(curToken);

          marketContract = new Contract(
            marketAddress,
            LENDING_MARKET_ABI,
            library.getSigner()
          );

          const interestRateAddress = await marketContract.interestRateModel();

          interestRateContract = new Contract(
            interestRateAddress,
            INTEREST_RATE_ABI,
            library.getSigner()
          );

          const overdueBlocksRes = await marketContract.overdueBlocks();
          const originationFeeRes = await marketContract.originationFee();
          const totalBorrowsRes = await marketContract.totalBorrows();
          const debtCeilingRes = await marketContract.debtCeiling();
          const minLoanRes = await marketContract.minLoan();
          const maxBorrowRes = await marketContract.maxBorrow();
          const ratePreBlock = await marketContract.borrowRatePerBlock();

          setApr(
            (
              parseRes(ratePreBlock, 18) *
              BLOCKS_PER_YEAR[chainId] *
              100
            ).toFixed(2)
          );
          setOverdueBlocks(overdueBlocksRes.toString());
          setOriginationFee(parseRes(originationFeeRes, 2) * 100);
          setTotalBorrows(parseRes(totalBorrowsRes, 2));
          setDebtCeiling(parseRes(debtCeilingRes, 2));
          setMinLoan(parseRes(minLoanRes, 2));
          setMaxBorrow(parseRes(maxBorrowRes, 2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    async function fetchStakingData() {
      try {
        if (isMounted) {
          const totalStakedRes = await userContract.totalStaked(curToken);
          const totalFrozenRes = await userContract.totalFrozen(curToken);
          setTotalStake(parseRes(totalStakedRes, 2));
          setFrozenStake(parseRes(totalFrozenRes, 2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    async function fetchMemberData() {
      try {
        if (isMounted) {
          const newMemberFeeRes = await userContract.newMemberFee();
          setMemberFee(parseRes(newMemberFeeRes, 2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    async function fetchFundsData() {
      try {
        if (isMounted) {
          const lendingPoolBalance = await assetContract.getLoanableAmount(
            curToken
          );
          setLendingPoolBalance(parseRes(lendingPoolBalance, 2));

          const compoundBalance = await compoundContract.getSupplyView(
            curToken
          );
          setCompoundBalance(parseRes(compoundBalance, 2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    fetchStakingData();
    fetchMemberData();
    fetchMarketData();
    fetchFundsData();

    return () => {
      isMounted = false;
    };
  });

  const onSetOriginationFee = useAutoCallback(async (amount) => {
    try {
      await marketContract.setOriginationFee(
        new BigNumber(amount / 100).times(WAD).toFixed()
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onSetDebtCeiling = useAutoCallback(async (amount) => {
    try {
      await marketContract.setDebtCeiling(
        new BigNumber(amount).times(WAD).toFixed()
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onSetMaxBorrow = useAutoCallback(async (amount) => {
    try {
      await marketContract.setMaxBorrow(
        new BigNumber(amount).times(WAD).toFixed()
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onSetMinLoan = useAutoCallback(async (amount) => {
    try {
      await marketContract.setMinLoan(
        new BigNumber(amount).times(WAD).toFixed()
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onSetOverdueBlocks = useAutoCallback(async (amount) => {
    try {
      await marketContract.setOverdueBlocks(amount);
    } catch (err) {
      console.error(err);
    }
  });

  const onSetNewMemberFee = useAutoCallback(async (amount) => {
    try {
      await userContract.setNewMemberFee(
        new BigNumber(amount).times(WAD).toFixed()
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onAddMember = useAutoCallback(async (address) => {
    try {
      await userContract.addMember(address);
    } catch (err) {
      console.error(err);
    }
  });

  const onSetBorrowApr = useAutoCallback(async (rate) => {
    try {
      await interestRateContract.setInterestRate(
        parseInt((rate * 10 ** 18) / (100 * BLOCKS_PER_YEAR[chainId]))
      );
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <Fragment>
      <div className="container">
        <div className="mb-5">
          <h1>Market</h1>
        </div>
        <div className="mb-6">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>
                  <div className="flex items-center">Total Borrows(DAI)</div>
                </th>
                <th>
                  <div className="flex items-center">Debt Ceiling(DAI)</div>
                </th>
                <th>
                  <div className="flex items-center">Origination Fee(%)</div>
                </th>
                <th>
                  <div className="flex items-center">Borrow Apr(%)</div>
                </th>
                <th>
                  <div className="flex items-center">Max Borrow(DAI)</div>
                </th>
                <th>
                  <div className="flex items-center">Min Loan(DAI)</div>
                </th>
                <th>
                  <div className="flex items-center">Overdue Blocks</div>
                </th>
                <th>
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalBorrows}</td>
                <td>{debtCeiling}</td>
                <td>{originationFee}</td>
                <td>{apr}</td>
                <td>{maxBorrow}</td>
                <td>{minLoan}</td>
                <td>{overdueBlocks}</td>
                <td style={{ textAlign: "right" }}>
                  <Button onClick={toggleMarketModal}>Edit</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-5">
          <h1>Manager</h1>
        </div>
        <div className="mb-6">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>
                  <div className="flex items-center">Total Staked(DAI)</div>
                </th>
                <th>
                  <div className="flex items-center">Total Defaulted(DAI)</div>
                </th>
                <th>
                  <div className="flex items-center">Member Fee(Union)</div>
                </th>
                <th>
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalStake}</td>
                <td>{frozenStake}</td>
                <td>{memberFee}</td>
                <td style={{ textAlign: "right" }}>
                  <Button onClick={toggleManagerModal}>Edit</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-5">
          <h1>Funds</h1>
        </div>
        <div className="mb-6">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>
                  <div
                    className="flex items-center"
                    style={{ justifyContent: "flex-start" }}
                  >
                    Lending Pool Balance(DAI)
                  </div>
                </th>
                <th>
                  <div
                    className="flex items-center"
                    style={{ justifyContent: "flex-start" }}
                  >
                    Compound Balance(DAI)
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{lendingPoolBalance}</td>
                <td>{compoundBalance}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <MarketModal
        onSetOriginationFee={onSetOriginationFee}
        onSetDebtCeiling={onSetDebtCeiling}
        onSetMaxBorrow={onSetMaxBorrow}
        onSetMinLoan={onSetMinLoan}
        onSetOverdueBlocks={onSetOverdueBlocks}
        onSetBorrowApr={onSetBorrowApr}
      />
      <ManagerModal
        onSetNewMemberFee={onSetNewMemberFee}
        onAddMember={onAddMember}
      />
    </Fragment>
  );
}
