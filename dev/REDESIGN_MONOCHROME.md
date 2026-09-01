# 🖤 Redesign Portfolio: Monochrome Black & White

> **Author**: Abimanyu  
> **Tanggal**: 1 September 2026  
> **Status**: 📋 Planning  
> **Branch**: -

---

## 1. Ringkasan Perubahan

Rombak total desain portfolio dari skema warna **emerald/colorful** menjadi **pure monochrome (hitam & putih)** yang clean dan premium, dengan dukungan penuh **dark mode** dan **light mode** theme switching.

### Tujuan
- Desain yang **clean, minimal, dan professional**
- Hanya menggunakan warna **hitam, putih, dan gradasi abu-abu**
- Menghilangkan semua warna accent (emerald, blue, purple, violet, orange, pink, dll.)
- Dark/Light mode tetap berfungsi dengan baik
- Mengganti font system menjadi **Pixelify Sans + Space Grotesk**

---

## 2. Aesthetic Direction

| Aspek | Keputusan |
|-------|-----------|
| **Visual Style** | Minimalism + Flat Design 2.0 |
| **Color Palette** | Pure Black `#000` / White `#FFF` / Gray scale |
| **Accent Color** | Tidak ada — semua monochrome |
| **Depth/Shadow** | Subtle — menggunakan border dan opacity, bukan warna |
| **Typography** | Dual-font: Pixel heading + Clean body |
| **Micro-interactions** | Tetap ada, hover menggunakan grayscale transition |

---

## 3. Font System

### Font Sebelumnya
- **Plus Jakarta Sans** (heading & body — single font)

### Font Baru

| Peran | Font | Sumber | Karakter |
|-------|------|--------|----------|
| **Heading / Display** | **Pixelify Sans** | Google Fonts | Pixel modern, readable di berbagai ukuran |
| **Body / UI Text** | **Space Grotesk** | Google Fonts | Geometric, techy, minimalis |

### Penerapan Font

```
Heading (h1, h2, h3, display text):
  → font-family: 'Pixelify Sans', cursive
  → Digunakan di: Hero name, section titles, preloader counter

Body (paragraph, labels, buttons, nav):
  → font-family: 'Space Grotesk', sans-serif
  → Digunakan di: semua teks UI, description, navigation, footer
```

### Implementasi di Next.js

```tsx
// app/layout.tsx
import { Pixelify_Sans, Space_Grotesk } from "next/font/google";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

// Di <body>:
<body className={`${pixelifySans.variable} ${spaceGrotesk.variable} font-body antialiased`}>
```

```css
/* globals.css — di @theme inline */
--font-family-sans: var(--font-space-grotesk), 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
--font-family-heading: var(--font-pixelify-sans), 'Pixelify Sans', cursive;
```

---

## 4. Color Mapping — Before & After

### 4.1 CSS Variables (globals.css)

| Variable | Light (Before) | Light (After) | Dark (Before) | Dark (After) |
|----------|---------------|---------------|--------------|--------------|
| `--background` | `oklch(1 0 0)` ✅ | Sama | `oklch(0 0 0)` ✅ | Sama |
| `--foreground` | `oklch(0.145 0 0)` ✅ | Sama | `oklch(1 0 0)` ✅ | Sama |
| `--primary` | `oklch(0.205 0 0)` ✅ | Sama | `oklch(1 0 0)` ✅ | Sama |
| `--destructive` | `oklch(0.577 0.245 27.325)` ❌ | `oklch(0.4 0 0)` | `oklch(0.396 0.141 25.723)` ❌ | `oklch(0.6 0 0)` |
| `--chart-*` | Berwarna ❌ | Semua grayscale | Berwarna ❌ | Semua grayscale |

### 4.2 Component Color Changes

#### Navbar
| Element | Before | After |
|---------|--------|-------|
| Logo "hi" | `text-emerald-500` | `text-black dark:text-white font-black` |
| Mobile social hover | `hover:text-blue-600`, `hover:text-pink-600` | `hover:text-black dark:hover:text-white` |

#### Hero Section
| Element | Before | After |
|---------|--------|-------|
| FlipWords | `text-emerald-500 dark:text-emerald-400` | `text-black dark:text-white` |

#### Counter Section
| Element | Before | After |
|---------|--------|-------|
| Counter number | `text-emerald-500 dark:text-emerald-400` | `text-black dark:text-white` |

