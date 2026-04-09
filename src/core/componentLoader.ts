/**
 * Component loader for the SPA shell.
 * Can either fetch a component file path or inject raw HTML directly.
 * @param id - DOM element ID where content will be mounted.
 * @param content - URL path or raw HTML string.
 * @param isPath - When true, content is treated as a fetch path.
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
