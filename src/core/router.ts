/**
 * cbeens.dev SPA Router
 */

import fm from "front-matter";
import { loadComponent } from "./componentLoader";
import { initializeMap } from "../utils/map";
import { stitchPage } from "./stitcher";
import { renderNav, renderFooter, renderErrorPage } from "../factories/factory";

const routes: { [key: string]: string } = {
	"/": "./src/pages/home/home.html",
	"/about": "./src/pages/about/about.html",
	"/services": "./src/pages/services/services.html",
};

const fetchFileData = async (path: string) => {
	const response = await fetch(`/src/data/${path}`);
	if (!response.ok) throw new Error(`Failed to fetch data: ${path}`);
	return await response.json();
};

export async function router(): Promise<void> {
	const path: string = window.location.pathname;
	const route: string = routes[path];

	if (!route) {
		// --- 404 FALLBACK LOGIC ---

		// A. Inject the Shells first (so they aren't empty)
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

		const appShell = document.getElementById("app");
		if (appShell) appShell.innerHTML = renderErrorPage();

		// C. Refresh icons for the Nav/Footer/Error page
		if (window.lucide) window.lucide.createIcons();

		document.title = "404 - Not Found | cbeens.dev";
		return;
	}

	// 1. Load the Page Shell
	// --- GLOBAL SHELL INJECTION ---
	const navShell = document.getElementById("nav");
	const footerShell = document.getElementById("footer");

	if (navShell && navShell.children.length === 0) {
		const navData = await fetchFileData("nav.json");
		const html = renderNav(navData);
		navShell.innerHTML = html;
	}

	if (footerShell && footerShell.children.length === 0) {
		const footerData = await fetchFileData("footer.json");
		const html = renderFooter(footerData);
		footerShell.innerHTML = html;
	}

	await loadComponent("app", route);

	// Refresh icons immediately for global shells
	if (window.lucide) window.lucide.createIcons();

	const componentTasks: Promise<any>[] = [];
	const mdMap: { [key: string]: string } = {
		"/": "/src/pages/home/home.md",
		"/index.html": "/src/pages/home/home.md",
		"/about": "/src/pages/about/about.md",
		"/services": "/src/pages/services/services.md",
	};

	const mdPath = mdMap[path] || mdMap["/"];

	try {
		const res = await fetch(mdPath);
		const text = await res.text();
		const { attributes } = fm<any>(text);

		// DYNAMIC TITLE UPDATE
		if (attributes.title) {
			document.title = attributes.title;
		} else {
			document.title = "cbeens.dev";
		}

		if (attributes.components && Array.isArray(attributes.components)) {
			for (const comp of attributes.components) {
				const componentHtml = await stitchPage(comp, fetchFileData);
				componentTasks.push(
					loadComponent(comp.id, componentHtml, false),
				);
			}
		}
	} catch (error) {
		console.error(`Sovereign Engine Error (${path}):`, error);
	}

	await Promise.all(componentTasks);

	// Initialize scripts (Map, Lucide, etc.)
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	if (document.getElementById("map")) initializeMap(token);

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
