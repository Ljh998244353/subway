# Design

## Style Summary

Light operational command center for a commercial mall visual AI digital twin. The visual tone is quiet, precise, and audit-friendly: structured panels, crisp borders, compact controls, restrained color, and self-drawn spatial graphics instead of decorative media.

## Scene

An operations manager reviews mall performance on a bright office monitor during a morning shift handover, while keeping enough density for repeat checks and enough contrast for quick risk triage.

## Color Strategy

Restrained product palette with tinted neutrals and semantic accents. Use OKLCH tokens in CSS where practical. The surface should not read as one-note blue, purple, beige, or dark slate.

Primary roles:

```css
--color-bg-page: oklch(0.972 0.006 220);
--color-bg-surface: oklch(0.994 0.004 220);
--color-bg-subtle: oklch(0.948 0.011 215);
--color-text-primary: oklch(0.245 0.025 235);
--color-text-secondary: oklch(0.44 0.025 235);
--color-brand: oklch(0.49 0.095 205);
--color-accent-blue: oklch(0.48 0.135 260);
--color-accent-green: oklch(0.52 0.11 150);
--color-accent-amber: oklch(0.62 0.14 72);
--color-accent-red: oklch(0.55 0.16 28);
--color-accent-purple: oklch(0.52 0.12 305);
```

## Typography

Use system UI fonts with Chinese fallbacks already recorded in project notices. Do not bundle font files. Keep product UI labels compact and stable, with fixed rem or pixel sizes, no viewport-scaled type, and letter spacing set to 0.

Font stack:

```css
Inter, "Noto Sans CJK SC", "Noto Sans SC", Roboto, "PingFang SC", "Microsoft YaHei", Arial, sans-serif
```

## Layout

Use a fixed topbar, a persistent desktop sidebar, and a responsive content grid. Desktop content uses 12 columns with dense but readable spacing. Cards are allowed for metrics, charts, lists, tools, and details only. Avoid nested cards and decorative section wrappers.

Key rules:

```text
Topbar: 56px minimum
Sidebar: 216px desktop, collapses structurally on small screens
Card radius: 8px maximum
Control height: 32px
Page padding: 20px desktop, 12px mobile
```

## Components

Controls should use familiar product affordances: segmented controls for modes, pill filters for query context, clear buttons and links for navigation, tables or ranked lists for comparisons, and SVG summaries for lightweight charts. Every status chip needs readable text. Alerts and grades must include words, numbers, or shapes, not color alone.

## Motion

Motion is limited to hover, focus, selected-state feedback, and chart or spatial highlight transitions. Use 120-220 ms transitions with ease-out curves. Disable nonessential motion under `prefers-reduced-motion`.

## Asset Policy

Use only free local code, system fonts, CSS, and self-drawn SVG/HTML shapes. Do not add paid tools, external images, icon packs, real mall plans, real videos, logos, or web-scraped assets without a license audit.
