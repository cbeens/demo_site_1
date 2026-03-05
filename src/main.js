import "./style.css";
import { loadComponent } from "./componentLoader";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

window.addEventListener("DOMContentLoaded", async () => {
	// 1. Load the Nav and Footer (The Frame)
	await loadComponent("nav", "/src/components/nav.html");
	await loadComponent("footer", "/src/components/footer.html");

	// 2. Load the Page Content (The Core)
	await loadComponent("hero", "/src/components/hero.html");
	await loadComponent("services", "/src/components/services.html");
	await loadComponent("testimonial", "/src/components/testimonial.html");
	await loadComponent("contact", "/src/components/contact.html");

	const [entry] = performance.getEntriesByType("navigation");
	if (entry) {
		// Calculate total load time (rounded)
		const loadTime = Math.round(entry.duration);
		document.getElementById("load-time-display").innerText =
			`${loadTime}ms`;
	}

	// 3. Trigger Mapbox ONLY after 'contact' is fully loaded
	const mapContainer = document.getElementById("map");
	if (mapContainer) {
		const map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/mapbox/light-v11",
			center: [-97.7431, 30.2672],
			zoom: 12,
			scrollZoom: false,
		});

		// 1. Create a DOM element for the custom icon
		const el = document.createElement("div");
		el.className = "marker";
		el.style.backgroundImage = "url(/src/assets/cbeens_dougg_icon.svg)";
		el.style.width = "40px";
		el.style.height = "40px";
		el.style.backgroundSize = "100%";

		// 2. Add the custom marker to the map
		new mapboxgl.Marker(el).setLngLat([-97.7431, 30.2672]).addTo(map);

		map.on("load", () => map.resize());
	}
});

window.addEventListener("load", () => {
	// Use the Performance Navigation Timing API
});
