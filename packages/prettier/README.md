# @jsxiaosi/eslint-config-prettier （弃用）

> [!CAUTION]
>  @jsxiaosi/eslint-config-prettier 已经被弃用，请使用[@jsxiaosi/eslint-config](https://github.com/jsxiaosi/eslint-config/tree/main/packages/eslint)

- 合理的默认配置
- 支持Vue，支持Typescript，Jsx格式化
- 使用简单无需繁琐的添加配置

## 安装

```base
pnpm add -D @jsxiaosi/eslint-config-prettier prettier
```

## 配置.prettier.config.js

```base
{
  ...require('@jsxiaosi/eslint-config-prettier'),
}
```

## 配合eslint使用

.eslint添加配置

```base
{
  "extends": [
    "@jsxiaosi/eslint-config-base",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "usePrettierrc": true
      }
    ]
  }
}
```

## 添加命令

```base
{
      "lint:fix": "eslint . --fix"
}
```

## VS Code 自动修复

```base
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

```
