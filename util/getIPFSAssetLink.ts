import { IPFSImage } from "hooks/use3BoxPublicData";

export default function getIPFSAssetLink(imageArray: [IPFSImage]) {
  const { contentUrl } = imageArray[0];
  const hash = contentUrl["/"];

  return `https://ipfs.infura.io/ipfs/${hash}`;
}
