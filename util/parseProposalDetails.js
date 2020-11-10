export default function parseProposalDetails(content) {
  let parsed;

  switch (content) {
    case "0x2634854c37C412C63085ACCD10fB0e64b0992357":
    case "0x9BFf08164fD83F6349c347Dc755Ea5549f88410b":
      parsed = "UserManager";
      break;

    case "0xf98bC4c21096b35EF0f7DE3f80349c39E54C12C3":
    case "0x567781ecC20da0fd0bA7ff219fBDaE0275c3Ad7f":
      parsed = "LendingMarket";
      break;

    default:
      parsed = content;
      break;
  }

  return parsed;
}
