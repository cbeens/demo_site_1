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
	const trigger = document.getElementById("chat-trigger");
	const close = document.getElementById("chat-close");
	const window = document.getElementById("chat-window");
	const form = document.getElementById("chat-form") as HTMLFormElement;
	const input = document.getElementById("chat-input") as HTMLInputElement;
	const messages = document.getElementById("chat-messages");

	// Toggle Window
	trigger?.addEventListener("click", () =>
		window?.classList.toggle("active"),
	);
	close?.addEventListener("click", () => window?.classList.remove("active"));

	form?.addEventListener("submit", async (e) => {
		e.preventDefault();
		const text = input.value.trim();
		if (!text) return;

		// 1. User Message
		appendMessage("user", text);
		input.value = "";

		// 2. Dougg Thinking State
		const thinkingId = addThinkingIndicator();

		try {
			const response = await fetch("http://localhost:5678/webhook/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: text }),
			});
			const data = await response.json();

			removeThinkingIndicator(thinkingId);
			appendMessage("ai", data.output || data.message);
		} catch (err) {
			removeThinkingIndicator(thinkingId);
			appendMessage(
				"ai",
				"Signal lost. Planet US is currently unreachable. (Check Docker)",
			);
		}
	});

	function appendMessage(role: "user" | "ai", text: string) {
		const div = document.createElement("div");
		div.className = role === "user" ? "user-msg" : "ai-msg";
		div.innerText = text;
		messages?.appendChild(div);
		messages!.scrollTop = messages!.scrollHeight;
	}

	function addThinkingIndicator() {
		const id = "thinking-" + Date.now();
		const div = document.createElement("div");
		div.id = id;
		div.className = "dougg-thinking";
		div.innerText = "Dougg is processing...";
		messages?.appendChild(div);
		return id;
	}

	function removeThinkingIndicator(id: string) {
		document.getElementById(id)?.remove();
	}
};
