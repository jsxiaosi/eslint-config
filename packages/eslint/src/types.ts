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
  javascript?: OptionsOverrides;

  jsx?: boolean;

  jsonc?: boolean | OptionsOverrides;

  markdown?: boolean | OptionsOverrides;

  typescript?: boolean | OptionsTypescript;

  vue?: boolean | OptionsVue;

  react?: boolean | OptionsReact;

  prettier?: boolean | OptionsPrettier;
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
