import RenderCodeBlock from '@theme/CodeBlock';
import vars from '@site/vars';

import args from '!!raw-loader!@site/examples/advanced/args.yml';
import contextResource from '!!raw-loader!@site/examples/advanced/context-resource.yml';
import context from '!!raw-loader!@site/examples/advanced/context.yml';
import secretEnv from '!!raw-loader!@site/examples/advanced/secret-env.yml';
import secretTlsCargo from '!!raw-loader!@site/examples/advanced/secret-tls-cargo.yml';
import secretTls from '!!raw-loader!@site/examples/advanced/secret-tls.yml';
import substate from '!!raw-loader!@site/examples/advanced/substate.yml';
import vmProxy from '!!raw-loader!@site/examples/advanced/vm-proxy.yml';
import vm from '!!raw-loader!@site/examples/advanced/vm.yml';
import vpnCargo from '!!raw-loader!@site/examples/advanced/vpn-cargo.yml';
import vpn from '!!raw-loader!@site/examples/advanced/vpn.yml';
import deployment from '!!raw-loader!@site/examples/get-started/deployment.yml';
import proxy from '!!raw-loader!@site/examples/get-started/proxy.yml';

const examples = {
    'advanced/args': args,
    'advanced/context-resource': contextResource,
    'advanced/context': context,
    'advanced/secret-env': secretEnv,
    'advanced/secret-tls-cargo': secretTlsCargo,
    'advanced/secret-tls': secretTls,
    'advanced/substate': substate,
    'advanced/vm-proxy': vmProxy,
    'advanced/vm': vm,
    'advanced/vpn-cargo': vpnCargo,
    'advanced/vpn': vpn,
    'get-started/deployment': deployment,
    'get-started/proxy': proxy,
};

const StatefileBlock = ({ example }) => {
    const source = examples[example];

    if (!source) {
        throw new Error(`Unknown Statefile example: ${example}`);
    }

    const code = source
        .replace("$NANOCL_VERSION", `v${vars.nanoclMajorVersion}`)
        .replace("$NCPROXY_VERSION", `v${vars.ncproxyMajorVersion}`)
        .replace("$NCDNS_VERSION", `v${vars.ncdnsMajorVersion}`);

    return (
        <RenderCodeBlock className="language-yaml">{code}</RenderCodeBlock>
    )
}

export default StatefileBlock;
