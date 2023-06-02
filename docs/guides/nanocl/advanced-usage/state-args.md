---
title: StateFile Args | Nanocl
description: Use StateFile Args to customize your Nanocl configuration.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: StateFile Args
pagination_next: null
---

# StateFile Arguments

StateFile Arguments are a way to reuse your `StateFile` by taking advantage of `Liquid` templating.<br />
Let considere this example, create a new file called `my-deployment.yml` and add the following content :

```yml
Kind: Deployment
ApiVersion: v0.8

# Definition of your arguments
Args:
  - Name: name
    Type: String # Only available value is String for now
  - Name: domain
    Type: String
  - Name: image
    Type: String
  - Name: port
    Type: String

Namespace: global

Cargoes:
  - Name: ${{ Args.name }}
    Container:
      Image: ${{ Args.image }}

Resources:
  - Name: ${{ Args.domain }}
    Kind: ProxyRule
    Version: v0.4
    Config:
      Watch:
        - ${{ Args.name }}.global.c
      Rules:
        - Domain: ${{ Args.domain }}
          Network: Public
          Locations:
            - Path: /
              Target:
                CargoKey: ${{ Args.name }}.global.c
                CargoPort: ${{ Args.port }}
```

Now if you apply it with:

```sh
nanocl state apply -s my-deployment.yml
```

You will notice the following error message:

```console
error: the following required arguments were not provided:
  --name <name>
  --domain <domain>
  --image <image>
  --port <port>

Usage: nanocl state args -- --name <name> --domain <domain> --image <image> --port <port>

For more information, try '--help'.
```

The `StateFile` now require arguments that will be used for rendering

The correct command is now:

```sh
state apply -s my-deployment.yml -- --name deploy-example \
  --domain deploy-example.com \
  --image nexthat/nanocl-get-started:latest \
  --port 9000
```

That why you can quickly deploy any Http service really easily.<br />
Now you have the basics to create a awsome `StateFile` !
