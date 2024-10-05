import globals from "globals";
import type { OptionsOverrides, TypedFlatConfigItem } from '../types';

export async function javascript(option: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
  const { overrides } = option;
  return [
    {
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      name: 'jsxiaosi/javascript/setup',
    },
    {
      name: 'jsxiaosi/javascript/rules',
      rules: {
        // 强制为对象的 getter/setter 创建成对的访问器
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],

        // 要求数组回调函数必须有 return 语句
        'array-callback-return': 'error',

        // 强制将变量声明在其作用域范围内
        'block-scoped-var': 'error',

        // 禁止在构造函数中调用 `super` 之前使用 `this` 或返回不安全的 `super`
        'constructor-super': 'error',

        // 要求在 switch 语句的最后一个 case 子句中添加 default 子句，并强制 default 放在最后
        'default-case-last': 'error',

        // 优化对象属性的访问方式，尽量使用点操作符而非括号语法，允许关键字
        'dot-notation': ['error', { allowKeywords: true }],

        // 强制使用全等 (===) 和不全等 (!==)，但对 null、undefined 的情况智能处理
        eqeqeq: ['error', 'smart'],

        // 要求构造函数名以大写字母开头，构造函数属性需要大写，新对象实例化必须使用 `new` 关键字
        'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],

        // 禁止使用 `alert`、`confirm` 和 `prompt`
        'no-alert': 'error',

        // 禁止使用数组构造函数
        'no-array-constructor': 'error',

        // 禁止使用 async 函数的 promise 执行器
        'no-async-promise-executor': 'error',

        // 禁止使用 arguments.caller 或 arguments.callee
        'no-caller': 'error',

        // 禁止在 case 子句中声明变量
        'no-case-declarations': 'error',

        // 禁止修改类声明的变量
        'no-class-assign': 'error',

        // 禁止与 -0 进行比较
        'no-compare-neg-zero': 'error',

        // 禁止条件表达式中赋值操作符的错误使用
        'no-cond-assign': ['error', 'always'],

        // 禁止使用 console，允许 `warn` 和 `error`
        'no-console': ['error', { allow: ['warn', 'error'] }],

        // 禁止修改使用 `const` 声明的变量
        'no-const-assign': 'error',

        // 禁止在正则表达式中使用控制字符
        'no-control-regex': 'error',

        // 禁止使用 debugger
        'no-debugger': 'error',

        // 禁止删除变量
        'no-delete-var': 'error',

        // 禁止在函数参数中出现重复的参数
        'no-dupe-args': 'error',

        // 禁止类中出现重复的成员名称
        'no-dupe-class-members': 'error',

        // 禁止对象字面量中出现重复的键
        'no-dupe-keys': 'error',

        // 禁止在 switch 语句中出现重复的 case 标签
        'no-duplicate-case': 'error',

        // 禁止空块语句，允许空的 catch 子句
        'no-empty': ['error', { allowEmptyCatch: true }],

        // 禁止在正则表达式中出现空字符集
        'no-empty-character-class': 'error',

        // 禁止空解构模式
        'no-empty-pattern': 'error',

        // 禁止使用 `eval()` 函数
        'no-eval': 'error',

        // 禁止对 catch 子句中的异常重新赋值
        'no-ex-assign': 'error',

        // 禁止扩展原生对象
        'no-extend-native': 'error',

        // 禁止不必要的 `.bind()` 调用
        'no-extra-bind': 'error',

        // 禁止不必要的布尔类型转换
        'no-extra-boolean-cast': 'error',

        // 禁止 case 语句落空
        'no-fallthrough': 'error',

        // 禁止重新分配函数声明
        'no-func-assign': 'error',

        // 禁止赋值给全局对象的属性
        'no-global-assign': 'error',

        // 禁止隐式 `eval()` 函数的使用
        'no-implied-eval': 'error',

        // 禁止 `import` 语句中的赋值操作
        'no-import-assign': 'error',

        // 禁止正则表达式中无效的标记
        'no-invalid-regexp': 'error',

        // 禁止使用不规则的空白字符
        'no-irregular-whitespace': 'error',

        // 禁止使用 `__iterator__` 属性
        'no-iterator': 'error',

        // 禁止使用标签语句
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

        // 禁止在块级作用域中使用孤立代码块
        'no-lone-blocks': 'error',

        // 禁止在精度可能丢失的情况下使用数字字面量
        'no-loss-of-precision': 'error',

        // 禁止在字符类语法中混淆字符范围
        'no-misleading-character-class': 'error',

        // 禁止使用多行字符串（`\\`）
        'no-multi-str': 'error',

        // 禁止使用 `new` 关键字创建实例但不存储实例
        'no-new': 'error',

        // 禁止使用 `new Function` 构造器
        'no-new-func': 'error',

        // 禁止实例化非构造函数对象
        'no-new-native-nonconstructor': 'error',

        // 禁止使用 `new` 关键字包装原始类型
        'no-new-wrappers': 'error',

        // 禁止将 `Math`, `JSON`, `Reflect` 当作函数调用
        'no-obj-calls': 'error',

        // 禁止使用八进制字面量
        'no-octal': 'error',

        // 禁止使用八进制转义字符
        'no-octal-escape': 'error',

        // 禁止使用 `__proto__`
        'no-proto': 'error',

        // 禁止直接调用 `Object` 的 `prototype` 方法
        'no-prototype-builtins': 'error',

        // 禁止重新声明变量
        'no-redeclare': ['error', { builtinGlobals: false }],

        // 禁止正则表达式中的多余空格
        'no-regex-spaces': 'error',

        // 禁止使用 `global` 或 `self`，应使用 `globalThis`
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
        ],

        // 禁止使用某些对象属性方法
        'no-restricted-properties': [
          'error',
          {
            message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
            property: '__proto__',
          },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupGetter__',
          },
          {
            message: 'Use `Object.getOwnPropertyDescriptor` instead.',
            property: '__lookupSetter__',
          },
        ],

        // 禁止赋值给自身
        'no-self-assign': ['error', { props: true }],

        // 禁止自我比较
        'no-self-compare': 'error',

        // 禁止使用逗号操作符
        'no-sequences': 'error',

        // 禁止对 `arguments`, `eval`, `Infinity`, `undefined` 等进行遮蔽（变量声明同名）
        'no-shadow-restricted-names': 'error',

        // 禁止稀疏数组
        'no-sparse-arrays': 'error',

        // 禁止在普通字符串中使用模板字面量语法 `${}`
        'no-template-curly-in-string': 'error',

        // 禁止在调用 `super` 之前使用 `this`
        'no-this-before-super': 'error',

        // 禁止抛出字面量错误（应抛出 `Error` 对象）
        'no-throw-literal': 'error',

        // 禁止使用未定义的变量
        'no-undef': 'error',

        // 禁止将 `undefined` 初始化给变量
        'no-undef-init': 'error',

        // 禁止多行表达式不使用括号导致的歧义
        'no-unexpected-multiline': 'error',

        // 禁止在循环中使用未修改的循环条件
        'no-unmodified-loop-condition': 'error',

        // 禁止不必要的三元运算符
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],

        // 禁止出现无法到达的代码
        'no-unreachable': 'error',

        // 禁止在循环中出现不可达的终止条件
        'no-unreachable-loop': 'error',

        // 禁止在 `finally` 代码块中执行不安全代码
        'no-unsafe-finally': 'error',

        // 禁止错误的否定操作符使用
        'no-unsafe-negation': 'error',

        // 禁止未使用的表达式（如无效的逻辑表达式）
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],

        // 禁止未使用的变量
        'no-unused-vars': [
          'error',
          {
            args: 'none',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all',
          },
        ],

        // 禁止在变量定义之前使用
        'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],

        // 禁止不必要的反向引用
        'no-useless-backreference': 'error',

        // 禁止不必要的函数调用
        'no-useless-call': 'error',

        // 禁止不必要的 `catch` 子句
        'no-useless-catch': 'error',

        // 禁止不必要的计算属性键
        'no-useless-computed-key': 'error',

        // 禁止没有实际意义的构造函数
        'no-useless-constructor': 'error',

        // 禁止不必要的变量重命名
        'no-useless-rename': 'error',

        // 禁止不必要的 return 语句
        'no-useless-return': 'error',

        // 强制使用 `const` 代替 `var`
        'no-var': 'error',

        // 禁止 `with` 语句
        'no-with': 'error',

        // 强制使用对象字面量简写
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],

        // 强制变量单独声明
        'one-var': ['error', { initialized: 'never' }],

        // 强制使用箭头函数回调
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],

        // 强制使用 `const` 声明不变的变量
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],

        // 强制使用 `**` 运算符代替 `Math.pow()`
        'prefer-exponentiation-operator': 'error',

        // 强制 `Promise` 拒绝原因使用 Error 对象
        'prefer-promise-reject-errors': 'error',

        // 强制使用正则字面量而非 `RegExp` 构造函数
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

        // 强制使用剩余参数替代 `arguments`
        'prefer-rest-params': 'error',

        // 强制使用扩展运算符而不是 `apply()`
        'prefer-spread': 'error',

        // 强制使用模板字符串代替字符串拼接
        'prefer-template': 'error',

        // 强制为符号提供描述符
        'symbol-description': 'error',

        // 强制在适当的地方使用 `isNaN()` 检查
        'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],

        // 强制对 `typeof` 的结果进行有效检查
        'valid-typeof': ['error', { requireStringLiterals: true }],

        // 要求所有 `var` 变量声明放在其作用域顶部
        'vars-on-top': 'error',

        // 禁止 Yoda 条件（即常量在比较运算符前面）
        yoda: ['error', 'never'],

        ...overrides,
      },
    },
  ];
}
