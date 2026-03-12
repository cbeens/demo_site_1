import "./style.css";

import { FormHandler, scrollToForm } from "./utils/forms";
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

	// 3. Select all mailto links that should trigger the scroll instead of opening an app
	const emailButtons = document.querySelectorAll(
		'a[href^="mailto:info@cbeens.dev"]',
	);

	emailButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			// Only scroll if the contact form exists on the current page
			if (document.querySelector("#contact-form")) {
				scrollToForm(e);
			}
			// Otherwise, let the default mailto: behavior happen (e.g. on a subpage)
		});
	});

	initRouter();
	setupMobileMenu();
});
