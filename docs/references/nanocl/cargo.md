---
title: Nanocl Cargo References
keywords: [documentation, references, nanocl, nanocld, resource, specification]
image: /img/logo.webp
sidebar_label: Cargo
sidebar_position: 3
---

# Cargo

In Nanocl, a `Cargo` refers to a container configuration.<br />
Once created unless it's been flagged as autoremove the system will ensure your cargo is always running.<br />
If too many errors occurs it may automatically rollback to a previous version if available in the history.<br />
There is the openapi specification for a `CargoConfigPartial` used to create a `cargo`:

import ApiSchema from '@theme/ApiSchema'

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/CargoConfigPartial" />
