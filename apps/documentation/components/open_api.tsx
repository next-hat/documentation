import { translate, translateSpec } from '@/lib/translate';
import { localePath, type Locale } from '@/lib/locales';
import { daemonVersions, readDaemonSpec } from '../lib/openapi';
import { nanoclMajorVersion } from '../lib/vars';
import type { RedocSpec } from '../lib/redoc-options';
import { prepareRedocSpec } from '../lib/redoc-spec';
import RedocViewer from './redoc-viewer';
import './open_api.css';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'] as const;

export default function OpenApi({ version, locale = 'en' }: { version: string; locale?: Locale }) {
  const t = (text: string) => translate(locale, text);
  const spec: RedocSpec = translateSpec(readDaemonSpec(version), locale);
  const operationCount = Object.values(spec.paths).reduce((count, path) => count + methods.filter((method) => path[method]).length, 0);
  const specUrl = `/specs/nanocld/${version}.yaml`;
  return <div className="api-reference">
    <nav className="api-versions" aria-label={t('Daemon API version')}>
      {daemonVersions.map((item) => <a href={localePath(`/references/nanocl/daemon/v${item}`, locale)} aria-current={item === version ? 'page' : undefined} key={item}>v{item}{item === nanoclMajorVersion ? ` · ${t('latest')}` : ''}</a>)}
    </nav>
    <div className="api-reference-toolbar">
      <p className="api-spec-meta">{operationCount} {t('operations')} · {Object.keys(spec.components?.schemas || {}).length} {t('schemas')} · {t('specification')} {spec.info.version}</p>
      <a href={specUrl} download>{t('Download OpenAPI YAML ↗')}</a>
    </div>
    <RedocViewer spec={prepareRedocSpec(spec, '', t('Discriminator field:'))} specUrl={specUrl} version={version} locale={locale} />
  </div>;
}
