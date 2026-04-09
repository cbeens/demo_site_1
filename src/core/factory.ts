/**
 * Factory functions for rendering UI components as HTML strings.
 * Each function returns a fully composed section from provided schema data.
 */
import { getIcon } from "./iconRegistry";
import * as Schema from "../types/components";

/**
 * Renders the hero section with a background image and CTA.
 * @param data - Hero section data.
 * @returns HTML string for the hero section.
 */
export const renderHero = (data: Schema.HeroData): string => `
    <div class="relative min-h-[calc(100dvh-84px)] flex flex-col items-center justify-center px-8 py-20 text-center overflow-hidden">
        <div class="hero-background absolute inset-0 z-0">
            <img src="${data.bgImage}" alt="Background" class="w-full h-full object-cover opacity-15" />
            <div class="hero-bg-overlay absolute inset-0 bg-linear-to-b from-white via-transparent to-white"></div>
        </div>
        <div class="hero-content relative z-10 max-w-4xl mx-auto">
            <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                ${data.titleTop} <br /><span class="text-highlight">${data.titleHighlight}</span><br />${data.titleBottom}
            </h1>
            <div class="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-secondary/30 bg-brand-secondary/5 mb-8">
                <span class="text-xs font-bold tracking-widest text-brand-secondary">${data.badgeText}</span>
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                </span>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="${data.primaryCta.url}" class="btn-primary">${data.primaryCta.text}</a>
            </div>
        </div>
    </div>
`;

/**
 * Renders a grid of service cards.
 * @param data - Service grid content.
 * @returns HTML string for the service section.
 */
export const renderServiceGrid = (data: Schema.ServiceGridData): string => `
    <div class="container-max">
        <div class="mb-12">
            <h2 class="text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-4">
                ${data.headingMain} <span class="text-highlight">${data.headingHighlight}</span>
            </h2>
            <div class="heading-border"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${data.cards
				.map(
					(card) => `
                <div class="service-card">
                    <div class="flex justify-between items-start">
                        <div class="service-icon">
                            <i data-lucide="${card.icon}" class="w-10 h-10"></i>
                        </div>
                        ${card.price ? `<div class="service-price">${card.price}</div>` : ""}
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

/**
 * Renders the testimonial section with brand logos and quotes.
 * @param data - Testimonial section content.
 * @returns HTML string for testimonials.
 */
export const renderTestimonial = (data: Schema.TestimonialData): string => `
    <div class="container-max flex flex-col gap-16">
        <div class="flex flex-col items-center gap-8">
            <p class="text-gray-400 text-xs uppercase tracking-[0.4em]">${data.brandSubtitle}</p>
            <div class="brand-grid flex flex-wrap justify-center items-center gap-10 md:gap-16">
                ${data.brands
					.map(
						(brand) => `
                    <a href="${brand.url}" target="_blank" rel="noreferrer" class="flex flex-col items-center gap-2 transition-all duration-500 hover:scale-110">
                        <div class="service-icon w-10 h-10 ${brand.colorClass}">${getIcon(brand.slug)}</div>
                        <span class="text-[9px] uppercase tracking-widest text-gray-300">${brand.name}</span>
                    </a>
                `,
					)
					.join("")}
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="border-l-2 border-brand-secondary pl-8 flex flex-col gap-6">
                <p class="text-2xl md:text-3xl italic leading-relaxed text-white">"${data.quote}"</p>
                <div class="flex flex-col">
                    <span class="text-brand-primary font-bold uppercase tracking-widest">${data.author}</span>
                    <span class="text-gray-400 text-sm">${data.authorTitle}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                ${data.stats
					.map(
						(stat) => `
                    <div class="border border-white/10 p-8 flex flex-col items-center justify-center gap-2 hover:bg-white/15 transition-colors">
                        <span ${stat.id ? `id="${stat.id}"` : ""} class="text-4xl font-bold ${stat.color}">${stat.value}</span>
                        <span class="text-[10px] uppercase tracking-widest text-gray-400">${stat.label}</span>
                    </div>
                `,
					)
					.join("")}
            </div>
        </div>
    </div>
`;

/**
 * Renders the benchmark comparison table section.
 * @param data - Benchmark table definition.
 * @returns HTML string for the benchmark section.
 */
