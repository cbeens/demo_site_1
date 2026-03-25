import { getIcon } from "./iconRegistry";

export interface CTA {
	text: string;
	link: string;
}

export interface HeroData {
	bg_image: string;
	title_top: string;
	title_highlight: string;
	title_bottom: string;
	badge_text: string;
	primary_cta: CTA;
	secondary_cta: CTA;
}

export const renderHero = (data: HeroData): string => {
	return `
        <div class="hero-background">
            <img
                src="${data.bg_image}"
                alt="Background"
                class="hero-bg-image"
            />
            <div class="hero-bg-overlay"></div>
        </div>

        <div class="hero-content">
            <h1 class="hero-title">
                ${data.title_top} <br />
                <span class="text-highlight-primary-italic">${data.title_highlight}</span>
                <br />
                ${data.title_bottom}
            </h1>

            <div class="hero-badge">
                <span class="badge-text"> ${data.badge_text} </span>
                <span class="badge-ping-wrapper">
                    <span class="badge-ping"></span>
                    <span class="badge-dot"></span>
                </span>
            </div>

            <div class="hero-actions">
                <a href="${data.primary_cta.link}" class="btn-primary">
                    ${data.primary_cta.text}
                </a>
                <a href="${data.secondary_cta.link}" class="btn-secondary">
                    ${data.secondary_cta.text}
                </a>
            </div>
        </div>
    `;
};

interface ServiceCard {
	title: string;
	icon: string;
	body: string;
	footer: string;
	price?: string;
	groupClass?: string; // Preserves your "group" class for specific cards
}

interface ServiceGridData {
	headingMain: string;
	headingHighlight: string;
	cards: ServiceCard[];
}

export const renderServiceGrid = (data: ServiceGridData): string => {
	// Generate the cards list first
	const cardsHtml = data.cards
		.map(
			(card) => `
    <div class="service-card ${card.groupClass || ""}">
        <div class="service-heading">
            <div class="service-heading-left">
                <i data-lucide="${card.icon}" class="service-icon"></i>
            </div>
            ${card.price ? `<div class="service-heading-right">${card.price}</div>` : ""}
        </div>
        <h3 class="service-title">${card.title}</h3>
        <p class="service-body">${card.body}</p>
        <div class="service-footer">${card.footer}</div>
    </div>
  `,
		)
		.join("");

	// Return the full component string
	return `
        <div class="service-grid">
            <div class="service-grid-heading">
                <h2 class="service-grid-heading-title">
                    ${data.headingMain} <span class="text-highlight-primary-italic">${data.headingHighlight}</span>
                </h2>
                <div class="heading-border"></div>
            </div>
            <div class="card-container">
                ${cardsHtml}
            </div>
        </div>
  `;
};

export interface Brand {
	name: string;
	slug: string; // Maps to filename in src/assets/icons
	url: string;
	colorClass: string;
}

export interface Stat {
	label: string;
	value: string;
	color: string;
	id?: string;
}

export interface TestimonialData {
	brandSubtitle: string;
	brands: Brand[];
	quote: string;
	author: string;
	authorTitle: string;
	stats: Stat[];
}

export const renderTestimonial = (data: TestimonialData): string => {
	const brandsHtml = data.brands
		.map((brand: Brand) => {
			const svgContent = getIcon(brand.slug);

			return `
            <a 
                href="${brand.url}" 
                target="_blank" 
                rel="noreferrer" 
                class="brand-link"
            >
                <div class="service-icon ${brand.colorClass}">
                    ${svgContent}
                </div>
                <span>${brand.name}</span>
            </a>
        `;
		})
		.join("");

	const statsHtml = data.stats
		.map(
			(stat: Stat) => `
        <div class="stat-card">
            <span 
                ${stat.id ? `id="${stat.id}"` : ""} 
                class="stat-value ${stat.color}"
            >
                ${stat.value}
            </span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `,
		)
		.join("");

	return `
            <div class="testimonial-content-wrapper">
                <div class="brand-section">
                    <p class="component-heading-md-subtitle tracking-[0.4em]">
                        ${data.brandSubtitle}
                    </p>
                    <div class="brand-grid">
                        ${brandsHtml}
                    </div>
                </div>

                <div class="testimonial-grid">
                    <div class="testimonial-quote-block">
                        <p class="quote-text">
                            "${data.quote}"
                        </p>
                        <div class="quote-attribution">
                            <span class="text-highlight-primary-bold uppercase tracking-widest">
                                ${data.author}
                            </span>
                            <span class="subtle-text">${data.authorTitle}</span>
                        </div>
                    </div>

                    <div class="stat-grid">
                        ${statsHtml}
                    </div>
                </div>
            </div>
    `;
};

