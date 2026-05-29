# Robert Wiliam Portfolio

Personal portfolio website for Robert Wiliam, built with Astro, React, Tailwind CSS, and TypeScript. The site presents a home page, professional experience timeline, featured works, contact details, downloadable CV, analytics, and sitemap support.

Production site: [https://robertwl.my.id](https://robertwl.my.id)

## Tech Stack

- [Astro](https://astro.build/) 5 with server output
- React islands for interactive components
- Tailwind CSS for styling
- TypeScript with the `@/*` alias mapped to `src/*`
- Biome and ESLint for formatting and linting
- Vercel adapter, Vercel Analytics, PostHog, and sitemap integration
- Docker support for containerized deployment

## Project Structure

```text
.
├── public/
│   ├── CV_Robert_Wiliam.pdf
│   └── favicon.png
├── src/
│   ├── assets/               # Optimized images imported through astro:assets
│   ├── components/           # Astro and React UI components
│   ├── config/
│   │   ├── data/             # Home, works, and experience content
│   │   └── web.ts            # Route endpoint helpers
│   ├── models/               # Shared TypeScript interfaces
│   ├── pages/                # Astro routes
│   └── utils/                # Formatting, image, date, and class helpers
├── astro.config.mjs
├── Dockerfile
├── docker-compose.yml
├── Makefile
└── package.json
```

## Routes

| Route | Source | Purpose |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Hero, expertise, CV link, and contact section |
| `/works` | `src/pages/works.astro` | Professional and personal project showcase |
| `/experience` | `src/pages/experience.astro` | Work history timeline |
| `/robots.txt` | `src/pages/robots.txt.ts` | Search crawler configuration |

## Getting Started

This project requires Node.js and pnpm. The repository pins pnpm through `packageManager`, and `preinstall` rejects installs from other package managers.

```sh
pnpm install
pnpm dev
```

The development server runs at [http://localhost:4321](http://localhost:4321) by default.

You can also use the Makefile shortcut, which creates `.env` from `.env.example` when needed, installs dependencies, and starts Astro on `0.0.0.0:4321`:

```sh
make dev
```

## Environment Variables

Create a local `.env` file from `.env.example` when PostHog analytics should be enabled:

```sh
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `PUBLIC_POSTHOG_KEY` | Public PostHog project key |
| `PUBLIC_POSTHOG_HOST` | PostHog API host |

Both variables are public Astro environment variables, so do not store private secrets in them.

## Commands

Common workflows are available through `make`:

| Command | Action |
| --- | --- |
| `make help` | List available local, Docker, and deploy commands |
| `make env` | Copy `.env.example` to `.env` when `.env` is missing |
| `make install` | Install pnpm dependencies from the lockfile |
| `make dev` | Start the Astro development server |
| `make build` | Build the production site |
| `make preview` | Preview the production build locally |
| `make check` | Run CI-style checks |
| `make fresh` | Clean, install, and build |
| `make docker-up` | Build and start the local Docker Compose stack |
| `make deploy-server` | Pull the configured branch, rebuild, and restart the server stack |
| `make vercel-prod` | Deploy to Vercel production |

The underlying pnpm scripts are:

| Command | Action |
| --- | --- |
| `pnpm dev` | Start the Astro development server |
| `pnpm start` | Alias for `pnpm dev` |
| `pnpm build` | Run `astro check` and build the production site |
| `pnpm preview` | Preview the production build locally |
| `pnpm check` | Run Biome CI and ESLint checks |
| `pnpm format` | Format the repository with Biome |
| `pnpm lint` | Run ESLint with automatic fixes |
| `pnpm astro ...` | Run Astro CLI commands |

## Editing Content

- Home page copy and expertise cards: `src/config/data/home.json.ts`
- Work/project entries: `src/config/data/works.json.ts`
- Experience timeline entries: `src/config/data/experience.json.ts`
- Route mappings: `src/config/web.ts`
- Downloadable CV: `public/CV_Robert_Wiliam.pdf`
- Images: `src/assets/**`

Image paths used in data files are resolved by `src/utils/image-reader.ts` against `src/assets`. For example, `/works/personal/hireverse/image-1.png` maps to `src/assets/works/personal/hireverse/image-1.png`.

## Quality Checks

Run the full local check before opening a pull request:

```sh
pnpm check
pnpm build
```

CI runs Biome formatting checks and ESLint on pull requests. The workflow is defined in `.github/workflows/ci.yml`.

## Docker

Build and run the production container with Docker Compose:

```sh
docker compose up --build
```

Or use the Makefile wrapper:

```sh
make docker-up
```

The container exposes the app on port `4321`. The production image builds the Astro server output and starts `dist/server/entry.mjs`.

For server deployment, `docker-compose.server.yml` uses the same image and restarts the service unless stopped manually.

## Deployment Notes

The Astro config sets:

- `site` to `https://robertwl.my.id`
- `output` to `server`
- `adapter` to `@astrojs/vercel`
- integrations for React, Tailwind, and sitemap generation

When deploying outside Vercel, use the included Dockerfile or adjust `astro.config.mjs` to the target adapter.
