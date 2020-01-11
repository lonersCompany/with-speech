module.exports = {
  theme: {
    fontFamily: {}
  },
  plugins: [
    function({ addBase, config }) {
      addBase({
        h1: { fontSize: config("theme.fontSize.6xl") },
        h2: { fontSize: config("theme.fontSize.4xl") },
        p: { fontSize: config("theme.fontSize.2xl") }
      });
    }
  ]
};
