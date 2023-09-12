module.exports = {
  extends: ['@jsxiaosi/eslint-config-vue'],
  overrides: [
    {
      files: ['*.nvue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  // 添加uni-app支持
  globals: {
    uni: true,
    wx: true,
  },
};
