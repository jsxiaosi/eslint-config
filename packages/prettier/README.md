# @jsxiaosi/eslint-config-prettier

共享 Prettier 配置，默认输出 LF、120 列、2 空格缩进、单引号和 trailing comma。

## 运行要求

- Node `>=14`
- `prettier` `>=3.0.0`
- 可选：`prettier-plugin-tailwindcss` `>=0.5`

## 安装

```bash
pnpm add -D prettier @jsxiaosi/eslint-config-prettier
```

## 基础用法

`prettier.config.mjs`

```js
import prettierConfig from '@jsxiaosi/eslint-config-prettier';

export default prettierConfig();
```

## 自定义 Prettier 选项

```js
import prettierConfig from '@jsxiaosi/eslint-config-prettier';

export default prettierConfig({
  printWidth: 100,
  semi: false,
});
```

## Tailwind CSS 类名排序

```bash
pnpm add -D prettier-plugin-tailwindcss
```

```js
import prettierConfig from '@jsxiaosi/eslint-config-prettier';

export default prettierConfig({
  tailwindcss: true,
});
```

## 配合 ESLint 使用

如果你同时启用了 `@jsxiaosi/eslint-config` 的 Prettier 规则，建议让 ESLint 读取同一份 Prettier 配置文件：

`eslint.config.mjs`

```js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  prettier: {
    usePrettierrc: true,
  },
});
```
