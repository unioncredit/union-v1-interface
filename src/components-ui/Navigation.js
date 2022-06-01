import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Nav, NavItem } from "@unioncredit/ui";
import { useWeb3React } from "@web3-react/core";

import { navItems } from "constants/app";
import useIsMember from "hooks/data/useIsMember";

export const Navigation = ({ mobile }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { account } = useWeb3React();

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
      pathname: item.id === "profile" ? `/profile/${account}` : item.pathname,
    }));
  }, [isMember, pathname]);

  const handleLogoClick = () => {
    navigate(isMember ? "/credit" : "/");
  };

  return (
    <Nav mobile={mobile} onLogoClick={handleLogoClick}>
      {account &&
        filteredNavItems.map(({ label, ...item }) => (
          <Link key={item.id} to={item.pathname} passHref>
            <NavItem label={!mobile && label} {...item} />
          </Link>
        ))}
    </Nav>
  );
};
