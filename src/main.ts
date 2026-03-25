import "./style.css";
import { FormHandler } from "./utils/forms";
import { scrollToForm, initBackToTop } from "./utils/interactions";
import { initRouter } from "./utils/router";
import { setupMobileMenu } from "./utils/mobileMenu";

window.addEventListener("DOMContentLoaded", async () => {
	// 1. Fire the Router immediately.
	// The router now handles Nav/Footer injection via factory + JSON.
	await initRouter();

	// 2. Initialize Form Handler
	document.addEventListener("page-loaded", () => {
		if (document.getElementById("contact-form")) {
			new FormHandler("contact-form", "http://localhost:3000/v1/leads");
		}
	});

	// 3. Catch mailto links for scrolling
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

	// 4. Global Interactions
	setupMobileMenu();
	initBackToTop();
});
