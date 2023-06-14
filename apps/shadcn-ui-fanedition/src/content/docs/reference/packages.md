---
title: Packages Article
description: Building and Publishing NPM Packages With typescript , multiple entry points, tailwind , TSUP and NPM 
---


### Lessons learned from building and publishing 3 NPM packages

In this tutorial, we will learn how to create and publish your own NPM packages using TypeScript. We will cover everything from setting up your project with TypeScript, using `tsup` for building/

Top publish an NPM package we need to understand 3 configurations we don't think much about in an average JavaScript project

1. `package.json`: This file is used to configure your NPM package. It contains information about your package such as the name, version, description, and dependencies.
  
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

- `name`: The name of your package. This should be unique and not already taken on NPM.

- `version`:` The version number of your package. This should follow semantic versioning.

- description: A short description of your package.

- repository: The location of your package’s source code.

- `main`: The entry point for your package. This is the file that will be loaded when someone requires your package.

- `exports`:This field is used to specify the files that should be included when someone imports your package. This field can be used to point to `d.ts` files and multiple entry points. 

When you specify multiple entry points in the "exports" field, you can define a public interface for your package and encapsulate it, preventing any other entry points besides those defined in "exports". This can be useful when you want to expose only certain parts of your package to other modules.

For example, in your `package.jso`n` file, you could define multiple entry points like this:

`src/index.ts`
```ts
export function foo(){
return "FOO";
}

export function bar(){
return "BAR";
}
```
`src/math/foo.ts`
```ts
export function foo(){
return "FOO";
}
```
`src/math/bar.ts`
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

the exports field is very important as it tell the project that installs your package where to find specific resources 

`require`: `"./dist/index.js"`: This field specifies the path to the CommonJS module that should be used when someone requires your package using `require()`
```ts
const bar = require('my-package/bar');
```

`import`: `"./dist/index.js"`: This field specifies the path to the ES module that should be used when someone imports your package using `import`
```ts
import bar from 'my-package/bar';
```

`types`: `"./dist/index.d.ts"`: This field specifies the path to the TypeScript declaration file that should be used when someone wants to use your package with TypeScript.


- scripts: This field is used to define scripts that can be run with NPM run.

- dependencies: This field is used to specify the packages that your package depends on.

- devDependencies: This field is used to specify the packages that are only needed during development.

- `peerDependencies`: This field is used to specify the packages that your package depends on but expects the installer to already have , 
  > you can make assumptions like this if the package will be library specific like a `react/vue` component library but you can leave it empty for something more generic like a JavaScript math helper .
`react`,`vue` ... are common examples of peer dependencies



2. `tsconfig.json`: This file is used to configure the TypeScript compiler. It contains information about how TypeScript should compile your code.

3.  `tsconfig.node.json`: This file is used to configure the TypeScript compiler for Node.js. It contains information about how TypeScript should compile your code for Node.js.


### Project 1: [Simple Tailwind Plugin for `shadcn/ui` ](https://github.com/tigawanna/shadcn-ui-fanedition/tree/master/packages/tw)

