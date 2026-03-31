import "./style.css";
import { FormHandler } from "./utils/forms";
import { scrollToForm, initBackToTop } from "./utils/interactions";
import { initRouter } from "./core/router";
import { setupMobileMenu } from "./utils/mobileMenu";
// --- ADD THESE IMPORTS ---
import { renderChat } from "./core/factory";
import { initChat } from "./utils/interactions";

window.addEventListener("DOMContentLoaded", async () => {
	// 1. Fire the Router immediately.
	await initRouter();

	// --- 2. INJECT DOUGG MANUALLY ---
	// We append him to the body so he's always on top of the routed content.
	const chatContainer = document.createElement("div");
	chatContainer.innerHTML = renderChat();
	document.body.appendChild(chatContainer);

	// --- 3. INITIALIZE DOUGG ---
	initChat();

	// 4. Initialize Form Handler
	document.addEventListener("page-loaded", () => {
		// Re-run Lucide for the new chat icons
		// @ts-ignore
		if (window.lucide) window.lucide.createIcons();

		if (document.getElementById("contact-form")) {
			new FormHandler("contact-form", "http://localhost:3000/v1/leads");
		}
	});

	// 5. Catch mailto links for scrolling
	document.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		const anchor = target.closest("a");

		if (
			anchor &&
			anchor.getAttribute("href") === "mailto:info@cbeens.dev"
		) {
			if (document.querySelector("#contact")) {
				scrollToForm(e);
			}
		}
	});

	// 6. Global Interactions
	setupMobileMenu();
	initBackToTop();
});
