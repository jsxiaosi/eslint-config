import type { ParserOptions } from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import type { RuleOptions } from './typegen';
import type { PrettierOptions } from './vender/prettier-types';

export type Awaitable<T> = T | Promise<T>;

export type Rules = RuleOptions;

export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  // 放宽插件类型限制，因为大多数插件还没有正确的类型信息。
  /**
   * 一个包含插件名称与插件对象之间的键值映射的对象。当 `files` 选项被指定时，这些插件仅对匹配的文件可用。
   *
   * @see [在配置中使用插件](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
};

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules'];
}

export interface OptionsComponentExts {
  /**
   * 组件的附加扩展名。
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[];
}

export interface OptionsFiles {
  /**
   * 覆盖 `files` 选项以提供自定义的文件匹配模式（globs）。
   */
  files?: string[];
}

export interface OptionsProjectType {
  /**
   * 项目的类型。选择 `lib` 将启用更严格的库规则。
   *
   * @default 'app'
   */
  type?: 'app' | 'lib';
}

export interface OptionsTypeScriptParserOptions {
  /**
   * TypeScript 的附加解析器选项。
   */
  parserOptions?: Partial<ParserOptions>;

  /**
   * 类型感知文件的 Glob 模式。
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[];

  /**
   * 不应被类型感知的文件的 Glob 模式。
   * @default ['**\/*.md/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[];
}

export interface OptionsTypeScriptWithTypes {
  /**
   * 设置 tsconfig.json 的路径
   */
  tsconfigPath?: string;

  /**
   * 覆盖类型感知规则
   */
  overridesTypeAware?: TypedFlatConfigItem['rules'];
}

export type OptionsTypescript =
  | (OptionsTypeScriptWithTypes & OptionsOverrides)
  | (OptionsTypeScriptParserOptions & OptionsOverrides);

export interface OptionsConfig extends OptionsComponentExts, OptionsProjectType {
  /**
   * Core rules. Can't be disabled.
   */
  javascript?: OptionsOverrides;

  /**
   * Enable JSX related rules.
   *
   * Currently only stylistic rules are included.
   *
   * @default true
   */
  jsx?: boolean;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean | OptionsOverrides;

  /**
   * Enable linting for **code snippets** in Markdown.
   *
   * For formatting Markdown content, enable also `formatters.markdown`.
   *
   * @default true
   */
  markdown?: boolean | OptionsOverrides;

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript;

  /**
   * Enable vue support.
   *
   * Requires installing:
   * - `eslint-plugin-vue`
   * - `vue-eslint-parser`
   *
   * @default false
   */
  vue?: boolean | OptionsVue;

  /**
   * Enable react support.
   *
   * Requires installing:
   * - `@eslint-react/eslint-plugin`
   * - `eslint-plugin-react-hooks`
   * - `eslint-plugin-react-refresh`
   * - `@eslint-react/eslint-plugin`
   *
   * @default false
   */
  react?: boolean | OptionsReact;

  /**
   * Enable prettier support.
   *
   * Requires installing:
   * - `eslint-plugin-prettier`
   * - `prettier`
   *
   * @default false
   */
  prettier?: boolean | OptionsPrettier;

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean | OptionsOverrides;

  /**
   * Enable TOML support.
   *
   * @default true
   */
  toml?: boolean | OptionsOverrides;
}

export interface OptionsHasTypeScript {
  typescript?: boolean;
}

export interface OptionsHasPrettier {
  prettier?: boolean;
}

export interface OptionsVue extends OptionsOverrides {
  /**
   * vue 版本
   */
  vueVersion?: 2 | 3;
}

export interface OptionsReact extends OptionsOverrides {
  /**
   * vue 版本
   */
  emotion?: boolean;
}

export interface OptionsPrettier {
  /**
   * prettier 配置
   */
  prettierOptions?: PrettierOptions;

  /**
   * 是否使用项目中的 prettier 文件配置
   */
  usePrettierrc?: boolean;
}
