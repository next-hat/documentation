import React, { useState, useEffect } from 'react';
import RenderCodeBlock from '@theme/CodeBlock';

const StateRepository = ({ url, section }) => {
  const [code, setCode] = useState("");
  useEffect(() => {
    let isMounted = true; 
    fetch(url)
        .then(source => {
          console.log(source);
          source = source
              .default
              .match(new RegExp(`\/\/ <${section}>\n([\\s\\S]*)\/\/ <\/${section}>`))[1];
          if (isMounted) setCode("ApiVersion: v0.12\n")
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

export default StateRepository;