export const renderBenchmarks = (data: Schema.BenchmarksData): string => `
    <div class="container-max">
        <div class="text-center mb-10">
            <h2 class="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 text-black">
                ${data.titlePrefix} <span class="text-highlight">${data.titleHighlight}</span> ${data.titleSuffix}
            </h2>
            <p class="text-gray-600 italic">${data.subtitle}</p>
        </div>
        <div class="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead class="bg-black text-white">
                    <tr>
                        <th class="p-6 text-xs uppercase tracking-widest">${data.columns[0]}</th>
                        <th class="p-6 text-xs uppercase tracking-widest text-brand-secondary">${data.columns[1]}</th>
                        <th class="p-6 text-xs uppercase tracking-widest text-gray-400">${data.columns[2]}</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.rows
						.map(
							(row) => `
                        <tr class="border-b border-gray-100 last:border-0 text-black">
                            <td class="p-6 text-sm font-bold">${row.metric}</td>
                            <td class="p-6 text-sm text-brand-primary font-bold">${row.cbeens}</td>
                            <td class="p-6 text-sm text-gray-500">${row.agency}</td>
                        </tr>
                    `,
						)
						.join("")}
                </tbody>
            </table>
        </div>
    </div>
`;

/**
 * Renders the contact form section with FAQs.
 * @param data - Contact page data.
 * @returns HTML string for the contact section.
 */
export const renderContact = (data: Schema.ContactData): string => `
    <div class="container-max">
        <div class="mb-12">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.titleMain} <span class="text-highlight">${data.titleHighlight}</span></h2>
            <p class="text-gray-400 text-xs uppercase tracking-widest">${data.subtitle}</p>
            <div class="h-1 w-24 bg-brand-secondary mt-2"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div class="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-black flex flex-col gap-8 bg-white text-black">
                <div class="flex flex-col gap-2">
                    <h3 class="text-2xl font-bold uppercase tracking-tighter">${data.formCardTitle}</h3>
                    <p class="text-gray-400 text-sm">${data.formCardSub}</p>
                </div>
                <div class="flex flex-col border-black/10">
                    ${data.faqs
						.map(
							(faq) => `
                        <details class="group border-b border-black/10 py-4 cursor-pointer">
                            <summary class="flex justify-between items-center list-none font-bold uppercase text-sm tracking-widest">
                                <span>${faq.summary}</span>
                                <span class="text-brand-primary transition-transform group-open:rotate-45"><i data-lucide="plus"></i></span>
                            </summary>
                            <p class="mt-4 text-sm text-gray-500 leading-relaxed">${faq.details}</p>
                        </details>
                    `,
						)
						.join("")}
                </div>
            </div>
            <div class="p-8 md:p-12 lg:p-16 bg-gray-50 flex flex-col justify-center text-black">
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
                                <option value="web development">Web Development</option>
                                <option value="tech audits">Tech Audits and Management</option>
                                <option value="project discovery">Project Discovery</option>
                                <option value="AI orchestration">AI Orchestration</option>
                                <option value="general inquiries">General Consulting / Other</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 md:col-span-2">
                            <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Project Description</label>
                            <textarea name="message" rows="3" required placeholder="Brief description of your project" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none"></textarea>
                        </div>
                    </div>
                    <button type="submit" id="submit-btn" class="w-full btn-primary uppercase transition-all active:scale-95">${data.submitText}</button>
                </form>
            </div>
        </div>
    </div>
`;

/**
 * Renders the location section with embedded map and contact rows.
 * @param data - Location section content.
 * @returns HTML string for the location section.
 */
