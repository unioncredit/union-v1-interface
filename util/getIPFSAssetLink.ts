export default function getIPFSAssetLink(image: Object) {
  return `https://ipfs.infura.io/ipfs/${
    image?.original?.src?.split("ipfs://")[1]
  }`;
}
