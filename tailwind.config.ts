import type { Config } from "tailwindcss";

const config: Config = {
  // Kita harus mendefinisikan 'content' agar Tailwind tahu
  // di mana harus memindai (scan) class yang kita gunakan.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  

  plugins: [
    // Ini adalah cara yang BENAR untuk mendaftarkan plugin JavaScript
    require("@tailwindcss/typography"),
  ],
};
export default config;