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

Releases use npm **trusted publishing** (OIDC — no tokens) combined with **staged publishing** (a human approves each version with 2FA before it goes live). GitHub Actions stages a new version when a tag matching `create-kongly-docs@v*` is pushed.

### One-time setup

1. **Claim the package name.** Trusted publishing is configured per existing package, so publish once manually to create it:
   ```bash
   cd packages/create-kongly-docs
   bun run build
   npm publish --access public --otp=<code>
   ```
2. **Add the trusted publisher** at `https://www.npmjs.com/package/create-kongly-docs/access`:
   - Provider: GitHub Actions
   - Repository: `brandondkong/kong.ly`
   - Workflow filename: `release-create-kongly-docs.yml`
   - Allowed action: **stage publish** only
3. **Require staged publishing** (2FA approval) on the package so direct publishes are rejected.

### Cutting a release

```bash
# 1. Bump the version in packages/create-kongly-docs/package.json
# 2. Commit the change.
# 3. Tag and push — the workflow stages the publish via OIDC.
git tag create-kongly-docs@v0.1.0
git push origin create-kongly-docs@v0.1.0
```

The staged version waits in the registry until you approve it:

```bash
npm stage ls create-kongly-docs       # see staged versions
npm stage publish create-kongly-docs  # approve & release (prompts for 2FA)
```

You can also approve from the package page on npmjs.com. No GitHub Actions secrets are required.
