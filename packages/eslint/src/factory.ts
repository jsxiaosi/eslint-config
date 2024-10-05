import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';
import type { Linter } from 'eslint';
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
  sortPackageJson,
  sortTsconfig,
  typescript,
  vue,
} from './config';
import type { ConfigNames, RuleOptions } from './typegen';
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types';

export function jsxiaosi(
  options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
  ...userConfigs: Awaitable<
    | TypedFlatConfigItem
    | TypedFlatConfigItem[]
    | Linter.Config[]
  >[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const { componentExts = [], typescript: enableTypeScript = isPackageExists('typescript') } =
    options;

  const typescriptOptions = resolveSubOptions(options, 'typescript');

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [
    ignores(options.ignores),
    comments(),
    imports(),
    node(),
    javascript(),
    perfectionist(),
  ];

  configs.push(javascript({ overrides: getOverrides(options, 'javascript') }));

  configs.push(jsx());

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: getOverrides(options, 'jsonc'),
      }),
      sortPackageJson(),
    );
    if (enableTypeScript) {
      configs.push(sortTsconfig());
    }
  }

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...typescriptOptions,
        componentExts,
        overrides: getOverrides(options, 'typescript'),
        type: options.type,
      }),
    );
  }

  if (options.vue) {
    configs.push(
      vue({
        ...resolveSubOptions(options, 'vue'),
        overrides: getOverrides(options, 'vue'),
        typescript: !!enableTypeScript,
        prettier: !!options.prettier,
      }),
    );
  }

  if (options.react) {
    configs.push(
      react({
        ...resolveSubOptions(options, 'react'),
        tsconfigPath:
          'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined,
      }),
    );
  }

  if (options.markdown ?? true) {
    configs.push(
      markdown({
        componentExts,
        overrides: getOverrides(options, 'markdown'),
      }),
    );
  }

  if (options.prettier) {
    configs.push(prettier(typeof options.prettier === 'object' ? options.prettier : {}));
  }

  let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();

  composer = composer.append(...configs, ...(userConfigs as any));

  return composer;
}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
}

export function getOverrides<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
  const sub = resolveSubOptions(options, key);
  return {
    ...('overrides' in sub ? sub.overrides : {}),
  };
}
