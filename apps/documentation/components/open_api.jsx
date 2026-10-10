import { daemonVersions, readDaemonSpec, resolveObject } from '../lib/openapi';
import { Description, SchemaDefinition, SchemaView } from './schema_view';
import CodeBlock from './code_block';
import ApiReferenceNavigation from './api_reference_navigation';
import './open_api.css';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
const operationAnchor = (method, endpoint) => `operation-${method}-${encodeURIComponent(endpoint)}`;
const tagAnchor = (tag) => `tag-${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

function MediaContent({ content = {}, spec }) {
  return Object.entries(content).map(([mediaType, media]) => (
    <div className="api-media-content" key={mediaType}>
      <p className="api-section-label"><code>{mediaType}</code></p>
      <SchemaView spec={spec} schema={media.schema} />
      {media.example !== undefined ? <CodeBlock language="json">{JSON.stringify(media.example, null, 2)}</CodeBlock> : null}
      {Object.entries(media.examples || {}).map(([name, value]) => {
        const example = resolveObject(spec, value);
        return <div key={name}><p className="api-section-label">{example.summary || name}</p><Description spec={spec}>{example.description}</Description>{example.value !== undefined ? <CodeBlock language="json">{JSON.stringify(example.value, null, 2)}</CodeBlock> : null}{example.externalValue ? <a href={example.externalValue}>View example</a> : null}</div>;
      })}
    </div>
  ));
}

function Parameters({ parameters, spec }) {
  if (!parameters.length) return null;
  return (
    <>
      <h4>Parameters</h4>
      <div className="api-table-scroll">
        <table className="api-schema-table">
          <thead><tr><th>Name</th><th>Location</th><th>Description</th></tr></thead>
          <tbody>{parameters.map((value) => {
            const parameter = resolveObject(spec, value);
            return (
              <tr key={`${parameter.in}-${parameter.name}`}>
                <td><code>{parameter.name}</code>{parameter.required ? <span className="api-required">required</span> : <span className="api-optional">optional</span>}</td>
                <td><code>{parameter.in}</code></td>
                <td><Description spec={spec}>{parameter.description}</Description><SchemaView spec={spec} schema={parameter.schema} />{parameter.example !== undefined ? <p className="api-constraint">Example: <code>{typeof parameter.example === 'string' ? parameter.example : JSON.stringify(parameter.example)}</code></p> : null}<MediaContent content={parameter.content} spec={spec} /></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </>
  );
}

function Operation({ method, endpoint, operation, pathItem, spec }) {
  const body = resolveObject(spec, operation.requestBody);
  const security = operation.security ?? spec.security;
  const parameters = [...(pathItem.parameters || []), ...(operation.parameters || [])];
  return (
    <details className="api-operation" id={operationAnchor(method, endpoint)}>
      <summary>
        <span className={`api-method api-method-${method}`}>{method.toUpperCase()}</span>
        <code className="api-endpoint">{endpoint}</code>
        <span className="api-operation-summary">{operation.summary || operation.operationId}</span>
      </summary>
      <div className="api-operation-body">
        {operation.deprecated ? <p className="api-required">Deprecated</p> : null}
        <Description spec={spec}>{operation.description}</Description>
        {operation.operationId ? <p className="api-constraint">Operation ID: <code>{operation.operationId}</code></p> : null}
        {security?.length ? <p className="api-constraint">Authentication: {security.map((requirement, index) => <span key={index}>{index > 0 ? ' or ' : null}{Object.entries(requirement).map(([name, scopes]) => <span key={name}><code>{name}</code>{scopes.length ? ` (${scopes.join(', ')})` : null}</span>)}</span>)}</p> : null}
        <Parameters parameters={parameters} spec={spec} />
        {body ? <><h4>Request body {body.required ? <span className="api-required">required</span> : null}</h4><Description spec={spec}>{body.description}</Description><MediaContent content={body.content} spec={spec} /></> : null}
        <h4>Responses</h4>
        {Object.entries(operation.responses || {}).map(([status, value]) => {
          const response = resolveObject(spec, value);
          return (
            <section className="api-response" key={status}>
              <h5><span className="api-response-status">{status}</span></h5>
              <Description spec={spec}>{response.description}</Description>
              {Object.entries(response.headers || {}).map(([name, header]) => <div key={name}><p className="api-section-label">Header: <code>{name}</code></p><Description spec={spec}>{resolveObject(spec, header).description}</Description><SchemaView spec={spec} schema={resolveObject(spec, header).schema} /></div>)}
              <MediaContent content={response.content} spec={spec} />
            </section>
          );
        })}
      </div>
    </details>
  );
}

export default function OpenApi({ version }) {
  const spec = readDaemonSpec(version);
  const operations = Object.entries(spec.paths).flatMap(([endpoint, pathItem]) => methods
    .filter((method) => pathItem[method])
    .map((method) => ({ endpoint, pathItem, method, operation: pathItem[method] })));
  const tags = [...new Set(operations.map(({ operation }) => operation.tags?.[0] || 'Other'))];

  return (
    <div className="api-reference">
      <ApiReferenceNavigation />
      <nav className="api-versions" aria-label="Daemon API version">
        {daemonVersions.map((item) => <a href={`/references/nanocl/daemon/v${item}`} aria-current={item === version ? 'page' : undefined} key={item}>v{item}{item === '0.18' ? ' · latest' : ''}</a>)}
      </nav>
      <p className="api-spec-meta">{operations.length} operations · {Object.keys(spec.components?.schemas || {}).length} schemas · specification {spec.info.version}</p>
      <Description spec={spec}>{spec.info.description}</Description>
      <div className="api-spec-download"><a href={`/specs/nanocld/${version}.yaml`} download>Download OpenAPI YAML ↗</a></div>
      {spec.servers?.length ? <section><h2>Servers</h2>{spec.servers.map((server) => <div key={server.url}><code>{server.url}</code><Description spec={spec}>{server.description}</Description>{Object.entries(server.variables || {}).map(([name, variable]) => <p key={name} className="api-constraint"><code>{name}</code>: default <code>{variable.default}</code>{variable.enum ? `; allowed values: ${variable.enum.join(', ')}` : ''}{variable.description ? ` — ${variable.description}` : ''}</p>)}</div>)}</section> : null}
      <nav className="api-tag-nav" aria-label="API sections">{tags.map((tag) => <a href={`#${tagAnchor(tag)}`} key={tag}>{tag}</a>)}<a href="#schemas">Schemas</a></nav>
      {tags.map((tag) => <section className="api-tag" id={tagAnchor(tag)} key={tag}>
        <h2>{tag}</h2>
        <Description spec={spec}>{spec.tags?.find((entry) => entry.name === tag)?.description}</Description>
        {operations.filter(({ operation }) => (operation.tags?.[0] || 'Other') === tag).map((entry) => <Operation {...entry} spec={spec} key={`${entry.method}-${entry.endpoint}`} />)}
      </section>)}
      {spec.components?.securitySchemes ? <section><h2>Authentication schemes</h2>{Object.entries(spec.components.securitySchemes).map(([name, scheme]) => <div key={name}><h3>{name}</h3><Description spec={spec}>{scheme.description}</Description><CodeBlock language="json">{JSON.stringify(scheme, null, 2)}</CodeBlock></div>)}</section> : null}
      <section id="schemas"><h2>Schemas</h2><p>Expand a schema to inspect its fields. Linked types jump to their definitions.</p>{Object.entries(spec.components?.schemas || {}).sort(([a], [b]) => a.localeCompare(b)).map(([name, schema]) => <SchemaDefinition spec={spec} key={name} name={name} schema={schema} />)}</section>
    </div>
  );
}
