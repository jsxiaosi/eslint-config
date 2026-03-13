import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi(
  {
    vue: true,
    react: true,
    typescript: true,
    prettier: {
      usePrettierrc: true,
    },
  },
  {
    ignores: ['**/fixtures/**', '**/typegen.d.ts'],
  },
);
