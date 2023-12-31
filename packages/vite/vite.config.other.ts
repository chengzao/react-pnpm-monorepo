import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fastGlob from 'fast-glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';
import { libInjectCss, scanEntries } from 'vite-plugin-lib-inject-css';
// const entries = fastGlob.sync('src/**/*.{ts,tsx}');

export default defineConfig(async ({ command, mode }) => {
  return {
    plugins: [
      react(),
      dts({
        outDir: 'dist/esm',
      }),
      libInjectCss({
        formats: ['es', 'cjs'],
        entry: scanEntries('src'),
        rollupOptions: {
          external: ['react', 'react-dom'],
          input: Object.fromEntries(
            fastGlob
              .sync('src/**/*.{ts,tsx}')
              .map((file) => [
                path.relative('src', file.slice(0, file.length - path.extname(file).length)),
                fileURLToPath(new URL(file, import.meta.url)),
              ]),
          ),
          output: [
            {
              dir: 'dist/esm',
              format: 'es',
              entryFileNames: '[name].js',
              // exports: 'named',
              // preserveModules: true,
              // preserveModulesRoot: 'src',
            },
            {
              dir: 'dist/cjs',
              format: 'cjs',
              exports: 'named',
              // preserveModules: true,
              // preserveModulesRoot: 'src',
            },
          ],
        },
      }),
    ],
    // build: {
    //   rollupOptions: {
    //     external: ['react', 'react-dom'],
    //     input: Object.fromEntries(
    //       fastGlob
    //         .sync('src/**/*.{ts,tsx}')
    //         .map((file) => [
    //           path.relative('src', file.slice(0, file.length - path.extname(file).length)),
    //           fileURLToPath(new URL(file, import.meta.url)),
    //         ]),
    //     ),
    //     output: [
    //       {
    //         dir: 'dist/esm',
    //         format: 'es',
    //         entryFileNames: '[name].js',
    //         // exports: 'named',
    //         // preserveModules: true,
    //         // preserveModulesRoot: 'src',
    //       },
    //       {
    //         dir: 'dist/cjs',
    //         format: 'cjs',
    //         exports: 'named',
    //         // preserveModules: true,
    //         // preserveModulesRoot: 'src',
    //       },
    //     ],
    //   },
    //   lib: {
    //     entry: entries,
    //     // formats: ['es', 'cjs'],
    //   },
    // },
  };
});
