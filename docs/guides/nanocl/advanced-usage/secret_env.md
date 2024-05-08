---
title: Secret Env - Nanocl
description: Use secret in your .
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, ssl, tls, certificate]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Secret Env
pagination_next: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Secret Env

You can create `Secret` to pass then as environement variable for your `Cargoes`.<br/>

:::tip
You can create secrets directly from a deployment `Statefile`!<br/>
But we recommend you to use `Secret` kind of Statefile and manage them separatly.
:::

There is an `Statefile` example on how to do it:

<StatefileBlock example="advanced/secret-env" />

For more information about secrets refer to our [secret reference][secret_ref]

[secret_ref]: /docs/references/nanocl/objects/secret.md
