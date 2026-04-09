/**
 * Initializes the mobile menu toggle and auto-close behavior.
 * Supports opening and closing the drawer and updating toggle icons.
 */
export function setupMobileMenu() {
	const body = document.body;

	body.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		const toggle = target.closest("#mobile-menu-toggle");
		const drawer = document.getElementById("mobile-drawer");

		if (!toggle || !drawer) return;

		const isOpening = drawer.classList.contains("translate-x-full");

		if (isOpening) {
			drawer.classList.remove("translate-x-full");
			drawer.classList.add("is-open");
			body.classList.add("overflow-hidden");
			toggle.innerHTML = `<i data-lucide="x"></i>`;
		} else {
			drawer.classList.add("translate-x-full");
			drawer.classList.remove("is-open");
			body.classList.remove("overflow-hidden");
			toggle.innerHTML = `<i data-lucide="menu"></i>`;
		}

		window.lucide?.createIcons();
	});

	// Auto-close when clicking any link inside the mobile drawer
	body.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;

		// FIX: Look for any anchor tag inside the mobile-drawer instead of a specific class
		if (target.closest("#mobile-drawer a")) {
			const drawer = document.getElementById("mobile-drawer");
			const toggle = document.getElementById("mobile-menu-toggle");

			if (drawer) {
				drawer.classList.add("translate-x-full");
				drawer.classList.remove("is-open");
			}

			body.classList.remove("overflow-hidden");

			if (toggle) {
				toggle.innerHTML = `<i data-lucide="menu"></i>`;
				window.lucide?.createIcons();
			}
		}
	});
}
