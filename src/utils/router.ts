/**
 * The Sovereign SPA Router.
 * Orchestrates tiered component injection and performance telemetry.
 * @module Router
 */

import { loadComponent } from "./componentLoader";
import { initializeMap } from "./map";

const routes: { [key: string]: string } = {
	"/": "./src/pages/home.html",
	"/about": "./src/pages/about.html",
	"/services": "./src/pages/services.html",
};

export async function router(): Promise<void> {
	const path: string = window.location.pathname;
	const route: string = routes[path] || routes["/"];

	// 1. Load the "Parent" Page first (home.html)
	await loadComponent("app", route);

	// 2. Load "Sub-Components" for specific pages
	if (path === "/" || path === "") {
		await Promise.all([
			loadComponent("hero", "./src/components/home/hero.html"),
			loadComponent(
				"service-grid",
				"./src/components/shared/service_grid.html",
			),
			loadComponent(
				"testimonial",
				"./src/components/home/testimonial.html",
			),
		]);
	} else if (path === "/about") {
		await Promise.all([
			loadComponent("team", "./src/components/about/team.html"),
			loadComponent("history", "./src/components/about/history.html"),
			loadComponent("mission", "./src/components/about/mission.html"),
		]);
	} else if (path === "/services") {
		await Promise.all([
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
		]);
	}

	// Load shared components (Contact & Location) for all pages
	await Promise.all([
		loadComponent("contact", "./src/components/shared/contact.html"),
		loadComponent("location", "./src/components/shared/location.html"),
	]);

	// 3. Initialize Map & Metrics AFTER sub-components are in
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	initializeMap(token);

	const [entry] = performance.getEntriesByType("navigation");
	const display = document.getElementById("load-time-display");
	if (entry && display) {
		display.innerText = `${Math.round(entry.duration)}ms`;
	}

	window.lucide?.createIcons();
	window.scrollTo(0, 0);
}

export function initRouter(): void {
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
