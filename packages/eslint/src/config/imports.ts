import { pluginImport } from '../plugins';

import type { TypedFlatConfigItem } from '../types';

export async function imports(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: 'jsxiaosi/imports/rules',
      plugins: {
        import: pluginImport,
      },
      rules: {
        // 禁止重复导入
        'import/no-duplicates': 'error',
        // 禁止使用命名的默认导出
        'import/no-named-default': 'error',
        // 禁止自身模块的导入
        'import/no-self-import': 'error',
        // 禁止使用 Webpack 加载器语法进行导入
        'import/no-webpack-loader-syntax': 'error',
        // 在模块导入顺序中强制执行约定
        'import/order': 'off',
        // 确保所有导入出现在其他语句之前
        'import/first': 'error',
        // 禁止使用可变的变量导出
        'import/no-mutable-exports': 'error',
        // 确保导入指向可以解析的文件/模块
        'import/no-unresolved': 'off',
        // 禁止使用绝对路径导入模块
        'import/no-absolute-path': 'off',
        // 报告使用导出名称作为默认导出属性
        'import/no-named-as-default-member': 'off',
        // 报告使用导出名称作为默认导出标识符
        'import/no-named-as-default': 'off',
        // 禁止命名空间
        'import/namespace': 'off',
      },
    },
  ];
}
