import SegmentedControl from "components/segmentedControl";
import { useState } from "react";
import Button from "components/button";

export const Solo = ({ hasButton = false, onClick }) => (
  <div className="rounded bg-white w-full h-full flex-1 flex flex-col border">
    <div className="px-6 pb-6 pt-20 relative">
      <p className="text-2xl font-semibold leading-tight">Solo</p>
      <div className="absolute bottom-0 right-0 mr-4 md:mr-8">
        <img src="/images/solo.svg" alt="Solo" />
      </div>
    </div>

    <div className="divider"></div>

    <div className="px-6 pt-8 leading-snug font-normal flex-1">
      <p className="mb-2">
        <strong>Stake</strong>
      </p>
      <p>
        Staking with <strong>0.9x reward</strong> multiplier
      </p>
      <div className="divider my-4"></div>
    </div>

    {hasButton && (
      <div className="px-6 pb-6 mt-8">
        <Button onClick={onClick} invert full>
          Start staking
        </Button>
      </div>
    )}
  </div>
);

export const Together = ({ hasButton = false, onClick }) => (
  <div className="rounded bg-white w-full h-full flex-1 flex flex-col border">
    <div className="px-6 pb-6 pt-20 relative">
      <p className="text-2xl font-semibold leading-tight">Together</p>
      <div className="absolute bottom-0 right-0 mr-4 md:mr-8">
        <img src="/images/together.svg" alt="Solo" />
      </div>
    </div>

    <div className="divider"></div>

    <div className="px-6 pt-8 leading-snug font-normal flex-1">
      <p className="mb-2">
        <strong>Stake</strong>
      </p>
      <p>
        Staking with <strong>1x reward multiplier</strong> +{" "}
        <strong>additional percentage</strong> from utlizied stake
      </p>
      <div className="divider my-4" />
      <p className="mb-2">
        <strong>Borrow</strong>
      </p>
      <p>
        Borrrow with <strong>no collateral</strong> from people who vouched for
        you
      </p>
      <div className="divider my-4" />
      <p className="mb-2">
        <strong>Vouch</strong>
      </p>
      <p>Vouch from other people and have them borrow from you pool.</p>
    </div>

    {hasButton && (
      <div className="px-6 pb-6 mt-8">
        <Button onClick={onClick} full>
          Get invited
        </Button>
      </div>
    )}
  </div>
);

const TABS = {
  SOLO: "Solo",
  TOGETHER: "Together",
};

const Benefits = ({ defaultTab = "TOGETHER" }) => {
  const [tab, setTab] = useState(TABS[defaultTab]);

  return (
    <div className="w-full md:max-w-sm">
      <SegmentedControl.Wrapper className="mb-4">
        <SegmentedControl.Button
          onClick={() => setTab(TABS.SOLO)}
          active={tab === TABS.SOLO}
          label="Solo"
        />
        <SegmentedControl.Button
          onClick={() => setTab(TABS.TOGETHER)}
          active={tab === TABS.TOGETHER}
          label="Together"
        />
      </SegmentedControl.Wrapper>

      <div className="flex flex-col" style={{ minHeight: 504 }}>
        {tab === TABS.TOGETHER ? <Together /> : <Solo />}
      </div>
    </div>
  );
};

export default Benefits;
