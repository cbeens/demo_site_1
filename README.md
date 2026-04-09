# dougg_ui

A lightweight, fast frontend site framework built with HTML, JavaScript, TypeScript, and TailwindCSS. Designed for performance, simplicity, and secure content delivery.

## Features

- **Component-Based Rendering**: Data-driven UI sections rendered from typed factories
- **SPA Routing**: Client-side navigation for home, about, services, and static pages
- **Data-Driven Content**: Page markup and content loaded from `public/pages` and `public/data`
- **Responsive Design**: Mobile-first styling with TailwindCSS
- **Form Handling**: Contact form submission and phone formatting built in
- **Map Integration**: Mapbox GL support for location sections
- **Icon System**: Dynamic SVG icon registry with Lucide support
- **TypeScript + Vite**: Fast development experience and build pipeline
- **Auto-generated Docs**: TypeDoc output for API reference

## Technologies

- **Vite** - Dev server and production bundler
- **TypeScript** - Static typing for your app logic
- **TailwindCSS v4** - Utility-first styling
- **PostCSS** - CSS processing
- **Mapbox GL** - Interactive map rendering
- **Front Matter** - Markdown metadata parsing
- **TypeDoc** - Documentation generation

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/cbeens/dougg_ui.git
    cd dougg_ui
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the dev server:

    ```bash
    npm run dev
    ```

4. Open your browser at `http://localhost:5173`

## Scripts

- `npm run dev` - Run the Vite development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build
- `npx typedoc` - Generate API documentation

## Project Structure

```
.
├── public/                 # Static page templates, JSON content, and assets
│   ├── pages/
│   └── data/
├── src/                    # Application source code
│   ├── core/               # Router, page stitching, and render factories
│   ├── utils/              # Form, map, menu, and interaction utilities
│   ├── types/              # Shared TypeScript interfaces
│   ├── declarations.d.ts   # Global module/environment declarations
│   ├── main.ts             # App bootstrap
│   └── style.css           # Global CSS imports
├── docs/                   # Generated TypeDoc output
├── package.json
├── tsconfig.json
├── typedoc.json
└── vite.config.ts
```

## Usage

This repo loads page templates and content from `public/pages` and `public/data`. The SPA router in `src/core/router.ts` stitches content into the UI shell, then initializes interactions, icons, and optional Mapbox sections.

To regenerate documentation, run:

```bash
npx typedoc
```

Then open the generated files in `docs/`.
