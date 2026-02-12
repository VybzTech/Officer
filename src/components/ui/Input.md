# Input Components Documentation

Comprehensive, visually appealing form input components with icon support, validation, and consistent styling.

## Components

- **Input** - Text input with icon support, password toggle, prefix/suffix
- **Textarea** - Multi-line text input with auto-resize and character count
- **Select** - Dropdown select with icon support

---

## Input Component

### Features

- ✅ Icon support (lucide-react)
- ✅ Password visibility toggle
- ✅ Character count
- ✅ Prefix/Suffix elements
- ✅ Multiple sizes (sm, md, lg)
- ✅ Error & helper text
- ✅ Required field indicator
- ✅ Full width option
- ✅ All HTML input types supported

### Basic Usage

```tsx
import Input from "@/components/ui/Input";

<Input label="Email Address" type="email" placeholder="Enter your email" />;
```

### With Icon

```tsx
import { Mail, User, Lock } from 'lucide-react';

// Using icon component
<Input
  label="Email"
  icon={Mail}
  placeholder="your@email.com"
/>

// Using icon name
<Input
  label="Username"
  iconName="User"
  placeholder="Choose username"
/>

// Icon on the right
<Input
  label="Search"
  iconName="Search"
  iconPosition="right"
  placeholder="Search..."
/>
```

### Password Input

```tsx
// Automatic password toggle
<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  helperText="Must be at least 8 characters"
/>
```

### With Prefix/Suffix

```tsx
import { DollarSign } from 'lucide-react';

// Prefix
<Input
  label="Price"
  type="number"
  prefix={<DollarSign size={18} />}
  placeholder="0.00"
/>

// Suffix
<Input
  label="Weight"
  type="number"
  suffix="kg"
  placeholder="Enter weight"
/>

// Text prefix
<Input
  label="Website"
  prefix={<span className="text-sm">https://</span>}
  placeholder="example.com"
/>
```

### Character Count

```tsx
<Input
  label="Username"
  maxLength={20}
  showCount
  placeholder="Max 20 characters"
/>
```

### Validation

```tsx
// Required field
<Input
  label="Email"
  required
  placeholder="Required field"
/>

// With error
<Input
  label="Email"
  error="Please enter a valid email"
  placeholder="your@email.com"
/>

// With helper text
<Input
  label="Password"
  helperText="Must contain letters and numbers"
/>
```

### Sizes

```tsx
<Input inputSize="sm" label="Small" />
<Input inputSize="md" label="Medium (default)" />
<Input inputSize="lg" label="Large" />
```

### Input Props

| Prop           | Type                   | Default  | Description               |
| -------------- | ---------------------- | -------- | ------------------------- |
| `label`        | `string`               | -        | Label text above input    |
| `error`        | `string`               | -        | Error message below input |
| `helperText`   | `string`               | -        | Helper text below input   |
| `icon`         | `LucideIcon`           | -        | Icon component            |
| `iconName`     | `string`               | -        | Icon name as string       |
| `iconPosition` | `'left' \| 'right'`    | `'left'` | Icon position             |
| `showCount`    | `boolean`              | `false`  | Show character count      |
| `suffix`       | `ReactNode`            | -        | Suffix element            |
| `prefix`       | `ReactNode`            | -        | Prefix element            |
| `inputSize`    | `'sm' \| 'md' \| 'lg'` | `'md'`   | Input size                |
| `fullWidth`    | `boolean`              | `true`   | Full width                |
| `required`     | `boolean`              | `false`  | Required field            |
| ...rest        | `InputHTMLAttributes`  | -        | All standard input props  |

---

## Textarea Component

### Features

- ✅ Auto-resize option
- ✅ Character count
- ✅ Multiple sizes
- ✅ Error & helper text
- ✅ Required field indicator

### Basic Usage

```tsx
import Textarea from "@/components/ui/Textarea";

<Textarea label="Message" placeholder="Type your message..." />;
```

### Auto-Resize

```tsx
<Textarea label="Bio" placeholder="Tell us about yourself..." autoResize />
```

### Character Count

```tsx
<Textarea
  label="Description"
  maxLength={500}
  showCount
  placeholder="Max 500 characters"
/>
```

### Sizes

