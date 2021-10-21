export const config = {
  tabItems: [
    { id: "overview", label: "Overview", href: "/governance" },
    { id: "proposals", label: "Proposals", href: "/governance/proposals" },
  ],
  proposals: {
    types: [
      { id: "active", label: "Live" },
      { id: "passed", label: "Passed" },
      { id: "failed", label: "Failed" },
      { id: "defeated", label: "Defeated" },
    ],
  },
};
