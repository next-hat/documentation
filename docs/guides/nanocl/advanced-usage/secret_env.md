---
title: Secret Env | Nanocl
description: Use secret in your .
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, ssl, tls, certificate]
image: /img/logo.webp
sidebar_position: 0
sidebar_label: Secret Env
pagination_next: null
---

# Secret Env

You can create `Secret` to pass then as environement variable for your `Cargoes`.<br/>

:::tip
You can create secrets directly from a deployment `Statefile`!<br/>
But we recommend you to use `Secret` kind of Statefile and manage them separatly.
:::

There is an `Statefile` example on how to do it:

```yaml
ApiVersion: v0.12

Namespace: global

# See all options:
# https://docs.next-hat.com/references/nanocl/secret
Secrets:
- Key: env.my-secret
  Kind: Env
  Data:
  - MY_ENV=MY_VALUE
  - MY_ENV1=MY_VALUE1

# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
- Name: my-cargo
  # Specify what secrets to use
  Secrets:
  - env.my-secret
  Container:
    Image: ghcr.io/nxthat/nanocl-get-started:latest

# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
- Name: deploy-example.com
  Kind: ProxyRule
  Version: v0.9
  Data:
    Rules:
    - Domain: deploy-example.com
      Network: Public
      # Enable usage of our secret
      Ssl: cert.deploy-example.com
      Locations:
      - Path: /
        Target:
          Key: my-cargo.global.c
          Port: 9000
```

For more information about secrets refer to our [Secret reference](/references/nanocl/secret)
