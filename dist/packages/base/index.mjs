import pluginJsonc from 'eslint-plugin-jsonc';
import 'eslint-plugin-markdown';
import jsoncParser from 'jsonc-eslint-parser';
import * as pluginImport from 'eslint-plugin-import-x';

const index = [
  {
    files: ['*.json', '*.json5'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/comma-dangle': ['error', 'never'],
      'jsonc/comma-style': ['error', 'last'],
      'jsonc/indent': ['error', 2],
      'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'jsonc/no-octal-escape': 'error',
      'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
      'jsonc/object-curly-spacing': ['error', 'always'],
      'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    },
  },
  {
    files: ['package.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            'publisher',
            'name',
            'displayName',
            'type',
            'version',
            'private',
            'packageManager',
            'description',
            'author',
            'license',
            'funding',
            'homepage',
            'repository',
            'bugs',
            'keywords',
            'categories',
            'sideEffects',
            'exports',
            'main',
            'module',
            'unpkg',
            'jsdelivr',
            'types',
            'typesVersions',
            'bin',
            'icon',
            'files',
            'engines',
            'activationEvents',
            'contributes',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'dependencies',
            'optionalDependencies',
            'devDependencies',
            'pnpm',
            'overrides',
            'resolutions',
            'husky',
            'simple-git-hooks',
            'lint-staged',
            'eslintConfig',
          ],
        },
        {
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
          order: { type: 'asc' },
        },
        {
          pathPattern: '^exports.*$',
          order: ['types', 'require', 'import'],
        },
      ],
    },
  },
  {
    files: ['*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
    },
  },
  {
    // 忽略检查md文件代码块
    files: ['**/*.md/*.*'],
    rules: {
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'import/no-unresolved': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        browser: true,
        es6: true,
        node: true,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    ignores: [
      '*.min.*',
      '*.d.ts',
      'CHANGELOG.md',
      'dist',
      'LICENSE*',
      'output',
      'coverage',
      'public',
      'temp',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
    ],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    // extends: [
    //   'plugin:import/recommended',
    //   'plugin:jsonc/recommended-with-jsonc',
    //   'plugin:markdown/recommended',
    // ],
    plugins: {
      jsonc: pluginJsonc,
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs'] },
      },
    },
    // 在 eslint 中支持异步函数 https://github.com/eslint/eslint/issues/8366
    // overrides: [
    // ],
    rules: {
      /* -------------->  错误逻辑相关  <-------------- */
      // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
      'for-direction': 'error',
      // 强制 getter 函数中出现 return 语句
      'getter-return': 'error',
      // 禁止使用异步函数作为 Promise executor
      'no-async-promise-executor': 'error',
      // 禁止与 -0 进行比较
      'no-compare-neg-zero': 'error',
      // 禁止条件表达式中出现赋值操作符
      'no-cond-assign': 'error',
      // 禁止在条件中使用常量表达式
      'no-constant-condition': 'error',
      // 禁止在正则表达式中使用控制字符
      'no-control-regex': 'error',
      // 禁用 debugger
      'no-debugger': 'off',
      // 禁止 function 定义中出现重名参数
      'no-dupe-args': 'error',
      // 禁止对象中出现重复的 key
      'no-dupe-keys': 'error',
      // 禁止 switch 出现重复的 case 标签
      'no-duplicate-case': 'error',
      // 禁止出现空语句块
      'no-empty': 'error',
      // 禁止在正则表达式中使用空字符集
      'no-empty-character-class': 'error',
      // 禁止对 catch 子句的参数重新赋值
      'no-ex-assign': 'error',
      // 禁止不必要的布尔转换
      'no-extra-boolean-cast': 'error',
      // 禁止不必要的分号
      'no-extra-semi': 'error',
      // 禁止对 function 声明重新赋值
      'no-func-assign': 'error',
      // 禁止在嵌套的块中出现变量声明或 function 声明
      'no-inner-declarations': 'error',
      // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
      'no-invalid-regexp': 'error',
      // 禁止不规则的空白
      'no-irregular-whitespace': 'error',
      // 不允许在字符类语法中出现由多个代码点组成的字符
      'no-misleading-character-class': 'error',
      // 禁止把全局对象作为函数调用
      'no-obj-calls': 'error',
      // 禁止直接调用 Object.prototypes 的内置属性
      'no-prototype-builtins': 'error',
      // 禁用稀疏数组 错误示例：[ "red",, "blue" ]
      'no-sparse-arrays': 'error',
      // 禁止出现令人困惑的多行表达式
      'no-unexpected-multiline': 'error',
      // 禁止在 return、throw、continue 和 break 语句之后出现代码
      'no-unreachable': 'error',
      // 禁止在 finally 语句块中出现控制流语句
      'no-unsafe-finally': 'error',
      // 禁止对关系运算符的左操作数使用否定操作符
      'no-unsafe-negation': 'error',
      // 强制 typeof 表达式与有效的字符串进行比较
      'valid-typeof': 'error',
      // 要求使用 isNaN() 检查 NaN
      'use-isnan': 'error',
      /* --------------> Best-Practice <-------------- */
      // 不允许在 case 子句中使用词法声明
      'no-case-declarations': 'error',
      // 禁止使用空解构模式
      'no-empty-pattern': 'error',
      // 禁止 case 语句落空
      'no-fallthrough': 'error',
      // 禁止正则表达式字面量中出现多个空格
      'no-regex-spaces': 'error',
      // 禁止对原生对象或只读的全局对象进行赋值
      'no-global-assign': 'error',
      // 禁用八进制字面量 解析：八进制自面量是指那些以 0 开始的数字，比如：075 = 75
      'no-octal': 'error',
      // 禁止多次声明同一变量
      'no-redeclare': 'error',
      // 禁止自我赋值 错误示例：[a, b] = [a, b]
      'no-self-assign': 'error',
      // 禁用出现未使用过的标
      'no-unused-labels': 'error',
      // 禁止不必要的 catch 子句
      'no-useless-catch': 'error',
      // 禁用不必要的转义字符
      'no-useless-escape': 'off',
      // 禁用 with 语句
      'no-with': 'error',
      /* -------------->      变量      <-------------- */
      // 禁止删除变量
      'no-delete-var': 'error',
      // 禁止将标识符定义为受限的名字
      'no-shadow-restricted-names': 'error',
      // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
      'no-undef': 'error',
      // 禁止出现未使用过的变量
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      /* -------------->      ES6      <-------------- */
      // 要求在构造函数中有 super() 的调用
      'constructor-super': 'error',
      // 禁止修改类声明的变量
      'no-class-assign': 'error',
      // 禁止修改 const 声明的变量
      'no-const-assign': 'error',
      // 禁止类名称中出现重复的名称
      'no-dupe-class-members': 'error',
      // 禁止 Symbolnew 操作符和 new 一起使用
      'no-new-symbol': 'error',
      // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
      'no-this-before-super': 'error',
      // 要求 generator 函数内有 yield
      'require-yield': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      /* -------------->      风格      <-------------- */
      // 大括号风格要求
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      // 强制逗号风格
      'comma-style': ['error', 'last'],
      // 强制驼峰命名
      camelcase: 'off',
      // 强制括号内使用空格
      'array-bracket-spacing': ['error', 'never'],
      // 禁止或强制在代码块中开括号前和闭括号后有空格
      'block-spacing': ['error', 'always'],
      // 禁止空格和 tab 的混合缩进
      'no-mixed-spaces-and-tabs': 'error',
      /* -------------->      其他      <-------------- */
      // 禁止同一if/else-if链中出现重复条件
      'no-dupe-else-if': 'error',
      // 禁止分配给导入的绑定
      'no-import-assign': 'error',
      // 不损失精度
      'no-loss-of-precision': 'error',
      // 字符串文字中的禁止\8和转义序列\9 https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape
      'no-nonoctal-decimal-escape': 'error',
      // 禁止 set设置器有return https://eslint.org/docs/latest/rules/no-setter-return
      'no-setter-return': 'error',
      // undefined不允许在不允许值的上下文中使用可选链接
      'no-unsafe-optional-chaining': 'error',
      // 禁止正则表达式中无用的反向引用 https://eslint.org/docs/latest/rules/no-useless-backreference
      'no-useless-backreference': 'error',
      /* -------------->     import     <-------------- */
      // 在模块导入顺序中强制执行约定
      'import/order': 'error',
      // 确保所有导入出现在其他语句之前
      'import/first': 'error',
      // 禁止使用可变的变量导出
      'import/no-mutable-exports': 'error',
      // 确保导入指向可以解析的文件/模块
      'import/no-unresolved': 'off',
      // 禁止使用绝对路径导入模块
      'import/no-absolute-path': 'off',
      // 报告使用导出名称作为默认导出属性
      'import/no-named-as-default-member': 'off',
      // 报告使用导出名称作为默认导出标识符
      'import/no-named-as-default': 'off',
      // 禁止命名空间
      'import/namespace': 'off',
    },
  },
];

export { index as default };
