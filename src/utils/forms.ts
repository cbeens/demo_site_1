/**
 * A reusable, type-safe form handler for contact submission.
 * Handles validation, payload formatting, and POST requests.
 */
export class FormHandler {
	private formElement: HTMLFormElement;
	private endpoint: string;

	/**
	 * @param formId - The DOM ID of the form to manage.
	 * @param endpoint - The backend URL to submit form payloads.
	 */
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
		const clientId = import.meta.env.VITE_CLIENT_ID;

		this.setLoading(true);

		try {
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
				this.formElement.reset();
				// Optional: Trigger a custom event for success UI
				this.formElement.dispatchEvent(new CustomEvent("form-success"));
			} else {
				throw new Error(`Server returned ${response.status}`);
			}
		} catch (error) {
			// TODO: Replace alert with a custom modal or inline message for better UX
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

/**
 * Formats a string into a US-style phone number as the user types.
 * @param value - The raw phone input value.
 * @returns The formatted phone number.
 */
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
