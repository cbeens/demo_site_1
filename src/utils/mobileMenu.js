export function setupMobileMenu() {
	const toggle = document.getElementById("mobile-menu-toggle");
	const drawer = document.getElementById("mobile-drawer");
	const body = document.body;

	if (!toggle || !drawer) return;

	toggle.addEventListener("click", () => {
		const isOpening = drawer.classList.contains("translate-x-full");

		if (isOpening) {
			drawer.classList.remove("translate-x-full");
			body.classList.add("overflow-hidden");
			toggle.innerHTML = `<i data-lucide="x"></i>`;
			// toggle.setAttribute("data-lucide", "x");
		} else {
			drawer.classList.add("translate-x-full");
			body.classList.remove("overflow-hidden");
			toggle.innerHTML = `<i data-lucide="menu"></i>`;
		}

		// FORCE re-render for only this specific icon
		// This is more efficient than scanning the whole page
		lucide.createIcons();
	});
}
