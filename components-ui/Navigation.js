import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Nav, NavItem, Box } from "union-ui";
import useIsMember from "hooks/data/useIsMember";
import { useWeb3React } from "@web3-react/core";

const navItems = [
  {
    id: "get-started",
    label: "Get Started",
    pathname: "/get-started",
    active: true,
  },
  {
    id: "credit",
    label: "Credit",
    pathname: "/credit",
  },
  {
    id: "contacts",
    label: "Contacts",
    pathname: "/contacts",
  },
  {
    id: "profile",
    label: "Profile",
    pathname: "/profile",
  },
  {
    id: "vote",
    label: "Vote",
    pathname: "/governance",
  },
];

export const Navigation = ({ mobile }) => {
  const router = useRouter();
  const { account } = useWeb3React();

  const pathname = router.pathname;

  const { data: isMember } = useIsMember();

  const filteredNavItems = useMemo(() => {
    if (isMember) {
      return navItems.slice(1).map((item) => ({
        ...item,
        active: pathname.startsWith(item.pathname),
        pathname: item.id === "profile" ? `/profile/${account}` : item.pathname,
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
