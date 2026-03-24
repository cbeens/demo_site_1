/**
 * cbeens.dev SPA Router.
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

	// 1. Load the "Parent" Page (e.g., home.html)
	await loadComponent("app", route);

	// 2. Define page-specific component loads
	const componentTasks: Promise<any>[] = [];

	if (path === "/" || path === "") {
		componentTasks.push(
			loadComponent("hero", "./src/components/home/hero.html"),
			loadComponent(
				"service-grid",
				"./src/components/shared/service_grid.html",
			),
			loadComponent(
				"testimonial",
				"./src/components/home/testimonial.html",
			),
		);
	} else if (path === "/about") {
		componentTasks.push(
			loadComponent("team", "./src/components/about/team.html"),
			loadComponent("history", "./src/components/about/history.html"),
			loadComponent("mission", "./src/components/about/mission.html"),
		);
	} else if (path === "/services") {
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

	// Always load shared components
	componentTasks.push(
		loadComponent("contact", "./src/components/shared/contact.html"),
		loadComponent("location", "./src/components/shared/location.html"),
	);

	// CRITICAL: Wait for ALL components to be in the DOM before moving to JS init
	await Promise.all(componentTasks);

	// 3. Initialize Map & Metrics
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	if (document.getElementById("map")) {
		initializeMap(token);
	}

	// Update Telemetry
	const [entry] = performance.getEntriesByType("navigation") as any;
	const display = document.getElementById("load-time-display");
	if (entry && display) {
		display.innerText = `${Math.round(entry.duration)}ms`;
	}

	// RE-SCAN DOM FOR ICONS (This hits footer, contact, and the new team/hero sections)
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
