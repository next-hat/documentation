import { descriptionLink, schemaId, schemaName } from '../lib/openapi';

function InlineDescription({ text, spec, schemaBase, prefix }) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\((?:[^()]|\([^)]*\))*\))/g).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([\s\S]+)\)$/);
    if (link) {
      const href = descriptionLink(spec, link[2], prefix, schemaBase);
      return href ? <a key={index} href={href}>{link[1]}</a> : <code key={index}>{link[1]}</code>;
    }
    return part;
  });
}

export function Description({ children, spec, schemaBase = '', prefix = '' }) {
  if (!children) return null;
  const text = String(children)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?p[^>]*>/gi, '\n');
  return <div className="api-description">{text.split(/\n\s*\n/).map((paragraph, index) => {
    const heading = paragraph.match(/^#{1,6}\s+([^\n]+)(?:\n([\s\S]*))?$/);
    return <div className="api-description-paragraph" key={index}>{heading ? <><strong><InlineDescription text={heading[1]} spec={spec} schemaBase={schemaBase} prefix={prefix} /></strong>{heading[2] ? <><br /><InlineDescription text={heading[2]} spec={spec} schemaBase={schemaBase} prefix={prefix} /></> : null}</> : <InlineDescription text={paragraph} spec={spec} schemaBase={schemaBase} prefix={prefix} />}</div>;
  })}</div>;
}

function SchemaType({ schema, schemaBase, prefix }) {
  if (typeof schema === 'boolean') return <code>{schema ? 'any' : 'never'}</code>;
  if (schema.$ref) {
    const name = schemaName(schema.$ref);
    return <a href={`${schemaBase}#${schemaId(name, prefix)}`}><code>{name}</code></a>;
  }
  if (schema.type === 'array' || schema.type?.includes?.('array')) {
    return <><code>array</code>{schema.items ? <> of <SchemaType schema={schema.items} schemaBase={schemaBase} prefix={prefix} /></> : null}{Array.isArray(schema.type) && schema.type.includes('null') ? <code> | null</code> : null}</>;
  }
  if (schema.oneOf || schema.anyOf || schema.allOf) {
    const keyword = schema.oneOf ? 'one of' : schema.anyOf ? 'any of' : 'all of';
    return <><code>{keyword}: </code>{(schema.oneOf || schema.anyOf || schema.allOf).map((choice, index) => <span key={index}>{index > 0 ? ' | ' : null}<SchemaType schema={choice} schemaBase={schemaBase} prefix={prefix} /></span>)}</>;
  }
  return <code>{Array.isArray(schema.type) ? schema.type.join(' | ') : schema.type || (schema.properties ? 'object' : 'any')}{schema.format ? ` (${schema.format})` : ''}</code>;
}

function Value({ value }) {
  return <code>{typeof value === 'string' ? value : JSON.stringify(value)}</code>;
}

function Constraints({ schema }) {
  const constraints = ['default', 'const', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'minLength', 'maxLength', 'pattern', 'minItems', 'maxItems', 'uniqueItems', 'minProperties', 'maxProperties'];
  return (
    <>
      {schema.enum ? <p className="api-constraint">Allowed values: {schema.enum.map((value, index) => <span key={index}>{index > 0 ? ', ' : null}<Value value={value} /></span>)}</p> : null}
      {constraints.filter((name) => schema[name] !== undefined).map((name) => <p className="api-constraint" key={name}>{name}: <Value value={schema[name]} /></p>)}
      {schema.deprecated ? <p className="api-constraint">Deprecated</p> : null}
      {schema.readOnly ? <p className="api-constraint">Read only</p> : null}
      {schema.writeOnly ? <p className="api-constraint">Write only</p> : null}
      {schema.example !== undefined ? <p className="api-constraint">Example: <Value value={schema.example} /></p> : null}
      {schema.examples ? <p className="api-constraint">Examples: <Value value={schema.examples} /></p> : null}
    </>
  );
}

export function SchemaView({ schema, spec, schemaBase = '', prefix = '', showDescription = true }) {
  if (schema === undefined) return null;
  if (typeof schema === 'boolean') return <SchemaType schema={schema} schemaBase={schemaBase} prefix={prefix} />;
  const choices = schema.oneOf || schema.anyOf || schema.allOf;
  return (
    <div className="api-schema-view">
      {schema.$ref ? <p><SchemaType schema={schema} schemaBase={schemaBase} prefix={prefix} /></p> : null}
      {showDescription ? <Description spec={spec} schemaBase={schemaBase} prefix={prefix}>{schema.description}</Description> : null}
      <Constraints schema={schema} />
      {schema.properties && Object.keys(schema.properties).length > 0 ? (
        <div className="api-table-scroll">
          <table className="api-schema-table">
            <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
            <tbody>
              {Object.entries(schema.properties).map(([name, property]) => (
                <tr key={name}>
                  <td><code>{name}</code>{schema.required?.includes(name) ? <span className="api-required">required</span> : <span className="api-optional">optional</span>}</td>
                  <td><SchemaType schema={property} schemaBase={schemaBase} prefix={prefix} /></td>
                  <td>
                    <Description spec={spec} schemaBase={schemaBase} prefix={prefix}>{property.description}</Description>
                    <Constraints schema={property} />
                    {property.properties || property.items || property.oneOf || property.anyOf || property.allOf || typeof property.additionalProperties === 'object' ? (
                      <details className="api-inline-schema">
                        <summary>View structure</summary>
                        <SchemaView spec={spec} schema={property} schemaBase={schemaBase} prefix={prefix} showDescription={false} />
                      </details>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {schema.items ? <div className="api-schema-nested"><p className="api-section-label">Array items</p><SchemaView spec={spec} schema={schema.items} schemaBase={schemaBase} prefix={prefix} /></div> : null}
      {choices ? choices.map((choice, index) => <div className="api-schema-nested" key={index}><p className="api-section-label">{schema.allOf ? 'All of' : schema.oneOf ? 'One of' : 'Any of'} — {index + 1} <SchemaType schema={choice} schemaBase={schemaBase} prefix={prefix} /></p><SchemaView spec={spec} schema={choice} schemaBase={schemaBase} prefix={prefix} /></div>) : null}
      {schema.additionalProperties !== undefined ? (
        <div className="api-schema-nested"><p className="api-section-label">Additional properties: {typeof schema.additionalProperties === 'boolean' ? (schema.additionalProperties ? 'allowed' : 'not allowed') : <SchemaType schema={schema.additionalProperties} schemaBase={schemaBase} prefix={prefix} />}</p>{typeof schema.additionalProperties === 'object' ? <SchemaView spec={spec} schema={schema.additionalProperties} schemaBase={schemaBase} prefix={prefix} /> : null}</div>
      ) : null}
      {schema.propertyNames ? <div className="api-schema-nested"><p className="api-section-label">Property names</p><SchemaView spec={spec} schema={schema.propertyNames} schemaBase={schemaBase} prefix={prefix} /></div> : null}
      {!schema.properties && !schema.items && !schema.$ref && !choices ? <p><SchemaType schema={schema} schemaBase={schemaBase} prefix={prefix} /></p> : null}
    </div>
  );
}

export function SchemaDefinition({ name, schema, spec, prefix = '', open = false }) {
  return (
    <details className="api-schema-definition" id={schemaId(name, prefix)} open={open || undefined}>
      <summary><strong>{name}</strong> <SchemaType schema={schema} schemaBase="" prefix={prefix} /></summary>
      <SchemaView spec={spec} schema={schema} prefix={prefix} />
    </details>
  );
}
