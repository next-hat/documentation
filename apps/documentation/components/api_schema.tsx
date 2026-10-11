import { readDaemonSpec, resolvePointer } from '../lib/openapi';
import { prepareRedocSpec } from '../lib/redoc-spec';
import RedocSchema from './redoc-schema';

/** Object references use the same immutable latest spec as the previous documentation. */
export default function ApiSchema({ pointer, id = 'nanocld-latest', example = false }: { pointer: string; id?: string; example?: boolean }) {
  if (id !== 'nanocld-latest') throw new Error(`Unknown OpenAPI specification: ${id}`);
  const spec = readDaemonSpec('0.18');
  resolvePointer(spec, pointer);

  return (
    <RedocSchema
      spec={prepareRedocSpec(spec, '/references/nanocl/daemon/v0.18')}
      pointer={pointer}
      example={example}
    />
  );
}
