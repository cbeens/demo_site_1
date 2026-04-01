// src/utils/componentLoader.ts

/**
 * Enhanced Loader: Can load from a path (old way)
 * OR direct HTML string (new Sovereign way)
 */
export async function loadComponent(
	id: string,
	content: string,
	isPath: boolean = true,
): Promise<void> {
	const element = document.getElementById(id);
	if (!element) return;

	try {
		if (isPath) {
			const response = await fetch(content);
			if (!response.ok) throw new Error(`Failed to load ${content}`);
			element.innerHTML = await response.text();
		} else {
			// Direct injection from our Factory/Stitcher
			element.innerHTML = content;
		}
	} catch (err) {
		console.error(err);
	}
}