#### About Section
| Element | Before | After |
|---------|--------|-------|
| "About Me" heading | `text-emerald-500 dark:text-emerald-400` | `text-gray-500 dark:text-gray-400` |
| Contact icon box bg | `bg-emerald-100 dark:bg-emerald-900/30` | `bg-gray-100 dark:bg-zinc-800` |
| Contact icon color | `text-emerald-600 dark:text-emerald-400` | `text-black dark:text-white` |
| Check icon (copy) | `text-emerald-500` | `text-black dark:text-white` |

#### Project Section
| Element | Before | After |
|---------|--------|-------|
| Project count highlight | `text-emerald-500` | `font-bold text-black dark:text-white` |
| Clear Filters button | `bg-emerald-500 hover:bg-emerald-600 text-white` | `bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black` |
| No projects icon bg | `bg-emerald-100 text-emerald-500` | `bg-gray-100 dark:bg-zinc-800 text-black dark:text-white` |
| Active pagination | `bg-emerald-500 text-white` | `bg-black text-white dark:bg-white dark:text-black` |

#### Project Card
| Element | Before | After |
|---------|--------|-------|
| Hover border | `hover:border-emerald-500/30` | `hover:border-black/30 dark:hover:border-white/30` |

#### Project Popup
| Element | Before | After |
|---------|--------|-------|
| "View Live Preview" btn | `bg-emerald-500 hover:bg-emerald-600` | `bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black` |

#### Project Gallery
| Element | Before | After |
|---------|--------|-------|
| Active thumbnail border | `border-emerald-500 ring-emerald-500/20` | `border-black dark:border-white ring-black/20 dark:ring-white/20` |

#### Color Mapping (Badges)
| Badge Type | Before | After |
|------------|--------|-------|
| Category: Website | `bg-blue-100 text-blue-800` | `bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200` |
| Category: App | `bg-green-100 text-green-800` | Sama ↑ |
| Category: UI/UX Design | `bg-purple-100 text-purple-800` | Sama ↑ |
| Category: Fullstack | `bg-yellow-100 text-yellow-800` | Sama ↑ |
| Language: semua | Berwarna-warni | Sama ↑ |
| Status: semua | Berwarna-warni | Sama ↑ |
| Default fallback | `bg-gray-100 text-gray-800` ✅ | Sama |

#### TabBar
| Element | Before | After |
|---------|--------|-------|
| Active tab | `bg-emerald-500 text-white` | `bg-black text-white dark:bg-white dark:text-black` |
| Hover | `hover:text-emerald-600` | `hover:text-black dark:hover:text-white` |

#### Filter Checkbox & Language Filter
| Element | Before | After |
|---------|--------|-------|
| Checked bg | `bg-emerald-50 border-emerald-200` | `bg-gray-50 dark:bg-zinc-800/50 border-gray-300 dark:border-zinc-700` |
| Checked text | `text-emerald-800 dark:text-emerald-300` | `text-black dark:text-white font-medium` |
| Select All link | `text-emerald-600` | `text-black dark:text-white underline` |
| Checkbox accent | `text-emerald-600 focus:ring-emerald-500` | `text-black dark:text-white focus:ring-gray-500` |
| Selected count | `bg-emerald-100 text-emerald-800` | `bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200` |

#### Skills Section
| Element | Before | After |
|---------|--------|-------|
| Progress bar | `bg-emerald-500` | `bg-black dark:bg-white` |
| Bar text | `text-white` | `text-white dark:text-black` |
| MySkil title | `text-gray-700` | `text-gray-700 dark:text-gray-300` |

#### Title Component
| Element | Before | After |
|---------|--------|-------|
| Accent text (text2) | `text-emerald-500` | `text-gray-500 dark:text-gray-400` |

#### Experience & Timeline
| Element | Before | After |
|---------|--------|-------|
| Position text | `text-emerald-500` | `text-gray-500 dark:text-gray-400 font-semibold` |
| Timeline title | `dark:text-emerald-500` | `text-black dark:text-white` |
| Timeline dot | `bg-emerald-500` | `bg-black dark:bg-white` |
| Progress line gradient | `from-emerald-500 via-emerald-400` | `from-black dark:from-white via-gray-400 dark:via-gray-600` |

#### Preloader
| Element | Before | After |
|---------|--------|-------|
| Progress bar | `bg-emerald-500` | `bg-black dark:bg-white` |

#### Footer
| Element | Before | After |
|---------|--------|-------|
| Brand dot "." | `text-emerald-500` | `text-gray-400` |
| Link hover | `hover:text-emerald-500` | `hover:text-black dark:hover:text-white` |
| Social hover | `hover:text-emerald-500` | `hover:text-black dark:hover:text-white` |
| Email hover | `hover:text-emerald-500` | `hover:text-black dark:hover:text-white` |

