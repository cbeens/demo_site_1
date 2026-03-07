import "./style.css";
import { loadComponent } from "./utils/componentLoader";
import { initRouter } from "./utils/router";
import { setupMobileMenu } from "./utils/mobileMenu";

window.addEventListener("DOMContentLoaded", async () => {
	// 1. Load the "Shell" (These are always on the page)
	await Promise.all([
		loadComponent("nav", "./src/components/nav.html"),
		loadComponent("footer", "./src/components/footer.html"),
	]);

	// 2. Start the Router
	// This will look at the URL and inject home.html into #app
	initRouter();

	// 3. Global UI Logic
	setupMobileMenu();
});
