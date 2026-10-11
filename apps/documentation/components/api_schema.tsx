import { readDaemonSpec, schemaSpec } from '../lib/openapi';
import { prepareRedocSpec } from '../lib/redoc-spec';
import { nanoclMajorVersion } from '../lib/vars';
import RedocSchema from './redoc-schema';

/** Object references use the same immutable latest spec as the previous documentation. */
export default function ApiSchema({ pointer, id = 'nanocld-latest', example = false }: { pointer: string; id?: string; example?: boolean }) {
  if (id !== 'nanocld-latest') throw new Error(`Unknown OpenAPI specification: ${id}`);
  const spec = readDaemonSpec(nanoclMajorVersion);
  // Resolve description links against all schema names before reducing the payload.
  const prepared = prepareRedocSpec(spec, `/references/nanocl/daemon/v${nanoclMajorVersion}`);

  return (
    <RedocSchema
      spec={schemaSpec(prepared, pointer)}
      pointer={pointer}
      example={example}
    />
  );
}
