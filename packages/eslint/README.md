# @jsxiaosi/eslint-config

基于 ESLint Flat Config 的共享配置。默认包含 JavaScript、TypeScript、JSON、YAML、TOML 和 Markdown 规则，可按需开启 Vue、React 和 Prettier 支持。

## 公开兼容性

- 基础包当前对外声明的 peer contract 是 `eslint >=9.10.0`；`package.json` 目前不声明 `engines.node`
- 开启 `react: true` 时，需要额外安装 React lint 依赖，并满足这些依赖自己的 Node floor；当前仓库锁文件解析到 `@eslint-react/eslint-plugin@2.13.0`，其 `engines.node` 为 `>=20.19.0`
- 这个 monorepo 以及 `publish.yml` 的开发/发布环境当前使用 Node `^20.19.0 || ^22.13.0 || >=24.0.0`
- 如果项目使用 TypeScript，请安装 `typescript`；安装后会自动启用 TypeScript 规则

## 安装

基础安装：

```bash
pnpm add -D eslint @jsxiaosi/eslint-config typescript
```

按需安装可选能力：

- Vue: `pnpm add -D eslint-plugin-vue vue-eslint-parser`
- React: `pnpm add -D @eslint-react/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh`
- Prettier: `pnpm add -D eslint-plugin-prettier prettier`

启用对应能力但未安装依赖时，配置会在运行时提示安装缺失包。

## 基础用法

`eslint.config.mjs`

```js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi();
```

`package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 常用配置

### 忽略文件与项目类型

```js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  type: 'lib',
  ignores: ['**/fixtures/**', '**/dist/**'],
});
```

### Vue、React、Prettier

```js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  vue: true,
  react: true,
  prettier: {
    usePrettierrc: true,
  },
});
```

### TypeScript 类型感知规则

```js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
});
```

### 覆盖规则和追加 Flat Config

```js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi(
  {
    vue: true,
    typescript: {
      overrides: {
        'ts/consistent-type-definitions': ['error', 'interface'],
      },
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
);
```

## 说明

- Flat Config 不再使用 `.eslintignore`，请改用 `ignores`
- `typescript` 默认按项目依赖自动检测；不需要时可显式设置为 `false`
- `react` 默认按 React 19 规则集生成 `settings.react.version`
- 如果需要单独共享 Prettier 配置，查看 [`@jsxiaosi/eslint-config-prettier`](../prettier/README.md)
