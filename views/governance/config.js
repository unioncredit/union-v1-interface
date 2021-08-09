export const config = {
  title: "Vote",
  tabItems: [
    { id: "overview", label: "Overview", href: "/governance" },
    { id: "proposals", label: "Proposals", href: "/governance/proposals" },
    {
      id: "leaderboard",
      label: "Leaderboard",
      href: "/governance/leaderboard",
    },
  ],
  proposals: {
    types: [
      { id: "live", label: "Live" },
      { id: "passed", label: "Passed" },
      { id: "failed", label: "Failed" },
      { id: "defeated", label: "Defeated" },
    ],
  },
};
