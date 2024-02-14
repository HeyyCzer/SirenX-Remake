/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			animation: {
				siren: "siren 1.5s infinite steps(1)",
				siren2: "siren2 1.5s infinite steps(1)",
			}
		},
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class",
		}),
		function ({ addBase, theme }) {
			function extractColorVars(colorObj, colorGroup = "") {
				return Object.keys(colorObj).reduce((vars, colorKey) => {
					const value = colorObj[colorKey];
					const cssVariable = colorKey === "DEFAULT" ? `--color${colorGroup}` : `--color${colorGroup}-${colorKey}`;

					const newVars = typeof value === "string" ? { [cssVariable]: value } : extractColorVars(value, `${colorGroup}-${colorKey}`);

					return { ...vars, ...newVars };
				}, {});
			}

			addBase({
				":root": extractColorVars(theme("colors")),
			});
		},
	],
};