export interface FAQItem {
	summary: string;
	details: string;
}

export interface ContactData {
	titleMain: string;
	titleHighlight: string;
	subtitle: string;
	formCardTitle: string;
	formCardSub: string;
	faqs: FAQItem[];
	formFooter: string;
	clientId: string;
	submitText: string;
}

export const renderContact = (data: ContactData): string => {
	const faqHtml = data.faqs
		.map(
			(faq: FAQItem) => `
        <details class="group border-b border-black/10 py-4 cursor-pointer">
            <summary class="flex justify-between items-center list-none font-bold uppercase text-sm tracking-widest">
                <span>${faq.summary}</span>
                <span class="text-brand-primary transition-transform group-open:rotate-45">
                    <i data-lucide="plus" class="footer-icon"></i>
                </span>
            </summary>
            <p class="mt-4 text-sm text-gray-500 leading-relaxed">${faq.details}</p>
        </details>
    `,
		)
		.join("");

	return `
            <div class="component-heading-md">
                <div class="contact-heading">
                    <h2 class="component-heading-md-title">
                        ${data.titleMain} <span class="text-highlight-primary-italic">${data.titleHighlight}</span>
                    </h2>
                    <p class="component-heading-md-subtitle">${data.subtitle}</p>
                    <div class="heading-border"></div>
                </div>
                <div class="contact-form">
                    <div class="form-card">
                        <div class="flex-gap-2">
                            <h3 class="form-heading">${data.formCardTitle}</h3>
                            <p class="subtle-text">${data.formCardSub}</p>
                        </div>
                        <div class="flex flex-col border-t border-black/10">
                            ${faqHtml}
                        </div>
                        <div class="flex-gap-2">
                            <p class="subtle-text">${data.formFooter}</p>
                        </div>
                    </div>
                    <div class="p-8 md:p-12 lg:p-16 bg-gray-50 flex flex-col justify-center">
                        <form id="contact-form" data-client-id="${data.clientId}" class="flex flex-col gap-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div class="flex flex-col gap-1">
                                    <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Name</label>
                                    <input type="text" name="name" required placeholder="Full Name" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Email Address</label>
                                    <input type="email" name="email" required placeholder="email@domain.com" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Phone Number</label>
                                    <input type="tel" name="phone" placeholder="(512) 000-0000" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Inquiry Type</label>
                                    <select name="service" required class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none appearance-none cursor-pointer">
                                        <option value="" disabled selected>Select a service...</option>
                                        <option value="web-dev">Web Development</option>
                                        <option value="tech-mgmt">Tech Audits and Management</option>
                                        <option value="proj-dis">Project Discovery</option>
                                        <option value="custom">Custom Solutions</option>
                                        <option value="other">General Consulting / Other</option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-1 md:col-span-2">
                                    <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Project Description</label>
                                    <textarea name="message" rows="3" required placeholder="Brief description of your project and goals" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none"></textarea>
                                </div>
                            </div>
                            <button type="submit" id="submit-btn" class="w-50 mx-auto btn-primary-icon transition-all active:scale-95">${data.submitText}</button>
                        </form>
                    </div>
                </div>
            </div>
    `;
};

export interface ContactRow {
	href?: string;
	iconPath: string;
	text?: string;
	isHours?: boolean;
	hoursLines?: string[];
}

export interface LocationData {
	mapBadge: string;
	titleMain: string;
	titleHighlight: string;
	description: string;
	contactRows: ContactRow[];
}

