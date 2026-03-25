/**
 * Icon Registry
 * Automatically maps /assets/icons/*.svg to a searchable object.
 */

// Vite-specific: Imports all SVGs in the folder as raw strings
const rawIcons = import.meta.glob("../assets/icons/*.svg", {
	as: "raw",
	eager: true,
});

const ICON_VAULT: Record<string, string> = {};

// Process the record to map "github.svg" to the key "github"
for (const path in rawIcons) {
	const fileName = path.split("/").pop()?.replace(".svg", "");
	if (fileName) {
		ICON_VAULT[fileName] = rawIcons[path];
	}
}

/**
 * Returns the raw SVG string for a given icon name.
 * Use this in your Factories to inject icons dynamically.
 */
export const getIcon = (name: string): string => {
	return ICON_VAULT[name] || "";
};
