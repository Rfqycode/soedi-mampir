import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Ini adalah palet warna kustom dari gambarmu
                barber: {
                    dark: "#405D72",   // Biru gelap (paling atas)
                    slate: "#758694",  // Abu-abu kebiruan (kedua)
                    peach: "#FEECE2",  // Krem/Peach (ketiga)
                    cream: "#FFF8F3",  // Putih tulang (paling bawah)
                },
            },
        },
    },
    plugins: [],
};
export default config;