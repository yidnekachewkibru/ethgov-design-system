/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/**/*.stories.tsx', 'src/test'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Do not bundle React, tokens, or @ethds/react into the library.
      external: ['react', 'react-dom', 'react/jsx-runtime', '@ethds/react', '@ethds/tokens'],
      output: {
        // The library emits a single stylesheet → dist/ethds-patterns.css
        // (see the "./styles.css" export in package.json).
        assetFileNames: 'ethds-patterns.[ext]',
      },
    },
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
