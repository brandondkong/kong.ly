# create-kongly-docs

Scaffold a new documentation site from the [kong.ly docs template](https://github.com/brandondkong/docs).

## Usage

```bash
# npm
npm create kongly-docs@latest my-docs

# bun
bun create kongly-docs my-docs

# pnpm
pnpm create kongly-docs my-docs

# yarn
yarn create kongly-docs my-docs
```

Omit the directory argument to be prompted for it.

## What it does

1. Asks where to create the project (or uses the positional argument).
2. Refuses to scaffold into a non-empty directory.
3. Asks for a project name (used as the `name` field in `package.json`).
4. Detects installed package managers (`bun`, `pnpm`, `npm`, `yarn`) and asks which to use when more than one is available.
5. Downloads the latest template from `github:brandondkong/docs#main`.
6. Runs `<pm> install`.

Does **not** run `git init` — safe to scaffold inside an existing repository.

## Releasing

Releases are published automatically by GitHub Actions when a tag matching `create-kongly-docs@v*` is pushed.

```bash
# 1. Bump the version in packages/create-kongly-docs/package.json
# 2. Commit the change.
# 3. Tag and push.
git tag create-kongly-docs@v0.1.0
git push origin create-kongly-docs@v0.1.0
```

Required GitHub Actions secret: `NPM_TOKEN` (an automation token from npm with publish rights to `create-kongly-docs`).
