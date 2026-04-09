/**
 * A reusable, type-safe form handler for contact submission.
 * Handles validation, payload formatting, POST requests, and UI states.
 */
export class FormHandler {
	private formElement: HTMLFormElement;
	private endpoint: string;
	private messageElement: HTMLParagraphElement;

	constructor(formId: string, endpoint: string) {
		this.formElement = document.getElementById(formId) as HTMLFormElement;
		this.endpoint = endpoint;

		this.messageElement = document.createElement("p");
		this.messageElement.className =
			"text-[10px] uppercase tracking-widest text-center hidden";

		if (this.formElement) {
			this.formElement.appendChild(this.messageElement);
			this.init();
		}
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
				target.value = this.formatPhoneNumber(target.value);
			});
		}
	}

	private async handleSubmit() {
		const formData = new FormData(this.formElement);
		const payload = Object.fromEntries(formData.entries());
		const clientId = import.meta.env.VITE_CLIENT_ID;

		this.setLoading(true);
		this.hideMessage();

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
				this.setSuccess();
				this.formElement.reset();
			} else {
				throw new Error();
			}
		} catch (error) {
			this.setError("TRANSMISSION FAILED. PLEASE TRY AGAIN.");
		} finally {
			const btn = this.formElement.querySelector(
				'button[type="submit"]',
			) as HTMLButtonElement;

			// Only unlock if we didn't succeed
			if (btn && btn.textContent !== "MESSAGE SENT") {
				this.setLoading(false);
			}
		}
	}

	private setLoading(isLoading: boolean) {
		const btn = this.formElement.querySelector(
			'button[type="submit"]',
		) as HTMLButtonElement;
		if (!btn) return;

		btn.disabled = isLoading;
		btn.textContent = isLoading ? "SENDING..." : "SUBMIT";

		if (isLoading) {
			btn.classList.add("opacity-50", "cursor-not-allowed");
		} else {
			btn.classList.remove("opacity-50", "cursor-not-allowed");
		}
	}

	private setSuccess() {
		const btn = this.formElement.querySelector(
			'button[type="submit"]',
		) as HTMLButtonElement;
		if (!btn) return;

		btn.textContent = "MESSAGE SENT";
		btn.disabled = true; // Permanent disable for this session

		// Transition to brand-secondary (Make sure these are safelisted!)
		btn.classList.remove("border-brand-primary", "text-brand-primary");
		btn.classList.add("bg-brand-secondary", "border-brand-secondary");
	}

	private setError(msg: string) {
		this.messageElement.textContent = msg;
		this.messageElement.classList.remove("hidden");
		this.messageElement.classList.add("text-red-500");
		this.setLoading(false);
	}

	private hideMessage() {
		this.messageElement.classList.add("hidden");
		this.messageElement.classList.remove("text-red-500");
	}

	private formatPhoneNumber(value: string): string {
		if (!value) return value;
		const phoneNumber = value.replace(/[^\d]/g, "");
		const length = phoneNumber.length;
		if (length < 4) return phoneNumber;
		if (length < 7) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
	}
}
