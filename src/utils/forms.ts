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

		const phoneInput = this.formElement?.querySelector(
			'input[name="phone"]',
		) as HTMLInputElement;
		if (phoneInput) {
			addEventListener("input", (e) => {
				const target = e.target as HTMLInputElement;
				target.value = formatPhoneNumber(target.value);
			});
		}
	}

	// Inside your FormHandler Class
	private async handleSubmit() {
		const formData = new FormData(this.formElement);
		const payload = Object.fromEntries(formData.entries());

		// 1. Get the Client ID from the form's data attribute (The Sovereign Way)
		const clientId =
			this.formElement.getAttribute("data-client-id") ||
			import.meta.env.VITE_CLIENT_ID ||
			"cbeens-dev";

		this.setLoading(true);

		try {
			console.log(`📡 Transmitting Lead for [${clientId}]...`);

			const response = await fetch(this.endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					clientId: clientId,
					data: payload,
					metadata: {
						sourceUrl: window.location.href,
						submittedAt: new Date().toISOString(),
					},
				}),
			});

			if (response.ok) {
				console.log(
					"✅ Transmission Successful:",
					await response.json(),
				);
				this.formElement.reset();
				// Handle success UI here later
			} else {
				throw new Error("Relay rejected the payload");
			}
		} catch (error) {
			console.error("❌ Transmission Failed:", error);
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

const formatPhoneNumber = (value: string) => {
	if (!value) return value;
	const phoneNumber = value.replace(/[^\d]/g, "");
	const phoneNumberLength = phoneNumber.length;
	if (phoneNumberLength < 4) return phoneNumber;
	if (phoneNumberLength < 7) {
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
	}
	return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};
