import { getIcon } from "../core/iconRegistry";
import * as Schema from "../types/components";

export const renderHero = (data: Schema.HeroData): string => `
    <div class="hero-background">
        <img src="${data.bg_image}" alt="Background" class="hero-bg-image" />
        <div class="hero-bg-overlay"></div>
    </div>
    <div class="hero-content">
        <h1 class="hero-title">${data.title_top} <br /><span class="text-highlight-primary-italic">${data.title_highlight}</span><br />${data.title_bottom}</h1>
        <div class="hero-badge">
            <span class="badge-text">${data.badge_text}</span>
            <span class="badge-ping-wrapper"><span class="badge-ping"></span><span class="badge-dot"></span></span>
        </div>
        <div class="hero-actions">
            <a href="${data.primary_cta.link}" class="btn-primary">${data.primary_cta.text}</a>
            <a href="${data.secondary_cta.link}" class="btn-secondary">${data.secondary_cta.text}</a>
        </div>
    </div>
`;

export const renderServiceGrid = (data: Schema.ServiceGridData): string => `
    <div class="service-grid">
        <div class="service-grid-heading">
            <h2 class="service-grid-heading-title">${data.headingMain} <span class="text-highlight-primary-italic">${data.headingHighlight}</span></h2>
            <div class="heading-border"></div>
        </div>
        <div class="card-container">
            ${data.cards
				.map(
					(card) => `
                <div class="service-card ${card.groupClass || ""}">
                    <div class="service-heading">
                        <div class="service-heading-left"><i data-lucide="${card.icon}" class="service-icon"></i></div>
                        ${card.price ? `<div class="service-heading-right">${card.price}</div>` : ""}
                    </div>
                    <h3 class="service-title">${card.title}</h3>
                    <p class="service-body">${card.body}</p>
                    <div class="service-footer">${card.footer}</div>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

export const renderTestimonial = (data: Schema.TestimonialData): string => `
    <div class="testimonial-content-wrapper">
        <div class="brand-section">
            <p class="component-heading-md-subtitle tracking-[0.4em]">${data.brandSubtitle}</p>
            <div class="brand-grid">
                ${data.brands
					.map(
						(brand) => `
                    <a href="${brand.url}" target="_blank" rel="noreferrer" class="brand-link">
                        <div class="service-icon ${brand.colorClass}">${getIcon(brand.slug)}</div>
                        <span>${brand.name}</span>
                    </a>
                `,
					)
					.join("")}
            </div>
        </div>
        <div class="testimonial-grid">
            <div class="testimonial-quote-block">
                <p class="quote-text">"${data.quote}"</p>
                <div class="quote-attribution">
                    <span class="text-highlight-primary-bold uppercase tracking-widest">${data.author}</span>
                    <span class="subtle-text">${data.authorTitle}</span>
                </div>
            </div>
            <div class="stat-grid">
                ${data.stats
					.map(
						(stat) => `
                    <div class="stat-card">
                        <span ${stat.id ? `id="${stat.id}"` : ""} class="stat-value ${stat.color}">${stat.value}</span>
                        <span class="stat-label">${stat.label}</span>
                    </div>
                `,
					)
					.join("")}
            </div>
        </div>
    </div>
`;

export const renderHistory = (data: Schema.HistoryData): string => `
    <div class="flex-gap-12">
        <div class="heading-border-l">
            <h2 class="component-heading-md-title">${data.title}</h2>
            <p class="component-heading-md-subtitle">${data.subtitle}</p>
        </div>
        <div class="timeline">
            ${data.timeline
				.map(
					(item) => `
                <div class="timeline-date">${item.date}</div>
                <div class="flex-gap-4">
                    <h3 class="text-xl">${item.heading}</h3>
                    <p class="timeline-body">${item.body}</p>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

export const renderMission = (data: Schema.MissionData): string => `
    <div class="centered-container">
        <div class="centered-heading">
            <h2 class="component-heading-lg-title">${data.title}</h2>
            <div class="heading-border-lg"></div>
        </div>
        <div class="quote-container">
            <p class="quote-text">"${data.quote_main} <span class="quote-highlight">${data.quote_highlight}</span> ${data.quote_suffix}"</p>
        </div>
        <div class="mission-statement-grid">
            ${data.values
				.map(
					(val) => `
                <div class="mission-card">
                    <div class="mission-card-icon"><i data-lucide="${val.icon}" class="w-10 h-10"></i></div>
                    <div class="flex-gap-2">
                        <h3 class="mission-card-title">${val.title}</h3>
                        <p class="mission-card-body">${val.body}</p>
                    </div>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

