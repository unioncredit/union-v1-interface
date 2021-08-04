import { useMemo } from "react";
import { useRouter } from "next/router";
import { Nav, NavItem } from "union-ui";

const navItems = [
  {
    id: "get-started",
    label: "Get Started",
    icon: "credit",
    pathname: "/get-started",
    active: true,
    description:
      "Get vouched for to become a member and stake your DAI to collect UNION ",
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
    pathname: "/vote",
  },
];

export const Navigation = () => {
  const router = useRouter();
  // TODO:
  const isMember = false;

  const filteredNavItems = useMemo(() => {
    if (isMember) {
      return navItems
        .slice(1)
        .map((item) => ({ item, active: item.pathname === router.pathname }));
    }
    return navItems.map((item) => ({
      ...item,
      disabled: item.id !== "get-started",
    }));
  }, []);

  return (
    <Nav>
      {filteredNavItems.map((item) => (
        <NavItem {...item} />
      ))}
    </Nav>
  );
};
