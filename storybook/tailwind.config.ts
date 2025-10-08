import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../smartsample-nextjs/src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "../smartsample-nextjs/src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "../smartsample-nextjs/src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
