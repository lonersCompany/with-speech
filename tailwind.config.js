module.exports = {
  theme: {
    fontFamily: {
      display: ["Inter"],
      body: ["Serif"]
    }
  },
  plugins: [
    function({ addBase, config }) {
      addBase({
        h1: { fontSize: config("theme.fontSize.3xl") },
        h2: { fontSize: config("theme.fontSize.2xl") },
        p: { fontSize: config("theme.fontSize.xl") }
      });
    }
  ]
};
