# @jsxiaosi/commitlint-config

- 合理的默认配置
- 无需配合Prettier也能自动修复格式化
- 使用简单无需繁琐的添加配置
- 支持Typescript，Vue3

## 安装

```base
pnpm add -D @jsxiaosi/eslint-config-vue
```

## 配置.eslintrc

```base
{
  "extends": ["@jsxiaosi/eslint-config-vue"]
}
```

## 添加命令

```base
{
  "lint:fix": "eslint . --fix",
  "type:check": "vue-tsc --noEmit --skipLibCheck",
}
```

## 集成vue-tsc

- 安装

```base
pnpm add -D vue-tsc
```

- 添加命令

```base
{
  "type:check": "vue-tsc --noEmit --skipLibCheck",
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
