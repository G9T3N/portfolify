---
name: Mr.Err Portfolio
description: A bold, technical, futuristic personal portfolio — dark cybernetic aesthetic with green primary and cyan accents
colors:
  primary-green: "#008000"
  accent-cyan: "#00DCC8"
  accent-purple: "#8A5CF6"
  accent-blue: "#588CFF"
  accent-pink: "#EC4899"
  neutral-bg: "#000000"
  neutral-surface: "#0A0A0A"
  neutral-elevated: "#121212"
  neutral-card: "#171717"
  neutral-text: "#FFFFFF"
  neutral-text-secondary: "#AAAAAA"
  neutral-text-muted: "#646464"
  neutral-border: "#282828"
  neutral-border-hover: "#505050"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono-label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  button: "9999px"
  card: "16px"
  input: "8px"
  pill: "9999px"
  default: "4px"
spacing:
  section: "160px"
  container: "80px"
  unit: "8px"
  gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary-green}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.button}"
    padding: "16px 36px"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.neutral-text-secondary}"
    rounded: "{rounded.button}"
    padding: "16px 36px"
    border: "1px solid {colors.neutral-border}"
  glass-card:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.card}"
    padding: "12px"
  form-input:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.input}"
    padding: "16px 20px"
---

# Design System: Mr.Err Portfolio

## 1. Overview

**Creative North Star: "The Lab"**

The Lab is a dark, focused workshop where precision meets experimentation. Every surface is purposeful, every glow is earned. This is not a bright, cheerful showcase — it's a dim-lit space where the work glows on its own. The visitor feels like they've stepped into a control room where technology is built, tuned, and displayed with exacting standards.

The system is unapologetically dark. Black backgrounds recede into the void while content — text, 3D elements, project previews — emerges through subtle surface elevations, mesh gradients, and controlled accent glows. The green primary is inherited from the original "Mr.Err" identity, balanced by cyan, purple, blue, and pink accents that add dimensionality without chaos.

**Key Characteristics:**

- Dark-by-default with a dimensional surface hierarchy (pure black → very dark gray → dark card)
- Green primary anchor, multi-accent palette (cyan, purple, blue, pink) for distinction
- Generous rounded corners on buttons (fully pill), moderate rounding on cards
- Glass-like cards with subtle blur and border
- Mesh gradient backgrounds that shift and breathe
- 3D elements that reinforce "The Lab" identity
- Motion is smooth and intentional — polished, not flashy

## 2. Colors

The palette is anchored by a deep green primary against an absolute black background. Accents form a "spectrum lab" feel — cool tones across the violet-to-cyan range, with a single warm pink for contrast.

### Primary

- **Lab Green** (`#008000` / oklch(47% 0.14 145)): Primary CTA buttons, key interactive elements, sidebar branding. The identity anchor — inherited and intentional.

### Accents

- **Neon Cyan** (`#00DCC8` / oklch(75% 0.15 185)): Secondary accent, hover states, glow effects. The lab's instrument readouts.
- **Signal Purple** (`#8A5CF6` / oklch(52% 0.22 285)): Tertiary accent, decorative elements, selection highlights.
- **Arc Blue** (`#588CFF` / oklch(58% 0.15 250)): Supporting accent, information highlights.
- **Trace Pink** (`#EC4899` / oklch(58% 0.22 345)): Warm counter-accent, rare emphasis. Used sparingly.

### Neutral

- **Void** (`#000000`): Primary background. The canvas everything sits on.
- **Deep Surface** (`#0A0A0A`): Secondary surface, subtle differentiation from void.
- **Elevated** (`#121212`): Elevated surfaces, dropdowns, modals.
- **Card Dark** (`#171717`): Card backgrounds, container surfaces.
- **Screen Bright** (`#393939`): Bright surface variant for contrast.
- **Text Primary** (`#FFFFFF`): Primary body and heading color.
- **Text Secondary** (`#AAAAAA`): Secondary text, metadata, descriptions.
- **Text Muted** (`#646464`): Placeholder text, disabled states, labels.
- **Border Default** (`#282828`): Default dividers and borders.
- **Border Hover** (`#505050`): Interactive border hover state.

## 3. Typography

