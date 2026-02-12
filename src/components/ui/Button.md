# Enhanced Button Component

A fully-featured button component with icon support from lucide-react, multiple variants, sizes, and subtle gradient styling.

## Features

- ✅ Icon support (lucide-react)
- ✅ Icon positioning (left/right)
- ✅ Multiple variants with subtle gradients
- ✅ Multiple sizes (sm, md, lg, xl)
- ✅ Full width option
- ✅ Loading state with spinner
- ✅ Disabled state
- ✅ TypeScript support
- ✅ Uses Hubot font

## Basic Usage

```tsx
import Button from '@/components/ui/Button';

// Simple button
<Button>Click Me</Button>

// With variant
<Button variant="secondary">Secondary</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Loading state
<Button loading>Loading...</Button>
```

## Icon Usage

### Using Icon Component

```tsx
import Button from '@/components/ui/Button';
import { ArrowRight, Check, Download } from 'lucide-react';

// Icon on the left (default)
<Button icon={ArrowRight}>Continue</Button>

// Icon on the right
<Button icon={ArrowRight} iconPosition="right">Next</Button>

// Icon only
<Button icon={Check} aria-label="Confirm" />
```

### Using Icon Name (String)

```tsx
// Pass icon name as string
<Button iconName="ArrowRight">Continue</Button>

<Button iconName="Download" iconPosition="right">Download</Button>

<Button iconName="Check" variant="outline">Confirm</Button>
```

### Custom Icon Size

```tsx
<Button icon={ArrowRight} iconSize={20}>Large Icon</Button>

<Button iconName="Download" iconSize={14}>Small Icon</Button>
```

## Variants

### Primary (Default)

Yellow gradient with border - main call-to-action

```tsx
<Button variant="primary">Primary Button</Button>
<Button variant="primary" iconName="ArrowRight">Get Started</Button>
```

### Secondary

Dark gradient - secondary actions

```tsx
<Button variant="secondary">Secondary Button</Button>
<Button variant="secondary" iconName="Settings">Settings</Button>
```

### Outline

Light gradient with border - tertiary actions

```tsx
<Button variant="outline">Outline Button</Button>
<Button variant="outline" iconName="Edit">Edit</Button>
```

### Danger

Red gradient - destructive actions

```tsx
<Button variant="danger">Delete</Button>
<Button variant="danger" iconName="Trash2">Delete Account</Button>
```

### Ghost

Transparent background - minimal actions

```tsx
<Button variant="ghost">Cancel</Button>
<Button variant="ghost" iconName="X">Close</Button>
```

### Gradient

Subtle gray gradient - alternative style

```tsx
<Button variant="gradient">Gradient Button</Button>
<Button variant="gradient" iconName="Sparkles">Premium</Button>
```

## Sizes

```tsx
// Extra Small
<Button size="sm" iconName="Plus">Small</Button>

// Medium (default)
<Button size="md" iconName="Check">Medium</Button>

// Large
<Button size="lg" iconName="Download">Large</Button>

// Extra Large
<Button size="xl" iconName="Rocket">Extra Large</Button>
```

## Full Width

```tsx
<Button fullWidth>Full Width Button</Button>

<Button fullWidth variant="primary" iconName="ArrowRight" iconPosition="right">
  Continue
</Button>
```

## Loading State

```tsx
<Button loading>Processing...</Button>

<Button loading variant="secondary">Saving...</Button>

// Loading replaces the icon
<Button loading iconName="Check">Submit</Button>
```

## Disabled State

```tsx
<Button disabled>Disabled Button</Button>

<Button disabled iconName="Lock">Locked</Button>
```

## Real-World Examples

### Form Submit Button

```tsx
<Button
  type="submit"
  fullWidth
  loading={isSubmitting}
  iconName="Send"
  iconPosition="right"
>
  Send Message
</Button>
```

### Download Button

```tsx
<Button variant="outline" iconName="Download" onClick={handleDownload}>
  Download PDF
</Button>
```

### Delete Confirmation

```tsx
<Button
  variant="danger"
  iconName="Trash2"
  onClick={handleDelete}
  disabled={!canDelete}
>
  Delete Item
</Button>
```

### Navigation Button

```tsx
<Button
  variant="primary"
  iconName="ArrowRight"
  iconPosition="right"
  size="lg"
  onClick={() => navigate("/next-page")}
>
  Continue to Next Step
</Button>
```

### Icon-Only Button

```tsx
<Button
  variant="ghost"
  iconName="Settings"
  aria-label="Settings"
  className="!p-2"
/>
```

### Button Group

```tsx
<div className="flex gap-2">
  <Button variant="outline" iconName="ChevronLeft">
    Previous
  </Button>
  <Button iconName="ChevronRight" iconPosition="right">
    Next
  </Button>
</div>
```

## Props Reference

| Prop           | Type                                                                         | Default              | Description                              |
| -------------- | ---------------------------------------------------------------------------- | -------------------- | ---------------------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'outline' \| 'danger' \| 'ghost' \| 'gradient'` | `'primary'`          | Button style variant                     |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'xl'`                                               | `'md'`               | Button size                              |
| `loading`      | `boolean`                                                                    | `false`              | Show loading spinner                     |
| `fullWidth`    | `boolean`                                                                    | `false`              | Make button full width                   |
| `icon`         | `LucideIcon`                                                                 | `undefined`          | Icon component from lucide-react         |
| `iconName`     | `string`                                                                     | `undefined`          | Icon name as string (e.g., 'ArrowRight') |
| `iconPosition` | `'left' \| 'right'`                                                          | `'left'`             | Icon position                            |
| `iconSize`     | `number`                                                                     | Auto (based on size) | Icon size in pixels                      |
| `disabled`     | `boolean`                                                                    | `false`              | Disable button                           |
| `className`    | `string`                                                                     | `''`                 | Additional CSS classes                   |
| `children`     | `ReactNode`                                                                  | -                    | Button content                           |
| ...rest        | `ButtonHTMLAttributes`                                                       | -                    | All standard button props                |

## Icon Sizes by Button Size

| Button Size | Default Icon Size |
| ----------- | ----------------- |
| `sm`        | 14px              |
| `md`        | 16px              |
| `lg`        | 18px              |
| `xl`        | 20px              |

## Popular Lucide Icons

Here are some commonly used icons:

- **Navigation**: `ArrowRight`, `ArrowLeft`, `ChevronRight`, `ChevronLeft`
- **Actions**: `Plus`, `Edit`, `Trash2`, `Download`, `Upload`, `Send`
- **Status**: `Check`, `X`, `AlertCircle`, `Info`, `CheckCircle`
- **UI**: `Settings`, `Menu`, `Search`, `Filter`, `MoreVertical`
- **Social**: `Heart`, `Share2`, `MessageCircle`, `Bell`
- **Files**: `File`, `FileText`, `Image`, `Video`, `Music`

See all icons at: https://lucide.dev/icons/

## Styling Notes

- All variants use subtle gradients for a premium feel
- Buttons have hover and active states with scale animations
- Focus states include ring for accessibility
- Font uses `font-hubot` for consistency
- Disabled state reduces opacity to 50%
