---
title: Statefile Args | Nanocl
description: Use Statefile Args to customize your Nanocl configuration.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: Statefile Args
pagination_next: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Statefile Arguments

Statefile Arguments are a way to reuse your `Statefile` by taking advantage of `Liquid` templating.<br />
Let considere this example, create a new file called `my-deployment.yml` and add the following content :

<StatefileBlock example="advanced/args" />

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

The `Statefile` now require arguments that will be used for rendering

The correct command is now:

```sh
state apply -s my-deployment.yml -- --name deploy-example \
  --domain deploy-example.com \
  --image ghcr.io/next-hat/nanocl-get-started:latest \
  --port 9000
```

That why you can quickly deploy any Http service really easily.<br />
Now you have the basics to create a awsome `Statefile` !
