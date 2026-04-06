/**
 * cbeens.dev SPA Router - Restored & Optimized
 */
import fm from "front-matter";
import { loadComponent } from "./componentLoader";
import { initializeMap } from "../utils/map";
import { stitchPage } from "./stitcher";
import { renderNav, renderFooter, renderErrorPage } from "./factory";

const routes: { [key: string]: string } = {
	"/": "./src/pages/home/home.html",
	"/index.html": "./src/pages/home/home.html",
	"/about": "./src/pages/about/about.html",
	"/services": "./src/pages/services/services.html",
};

const mdMap: { [key: string]: string } = {
	"/": "/src/pages/home/home.md",
	"/index.html": "/src/pages/home/home.md",
	"/about": "/src/pages/about/about.md",
	"/services": "/src/pages/services/services.md",
};

const fetchFileData = async (path: string) => {
	const response = await fetch(`/src/data/${path}`);
	if (!response.ok) throw new Error(`Failed to fetch data: ${path}`);
	return await response.json();
};

export async function router(): Promise<void> {
	const path: string = window.location.pathname;
	const route: string = routes[path];

	// 1. GLOBAL SHELL INJECTION (NAV/FOOTER)
	// We do this first so the site frame is never broken
	const navShell = document.getElementById("nav");
	const footerShell = document.getElementById("footer");

	if (navShell && navShell.children.length === 0) {
		const navData = await fetchFileData("nav.json");
		navShell.innerHTML = renderNav(navData);
	}
	if (footerShell && footerShell.children.length === 0) {
		const footerData = await fetchFileData("footer.json");
		footerShell.innerHTML = renderFooter(footerData);
	}

	// 2. 404 HANDLING
	if (!route) {
		const appShell = document.getElementById("app");
		if (appShell) appShell.innerHTML = renderErrorPage();
		document.title = "404 - Not Found";
		if (window.lucide) window.lucide.createIcons();
		return;
	}

	// 3. LOAD PAGE COMPONENTS
	try {
		// First, load the base HTML layout for the route
		await loadComponent("app", route);

		// Fetch the corresponding Markdown for data stitching
		const mdPath = mdMap[path] || mdMap["/"];
		const res = await fetch(mdPath);
		const text = await res.text();
		const { attributes } = fm<any>(text);

		// Update Title
		document.title = attributes.title || "cbeens.dev";

		// Stitch components into the shell
		if (attributes.components && Array.isArray(attributes.components)) {
			const componentTasks = attributes.components.map(
				async (comp: any) => {
					const componentHtml = await stitchPage(comp, fetchFileData);
					return loadComponent(comp.id, componentHtml, false);
				},
			);
			await Promise.all(componentTasks);
		}
	} catch (error) {
		console.error(`Sovereign Engine Error (${path}):`, error);
	}

	// 4. POST-RENDER INITIALIZATION
	// Mapbox
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	if (document.getElementById("map")) initializeMap(token);

	// Lucide Icons
	if (window.lucide) window.lucide.createIcons();

	// Intersection Observer for Animations
	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("active");
					revealObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15 },
	);
	document
		.querySelectorAll(".reveal")
		.forEach((el) => revealObserver.observe(el));

	// Performance Metrics
	const loadDisplay = document.getElementById("load-time-display");
	if (loadDisplay) {
		const [entry] = performance.getEntriesByType("navigation") as any;
		if (entry) loadDisplay.textContent = `${Math.round(entry.duration)}ms`;
	}

	window.scrollTo(0, 0);
	document.dispatchEvent(new CustomEvent("page-loaded"));
}

export async function initRouter(): Promise<void> {
	window.addEventListener("popstate", router);
	document.addEventListener("click", (e) => {
		const anchor = (e.target as HTMLElement)?.closest("a");

		if (
			anchor?.getAttribute("href") === "/privacy.html" ||
			anchor?.getAttribute("href") === "/terms.html"
		) {
			return; // Let the browser handle this link normally
		}

		if (anchor && anchor.href.startsWith(window.location.origin)) {
			e.preventDefault();
			window.history.pushState({}, "", anchor.href);
			router();
		}
	});
	router();
}
