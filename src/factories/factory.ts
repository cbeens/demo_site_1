import { getIcon } from "../core/iconRegistry";
import * as Schema from "../types/components";

export const renderHero = (data: Schema.HeroData): string => `
    <div class="relative min-h-[calc(100dvh-84px)] flex flex-col items-center justify-center px-8 py-20 text-center overflow-hidden">
        <div class="hero-background absolute inset-0 z-0">
            <img src="${data.bg_image}" alt="Background" class="w-full h-full object-cover opacity-15" />
            <div class="hero-bg-overlay absolute inset-0 bg-linear-to-b from-white via-transparent to-white"></div>
        </div>
        <div class="hero-content relative z-10 max-w-4xl mx-auto">
            <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                ${data.title_top} <br /><span class="text-highlight">${data.title_highlight}</span><br />${data.title_bottom}
            </h1>
            <div class="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-secondary/30 bg-brand-secondary/5 mb-8">
                <span class="text-xs font-bold tracking-widest text-brand-secondary">${data.badge_text}</span>
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                </span>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="${data.primary_cta.link}" class="btn-primary">${data.primary_cta.text}</a>
                <a href="${data.secondary_cta.link}" class="btn-secondary">${data.secondary_cta.text}</a>
            </div>
        </div>
    </div>
`;

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
                <div class="service-card ${card.groupClass || ""}">
                    <div class="flex justify-between items-start">
                        <div class="service-icon text-brand-primary transition-colors">
                            <i data-lucide="${card.icon}" class="w-10 h-10"></i>
                        </div>
                        ${card.price ? `<div class="text-xl font-bold transition-colors text-black">${card.price}</div>` : ""}
                    </div>
                    <h3 class="text-2xl uppercase transition-colors text-black">${card.title}</h3>
                    <p class="service-body transition-colors text-gray-500">${card.body}</p>
                    <div class="service-footer mt-auto text-[10px] uppercase tracking-widest text-brand-primary transition-colors">${card.footer}</div>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

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

export const renderContact = (data: Schema.ContactData): string => `
    <div class="container-max">
        <div class="mb-12">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.titleMain} <span class="text-highlight">${data.titleHighlight}</span></h2>
            <p class="text-gray-400 text-xs uppercase tracking-widest">${data.subtitle}</p>
            <div class="h-1 w-24 bg-brand-secondary mt-2"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 border-2 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div class="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-black flex flex-col gap-8 bg-white">
                <div class="flex flex-col gap-2">
                    <h3 class="text-2xl font-bold uppercase tracking-tighter text-black">${data.formCardTitle}</h3>
                    <p class="text-gray-400 text-sm">${data.formCardSub}</p>
                </div>
                <div class="flex flex-col border-t border-black/10">
                    ${data.faqs
						.map(
							(faq) => `
                        <details class="group border-b border-black/10 py-4 cursor-pointer">
                            <summary class="flex justify-between items-center list-none font-bold uppercase text-sm tracking-widest text-black">
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
            <div class="p-8 md:p-12 lg:p-16 bg-gray-50 flex flex-col justify-center">
                <form id="contact-form" data-client-id="${data.clientId}" class="flex flex-col gap-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div class="flex flex-col gap-1">
                            <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Name</label>
                            <input type="text" name="name" required placeholder="Full Name" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none text-black" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Email Address</label>
                            <input type="email" name="email" required placeholder="email@domain.com" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none text-black" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Phone Number</label>
                            <input type="tel" name="phone" placeholder="(512) 000-0000" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none text-black" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="font-bold text-[10px] uppercase tracking-widest text-gray-400">Inquiry Type</label>
                            <select name="service" required class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none appearance-none cursor-pointer text-black">
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
                            <textarea name="message" rows="3" required placeholder="Brief description of your project" class="border-b border-black bg-transparent p-2 text-sm focus:border-brand-primary focus:outline-none text-black"></textarea>
                        </div>
                    </div>
                    <button type="submit" id="submit-btn" class="w-full btn-primary uppercase transition-all active:scale-95">${data.submitText}</button>
                </form>
            </div>
        </div>
    </div>
`;

export const renderLocation = (data: Schema.LocationData): string => `
    <div class="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        <div class="relative w-full h-100 lg:h-full min-h-100 bg-gray-100 border-b lg:border-b-0 lg:border-r border-black">
            <div id="map" class="absolute inset-0 w-full h-full"></div>
            <div class="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest">${data.mapBadge}</div>
        </div>
        <div class="p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-8 bg-white">
            <div class="flex flex-col gap-4">
                <h2 class="text-4xl md:text-5xl uppercase leading-[0.9] tracking-tighter text-black">
                    ${data.titleMain} <br /><span class="text-highlight">${data.titleHighlight}</span>
                </h2>
                <p class="text-gray-600 max-w-md text-sm md:text-base">${data.description}</p>
            </div>
            <div class="flex flex-col gap-5">
                ${data.contactRows
					.map((row) => {
						const iconBox = `<span class="icon-box p-2.5 flex items-center justify-center shrink-0 transition-all duration-300 bg-gray-50 rounded-full border-2 border-black/5 text-black group-hover:border-brand-primary group-hover:text-brand-primary group-hover:bg-brand-primary/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${row.iconPath}</svg>
                    </span>`;
						return row.isHours
							? `
                        <div class="flex items-center gap-4 border-b border-black/5 pb-4 transition-all duration-300 group">
                            ${iconBox}<div class="flex flex-col gap-1 text-sm uppercase tracking-tight text-gray-500">${row.hoursLines?.map((l) => `<p>${l}</p>`).join("")}</div>
                        </div>`
							: `
                        <a href="${row.href}" class="flex items-center gap-4 border-b border-black/5 pb-4 transition-all duration-300 group hover:border-brand-primary">
                            ${iconBox}<span class="font-bold text-base md:text-lg text-black">${row.text}</span>
                        </a>`;
					})
					.join("")}
            </div>
        </div>
    </div>
