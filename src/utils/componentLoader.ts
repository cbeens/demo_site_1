export async function loadComponent(id: string, path: string): Promise<void> {
	const element = document.getElementById(id);
	if (element) {
		try {
			const response = await fetch(path);
			if (!response.ok) throw new Error(`Failed to load ${path}`);
			element.innerHTML = await response.text();
		} catch (err) {
			console.error(err);
		}
	}
}
