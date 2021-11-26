export default function truncateName(name) {
  if (name?.length >= 18) {
    return `${name.slice(0, 6)}...${name.slice(-6)}`;
  }

  return name;
}
