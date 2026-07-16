import { isPackageExists } from 'local-pkg';

import type {
  OptionsFiles,
  OptionsOverrides,
  OptionsReact,
  OptionsTypeScriptWithTypes,
  TypedFlatConfigItem,
} from '../types';
import { GLOB_SRC } from '../globs';
import { ensurePackages, interopDefault } from '../utils';

// react refresh
const ReactRefreshAllowConstantExportPackages = ['vite'];
const RemixPackages = ['@remix-run/node', '@remix-run/react', '@remix-run/serve', '@remix-run/dev'];
const NextJsPackages = ['next'];

export async function react(
  options: OptionsReact & OptionsTypeScriptWithTypes & OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const { files = [GLOB_SRC], overrides = {}, emotion } = options;

  await ensurePackages(['@eslint-react/eslint-plugin', 'eslint-plugin-react-hooks', 'eslint-plugin-react-refresh']);

  const tsconfigPath = options?.tsconfigPath ? [options.tsconfigPath] : undefined;
  const isTypeAware = !!tsconfigPath;

  const [pluginEslintReact, pluginReactHooks, pluginReactRefresh, parserTs] = await Promise.all([
    interopDefault(import('@eslint-react/eslint-plugin')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const);

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(i => isPackageExists(i));
  const isUsingRemix = RemixPackages.some(i => isPackageExists(i));
  const isUsingNext = NextJsPackages.some(i => isPackageExists(i));

  const plugins = (pluginEslintReact.configs.all as any).plugins ?? {};

  return [
    {
      name: 'jsxiaosi/react/setup',
      plugins: {
        'react-plugin': plugins['@eslint-react'],
        'react-hooks': pluginReactHooks,
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
        'react-plugin/dom-no-void-elements-with-children': 'warn',
        'react-plugin/dom-no-dangerously-set-innerhtml': 'warn',
        'react-plugin/dom-no-dangerously-set-innerhtml-with-children': 'error',
        'react-plugin/dom-no-find-dom-node': 'error',
        'react-plugin/dom-no-missing-button-type': 'warn',
        'react-plugin/dom-no-missing-iframe-sandbox': 'warn',
        'react-plugin/dom-no-render-return-value': 'error',
        'react-plugin/dom-no-script-url': 'warn',
        'react-plugin/dom-no-unsafe-iframe-sandbox': 'warn',
        'react-plugin/dom-no-unsafe-target-blank': 'warn',

        // recommended rules react-hooks
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
        'react-plugin/no-forward-ref': 'warn',
        'react-plugin/no-access-state-in-setstate': 'error',
        'react-plugin/no-array-index-key': 'warn',
        'react-plugin/no-children-count': 'warn',
        'react-plugin/no-children-for-each': 'warn',
        'react-plugin/no-children-map': 'warn',
        'react-plugin/no-children-only': 'warn',
        'react-plugin/no-children-to-array': 'warn',
        'react-plugin/no-clone-element': 'warn',
        'react-plugin/jsx-no-comment-textnodes': 'warn',
        'react-plugin/no-component-will-mount': 'error',
        'react-plugin/no-component-will-receive-props': 'error',
        'react-plugin/no-component-will-update': 'error',
        'react-plugin/no-create-ref': 'error',
        'react-plugin/no-direct-mutation-state': 'error',
        'react-plugin/no-duplicate-key': 'error',
        'react-plugin/no-implicit-key': 'off',
        'react-plugin/no-missing-key': 'error',
        'react-plugin/no-nested-component-definitions': 'warn',
        'react-plugin/no-set-state-in-component-did-mount': 'warn',
        'react-plugin/no-set-state-in-component-did-update': 'warn',
        'react-plugin/no-set-state-in-component-will-update': 'warn',
        'react-plugin/no-unsafe-component-will-mount': 'warn',
        'react-plugin/no-unsafe-component-will-receive-props': 'warn',
        'react-plugin/no-unsafe-component-will-update': 'warn',
        'react-plugin/no-unstable-context-value': 'error',
        'react-plugin/no-unstable-default-props': 'error',
        'react-plugin/no-unused-class-component-members': 'warn',
        'react-plugin/no-unused-state': 'warn',
        'react-plugin/jsx-no-namespace': 'error',
        'react-plugin/jsx-no-children-prop': 'warn',
        'react-plugin/jsx-no-useless-fragment': 'warn',

        // migrated from eslint-plugin-react
        'react-plugin/dom-no-unknown-property': emotion ? ['error', { ignore: ['css'] }] : 'error',
        'react-plugin/no-missing-component-display-name': 'off',
        'react-plugin/no-missing-context-display-name': 'off',

        ...(emotion
          ? {
              'react/no-unknown-property': ['error', { ignore: ['css'] }],
            }
          : {}),

        ...(isTypeAware
          ? {
              'react-plugin/no-implicit-key': 'error',
              'react-plugin/no-leaked-conditional-rendering': 'warn',
            }
          : {}),

        // overrides
        ...overrides,
      },
    },
  ];
}
