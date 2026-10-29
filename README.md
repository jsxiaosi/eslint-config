# jsxiaosi linting configs

`@jsxiaosi` 的规范配置 monorepo，当前对外发布 3 个包：

- `@jsxiaosi/eslint-config`：ESLint Flat Config，默认覆盖 JavaScript、TypeScript、JSON、YAML、TOML 和 Markdown，可按需开启 Vue、React、Prettier。
- `@jsxiaosi/eslint-config-prettier`：独立的 Prettier 共享配置，可按需开启 Tailwind CSS 类名排序。
- `@jsxiaosi/commitlint-config`：Commitlint 规则集，并附带 `czg` 交互式提交提示配置。

## 包列表

| 包名 | 作用 | 公开兼容性 | 文档 |
| --- | --- | --- | --- |
| `@jsxiaosi/eslint-config` | ESLint Flat Config | `eslint >=10`，Node `^22.22.2 || ^24.15.0 || >=26.0.0` | [packages/eslint/README.md](packages/eslint/README.md) |
| `@jsxiaosi/eslint-config-prettier` | Prettier 共享配置 | Node `>=14`，`prettier >=3.0.0` | [packages/prettier/README.md](packages/prettier/README.md) |
| `@jsxiaosi/commitlint-config` | Commitlint 配置 | Node `>=22.12.0`，当前依赖 Commitlint 21（peer 声明 `>=20`） | [packages/commitlint/README.md](packages/commitlint/README.md) |

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

当前 monorepo 开发和 ESLint 包运行环境要求 Node `^22.22.2 || ^24.15.0 || >=26.0.0`（由新版 JSDoc 和构建依赖决定），使用 pnpm 10.34.0。CI 覆盖 Node 22.22.2、24、26，发布使用 Node 24。TypeScript 保持 6.0.3，因为当前 `@typescript-eslint/parser` 的 peer 范围是 `>=4.8.4 <6.1.0`，暂不升级到 TypeScript 7。

```bash
pnpm install
pnpm build
pnpm test
```


## 兼容性验证

`pnpm test` 在构建后运行 20 项回归测试，检查 JS、TS、React TSX、Vue、JSON/JSONC/JSON5、YAML、TOML、Markdown 代码块的解析与规则触发，以及类型感知 TS、Emotion、Tailwind 排序、Commitlint 正反例与 Git revision range、ESM/CJS 入口。`pnpm smoke:eslint`、`pnpm smoke:prettier`、`pnpm smoke:commitlint` 保留为基础加载检查。

`pnpm lint:test_eslint` 是对 `fixtures/input` 中原始示例的手动诊断，不是零错误的测试断言；这些示例包含故意不规范的代码，命令会返回非零。CI 改用带明确预期规则的回归测试，避免示例 lint 的非零状态阻断后续 smoke。

测试不能穷尽所有兼容性问题。目前仍未穷举全部规则和配置组合、可选依赖缺失时的安装交互、Next/Remix/Vite 自动探测、Windows/macOS、所有 peer 最低版本，以及打包后在独立消费项目中的安装行为。依赖升级仍需审查上游变更，并为实际不兼容增加回归测试。

`eslint-plugin-markdown` 和 `conventional-changelog-cli` 已被上游标记为弃用；本次保留现有功能，迁移其替代包需要单独验证 Markdown 处理器和发布日志行为。

安装时仍有上游 `@conventional-changelog/git-client` 的可选 peer 版本警告；Commitlint 的标准输入和 Git revision range 路径均由回归测试验证。
