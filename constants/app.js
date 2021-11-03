export const ContactsType = {
  TRUSTS_YOU: "trusts-you",
  YOU_TRUST: "you-trust",
};

export const duneAnalytics = {
  1: "#",
  137: "https://dune.xyz/asidik/Union-on-Polygon",
};

export const links = {
  twitter: "https://twitter.com/unionprotocol",
  blog: "https://medium.com/union-finance",
  website: "https://union.finance/",
  governance: "https://union.finance/governance",
  docs: "https://unionfinance.gitbook.io/docs/",
  discord: "https://discord.gg/cZagzJ3p8G",
  github: "https://github.com/unioncredit",
};

export const contextMenuItems = [
  {
    label: "Docs",
    target: "_blank",
    href: "https://unionfinance.gitbook.io/docs/",
  },
  { label: "Blog", target: "_blank", href: "https://medium.com/union-finance" },
  {
    label: "Twitter",
    target: "_blank",
    href: "https://twitter.com/unionprotocol",
  },
  { label: "Discord", target: "_blank", href: "https://discord.gg/cZagzJ3p8G" },
  { label: "Github", target: "_blank", href: "https://github.com/unioncredit" },
];

export const navItems = [
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
    id: "governance",
    label: "Governance",
    pathname: "/governance",
  },
];

export const TransactionTypes = {
  BORROW: "borrow",
  REPAY: "repay",
  REGISTER: "register",
  CANCEL: "cancel",
  TRUST: "trust",
};
