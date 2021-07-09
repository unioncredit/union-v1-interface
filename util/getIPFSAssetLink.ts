export default function getIPFSAssetLink(image: any) {
  return `https://ipfs.infura.io/ipfs/${
    image?.original?.src?.split("ipfs://")[1]
  }`;
}
