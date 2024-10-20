import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi(
  {
    prettier: {
      usePrettierrc: true,
    },
  },
  {
    ignores: ['**/typegen.d.ts'],
  },
);
