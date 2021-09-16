import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Nav, NavItem, Box } from "union-ui";
import useIsMember from "hooks/data/useIsMember";
import { RewardsCard } from "components-ui";
import { WalletModal, useWalletModal } from "./modals";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import format from "util/formatValue";

const navItems = [
  {
    id: "get-started",
    label: "Get Started",
    icon: "get-started",
    pathname: "/get-started",
    active: true,
  },
  {
    id: "credit",
    icon: "credit",
    label: "Credit",
    pathname: "/credit",
  },
  {
    id: "contacts",
    icon: "contacts",
    label: "Contacts",
    pathname: "/contacts",
  },
  {
    id: "vote",
    icon: "vote",
    label: "Vote",
    pathname: "/governance",
  },
];

export const Navigation = ({ mobile }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const { data: isMember } = useIsMember();
  const UNION = useCurrentToken("UNION");
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { isOpen: isWalletModalOpen, open: openWalletModal } = useWalletModal();

  const filteredNavItems = useMemo(() => {
    if (isMember) {
      return navItems.slice(1).map((item) => ({
        ...item,
        active: pathname.startsWith(item.pathname),
      }));
    }
    return navItems.map((item) => ({
      ...item,
      disabled: item.id !== "get-started",
    }));
  }, [isMember, pathname]);

  return (
    <Nav mobile={mobile}>
      {filteredNavItems.map(({ label, ...item }) => (
        <Link key={item.id} href={item.pathname} passHref>
          <NavItem label={!mobile && label} {...item} />
        </Link>
      ))}
    </Nav>
  );
};