**Display Font:** Space Grotesk (ui-sans-serif, system-ui, sans-serif)
**Body Font:** Inter (ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (ui-monospace, monospace)

**Character:** A two-axis pairing — Space Grotesk brings a geometric, technical confidence for display work while Inter provides warm, highly readable body text. JetBrains Mono adds a lab-instrument precision for labels, stats, and code-adjacent content. The trio reads as "built by someone who cares about type."

### Hierarchy

- **Display** (700, `clamp(2.5rem, 7vw, 4.5rem)`, 1.1, `-0.03em`): Hero headlines, section headers. Space Grotesk only. Use `text-wrap: balance`.
- **Headline** (600, `clamp(1.75rem, 5vw, 3.5rem)`, 1.2, `-0.02em`): Section titles. Space Grotesk.
- **Title** (500, `1.25rem`, 1.4): Card titles, project names. Space Grotesk or Inter.
- **Body** (400, `1rem`, 1.6): Paragraphs, descriptions. Inter. Max line length 65–75ch.
- **Label Mono** (500, `0.75rem`, 1.25, `0.1em` uppercase): Section labels, stat values, meta. JetBrains Mono.
- **Label Caps** (700, `0.75rem`, 1, `0.1em` uppercase): Eyebrow labels. JetBrains Mono.

## 4. Elevation

A hybrid approach: tonal layering defines the surface hierarchy (void → deep surface → card), while subtle glow effects and occasional shadows mark interactive or elevated states. Depth is conveyed primarily through value — lighter surfaces sit on top of darker ones — not through drop shadows. When shadows appear (hover, focus), they're colored glows tied to the accent palette, not neutral gray drops.

### Named Rules

**The Glow-Over-Shadow Rule.** Interactive elements emit light, not cast shadows. Button hover uses a purple-tinted glow (`8px 32px color-mix(in srgb, accent-purple, transparent 80%)`). Focus rings use the accent color as a spread glow. No neutral box-shadows on interactive elements.

## 5. Components

### Buttons

- **Shape:** Fully pill-shaped (border-radius: 9999px).
- **Primary (Lab Green):** Background `#008000`, white text, padding 16px 36px. Hover: translateY(-2px) + purple glow + lighter border. Includes a diagonal shine sweep on hover.
- **Outline:** Transparent bg, secondary text, 1px border. Hover: green border + green text + subtle green bg tint.
- **Ghost:** No background or border. Hover: subtle bg. Intended for low-importance actions in dense areas.

### Glass Cards

- **Corner Style:** 16px radius.
- **Background:** `#171717` with 80% backdrop-blur-xl and border `#282828` at 50-60% opacity.
- **Shadow Strategy:** Glow-based on hover (accent-colored); flat at rest per the Glow-Over-Shadow rule.
- **Internal Padding:** 12px.

### Tech Pills / Chips

- **Style:** 9999px radius, muted bg (`hsl(var(--muted))`), border `hsl(var(--border))`, foreground text. Compact (px-3 py-1).
- **State:** Hover shifts border to primary color and adds primary bg tint at 5%.

### Form Inputs

- **Style:** Dark surface bg (`#0A0A0A`), 1px default border (`#282828`), 8px radius, 16px 20px padding.
- **Focus:** Purple border + purple glow spread (3px at `color-mix(in srgb, accent-purple, transparent 80%)`).
- **Placeholder:** Muted text (`#646464`).

### Navigation (Glass Navbar)

- **Style:** Fixed top bar, `color-mix(in srgb, bg-primary, transparent 40%)` background, backdrop-filter blur(20px) saturate(180%), 1px border. Full width.

## 6. Do's and Don'ts

### Do:

- **Do** use the void black (`#000000`) as the primary canvas. The dark surface hierarchy is the brand.
- **Do** use accent glows (purple, cyan) for interactive feedback — hover, focus, selection.
- **Do** keep body text at `#FFFFFF` (primary) or `#AAAAAA` (secondary) for sufficient contrast.
- **Do** use rounded corners generously for interactive elements (pill buttons, pill chips).
- **Do** use the three-font system deliberately — Space Grotesk for display, Inter for body, JetBrains Mono for labels.

### Don't:

- **Don't** use cream, sand, beige, or warm-tinted backgrounds. This is a dark lab, not a coffee shop.
- **Don't** use gradient text (`background-clip: text` + gradient). Text is solid white or secondary.
- **Don't** use side-stripe borders (`border-left` or `border-right` > 1px as colored accent).
- **Don't** use neutral gray drop shadows on interactive elements — use colored glows instead.
- **Don't** overuse the eyebrow pattern (uppercase small label above every section). One or two is voice; every section is reflex.
- **Don't** use numbered section markers (01 / 02 / 03) as default scaffolding.
- **Don't** use generic SaaS card grids — each element should earn its place.
- **Don't** gate content visibility on animation — content must render without JavaScript.
