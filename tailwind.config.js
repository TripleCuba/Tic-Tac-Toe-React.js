/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: { titleW: "128px" },
      height: { titleH: "128px" },
      fontFamily: {
        BRS: "BRS",
      },
    },
  },
  plugins: [],
};
