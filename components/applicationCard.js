import { useGetInvitedModalToggle } from "@contexts/Application";
import useCurrentToken from "@hooks/useCurrentToken";
import { getTrustCount } from "@lib/contracts/getTrustCount";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { useAutoEffect } from "hooks.macro";
import { useState } from "react";
import { placeholderTip } from "../text/tooltips";
import ApplicationModal from "./applicationModal";
import Button from "./button";

const ApplicationCard = () => {
  const { account, library, chainId } = useWeb3React();

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const curToken = useCurrentToken("DAI");

  const [trustCount, setTrustCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const toggleApplicationModal = () => setIsOpen(!isOpen);

  useAutoEffect(() => {
    let isMounted = true;

    const getTrustCountData = async () => {
      try {
        if (isMounted) {
          const res = await getTrustCount(account, curToken, library, chainId);

          setTrustCount(res);
        }
      } catch (err) {
        if (isMounted) console.error(err);
      }
    };

    getTrustCountData();

    return () => {
      isMounted = false;
    };
  });

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

        <Button
          className="mt-6 md:mt-0"
          onClick={
            trustCount === 3 ? toggleApplicationModal : toggleGetInvitedModal
          }
        >
          {trustCount === 3 ? "Become a member" : "Ask for a vouch"}
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

      <ApplicationModal isOpen={isOpen} onDismiss={toggleApplicationModal} />
    </div>
  );
};

export default ApplicationCard;
