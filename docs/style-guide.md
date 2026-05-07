# Style Guide

A complete reference for the visual design and code style of kong.ly. Written to be agent-agnostic — any developer, AI, or template built from this brand should be able to implement it faithfully from this document alone.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Design Tokens](#2-design-tokens)
3. [Typography](#3-typography)
4. [Color](#4-color)
5. [Spacing & Layout](#5-spacing--layout)
6. [Borders & Geometry](#6-borders--geometry)
7. [Motion & Animation](#7-motion--animation)
8. [Components](#8-components)
9. [Interaction Design](#9-interaction-design)
10. [Accessibility](#10-accessibility)
11. [Code Style](#11-code-style)
12. [Assets & Media](#12-assets--media)

---

## 1. Philosophy

### Aesthetic Identity

The design language is **editorial, typographic, and deliberately quiet**. The visual system borrows from print design — tight tracking, high-contrast black-and-white, a serif for reading, a grotesque for everything else. Decoration is used sparingly; the content carries the visual weight.

Key adjectives: **minimal, confident, structured, tactile, unhurried**.

### Principles

**Typography first.** The type scale is the primary visual hierarchy tool. Headings are large — sometimes enormous. Type is set with negative tracking and tight leading. If in doubt, make it bigger and tighter.

**No shadows, no gradients (with one exception).** Shadows are absent. Elevation is expressed through stacking context and the footer parallax effect. The only gradient allowed is the `from-black/50` overlay on image cards.

**Sharp corners, always.** Cards, inputs, buttons, and containers use `border-radius: 0`. The only exceptions are pills/tags (`rounded-full`), portrait images (`rounded-full`), and code-related UI (`rounded-md`, `rounded-sm`). This is a deliberate rejection of the "friendly rounded corners" convention — it creates an editorial, structured feel.

**High contrast.** The palette is black (`#000000`) on white (`#ffffff`) with minimal midtones. Color is only introduced to signal error (`bg-red-600`) or availability (the animated dot, which relies on Tailwind's default red/green palette — check current implementation). All other UI is achieved with tints and very light grays.

**Whitespace as structure.** The spacing system is generous and intentional. Do not collapse spacing to fit more content — instead, reduce content or restructure the layout.

**Motion should feel earned.** Animations exist to guide attention and reward interaction, not to fill silence. Every motion either reveals content, confirms an action, or communicates state. Durations are short (200ms) to medium (500ms). Nothing lingers.

---

## 2. Design Tokens

All tokens live in `apps/kong.ly/src/styles/global.css` inside `@theme inline {}`. This is the single source of truth. In Tailwind CSS v4, every token registered here becomes a utility class automatically (e.g., `--color-foreground` → `text-foreground`, `bg-foreground`, `border-foreground`).

When building external projects (e.g., a documentation template), replicate the token names verbatim. This allows components written against this system to be portable.

### Full Token Reference

```css
@theme inline {
  /* --- Typography --- */
  --font-inter: var(--font-inter);          /* grotesque, primary UI font */
  --font-lora: var(--font-lora);            /* serif, prose/reading content only */

  --text-display-sm: 72px;
  --text-display-md: 120px;
  --text-display-lg: 168px;
  --text-title: 110px;

  /* --- Color: Light (default) --- */
  --color-foreground: black;
  --color-background: white;
  --color-muted: #525252;
  --color-subtle: #595959;
  --color-border: #f5f5f5;
  --color-surface: #f5f5f5;
  --color-overlay: rgba(0, 0, 0, 0.8);

  /* --- Color: Footer (inverted) --- */
  --color-footer-foreground: white;
  --color-footer-background: black;
  --color-footer-surface: #262626;

  /* --- Spacing --- */
  --spacing-section-x: 24px;
  --spacing-section-x-sm: 80px;
  --spacing-hero-top: 56px;
  --spacing-section-top: 32px;
  --spacing-section-bottom: 80px;
  --spacing-hero-gap: 72px;
  --spacing-section-gap: 48px;
  --spacing-content-gap: 24px;
  --spacing-content-gap-sm: 8px;
  --spacing-element-gap: 16px;
  --spacing-tight-gap: 8px;
  --spacing-footer-top: 144px;
  --spacing-footer-bottom: 16px;
  --spacing-footer-bottom-sm: 64px;

  /* --- Animation --- */
  --duration-fast: 200ms;
  --duration-normal: 500ms;
  --ease-default: ease;
  --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
  --animate-ping-slow: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
```

---

## 3. Typography

### Font Families

| Role | Family | Variable | Weights loaded |
|---|---|---|---|
| UI & headings | Inter | `--font-inter` | 300, 400, 500, 600, 700, 800, 900 |
| Long-form reading | Lora | `--font-lora` | 400, 500, 600, 700 |

**Rule:** Use Inter for everything except body prose (blog posts, papers, long articles). Lora is only appropriate when the reader is expected to read continuously for more than a few sentences.

### Type Scale

These are the named typographic variants. When building new components, always reach for one of these rather than setting arbitrary sizes.

| Variant | Tag | Font size | Weight | Leading | Tracking | Notes |
|---|---|---|---|---|---|---|
| `display` | `h1` | 72px → 120px → 168px | 600 | `leading-none` | `-7.5%` | Uppercase. Break-all. Hero text only. |
| `title` | `h2` | `text-4xl` → `text-6xl` → 110px | 600 | `leading-none` | `-5%` | Page-level section titles. |
| `title-sm` | `h2` | `text-4xl` → `text-6xl` | 600 | `leading-none` | `-5%` | Variant of `title` that caps at `text-6xl`. |
| `body-xl` | `p` | `text-4xl` → `text-5xl` | 400 / 500 | 3rem → 3.5rem | `tight` | Large narrative text, hero subtext. |
| `heading` | `h2` | `text-2xl` | 500 | — | `tight` | Section sub-headings, labels above sections. |
| `body-lg` | `span` | `text-xl` → `text-3xl` → `text-4xl` | 400 / 500 | 1.75rem → 2rem → 3rem | `tighter` | Mid-size body, supporting copy. |
| `body` | `p` | `text-2xl` | 500 | — | `tighter` | Default body text size. |
| `body-sm` | `p` | `text-xl` | 500 | — | `tighter` | Compact body text. |
| `label` | `span` | `text-sm` | 400 | — | `tight` | Small labels, metadata. |
| `overline` | `span` | `text-base` | 300 | — | normal, uppercase | Section markers, date labels. Always uppercase. Color: `text-subtle`. |
| `link` | `p` | `text-sm` → `text-base` | — | — | `-0.04em` | Navigation links, inline links. |
| `normal` | `p` | `text-sm` → `text-base` | — | — | — | Generic body text at smallest size. |

### Display Text Rules

- Display headings use `uppercase` and `break-all` to allow the large text to reflow on narrow viewports. Do not use sentence case for display text.
- Negative tracking is a core part of the aesthetic. Never use `tracking-normal` or positive tracking on headings — it reads as unsophisticated.
- Leading on headlines is always `leading-none`. Never add vertical rhythm to large headings via `leading-relaxed` or similar.

### Prose Typography (Long-form Content)

When rendering markdown, rich text, or long articles, apply the `.prose` class wrapper.

| Element | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Body default | 18px (1.125rem) | — | 1.85 | — |
| `h1` | 3rem | 600 | 1.1 | -0.025em |
| `h2` | 2.25rem | 600 | 1.15 | -0.025em |
| `h3` | 1.75rem | 600 | 1.2 | -0.02em |
| `h4` | 1.375rem | 600 | 1.3 | -0.015em |
| `h5` | 1.125rem | 600 | 1.4 | -0.01em |
| `h6` | 1rem | 600 | 1.4 | — |
| `p` | inherited | — | 1.4 | — |
| `li` | inherited | — | 1.75 | — |
| `code` (inline) | 0.875rem | — | — | — |
| `pre > code` | 0.875rem | — | 1.7 | — |

Prose uses **Lora** for body text (`font-family: var(--font-lora)`) and switches back to Inter for headings within prose contexts. Blockquotes use a `2px` left border in `color-border`, with the text shifted to `text-muted`.

### Menu / Overlay Text

The full-screen navigation overlay uses oversized text: `text-4xl sm:text-5xl md:text-display-sm`, `font-semibold`, `uppercase`, `-tracking-[7.5%]`. This is intentionally the same treatment as `display` — the nav menu is a typographic moment, not a functional list.

---

## 4. Color

### Palette

The design is almost entirely black and white. The palette is not "dark mode" aware — there is one mode, and it is light. The footer is an inverted section (black background), not a separate theme.

#### Primary Palette

| Token | Value | Tailwind class | Use |
|---|---|---|---|
| `--color-foreground` | `black` | `text-foreground` / `bg-foreground` / `border-foreground` | Primary text; buttons; borders on focus |
| `--color-background` | `white` | `bg-background` / `text-background` | Page background; inverted text |
| `--color-muted` | `#525252` | `text-muted` | Secondary text, subtitles, metadata |
| `--color-subtle` | `#595959` | `text-subtle` | Overlines, captions, blockquotes — most subdued |
| `--color-border` | `#f5f5f5` | `border-border` | All dividing lines; card borders; input borders |
| `--color-surface` | `#f5f5f5` | `bg-surface` | Card backgrounds, code blocks, tags/pills, inputs |

Note: `--color-border` and `--color-surface` share the same value (`#f5f5f5`). This is intentional — the "surface" and "border" colors being identical means a card's background visually merges with its border in a way that gives structure without contrast.

#### Footer Palette (Inverted)

| Token | Value | Tailwind class | Use |
|---|---|---|---|
| `--color-footer-foreground` | `white` | `text-footer-foreground` | Footer text |
| `--color-footer-background` | `black` | `bg-footer-background` | Footer background |
| `--color-footer-surface` | `#262626` | `bg-footer-surface` | Ghost button background in footer |

#### One-off Colors (Not Tokenized)

These appear in the codebase in very specific, limited contexts. Do not introduce them elsewhere.

| Value | Context |
|---|---|
| `bg-red-600` | Contact form error toast only |
| `rgba(0, 0, 0, 0.4)` | Custom cursor default background |
| `from-black/50` | WorkCard image overlay gradient (bottom-to-top) |
| `rgb(0 0 0 / 0.85)` + `backdrop-filter: blur(4px)` | Photo lightbox backdrop |
| `bg-white/80` | Code block copy button |

### Color Usage Rules

- **Never introduce new colors** outside the token palette without updating the tokens first.
- **No tints of black** like `text-gray-400` or `text-slate-600` — use `text-muted` or `text-subtle`.
- **Error states** use Tailwind's `bg-red-600`. All other semantic states (success, warning, info) are not yet defined — default to `bg-foreground text-background`.
- **No dark mode toggle.** The site has no dark mode. Do not add `dark:` prefixes or conditional theming.

---

## 5. Spacing & Layout

### Spacing Scale

The spacing system is semantic. Tokens describe *relationships* between elements, not raw pixel values. Always use a token before reaching for a Tailwind default like `gap-6`.

| Token | Value | Use case |
|---|---|---|
| `--spacing-tight-gap` | 8px | Tightest grouping — icon + label, micro-clusters |
| `--spacing-element-gap` | 16px | Between UI elements within a component (icon + text in a link) |
| `--spacing-content-gap-sm` | 8px | Photos grid gap (intentionally tight for mosaic feel) |
| `--spacing-content-gap` | 24px | Between cards in a grid; between content blocks within a section |
| `--spacing-section-gap` | 48px | Between major sub-sections within a page section |
| `--spacing-hero-gap` | 72px | Between elements in a hero section |
| `--spacing-section-x` | 24px | Horizontal page padding (mobile) |
| `--spacing-section-x-sm` | 80px | Horizontal page padding (sm+) |
| `--spacing-hero-top` | 56px | Top padding for hero sections |
| `--spacing-section-top` | 32px | Top padding for non-hero sections |
| `--spacing-section-bottom` | 80px | Bottom padding for all sections |
| `--spacing-footer-top` | 144px | Footer top padding |
| `--spacing-footer-bottom` | 16px | Footer bottom padding (mobile) |
| `--spacing-footer-bottom-sm` | 64px | Footer bottom padding (sm+) |

### Global Page Structure

```
<Navbar />                   sticky, z-50, full-width
<main>                       relative z-10, bg-background, pb-16 md:pb-30
  <Section />                ...repeating sections
</main>
<Footer />                   sticky bottom-0, z-0  ← slides out from under main on scroll
```

The footer's `sticky bottom-0 z-0` combined with main's `z-10` creates a "reveal from behind" parallax scroll effect — the footer is always at the bottom of the viewport but hidden behind main until the user scrolls to the end. This is achieved purely with CSS stacking, no JavaScript scroll tricks for the container itself.

### Section Anatomy

Every page section should use the `<Section>` component (or replicate its behavior). A section:

1. Has `px-section-x sm:px-section-x-sm` horizontal padding.
2. Has a `border-t border-border` top divider (suppressible).
3. Has vertical padding from one of: `pt-hero-top`, `pt-section-top`, `pb-section-bottom`.
4. Uses `[clip-path:inset(0)]` to contain child overflow.
5. Optionally has a title row: `flex flex-row items-center justify-between` with a `heading` variant text on the left and a `Button` on the right.

```
Section
├── [optional] title row: flex justify-between items-center
│     ├── Text(variant="heading")   "Works"
│     └── Button(variant="primary") "View all"
└── content: flex flex-col gap-section-gap
      ├── content block
      └── content block
```

### Grid Patterns

| Layout | Classes | Where used |
|---|---|---|
| 2-column card grid | `grid grid-cols-1 lg:grid-cols-2 gap-content-gap` | Blog, Papers |
| 3-column media grid | `grid grid-cols-1 sm:grid-cols-3 gap-content-gap` | Music |
| 4-column photo grid | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-content-gap-sm` | Photos |
| 2-column detail | `md:grid md:grid-cols-2 md:items-center` | Work detail page |

### Breakpoints

Standard Tailwind v4 defaults. No custom breakpoints.

| Prefix | Minimum width | Common use |
|---|---|---|
| (none) | 0px | Mobile-first base |
| `sm:` | 640px | Two columns, expanded text sizes |
| `md:` | 768px | Desktop nav, horizontal layouts, larger type |
| `lg:` | 1024px | Full display text, expanded grids |
| `xl:` | 1280px | Maximum type sizes, 4-column grids |
| `2xl:` | 1536px | Not currently used |

### Max-Width Constraint

Long-form text blocks (prose introductions, abstracts, blog intros, bios) constrain to `max-w-2xl`. This is applied to the text column, not the section wrapper. The section wrapper always spans full width for the border and padding.

---

## 6. Borders & Geometry

### The Sharp-Corner Rule

**Default border-radius is `0` (no rounding).** Cards, buttons, inputs, form fields, code blocks, galleries, skill chips — all have square corners. This is a core brand choice and must not be relaxed without intentional reason.

**Permitted exceptions:**

| Shape | Where |
|---|---|
| `rounded-full` (circle) | Portrait image, cursor, availability dot |
| `rounded-full` (pill) | Tags, category chips, award labels |
| `rounded` (4px) | Company/school logo thumbnails (32px icons) |
| `rounded-md` (6px) | Code block copy button |
| `rounded-sm` (2px) | Contact toast notification |
| `rounded-t-lg` | Code block filename tab |
| `border-radius: 100px` | Cursor when expanded with text (inline CSS) |
| `border-radius: 0.25rem` | Prose inline `<code>` |
| `border-radius: 0.5rem` | Prose `<pre>` blocks |

The pattern is: **UI chrome = square, micro-components and pills = rounded, images of people = circle**.

### Border Width

All borders are `1px` (Tailwind `border`). The single exception is the prose blockquote left-border at `2px`.

### Border Colors

- Standard dividers and card outlines: `border-border` (`#f5f5f5`)
- Footer divider: `border-footer-foreground/20` (white at 20% opacity)
- Input focus: `border-foreground` (black)
- `<dialog>` element: `border-0` (native dialog border removed)

### Elevation

There are **no box-shadows**. Elevation is communicated through:

- **Z-index stacking:** `z-0` (footer) → `z-10` (main) → `z-40` (menu overlay) → `z-50` (navbar, toast) → `z-100` (skip link) → `z-9999` (cursor)
- **The footer reveal effect** (described in layout section)
- **Opacity overlays** on image cards (the `from-black/50` gradient)

---

## 7. Motion & Animation

### Timing Tokens

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `200ms` | Hover state transitions, opacity changes |
| `--duration-normal` | `500ms` | Page-level transitions, menu open/close |
| `--ease-default` | `ease` | General transitions |
| `--ease-reveal` | `cubic-bezier(0.16, 1, 0.3, 1)` | Content reveals, spring-like entrance |

`--ease-reveal` is an **expo-out / spring-like** curve. It starts fast and decelerates strongly into the final position. Use it for anything entering the screen (not for hover states, which should use `ease`).

### Animation Inventory

#### 1. `reveal-up` — Text Line Reveal

Content enters by translating up from behind a clip boundary.

```css
@keyframes reveal-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
/* Applied as: */
animation: reveal-up 2s cubic-bezier(0.16, 1, 0.3, 1) both;
```

Used for: Hero headings, large display text. Applied line by line via JavaScript intersection observer for staggered entrance.

#### 2. `[data-reveal-fade]` — Scroll-Triggered Fade + Slide

Elements fade in and slide up when they enter the viewport.

```css
/* Initial (hidden) state */
[data-reveal-fade] {
  opacity: 0;
  translate: 0 var(--reveal-distance, 24px);
  transition:
    opacity var(--reveal-duration, 0.8s) var(--ease-reveal),
    translate var(--reveal-duration, 0.8s) var(--ease-reveal);
  transition-delay: var(--reveal-delay, 0s);
}
/* Visible state (class added by IntersectionObserver) */
[data-reveal-fade].is-visible {
  opacity: 1;
  translate: 0 0;
}
```

Customizable per element via CSS custom properties:
- `--reveal-distance` (default `24px`) — how far the element slides
- `--reveal-duration` (default `0.8s`) — transition duration
- `--reveal-delay` (default `0s`) — delay before transition starts

#### 3. `ping-slow` — Availability Dot

```css
@keyframes ping-slow {
  75%, 100% { transform: scale(3); opacity: 0; }
}
/* Applied as: */
animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
```

Used for: the pulsing availability indicator in the footer. 2s infinite loop.

#### 4. Photo Lightbox Entrance

Uses the native `<dialog>` element with CSS `@starting-style` for entrance animation and `allow-discrete` on `overlay` and `display` for exit. The backdrop transitions `background-color` and `backdrop-filter` via `--duration-fast`.

### Component-Level Transitions

These are the standard Tailwind transition patterns used in interactive components:

| Pattern | Where |
|---|---|
| `transition-colors duration-fast` | Buttons, links, nav items, back button |
| `transition-opacity duration-fast` | Navbar icon state change |
| `transition-opacity duration-normal` | Menu overlay open/close |
| `transition-transform duration-(--duration-normal)` | Image hover zoom in cards |
| `transition-all duration-300 ease-out` | Contact form toast |

### Hover Transforms

| Transform | Where |
|---|---|
| `group-hover:scale-110` | WorkCard cover image |
| `group-hover:scale-105` | Music album art, photo grid images |
| `group-hover:-translate-x-1` | BackButton left arrow |
| `group-hover:underline` | PaperCard heading text |

**Rule:** Image zoom on hover uses `overflow-hidden` on the container and `scale-*` on the `<img>`. Never increase the container size — scale the image within its bounds.

### Motion Philosophy

- **Entrance only.** Elements animate *in*, not *out* (except the lightbox, which has a proper exit). Don't add exit animations to page content.
- **No looping decoration.** The only looping animation is `ping-slow` on the availability dot, which serves a semantic purpose (live/active status).
- **No bounce on hover.** Hover states use `ease`, not spring curves. Springs are reserved for entrance animations.
- **Stagger via delay, not JS.** When revealing a list of items, use CSS `--reveal-delay` increments rather than JavaScript-driven stagger loops.

---

## 8. Components

### Button

Four variants + one escape hatch.

| Variant | Background | Text | Hover |
|---|---|---|---|
| `primary` | `bg-surface` | `text-foreground` | `bg-foreground text-background` |
| `inverted` | `bg-foreground` | `text-background` | `bg-surface text-foreground` |
| `ghost` | `bg-footer-surface` | `text-footer-foreground` | `bg-footer-foreground text-footer-background` |
| `solid` | `bg-foreground` | `text-background` | (no hover — form submit) |
| `unstyled` | — | — | — |

Base classes (all variants): `py-4 px-8 text-base transition-colors duration-fast font-normal tracking-tight font-inter`

Renders as `<a>` when an `href` prop is provided; renders as `<button>` otherwise. Never use an `<a>` for actions and never use a `<button>` for navigation.

### Cards

All cards share:
- No border-radius
- `border border-border` container
- No box-shadow

**WorkCard:** Square aspect ratio, image fills card, gradient overlay (`bg-linear-to-t from-black/50`) shows title text. Overlay is always visible on `< xl` screens; fades in on hover at `xl:`. `overflow-hidden` to clip image scale transform.

**BlogCard / PaperCard:** Vertical stack with `p-6` internal padding. Stack order: overline → heading → content → tags.

**MusicCard / PhotoFigure:** Similar to WorkCard — image-primary with minimal overlay.

### Tags / Pills

```
<span class="bg-surface text-foreground rounded-full px-3 py-1 text-sm font-normal">Tag</span>
```

Pills have rounded-full shape (the only allowed pill shape in the system). Background is `surface`, no border. Used for blog tags, paper venues/awards.

### Form Elements

All inputs and textareas share a base style:

```
py-4 px-8
text-base font-normal tracking-tight
bg-surface text-foreground placeholder:text-muted
border border-border
transition-colors duration-fast
focus:border-foreground
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground
```

No border-radius. The focus state swaps the border from `border` (`#f5f5f5`) to `border-foreground` (black) — a high-contrast indicator that needs no color.

### Navigation

**Bar:** Full-width, `sticky`, `z-50`. `bg-background border-b border-border px-8 py-9`. Logo left (bold, uppercase, `text-3xl`), menu toggle right.

**Menu toggle:** 4 squares (2×2 grid) that animate into an × on open. Each square is `5×5px bg-foreground`. State managed via `aria-expanded`.

**Overlay:** Full-screen `fixed inset-0 z-40 bg-background`. Menu links at display scale (`text-4xl sm:text-5xl md:text-display-sm`), uppercase, font-semibold. The menu link scale is the hero display scale — this is intentional.

### Section Header Row

When a section has a title and an action, render them as:

```
<div class="flex flex-row items-center justify-between">
  <Text variant="heading">Section Title</Text>
  <Button variant="primary" href="/page">View all</Button>
</div>
```

### Social Links

```
<a class="flex items-center gap-element-gap">
  <Icon size={20} />
  <Text variant="label">Platform</Text>
</a>
```

### Navbar Logo

```
<span class="text-3xl leading-none font-bold tracking-tight uppercase">KONG</span>
```

### Code Blocks

Uses Shiki with `github-light` theme. No dark variant. Copy button: `bg-white/80 rounded-md text-xs`, hidden until hover on desktop (`opacity-0 group-hover:opacity-100`). File tab: `rounded-t-lg bg-surface text-muted text-sm`.

---

## 9. Interaction Design

### Custom Cursor

A custom cursor overlays the native cursor on `pointer: fine` devices (desktop). It is a 28px circle with `backdrop-filter: invert(1)`, meaning it inverts whatever is underneath it — it requires no color decisions and works on any background.

Cursor states:
- **Default:** 28px circle, `background-color: rgba(0,0,0,0.4)`, `backdrop-filter: invert(1)`, `border-radius: 50%`
- **Hover (link/button):** Expands to 68px, still circular
- **Text cursor (`[data-cursor-text]`):** Expands to pill shape (`border-radius: 100px`), shows label text, `background-color: rgba(0,0,0,0.8)`

Cursor movement uses linear interpolation (lerp factor `0.5`) for a slight "lag" that gives it a physical, weighted feel.

Expansion transitions: `width/height: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)` — a spring/bounce curve for scale changes only.

### Hover Conventions

- **Text links:** `hover:underline` (nav links in overlay use this)
- **Buttons:** Color swap between foreground/background (see Button section)
- **Cards with images:** Image scales up via `group-hover:scale-*`
- **Navigation back button:** Arrow shifts `group-hover:-translate-x-1`
- **No color changes on text-only hover outside buttons/links.** Do not add hover color to arbitrary text.

### Focus States

All interactive elements expose a visible focus ring via `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground` (black, 2px, offset). This is specified on inputs explicitly and inherited from browser defaults on links and buttons. Do not suppress focus styles.

### Skip Link

A visually hidden skip link targets `#main` for keyboard navigation. It becomes visible on focus with `z-100`. Always include this in any full-page layout.

---

## 10. Accessibility

### Reduced Motion

All transitions and animations respect `prefers-reduced-motion: reduce`. In global CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Reveal elements (`[data-reveal-fade]`) are shown immediately (without animation) when reduced motion is preferred — their `is-visible` class should be applied on mount rather than on intersection.

### Contrast

The palette is high-contrast by design:
- `text-foreground` (black) on `bg-background` (white): 21:1 ✓
- `text-muted` (`#525252`) on `bg-background` (white): ~7:1 ✓
- `text-subtle` (`#595959`) on `bg-background` (white): ~6.5:1 ✓
- `text-foreground` (black) on `bg-surface` (`#f5f5f5`): ~19:1 ✓

Do not introduce any text color below 4.5:1 contrast ratio against its background.

### Semantic HTML

- Use heading levels in order. `display` and `title` variants map to `h1`/`h2` — do not use them out of hierarchy.
- `<nav>` with `aria-label` for navigation landmarks.
- `<dialog>` for modal lightbox (not a `<div>` overlay).
- `aria-expanded` on menu toggle button.
- `aria-live="polite"` on contact form toast.

### Images

- All content images require `alt` text.
- Decorative images use `alt=""`.
- Portrait image: descriptive alt.
- Gallery images: descriptive alt required (content guideline enforced in CMS).

---

## 11. Code Style

### Toolchain

| Tool | Config location | Key settings |
|---|---|---|
| Prettier | `tooling/prettier/index.mjs` (`@kong/prettier-config`) | `singleQuote: true`, `semi: true`, `tabWidth: 4`, `trailingComma: 'all'` |
| ESLint | `tooling/eslint/index.mjs` (`@kong/eslint-config`) | `eslint-plugin-astro`, `@typescript-eslint` |
| TypeScript | `tooling/tsconfig/` (`@kong/tsconfig`) | `strict: true`, extends `astro/tsconfigs/strict` |
| Tailwind | Inline in `global.css` via `@theme inline {}` | v4 — no `tailwind.config.*` file |
| Class sorting | `prettier-plugin-tailwindcss` | Automatic; do not manually sort |

### File Naming

| Pattern | Convention | Example |
|---|---|---|
| Layout files | `PascalCase.layout.astro` | `Base.layout.astro` |
| Page-level components | `PascalCase.astro` | `Hero.astro`, `WorkCard.astro` |
| Route files | `kebab-case.astro` or `[slug].astro` | `about.astro`, `[slug].astro` |
| Utility modules | `camelCase.ts` | `styles.ts`, `constants.ts` |
| Config files | `camelCase.config.mjs` | `astro.config.mjs` |
| Documentation | `kebab-case.md` | `style-guide.md` |

### Astro Component Structure

```astro
---
// 1. Framework imports
import type { GetStaticPaths } from 'astro';

// 2. External package imports
import { PortableText } from 'astro-portabletext';

// 3. Internal package imports
import { getWork } from '@kong/sanity';

// 4. Local utility imports
import { formBase } from '../../lib/styles';

// 5. Local component imports
import Button from './Button.astro';
import Text from '../common/Text.astro';

// 6. Props interface
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

// 7. Prop destructuring
const { title, variant = 'primary' } = Astro.props;

// 8. Computed values / data fetching
const items = await getWork();
---

<!-- Template -->
<div class="...">
  <Text variant="heading">{title}</Text>
</div>

<!-- Component-scoped styles (rare) -->
<style>
  /* Only for things Tailwind cannot express */
</style>

<!-- Scripts (always last) -->
<script>
  // Client-side behavior
</script>
```

### TypeScript Conventions

- All component props defined via `interface Props` (not `type Props`).
- Variant unions defined as `type Variant = keyof typeof variants` when derived from an object.
- Non-null assertions (`!`) are acceptable in event handler `<script>` blocks where the DOM element is guaranteed by the template.
- Explicit return types on exported functions; inferred types acceptable for internal/computed values.
- No `any`. Use `unknown` + type guards or proper Sanity-generated types.

### Styling Conventions

- **Tailwind first.** All styles as Tailwind utility classes unless truly component-scoped.
- **Token first.** Prefer `gap-content-gap` over `gap-6`. Prefer `text-muted` over `text-neutral-500`.
- **No arbitrary values for spacing or color** unless there is no token equivalent and the value is truly one-off.
- **Acceptable arbitrary values:** Fixed pixel dimensions for icons/decorative elements (e.g., `h-[5px]`, `w-[18px]`, `h-[1.5px]`).
- **CSS variable as Tailwind value:** Use `duration-(--duration-normal)` syntax (Tailwind v4 feature) to reference CSS variables in utility classes.
- **Class merging:** Any component that accepts a `class` prop must use `twMerge` to safely merge caller classes over base classes. This is the only sanctioned method of class overriding.
- **No CSS Modules.** Styles live in `global.css`, Tailwind classes, or an inline `<style>` block when truly necessary.
- **Responsive prefixes** always in ascending order: base → `sm:` → `md:` → `lg:` → `xl:`.

### Comments

Write **no comments** unless the reason behind the code is non-obvious to a future reader. Specifically:
- No comments explaining what code does (the code explains itself).
- No comments referencing the current task, issue, or PR.
- No `// TODO` comments committed to main.
- Acceptable: a comment explaining a non-obvious browser quirk, a CSS trick's purpose, or a constraint imposed by an external system.

---

## 12. Assets & Media

### Images

| Use case | Dimensions | Format | Notes |
|---|---|---|---|
| Blog cover | 1600×800px min (2:1 ratio) | JPEG/WebP | Upload at 2× for retina |
| Work cover | 1600×1600px min (1:1 ratio) | JPEG/WebP | Compose for center-crop |
| Gallery / body images | 1600px wide min | JPEG/WebP | Use consistent aspect ratio within a gallery |
| Company / school logos | 128×128px min (square) | PNG (transparent) or SVG | Rendered at 32×32px |
| Skill icons | 200×200px min (square) | PNG (transparent) or SVG | Rendered at 24×24px |
| Portrait | Any, square preferred | JPEG/WebP | Displayed at `rounded-full` |

### Image Delivery Rules

- Always upload at **2× the display size** to support retina/HiDPI screens.
- Prefer **PNG with transparency** for logos and icons; **JPEG or WebP** for photos.
- Maintain **consistent aspect ratios** within grids. Mixed aspect ratios in a card grid create ragged heights.
- Keep **file sizes reasonable** — Sanity's image CDN handles resizing and format conversion, but source quality determines ceiling quality.
- All content images require `alt` text (see Accessibility section). Empty `alt=""` for purely decorative images.

### SVG Icons

Icons used inline in components come from a consistent icon library (Astro Icon). Target size for inline icons: `20px` in nav/social links, `24px` in skill chips. Never scale SVGs above their intrinsic size by more than 2×.

### Syntax Highlighting

Code blocks use **Shiki** with the `github-light` theme. There is no dark variant. When extending this system to a documentation template, use the same theme for consistency. Do not introduce a custom Prism theme or a different highlighter.
