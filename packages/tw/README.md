# `shadcn-fe-tw`

A tailwind plugin for `shadcn/ui` project that houses all the default tailwind configs for `shadcn/ui`

## installation

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

