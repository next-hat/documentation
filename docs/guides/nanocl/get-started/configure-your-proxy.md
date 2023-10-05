---
title: Configure your proxy | Nanocl
description: Configure your proxy to expose your cargo
keywords: [documentation, nanocl, guides, get started, proxy, configuration]
image: /img/logo.webp
sidebar_position: 3
sidebar_label: 3. Configure your proxy
---

# Configure your proxy

> **Tags** <br />
> documentation, nanocl, guides, get started, proxy, configuration

You can create `proxy rules` using the `proxy controller` to expose your cargo. <br/>
A `proxy rule` allow you to redirect a specific ip address / port or domain name to an upstream of a cargo.


## Add proxy rules

:::info
To follow up the tutorial you must have a cargo called my-cargo running with port **9001** open as HTTP
:::

Create a file called `proxy.deploy-example.yml` and copy the following content:

```yml
Kind: Resource
ApiVersion: v0.10

Resources:
- Name: deploy-example.com
  Kind: ProxyRule
  Version: v0.7
  Data:
    Rules:
    - Domain: deploy-example.com
      # Internal mean only accessible from 127.0.0.1 other possibility are :
      # - All to bind on all network interface
      # - Public to bind only on public ip address
      # - `namespace_name`.nsp to bind only on a namespace network
      Network: Internal
      Locations:
      - Path: /
        Target:
          # Cargo to target formated as follow `cargo-name.namespace_name.type` `c` cargo, `v` vm
          Key: my-cargo.global.c
          # Cargo port to target
          Port: 9001
```

Now let's create the proxy rule by running:

```sh
nanocl state apply -s proxy.deploy-example.yml
```

You can see existing resources with:

```sh
nanocl resource ls
```

Now we should add deploy-example.com to the hosts

```sh
sudo vim /etc/hosts
```

and add the following line:
```console
127.0.0.1 deploy-example.com
```

Now we can test that our proxy rule was working

```sh
curl deploy-example.com
```

Should output:

```json
{
  "now": 1696517487975,
  "headers": {
    "host": "deploy-example.com",
    "x-forwarded-scheme": "http",
    "x-forwarded-proto": "http",
    "x-forwarded-for": "127.0.0.1",
    "x-real-ip": "127.0.0.1",
    "connection": "close",
    "user-agent": "curl/7.88.1",
    "accept": "*/*"
  },
  "env": {
    "NODE_VERSION": "16.18.1",
    "HOSTNAME": "my-cargo-global-c",
    "YARN_VERSION": "1.22.19",
    "PORT": "9001",
    "HOME": "/home/node",
    "NANOCL_CARGO_NAMESPACE": "global",
    "TERM": "xterm",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "NANOCL_CARGO_KEY": "my-cargo.global",
    "HOST": "0.0.0.0",
    "PWD": "/home/node/app",
    "NANOCL_CARGO_INSTANCE": "0"
  }
}
```

Now we know how to setup a proxy rule for our cargo enjoy deploying using Nanocl !
