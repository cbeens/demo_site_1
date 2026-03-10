declare module "*.css";
declare module "*.svg";

interface Window {
	lucide: {
		createIcons: () => void;
	};
}

// This handles the Vite environment variables specifically
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
	readonly VITE_MAPBOX_TOKEN: string;
	// add other env vars here as you create them
}
