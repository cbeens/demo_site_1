/**
 * A reusable, Type-Safe form handler.
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
		if (!this.formElement) return;

		this.formElement.addEventListener("submit", async (e) => {
			e.preventDefault();
			await this.handleSubmit();
		});

		const phoneInput = this.formElement.querySelector(
			'input[name="phone"]',
		) as HTMLInputElement;
		if (phoneInput) {
			phoneInput.addEventListener("input", (e) => {
				const target = e.target as HTMLInputElement;
				target.value = formatPhoneNumber(target.value);
			});
		}
	}

	private async handleSubmit() {
		const formData = new FormData(this.formElement);
		const payload = Object.fromEntries(formData.entries());

		// Priority: 1. Attribute on HTML, 2. Env Var, 3. Hardcoded Default
		const clientId =
			this.formElement.getAttribute("data-client-id") ||
			import.meta.env.VITE_CLIENT_ID ||
			"cbeens-dev";

		this.setLoading(true);

		try {
			console.log(
				`📡 Transmitting Lead for [${clientId}] to ${this.endpoint}...`,
			);

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
				console.log("✅ Transmission Successful");
				this.formElement.reset();
				// Optional: Trigger a custom event for success UI
				this.formElement.dispatchEvent(new CustomEvent("form-success"));
			} else {
				throw new Error(`Server returned ${response.status}`);
			}
		} catch (error) {
			console.error("❌ Transmission Failed:", error);
			alert(
				"Transmission failed. Please try again or email info@cbeens.dev",
			);
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
			btn.textContent = isLoading ? "TRANSMITTING..." : "SUBMIT";
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
