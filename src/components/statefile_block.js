import { useState, useEffect } from 'react';
import RenderCodeBlock from '@theme/CodeBlock';
import vars from '@site/vars';

const StatefileBlock = ({ example }) => {
    const [code, setCode] = useState("");
    useEffect(() => {
        let isMounted = true; 
        import(`!!raw-loader!@site/examples/${example}.yml`)
            .then(source => {
                source = source.default
                    .replace("$NANOCL_VERSION", `v${vars.nanoclMajorVersion}`)
                    .replace("$NCPROXY_VERSION", `v${vars.ncproxyMajorVersion}`)
                    .replace("$NCDNS_VERSION", `v${vars.ncdnsMajorVersion}`)
                if (isMounted) setCode(source)
            })
            .catch(err => console.log(err));
        return () => {
            isMounted = false;
        }
    }, [])
    return (
        <RenderCodeBlock className="language-yaml">{code}</RenderCodeBlock>
    )
}

export default StatefileBlock;