`;

export const renderHistory = (data: Schema.HistoryData): string => `
    <div class="container-max flex flex-col gap-12">
        <div class="heading-border-l">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.title}</h2>
            <p class="text-gray-400 text-xs uppercase tracking-[0.3em]">${data.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-start">
            ${data.timeline
				.map(
					(item) => `
                <div class="text-sm pt-1 font-bold text-brand-primary">${item.date}</div>
                <div class="flex flex-col gap-4">
                    <h3 class="text-xl font-bold text-black">${item.heading}</h3>
                    <p class="text-gray-500 leading-relaxed">${item.body}</p>
                </div>
            `,
				)
				.join("")}
        </div>
    </div>
`;

export const renderMission = (data: Schema.MissionData): string => `
    <div class="container-max flex flex-col gap-10">
        <div class="flex flex-col items-center text-center gap-2">
            <h2 class="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">${data.title}</h2>
            <div class="h-1 w-32 bg-brand-secondary"></div>
        </div>
        <div class="max-w-4xl mx-auto text-center">
            <p class="text-2xl italic leading-relaxed text-gray-400">
                "${data.quote_main} <span class="text-brand-secondary font-bold not-italic">${data.quote_highlight}</span> ${data.quote_suffix}"
            </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${data.values
				.map(
					(val) => `
                <div class="border border-white/10 p-10 flex flex-col gap-6 transition-all duration-300 hover:bg-white/15 group">
                    <div class="text-brand-primary transition-colors"><i data-lucide="${val.icon}" class="w-10 h-10"></i></div>
                    <div class="flex flex-col gap-2">
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

export const renderTeam = (data: Schema.TeamData): string => `
    <div class="container-max flex flex-col gap-10">
        <div class="flex flex-col items-center text-center gap-2">
            <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-black">${data.sectionTitle}</h2>
            <div class="h-1 w-24 bg-brand-secondary"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
            <div class="lg:col-span-8 flex flex-col gap-5">
                <div class="flex flex-col gap-1 text-black">
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

export const renderHighlights = (data: Schema.HighlightsData): string => `
    <div class="container-max flex flex-col gap-12">
        <div class="flex flex-col gap-4">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.titleMain} <span class="text-highlight">${data.titleHighlight}</span> ${data.titleSuffix}</h2>
            <p class="text-gray-400 text-xs uppercase tracking-[0.3em]">${data.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
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

export const renderProcess = (data: Schema.ProcessData): string => `
    <div class="container-max flex flex-col gap-12">
        <div class="flex flex-col gap-2">
            <h2 class="text-3xl md:text-5xl font-bold uppercase text-black">${data.titleMain} <span class="text-highlight">${data.titleHighlight}</span></h2>
            <p class="text-gray-400 text-xs uppercase tracking-[0.3em]">${data.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${data.steps
				.map(
					(s, index) => `
                <div class="p-8 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                    <div class="${index % 2 === 0 ? "text-brand-primary" : "text-brand-secondary"} mb-6 transition-colors">
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

export const renderNav = (data: Schema.NavData): string => `
    <nav class="w-full bg-black text-white flex items-center justify-between px-8 py-4 sticky top-0 z-50">
        <a href="/" class="shrink-0"><img src="/src/assets/cbeens_logo_h.svg" alt="Logo" class="h-8 -ml-4" /></a>
        <div class="flex items-center gap-6">
            <div class="hidden lg:flex gap-8 border-r border-white/20 pr-6">
                ${data.links.map((l) => `<a href="${l.url}" class="font-heading font-bold text-white hover:text-brand-secondary transition-colors">${l.label}</a>`).join("")}
            </div>
            <button id="mobile-menu-toggle" class="lg:hidden cursor-pointer p-2 text-white hover:text-brand-secondary transition-transform hover:scale-110"><i data-lucide="menu"></i></button>
            <div class="hidden md:flex items-center gap-4">
                ${data.ctas.map((c) => `<a href="${c.link}" class="${c.class === "btn-primary-icon" ? "btn-icon-primary" : "btn-icon-secondary"}"><i data-lucide="${c.icon}" class="w-5 h-5"></i></a>`).join("")}
            </div>
        </div>
        <div id="mobile-drawer" class="fixed inset-0 top-21 bg-white z-40 translate-x-full transition-transform duration-300 ease-in-out lg:hidden">
            <div class="flex flex-col p-8 gap-2">
                ${data.links.map((l) => `<a href="${l.url}" class="text-xl font-heading font-bold p-4 text-black border-b border-black/10 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors">${l.label}</a>`).join("")}
                <div class="flex flex-col gap-4 mt-8 md:hidden">
                    <a href="tel:+15120000000" class="btn-primary flex items-center justify-center gap-3 text-white"><i data-lucide="phone"></i> Call Now</a>
                    <a href="mailto:info@cbeens.dev" class="btn-secondary flex items-center justify-center gap-3"><i data-lucide="mail"></i> Email Us</a>
                </div>
            </div>
        </div>
    </nav>
`;

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
                        <img src="/src/assets/cbeens_logo_h.svg" alt="Logo" class="h-6 brightness-0 invert" />
                        <p class="text-[10px] text-gray-500 tracking-[0.2em] uppercase">&copy; ${currentYear} CBEENS.DEV ALL RIGHTS RESERVED</p>
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
