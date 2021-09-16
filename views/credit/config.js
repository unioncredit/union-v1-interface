import { TabLink } from "components-ui";

export const config = {
  title: "Credit",
  tabItems: [
    { id: "borrow", label: "Borrow", href: "/credit", as: TabLink },
    { id: "lend", label: "Lend", href: "/credit/lend", as: TabLink },
  ],
};
