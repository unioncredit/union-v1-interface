import { ContactsType } from "constants/app";

export const config = {
  tabItems: [
    {
      id: ContactsType.YOU_TRUST,
      label: "You trust",
      href: "/contacts",
    },
    {
      id: ContactsType.TRUSTS_YOU,
      label: "Trusts you",
      href: "/contacts/trusts-you",
    },
  ],
};