In this project, I just wanted a cleaner way to configure the [`shadcn/ui tailwind comfig`](https://ui.shadcn.com/docs/installation#configure-tailwindconfigjs) 

and the [tailwind docs](https://v1.tailwindcss.com/docs/plugins#overview) were super easy and straight forward all I had to do was export the `plugin` function with my desired initial config

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

and we run `tsup` to build with the `tsup config`

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
- `dts`: This field specifies whether or not to generate `d.ts` files for your TypeScript code.
- `minify`: This field specifies whether or not to minify the output of your build.
- `sourcemap`: This field specifies whether or not to generate source maps for your build.
- `treeshake`: This field specifies whether or not to remove unused code from your build.
- `splitting`: This field specifies whether or not to split your output into chunks.
` clean`: This field specifies whether or not to clean the output directory before building.
- `outDir`: This field specifies the output directory for your build.
- `entry`: This field specifies the entry point(s) for your build.
- `format`: This field specifies the output format(s) for your build.

> the [`tsup config`](https://tsup.egoist.dev/#using-custom-configuration) can also be defined in the `package.json`

Since it's a simple package only exports one file , having a single entry point is just fine . after build you'll have a `dist` folder
![tailwind plugin files`](https://github.com/tigawanna/shadcn-ui-fanedition/blob/master/apps/shadcn-ui-fanedition/src/assets/tw-dist.png)

- `index.js` has the actual code
- `index.d.ts` has the typescript types 
- `index.js.map` has the source maps


Which corresponds to what we've defined in our `package.json`

```json
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
```

After publishing to NPM  we can then install it and use it like 


```sh
 npm i shadcn-fe-tw
 yarn add shadcn-fe-tw
 pnpm add shadcn-fe-tw
```

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


### Project 2: [Modified `shadcn/ui` CLI](https://github.com/tigawanna/shadcn-ui-fanedition/tree/master/packages/cli)

This one is also similar to the first but has more files which all get imported into the entry file 

![CLI project structure](https://github.com/tigawanna/shadcn-ui-fanedition/blob/master/apps/shadcn-ui-fanedition/src/assets/dist-cli.png)

and then we declare our main and `dts` in the `package.json`

```json  
"type": "module",
  "exports": "./dist/index.js",
  "bin": "./dist/index.js",
    "files": [
      "dist"
    ]
```

The `bin` field in the `package.json` file is used to specify the location of executable files that should be installed in the PATH. It is a map of command name to local file name. When you install a package with a bin specified, NPM will `symlink` that file into prefix/bin for global installs, or `./node_modules/.bin/ for local installs12`



### Project #: [`shadcn/ui` components on NPM](https://github.com/tigawanna/shadcn-ui-fanedition/tree/master/packages/ui)

In this project I built the [`shadcn/ui` components](https://ui.shadcn.com/) into an installable NPM package

36 components in total  makes using multiple entry points a good idea


first we arrange the components in folders and then import them into the `src/index.ts` 

In my case I used the [cli tool](https://github.com/tigawanna/shadcn-ui-fanedition/tree/master/packages/ui) to download all the components into `src/shadcn` , then I used a [script](https://github.com/tigawanna/shadcn-ui-fanedition/blob/17f0b8bf6500786669ad015a95ea8c371b8035aa/packages/ui/scripts/bulk-port.js) to organize them into folders

The expected folder structure should be `src/components/[component name]`

and inside the component director we'll have 
- `index.ts` : to export everything from
- `[compnent name].tsx` : the actual component
- `[component name].stories.ts` : the component story.
- any other related files

and with that folder structure we can import it into the `src/index.ts` as the main entry point
at this point we can declare it in the `package.json`

```json
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
```
But we can optimize it further , from my tests tinkering with this setup as it stands , everything gets imported when you 

```ts
import { Button } from "shadcn-fe-ui";
```
Some of the components on this list have hooks and other event handlers which are not allowed in next!3 appDir without adding a `"use client"` directive.

which means using it like this will opt us out of any gains that RSCs give us by forcing ever component to be a client component.

luckily `tsup` can take in multiple entry point and generate multiple files in our `dist` directory , helping us isolate an components with hooks so that the can be installed like 

```ts
import { ClientButton } from "shadcn-fe-ui/client-button";
```

first we have to add our new entry points in `tsup.config.ts`

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
  entry: ['src/index.ts', 'src/client-buttonts'], // Entry point(s)
  format: ['esm'], // Output format(s)
});
```
then we build the project and adjust the `package.json`

```json
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
      },
    "./client-button": {
        "import":"./dist/client-button.js",
        "types":"./dist/client-button.d.ts"
        }
  }
```
And now when we install we can import it like 
```ts
import { ClientButton } from "shadcn-fe-ui/client-button";
```

repeating this process for 36 components can be tedious so I wrote a [script](https://github.com/tigawanna/shadcn-ui-fanedition/blob/17f0b8bf6500786669ad015a95ea8c371b8035aa/packages/ui/scripts/entry-points..js) to add the appropriate fields to the `package.json`

as for the `tsup.config.ts` we can use a patter matching regex to determine the entry points

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
  entry: ['src/index.ts','src/components/**/index.ts'], // Entry point(s)
  format: ['esm'], // Output format(s)
});
```

I noticed a bug in this that will fail build when generating the `d.ts` and throw an error about worker timeout .
This bug doesn't appear if you only limit the build to 5 files

but the do provide a build function that lets us programmatically build. 
So I used it to batch the builds 3 at a time (you can go as high as 7).

```js
import glob from "glob"
import { build } from 'tsup'
import _ from 'lodash';

async function buildStage({ clean, entry }) {
    console.log("🚀 ~ building entry ", entry)
    
    try {
        await build({
            dts: true,
            minify: true,
            sourcemap: true,
            treeshake: true,
            // splitting: true,
            outDir: 'dist',
            clean,
            entry,
            external: ['react', 'react-dom'],
            format: ['esm'],
        });
    } catch (error) {
        console.log("🚀 ~ error while building entries :", entry);
        console.log(error);
        throw error;
    }
}

export async function buildAllStages() {

    const root_file = glob.sync('src/index.ts');
    const files = glob.sync('src/components/**/index.ts');
    const chunkSize = 3;
    const chunks = _.chunk(files, chunkSize);

        for await (const [index, chunk] of chunks.entries()) {
      console.log('🚀 ~ chnk === ', chunk);
        await buildStage({ clean:index===0, entry: chunk });
    }
    await buildStage({ clean:false, entry: root_file });
    //    await buildStage({ clean:true, entry: root_file });


}



export function invokeBuild(){

buildAllStages().then(()=>{
    console.log("🚀 ~ buildAllStages success");
}).catch((error)=>{
    console.log("🚀 ~ buildAllStages error === ", error);
})
}
invokeBuild()

```

and added the a new script to our `package.json` 

```json
  "scripts": {
          "build": "node scripts/tsup-build-stages.js",
  }
```
and now we should get our components as an installable NPM package

### Final thoughts 

- `tsup` is a great build tool and enables one to get really far with minimal config , they also are the only build tool with seamless `d.ts`generation with other tool asking you to use `tsc` directly for the `d.ts` outputs.
 notable mentions include
 - bun : great build too easy config , but no `d.ts` output
 - parcel : I couldn't figure out how to do multi entry points and their config has to be either  in `package.json` or a `.parcel` file which don't offer code suggestion making it hard to explore the options.
 - `vite` : `vite` builds great , has a `d.ts` plugin but it's outputs we al little off ,they also don't have an easy was to do multiple entry points and you have to manually specify the files no regex patter matching and even using a function to generate the paths it still wasn't as easy as `tsup` 


The one thing that took me a while to wrap my head around was the relationship between the `build tool config` and the `package.json` .

 - `build tool config`  will:
   - specify the entry points
   - specify the output directory
   - specify the output format
   - specify the source map
   - specify minify or not
   - specify splitting or not
-  `package.json` will:
   - specify the project name
   - specify the project version
   - specify the output/exports location
   - specify where to find the different types (`import`:`esm` , `require`:`cjs` , ...)
   - specify the types location



### References

[`shadcn/ui`](https://ui.shadcn.com/) : the great project that inspired mine

[simple guide ](https://youtu.be/eh89VE3Mk5g) : basic guide on create and publish an NPM library

[`npm` + release-it ](https://www.youtube.com/watch?v=7pBcuT7j_A0) : simple tutorial on how to publish and automate the publishing of an `npm` packages


