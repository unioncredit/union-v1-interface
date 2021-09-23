export const ContactsType = {
  TRUSTS_YOU: "trusts-you",
  YOU_TRUST: "you-trust",
};

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
