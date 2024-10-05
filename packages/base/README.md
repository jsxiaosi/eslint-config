# @jsxiaosi/eslint-config-base （弃用）

> [!CAUTION]
>  @jsxiaosi/eslint-config-base 已经被弃用，请使用[@jsxiaosi/eslint-config](https://github.com/jsxiaosi/eslint-config/tree/main/packages/eslint)

- 合理的默认配置
- 无需配合Prettier也能自动修复格式化
- 使用简单无需繁琐的添加配置

## 安装

```base
pnpm add -D @jsxiaosi/eslint-config-base
```

## 配置eslint.config
```javascript
import jsxiaosiConfig from "@jsxiaosi/eslint-config-base"

export default [
  ...jsxiaosiConfig,

  // {...}  you config
]
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
