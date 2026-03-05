import "./style.css";
import { loadComponent } from "./utils/componentLoader";
import { initializeMap } from "./utils/map";

window.addEventListener("DOMContentLoaded", async () => {
	// 1. Load the Frame & Core Content
	// Use Promise.all to load parallel components faster
	await Promise.all([
		loadComponent("nav", "./src/components/nav.html"),
		loadComponent("footer", "./src/components/footer.html"),
		loadComponent("hero", "./src/components/hero.html"),
		loadComponent("services", "./src/components/services.html"),
		loadComponent("testimonial", "./src/components/testimonial.html"),
		loadComponent("contact", "./src/components/contact.html"),
	]);

	// 2. Performance Metric
	const [entry] = performance.getEntriesByType("navigation");
	const display = document.getElementById("load-time-display");
	if (entry && display) {
		display.innerText = `${Math.round(entry.duration)}ms`;
	}

	// 3. Initialize Map after contact component is injected
	const token = import.meta.env.VITE_MAPBOX_TOKEN;
	initializeMap(token);
});
