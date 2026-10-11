import { translate, translateSpec } from '@/lib/translate';
import { localePath, type Locale } from '@/lib/locales';
import { readDaemonSpec, schemaSpec } from '../lib/openapi';
import { prepareRedocSpec } from '../lib/redoc-spec';
import { nanoclMajorVersion } from '../lib/vars';
import RedocSchema from './redoc-schema';

/** Object references use the same immutable latest spec as the previous documentation. */
export default function ApiSchema({ pointer, id = 'nanocld-latest', example = false, locale = 'en' }: { pointer: string; id?: string; example?: boolean; locale?: Locale }) {
  if (id !== 'nanocld-latest') throw new Error(`Unknown OpenAPI specification: ${id}`);
  const spec = translateSpec(readDaemonSpec(nanoclMajorVersion), locale);
  // Resolve description links against all schema names before reducing the payload.
  const prepared = prepareRedocSpec(spec, localePath(`/references/nanocl/daemon/v${nanoclMajorVersion}`, locale), translate(locale, 'Discriminator field:'));

  return (
    <RedocSchema
      spec={schemaSpec(prepared, pointer)}
      pointer={pointer}
      example={example}
      locale={locale}
    />
  );
}
