# Next Hat documentation

The documentation site uses Nextra 4, Next.js 16, and the shared [Next Hat UI](https://github.com/next-hat/next-hat-ui) theme in a pnpm workspace. Production is a static export served by nginx.

## Development

Use Node.js 24 and the pinned pnpm version from `package.json`.

```sh
git clone --recurse-submodules https://github.com/next-hat/documentation.git
cd documentation
npm install --global pnpm@12.9.1
pnpm install --frozen-lockfile
pnpm dev
```

For an existing checkout, initialize the UI submodule before installing dependencies:

```sh
git submodule update --init --recursive
```

The development site runs at `http://localhost:3000`.

## Workspace

- `apps/documentation`: Next.js application, Nextra layout, MDX components, and public assets.
- `apps/documentation/content`: documentation, guides, and blog posts. `_meta.js` files define navigation titles and ordering.
- `packages/ui`: shared Next Hat UI repository, pinned as a Git submodule.
- `scripts`: content migration inventory and validation.

Edit content in the application directory. Use the shared components and theme tokens from `packages/ui` for presentation; app-specific styling belongs in the documentation application.

## Validation and preview

```sh
pnpm check
pnpm typecheck
pnpm build
node scripts/verify-export.mjs
pnpm preview
```

`pnpm build` exports the site to `apps/documentation/out`. The content check validates the migration inventory and local content links. Next.js checks the generated routes and compiles MDX during the production build. Pagefind indexes the exported pages for local full-text search. Run `node scripts/check-content.mjs --migration` to verify original headings and fenced examples, and `node scripts/verify-export.mjs` to check links and assets in the export.

Nextra 4.6.1 uses a scoped Zod 4.1.13 pin to avoid its [upstream layout validation bug](https://github.com/shuding/nextra/issues/5008). The shared UI source remains unchanged.

## SEO and social previews

Public pages use `https://docs.next-hat.com` for canonical and social URLs. Titles and descriptions come from MDX frontmatter; pages without a description use their opening paragraph or command description. Add a concise `description` when editing content. Original `timestamp` values supply sitemap and structured-data modification dates, and blog publication dates and authors come from the existing blog inventory.

Every public page gets a 1200 × 630 PNG at `/social/<page-path>.png` (the homepage uses `/social/index.png`). The build renders the Next Hat artwork from `apps/documentation/assets` with local fonts, the page title, and its description. Open Graph and Twitter share the same card. All cards, metadata, and JSON-LD are generated during the static build; nginx needs no image-generation service or external requests.

The export verifier checks every public page's metadata, structured data, canonical sitemap entry, and actual PNG dimensions and size. Search is excluded from the sitemap and has `noindex, follow` metadata while remaining crawlable.

## Docker

Initialize submodules before building so the shared UI source is present in the build context.

```sh
docker build -t next-hat-documentation:local .
docker run --rm -p 8080:80 next-hat-documentation:local
```

Open `http://localhost:8080` to inspect the production export. The Docker build runs content checks, typechecking, the static build, and export validation. The final image contains nginx and exported files, with no Node.js runtime. HTML and other mutable files revalidate; fingerprinted Next.js assets use immutable caching.

Pull requests run the workspace checks and build. Pushes to `master` publish the existing versioned GHCR image, and successful publish runs trigger the existing NanoCL deployment workflow. The root package version supplies the production image tag.
