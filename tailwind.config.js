const defaultColors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            ...defaultColors,
            darkPrimary: "#827ebe",
            darkSecondary: "#1e1f0f",
            darkAccent: "#5954a6",
            darkText: "#f8f8f1",
            darkBg: "#0d0e07",

            lightPrimary: "#618afa",
            lightSecondary: "#eff0e0",
            lightAccent: "#5e59ab",
            lightText: "#0e0e07",
            lightBg: "#EDFBFB",
        },
    },
    plugins: [],
};
