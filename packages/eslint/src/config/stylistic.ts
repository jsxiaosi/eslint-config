import type { OptionsConfig, OptionsOverrides, OptionsStylisticConfig, TypedFlatConfigItem } from '../types';
import { GLOB_SRC, GLOB_VUE } from '../globs';
import { interopDefault } from '../utils';

export const StylisticConfigDefaults: OptionsStylisticConfig = {
  indent: 2,
  semi: true,
  quotes: 'single',
  quoteProps: 'as-needed',
  commaDangle: 'only-multiline',
  arrowParens: false,
  jsx: true,
  blockSpacing: true,
  braceStyle: '1tbs',
};

export async function stylistic(
  options: OptionsStylisticConfig & OptionsOverrides & OptionsConfig = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    semi,
    quotes,
    quoteProps,
    commaDangle,
    arrowParens,
    jsx,
    blockSpacing,
    braceStyle,
    overrides,
    vue,
    prettier,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  };

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'));

  const config = pluginStylistic.configs.customize({
    pluginName: 'stylistic',
    indent,
    semi,
    quotes,
    quoteProps,
    commaDangle,
    arrowParens,
    jsx,
    blockSpacing,
    braceStyle,
  }) as TypedFlatConfigItem;

  return [
    {
      files: [GLOB_SRC, GLOB_VUE],
      name: 'jsxiaosi/stylistic/rules',
      plugins: {
        stylistic: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'stylistic/operator-linebreak': 'off',
        'stylistic/jsx-wrap-multilines': 'error',
        'stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
        'stylistic/jsx-self-closing-comp': 'warn',
        'stylistic/multiline-ternary': ['error', 'never'],
        'stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],

        ...(vue
          ? {
              'stylistic/indent': 'off',
              'stylistic/indent-binary-ops': 'off',
            }
          : {}),

        ...(prettier
          ? {
              'stylistic/multiline-ternary': 'off',
              'stylistic/indent': 'off',
              'stylistic/indent-binary-ops': 'off',
              'stylistic/jsx-one-expression-per-line': 'off',
              'stylistic/no-trailing-spaces': 'off',
            }
          : {}),

        ...overrides,
      },
    },
  ];
}
