/**
 * cbeens.dev SPA Router - Parallel Optimized
 */
import fm from "front-matter";
import { loadComponent } from "./componentLoader";
import { initializeMap } from "../utils/map";
import { stitchPage } from "./stitcher";
import { renderNav, renderFooter, renderErrorPage } from "./factory";

const routes: { [key: string]: string } = {
	"/": "/pages/home/home.html",
	"/index.html": "/pages/home/home.html",
	"/about": "/pages/about/about.html",
	"/services": "/pages/services/services.html",
};

const mdMap: { [key: string]: string } = {
	"/": "/pages/home/home.md",
	"/index.html": "/pages/home/home.md",
	"/about": "/pages/about/about.md",
	"/services": "/pages/services/services.md",
};

const fetchFileData = async (path: string) => {
	const response = await fetch(`/data/${path}`);
	if (!response.ok) throw new Error(`Failed to fetch data: ${path}`);
	return await response.json();
};

export async function router(): Promise<void> {
	const path: string = window.location.pathname;
	const route: string = routes[path];

	// 1. 404 EARLY EXIT
	if (!route) {
		const appShell = document.getElementById("app");
		if (appShell) appShell.innerHTML = renderErrorPage();
		document.title = "404 - Not Found";
		if (window.lucide) window.lucide.createIcons();
		return;
	}

	const navShell = document.getElementById("nav");
	const footerShell = document.getElementById("footer");
	const mdPath = mdMap[path] || mdMap["/"];

	try {
		// 2. PARALLEL FETCHING (The "Sovereign" Speed Boost)
		// Fire all global and initial page requests simultaneously
		const [navData, footerData, layoutHtml, mdText] = await Promise.all([
			navShell && navShell.children.length === 0
				? fetchFileData("nav.json")
				: Promise.resolve(null),
			footerShell && footerShell.children.length === 0
				? fetchFileData("footer.json")
				: Promise.resolve(null),
			fetch(route).then((res) => res.text()),
			fetch(mdPath).then((res) => res.text()),
		]);

		// 3. IMMEDIATE SHELL INJECTION
		if (navData && navShell) navShell.innerHTML = renderNav(navData);
		if (footerData && footerShell)
			footerShell.innerHTML = renderFooter(footerData);

		// Load the base layout into the app shell
		await loadComponent("app", layoutHtml, false);

		// 4. COMPONENT STITCHING
		const { attributes } = fm<any>(mdText);
		document.title = attributes.title || "cbeens.dev";

		if (attributes.components && Array.isArray(attributes.components)) {
			// Stitch components in parallel as well
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

	// 5. POST-RENDER INITIALIZATION
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	if (document.getElementById("map")) initializeMap(token);
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
			return;
		}

		if (anchor && anchor.href.startsWith(window.location.origin)) {
			e.preventDefault();
			window.history.pushState({}, "", anchor.href);
			router();
		}
	});
	router();
}
