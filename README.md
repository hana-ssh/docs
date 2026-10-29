# Hana Docs

Source for [docs.hanassh.com](https://docs.hanassh.com), built with [Docusaurus](https://docusaurus.io/).

## Development

```bash
pnpm install
pnpm start
```

Pages live in `docs/`. The sidebar is generated from the folder structure; order pages with `sidebar_position` in front matter and folders with `_category_.json`.

The theme lives in `src/css/custom.css`. Its tokens mirror `packages/web/src/app/globals.css` in hana-cloud, so keep the two in step.

## Build

```bash
pnpm build
pnpm serve
```

## Deployment

```bash
GIT_USER=<Your GitHub username> pnpm deploy
```

This builds the site and pushes it to the `gh-pages` branch.
