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

export function resolveObject(spec, value) {
  return value?.$ref ? { ...resolvePointer(spec, value.$ref), ...value, $ref: undefined } : value;
}

export function schemaName(pointer) {
  return pointer.split('/').at(-1).replaceAll('~1', '/').replaceAll('~0', '~');
}

export function schemaId(name, prefix = '') {
  return `schema-${prefix ? `${prefix}-` : ''}${name}`;
}

export function descriptionLink(spec, target, prefix = '', schemaBase = '') {
  if (/^(?:https?:\/\/|mailto:|tel:|#|\/)/.test(target)) return target;
  if (spec?.components?.schemas && Object.hasOwn(spec.components.schemas, target)) {
    return `${schemaBase}#${schemaId(target, prefix)}`;
  }
  // Generated Rustdoc type/method links have no browser destination.
  return null;
}

/** Collect referenced schemas once so recursive definitions stay browsable. */
export function referencedSchemas(spec, schema) {
  const names = new Set();
  function include(name) {
    if (!names.has(name)) {
      names.add(name);
      visit(spec.components.schemas[name]);
    }
  }
  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (value.$ref?.startsWith('#/components/schemas/')) {
      const name = schemaName(value.$ref);
      resolvePointer(spec, value.$ref);
      include(name);
    }
    if (typeof value.description === 'string') {
      for (const match of value.description.matchAll(/\[[^\]]+\]\(((?:[^()]|\([^)]*\))*)\)/g)) {
        if (Object.hasOwn(spec.components.schemas, match[1])) include(match[1]);
      }
    }
    Object.values(value).forEach(visit);
  }
  visit(schema);
  return [...names].sort();
}
