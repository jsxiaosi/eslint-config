# @jsxiaosi/eslint-config

基于 ESLint Flat Config 的共享配置。默认包含 JavaScript、TypeScript、JSON、YAML、TOML 和 Markdown 规则，可按需开启 Vue、React 和 Prettier 支持。

## 公开兼容性

- 基础包对外声明 `eslint >=10`，Node `^22.22.2 || ^24.15.0 || >=26.0.0`；Node floor 来自 JSDoc 等运行依赖
- React 使用 `@eslint-react/eslint-plugin`、`eslint-plugin-react-hooks` 和 `eslint-plugin-react-refresh`，不再需要 `eslint-plugin-react`；Emotion 的 `css` 属性由 `react-plugin/dom-no-unknown-property` 的忽略项处理
- monorepo 和发布流程使用上述 Node 范围，CI 覆盖 Node 22.22.2、24、26
- 如果项目使用 TypeScript，请安装 `typescript`；安装后会自动启用 TypeScript 规则

## 安装

基础安装：

```bash
pnpm add -D eslint @jsxiaosi/eslint-config typescript
```

按需安装可选能力：

- Vue: `pnpm add -D eslint-plugin-vue vue-eslint-parser`
- React: `pnpm add -D @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh`
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
