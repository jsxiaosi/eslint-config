import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  external: ['pathe'],
  shims: true,
  dts: true,
  clean: true,
});