export const renderLocation = (data: Schema.LocationData): string => `
    <div class="border-t grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        <div class="relative w-full h-100 lg:h-full min-h-100 bg-gray-100 border-b lg:border-b-0 lg:border-r border-black">
            <div id="map" class="absolute inset-0 w-full h-full"></div>
            <div class="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest">${data.mapBadge}</div>
        </div>
        <div class="p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-8 bg-white text-black">
            <div class="flex flex-col gap-4">
                <h2 class="text-4xl md:text-5xl uppercase leading-[0.9] tracking-tighter">
                    ${data.titleMain} <br /><span class="text-highlight">${data.titleHighlight}</span>
                </h2>
                <p class="text-gray-600 max-w-md text-sm md:text-base">${data.description}</p>
            </div>
            <div class="flex flex-col gap-5">
                ${data.contactRows
					.map((row) => {
						const iconBox = `<span class="icon-box p-2.5 flex items-center justify-center shrink-0 transition-all duration-300 bg-gray-50 rounded-full border-2 border-black/5 group-hover:border-brand-primary group-hover:text-brand-primary group-hover:bg-brand-primary/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${row.iconPath}</svg>
                    </span>`;
						return row.isHours
							? `
                        <div class="flex items-center gap-4 border-b border-black/5 pb-4 transition-all duration-300 group">
                            ${iconBox}<div class="flex flex-col gap-1 text-sm uppercase tracking-tight text-gray-500">${row.hoursLines?.map((l) => `<p>${l}</p>`).join("")}</div>
                        </div>`
							: `
                        <a href="${row.url}" class="flex items-center gap-4 border-b border-black/5 pb-4 transition-all duration-300 group hover:border-brand-primary">
                            ${iconBox}<span class="font-bold text-base md:text-lg">${row.text}</span>
                        </a>`;
					})
					.join("")}
            </div>
        </div>
    </div>
`;

/**
 * Renders the corporate history timeline.
 * @param data - History timeline content.
 * @returns HTML string for the history section.
 */
export const renderHistory = (data: Schema.HistoryData): string => `
    <div class="container-max flex flex-col gap-12">
        <div class="heading-border-l">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.title}</h2>
            <p class="text-gray-400 text-xs uppercase tracking-[0.3em]">${data.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-start text-black">
            ${data.timeline
				.map(
					(item) => `
                <div class="text-sm pt-1 font-bold text-brand-primary">${item.date}</div>
                <div class="flex flex-col gap-4">
                    <h3 class="text-xl font-bold">${item.heading}</h3>
                    <p class="text-gray-500 leading-relaxed">${item.body}</p>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

/**
 * Renders the mission/value statement section.
 * @param data - Mission section content.
 * @returns HTML string for the mission section.
 */
export const renderMission = (data: Schema.MissionData): string => `
    <div class="container-max flex flex-col gap-10">
        <div class="flex flex-col items-center text-center gap-2">
            <h2 class="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">${data.title}</h2>
            <div class="h-1 w-32 bg-brand-secondary"></div>
        </div>
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-2xl italic leading-relaxed text-gray-400">
                "${data.quoteMain} <span class="text-brand-secondary font-bold not-italic">${data.quoteHighlight}</span> ${data.quoteSuffix}"
            </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            ${data.values
				.map(
					(val) => `
                <div class="border border-white/10 p-10 flex flex-col gap-6 transition-all duration-300 hover:bg-white/15 group">
                    <div class="text-brand-primary"><i data-lucide="${val.icon}" class="w-10 h-10"></i></div>
                    <div class="flex flex-col gap-2 text-left">
                        <h3 class="text-2xl font-bold uppercase tracking-widest text-brand-secondary">${val.title}</h3>
                        <p class="text-gray-400 leading-relaxed">${val.body}</p>
                    </div>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

/**
 * Renders the team member profile section.
 * @param data - Team section data.
 * @returns HTML string for the team section.
 */
export const renderTeam = (data: Schema.TeamData): string => `
    <div class="container-max flex flex-col gap-10">
        <div class="flex flex-col items-center text-center gap-2">
            <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-black">${data.sectionTitle}</h2>
            <div class="h-1 w-24 bg-brand-secondary"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-black">
            <div class="lg:col-span-4 flex flex-col gap-6 items-center">
                <div class="relative w-full max-w-50 group">
                    <div class="absolute -inset-1 bg-brand-primary/10 rounded-xl blur opacity-25"></div>
                    <div class="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm">
                        <img src="${data.headshot}" alt="${data.name}" class="w-full h-full object-cover rounded-lg grayscale transition-all duration-500 group-hover:grayscale-0" />
                    </div>
                    <div class="absolute -bottom-2 -right-2 bg-black text-white text-[9px] px-3 py-1.5 uppercase tracking-widest shadow-xl">${data.location}</div>
                </div>
                <div class="flex gap-8">
                    ${data.socials
						.map(
							(s) => `
                        <a href="${s.url}" target="_blank" class="text-gray-400 hover:text-brand-primary transition-all hover:scale-110">
                            <i data-lucide="${s.platform}" class="w-5 h-5"></i>
                        </a>
                    `,
						)
						.join("")}
                </div>
            </div>
            <div class="lg:col-span-8 flex flex-col gap-5 text-left">
                <div class="flex flex-col gap-1">
                    <h3 class="text-2xl font-bold text-brand-primary">${data.name}</h3>
                    <p class="text-xs uppercase tracking-widest text-gray-500">${data.title}</p>
                </div>
                <div class="flex flex-col gap-5 text-gray-700 text-sm leading-relaxed max-w-2xl">
                    ${data.bioParagraphs.map((p) => `<p>${p}</p>`).join("")}
                </div>
            </div>
        </div>
    </div>
`;

