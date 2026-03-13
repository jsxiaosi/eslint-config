# jsxiaosi linting configs

`@jsxiaosi` 的规范配置 monorepo，当前对外发布 3 个包：

- `@jsxiaosi/eslint-config`：ESLint Flat Config，默认覆盖 JavaScript、TypeScript、JSON、YAML、TOML 和 Markdown，可按需开启 Vue、React、Prettier。
- `@jsxiaosi/eslint-config-prettier`：独立的 Prettier 共享配置，可按需开启 Tailwind CSS 类名排序。
- `@jsxiaosi/commitlint-config`：Commitlint 规则集，并附带 `czg` 交互式提交提示配置。

## 包列表

| 包名 | 作用 | 公开兼容性 | 文档 |
| --- | --- | --- | --- |
| `@jsxiaosi/eslint-config` | ESLint Flat Config | 基础包对外声明 `eslint >=9.10.0`，当前不声明 `engines.node`；开启 React 规则时需满足所安装 React lint 依赖自己的 Node floor（当前锁文件为 `>=20.19.0`） | [packages/eslint/README.md](packages/eslint/README.md) |
| `@jsxiaosi/eslint-config-prettier` | Prettier 共享配置 | Node `>=14`，`prettier >=3.0.0` | [packages/prettier/README.md](packages/prettier/README.md) |
| `@jsxiaosi/commitlint-config` | Commitlint 配置 | Node `>=18`，`@commitlint/*` / `commitlint >=20` | [packages/commitlint/README.md](packages/commitlint/README.md) |

## 快速开始

### ESLint

如果项目使用 TypeScript，也安装 `typescript`。

```bash
pnpm add -D eslint @jsxiaosi/eslint-config typescript
```

`eslint.config.mjs`

```js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi();
```

### Prettier

```bash
pnpm add -D prettier @jsxiaosi/eslint-config-prettier
```

`prettier.config.mjs`

```js
import prettierConfig from '@jsxiaosi/eslint-config-prettier';

export default prettierConfig();
```

### Commitlint

`husky` 仅在需要 Git hook 时安装。

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional commitlint @jsxiaosi/commitlint-config czg
```

`commitlint.config.mjs`

```js
export default {
  extends: ['@jsxiaosi/commitlint-config'],
};
```

## 仓库开发

当前 monorepo 的开发/发布环境以 Node `^20.19.0 || ^22.13.0 || >=24.0.0` 为基线。这是仓库和 release workflow 的运行 floor，不等同于 `@jsxiaosi/eslint-config` 已发布包的基础 public contract。

```bash
pnpm install
pnpm build
pnpm lint:test_eslint
```
