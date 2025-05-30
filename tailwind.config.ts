import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1920px",
        xl: "1199px",
        lg: "991px",
        md: "767px",
        sm: "575px",
      },
      // colors: {
      //   primary: '#1e40af',
      // },
    },
  },
  plugins: [],
};

export default config;
