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
import UniswapModal from "./uniswapModal";

const ApplicationCard = () => {
  const { account, library, chainId } = useWeb3React();

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const curToken = useCurrentToken();

  const [trustCount, setTrustCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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

  const handleSubmitApplication = async () => {
    try {
      toggle();

      // await verifyMembership(account, curToken, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-6 mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <p className="text-lg leading-snug mb-2">Become a member of Union</p>

          <p className="text-xl font-normal">
            <strong className="font-semibold">
              {trustCount} out of 3 members
            </strong>{" "}
            vouched for you
          </p>
        </div>

        <Button onClick={handleSubmitApplication}>Submit application</Button>

        <Button
          className="mt-6 md:mt-0"
          onClick={
            trustCount === 3 ? handleSubmitApplication : toggleGetInvitedModal
          }
        >
          {trustCount === 3 ? "Submit application" : "Ask for a vouch"}
        </Button>
      </div>

      <div className="mt-6 mb-4 h-5 bg-pink-2-light rounded-full w-full md:w-1/2 relative overflow-hidden">
        <div
          className={classNames(
            "absolute bg-pink-2-pure h-full",
            `w-${trustCount >= 3 ? "full" : `${trustCount}/3`}`
          )}
        ></div>
      </div>

      <div className="mb-2">
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

      <UniswapModal isOpen={isOpen} onDismiss={toggle} />
    </div>
  );
};

export default ApplicationCard;
