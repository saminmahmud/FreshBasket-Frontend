/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				green: {
					950: "#0d1f14",
					900: "#1a3d28",
					800: "#1a4731",
					700: "#2d6a4f",
					500: "#52b788",
					400: "#74c69d",
				},
				orange: {
					500: "#f4801a",
					600: "#d46a0e",
				},
				cream: "#faf7f2",
			},
			fontFamily: {
				sans: ["DM Sans", "sans-serif"],
				serif: ["DM Serif Display", "serif"],
			},
			keyframes: {
				fadeUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideIn: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				},
				pulseDot: {
					"0%,100%": { transform: "scale(1)", opacity: "1" },
					"50%": { transform: "scale(1.4)", opacity: "0.6" },
				},
			},
			animation: {
				"fade-up": "fadeUp 0.6s ease both",
				"slide-in": "slideIn 0.3s cubic-bezier(0.4,0,0.2,1)",
				"pulse-dot": "pulseDot 1.8s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
