import Link from "next/link";
import { useMemo } from "react";
import { Nav, NavItem } from "union-ui";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";

import { navItems } from "constants/app";
import useIsMember from "hooks/data/useIsMember";

export const Navigation = ({ mobile }) => {
  const router = useRouter();
  const { account } = useWeb3React();

  const pathname = router.pathname;

  const { data: isMember } = useIsMember();

  const filteredNavItems = useMemo(() => {
    if (typeof isMember !== "boolean") {
      return [];
    }

    if (isMember) {
      return navItems.slice(1).map((item) => ({
        ...item,
        active:
          item.id === "credit"
            ? pathname.match(/\/(stake|credit)/)
            : item.id === "profile"
            ? account === router.query.address
            : pathname.startsWith(item.pathname),
        pathname: item.id === "profile" ? `/profile/${account}` : item.pathname,
      }));
    }

    return navItems.filter((x) => ["get-started", "governance"].includes(x.id));
  }, [isMember, pathname]);

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Nav mobile={mobile} onLogoClick={handleLogoClick}>
      {account &&
        filteredNavItems.map(({ label, ...item }) => (
          <Link key={item.id} href={item.pathname} passHref>
            <NavItem label={!mobile && label} {...item} />
          </Link>
        ))}
    </Nav>
  );
};
