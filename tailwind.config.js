module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        jp: "0px -18px 0px rgba(16,74,174,0.6)",
        in: "0px -6px 0px rgba(255,255,255)",
      },
      fontFamily: {
        fdx: [
          "Lyon-Text",
          "Georgia",
          "YuMincho",
          "Yu Mincho",
          "Hiragino Mincho ProN",
          "Hiragino Mincho Pro",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
