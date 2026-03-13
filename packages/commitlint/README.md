# @jsxiaosi/commitlint-config

共享 Commitlint 配置，内置 Conventional Commits 规则和 `czg` 交互式提交提示。

## 运行要求

- Node `>=18`
- `@commitlint/cli` `>=20`
- `@commitlint/config-conventional` `>=20`
- `commitlint` `>=20`
- `czg` `>=1.10.0`
- `husky` `>=8.0.0`，仅在需要 Git hook 时安装

## 安装

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional commitlint @jsxiaosi/commitlint-config czg
```

如果需要 Git hook，再额外安装：

```bash
pnpm add -D husky
```

## 基础用法

`commitlint.config.mjs`

```js
export default {
  extends: ['@jsxiaosi/commitlint-config'],
};
```

`package.json`

```json
{
  "scripts": {
    "commit": "czg"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

## Git hook 集成

如果项目已经使用 Husky，在 `.husky/commit-msg` 中执行：

```sh
pnpm exec commitlint --edit "$1"
```

## 内置提交类型

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `revert`, `chore`, `wip`, `types`
