import { readDaemonSpec, referencedSchemas, resolvePointer, schemaName } from '../lib/openapi';
import { SchemaDefinition } from './schema_view';
import ApiReferenceNavigation from './api_reference_navigation';
import './open_api.css';

/** Object references use the same immutable latest spec as the previous documentation. */
export default function ApiSchema({ pointer, id = 'nanocld-latest' }) {
  if (id !== 'nanocld-latest') throw new Error(`Unknown OpenAPI specification: ${id}`);
  const spec = readDaemonSpec('0.18');
  const schema = resolvePointer(spec, pointer);
  const name = schemaName(pointer);
  const prefix = name;
  const referenced = referencedSchemas(spec, schema).filter((reference) => reference !== name);

  return (
    <div className="api-reference api-object-reference">
      <ApiReferenceNavigation />
      <SchemaDefinition spec={spec} name={name} schema={schema} prefix={prefix} open />
      {referenced.length ? <>
        <p className="api-section-label">Referenced types</p>
        {referenced.map((reference) => <SchemaDefinition spec={spec} key={reference} name={reference} schema={spec.components.schemas[reference]} prefix={prefix} />)}
      </> : null}
    </div>
  );
}
