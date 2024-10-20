import { fileURLToPath } from 'node:url';
import { isPackageExists } from 'local-pkg';
import type { Awaitable, TypedFlatConfigItem } from './types';

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));

export async function combine(
  ...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 */
export function renameRules(rules: Record<string, any>, map: Record<string, string>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${from}/`)) return [to + key.slice(from.length), value];
      }
      return [key, value];
    }),
  );
}

export function isPackageInScope(name: string): boolean {
  return isPackageExists(name, { paths: [scopeUrl] });
}

export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  const nonExistingPackages = packages.filter(i => i && !isPackageInScope(i)) as string[];

  if (nonExistingPackages.length === 0) return;

  const p = await import('@clack/prompts');
  const result = await p.confirm({
    message: `${
      nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'
    } required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  });
  if (result) await import('@antfu/install-pkg').then(i => i.installPackage(nonExistingPackages, { dev: true }));
  else
    throw new Error(
      `Required packages are not installed: \n${nonExistingPackages.join(
        ', ',
      )}\nPlease install them manually or confirm the installation.`,
    );
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}
