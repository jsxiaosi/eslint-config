import type { RolldownOptions } from 'rolldown';
import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

export const rolldownConfig = (pkg: Record<string, any>) => {
  const externals = [
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.dependencies ?? {}), // 可选，看你是否要 external dependencies
  ];

  const defaultRolldownOptions: RolldownOptions = {
    input: 'src/index.js',
    external: externals,
    platform: 'node',
  };

  return defineConfig([
    {
      ...defaultRolldownOptions,
      output: [
        {
          format: 'esm',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs',
          exports: 'named',
        },
      ],
    },
    {
      ...defaultRolldownOptions,
      plugins: [dts({ resolver: 'tsc' })],
    },
  ]);
};
