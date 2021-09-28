import { ContactsType } from "constants/app";

export const config = {
  title: "Contacts",
  toggleItems: [
    { id: ContactsType.TRUSTS_YOU, label: "Trusts you" },
    {
      id: ContactsType.YOU_TRUST,
      label: "You trust",
    },
  ],
};
