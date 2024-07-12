import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1250px",
      },
      scrollbar: ["rounded"],
    },
  },
  plugins: [
    // @ts-ignore
    function ({ addUtilities }) {
      addUtilities(
        {
          ".no-scrollbar": {
            /* Hide scrollbar for IE, Edge and Firefox */
            "-ms-overflow-style": "none" /* IE and Edge */,
            "scrollbar-width": "none" /* Firefox */,
          },
          ".no-scrollbar::-webkit-scrollbar": {
            display: "none" /* Safari and Chrome */,
          },
        },
        ["responsive"]
      );
    },
  ],
};
export default config;
