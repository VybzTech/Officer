# PageHero Component

A reusable hero section component with customizable background images and gradient overlays.

## Features

- ✅ Customizable background images (URLs or data URIs)
- ✅ Customizable gradient overlay colors
- ✅ Responsive sizing with HubotText components
- ✅ Parallax effect support
- ✅ Accepts any children components
- ✅ Fully typed with TypeScript

## Usage Examples

### Basic Usage

```tsx
import PageHero from "@/components/common/PageHero";
import { HubotH1 } from "@/components/ui/HubotText";

<PageHero>
  <HubotH1 fontWeight="extrabold" size={72} className="text-white">
    Welcome
  </HubotH1>
</PageHero>;
```

### With Background Image

```tsx
<PageHero backgroundImage="/images/hero-bg.jpg">
  <HubotH1 fontWeight="extrabold" size={72} className="text-white">
    About Us
  </HubotH1>
</PageHero>
```

### With Custom Gradient Overlay

```tsx
<PageHero
  backgroundImage="/images/hero-bg.jpg"
  overlayFrom="rgba(255, 212, 59, 0.3)"
  overlayTo="rgba(211, 211, 211, 0.2)"
>
  <HubotH1 fontWeight="extrabold" size={72} className="text-white">
    About Us
  </HubotH1>
</PageHero>
```

### With Dark Overlay (Contact Page Style)

```tsx
<PageHero
  backgroundImage="/images/contact-bg.jpg"
  overlayFrom="rgba(0, 0, 0, 0.67)"
  overlayTo="rgba(0, 0, 0, 0.27)"
  heightClass="h-96 md:h-[500px]"
>
  <HubotH1 fontWeight="extrabold" size={72} className="text-white">
    Contact Us
  </HubotH1>
</PageHero>
```

### With Parallax Effect

```tsx
<PageHero backgroundImage="/images/hero-bg.jpg" parallax={true}>
  <HubotH1 fontWeight="extrabold" size={72} className="text-white">
    Our Story
  </HubotH1>
</PageHero>
```

### With Multiple Children

```tsx
<PageHero
  backgroundImage="/images/hero-bg.jpg"
  overlayFrom="rgba(0, 0, 0, 0.5)"
  overlayTo="rgba(0, 0, 0, 0.7)"
>
  <HubotH1 fontWeight="extrabold" size={72} className="text-white mb-4">
    Get Started
  </HubotH1>
  <HubotP fontWeight="medium" size={18} className="text-white/90">
    Join thousands of happy users today
  </HubotP>
  <button className="mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg">
    Sign Up Now
  </button>
</PageHero>
```

## Props

| Prop                | Type              | Default                | Description                        |
| ------------------- | ----------------- | ---------------------- | ---------------------------------- |
| `backgroundImage`   | `string`          | `undefined`            | Background image URL or data URI   |
| `overlayFrom`       | `string`          | `'rgba(0, 0, 0, 0.4)'` | Starting color of gradient overlay |
| `overlayTo`         | `string`          | `'rgba(0, 0, 0, 0.6)'` | Ending color of gradient overlay   |
| `gradientDirection` | `string`          | `'135deg'`             | CSS gradient direction             |
| `heightClass`       | `string`          | `'h-80 md:h-96'`       | Tailwind height classes            |
| `children`          | `React.ReactNode` | **required**           | Content to display in hero         |
| `className`         | `string`          | `''`                   | Additional CSS classes             |
| `parallax`          | `boolean`         | `false`                | Enable parallax scrolling effect   |

## Color Presets

### Yellow Gradient (About Page)

```tsx
overlayFrom = "rgba(255, 212, 59, 0.3)";
overlayTo = "rgba(211, 211, 211, 0.2)";
```

### Dark Gray Gradient (Contact Page)

```tsx
overlayFrom = "rgba(0, 0, 0, 0.67)";
overlayTo = "rgba(0, 0, 0, 0.27)";
```

### Light Overlay

```tsx
overlayFrom = "rgba(255, 255, 255, 0.2)";
overlayTo = "rgba(255, 255, 255, 0.4)";
```

### Blue Gradient

```tsx
overlayFrom = "rgba(59, 130, 246, 0.5)";
overlayTo = "rgba(37, 99, 235, 0.7)";
```

## Implementation Notes

- The component uses `background-attachment: fixed` when `parallax={true}` for a parallax scrolling effect
- All children are centered both horizontally and vertically
- The overlay is applied on top of the background image using absolute positioning
- Responsive by default with mobile-first design
