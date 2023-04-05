import React from 'react';
import OpenApi from '@site/src/components/OpenApi';

export default function OpenApiPage() {
    return (
        <OpenApi
            title="Nanocl Daemon OpenApi Spec"
            description="The OpenApi specification for the Nanocl Daemon."
            specPath="/specs/nanocld/swagger.yaml"
        />
    );
}
