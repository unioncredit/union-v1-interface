import { useGetInvitedModalToggle } from "contexts/Application";
import { useTrustCountData } from "hooks/swrHooks";
import classNames from "classnames";
import { useState } from "react";
import Info from "svgs/Info";
import { vouchingTip } from "../text/tooltips";
import ApplicationModal from "./applicationModal";
import Button from "./button";

const ApplicationCard = () => {
  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const [isOpen, setIsOpen] = useState(false);

  const toggleApplicationModal = () => setIsOpen(!isOpen);

  const { data: trustCount } = useTrustCountData();

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
          className={classNames("absolute bg-pink-2-pure h-full", {
            "w-full": trustCount >= 3,
            "w-2/3": trustCount === 2,
            "w-1/3": trustCount === 1,
          })}
        ></div>
      </div>

      <div className="mb-2 md:mb-0">
        <span
          className="inline-flex items-center cursor-help"
          title={vouchingTip}
        >
          <span className="underline">What is vouching?</span>{" "}
          <div className="ml-2">
            <Info />
          </div>
        </span>
      </div>

      <ApplicationModal isOpen={isOpen} onDismiss={toggleApplicationModal} />
    </div>
  );
};

export default ApplicationCard;
