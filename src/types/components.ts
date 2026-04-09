/**
 * A call-to-action item for buttons and links.
 */
export interface CTA {
	text: string;
	url: string;
	class?: string;
	icon?: string;
}

/**
 * Navigation bar data structure.
 */
export interface NavData {
	links: { label: string; url: string }[];
	ctas: CTA[];
	contacts: {
		email: string;
		phone: string;
	};
}

/**
 * Footer section model containing social links and legal navigation.
 */
export interface FooterData {
	socials: { slug: string; url: string; title: string }[];
	legal: { label: string; url: string }[];
}

/**
 * Hero section data structure.
 */
export interface HeroData {
	bgImage: string;
	titleTop: string;
	titleHighlight: string;
	titleBottom: string;
	badgeText: string;
	primaryCta: CTA;
	secondaryCta?: CTA;
}

/**
 * Single service card item.
 */
export interface ServiceCard {
	title: string;
	icon: string;
	body: string;
	footer: string;
	price?: string;
}

/**
 * Data for the service grid section.
 */
export interface ServiceGridData {
	headingMain: string;
	headingHighlight: string;
	cards: ServiceCard[];
}

/**
 * Testimonial section content and brand references.
 */
export interface TestimonialData {
	brandSubtitle: string;
	brands: { name: string; slug: string; url: string; colorClass: string }[];
	quote: string;
	author: string;
	authorTitle: string;
	stats: { label: string; value: string; color: string; id?: string }[];
}

/**
 * Contact section fields and FAQ support.
 */
export interface ContactData {
	titleMain: string;
	titleHighlight: string;
	subtitle: string;
	formCardTitle: string;
	formCardSub: string;
	faqs: { summary: string; details: string }[];
	formFooter: string;
	clientId: string;
	submitText: string;
}

/**
 * Location section content for map and contacts.
 */
export interface LocationData {
	mapBadge: string;
	titleMain: string;
	titleHighlight: string;
	description: string;
	contactRows: {
		url?: string;
		iconPath: string;
		text?: string;
		isHours?: boolean;
		hoursLines?: string[];
	}[];
}

/**
 * Corporate history timeline data.
 */
export interface HistoryData {
	title: string;
	subtitle: string;
	timeline: { date: string; heading: string; body: string }[];
}

/**
 * Mission section copy and value blocks.
 */
export interface MissionData {
	title: string;
	quoteMain: string;
	quoteHighlight: string;
	quoteSuffix: string;
	values: { icon: string; title: string; body: string }[];
}

/**
 * Team section member profile data.
 */
export interface TeamData {
	sectionTitle: string;
	name: string;
	title: string;
	headshot: string;
	location: string;
	socials: { platform: string; url: string }[];
	bioParagraphs: string[];
}

/**
 * Benchmark comparison table data.
 */
export interface BenchmarksData {
	titlePrefix: string;
	titleHighlight: string;
	titleSuffix: string;
	subtitle: string;
	columns: string[];
	rows: { metric: string; cbeens: string; agency: string }[];
}

/**
 * Highlights section data.
 */
export interface HighlightsData {
	titleMain: string;
	titleHighlight: string;
	titleSuffix: string;
	subtitle: string;
	highlights: { title: string; body: string }[];
}

/**
 * Process section step-by-step story model.
 */
export interface ProcessData {
	titleMain: string;
	titleHighlight: string;
	subtitle: string;
	steps: { icon: string; iconClass: string; heading: string; body: string }[];
}
