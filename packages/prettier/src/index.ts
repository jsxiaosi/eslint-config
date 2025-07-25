import type Prettier from 'prettier';
import type { PrettierOptions } from './types';

export const config: (options?: Partial<PrettierOptions>) => Prettier.Config = operators => {
  const { tailwindcss, plugins } = operators || {};

  const prettierPlugins = plugins ?? [];

  if (tailwindcss) {
    prettierPlugins.push('prettier-plugin-tailwindcss');
  }

  return {
    plugins: prettierPlugins,
    // 每行最多多少个字符换行
    printWidth: 120,
    // 缩进的空格数
    tabWidth: 2,
    // 使用制表符而不是空格缩进行。
    useTabs: false,
    // 使用分号, 默认true
    semi: true,
    //  使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    singleQuote: true,
    // 引用对象中的属性时更改是否添加引号
    quoteProps: 'as-needed',
    // 是否缩进Vue 文件中的代码<script>和<style>标签
    vueIndentScriptAndStyle: true,
    // jsx中使用单引号）
    jsxSingleQuote: false,
    // 在对象或数组最后一个元素后面是否加逗号
    trailingComma: 'all',
    // 对象属性括号之间打印空格
    proseWrap: 'never',
    // 行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行
    bracketSameLine: false,
    // 箭头函数参数周围包含括号
    arrowParens: 'avoid',
    // 为 HTML、Vue、Angular 和 Handlebars 指定全局空白敏感度
    htmlWhitespaceSensitivity: 'css',
    // 行结束设置
    endOfLine: 'lf',
  };
};

export default config;
