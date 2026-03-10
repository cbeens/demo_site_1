/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.html", // This tells Tailwind to watch your component files!
	],
	theme: {
		extend: {
			colors: {
				"brand-primary": "#7844b3",
				"brand-secondary": "#99b344",
			},
			fontFamily: {
				heading: ["Space Grotesk", "sans-serif"],
				body: ["Hanken Grotesk", "Inter", "sans-serif"],
				mono: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
			},
		},
	},
	plugins: [],
};
