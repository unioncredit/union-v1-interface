import Tooltip from "@reach/tooltip";
import useTrustCountData from "hooks/useTrustCountData";
import Check from "svgs/Check";
import Info from "svgs/Info";
import { vouchingTip } from "../../text/tooltips";
import { useApplicationModalToggle } from "../ApplicationModal/state";
import Button from "../button";
import { useGetInvitedModalToggle } from "../GetInvitedModal/state";
import Chevron from "svgs/Chevron";
import { useState } from "react";
import useVouchData from "hooks/useVouchData";
import Address from "../address";
import pastels from "lib/pastels";

const Step = {
  Complete: () => (
    <div className="h-6 w-6 z-10 rounded-full bg-healthy shadow-healthy border-2 border-healthy flex items-center justify-center">
      <Check size={16} />
    </div>
  ),
  Pending: () => (
    <div className="h-6 w-6 flex justify-center items-center relative z-10">
      <div className="animate-ping-slow absolute inline-flex h-5 w-5 rounded-full bg-healthy bg-opacity-75" />
      <div className="relative inline-flex rounded-full h-6 w-6 bg-on-dark border-2 border-healthy" />
    </div>
  ),
  PendingAlt: () => (
    <div className="h-6 w-6 flex justify-center items-center relative z-10">
      <div className="animate-ping-slow absolute inline-flex h-5 w-5 rounded-full bg-white" />
      <div className="relative inline-flex rounded-full h-6 w-6 bg-white" />
      <div className="absolute inline-flex rounded-full h-3 w-3 bg-healthy" />
    </div>
  ),
  PendingAlt2: () => (
    <div className="h-6 w-6 flex justify-center items-center relative z-10">
      <div className="relative inline-flex rounded-full h-6 w-6 bg-on-dark" />
      <div className="absolute inline-flex rounded-full h-3 w-3 bg-healthy" />
    </div>
  ),
  Incomplete: () => (
    <div className="h-6 w-6 z-10 rounded-full bg-on-dark border-2 border-transparent" />
  ),
};

const Bar = {
  Complete: () => <div className="flex-1 h-1 bg-healthy shadow-healthy" />,
  Incomplete: () => <div className="flex-1 h-1 bg-on-dark" />,
};

/**
 *
 * @param {object} props
 * @param {number} props.count
 */
const StepperBar = ({ count }) => {
  if (count >= 3)
    return (
      <div className="flex items-center -space-x-px">
        <Step.Complete />
        <Bar.Complete />
        <Step.Complete />
        <Bar.Complete />
        <Step.Complete />
      </div>
    );

  if (count === 2)
    return (
      <div className="flex items-center -space-x-px">
        <Step.Complete />
        <Bar.Complete />
        <Step.Complete />
        <Bar.Complete />
        <Step.Pending />
      </div>
    );

  if (count === 1)
    return (
      <div className="flex items-center -space-x-px">
        <Step.Complete />
        <Bar.Complete />
        <Step.Pending />
        <Bar.Incomplete />
        <Step.Incomplete />
      </div>
    );

  return (
    <div className="flex items-center -space-x-px">
      <Step.Pending />
      <Bar.Incomplete />
      <Step.Incomplete />
      <Bar.Incomplete />
      <Step.Incomplete />
    </div>
  );
};

const ApplicationCard = () => {
  const toggleGetInvitedModal = useGetInvitedModalToggle();
  const toggleApplicationModal = useApplicationModalToggle();

  const { data: trustCount = 0 } = useTrustCountData();

  const [isOpen, isOpenSet] = useState(false);
  const toggle = () => isOpenSet(!isOpen);

  const { data: vouchData } = useVouchData();

  return (
    <div
      className="top-0 left-0 bottom-0 right-0 flex items-start justify-center absolute z-10"
      style={{
        backdropFilter: "blur(3px)",
        background: "hsla(0, 0%, 100%, 0.66)",
      }}
    >
      <div
        className="bg-black-pure border shadow-2xl border-black-pure rounded-md p-6 max-w-md w-full"
        style={{ marginTop: "12vh" }}
      >
        <div className="space-y-12 text-white text-center mt-6">
          <div>
            <p className="text-xl leading-snug crop-snug mb-6">
              Become a member of Union
            </p>

            <p className="text-2xl leading-snug crop-snug">
              <strong className="font-semibold">
                {trustCount} out of 3 members
              </strong>{" "}
              <br />
              vouched for you
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <StepperBar count={trustCount} />
          </div>

          <div>
            <p className="text-lg text-left font-semibold mb-6">
              <Tooltip label={vouchingTip}>
                <span className="inline-flex items-center cursor-help">
                  <span>Vouched for you</span>{" "}
                  <div className="ml-2">
                    <Info light />
                  </div>
                </span>
              </Tooltip>
            </p>

            <ul>
              {vouchData?.map((vouch, i) => (
                <li key={i} className="flex items-center justify-between">
                  <Address address={vouch.address} />
                  <div
                    className="px-2 py-2 rounded-md"
                    style={{ backgroundColor: pastels[i] }}
                  >
                    <p className="leading-tight mt-px text-type-base crop-tight font-semibold">
                      {vouch.vouched} DAI
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-6" hidden>
              <button
                onClick={toggle}
                className="inline-flex focus:outline-none items-center cursor-help"
              >
                <span className="underline">What is vouching?</span>{" "}
                <div className="ml-1">
                  {isOpen ? (
                    <Chevron.Down size={20} />
                  ) : (
                    <Chevron.Right size={20} />
                  )}
                </div>
              </button>

              {isOpen && (
                <p className="text-center text-white text-opacity-75 mt-4 max-w-xs mx-auto">
                  Vouching for someone is similar to cosigning, you are
                  signalling to Union that they can be trusted to borrow and
                  repay. Only Union members are able to vouch.
                </p>
              )}
            </div>

            <div>
              {trustCount >= 3 ? (
                <Button full onClick={toggleApplicationModal}>
                  Become a member
                </Button>
              ) : (
                <Button tertiary full onClick={toggleGetInvitedModal}>
                  Ask for a vouch
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
