import "./style.css";

import { FormHandler } from "./utils/forms";
import { scrollToForm, initBackToTop } from "./utils/interactions";
import { loadComponent } from "./utils/componentLoader";
import { initRouter } from "./utils/router";
import { setupMobileMenu } from "./utils/mobileMenu";

window.addEventListener("DOMContentLoaded", async () => {
	// 1. Load the "Shell" (These are always on the page)
	await Promise.all([
		loadComponent("nav", "./src/components/nav.html"),
		loadComponent("footer", "./src/components/footer.html"),
	]);

	// 2. Initialize Form Handler for Contact Form (if it exists on the page)
	if (document.getElementById("contact-form")) {
		new FormHandler("contact-form", "http://localhost:3000/v1/leads");
	}

	// 3. Catch EVERY link that mentions your email and redirect it to the scroll
	document.addEventListener("click", (e) => {
		const target = e.target as HTMLElement;
		const anchor = target.closest("a"); // Catch clicks on icons inside the link too

		if (
			anchor &&
			anchor.getAttribute("href") === "mailto:info@cbeens.dev"
		) {
			if (document.querySelector("#contact")) {
				scrollToForm(e);
			}
		}
	});

	initRouter();
	setupMobileMenu();
	initBackToTop();
});
