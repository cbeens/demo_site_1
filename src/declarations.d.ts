declare module "*.css";
declare module "*.svg";
declare module "*.png";

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
	readonly VITE_CLIENT_ID: string;
}