export const renderTeam = (data: Schema.TeamData): string => `
    <div class="centered-container">
        <div class="centered-heading">
            <h2 class="component-heading-md-title tracking-tighter text-black">${data.sectionTitle}</h2>
            <div class="heading-border"></div>
        </div>
        <div class="founder-grid">
            <div class="founder-sidebar">
                <div class="headshot-wrapper">
                    <div class="headshot-glow"></div>
                    <div class="headshot-frame"><img src="${data.headshot}" alt="${data.name}" /></div>
                    <div class="location-badge">${data.location}</div>
                </div>
                <div class="social-links">
                    ${data.socials.map((s) => `<a href="${s.url}" target="_blank" class="highlight-icon"><i data-lucide="${s.platform}" class="w-5 h-5"></i></a>`).join("")}
                </div>
            </div>
            <div class="founder-bio">
                <div class="bio-header"><h3>${data.name}</h3><p>${data.title}</p></div>
                <div class="bio-text">${data.bioParagraphs.map((p) => `<p>${p}</p>`).join("")}</div>
            </div>
        </div>
    </div>
`;

export const renderBenchmarks = (data: Schema.BenchmarksData): string => `
    <div class="benchmarks-wrapper">
        <div class="benchmarks-header">
            <h2 class="component-heading-lg-title mb-4">${data.titlePrefix} <span class="text-highlight-primary-italic">${data.titleHighlight}</span> ${data.titleSuffix}</h2>
            <p class="text-gray-600 italic">${data.subtitle}</p>
        </div>
        <div class="table-responsive-wrapper">
            <table class="comparison-table">
                <thead><tr>${data.columns.map((col) => `<th>${col}</th>`).join("")}</tr></thead>
                <tbody>
                    ${data.rows.map((row) => `<tr><td>${row.metric}</td><td>${row.cbeens}</td><td>${row.agency}</td></tr>`).join("")}
                </tbody>
            </table>
        </div>
    </div>
`;

export const renderHighlights = (data: Schema.HighlightsData): string => `
    <div class="component-heading-md">
        <div class="flex-gap-4">
            <h2 class="component-heading-md-title">${data.titleMain} <span class="text-highlight-primary-italic">${data.titleHighlight}</span> ${data.titleSuffix}</h2>
            <p class="component-heading-md-subtitle">${data.subtitle}</p>
        </div>
        <div class="card-container">
            ${data.highlights.map((h) => `<div class="highlight-border-l"><h3 class="bold-text">${h.title}</h3><p class="subtle-text">${h.body}</p></div>`).join("")}
        </div>
    </div>
`;

export const renderProcess = (data: Schema.ProcessData): string => `
    <div class="component-heading-md">
        <div class="flex-gap-2">
            <h2 class="component-heading-md-title">${data.titleMain} <span class="text-highlight-primary-italic">${data.titleHighlight}</span></h2>
            <p class="component-heading-md-subtitle">${data.subtitle}</p>
        </div>
        <div class="process-grid">
            ${data.steps
				.map(
					(s) => `
                <div class="process-card">
                    <div class="${s.iconClass}"><i data-lucide="${s.icon}" class="w-8 h-8"></i></div>
                    <h3 class="process-card-heading">${s.heading}</h3>
                    <p class="process-card-body">${s.body}</p>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

export const renderContact = (data: Schema.ContactData): string => `
    <div class="component-heading-md">
        <div class="contact-heading">
            <h2 class="component-heading-md-title">${data.titleMain} <span class="text-highlight-primary-italic">${data.titleHighlight}</span></h2>
            <p class="component-heading-md-subtitle">${data.subtitle}</p>
            <div class="heading-border"></div>
        </div>
        <div class="contact-form">
            <div class="form-card">
                <div class="flex-gap-2"><h3 class="form-heading">${data.formCardTitle}</h3><p class="subtle-text">${data.formCardSub}</p></div>
                <div class="flex flex-col border-t border-black/10">
                    ${data.faqs
						.map(
							(faq) => `
                        <details class="group border-b border-black/10 py-4 cursor-pointer">
                            <summary class="flex justify-between items-center list-none font-bold uppercase text-sm tracking-widest">
                                <span>${faq.summary}</span>
                                <span class="text-brand-primary transition-transform group-open:rotate-45"><i data-lucide="plus" class="footer-icon"></i></span>
                            </summary>
                            <p class="mt-4 text-sm text-gray-500 leading-relaxed">${faq.details}</p>
                        </details>
                    `,
						)
						.join("")}
                </div>
                <div class="flex-gap-2"><p class="subtle-text">${data.formFooter}</p></div>
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
                    </div>
                    <button type="submit" id="submit-btn" class="w-50 mx-auto btn-primary-icon transition-all active:scale-95">${data.submitText}</button>
                </form>
            </div>
        </div>
    </div>
`;

