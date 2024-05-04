---
title: Statefile - Nanocl
description: Use Statefile to describe the state you want for a specific namespace.
keywords: [documentation, nanocl, guides, get started, proxy, configuration, state, file, config, yaml, yml, statefile]
image: /img/logo.webp
sidebar_position: 4
sidebar_label: 4. Use Statefile
pagination_next: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Statefile

Statefile are a way to describe the state you want for a specific namespace.

It use yaml form we can sumerize the deployment of our cargo as follow :

<StatefileBlock example="get-started/deployment" />

Save this file under `my-cargo.yml` and apply it using:

```sh
nanocl state apply -s ./my-cargo.yml
```

And test with a simple curl:

```sh
curl --header "Host: deploy-example.com" 127.0.0.1
```

And voila.
