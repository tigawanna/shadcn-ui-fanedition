import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import glob from 'glob';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'vite',

    lib: {
      // entry: resolve(__dirname, 'src/index.ts'),
      entry: getEntryPoints(),
      formats: ['es'],
      name: 'MyLib',
      fileName: (format, entry) => `${entry}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@/shadcn/lib/utils'],
    },
  },

  plugins: [react(), dts()],
});

function getEntryPoints() {
  const entryPoints = {};

  // Search for all index.ts files in the src/components directory
  const files = glob.sync('src/components/**/index.ts');

  // Create an entry point for each file, using the directory name as the key
  files.forEach((file) => {
    const dir = dirname(file);
    console.log('🚀 ~ file: vite.config.ts:36 ~ files.forEach ~ file:', file);
    const key = dir.replace(/^src\/components\//, '');
    console.log('🚀 ~ file: vite.config.ts:37 ~ files.forEach ~ key:', key);

    entryPoints[key] = resolve(__dirname, file);
  });

  return entryPoints;
}
