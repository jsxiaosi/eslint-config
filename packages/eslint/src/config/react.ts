import { isPackageExists } from 'local-pkg';

import { GLOB_SRC } from '../globs';
import { ensurePackages, interopDefault } from '../utils';

import type {
  OptionsFiles,
  OptionsOverrides,
  OptionsReact,
  OptionsTypeScriptWithTypes,
  Rules,
  TypedFlatConfigItem,
} from '../types';

// react refresh
const ReactRefreshAllowConstantExportPackages = ['vite'];
const RemixPackages = ['@remix-run/node', '@remix-run/react', '@remix-run/serve', '@remix-run/dev'];
const NextJsPackages = ['next'];

export async function react(
  options: OptionsReact & OptionsTypeScriptWithTypes & OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const { files = [GLOB_SRC], overrides = {}, emotion } = options;

  await ensurePackages([
    'eslint-plugin-react',
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ]);

  const tsconfigPath = options?.tsconfigPath ? [options.tsconfigPath] : undefined;
  const isTypeAware = !!tsconfigPath;

  const [pluginReact, pluginEslintReact, pluginReactHooks, pluginReactRefresh, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('@eslint-react/eslint-plugin')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const);

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(i => isPackageExists(i));
  const isUsingRemix = RemixPackages.some(i => isPackageExists(i));
  const isUsingNext = NextJsPackages.some(i => isPackageExists(i));

  const plugins = pluginEslintReact.configs.all.plugins;

  return [
    {
      name: 'jsxiaosi/react/setup',
      plugins: {
        react: pluginReact,
        'react-plugin': plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': pluginReactHooks,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-refresh': pluginReactRefresh,
      },
    },
    {
      name: 'jsxiaosi/react/settings',
      settings: {
        react: {
          version: '19',
        },
      },
    },
    {
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ...(isTypeAware ? { project: tsconfigPath } : {}),
        },
        sourceType: 'module',
      },
      name: 'jsxiaosi/react/rules',
      rules: {
        // recommended rules from @eslint-react/dom
        'react-dom/no-void-elements-with-children': 'warn',
        'react-dom/no-dangerously-set-innerhtml': 'warn',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-missing-button-type': 'warn',
        'react-dom/no-missing-iframe-sandbox': 'warn',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'warn',
        'react-dom/no-unsafe-iframe-sandbox': 'warn',
        'react-dom/no-unsafe-target-blank': 'warn',

        // recommended rules react-hooks
        // "react-hooks/exhaustive-deps": "warn",
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: isAllowConstantExport,
            allowExportNames: [
              ...(isUsingNext
                ? ['config', 'generateStaticParams', 'metadata', 'generateMetadata', 'viewport', 'generateViewport']
                : []),
              ...(isUsingRemix ? ['meta', 'links', 'headers', 'loader', 'action'] : []),
            ],
          },
        ],

        // recommended rules from @eslint-react
        'react-plugin/no-useless-forward-ref': 'warn',
        'react-plugin/no-access-state-in-setstate': 'error',
        'react-plugin/no-array-index-key': 'warn',
        'react-plugin/no-children-count': 'warn',
        'react-plugin/no-children-for-each': 'warn',
        'react-plugin/no-children-map': 'warn',
        'react-plugin/no-children-only': 'warn',
        'react-plugin/no-children-prop': 'warn',
        'react-plugin/no-children-to-array': 'warn',
        'react-plugin/no-clone-element': 'warn',
        'react-plugin/jsx-no-comment-textnodes': 'warn',
        'react-plugin/no-component-will-mount': 'error',
        'react-plugin/no-component-will-receive-props': 'error',
        'react-plugin/no-component-will-update': 'error',
        'react-plugin/no-create-ref': 'error',
        'react-plugin/no-direct-mutation-state': 'error',
        'react-plugin/no-duplicate-key': 'error',
        'react-plugin/no-implicit-key': 'error',
        'react-plugin/no-missing-key': 'error',
        'react-plugin/no-nested-component-definitions': 'warn',
        'react-plugin/no-redundant-should-component-update': 'error',
        'react-plugin/no-set-state-in-component-did-mount': 'warn',
        'react-plugin/no-set-state-in-component-did-update': 'warn',
        'react-plugin/no-set-state-in-component-will-update': 'warn',
        'react-plugin/no-string-refs': 'error',
        'react-plugin/no-unsafe-component-will-mount': 'warn',
        'react-plugin/no-unsafe-component-will-receive-props': 'warn',
        'react-plugin/no-unsafe-component-will-update': 'warn',
        'react-plugin/no-unstable-context-value': 'error',
        'react-plugin/no-unstable-default-props': 'error',
        'react-plugin/no-unused-class-component-members': 'warn',
        'react-plugin/no-unused-state': 'warn',
        'react-plugin/no-useless-fragment': 'warn',
        'react-plugin/prefer-destructuring-assignment': 'warn',
        'react-plugin/jsx-shorthand-boolean': 'warn',
        'react-plugin/jsx-shorthand-fragment': 'warn',

        ...(pluginReact.configs.recommended.rules as Partial<Rules>),
        'react/display-name': 'off',
        // 禁止JSX 中的重复属性
        'react/jsx-no-duplicate-props': 'warn',
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

        ...(emotion
          ? {
              'react/no-unknown-property': ['error', { ignore: ['css'] }],
            }
          : {}),

        ...(isTypeAware
          ? {
              'react-plugin/no-leaked-conditional-rendering': 'warn',
            }
          : {}),

        // overrides
        ...overrides,
      },
    },
  ];
}
