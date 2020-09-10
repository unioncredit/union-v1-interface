module.exports = {
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "https://unionfinance.gitbook.io/union-docs/",
        permanent: true,
      },
    ];
  },
};
