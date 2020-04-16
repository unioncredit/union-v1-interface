import { TOKENS } from "@constants/";
import { useGetInvitedModalToggle } from "@contexts/Application";
import useCurrentToken from "@hooks/useCurrentToken";
import { getTrustCount } from "@lib/contracts/getTrustCount";
import { verifyMembership } from "@lib/contracts/verifyMembership";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { placeholderTip } from "../text/tooltips";
import Button from "./button";

const ApplicationCard = () => {
  const { account, library, chainId } = useWeb3React();

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const curToken = useCurrentToken();

  const [trustCount, setTrustCount] = useState(0);

  useEffect(() => {
    const getTrustCountData = async () => {
      try {
        const res = await getTrustCount(
          account,
          TOKENS[chainId]["DAI"],
          library,
          chainId
        );

        setTrustCount(res);
      } catch (err) {
        console.error(err);
      }
    };

    if (library && account) getTrustCountData();
  }, [library, account, chainId]);

  const onVerifyMembership = async () => {
    try {
      await verifyMembership(account, curToken, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-4 md:p-6 mb-10">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg leading-snug mb-2">Become a member of Union</p>
          <p className="text-xl font-normal">
            <strong className="font-semibold">
              {trustCount} out of 3 members
            </strong>{" "}
            vouched for you
          </p>
        </div>
        <Button
          onClick={
            trustCount === 3 ? onVerifyMembership : toggleGetInvitedModal
          }
        >
          {trustCount === 3
            ? "Verify Membership"
            : "Ask someone to vouch for you"}
        </Button>
      </div>

      <div className="my-6 h-5 bg-pink-2-light rounded-full w-1/2 relative overflow-hidden">
        <div
          className={classNames(
            "absolute bg-pink-2-pure h-full",
            `w-${trustCount}/3`
          )}
        ></div>
      </div>

      <div>
        <span className="cursor-help" title={placeholderTip}>
          <span className="underline">What is vouching?</span>{" "}
          <span
            className="text-sm leading-none"
            role="img"
            aria-label="Information"
          >
            ℹ️
          </span>
        </span>
      </div>
    </div>
  );
};

export default ApplicationCard;
