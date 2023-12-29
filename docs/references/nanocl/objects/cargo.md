---
title: Nanocl Cargo References
keywords: [documentation, references, nanocl, nanocld, cargo, specification, spec]
image: /img/logo.webp
sidebar_label: Cargo
sidebar_position: 3
---

# Cargo

In Nanocl, a `Cargo` refers to a replicable container configuration.<br />
Once created the system will ensure your cargo is always running.<br />
If too many errors occurs it may automatically rollback to a previous version if available in the history.<br />
There is the openapi specification for a `CargoSpecPartial` used to create a `cargo`:

import ApiSchema from '@theme/ApiSchema'

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/CargoSpecPartial" />
