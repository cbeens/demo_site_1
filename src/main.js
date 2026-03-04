import "./style.css";
import { loadComponent } from "./componentLoader";

window.addEventListener("DOMContentLoaded", async () => {
	await loadComponent("nav", "/src/components/nav.html");
	await loadComponent("footer", "/src/components/footer.html");
});
