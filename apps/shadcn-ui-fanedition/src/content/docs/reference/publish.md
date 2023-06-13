# Building and Publishing NPM Packages: Lessons Learned from 3 Projects

In this tutorial, we will learn how to create and publish your own Npm packages using TypeScript. We will cover everything from setting up your project with TypeScript, using tsup for building/

Top publish an NPM package we need to understand 3 configuratiions we don't think much about in an average Javascript project

1. `package.json`: This file is used to configure your Npm package. It contains information about your package such as the name, version, description, and dependencies.
  
```json
{
    "name": "my-package",
    "version": "1.0.0",
    "description": "My package description",
    "repository": {
        
    },
    "main": "index.js",
    "exports": {
        "*":{
            "types": "./index.d.ts",
            "require": "./index.js",
            "import": "./index.js"
        }
    },
    "scripts": {
        "build":"tsup"

    },
    "dependencies": {
        
    },
    "devDependencies": {
        
    },


}
```
The most important field for any NPM package are

- `name`: The name of your package. This should be unique and not already taken on Npm.

- `version`:` The version number of your package. This should follow semantic versioning.

- description: A short description of your package.

- repository: The location of your package’s source code.

- `main`: The entry point for your package. This is the file that will be loaded when someone requires your package.

- `exports`:This field is used to specify the files that should be included when someone imports your package. This field can be used to point to d.ts files and multiple entry points. 

When you specify multiple entry points in the "exports" field, you can define a public interface for your package and encapsulate it, preventing any other entry points besides those defined in "exports". This can be useful when you want to expose only certain parts of your package to other modules.

For example, in your package.json file, you could define multiple entry points like this:

src/index.ts
```ts
export function foo(){
return "FOO";
}

export function bar(){
return "BAR";
}
```
src/math/foo.ts
```ts
export function foo(){
return "FOO";
}
```
src/math/bar.ts
```ts
export function bar(){
return "BAR";
}
```


```json
"exports": {
    ".": {
        "require": "./dist/index.js",
        "import": "./dist/index.js",
        "types": "./dist/index.d.ts"
    },
    "./foo": {
        "require": "./dist/foo.js",
        "import": "./dist/foo.js",
        "types": "./dist/foo.d.ts"
    },
    "./bar": {
        "require": "./dist/bar.js",
        "import": "./dist/bar.js",
        "types": "./dist/bar.d.ts"
    }
}
```

This would allow someone to import your package like this:

```js
import { foo, bar } from 'my-package';
import foo from 'my-package/foo';
import bar from 'my-package/bar';

```

This can be useful when you want to expose different parts of your package as separate modules.

the exports field is very importtant as it tell the project that instals your package where to find specific resources 

`require`: "./dist/index.js": This field specifies the path to the CommonJS module that should be used when someone requires your package using `require()`
```ts
const bar = require('my-package/bar');
```

`import`: "./dist/index.js": This field specifies the path to the ES module that should be used when someone imports your package using `import`
```ts
import bar from 'my-package/bar';
```

`types`: "./dist/index.d.ts": This field specifies the path to the TypeScript declaration file that should be used when someone wants to use your package with TypeScript.


- scripts: This field is used to define scripts that can be run with npm run.

- dependencies: This field is used to specify the packages that your package depends on.

- devDependencies: This field is used to specify the packages that are only needed during development.

- `peerDependencies`: This field is used to specify the packages that your package depends on but expects the installer to already have , 
  > you can make assumptions like this if the package will be library specific like a react/vue component library but you can leave it empty for something more generic like a javascript math helper .
react,vue ... are common examples od peer dependancies



2. `tsconfig.json`: This file is used to configure the TypeScript compiler. It contains information about how TypeScript should compile your code.

3.  `tsconfig.node.json`: This file is used to configure the TypeScript compiler for Node.js. It contains information about how TypeScript should compile your code for Node.js.


## Project 1: [Simple Tailwind Plugin for a shadcn/ui fan edition](https://github.com/tigawanna/shadcn-ui-fanedition/tree/master/packages/tw)

In this project, i just wanted a cleaner way to configure the [shadcn/ui tailwind comfig](https://ui.shadcn.com/docs/installation#configure-tailwindconfigjs) 

and the [tailwind docs](https://v1.tailwindcss.com/docs/plugins#overview) were super easy and straight forward all i had to do was export the `plugin` function with my desired initial config

`src/index.ts`
```ts
import plugin from 'tailwindcss/plugin'
export default plugin(
    function () { },
    {
        content: [
            './node_modules/shadcn-fe-ui/dist/**/*.{js,ts,jsx,tsx}',
        ],
        theme: {
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
        }
        }
        )

```

and we run `tsup` to build with the tsup config

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true, // Generate .d.ts files
  minify: true, // Minify output
  sourcemap: true, // Generate sourcemaps
  treeshake: true, // Remove unused code
  splitting: true, // Split output into chunks
  clean: true, // Clean output directory before building
  outDir:"dist", // Output directory
  entry: ['src/index.ts'], // Entry point(s)
  format: ['esm'], // Output format(s)
});
```
- `dts`: This field specifies whether or not to generate .d.ts files for your TypeScript code.
- `minify`: This field specifies whether or not to minify the output of your build.
- `sourcemap`: This field specifies whether or not to generate sourcemaps for your build.
- `treeshake`: This field specifies whether or not to remove unused code from your build.
- `splitting`: This field specifies whether or not to split your output into chunks.
` clean`: This field specifies whether or not to clean the output directory before building.
- `outDir`: This field specifies the output directory for your build.
- `entry`: This field specifies the entry point(s) for your build.
- `format`: This field specifies the output format(s) for your build.

> the [tsup config](https://tsup.egoist.dev/#using-custom-configuration) can also be defined in the package.json




