# `shadcn-fe-ui` components

Fan implementation of the SHADCN/UI project as an NPM library

## installation

```bash
 npm i shadcn-fe-ui
 yarn add shadcn-fe-ui
 pnpm add shadcn-fe-ui
```

And optionally the tailwind plugin

```bash
 npm i shadcn-fe-tw tailwindcss-animate
 yarn add shadcn-fe-tw tailwindcss-animate
 pnpm add shadcn-fe-tw tailwindcss-animate
```

and add it into your `tailwind.config`

```ts
export default {
  content: [
    // vite
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
        // next
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],

plugins: [
    require("tailwindcss-animate"),
    require("shadcn-fe-tw")
  ],
};

```

or just add the tailwind config manually
```ts
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

```

> this project does not ship CSS files and assumes you're already using tailwind , the styles will be derived from the component tailwind class names

Add this to your `tailwind.config.js`

```js
content: [
  './src/app/**/*.{ts,tsx}',
  './node_modules/shadcn-fe-ui/dist/**/*.{js,ts,jsx,tsx}',
];
```

you can also be selective and only load the CSS for the files you've used

for everything in button styles

```js
content: [
  './src/app/**/*.{ts,tsx}',
  './node_modules/shadcn-fe-ui/dist/button/{*}.{js,ts,jsx,tsx}',
];
```

for a specific `button.tsx` styles

```js
content: ['./src/app/**/*.{ts,tsx}', './node_modules/shadcn-fe-ui/dist/**/button.tsx'];
```



and add some default `shadcn/ui` styles
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

```
You can use the [color tool](https://shad-color-generator.vercel.app/) to customize your CSS variables then paste them back in.

And use the components like 

>

```tsx
import { Button } from 'shadcn-fe-ui';
```

or import individual components for smaller bundles sizes

```tsx
import { Button } from 'shadcn-fe-ui/button';
```

⚠⚠ Usage with `Nextjs` seems not to support type-checking for the multiple entry points unless if this is set in the `tsconfig.json` 
```json
{
  "compilerOptions":{
        "moduleResolution": "node16",
  }
}
```
instead of 
```json
{
  "compilerOptions":{
        "moduleResolution": "node",
  }
}
```
