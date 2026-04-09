/**
 * Global module declarations used by the Vite application.
 * Includes CSS/SVG/PNG imports and window/env augmentation.
 */
declare module "*.css";
declare module "*.svg";
declare module "*.png";

interface Window {
	lucide: {
		createIcons: () => void;
	};
}

/**
 * Augmented ImportMeta exposed by Vite.
 */
interface ImportMeta {
	readonly env: ImportMetaEnv;
	readonly glob: (
		pattern: string,
		options?: { as: string; eager: boolean },
	) => Record<string, any>;
}

interface ImportMetaEnv {
	readonly VITE_API_URL: any;
	readonly VITE_MAPBOX_TOKEN: string;
	readonly VITE_CLIENT_ID: string;
}
