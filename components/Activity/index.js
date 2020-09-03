import { Menu, MenuButton, MenuItems, MenuPopover } from "@reach/menu-button";
import { getCollisions } from "@reach/popover";
import { useWeb3React } from "@web3-react/core";
import useActivity from "hooks/useActivity";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Pending } from "svgs/Alerts";
import Bell from "svgs/Bell";
import BellCircle from "svgs/BellCircle";
import Spinner from "svgs/Spinner";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";
import Identicon from "../identicon";
import MenuArrow from "svgs/MenuArrow";

/**
 * @name getTopPosition
 *
 * @param {import("@reach/rect").PRect} targetRect
 * @param {import("@reach/rect").PRect} popoverRect
 */
function getTopPosition(targetRect, popoverRect) {
  const { directionUp } = getCollisions(targetRect, popoverRect);
  return {
    top: directionUp
      ? `${targetRect.top - popoverRect.height + window.pageYOffset}px`
      : `${targetRect.top + targetRect.height + window.pageYOffset}px`,
  };
}

/**
 * @name getPosition
 *
 * @param {import("@reach/rect").PRect} targetRect
 * @param {import("@reach/rect").PRect} popoverRect
 */
function getPosition(targetRect, popoverRect) {
  if (!targetRect || !popoverRect) {
    return {};
  }

  return {
    left: targetRect.left - popoverRect.width / 2 + 16 + window.pageXOffset,
    ...getTopPosition(targetRect, popoverRect),
  };
}

const NewTrustAdded = ({ borrower, trustAmount, hash, date }) => {
  const { chainId } = useWeb3React();

  return (
    <li className="text-sm pt-4">
      <div className="flex space-x-4">
        <div>
          <Identicon address={borrower} large />
        </div>
        <div>
          <p className="whitespace-normal leading-snug crop-snug mb-2">
            <strong>{truncateAddress(borrower)}</strong> now trusts you with{" "}
            <strong>{trustAmount} DAI</strong>
          </p>
          <div className="flex justify-between leading-none text-type-light space-x-2">
            <p>
              <a
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
                href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              >
                See details
              </a>
            </p>
            <p className="text-right">{date}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const BecameMember = ({ date }) => {
  return (
    <li className="text-sm pt-4">
      <div className="flex space-x-4">
        <div>
          <Pending size={32} />
        </div>
        <div>
          <p className="whitespace-normal leading-snug crop-snug mb-2">
            <strong>Congratulations</strong> you are now a member of Union.
          </p>
          <div className="flex justify-between leading-none text-type-light space-x-2">
            <span />
            <p className="text-right">{date}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const Activity = () => {
  const { data } = useActivity();
  const [count, setCount] = useLocalStorage("notifications", 0);
  const [hasPending, setHasPending] = useState(false);

  useEffect(() => {
    if (data && data.length && count !== data.length) {
      setHasPending(true);
    } else {
      setHasPending(false);
    }
  }, [data, count]);

  const handleUpdateNotifications = () => {
    if (data && data.length) {
      setCount(data.length);
    }
  };

  return (
    <Menu>
      <MenuButton
        onClick={handleUpdateNotifications}
        className="h-8 w-8 bg-white hover:bg-border-light transition-colors duration-150 items-center justify-center flex rounded focus:outline-none focus:shadow-outline"
      >
        <Bell pending={hasPending} />
      </MenuButton>

      <MenuPopover position={getPosition}>
        <MenuItems className="mt-4 w-80 shadow-smooth relative">
          <MenuArrow />
          <div className="p-4 border-b">
            <p className="text-lg font-semibold leading-none">Activity</p>
          </div>
          <div className="p-4">
            {data ? (
              data.length > 0 ? (
                <ul className="divide-y space-y-4 -mt-4">
                  {data.map((log, i) => {
                    if (log.type === "UpdateTrust")
                      return <NewTrustAdded key={i} {...log} />;

                    if (log.type === "ApplyMember")
                      return <BecameMember key={i} {...log} />;

                    return (
                      <li key={i}>
                        <pre>
                          <code>{JSON.stringify(log, null, 2)}</code>
                        </pre>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="pt-6 pb-4  flex flex-col items-center">
                  <BellCircle />
                  <p className="mt-4 text-center">
                    You don't have
                    <br />
                    any notifications yet
                  </p>
                </div>
              )
            ) : (
              <div className="flex p-4  items-center justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </MenuItems>
      </MenuPopover>
    </Menu>
  );
};

export default Activity;
