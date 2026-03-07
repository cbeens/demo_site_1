import { loadComponent } from "./componentLoader";
import { initializeMap } from "./map";

const routes = {
	"/": "./src/pages/home.html",
	"/about": "./src/pages/about.html",
	"/services": "./src/pages/services.html",
};

export async function router() {
	const path = window.location.pathname;
	const route = routes[path] || routes["/"];

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
				"./src/components/shared/testimonial.html",
			),
		]);
	} else if (path === "/about") {
		await loadComponent("team", "./src/components/about/team.html");
		await loadComponent("history", "./src/components/about/history.html");
		await loadComponent("mission", "./src/components/about/mission.html");
	} else if (path === "/services") {
		await loadComponent(
			"service-grid",
			"./src/components/shared/service_grid.html",
		);
	}

	await loadComponent("contact", "./src/components/shared/contact.html");

	// 3. Initialize Map & Metrics AFTER sub-components are in
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	initializeMap(token);

	const [entry] = performance.getEntriesByType("navigation");
	const display = document.getElementById("load-time-display");
	if (entry && display) {
		display.innerText = `${Math.round(entry.duration)}ms`;
	}

	// 4. Final Polish
	if (window.lucide) {
		window.lucide.createIcons();
	}
	window.scrollTo(0, 0);
}

export function initRouter() {
	window.addEventListener("popstate", router);

	document.addEventListener("click", (e) => {
		const anchor = e.target.closest("a");
		if (anchor && anchor.href.startsWith(window.location.origin)) {
			e.preventDefault();
			window.history.pushState({}, "", anchor.href);
			router();
		}
	});

	router();
}