/**
 * Renders the highlights section with feature cards.
 * @param data - Highlights section content.
 * @returns HTML string for the highlights section.
 */
export const renderHighlights = (data: Schema.HighlightsData): string => `
    <div class="container-max flex flex-col gap-12">
        <div class="flex flex-col gap-4 text-left">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.titleMain} <span class="text-highlight">${data.titleHighlight}</span> ${data.titleSuffix}</h2>
            <p class="text-gray-400 text-xs uppercase tracking-[0.3em]">${data.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            ${data.highlights
				.map(
					(h) => `
                <div class="heading-border-l py-4">
                    <h3 class="font-bold mb-2 text-black">${h.title}</h3>
                    <p class="text-gray-400 text-sm">${h.body}</p>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

/**
 * Renders the process workflow section.
 * @param data - Process step definitions.
 * @returns HTML string for the process section.
 */
export const renderProcess = (data: Schema.ProcessData): string => `
    <div class="container-max flex flex-col gap-12">
        <div class="flex flex-col gap-2 text-left">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.titleMain} <span class="text-highlight">${data.titleHighlight}</span></h2>
            <p class="text-gray-400 text-xs uppercase tracking-[0.3em]">${data.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            ${data.steps
				.map(
					(s, index) => `
                <div class="p-8 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                    <div class="${index % 2 === 0 ? "text-brand-primary" : "text-brand-secondary"} mb-6">
                        <i data-lucide="${s.icon}" class="w-8 h-8"></i>
                    </div>
                    <h3 class="font-bold uppercase mb-3 text-black">${s.heading}</h3>
                    <p class="text-sm text-gray-500 leading-relaxed">${s.body}</p>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

/**
 * Renders the navigation bar for the current page.
 * @param data - Navigation links and call-to-action buttons.
 * @returns HTML string for the navigation section.
 */
export const renderNav = (data: Schema.NavData): string => `
    <nav class="w-full bg-black text-white flex items-center justify-between px-8 py-4 sticky top-0 z-50">
        <a href="/" class="shrink-0 hover:scale-110 cursor-pointer"><img src="/assets/cbeens_logo_h.svg" alt="Logo" class="h-8 -ml-4" /></a>
        <div class="flex items-center gap-6">
            <div class="hidden lg:flex gap-8 border-r border-white/20 pr-6">
                ${data.links.map((l) => `<a href="${l.url}" class="font-heading font-bold text-white hover:text-brand-secondary transition-colors">${l.label}</a>`).join("")}
            </div>
            <button id="mobile-menu-toggle" class="lg:hidden cursor-pointer p-2 text-white hover:text-brand-secondary transition-transform hover:scale-110"><i data-lucide="menu"></i></button>
            <div class="hidden md:flex items-center gap-4">
                ${data.ctas.map((c) => `<a href="${c.url}" class="${c.class === "btn-primary-icon" ? "btn-icon-primary" : "btn-icon-secondary"}"><i data-lucide="${c.icon}" class="w-5 h-5"></i></a>`).join("")}
            </div>
        </div>
        <div id="mobile-drawer" class="fixed inset-0 top-21 bg-white z-40 translate-x-full transition-transform duration-300 ease-in-out lg:hidden">
            <div class="flex flex-col p-8 gap-2">
                ${data.links.map((l) => `<a href="${l.url}" class="text-xl font-heading font-bold p-4 text-black border-b border-black/10 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors">${l.label}</a>`).join("")}
                <div class="flex flex-col gap-4 mt-8 md:hidden">
                    <a href="mailto:${data.contacts.email}" class="btn-primary flex items-center justify-center gap-3"><i data-lucide="mail"></i> Email Us</a>
                </div>
            </div>
        </div>
    </nav>
`;