export const renderLocation = (data: LocationData): string => {
	const rowsHtml = data.contactRows
		.map((row: ContactRow) => {
			const iconBox = `
            <span class="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${row.iconPath}
                </svg>
            </span>
        `;

			if (row.isHours) {
				return `
                <div class="contact-row">
                    ${iconBox}
                    <div class="hours-content">
                        ${row.hoursLines?.map((line: string) => `<p>${line}</p>`).join("")}
                    </div>
                </div>
            `;
			}

			return `
            <a href="${row.href}" class="contact-row">
                ${iconBox}
                <span class="contact-text">${row.text}</span>
            </a>
        `;
		})
		.join("");

	return `
            <div class="map-wrapper">
                <div id="map"></div>
                <div class="map-badge">${data.mapBadge}</div>
            </div>
            <div class="contact-details">
                <div class="contact-heading-block">
                    <h2 class="text-4xl md:text-5xl uppercase leading-[0.9] tracking-tighter">
                        ${data.titleMain} <br />
                        <span class="text-highlight-primary-italic">${data.titleHighlight}</span>
                    </h2>
                    <p class="text-gray-600 max-w-md text-sm md:text-base">${data.description}</p>
                </div>
                <div class="contact-links-list">
                    ${rowsHtml}
                </div>
            </div>
    `;
};

export const renderHistory = (data: any): string => {
	const timelineHtml = data.timeline
		.map(
			(item: any) => `
        <div class="timeline-date">${item.date}</div>
        <div class="flex-gap-4">
            <h3 class="text-xl">${item.heading}</h3>
            <p class="timeline-body">${item.body}</p>
        </div>
    `,
		)
		.join("");

	return `
        <div class="flex-gap-12">
            <div class="heading-border-l">
                <h2 class="component-heading-md-title">${data.title}</h2>
                <p class="component-heading-md-subtitle">${data.subtitle}</p>
            </div>

            <div class="timeline">
                ${timelineHtml}
            </div>
        </div>
    `;
};

export const renderMission = (data: any): string => {
	const valuesHtml = data.values
		.map(
			(val: any) => `
        <div class="mission-card">
            <div class="mission-card-icon">
                <i data-lucide="${val.icon}" class="w-10 h-10"></i>
            </div>
            <div class="flex-gap-2">
                <h3 class="mission-card-title">${val.title}</h3>
                <p class="mission-card-body">${val.body}</p>
            </div>
        </div>
    `,
		)
		.join("");

	return `
        <div class="centered-container">
            <div class="centered-heading">
                <h2 class="component-heading-lg-title">${data.title}</h2>
                <div class="heading-border-lg"></div>
            </div>

            <div class="quote-container">
                <p class="quote-text">
                    "${data.quote_main}
                    <span class="quote-highlight">${data.quote_highlight}</span>
                    ${data.quote_suffix}"
                </p>
            </div>

            <div class="mission-statement-grid">
                ${valuesHtml}
            </div>
        </div>
    `;
};

