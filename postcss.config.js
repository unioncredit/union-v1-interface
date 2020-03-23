const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.js", "./pages/**/*.js"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    "tailwindcss",
    "postcss-preset-env",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
