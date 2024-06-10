---
title: Configure your proxy - Nanocl
description: Configure your proxy to expose your cargo
keywords: [documentation, nanocl, guides, get started, proxy, configuration]
image: /img/logo.webp
sidebar_position: 3
sidebar_label: 3. Configure your proxy
---

import StatefileBlock from '@site/src/components/statefile_block';

# Configure your proxy

You can create `proxy rules` using the `proxy controller` to expose your cargo. <br/>
A `proxy rule` allow you to redirect a specific ip address / port or domain name to an upstream of a cargo.


## Add proxy rules

:::info
To follow up the tutorial you must have a cargo called my-cargo running with port **9001** open as HTTP
:::

Create a file called `proxy.deploy-example.yml` and copy the following content:

<StatefileBlock example="get-started/proxy" />

Now let's create the proxy rule by running:

```sh
nanocl state apply -s proxy.deploy-example.yml
```

You can see existing resources with:

```sh
nanocl resource ls
```

Now we can test that our proxy rule was working

```sh
curl --header "Host: deploy-example.com" 127.0.0.1
```

Should output:

```json
{
  "headers": {
    "x-forwarded-proto": "http",
    "x-forwarded-for": "127.0.0.1",
    "accept": "*/*",
    "x-real-ip": "127.0.0.1",
    "connection": "close",
    "x-forwarded-scheme": "http",
    "host": "deploy-example.com",
    "user-agent": "curl/8.2.1"
  },
  "envs": {
    "   ": "/bin/nanocl-get-started",
    "NANOCL_CARGO_INSTANCE": "0",
    "NANOCL_NODE_ADDR": "192.168.8.102",
    "HOME": "/",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "TERM": "xterm",
    "PORT": "9001",
    "HOSTNAME": "my-cargo-46cAuD.global.c",
    "NANOCL_CARGO_KEY": "my-cargo.global",
    "NANOCL_CARGO_NAMESPACE": "global",
    "NANOCL_NODE": "behuman"
  }
}
```

Now we know how to setup a proxy rule for our cargo enjoy deploying using Nanocl !
