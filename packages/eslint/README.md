# @jsxiaosi/eslint-config

基于[@antfu/eslint-config](https://github.com/antfu/eslint-config)修改的个人配置

- 可选React、Vue配置
- 可选的Prettier风格化配置

## 安装

```base
pnpm add -D @jsxiaosi/eslint-config eslint
```

## 配置eslint.config.js

```javascript
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi();

```

## 添加命令

```base
{
  "lint:eslint": "eslint . --fix",
  "tsc": "tsc --noEmit --skipLibCheck",
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

## 定制

配置集成

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  // 项目类型。'lib' 表示库，默认为 'app'
  type: 'lib',

  // TypeScript 是自动检测的，你也可以明确启用它们：
  typescript: true,

  // 禁用 jsonc 和 yaml 支持
  jsonc: false,

  // Flat 配置不再支持 `.eslintignore`，请改用 `ignores`
  ignores: [
    '**/fixtures',
    // ...globs
  ]
})
```

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi(
  {
    // jsxiaosi config 配置
  },

  // 从第二个参数开始，它们是 ESLint Flat Configs
  // 你可以有多个配置
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

## 插件重命名

| New Prefix | Original Prefix        | Source Plugin                                                                              |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `ts/*`     | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |


自定义前缀

```javascript
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi()
  .renamePlugins({
    /**
     * {
     *    oldPrefix: newPrefix
     * }
     */
    ts: '@typescript-eslint',
    // ...
  })
```

## 覆盖规则

某些规则仅在特定文件中启用，例如，ts/*规则仅在文件中启用.ts，vue/*规则仅在文件中启用.vue。如果要覆盖规则，则需要指定文件扩展名：

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi(
  {
    vue: true,
    typescript: true
  },
  {
    // 请记住在此处指定文件 glob，否则可能会导致 vue 插件处理非 vue 文件
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  {
    // 不带“文件”的规则是所有文件的通用规则
    rules: {
      'style/semi': ['error', 'never'],
    },
  }
)
```

每个配置中集成了`overrides`方便覆盖规则

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
  yaml: {
    overrides: {
      // ...
    },
  },
})
```


## 配置

### Vue

启动`Vue`配置

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  vue: true
})
```

Vue2

`vueVersion` 默认Vue3版本，手动更改成Vue2版本

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  vue: {
    vueVersion: 2
  }
})
```

运行 `npm run lint:eslint` 会提示你安装对应的插件，你也可以手动安装
```base
pnpm -D eslint-plugin-vue vue-eslint-parser
```

### React 

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  react: true
})
```

运行 `npm run lint:eslint` 会提示你安装对应的插件，你也可以手动安装
```base
pnpm i -D @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### Prettier

```javascript
// eslint.config.js
import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  /**
   *  prettier:{
   *    prettierOptions: {}  prettier 配置
   *    usePrettierrc: false  是否使用项目中的 prettier 文件配置
   *  }
   */
  prettier: true

})
```

运行 `npm run lint:eslint` 会提示你安装对应的插件，你也可以手动安装
```base
pnpm i -D eslint-plugin-prettier prettier
```