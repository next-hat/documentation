import React from 'react';
import ApiDoc from '@theme/ApiDoc';

function OpenApi(props) {
  return (
    <ApiDoc
      layoutProps={{
        title: props.title,
        description: props.description,
      }}
      specProps={{
        url: props.specPath,
      }}
    />
  );
}

export default OpenApi;
