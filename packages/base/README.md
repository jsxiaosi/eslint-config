# @jsxiaosi/eslint-config-base

- 合理的默认配置
- 无需配合Prettier也能自动修复格式化
- 使用简单无需繁琐的添加配置

## 安装

```base
pnpm add -D @jsxiaosi/eslint-config-base
```

## 配置.eslintrc

```base
{
  "extends": ["@jsxiaosi/eslint-config-base"]
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
