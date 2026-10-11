import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { parse } from 'yaml';
import { resolvePointer, schemaSpec } from './openapi.js';
import { prepareRedocSpec } from './redoc-spec.ts';

const specification = (schemas) => ({
  openapi: '3.0.3', info: { title: 'Schema test', version: '1' },
  paths: { '/unrelated': { get: { responses: {} } } }, components: { schemas },
});

test('embedded specifications retain transitive, recursive and escaped schema references', () => {
  const spec = specification({
    Root: { type: 'object', properties: { child: { $ref: '#/components/schemas/Child' } } },
    Child: { allOf: [{ $ref: '#/components/schemas/Root' }, { $ref: '#/components/schemas/a~1b~0c/properties/value' }] },
    'a/b~c': { properties: { value: { $ref: '#/components/schemas/Leaf' } } },
    Leaf: { type: 'string' }, Unrelated: { type: 'integer' },
  });
  const subset = schemaSpec(spec, '#/components/schemas/Root');
  assert.deepEqual(Object.keys(subset.components.schemas).sort(), ['Child', 'Leaf', 'Root', 'a/b~c'].sort());
  assert.deepEqual(subset.paths, {});
  assert.equal(subset.openapi, spec.openapi);
  assert.deepEqual(subset.info, spec.info);
  assert.deepEqual(resolvePointer(subset, '#/components/schemas/a~1b~0c/properties/value'), { $ref: '#/components/schemas/Leaf' });
  assert.ok(Object.hasOwn(spec.components.schemas, 'Unrelated'));
});

test('discriminator mappings retain references and schema names', () => {
  const spec = specification({
    Root: { discriminator: { propertyName: 'kind', mapping: { a: '#/components/schemas/A', b: 'B' } } },
    A: { type: 'string' }, B: { type: 'integer' }, Unrelated: { type: 'boolean' },
  });
  assert.deepEqual(Object.keys(schemaSpec(spec, '#/components/schemas/Root').components.schemas).sort(), ['A', 'B', 'Root']);
});

test('missing and unsupported references fail during server-side extraction', () => {
  assert.throws(() => schemaSpec(specification({ Root: { $ref: '#/components/schemas/Missing' } }), '#/components/schemas/Root'), /Missing OpenAPI reference/);
  assert.throws(() => schemaSpec(specification({ Root: { $ref: 'external.yaml#/components/schemas/Other' } }), '#/components/schemas/Root'), /Unsupported OpenAPI schema reference/);
  assert.throws(() => schemaSpec(specification({ Root: { $ref: '#/components/schemas/Root/properties/missing' } }), '#/components/schemas/Root'), /Missing OpenAPI reference/);
  assert.throws(() => schemaSpec(specification({}), '#/paths/unrelated'), /Unsupported OpenAPI schema reference/);
});

test('description links still target omitted schemas in the full API reference', () => {
  const spec = specification({
    Root: { type: 'string', description: 'See [Other](Other).' },
    Other: { type: 'integer' },
  });
  const subset = schemaSpec(prepareRedocSpec(spec, '/references/api'), '#/components/schemas/Root');
  assert.equal(subset.components.schemas.Root.description, 'See [Other](/references/api#schema/Other).');
  assert.deepEqual(Object.keys(subset.components.schemas), ['Root']);
});

test('all current embedded schemas produce smaller payloads with resolvable references', () => {
  const spec = parse(readFileSync(new URL('../public/specs/nanocld/0.18.yaml', import.meta.url), 'utf8'));
  const prepared = prepareRedocSpec(spec, '/references/nanocl/daemon/v0.18');
  const fullBytes = Buffer.byteLength(JSON.stringify(prepared));
  for (const name of ['Statefile', 'ProxySslConfig', 'VmSpecPartial', 'CargoSpec', 'JobPartial', 'ResourceProxyRule', 'ResourceDnsRule']) {
    const subset = schemaSpec(prepared, `#/components/schemas/${name}`);
    const serialized = JSON.stringify(subset);
    assert.ok(Buffer.byteLength(serialized) < fullBytes / 2, `${name} should omit unrelated API content`);
    for (const reference of serialized.matchAll(/"\$ref":"([^"]+)"/g)) resolvePointer(subset, reference[1]);
  }
});
