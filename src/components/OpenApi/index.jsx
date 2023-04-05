import React from 'react';
import ApiDoc from '@theme/ApiDoc';

function OpenApi() {
  return (
    <ApiDoc
      layoutProps={{
        title: `Client only page using url`,
        description: 'Example showcasing client only loading of yaml',
      }}
      specProps={{
        url: '/specs/nanocld/swagger.yaml',
      }}
    />
  );
}

export default OpenApi;
