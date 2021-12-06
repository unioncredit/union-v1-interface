export const DEFAULT_CHAIN_ID = 137;

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
  TRUSTED: "trusted",
};

export const APPROVE_DAI_DEPOSIT_SIGNATURE_KEY = "approve-dai";
export const APPROVE_DAI_REPAY_SIGNATURE_KEY = "approve-dai-repay";
export const APPROVE_UNION_REGISTER_SIGNATURE_KEY = "approve-union";

export const PermitType = {
  DAI: "dai",
  ERC2612: "erc2612",
};

export const ApprovalTypes = {
  SIGNATURE: "signature",
  TRANSACTION: "transaction",
};