```tsx
<Textarea textareaSize="sm" label="Small" />
<Textarea textareaSize="md" label="Medium (default)" />
<Textarea textareaSize="lg" label="Large" />
```

### Textarea Props

| Prop           | Type                     | Default | Description                  |
| -------------- | ------------------------ | ------- | ---------------------------- |
| `label`        | `string`                 | -       | Label text above textarea    |
| `error`        | `string`                 | -       | Error message below textarea |
| `helperText`   | `string`                 | -       | Helper text below textarea   |
| `showCount`    | `boolean`                | `false` | Show character count         |
| `textareaSize` | `'sm' \| 'md' \| 'lg'`   | `'md'`  | Textarea size                |
| `fullWidth`    | `boolean`                | `true`  | Full width                   |
| `required`     | `boolean`                | `false` | Required field               |
| `autoResize`   | `boolean`                | `false` | Auto-resize based on content |
| ...rest        | `TextareaHTMLAttributes` | -       | All standard textarea props  |

---

## Select Component

### Features

- ✅ Icon support
- ✅ Custom chevron icon
- ✅ Multiple sizes
- ✅ Error & helper text
- ✅ Required field indicator
- ✅ Disabled options

### Basic Usage

```tsx
import Select from "@/components/ui/Select";

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

<Select label="Country" placeholder="Select your country" options={options} />;
```

### With Icon

```tsx
import { MapPin } from 'lucide-react';

<Select
  label="Location"
  icon={MapPin}
  options={options}
  placeholder="Select location"
/>

// Using icon name
<Select
  label="Country"
  iconName="MapPin"
  options={options}
/>
```

### With Helper Text

```tsx
<Select
  label="Country"
  options={options}
  helperText="Choose your country of residence"
/>
```

### Disabled Options

```tsx
const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom", disabled: true },
  { value: "ca", label: "Canada" },
];

<Select options={options} />;
```

### Select Props

| Prop          | Type                   | Default      | Description                |
| ------------- | ---------------------- | ------------ | -------------------------- |
| `label`       | `string`               | -            | Label text above select    |
| `error`       | `string`               | -            | Error message below select |
| `helperText`  | `string`               | -            | Helper text below select   |
| `icon`        | `LucideIcon`           | -            | Icon component             |
| `iconName`    | `string`               | -            | Icon name as string        |
| `options`     | `SelectOption[]`       | **required** | Select options             |
| `placeholder` | `string`               | -            | Placeholder text           |
| `selectSize`  | `'sm' \| 'md' \| 'lg'` | `'md'`       | Select size                |
| `fullWidth`   | `boolean`              | `true`       | Full width                 |
| `required`    | `boolean`              | `false`      | Required field             |
| ...rest       | `SelectHTMLAttributes` | -            | All standard select props  |

### SelectOption Type

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

---

## Complete Form Example

```tsx
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  });

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  return (
    <form className="space-y-6">
      <Input
        label="Full Name"
        iconName="User"
        placeholder="John Doe"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <Input
        label="Email Address"
        type="email"
        iconName="Mail"
        placeholder="john@example.com"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <Select
        label="Country"
        iconName="MapPin"
        placeholder="Select your country"
        options={countries}
        required
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      />

      <Textarea
        label="Message"
        placeholder="Type your message..."
        maxLength={500}
        showCount
        required
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <button
        type="submit"
        className="w-full px-6 py-3 bg-yellow-400 rounded-xl font-semibold"
      >
        Submit
      </button>
    </form>
  );
}
```

---

## Styling Notes

- All components use the **Hubot font** for consistency
- Focus states include a **yellow ring** (`#FFCA08`)
- Error states use **red** (`#F44336`)
- Borders transition smoothly on hover and focus
- Disabled states reduce opacity and show not-allowed cursor
- All components are fully responsive

## Accessibility

- Proper label associations
- Required field indicators
- Error messages linked to inputs
- Keyboard navigation support
- ARIA attributes where needed
- Focus visible states

## Common Input Types

```tsx
// Text
<Input type="text" />

// Email
<Input type="email" />

// Password (with toggle)
<Input type="password" />

// Number
<Input type="number" />

// Tel
<Input type="tel" />

// URL
<Input type="url" />

// Date
<Input type="date" />

// Time
<Input type="time" />

// Color
<Input type="color" />
```