#### Mode Toggle
| Element | Before | After |
|---------|--------|-------|
| Sun icon | `text-orange-500` | `text-black` |

#### Social Media Component
| Element | Before | After |
|---------|--------|-------|
| Hover | `hover:text-violet-500` | `hover:text-black dark:hover:text-white` |

#### Certificate Section
| Element | Before | After |
|---------|--------|-------|
| Title accent | `text-emerald-500` | `text-gray-500` |
| Card gradient | `from-emerald-500 to-teal-600` | `from-gray-800 to-black dark:from-gray-200 dark:to-white` |

---

## 5. Daftar File yang Berubah

Total: **~22 files**

### Core / Design System
1. `app/globals.css` — CSS variables (destructive, chart colors)
2. `app/layout.tsx` — Font import (Pixelify Sans + Space Grotesk)

### Layout Components
3. `app/components/Navbar.tsx` — Logo color, mobile hover
4. `app/components/Footer.tsx` — Brand dot, hover colors
5. `app/components/mode-toggle.tsx` — Sun icon color
6. `app/components/ui/Preloader.tsx` — Progress bar color

### Home Sections
7. `app/components/home/HeroSection.tsx` — FlipWords color, heading font
8. `app/components/home/AboutSection.tsx` — Heading, contact icons
9. `app/components/home/Project.tsx` — Count, pagination, empty state
10. `app/components/home/ExperienceSection.tsx` — Position text
11. `app/components/home/SkilsSection.tsx` — (minor, jika ada)
12. `app/components/home/TechStackSection.tsx` — (pastikan clean)

### Project Sub-components
13. `app/components/home/project/ProjectCard.tsx` — Hover border
14. `app/components/home/project/ProjectPopup.tsx` — CTA button
15. `app/components/home/project/ProjectGallery.tsx` — Active thumbnail
16. `app/components/home/project/ColorMapping.tsx` — Semua badge warna
17. `app/components/home/project/TabBar.tsx` — Active/hover states
18. `app/components/home/project/FilterCheckbox.tsx` — Checked states
19. `app/components/home/project/LanguageFilter.tsx` — Checked states
20. `app/components/home/project/SertificateSection.tsx` — Gradient, title

### Props & Shared
21. `app/components/home/props/Title.tsx` — Accent text
22. `app/components/home/props/SkilBar.tsx` — Progress bar
23. `app/components/home/props/CounterSection.tsx` — Counter number
24. `app/components/home/props/SosialMedia.tsx` — Hover color
25. `app/components/home/myskil/MySkil.tsx` — Title dark mode

### Shared UI (Aceternity)
26. `components/ui/ui/timeline.tsx` — Dot, gradient, title
27. `components/ui/ui/flip-words.tsx` — (className pass-through, OK)

### Error Pages
28. `app/error.tsx` — Cek warna
29. `app/not-found.tsx` — Cek warna

---

## 6. Risiko & Catatan

| Risiko | Mitigasi |
|--------|----------|
| Badge tidak terdistinguish (semua abu-abu sama) | Gunakan variasi border-style atau font-weight sebagai pembeda |
| Pixel font sulit dibaca di ukuran kecil | Pixelify Sans hanya untuk heading (≥ 20px), body tetap Space Grotesk |
| Dark mode contrast kurang | Test dengan minimum contrast ratio 4.5:1 (WCAG AA) |
| Preloader progress bar tidak terlihat di dark mode | `bg-black dark:bg-white` → auto-invert |

---

## 7. Timeline Eksekusi

| Phase | Scope | Estimasi |
|-------|-------|----------|
| 1 | Font system + CSS variables | ~5 menit |
| 2 | Layout components (Navbar, Footer, Preloader, Toggle) | ~10 menit |
| 3 | Home sections (Hero, About, Counter, Skills) | ~10 menit |
| 4 | Project section + sub-components (8 files) | ~15 menit |
| 5 | Shared UI (Timeline, FlipWords) | ~5 menit |
| 6 | Error pages + final verification | ~5 menit |
| **Total** | **~22 files, ~50 menit** | |

---

## 8. Verifikasi

- [ ] `npm run build` — zero errors
- [ ] Light mode: semua section tampil monochrome
- [ ] Dark mode: semua section tampil monochrome (inverted)
- [ ] Theme toggle berfungsi smooth
- [ ] Font Pixelify Sans muncul di heading
- [ ] Font Space Grotesk muncul di body text
- [ ] Badge masih distinguishable meski monochrome
- [ ] Responsive: mobile & desktop OK
- [ ] Preloader animasi berjalan normal
