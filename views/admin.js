import Button from "components/button";
import ManagerModal from "components/managerModal";
import MarketModal from "components/marketModal";
import { BLOCKS_PER_YEAR } from "constants/variables";
import { useManagerModalToggle, useMarketModalToggle } from "contexts/Admin";
import { formatUnits } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import useIsAdmin from "hooks/useIsAdmin";
import useAssetContract from "hooks/useAssetContract";
import useCompoundContract from "hooks/useCompoundContract";
import useMarketContract from "hooks/useMarketContract";
import useMemberContract from "hooks/useMemberContract";
import useStakingContract from "hooks/useStakingContract";
import useUnionContract from "hooks/useUnionContract";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js/bignumber.mjs";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import { Fragment, useState } from "react";
import ABI from "constants/abis/IInterestRateModel.json";
import getContract from "util/getContract";

const parseRes = (res, decimals = 2) =>
  Number(formatUnits(res, 18)).toFixed(decimals);

const WAD = 1e18;

export default function AdminView() {
  const { account, library, chainId } = useWeb3React();

  const toggleMarketModal = useMarketModalToggle();
  const toggleManagerModal = useManagerModalToggle();

  const curToken = useCurrentToken();
  const isAdmin = useIsAdmin();
  const assetContract = useAssetContract();
  const compoundContract = useCompoundContract();
  const stakingContract = useStakingContract();
  const memberContract = useMemberContract();
  const unionContract = useUnionContract();
  const marketContractPromise = useMarketContract(curToken);

  let marketContract, interestRateContract;

  const [totalStake, setTotalStake] = useState(0);
  const [frozenStake, setFrozenStake] = useState(0);
  const [memberFee, setMemberFee] = useState(0);
  const [overdueBlocks, setOverdueBlocks] = useState(0);
  const [originationFee, setOriginationFee] = useState(0);
  const [totalBorrows, setTotalBorrows] = useState(0);
  const [debtCeiling, setDebtCeiling] = useState(0);
  const [minLoan, setMinLoan] = useState(0);
  const [apr, setApr] = useState(0);
  const [lendingPoolBalance, setLendingPoolBalance] = useState(0);
  const [compoundBalance, setCompoundBalance] = useState(0);

  useAutoEffect(() => {
    let isMounted = true;

    function fetchMarketData() {
      marketContractPromise.then(async (res) => {
        marketContract = res;
        try {
          if (isMounted) {
            const interestRateAddress = await marketContract.interestRateModel();
            interestRateContract = getContract(
              interestRateAddress,
              ABI,
              library.getSigner()
            );
            const overdueBlocksRes = await marketContract.overdueBlocks();
            const originationFeeRes = await marketContract.originationFee();
            const totalBorrowsRes = await marketContract.totalBorrows();
            const debtCeilingRes = await marketContract.debtCeiling();
            const minLoanRes = await marketContract.minLoan();
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
          }
        } catch (err) {
          if (isMounted) {
            console.error(err);
          }
        }
      });
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
                  <div className="flex items-center">Borrow Apr(%)</div>
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
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalStake}</td>
                <td>{frozenStake}</td>
                <td>{memberFee}</td>
                <td>
                  <Button disabled={!isAdmin} onClick={toggleManagerModal}>
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-5">
          <h1>Funds</h1>
        </div>
        <div className="flex mb-6">
          <table>
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
