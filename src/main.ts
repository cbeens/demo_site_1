import "./style.css";
import { FormHandler } from "./utils/forms";
import { scrollToForm, initBackToTop, initChat } from "./utils/interactions";
import { initRouter } from "./core/router";
import { setupMobileMenu } from "./utils/mobileMenu";
// import { renderChat } from "./core/factory";

window.addEventListener("DOMContentLoaded", async () => {
	/*** START CHAT INITIALIZATION 
	// 1. INJECT & INIT GLOBAL UI FIRST (Independent of Router)
	// We do this before the 'await' so Dougg is ready instantly.
	const chatContainer = document.createElement("div");
	chatContainer.id = "dougg-root"; // Give it an ID so we don't duplicate it
	chatContainer.innerHTML = renderChat();
	document.body.appendChild(chatContainer);

	// Initialize listeners immediately
	initChat();
	END CHAT INITIALIZATION ***/

	// 2. Fire the Router (The heavy lifting)
	await initRouter();

	// 3. Initialize Form Handler & Icons on Page Load
	document.addEventListener("page-loaded", () => {
		if (window.lucide) window.lucide.createIcons();

		if (document.getElementById("contact-form")) {
			new FormHandler("contact-form", "http://localhost:3000/v1/leads");
		}
	});

	// 4. Catch mailto links for scrolling
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

	// 5. Global Interactions
	setupMobileMenu();
	initBackToTop();
});
