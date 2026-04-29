module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        germania: ["Germania One", "cursive"],
        merriweather: ["Merriweather", "serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        "davinci-black": "#1F2937",
        "davinci-black-deep": "#111827",
        "davinci-red": "#A80000",
        "davinci-red-light": "#C94040",
        "davinci-red-dark": "#540000",
        "davinci-gray-50": "#FAFBFC",
        "davinci-gray-100": "#F4F6F8",
        "davinci-gray-200": "#EDF0F4",
        "davinci-gray-300": "#DDE3EB",
        "davinci-gray-500": "#9AA5B4",
        "davinci-gray-600": "#6B7A8D",
        "davinci-gray-700": "#4A5568",
        "light-brown": "#F7D8B9",
        "dark-brown": "#614222",
      },
    },
  },
  plugins: [],
};
