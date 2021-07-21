export default function parseProposalDetails(content) {
  let parsed;

  switch (content) {
    case "0x2634854c37C412C63085ACCD10fB0e64b0992357":
    case "0x485c6a9e364008458853AF0160960C34aC05bebE":
      parsed = "UserManager";
      break;

    case "0x439923A9B60C90B7C11a12bBB8A4e9D7DbD315cB":
    case "0x567781ecC20da0fd0bA7ff219fBDaE0275c3Ad7f":
      parsed = "UToken";
      break;

    case "0x5f39644341fed87bcF551b2C09d63a9990de338b":
      parsed = "FixedInterestRate";
      break;

    default:
      parsed = content;
      break;
  }

  return parsed;
}
