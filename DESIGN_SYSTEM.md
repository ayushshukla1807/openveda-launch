# OpenVeda Design System

The OpenVeda design system is a custom CSS architecture built on strict HSL (Hue, Saturation, Lightness) variables. This ensures perfect contrast and clean color transitions in both Dark and Light modes.

## Core Principles

- **Minimalist Grayscale**: Primary focus on typography and whitespace.
- **Micro-interactions**: Subtle, fluid animations powered by Framer Motion.
- **Glassmorphism**: High-end depth through backdrop blur and translucent borders.
- **Typography-first**: Strategic use of the Inter font family for readability and professional impact.

## HSL Architecture

The design system uses a unified set of HSL variables defined in `styles/main.css`.

### Base Variables
- `--background`: The primary canvas color.
- `--foreground`: The text and primary content color.
- `--primary`: The brand accent color (a vibrant, high-energy hue).
- `--border`: Used for clean, minimalist dividers and interactive targets.

### Theming Mechanism
Next.js `next-themes` manages the injection of the `.dark` class, which redefines these variables for a smooth transition.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... other variables ... */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... other variables ... */
}
```

## UI Components

### 1. Tactical Navigation
- **Floating Capsule**: A high-impact navigation unit with glassmorphism and animated icons.
- **Accessibility**: ARIA-labeled targets for screen reader compatibility.

### 2. Cards (Org & Program)
- **Hover Scale**: Micro-interactions providing immediate feedback.
- **Dynamic Shadows**: Depth adjusted for optimal visual hierarchy.

### 3. Typography Scale
- **Headers**: Black (900 weight) with tight tracking for a startup feel.
- **Body**: Medium (500 weight) with relaxed leading for readability.

---

For technical structure, see [ARCHITECTURE.md](./ARCHITECTURE.md).
