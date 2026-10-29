import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { ESLint } from 'eslint';
import config from '@jsxiaosi/eslint-config';
import prettier from 'prettier';
import prettierConfig from '@jsxiaosi/eslint-config-prettier';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: await config({ typescript: true, react: true, vue: true }).toConfigs(),
});

const cases = [
  ['JavaScript', 'example.js', 'var answer = 42;\nexport { answer };\n', 'no-var'],
  ['TypeScript', 'example.ts', 'const unused: number = 42;\n', 'ts/no-unused-vars'],
  ['React TSX', 'example.tsx', 'export const Button = () => <button />;\n', 'react-plugin/dom-no-missing-button-type'],
  [
    'Vue SFC',
    'example.vue',
    '<template><div v-for="item in items">{{ item }}</div></template>\n',
    'vue/require-v-for-key',
  ],
  ['JSON', 'example.json', '{ "value": 1, "value": 2 }\n', 'jsonc/no-dupe-keys'],
  ['JSONC', 'example.jsonc', '// comment\n{ "value": 1, "value": 2 }\n', 'jsonc/no-dupe-keys'],
  ['JSON5', 'example.json5', '{ value: 1, value: 2 }\n', 'jsonc/no-dupe-keys'],
  ['YAML', 'example.yaml', 'value: {\n  nested: true\n}\n', 'yaml/block-mapping'],
  ['TOML', 'example.toml', 'value = [\n  1\n  ,2\n]\n', 'toml/comma-style'],
  ['Markdown code block', 'example.md', '```js\nvar answer = 42;\n```\n', 'no-var'],
];
for (const [label, filePath, code, rule] of cases) {
  test(`${label}: parser and configured rule execute`, async () => {
    const results = await eslint.lintText(code, { filePath });
    const messages = results.flatMap(result => result.messages);
    assert.equal(
      results.reduce((sum, result) => sum + result.fatalErrorCount, 0),
      0,
      JSON.stringify(messages),
    );
    assert.ok(
      messages.some(message => message.ruleId === rule),
      `${rule} missing: ${JSON.stringify(messages)}`,
    );
  });
}

test('default configuration accepts valid JavaScript', async () => {
  const base = new ESLint({
    overrideConfigFile: true,
    overrideConfig: await config({ typescript: false }).toConfigs(),
  });
  const [result] = await base.lintText('export const answer = 42;\n', { filePath: 'example.js' });
  assert.deepEqual(result.messages, []);
});

test('type-aware TypeScript detects a floating promise', async () => {
  const dir = await mkdtemp(path.join(process.cwd(), '.compatibility-'));
  try {
    const file = path.join(dir, 'example.ts');
    const tsconfigPath = path.join(dir, 'tsconfig.json');
    await writeFile(
      tsconfigPath,
      JSON.stringify({ compilerOptions: { strict: true, target: 'ESNext' }, include: ['*.ts'] }),
    );
    await writeFile(file, 'Promise.resolve(42);\n');
    const typed = new ESLint({
      overrideConfigFile: true,
      overrideConfig: await config({ typescript: { tsconfigPath } }).toConfigs(),
    });
    const [result] = await typed.lintFiles([file]);
    assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
    assert.ok(
      result.messages.some(message => message.ruleId === 'ts/no-floating-promises'),
      JSON.stringify(result.messages),
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('Prettier loads Tailwind plugin and sorts classes', async () => {
  // Resolve optional peers from the package that declares them, as a consumer would.
  const require = createRequire(new URL('../packages/prettier/package.json', import.meta.url));
  const options = prettierConfig({ tailwindcss: true });
  const actual = await prettier.format('<div class="p-4 flex"></div>', {
    ...options,
    plugins: options.plugins.map(plugin => require.resolve(plugin)),
    parser: 'html',
  });
  assert.equal(actual, '<div class="flex p-4"></div>\n');
  assert.equal(
    await prettier.format(actual, {
      ...options,
      plugins: options.plugins.map(plugin => require.resolve(plugin)),
      parser: 'html',
    }),
    actual,
  );
});

for (const [message, expectedStatus, rule] of [
  ['feat(eslint): update dependencies', 0],
  ['invalid: unsupported type', 1, 'type-enum'],
  ['feat: ends with a period.', 1, 'subject-full-stop'],
  ['feat: ' + 'a'.repeat(101), 1, 'header-max-length'],
]) {
  test(`Commitlint: ${rule ?? 'valid commit'}`, () => {
    const result = spawnSync('pnpm', ['exec', 'commitlint', '--config', 'commitlint.config.js'], {
      input: message + '\n',
      encoding: 'utf8',
    });
    assert.ifError(result.error);
    assert.equal(result.status, expectedStatus, result.stdout + result.stderr);
    if (rule) assert.ok((result.stdout + result.stderr).includes(rule), result.stdout + result.stderr);
  });
}

test('CommonJS public entry points load and execute', async () => {
  const require = createRequire(import.meta.url);
  const { default: cjsEslint } = require('@jsxiaosi/eslint-config');
  const { default: cjsPrettier } = require('@jsxiaosi/eslint-config-prettier');
  assert.ok((await cjsEslint({ typescript: false }).toConfigs()).length > 0);
  assert.equal(cjsPrettier().semi, true);
});

test('Emotion accepts css prop and still rejects unknown DOM properties', async () => {
  const emotion = new ESLint({
    overrideConfigFile: true,
    overrideConfig: await config({ react: { emotion: true } }).toConfigs(),
  });
  const [valid] = await emotion.lintText('export const App = () => <div css={{ color: "red" }} />;\n', {
    filePath: 'app.tsx',
  });
  assert.equal(valid.fatalErrorCount, 0);
  assert.ok(
    !valid.messages.some(message => message.ruleId === 'react-plugin/dom-no-unknown-property'),
    JSON.stringify(valid.messages),
  );
  const [invalid] = await emotion.lintText('export const App = () => <div unknownProperty="value" />;\n', {
    filePath: 'app.tsx',
  });
  assert.ok(
    invalid.messages.some(message => message.ruleId === 'react-plugin/dom-no-unknown-property'),
    JSON.stringify(invalid.messages),
  );
});

test('Commitlint reads a Git revision range and rejects an invalid commit', async () => {
  const dir = await mkdtemp(path.join(process.cwd(), '.compatibility-'));
  try {
    const git = args => {
      const result = spawnSync('git', args, { cwd: dir, encoding: 'utf8' });
      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stderr);
    };
    git(['init', '--quiet']);
    for (const message of ['feat: initial commit', 'invalid: unsupported type']) {
      git([
        '-c',
        'user.name=Compatibility Test',
        '-c',
        'user.email=test@example.invalid',
        '-c',
        'commit.gpgsign=false',
        'commit',
        '--allow-empty',
        '-m',
        message,
      ]);
    }
    const configPath = path.join(dir, 'commitlint.config.mjs');
    await writeFile(configPath, "export default { extends: ['@jsxiaosi/commitlint-config'] };\n");
    const result = spawnSync(
      'pnpm',
      ['exec', 'commitlint', '--cwd', dir, '--config', configPath, '--from', 'HEAD^', '--to', 'HEAD'],
      { encoding: 'utf8' },
    );
    assert.ifError(result.error);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.ok((result.stdout + result.stderr).includes('type-enum'), result.stdout + result.stderr);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
