module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },

  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    '@jsxiaosi/eslint-config-ts',
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    // 不允许在 React 组件定义中缺少 displayName
    'react/display-name': 'off',
    // 禁止jsx传递props
    'react/jsx-props-no-spreading': 'off',
    // 强制类格式化类组件 https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
    'react/state-in-constructor': 'off',
    // 强制类组件静态属性放置的位置
    'react/static-property-placement': 'off',
    // 强制组件状态上下文解构赋值: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // 禁止在除jsx文件名之外其他文件上使用jsx
    'react/jsx-filename-extension': 'off',
    // 禁止循环使用index作为key
    'react/no-array-index-key': 'warn',
    // 强制props添加defaultProps
    'react/require-default-props': 'off',
    // 强制jsx中使用React 片段<React.Fragment>...</React.Fragment>/<>...</>
    'react/jsx-fragments': 'off',
    // 强制多行jsx使用括号包裹
    'react/jsx-wrap-multilines': 'error',
    // 不允许React组件缺少PropTypes
    'react/prop-types': 'off',
    // 禁用（any, array, object）的模糊 prop 类型
    'react/forbid-prop-types': 'off',
    // 强制组件方法使用顺序
    'react/sort-comp': 'off',
    // 禁止在使用 JSX 时缺少 React
    'react/react-in-jsx-scope': 'off',
    // 强制jsx换行
    'react/jsx-one-expression-per-line': 'off',
    // 禁止没有子组件的额外结束标记
    'react/self-closing-comp': 'warn',
    // 禁止循环没有key
    'react/jsx-key': 'warn',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
};
