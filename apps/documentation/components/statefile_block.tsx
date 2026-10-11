import { readFileSync } from 'node:fs';
import path from 'node:path';
import vars from '../lib/vars';
import CodeBlock from './code_block';

const examples = new Set([
  'advanced/args',
  'advanced/context-resource',
  'advanced/context',
  'advanced/secret-env',
  'advanced/secret-tls-cargo',
  'advanced/secret-tls',
  'advanced/substate',
  'advanced/vm-proxy',
  'advanced/vm',
  'advanced/vpn-cargo',
  'advanced/vpn',
  'get-started/deployment',
  'get-started/proxy',
]);

export default function StatefileBlock({ example }: { example: string }) {
  if (!examples.has(example)) {
    throw new Error(`Unknown Statefile example: ${example}`);
  }

  const source = readFileSync(path.join(process.cwd(), 'examples', `${example}.yml`), 'utf8');
  const code = source
    .replaceAll('$NANOCL_VERSION', `v${vars.nanoclMajorVersion}`)
    .replaceAll('$NCPROXY_VERSION', `v${vars.ncproxyMajorVersion}`)
    .replaceAll('$NCDNS_VERSION', `v${vars.ncdnsMajorVersion}`);

  return <CodeBlock language="yaml">{code}</CodeBlock>;
}
