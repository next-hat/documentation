import { daemonVersions, readDaemonSpec } from '../lib/openapi';
import type { RedocSpec } from '../lib/redoc-options';
import { prepareRedocSpec } from '../lib/redoc-spec';
import RedocViewer from './redoc-viewer';
import './open_api.css';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'] as const;

export default function OpenApi({ version }: { version: string }) {
  const spec: RedocSpec = readDaemonSpec(version);
  const operationCount = Object.values(spec.paths).reduce((count, path) => count + methods.filter((method) => path[method]).length, 0);
  const specUrl = `/specs/nanocld/${version}.yaml`;
  return <div className="api-reference">
    <nav className="api-versions" aria-label="Daemon API version">
      {daemonVersions.map((item) => <a href={`/references/nanocl/daemon/v${item}`} aria-current={item === version ? 'page' : undefined} key={item}>v{item}{item === '0.18' ? ' · latest' : ''}</a>)}
    </nav>
    <div className="api-reference-toolbar">
      <p className="api-spec-meta">{operationCount} operations · {Object.keys(spec.components?.schemas || {}).length} schemas · specification {spec.info.version}</p>
      <a href={specUrl} download>Download OpenAPI YAML ↗</a>
    </div>
    <RedocViewer spec={prepareRedocSpec(spec)} specUrl={specUrl} version={version} />
  </div>;
}
