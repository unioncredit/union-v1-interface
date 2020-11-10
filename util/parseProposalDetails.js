const { USER_MANAGER_ADDRESSES } = require("constants/variables");

export default function parseProposalDetails(content, chainId) {
  let parsed;

  switch (content) {
    case USER_MANAGER_ADDRESSES[chainId]:
      parsed = "UserManager";
      break;

    default:
      parsed = content;
      break;
  }

  return parsed;
}
