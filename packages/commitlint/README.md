# @jsxiaosi/commitlint-config

- 合理的默认配置
- commit 校验，更好维护工程化项目
- 使用简单无需繁琐的添加配置
- 内置cz-git 友好型命令行工具，“懒字优先” ！支持在命令行搜索和选择，减少拼写错误

## 安装

```base
pnpm add -D @jsxiaosi/commitlint-config czg
```

## 配置commitlint.config.js

```base
{
  extends: ['@jsxiaosi/commitlint-config']
}
```

## package.json添加配置

```base
"config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
```

## 添加命令

```base
{
  "cz": "czg",
}
```

## husky

cz-git配合husky使用

- 安装

```base
pnpm add -D husky
```

- 配置husky

```base
npx husky-init
```

- 添加Hook

```base
npx husky add .husky/commit-msg  "npx --no -- commitlint --edit ${1}"
```

## 内置类型

- `feat:` 新增功能
- `fix:` 修复缺陷
- `docs:` 文档变更
- `style:` 代码格式
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 添加疏漏测试或已有测试改动
- `build:` 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)
- `ci:` 修改 CI 配置、脚本
- `revert:` 回滚 commit
- `chore:` 对构建过程或辅助工具和库的更改 (不影响源文件)
- `wip:` 正在开发中
- `types:` 类型定义文件修改

## cz-git

[`cz-git`](https://cz-git.qbb.sh/zh/)一款工程性更强，轻量级，高度自定义，标准输出格式的 commitizen 适配器

cz-git的功能非常丰富，但是一些额外的配置需要用逻辑来实现，如果内置这些配置的话会有一定的约束性，所以一些cz-git 更高级的用法需要自行在项目中添加

### scopes配置举例

- 修改commitlint.config.js

```base
const fs = require('fs');
const path = require('path');

const scopes = fs.readdirSync(path.resolve(__dirname, 'packages'));

module.exports = {
  extends: ['@jsxiaosi/commitlint-config'],
  prompt: {
    // 范围设置
    scopes: [...scopes, 'mock'],
    // 范围是否可以多选
    enableMultipleScopes: true,
    // 多选范围后用标识符隔开
    scopeEnumSeparator: ',',
  },
};

```

更多高级用法详细请看：[cz-git](https://cz-git.qbb.sh/zh/recipes/)
