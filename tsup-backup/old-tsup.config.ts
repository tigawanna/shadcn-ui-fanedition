import { defineConfig,build } from 'tsup'
import { resolve, dirname } from 'path'
import glob from "glob"



export default defineConfig({
    dts: true,
    minify: true,
    sourcemap: true,
    treeshake: true,
    splitting: true,
    clean: true,
    external: ['react', 'react-dom'],
    entry: [
        "src/index.ts",
        "src/components/tooltip/index.ts",
        'src/components/separator/index.ts',
         'src/components/sheet/index.ts',
        'src/components/skeleton/index.ts',
        'src/components/slider/index.ts',
        'src/components/switch/index.ts'
    ],
    // outExtension({ format,options }) {
    //     console.log("outExtension == ",options.name)
    //     return {
    //         js: `.${format}.js`,
    //     }
    // },

    format: ['esm'],


})


function getEntryPoints() {
    const entryPoints = {};

    // Search for all index.ts files in the src/components directory
    const files = glob.sync('src/components/**/index.ts');

    // Create an entry point for each file, using the directory name as the key
    files.forEach((file) => {
        const dir = dirname(file);
        console.log("🚀 ~ file: vite.config.ts:36 ~ files.forEach ~ file:", file)
        const key = dir.replace(/^src\/components\//, '');
        console.log("🚀 ~ file: vite.config.ts:37 ~ files.forEach ~ key:", key)

        entryPoints[key] = resolve(__dirname, file);
    });

    return entryPoints;
}



