import type { TypedFlatConfigItem } from '../types';
import { pluginPerfectionist } from '../plugins';

/**
 * Perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'jsxiaosi/perfectionist/setup',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        // 'perfectionist/sort-imports': [
        //   'error',
        //   {
        //     groups: [
        //       'builtin',
        //       'external',
        //       'type',
        //       ['internal', 'internal-type'],
        //       ['parent', 'sibling', 'index'],
        //       ['parent-type', 'sibling-type', 'index-type'],
        //       'side-effect',
        //       'object',
        //       'unknown',
        //     ],
        //     newlinesBetween: 'ignore',
        //     order: 'asc',
        //     type: 'natural',
        //   },
        // ],
        'perfectionist/sort-imports': [
          'error',
          {
            groups: [
              'type-import',
              ['value-builtin', 'value-external'],
              'type-internal',
              'value-internal',
              ['type-parent', 'type-sibling', 'type-index'],
              ['value-parent', 'value-sibling', 'value-index'],
              'side-effect',
              'unknown',
            ],
            newlinesBetween: 'ignore',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
      },
    },
  ];
}
