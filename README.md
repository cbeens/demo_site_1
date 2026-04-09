# dougg_ui

A lightweight, fast frontend framework for building modern web applications and landing pages using HTML, JavaScript, TypeScript, and TailwindCSS. Optimized for speed, security, and developer experience.

## Features

- **Component-Based Architecture**: Modular components for heroes, service grids, testimonials, navigation, and more
- **SPA Routing**: Client-side routing for multiple pages (home, about, services)
- **Form Handling**: Built-in form validation and submission with API integration
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Icon Integration**: Lucide icons with automatic rendering
- **Data-Driven**: Content managed through JSON files
- **TypeScript Support**: Full type safety with TypeScript
- **Vite Build Tool**: Fast development and optimized production builds
- **Documentation**: Auto-generated docs with TypeDoc

## Technologies

- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS v4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Mapbox GL** - Interactive maps
- **Front Matter** - Markdown parsing

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

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser to `http://localhost:5173`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── core/           # Core framework files
│   ├── factory.ts      # Component rendering functions
│   ├── router.ts       # SPA routing logic
│   ├── componentLoader.ts # Dynamic component loading
│   └── ...
├── pages/          # Page templates
│   ├── home/
│   ├── about/
│   └── services/
├── data/           # JSON data files
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── assets/         # Static assets
```

## Usage

The framework uses a component factory pattern where data from JSON files is passed to rendering functions to generate HTML. Pages are stitched together using the router, which loads HTML templates and injects dynamic content.

For detailed API documentation, see the [docs](./docs/) folder or run TypeDoc.
