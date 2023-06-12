# shadcn/ui compnents

a fan implamentation of the SHADCN/UI project as an NPM library

## installation

```bash
 npm i shadcn-fe-ui
 yarn add shadcn-fe-ui
 pnpm add shadcn-fe-ui
```

> this project does not ship css files and assumes you're already using tailwind , the styles will be derived from the component tailwind classnames

Add this to your `tailwind.config.js`

```js
content: [
  './src/app/**/*.{ts,tsx}',
  './node_modules/shadcn-fe-ui/dist/**/*.{js,ts,jsx,tsx}',
];
```

you can also be selective and only load the css for the files you've used

for everything in button styles

```js
content: [
  './src/app/**/*.{ts,tsx}',
  './node_modules/shadcn-fe-ui/dist/button/{*}.{js,ts,jsx,tsx}',
];
```

for a specific button.tsx styles

```js
content: ['./src/app/**/*.{ts,tsx}', './node_modules/shadcn-fe-ui/dist/**/button.tsx'];
```

You can then import

>

```tsx
import { Button } from 'shadcn-fe-ui';
```

or import individual components for smaller bundles sizes

```tsx
import { Button } from 'shadcn-fe-ui/button';
```


