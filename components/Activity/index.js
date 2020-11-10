import { Menu, MenuButton, MenuItems, MenuPopover } from "@reach/menu-button";
import useActivity from "hooks/data/useActivity";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import Bell from "svgs/Bell";
import MenuArrow from "svgs/MenuArrow";
import { getPosition } from "util/popover";
import ActivityContent from "./activityContent";

const Activity = () => {
  const { data } = useActivity();
  const [notifCount, notifCountSet] = useLocalStorage("notifications", 0);
  const [hasPending, hasPendingSet] = useState(false);

  const hasNotifs = data && data.length > 0;

  useEffect(() => {
    if (hasNotifs && notifCount !== data.length) {
      hasPendingSet(true);
    } else {
      hasPendingSet(false);
    }
  }, [data, notifCount]);

  const handleUpdateCount = () => {
    if (hasNotifs) {
      notifCountSet(data.length);
    }
  };

  return (
    <Menu>
      <MenuButton
        onClick={handleUpdateCount}
        className="h-8 w-8 text-type-light hover:text-type-base bg-white hover:bg-border-light transition-colors duration-150 items-center justify-center flex rounded focus:outline-none focus:shadow-outline"
      >
        <Bell pending={hasPending} />
      </MenuButton>

      <MenuPopover position={getPosition}>
        <MenuItems className="mt-4 w-80 shadow-smooth relative">
          <MenuArrow />

          <div className="p-4 border-b">
            <p className="text-lg font-semibold leading-none">Activity</p>
          </div>

          <div
            className="p-4 max-h-72 overflow-y-scroll"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <ActivityContent data={data} />
          </div>
        </MenuItems>
      </MenuPopover>
    </Menu>
  );
};

export default Activity;
