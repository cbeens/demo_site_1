/**
 * A reusable, Type-Safe form handler .
 */
export class FormHandler {
	private formElement: HTMLFormElement;
	private endpoint: string;

	constructor(formId: string, endpoint: string) {
		this.formElement = document.getElementById(formId) as HTMLFormElement;
		this.endpoint = endpoint;
		this.init();
	}

	private init() {
		this.formElement?.addEventListener("submit", async (e) => {
			e.preventDefault();
			await this.handleSubmit();
		});
	}

	private async handleSubmit() {
		const formData = new FormData(this.formElement);
		const payload = Object.fromEntries(formData.entries());

		// Set Loading State
		this.setLoading(true);

		try {
			const response = await fetch(this.endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					clientId: "CLIENT_ID_FROM_CONFIG", // We'll get this from your .md files later
					data: payload,
				}),
			});

			if (response.ok) {
				alert("Message Sent! We'll get back to you soon.");
				this.formElement.reset();
			} else {
				throw new Error("Server error");
			}
		} catch (error) {
			alert("Oops! Something went wrong. Please try again.");
		} finally {
			this.setLoading(false);
		}
	}

	private setLoading(isLoading: boolean) {
		const btn = this.formElement.querySelector(
			'button[type="submit"]',
		) as HTMLButtonElement;
		if (btn) {
			btn.disabled = isLoading;
			// Using textContent and keeping it uppercase to match your brand
			btn.textContent = isLoading ? "TRANSMITTING..." : "SUBMIT";

			// Optional: Add a class for visual feedback
			isLoading
				? btn.classList.add("opacity-50", "cursor-not-allowed")
				: btn.classList.remove("opacity-50", "cursor-not-allowed");
		}
	}
}
