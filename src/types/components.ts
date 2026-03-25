export interface CTA {
	text: string;
	link: string;
	class?: string;
	icon?: string;
}

export interface NavData {
	links: { label: string; url: string }[];
	ctas: CTA[];
}

export interface FooterData {
	socials: { slug: string; url: string; title: string }[];
	legal: { label: string; url: string }[];
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

export interface ServiceCard {
	title: string;
	icon: string;
	body: string;
	footer: string;
	price?: string;
	groupClass?: string;
}

export interface ServiceGridData {
	headingMain: string;
	headingHighlight: string;
	cards: ServiceCard[];
}

export interface TestimonialData {
	brandSubtitle: string;
	brands: { name: string; slug: string; url: string; colorClass: string }[];
	quote: string;
	author: string;
	authorTitle: string;
	stats: { label: string; value: string; color: string; id?: string }[];
}

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

export interface LocationData {
	mapBadge: string;
	titleMain: string;
	titleHighlight: string;
	description: string;
	contactRows: {
		href?: string;
		iconPath: string;
		text?: string;
		isHours?: boolean;
		hoursLines?: string[];
	}[];
}

export interface HistoryData {
	title: string;
	subtitle: string;
	timeline: { date: string; heading: string; body: string }[];
}

export interface MissionData {
	title: string;
	quote_main: string;
	quote_highlight: string;
	quote_suffix: string;
	values: { icon: string; title: string; body: string }[];
}

export interface TeamData {
	sectionTitle: string;
	name: string;
	title: string;
	headshot: string;
	location: string;
	socials: { platform: string; url: string }[];
	bioParagraphs: string[];
}

export interface BenchmarksData {
	titlePrefix: string;
	titleHighlight: string;
	titleSuffix: string;
	subtitle: string;
	columns: string[];
	rows: { metric: string; cbeens: string; agency: string }[];
}

export interface HighlightsData {
	titleMain: string;
	titleHighlight: string;
	titleSuffix: string;
	subtitle: string;
	highlights: { title: string; body: string }[];
}

export interface ProcessData {
	titleMain: string;
	titleHighlight: string;
	subtitle: string;
	steps: { icon: string; iconClass: string; heading: string; body: string }[];
}
