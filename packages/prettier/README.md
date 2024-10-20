# @jsxiaosi/eslint-config-prettier

- 合理的默认配置
- 支持Vue，支持Typescript，Jsx格式化
- 使用简单无需繁琐的添加配置

## 安装

```base
pnpm add -D @jsxiaosi/eslint-config-prettier prettier
```

## 配置.prettier.config.js

```JavaScript
import prettierConfig from '@jsxiaosi/eslint-config-prettier';

export default {
  ...prettierConfig,
};

```

## 配合eslint使用

eslint.config.js 添加配置

```JavaScript
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi(
  {
    prettier: {
      usePrettierrc: true,
    },
  },
);
```

## 添加命令

```json
{
  "lint:fix": "eslint . --fix"
}
```

## VS Code 自动修复

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

```