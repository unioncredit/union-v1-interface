import classNames from "classnames";
import useTrustCountData from "hooks/data/useTrustCountData";
import Info from "svgs/Info";
import { vouchingTip } from "../../util/tooltips";
import { useApplicationModalToggle } from "../modals/ApplicationModal/state";
import Button from "../button";
import { useGetInvitedModalToggle } from "../modals/GetInvitedModal/state";
import Tooltip from "@reach/tooltip";

const ApplicationCard = () => {
  const toggleGetInvitedModal = useGetInvitedModalToggle();
  const toggleApplicationModal = useApplicationModalToggle();

  const { data: trustCount = 0 } = useTrustCountData();

  const vouchProgressClassNames = classNames("absolute bg-pink-2-pure h-full", {
    "w-full": trustCount >= 3,
    "w-2/3": trustCount === 2,
    "w-1/3": trustCount === 1,
  });

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-6 mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="mb-6 md:mb-0">
          <p className="text-lg leading-snug mb-2">Become a member of Union</p>
          <p className="text-xl font-normal">
            <strong className="font-semibold">
              {trustCount} out of 3 members
            </strong>{" "}
            vouched for you
          </p>
        </div>

        {trustCount >= 3 ? (
          <Button onClick={toggleApplicationModal}>Become a member</Button>
        ) : (
          <Button onClick={toggleGetInvitedModal}>Ask for a vouch</Button>
        )}
      </div>

      <div className="mt-6 mb-4 h-5 bg-pink-2-light rounded-full w-full md:w-1/2 relative overflow-hidden">
        <div className={vouchProgressClassNames} />
      </div>

      <div className="mb-2 md:mb-0">
        <Tooltip label={vouchingTip}>
          <span className="inline-flex items-center cursor-help">
            <span className="underline">What is vouching?</span>{" "}
            <div className="ml-2">
              <Info />
            </div>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default ApplicationCard;
