export default function getIPFSAssetLink(imageArray: any) {
  return `https://ipfs.infura.io/ipfs/${
    imageArray?.original?.src?.split("ipfs://")[1]
  }`;
}
