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
      colors: {
        primary: {
          "100": "#fcf7f7",
          "500": "#F4DBD8"
        },
        secondary: {
          "100": "#F6F9FC",
          "200": "#CAE0F5",
          "500": "#032437"
        },
        accent: "#F3F4F7"
      },
      maxWidth: {
        "screen-lg-gutter": "calc(1080px + 1rem * 2)",
        "screen-xl-gutter": "calc(1280px + 1rem * 2)"
      }
    }
  },
  variants: {},
  plugins: [],
  corePlugins: {
    float: false,
    container: false
  }
};
