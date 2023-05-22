---
title: StateFile | Nanocl
description: Use StateFile to manage your state
keywords: [documentation, nanocl, guides, get started, proxy, configuration, state, file, config, yaml, yml, statefile]
image: /img/logo.webp
sidebar_position: 4
sidebar_label: 4. Use StateFile
pagination_next: null
---

# StateFile

> **Tags** <br />
> documentation, nanocl, guides, get started, statefile

StateFile are a way to describe the state you want for a specific namespace.

It use yaml form we can sumerize the deployment of our cargo as follow :

```yml
Kind: Deployment
ApiVersion: v0.7

Namespace: global

# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
- Name: my-cargo
  Container:
    Image: nexthat/nanocl-get-started:latest

# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
- Name: deploy-example.com
  Kind: ProxyRule
  Version: v0.1
  Config:
    Watch:
    - my-cargo.global
    Rules:
    - Domain: deploy-example.com
      Network: Public
      Locations:
      - Path: /
        Target:
          CargoKey: my-cargo.global
          CargoPort: 9000
```

Save this file under `my-cargo.yml` and apply it using:

```sh
nanocl state apply -f ./my-cargo.yml
```

And test with a simple curl:

```sh
curl --header "Host: deploy-example.com" 127.0.0.1
```

And voila.