/**
 * Renders the global footer section.
 * @param data - Footer links, social icons, and legal items.
 * @returns HTML string for the footer section.
 */
export const renderFooter = (data: Schema.FooterData): string => {
	const currentYear = new Date().getFullYear();
	return `
        <footer class="w-full bg-black text-white px-8 py-10 border-t border-brand-primary/20">
            <div class="container-max flex flex-col gap-8">
                <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-8 w-full">
                    <div class="flex justify-center md:justify-start md:order-1 order-3">
                        <a href="https://cbeens.dev" class="text-xs text-gray-500 hover:text-white hover:scale-105 transition-all font-heading font-bold">
                            Built by <span class="font-bold uppercase">cbeens.dev</span>
                        </a>
                    </div>
                    <div class="flex flex-col items-center gap-3 order-1 md:order-1 text-center">
                        <img src="/assets/cbeens_logo_h.svg" alt="Logo" class="h-6 brightness-0 invert" />
                        <p class="text-[10px] text-gray-500 tracking-[0.2em] uppercase">&copy; ${currentYear} CBEENS.DEV, ALL RIGHTS RESERVED</p>
                    </div>
                    <div class="flex justify-center md:justify-end items-center gap-4 order-2 md:order-3">
                        ${data.socials
							.map(
								(s) => `
                            <a href="${s.url}" class="footer-icon-link" title="${s.title}" target="_blank" rel="noreferrer">
                                ${getIcon(s.slug)}
                            </a>
                        `,
							)
							.join("")}
                    </div>
                </div>
                <nav class="border-t border-white/10 pt-6 flex justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    ${data.legal.map((l) => `<a href="${l.url}" class="hover:text-white hover:scale-105 transition-all font-heading font-bold">${l.label}</a>`).join("")}
                </nav>
            </div>
        </footer>
    `;
};

/**
 * Renders a simple 404 error page.
 * @returns HTML string for the not-found page.
 */
export const renderErrorPage = (): string => `
    <section class="flex flex-col items-center justify-center flex-1 min-h-[70vh]">
        <div class="text-center">
             <h1 class="text-[12rem] md:text-[18rem] font-black text-brand-primary/10 tracking-tighter leading-none select-none">404</h1>
             <div class="relative -mt-20 md:-mt-32">
                 <h2 class="text-4xl md:text-6xl uppercase font-black tracking-tighter text-black">WHOOPS!</h2>
                 <p class="text-gray-400 text-sm mt-4 uppercase tracking-[0.3em]">This page does not exist.</p>
             </div>
        </div>
    </section>
`;

/**
 * Renders the chat launcher and chat window markup.
 * @returns HTML string for the chat UI.
 */
export const renderChat = (): string => `
    <button id="chat-trigger" class="btn-icon-primary fixed bottom-24 right-8 z-50 shadow-2xl transition-transform active:scale-95">
        <i data-lucide="message-square" class="w-6 h-6"></i>
    </button>

    <div id="chat-window" class="fixed bottom-32 right-8 w-[90vw] md:w-100 h-125 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col translate-y-12 opacity-0 pointer-events-none transition-all duration-300">
        
        <div class="bg-black text-white p-4 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden border border-brand-secondary/30">
                    <img src="/assets/cbeens_dougg_icon.svg" alt="Dougg" class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-xs font-black uppercase tracking-widest leading-none">Dougg</p>
                    <p class="text-[10px] text-brand-secondary uppercase tracking-tighter">WE from planet US</p>
                </div>
            </div>
            <button id="chat-close" class="hover:text-brand-secondary hover:scale-110 hover:cursor-pointer transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50/50">
            <div class="ai-msg">
                Greetings. I am Dougg. How can I assist your terrestrial mission today?
            </div>
        </div>

        <form id="chat-form" class="p-4 border-t border-black/10 bg-white flex gap-2">
            <input type="text" id="chat-input" placeholder="Ask Dougg anything..." class="flex-1 bg-gray-100 border-b border-black p-2 text-sm focus:outline-none focus:border-brand-primary text-black" />
            <button type="submit" class="text-brand-primary hover:scale-110 transition-transform">
                <i data-lucide="send" class="w-5 h-5"></i>
            </button>
        </form>
    </div>
`;
