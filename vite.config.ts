/**
 * Vite build configuration for the Dougg UI frontend.
 * Adds the TailwindCSS plugin for Vite.
 */
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss()],
});
