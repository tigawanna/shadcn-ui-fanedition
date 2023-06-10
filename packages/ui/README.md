# SHADCN/UI compnents
a fan implamentation of the SHADCN/UI project as an npm library

npm i shadcnfe-components 
and add this to your `tailwind.config.js`
 ```js
   content: [
  './src/app/**/*.{ts,tsx}',
    './node_modules/shadcn-fe-components/dist/**/*.{js,ts,jsx,tsx}'
      
	]
 ```
you can also be selective and only load the css for the files you've used


