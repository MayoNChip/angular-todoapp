/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        'pack-train': "url('../public/images/packTrain.jpg')",
      },
    },
  },
  plugins: [],
};
