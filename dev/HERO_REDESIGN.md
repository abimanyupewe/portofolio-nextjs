# Hero Section Redesign — Dev Documentation

> **Status:** 🟢 Selesai (Implemented)  
> **Tanggal:** 2026-09-01  
> **Scope:** `app/components/home/HeroSection.tsx`  
> **Dependensi:** GSAP, FlipWords (Aceternity), Lucide Icons

---

## 1. Analisis State Saat Ini

### File yang Terdampak
| File | Aksi | Keterangan |
|------|------|------------|
| `app/components/home/HeroSection.tsx` | MODIFY | Overhaul layout & animasi |
| `app/(public)/page.tsx` | REVIEW | Cek props passing ke Hero |

### Props Interface (Tidak Berubah)
```typescript
interface Profile {
  full_name: string;
  taglines: string[];
  bio: string;
  avatar_url?: string; // tersedia jika diperlukan
}

interface HeroSectionProps {
  profile?: Profile;
}
```

### Masalah Visual yang Ditemukan

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| 1 | Nama terlalu besar | 🔴 High | `text-9xl` memakan ~70% viewport, tidak proporsional |
| 2 | Tidak ada CTA | 🔴 High | Pengunjung tidak punya arah navigasi |
| 3 | Grid background generik | 🟡 Medium | CSS inline grid pattern terasa template |
| 4 | Tidak ada role identifier | 🟡 Medium | Visitor tidak tahu konteks persona |
| 5 | Tidak ada scroll cue | 🟢 Low | Tidak ada visual hint untuk scroll |

---

## 2. Design Specification (Opsi A — Centered Typographic)

### Layout Blueprint

```
┌────────────────────────────────────────┐
│                                        │
│            — Software Engineer —       │  ← Role Tag (tracking-widest, uppercase)
│                                        │
│              ABIMANYU                  │  ← Nama Baris 1 (font-heading, text-6xl md:text-8xl)
│              PRIYO W.                  │  ← Nama Baris 2 
│                                        │
│       Passionate in [FlipWords]        │  ← Tagline (text-xl md:text-2xl)
│                                        │
│    [■ View Projects]  [□ Contact Me]   │  ← CTA Duo
│                                        │
│                 ↓                      │  ← Scroll Indicator
└────────────────────────────────────────┘
```

### Typography Mapping

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Role Tag | `font-sans` (Space Grotesk) | `text-sm md:text-base` | `font-medium` | `text-gray-500 dark:text-gray-400` |
| Nama | `font-heading` (Pixelify Sans) | `text-6xl md:text-8xl` | `font-black` | `text-black dark:text-white` |
| Tagline | `font-sans` | `text-xl md:text-2xl` | `font-normal` | `text-gray-600 dark:text-gray-400` |
| FlipWords | `font-sans` | inherit | `font-bold` | `text-black dark:text-white` |
| CTA Primary | `font-sans` | `text-sm` | `font-semibold` | `bg-black text-white` / `dark:bg-white dark:text-black` |
| CTA Secondary | `font-sans` | `text-sm` | `font-semibold` | `border-black text-black` / `dark:border-white dark:text-white` |

### Animasi GSAP — Stagger Timeline

```
t=0.0s  ─── Role Tag      (y:30 → 0, opacity: 0 → 1)
t=0.3s  ─── Nama           (y:50 → 0, opacity: 0 → 1)  
t=0.6s  ─── Tagline        (y:30 → 0, opacity: 0 → 1)
t=0.9s  ─── CTA Buttons    (y:20 → 0, opacity: 0 → 1)
t=1.4s  ─── Scroll Arrow   (opacity: 0 → 1, lalu infinite bounce)
```

### Background Strategy

| Opsi | Deskripsi |
|------|-----------|
| **Clean Solid** | `bg-white dark:bg-black` — paling bersih, zero distraction |
| **Subtle Noise** | Solid + CSS noise texture overlay (opacity 3-5%) |
| **Minimal Dot Grid** | Dot pattern sangat halus (opacity 5%) |

> Rekomendasi: **Clean Solid** untuk maximized whitespace feel.

### Responsive Breakpoints

| Breakpoint | Nama Size | Tagline Size | CTA Layout |
|------------|-----------|--------------|------------|
| `< 640px` (Mobile) | `text-5xl` | `text-lg` | Stack vertikal, `flex-col` |
| `640-1024px` (Tablet) | `text-6xl` | `text-xl` | Horizontal, `flex-row` |
| `> 1024px` (Desktop) | `text-7xl md:text-8xl` | `text-2xl` | Horizontal, `flex-row gap-4` |

---

## 3. Open Questions

| # | Pertanyaan | Impact |
|---|-----------|--------|
| 1 | Pilih opsi layout A, B, atau C? | Menentukan keseluruhan struktur |
| 2 | FlipWords dipertahankan atau ganti teks statis? | Mempengaruhi dependensi animasi |
| 3 | Tombol CTA: 2 tombol atau 1 saja? | Mempengaruhi visual balance |
| 4 | Background: polos bersih atau subtle pattern? | Mempengaruhi layer & CSS |
| 5 | Scroll indicator: animated chevron atau text link? | Minor styling decision |

---

## 4. Referensi Estetika

**Inspirasi visual:**
- Apple.com product pages — massive whitespace, single focal typography
- Paco Coursey (paco.me) — ultra minimal dev portfolio
- Rauno Freiberg (rauno.me) — clean editorial dengan monochrome palette
- Jud.co — centered hero dengan stagger animation

**Prinsip Desain:**
1. **Whitespace is content** — biarkan ruang kosong bekerja
2. **Typography hierarchy** — role (kecil) → nama (besar) → tagline (medium)  
3. **Single focal point** — mata tertarik ke nama, lalu turun ke CTA
4. **Motion with purpose** — animasi bukan untuk "wow" tapi untuk memandu mata