export const renderLocation = (data: Schema.LocationData): string => `
    <div class="map-wrapper"><div id="map"></div><div class="map-badge">${data.mapBadge}</div></div>
    <div class="contact-details">
        <div class="contact-heading-block">
            <h2 class="text-4xl md:text-5xl uppercase leading-[0.9] tracking-tighter">${data.titleMain} <br /><span class="text-highlight-primary-italic">${data.titleHighlight}</span></h2>
            <p class="text-gray-600 max-w-md text-sm md:text-base">${data.description}</p>
        </div>
        <div class="contact-links-list">
            ${data.contactRows
				.map((row) => {
					const iconBox = `<span class="icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${row.iconPath}</svg></span>`;
					return row.isHours
						? `<div class="contact-row">${iconBox}<div class="hours-content">${row.hoursLines?.map((l) => `<p>${l}</p>`).join("")}</div></div>`
						: `<a href="${row.href}" class="contact-row">${iconBox}<span class="contact-text">${row.text}</span></a>`;
				})
				.join("")}
        </div>
    </div>
`;

export const renderNav = (data: Schema.NavData): string => `
    <a href="/" class="nav-logo-wrapper"><img src="/src/assets/cbeens_logo_h.svg" alt="Logo" class="nav-logo" /></a>
    <div class="nav-right-side">
        <div class="nav-desktop-links">${data.links.map((l) => `<a href="${l.url}" class="nav-link">${l.label}</a>`).join("")}</div>
        <button id="mobile-menu-toggle" class="nav-mobile-toggle"><i data-lucide="menu"></i></button>
        <div class="nav-cta-icons">
            ${data.ctas.map((c) => `<a href="${c.link}" class="${c.class}"><i data-lucide="${c.icon}" class="nav-icon"></i></a>`).join("")}
        </div>
    </div>
    <div id="mobile-drawer" class="mobile-drawer translate-x-full">
        <div class="drawer-content">
            ${data.links.map((l) => `<a href="${l.url}" class="drawer-link">${l.label}</a>`).join("")}
            <div class="drawer-cta-wrapper">
                <a href="tel:+15120000000" class="btn-primary flex items-center justify-center gap-3"><i data-lucide="phone"></i> Call Now</a>
                <a href="mailto:info@cbeens.dev" class="btn-secondary flex items-center justify-center gap-3"><i data-lucide="mail"></i> Email Us</a>
            </div>
        </div>
    </div>
`;

export const renderFooter = (data: Schema.FooterData): string => {
	const currentYear = new Date().getFullYear();
	return `
        <div class="footer-content-wrapper">
            <div class="footer-main-grid">
                <div class="flex justify-center md:justify-start md:order-1 order-3"><a href="https://cbeens.dev" class="text-xs nav-link">Built by <span class="font-bold uppercase">cbeens.dev</span></a></div>
                <div class="flex flex-col items-center gap-3 order-1 md:order-1 text-center">
                    <img src="/src/assets/cbeens_logo_h.svg" alt="Logo" class="h-6 brightness-0 invert" />
                    <p class="text-[10px] text-gray-500 tracking-[0.2em] uppercase">&copy; ${currentYear} CBEENS.DEV ALL RIGHTS RESERVED</p>
                </div>
                <div class="footer-socials order-2 md:order-3">
                    ${data.socials.map((s) => `<a href="${s.url}" class="footer-icon-link" title="${s.title}" target="_blank" rel="noreferrer">${getIcon(s.slug)}</a>`).join("")}
                </div>
            </div>
            <nav class="footer-legal-nav">${data.legal.map((l) => `<a href="${l.url}" class="nav-link">${l.label}</a>`).join("")}</nav>
        </div>
    `;
};

export const renderErrorPage = (): string => `
    <section class="flex flex-col items-center justify-center flex-1 min-h-[70vh]">
        <div class="text-center">
             <h1 class="text-[12rem] md:text-[18rem] font-black text-brand-primary/10 tracking-tighter leading-none select-none">
                404
             </h1>
             <div class="relative -mt-20 md:-mt-32">
                 <h2 class="text-4xl md:text-6xl uppercase font-black tracking-tighter text-black">
                    WHOOPS!
                 </h2>
                 <p class="subtle-text mt-4 uppercase tracking-[0.3em]">
                    This page does not exist.
                 </p>
             </div>
        </div>
    </section>
`;
