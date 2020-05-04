import { commify, formatUnits, parseUnits } from "@ethersproject/units";
import { useMarketModalToggle, useManagerModalToggle } from "@contexts/Admin";
import Button from "@components/button";
import { blockSpeed } from "@constants";
import useCurrentToken from "@hooks/useCurrentToken";
import useIsAdmin from "@hooks/useIsAdmin";
import useStakingContract from "@hooks/useStakingContract";
import useMemberContract from "@hooks/useMemberContract";
import useUnionContract from "@hooks/useUnionContract";
import useMarketContract from "@hooks/useMarketContract";
import { useSortBy, useTable } from "react-table";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import { Fragment, useState } from "react";
import { BLOCKS_PER_YEAR } from "@constants/";
import BigNumber from "bignumber.js/bignumber.mjs";
import MarketModal from "@components/marketModal";
import ManagerModal from "@components/managerModal";

const parseRes = (res, decimals = 2) =>
  Number(formatUnits(res, 18)).toFixed(decimals);

const WAD = 1e18;

export default function AdminView() {
  const { account, library, chainId } = useWeb3React();

  const toggleMarketModal = useMarketModalToggle();
  const toggleManagerModal = useManagerModalToggle();

  const curToken = useCurrentToken();
  const isAdmin = useIsAdmin();
  const stakingContract = useStakingContract();
  const memberContract = useMemberContract();
  const unionContract = useUnionContract();

  const marketContractPromise = useMarketContract(curToken);

  let marketContract;

  const [totalStake, setTotalStake] = useState(0);
  const [frozenStake, setFrozenStake] = useState(0);
  const [memberFee, setMemberFee] = useState(0);
  const [minInflation, setMinInflation] = useState(0);
  const [maxInflation, setMaxInflation] = useState(0);
  const [defaultInflation, setDefaultInflation] = useState(0);
  const [overdueBlocks, setOverdueBlocks] = useState(0);
  const [originationFee, setOriginationFee] = useState(0);
  const [totalBorrows, setTotalBorrows] = useState(0);
  const [debtCeiling, setDebtCeiling] = useState(0);
  const [minLoan, setMinLoan] = useState(0);

  useAutoEffect(() => {
    let isMounted = true;

    function fetchMarketData() {
      marketContractPromise.then(async (res) => {
        marketContract = res;
        try {
          if (isMounted) {
            const overdueBlocksRes = await marketContract.overdueBlocks();
            const originationFeeRes = await marketContract.originationFee();
            const totalBorrowsRes = await marketContract.totalBorrows();
            const debtCeilingRes = await marketContract.debtCeiling();
            const minLoanRes = await marketContract.minLoan();
            setOverdueBlocks(overdueBlocksRes.toString());
            setOriginationFee(parseRes(originationFeeRes, 2) * 100);
            setTotalBorrows(parseRes(totalBorrowsRes, 2));
            setDebtCeiling(parseRes(debtCeilingRes, 2));
            setMinLoan(parseRes(minLoanRes, 2));
          }
        } catch (err) {
          if (isMounted) {
            console.error(err);
          }
        }
      });
    }

    async function fetchUnionData() {
      try {
        if (isMounted) {
          const minInflationPerBlockRes = await unionContract.minInflationPerBlock();
          const maxInflationPerBlockRes = await unionContract.maxInflationPerBlock();
          const defaultInflationPerBlockRes = await unionContract.defaultInflationPerBlock();
          setMinInflation(
            (
              parseRes(minInflationPerBlockRes, 18) *
              BLOCKS_PER_YEAR[chainId] *
              100
            ).toFixed(2)
          );
          setMaxInflation(
            (
              parseRes(maxInflationPerBlockRes, 18) *
              BLOCKS_PER_YEAR[chainId] *
              100
            ).toFixed(2)
          );
          setDefaultInflation(parseRes(defaultInflationPerBlockRes, 2) * 100);
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
          const totalStakedRes = await stakingContract.totalStaked(curToken);
          const totalFrozenRes = await stakingContract.totalFrozen(curToken);
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
          const newMemberFeeRes = await memberContract.newMemberFee();
          setMemberFee(parseRes(newMemberFeeRes, 2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    }

    fetchStakingData();
    fetchMemberData();
    fetchUnionData();
    fetchMarketData();

    return () => {
      isMounted = false;
    };
  });

  const onSetOriginationFee = useAutoCallback(async (amount, res) => {
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
      await memberContract.setNewMemberFee(
        new BigNumber(amount).times(WAD).toFixed()
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onAddMember = useAutoCallback(async (address) => {
    try {
      await memberContract.addMember(address);
    } catch (err) {
      console.error(err);
    }
  });

  const onSetCreditLimitModel = useAutoCallback(async (address) => {
    try {
      await memberContract.setCreditLimitModel(address);
    } catch (err) {
      console.error(err);
    }
  });

  const onSetDefaultInflation = useAutoCallback(async (amount) => {
    try {
      await unionContract.setDefaultInflationPerBlock(
        new BigNumber(amount / 100).times(WAD).toFixed()
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onSetMaxInflation = useAutoCallback(async (amount) => {
    try {
      await unionContract.setMaxInflationPerBlock(
        new BigNumber(amount / (100 * BLOCKS_PER_YEAR[chainId]))
          .times(WAD)
          .toFixed(0)
      );
    } catch (err) {
      console.error(err);
    }
  });

  const onSetMinInflation = useAutoCallback(async (amount) => {
    try {
      await unionContract.setMinInflationPerBlock(
        new BigNumber(amount / (100 * BLOCKS_PER_YEAR[chainId]))
          .times(WAD)
          .toFixed(0)
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
        <div className="flex mb-6">
          <table>
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
                <td>{minLoan}</td>
                <td>{overdueBlocks}</td>
                <td>
                  <Button disabled={!isAdmin} onClick={toggleMarketModal}>
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-5">
          <h1>Manager</h1>
        </div>
        <div className="flex mb-6">
          <table>
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
                  <div className="flex items-center">Max Inflation(%)</div>
                </th>
                <th>
                  <div className="flex items-center">Min Inflation(%)</div>
                </th>
                <th>
                  <div className="flex items-center">Default Inflation(%)</div>
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
                <td>{maxInflation}</td>
                <td>{minInflation}</td>
                <td>{defaultInflation}</td>
                <td>
                  <Button disabled={!isAdmin} onClick={toggleManagerModal}>
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="mb-5">
                    <h1>UnionToken</h1>
                </div>
                <div className="flex mb-6">

                </div>
                <div className="mb-5">
                    <h1>MemberManager</h1>
                </div>
                <div className="flex mb-6">

                </div>
                <div className="mb-5">
                    <h1>LendingMarket</h1>
                </div>
                <div className="flex mb-6">

                </div>
                <div className="mb-5">
                    <h1>CreditLimitByMedian</h1>
                </div>
                <div className="flex mb-6">
                    
                </div>
                <div className="mb-5">
                    <h1>SumOfTrust</h1>
                </div>
                <div className="flex mb-6">
                    
                </div>
                <div className="mb-5">
                    <h1>AssetManager</h1>
                </div>
                <div className="flex mb-6">
                    
                </div>
                <div className="mb-5">
                    <h1>CompoundAdapterManager</h1>
                </div>
                <div className="flex mb-6">
                    
                </div>
                <div className="mb-5">
                    <h1>MarketRegistry</h1>
                </div>
                <div className="flex mb-6">
                    
                </div>
                <div className="mb-5">
                    <h1>FixedInterestRateModel</h1>
                </div>
                <div className="flex mb-6">
                    
                </div>
                <div className="mb-5">
                    <h1>Controller</h1>
                </div>
                <div className="flex mb-6">
                    
                </div> */}
      </div>
      <MarketModal
        onSetOriginationFee={onSetOriginationFee}
        onSetDebtCeiling={onSetDebtCeiling}
        onSetMinLoan={onSetMinLoan}
        onSetOverdueBlocks={onSetOverdueBlocks}
      />
      <ManagerModal
        onSetNewMemberFee={onSetNewMemberFee}
        onSetDefaultInflation={onSetDefaultInflation}
        onSetMaxInflation={onSetMaxInflation}
        onSetMinInflation={onSetMinInflation}
        onAddMember={onAddMember}
      />
    </Fragment>
  );
}
