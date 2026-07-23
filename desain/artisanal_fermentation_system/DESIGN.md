---
name: Artisanal Fermentation System
colors:
  surface: '#ebffea'
  surface-dim: '#ccdfcb'
  surface-bright: '#ebffea'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e5f9e4'
  surface-container: '#dff3df'
  surface-container-high: '#daedd9'
  surface-container-highest: '#d4e8d4'
  on-surface: '#0f1f13'
  on-surface-variant: '#52443b'
  inverse-surface: '#243427'
  inverse-on-surface: '#e2f6e2'
  outline: '#847469'
  outline-variant: '#d6c3b6'
  surface-tint: '#875224'
  primary: '#875224'
  on-primary: '#ffffff'
  primary-container: '#d2915d'
  on-primary-container: '#562b00'
  inverse-primary: '#feb780'
  secondary: '#496640'
  on-secondary: '#ffffff'
  secondary-container: '#caecbc'
  on-secondary-container: '#4f6c45'
  tertiary: '#8d4d3b'
  on-tertiary: '#ffffff'
  tertiary-container: '#d98b76'
  on-tertiary-container: '#5b2617'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc3'
  primary-fixed-dim: '#feb780'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6b3b0e'
  secondary-fixed: '#caecbc'
  secondary-fixed-dim: '#afd0a1'
  on-secondary-fixed: '#062104'
  on-secondary-fixed-variant: '#324e2a'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a1'
  on-tertiary-fixed: '#390c02'
  on-tertiary-fixed-variant: '#703626'
  background: '#ebffea'
  on-background: '#0f1f13'
  surface-variant: '#d4e8d4'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system centers on an **Artisan-Minimalist** aesthetic that bridges the gap between raw, organic textures and high-end wellness retail. It evokes the feeling of a premium apothecary or a sun-drenched fermentation kitchen. The target audience values gut health, craftsmanship, and transparency in ingredients.

The visual language uses **Minimalism** with **Tactile** influences. It prioritizes generous negative space to signal luxury and cleanliness, while using organic background patterns and a warm, earthy palette to maintain a "grown-from-the-earth" personality. The UI should feel breathable, intentional, and calming.

## Colors
The palette is rooted in the natural lifecycle of kombucha production:
- **Primary (Amber/Honey):** Used for primary actions and highlighting the rich color of the brew.
- **Secondary (Tea Leaf):** Used for success states, secondary navigation, and grounding elements.
- **Accent (Peach):** A soft, vibrant hue used for flavor callouts, discounts, and micro-interactions.
- **Neutral (Deep Forest):** Replaces pure black for all text and iconography to maintain a softer, organic contrast.
- **Background (Cream):** A warm off-white that prevents the "clinical" feel of pure white, providing a soft canvas for product photography.

## Typography
The system utilizes a high-contrast type pairing to balance heritage with modern utility. 

**Playfair Display** provides an editorial, authoritative feel for headings and product names. It should be used with tight tracking in larger sizes to emphasize its elegant serifs. 

**Inter** handles all functional copy, ensuring maximum readability for ingredient lists and nutritional facts. For labels and small UI elements, use Inter in semi-bold with increased letter spacing to create a clean, organized hierarchy.

## Layout & Spacing
The design system employs a **Fluid Grid** with oversized margins to reinforce a premium, boutique feel. 

- **Desktop:** 12-column grid with a 1280px max-width. Use heavy vertical padding (120px+) between homepage sections to allow product photography to breathe.
- **Mobile:** 4-column grid with 20px side margins.
- **Rhythm:** All spacing should be multiples of 8px. Use larger-than-standard gaps (e.g., 32px or 48px) between text blocks and imagery to avoid visual clutter and maintain the "clean" brand promise.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Ambient Shadows** rather than harsh borders.

1.  **Surfaces:** Cards and containers should use a slightly lighter or darker tint of the Cream background or a very subtle 5% opacity of the Primary Amber to denote elevation.
2.  **Shadows:** Use extremely soft, long-range shadows (Blur: 24px, Spread: -4px) with a hint of the Deep Forest Green in the shadow color (e.g., #1B2B1E at 8% opacity). This creates an organic "lifting" effect rather than a digital drop shadow.
3.  **Glassmorphism:** Use sparingly for navigation bars or overlaying text on product imagery to maintain legibility while showcasing the vibrant liquid colors of the kombucha.

## Shapes
The shape language is inspired by the soft, curved silhouettes of fermentation glass bottles and the fluidity of liquid. 

Standard components use a **16px (rounded-lg)** radius. For "Add to Cart" buttons and featured chips, use a **Full (Pill)** radius to suggest friendliness and approachability. Background elements may feature "blob" or organic wave patterns in low-contrast Cream/Amber tones to break the rigidity of the grid.

## Components

- **Buttons:** Primary buttons are solid Amber (#D2915D) with Forest Green text. Secondary buttons use a Tea Leaf Green outline with a subtle background hover state.
- **Cards:** Product cards should have 16px corners, a subtle ambient shadow, and no border. The product image should often "break" the container or sit on a high-quality, lifestyle-shot background.
- **Input Fields:** Use a soft Cream-colored fill with a 1px border in a muted Tea Leaf Green. Focus states should transition the border to a solid Primary Amber.
- **Chips/Badges:** Used for flavor profiles (e.g., "Ginger," "Hibiscus"). These should be pill-shaped with low-saturation versions of the flavor's color (e.g., a soft pink for Berry).
- **Lists:** Ingredient lists should use a custom "Leaf" or "Circle" bullet in Secondary Green, with generous line-height for readability.
- **Progressive Disclosure:** Use accordion menus for "Brewing Process" or "FAQs" with smooth transitions and elegant serif headers.