export default function getIPFSAssetLink(imageArray) {
  const { contentUrl } = imageArray[0];
  const hash = contentUrl["/"];

  return `https://ipfs.infura.io/ipfs/${hash}`;
}
