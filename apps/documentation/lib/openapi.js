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

/** Keep only the schemas an embedded definition can resolve through references. */
export function schemaSpec(spec, pointer) {
  const schemas = new Map();

  function include(reference) {
    const match = /^#\/components\/schemas\/([^/]+)(?:\/|$)/.exec(reference);
    if (!match) throw new Error(`Unsupported OpenAPI schema reference: ${reference}`);
    resolvePointer(spec, reference);
    const name = match[1].replaceAll('~1', '/').replaceAll('~0', '~');
    if (schemas.has(name)) return;
    // Record the schema before visiting it so recursive references terminate.
    const schema = spec.components.schemas[name];
    schemas.set(name, schema);
    visit(schema);
  }

  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (typeof value.$ref === 'string') include(value.$ref);
    for (const reference of Object.values(value.discriminator?.mapping || {})) {
      // OpenAPI discriminator mappings may use either schema names or references.
      const name = Object.hasOwn(spec.components.schemas, reference)
        ? `#/components/schemas/${reference.replaceAll('~', '~0').replaceAll('/', '~1')}`
        : reference;
      include(name);
    }
    for (const child of Object.values(value)) visit(child);
  }

  include(pointer);
  return { openapi: spec.openapi, info: spec.info, paths: {}, components: { schemas: Object.fromEntries(schemas) } };
}
