// src/utils/stitcher.ts
import {
	renderHero,
	renderServiceGrid,
	renderTestimonial,
	renderContact,
	renderLocation,
	renderHistory,
	renderMission,
	renderTeam,
	renderBenchmarks,
	renderHighlights,
	renderProcess,
	renderFooter,
	renderNav,
} from "./factory";

// Map component IDs to their specific Factory functions
const componentMap = {
	hero: renderHero,
	"service-grid": renderServiceGrid,
	testimonial: renderTestimonial,
	contact: renderContact,
	location: renderLocation,
	history: renderHistory,
	mission: renderMission,
	team: renderTeam,
	benchmarks: renderBenchmarks,
	highlights: renderHighlights,
	process: renderProcess,
	footer: renderFooter,
	nav: renderNav,
};

export const stitchPage = async (
	comp: any, // Pass the single component object from the router loop
	fetchFileData: (path: string) => Promise<any>,
): Promise<string> => {
	const factory = componentMap[comp.id as keyof typeof componentMap];

	if (factory) {
		// Fetch the specific JSON data for this component instance
		const data = comp.data_source
			? await fetchFileData(comp.data_source)
			: comp; // Fallback to comp attributes (like 'title' or 'city' in your .md)

		// Generate and return the HTML string for THIS component
		return factory(data);
	}

	return ""; // Return empty string if no factory found to prevent "undefined" in HTML
};
