import fs from 'node:fs/promises';

import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';

import {
  comments,
  ignores,
  imports,
  javascript,
  jsonc,
  jsx,
  markdown,
  node,
  perfectionist,
  prettier,
  react,
  typescript,
  vue,
} from '../src';
import type { Awaitable, TypedFlatConfigItem } from '../src/types';

async function combine(
  ...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

const configs = await combine(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  comments(),
  ignores(),
  imports(),
  javascript(),
  jsonc(),
  jsx(),
  markdown(),
  node(),
  perfectionist(),
  prettier(),
  react(),
  typescript(),
  vue(),
);

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`;

await fs.writeFile('src/typegen.d.ts', dts);
