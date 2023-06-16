import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  minify: true,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  clean: true,
  outDir:"dist",
  external: ['react', 'react-dom'],
  entry: ['src/index.ts', 
  'src/components/button/index.ts',
  'src/components/sheet/index.ts',

],
  format: ['esm'],
});
