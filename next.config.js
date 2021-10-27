const withSvgr = require("next-svgr");

module.exports = withSvgr({
  images: {
    domains: ["ipfs.infura.io"],
  },
});
