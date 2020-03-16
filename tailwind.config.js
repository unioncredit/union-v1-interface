module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1080px",
      xl: "1280px"
    },
    fontFamily: {
      sans: [
        "Montserrat",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    },
    extend: {
      maxWidth: {
        "screen-lg-gutter": "calc(1080px + 1rem * 2)",
        "screen-xl-gutter": "calc(1280px + 1rem * 2)"
      }
    }
  },
  variants: {},
  plugins: []
};
