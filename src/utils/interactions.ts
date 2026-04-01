export const initBackToTop = () => {
	const btn = document.getElementById("back-to-top");
	if (!btn) return;

	window.addEventListener("scroll", () => {
		if (window.scrollY > 600) {
			btn.classList.remove("hidden");
			btn.classList.add("flex");

			// Re-scan only if the icon hasn't been rendered yet
			// Lucide adds an 'svg' inside once it's processed
			if (window.lucide && !btn.querySelector("svg")) {
				window.lucide.createIcons();
			}
		} else {
			btn.classList.add("hidden");
			btn.classList.remove("flex");
		}
	});

	btn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
};

/**
 * Smoothly scrolls the viewport to the contact section.
 * Targeted by class or ID to ensure it works across different page layouts.
 */
export const scrollToForm = (e?: Event) => {
	if (e) e.preventDefault();

	// We target the form's ID, but scroll to its parent section for better framing
	const target = document.querySelector("#contact");

	if (target) {
		const offset = 84;
		const targetPosition =
			target.getBoundingClientRect().top + window.pageYOffset - offset;

		window.scrollTo({
			top: targetPosition,
			behavior: "smooth",
		});
	} else {
		console.warn("Contact form not found in current DOM.");
	}
};

export const initChat = () => {
	document.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		const trigger = target.closest("#chat-trigger");
		const closeBtn = target.closest("#chat-close");
		const chatWindow = document.getElementById("chat-window");

		if (trigger) {
			chatWindow?.classList.add("active");
			trigger.classList.add("hidden-state"); // Hides the button
		} else if (closeBtn) {
			chatWindow?.classList.remove("active");
			document
				.getElementById("chat-trigger")
				?.classList.remove("hidden-state"); // Shows it back
		}
	});
};
