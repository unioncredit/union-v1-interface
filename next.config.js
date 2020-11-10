module.exports = {
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "https://unionfinance.gitbook.io/union-docs/",
        permanent: true,
      },
      {
        source: "/faucet",
        destination:
          "https://www.notion.so/unionfinance/Faucet-edf318353f144a61a97afa33063710d0",
        permanent: true,
      },
    ];
  },
};
