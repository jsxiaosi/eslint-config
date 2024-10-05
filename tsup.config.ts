import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'], // 只生成 ESM 格式的代码
  shims: true,
  dts: true,
  clean: true,
});
