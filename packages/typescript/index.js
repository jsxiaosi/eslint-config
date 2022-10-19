const base = require('@jsxiaosi/eslint-config-base');

// https://typescript-eslint.io/rules
module.exports = {
  extends: [
    '@jsxiaosi/eslint-config-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
  overrides: base.overrides,
  rules: {
    // 确保命名导入对应于远程文件中的命名导出
    'import/named': 'off',

    // 强制使用@ts-ignore 在末尾添加注释 例子：@ts-ignore: Unreachable code error
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    // 强制使用@ts-expect-error
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    // 强制定义对象类型使用interface或type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    // 强制一致使用类型导入
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false },
    ],
    // 禁止出现未使用过的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // 强制大括号风格要求
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'warn',

    // 禁止使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 开启函数必须要指定类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 禁止空函数
    '@typescript-eslint/no-empty-function': 'off',
    // 禁止使用特定类型
    '@typescript-eslint/ban-types': 'off',
  },
};
