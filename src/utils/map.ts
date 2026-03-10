import mapboxgl from "mapbox-gl";

export function initializeMap(
	token: string,
	lng = -97.7431,
	lat = 30.2672,
): mapboxgl.Map | void {
	const mapContainer = document.getElementById("map");
	if (!mapContainer) return;

	mapboxgl.accessToken = token;

	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v11",
		center: [lng, lat],
		zoom: 12,
		scrollZoom: false,
	});

	// Create a DOM element for the custom icon
	const el = document.createElement("div");
	el.className = "marker";
	el.style.backgroundImage = "url(/src/assets/cbeens_dougg_icon.svg)";
	el.style.width = "40px";
	el.style.height = "40px";
	el.style.backgroundSize = "100%";

	// Add the custom marker to the map
	new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

	map.on("load", () => map.resize());

	return map;
}