export const renderTeam = (data: any): string => {
	const socialsHtml = data.socials
		.map(
			(social: any) => `
        <a href="${social.url}" target="_blank" class="highlight-icon">
            <i data-lucide="${social.platform}" class="w-5 h-5"></i>
        </a>
    `,
		)
		.join("");

	const bioHtml = data.bioParagraphs
		.map(
			(p: string) => `
        <p>${p}</p>
    `,
		)
		.join("");

	return `
        <div class="centered-container">
            <div class="centered-heading">
                <h2 class="component-heading-md-title tracking-tighter text-black">
                    ${data.sectionTitle}
                </h2>
                <div class="heading-border"></div>
            </div>

            <div class="founder-grid">
                <div class="founder-sidebar">
                    <div class="headshot-wrapper">
                        <div class="headshot-glow"></div>
                        <div class="headshot-frame">
                            <img src="${data.headshot}" alt="${data.name} - Founder of cbeens.dev" />
                        </div>
                        <div class="location-badge">${data.location}</div>
                    </div>

                    <div class="social-links">
                        ${socialsHtml}
                    </div>
                </div>

                <div class="founder-bio">
                    <div class="bio-header">
                        <h3>${data.name}</h3>
                        <p>${data.title}</p>
                    </div>

                    <div class="bio-text">
                        ${bioHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const renderBenchmarks = (data: any): string => {
	const tableRows = data.rows
		.map(
			(row: any) => `
        <tr>
            <td>${row.metric}</td>
            <td>${row.cbeens}</td>
            <td>${row.agency}</td>
        </tr>
    `,
		)
		.join("");

	return `
        <div class="benchmarks-wrapper">
            <div class="benchmarks-header">
                <h2 class="component-heading-lg-title mb-4">
                    ${data.titlePrefix}
                    <span class="text-highlight-primary-italic">${data.titleHighlight}</span>
                    ${data.titleSuffix}
                </h2>
                <p class="text-gray-600 italic">
                    ${data.subtitle}
                </p>
            </div>

            <div class="table-responsive-wrapper">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            ${data.columns.map((col: string) => `<th>${col}</th>`).join("")}
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

export const renderHighlights = (data: any): string => {
	const highlightsHtml = data.highlights
		.map(
			(item: any) => `
        <div class="highlight-border-l">
            <h3 class="bold-text">${item.title}</h3>
            <p class="subtle-text">${item.body}</p>
        </div>
    `,
		)
		.join("");

	return `
        <div class="component-heading-md">
            <div class="flex-gap-4">
                <h2 class="component-heading-md-title">
                    ${data.titleMain}
                    <span class="text-highlight-primary-italic">${data.titleHighlight}</span>
                    ${data.titleSuffix}
                </h2>
                <p class="component-heading-md-subtitle">
                    ${data.subtitle}
                </p>
            </div>

            <div class="card-container">
                ${highlightsHtml}
            </div>
        </div>
    `;
};

export const renderProcess = (data: any): string => {
	const stepsHtml = data.steps
		.map(
			(step: any) => `
        <div class="process-card">
            <div class="${step.iconClass}">
                <i data-lucide="${step.icon}" class="w-8 h-8"></i>
            </div>
            <h3 class="process-card-heading">${step.heading}</h3>
            <p class="process-card-body">${step.body}</p>
        </div>
    `,
		)
		.join("");

	return `
        <div class="component-heading-md">
            <div class="flex-gap-2">
                <h2 class="component-heading-md-title">
                    ${data.titleMain}
                    <span class="text-highlight-primary-italic">${data.titleHighlight}</span>
                </h2>
                <p class="component-heading-md-subtitle">
                    ${data.subtitle}
                </p>
            </div>

            <div class="process-grid">
                ${stepsHtml}
            </div>
        </div>
    `;
};

export const renderNav = (data: any): string => {
	const linksHtml = data.links
		.map((l: any) => `<a href="${l.url}" class="nav-link">${l.label}</a>`)
		.join("");
	const ctasHtml = data.ctas
		.map(
			(c: any) => `
        <a href="${c.url}" class="${c.class}">
            <i data-lucide="${c.icon}" class="nav-icon"></i>
        </a>
    `,
		)
		.join("");

	return `
            <a href="/" class="nav-logo-wrapper">
                <img src="/src/assets/cbeens_logo_h.svg" alt="Logo" class="nav-logo" />
            </a>
            <div class="nav-right-side">
                <div class="nav-desktop-links">${linksHtml}</div>
                <button id="mobile-menu-toggle" class="nav-mobile-toggle"><i data-lucide="menu"></i></button>
                <div class="nav-cta-icons">${ctasHtml}</div>
            </div>
    `;
};

export const renderFooter = (data: any): string => {
	const currentYear = new Date().getFullYear();

	const socialsHtml = data.socials
		.map(
			(s: any) => `
        <a href="${s.url}" class="footer-icon-link" title="${s.title}" target="_blank" rel="noreferrer">
            ${getIcon(s.slug)}
        </a>
    `,
		)
		.join("");

	const legalHtml = data.legal
		.map(
			(l: any) => `
        <a href="${l.url}" class="nav-link text-xs">${l.label}</a>
    `,
		)
		.join("");

	return `
        <div class="footer-content-wrapper">
            <div class="footer-main-grid">
                <div class="flex justify-center md:justify-start md:order-1 order-3">
                    <a href="https://cbeens.dev" class="text-xs nav-link">
                        Built by <span class="font-bold uppercase">cbeens.dev</span>
                    </a>
                </div>

                <div class="flex flex-col items-center gap-3 order-1 md:order-1 text-center">
                    <img
                        src="/src/assets/cbeens_logo_h.svg"
                        alt="cbeens.dev Logo"
                        class="h-6 brightness-0 invert"
                    />
                    <p class="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                        &copy; ${currentYear} CBEENS.DEV ALL RIGHTS RESERVED
                    </p>
                </div>

                <div class="footer-socials order-2 md:order-3">
                    ${socialsHtml}
                </div>
            </div>

            <nav class="footer-legal-nav">
                ${legalHtml}
            </nav>
        </div>
    `;
};
