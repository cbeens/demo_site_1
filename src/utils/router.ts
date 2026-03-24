/**
 * cbeens.dev SPA Router (Sovereign Engine Refactor).
 * Orchestrates tiered component injection, Markdown/JSON stitching,
 * and performance telemetry.
 * @module Router
 */

import fm from "front-matter";
import { loadComponent } from "./componentLoader";
import { initializeMap } from "./map";
import { stitchPage } from "./stitcher";

const routes: { [key: string]: string } = {
	"/": "./src/pages/home.html",
	"/about": "./src/pages/about.html",
	"/services": "./src/pages/services.html",
};

// Helper to fetch JSON data for the stitcher
const fetchFileData = async (path: string) => {
	const response = await fetch(`/src/data/${path}`);
	if (!response.ok) throw new Error(`Failed to fetch data: ${path}`);
	return await response.json();
};

export async function router(): Promise<void> {
	const path: string = window.location.pathname;
	const route: string = routes[path] || routes["/"];

	// 1. Load the "Parent" Page shell (The HTML structure)
	await loadComponent("app", route);

	// 2. Define page-specific component loads
	const componentTasks: Promise<any>[] = [];

	if (path === "/" || path === "" || path === "index.html") {
		try {
			// Fetch and Parse the Page-Level Markdown
			const res = await fetch("/src/pages/home.md");
			const text = await res.text();

			// front-matter uses 'attributes' for the parsed YAML
			const { attributes } = fm<any>(text);

			// Stitch and Load each component defined in home.md
			if (attributes.components && Array.isArray(attributes.components)) {
				for (const comp of attributes.components) {
					// Generate the HTML string using the Factory Map via stitchPage
					const componentHtml = await stitchPage(comp, fetchFileData);

					// Inject the generated STRING (isPath: false) into the target ID
					componentTasks.push(
						loadComponent(comp.id, componentHtml, false),
					);
				}
			}
		} catch (error) {
			console.error("Sovereign Engine Error (Home):", error);
		}
	} else if (path === "/about") {
		// Keep About as-is for now (Manual paths) until we migrate about.md
		componentTasks.push(
			loadComponent("team", "./src/components/about/team.html"),
			loadComponent("history", "./src/components/about/history.html"),
			loadComponent("mission", "./src/components/about/mission.html"),
		);
	} else if (path === "/services") {
		// Keep Services as-is for now (Manual paths) until we migrate services.md
		componentTasks.push(
			loadComponent(
				"services",
				"./src/components/services/services.html",
			),
			loadComponent(
				"comparisons",
				"./src/components/services/comparisons.html",
			),
			loadComponent("process", "./src/components/services/process.html"),
			loadComponent(
				"service-list",
				"./src/components/services/service_list.html",
			),
			loadComponent(
				"highlights",
				"./src/components/services/highlights.html",
			),
		);
	}

	// Always load shared components (These are now factory-ready)
	componentTasks.push(
		loadComponent("contact", "./src/components/shared/contact.html"),
		loadComponent("location", "./src/components/shared/location.html"),
	);

	// CRITICAL: Wait for ALL components to be in the DOM before moving to JS init
	await Promise.all(componentTasks);

	// 3. Initialize Map & Metrics (Preserved 100%)
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	if (document.getElementById("map")) {
		initializeMap(token);
	}

	// Update Telemetry (Preserved 100%)
	const [entry] = performance.getEntriesByType("navigation") as any;
	const display = document.getElementById("load-time-display");
	if (entry && display) {
		display.innerText = `${Math.round(entry.duration)}ms`;
	}

	// RE-SCAN DOM FOR ICONS
	if (window.lucide) {
		window.lucide.createIcons();
	}

	window.scrollTo(0, 0);
	document.dispatchEvent(new CustomEvent("page-loaded"));
}

export async function initRouter(): Promise<void> {
	window.addEventListener("popstate", router);

	document.addEventListener("click", (e) => {
		const anchor = (e.target as HTMLElement)?.closest("a");
		if (anchor && anchor.href.startsWith(window.location.origin)) {
			e.preventDefault();
			window.history.pushState({}, "", anchor.href);
			router();
		}
	});

	router();
}
