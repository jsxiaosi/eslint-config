import type Prettier from 'prettier';

export interface PrettierOptions extends PrettierConfig {
  tailwindcss: boolean;
}

export interface PrettierConfig extends Prettier.Config {}
