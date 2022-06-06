import {
  Nav,
  NavItem,
  NetworkSwitcher,
  Button,
  Box,
  ContextMenu,
  NetworkButton,
} from "@unioncredit/ui";
import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { navItems } from "constants/app";
import { ContextMenuLink } from "./ContextMenuLink";
import { contextMenuItems } from "constants/app";
import { useForceConnect } from "hooks/useForceConnect";
import useIsMember from "hooks/data/useIsMember";
import { Wallet, ConnectButton, UnionWallet } from "components-ui";

const networkOptions = [
  {
    label: "Ethereum",
    type: "ethereum",
    imageSrc: "/images/ethereum-avatar.png",
    as: NetworkButton,
  },
  {
    label: "Arbitrum",
    type: "arbitrum",
    imageSrc: "/images/arbitrum-avatar.png",
    as: NetworkButton,
  },
  {
    label: "Kovan",
    type: "kovan",
    imageSrc: "/images/kovan-avatar.png",
    as: NetworkButton,
  },
];

export const Navigation = ({ mobile }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { account, library } = useWeb3React();
  const [, setForceConnect] = useForceConnect();

  const { data: isMember } = useIsMember();

  const filteredNavItems = useMemo(() => {
    if (typeof isMember !== "boolean") {
      return [];
    }

    const filteredNavItems = isMember
      ? navItems.slice(1)
      : navItems.filter((x) => ["get-started", "governance"].includes(x.id));

    return filteredNavItems.map((item) => ({
      ...item,
      active:
        item.pathname === "/"
          ? item.pathname === pathname
          : item.id === "credit"
          ? pathname.match(/\/(stake|credit)/)
          : pathname.startsWith(item.pathname),
    }));
  }, [isMember, pathname]);

  const handleLogoClick = () => {
    navigate(isMember ? "/credit" : "/");
  };

  const contextMenuItemsLink = contextMenuItems.map((item) => {
    if (item.href.startsWith("/")) {
      return { ...item, as: ContextMenuLink };
    }
    return item;
  });

  return (
    <Nav mobile={mobile} onLogoClick={handleLogoClick}>
      <Box fluid align="center" justify="space-between">
        <NetworkSwitcher options={networkOptions} />
        <Box>
          {account &&
            filteredNavItems.map(({ label, ...item }) => (
              <Link key={item.id} to={item.pathname} passHref>
                <NavItem label={!mobile && label} {...item} />
              </Link>
            ))}
        </Box>
        <Box>
          {account ? (
            <>
              <UnionWallet />
              <Wallet />
            </>
          ) : library ? (
            <ConnectButton label="Connect wallet" variant="secondary" />
          ) : (
            <Button
              label="Login"
              variant="secondary"
              onClick={() => setForceConnect(true)}
            />
          )}
          <ContextMenu position="left" items={contextMenuItemsLink} />
        </Box>
      </Box>
    </Nav>
  );
};
