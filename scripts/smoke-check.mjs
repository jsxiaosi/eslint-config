import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

async function smokeEslint() {
  const [{ ESLint }, { default: eslintConfig }] = await Promise.all([
    import('eslint'),
    import('@jsxiaosi/eslint-config'),
  ]);

  const composer = eslintConfig(
    {
      typescript: true,
      react: true,
      vue: true,
      prettier: true,
    },
    {
      ignores: ['**/fixtures/**'],
    },
  );

  const overrideConfig = await composer.toConfigs();
  assert.ok(overrideConfig.length > 0, 'Expected at least one ESLint flat config item.');

  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig,
  });
  const [result] = await eslint.lintText('export const answer = 42;\n', {
    filePath: 'smoke.js',
  });
  const lintSummary = result.messages.map(message => `${message.ruleId ?? 'unknown'}: ${message.message}`).join('\n');

  assert.equal(result.errorCount, 0, lintSummary);
  assert.equal(result.warningCount, 0, lintSummary);
}

async function smokePrettier() {
  const [{ default: prettier }, { default: prettierConfig }] = await Promise.all([
    import('prettier'),
    import('@jsxiaosi/eslint-config-prettier'),
  ]);

  const config = prettierConfig({ tailwindcss: true });
  const formatConfig = prettierConfig({ tailwindcss: false });

  assert.ok(Array.isArray(config.plugins), 'Expected Prettier plugins to be an array.');
  assert.ok(config.plugins.includes('prettier-plugin-tailwindcss'), 'Expected Tailwind plugin to be enabled.');

  const formatted = await prettier.format('const arr=[1,2]\n', {
    ...formatConfig,
    parser: 'babel',
  });

  assert.match(formatted, /const arr = \[1, 2\];/);
  assert.equal(formatConfig.endOfLine, 'lf');
}

async function smokeCommitlint() {
  const { default: commitlintConfig } = await import('@jsxiaosi/commitlint-config');

  assert.ok(Array.isArray(commitlintConfig.extends), 'Expected commitlint config to define extends.');
  assert.ok(
    commitlintConfig.extends.includes('@commitlint/config-conventional'),
    'Expected commitlint config to extend @commitlint/config-conventional.',
  );

  try {
    execFileSync('pnpm', ['exec', 'commitlint', '--config', 'commitlint.config.js'], {
      cwd: process.cwd(),
      input: 'feat(commitlint): add smoke check\n',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (error) {
    const stdout = error.stdout?.toString() ?? '';
    const stderr = error.stderr?.toString() ?? '';
    throw new Error(`commitlint smoke check failed.\n${stdout}${stderr}`.trim());
  }
}

const checks = {
  eslint: smokeEslint,
  prettier: smokePrettier,
  commitlint: smokeCommitlint,
};

const target = process.argv[2];

if (!target || !(target in checks)) {
  const availableTargets = Object.keys(checks).join(', ');
  console.error(`Usage: node scripts/smoke-check.mjs <target>\nAvailable targets: ${availableTargets}`);
  process.exit(1);
}

await checks[target]();
process.stdout.write(`Smoke check passed: ${target}\n`);
