import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { parse } from 'yaml';

export const daemonVersions = ['0.18', '0.17', '0.16', '0.15', '0.14', '0.13', '0.12'];

export const readDaemonSpec = cache((version) => {
  if (!daemonVersions.includes(version)) {
    throw new Error(`Unknown Nanocl daemon specification: ${version}`);
  }
  return parse(readFileSync(path.join(process.cwd(), 'public', 'specs', 'nanocld', `${version}.yaml`), 'utf8'));
});

export function resolvePointer(spec, pointer) {
  if (!pointer.startsWith('#/')) {
    throw new Error(`Unsupported OpenAPI reference: ${pointer}`);
  }
  const value = pointer.slice(2).split('/').reduce(
    (current, key) => current?.[key.replaceAll('~1', '/').replaceAll('~0', '~')],
    spec,
  );
  if (value === undefined) {
    throw new Error(`Missing OpenAPI reference: ${pointer}`);
  }
  return value;
}
