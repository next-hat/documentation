---
title: Configure your proxy | Nanocl
description: Configure your proxy to expose your cargo
keywords: "documentation, nanocl, guides, get started, proxy, configuration"
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

> **Info** <br />
> To follow up the tutorial you must have a cargo called my-cargo running with port **9001** open as HTTP

Create a file called `proxy.get-started.yml` and copy the following content:

```yml
Kind: Resource
ApiVersion: v0.9

Resources:
- Name: get-started.com
  Kind: ProxyRule
  Config:
    Watch:
    # Cargo to watch change, formated as follow `cargo-name.namespace_name`
    - my-cargo.global.c
    Rules:
    - Domain: get-started.com
      Network: Public
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
nanocl state apply -s proxy.get-started.yml
```

You can see existing resources with:

```sh
nanocl resource ls
```

Now we should add get-started.com to the hosts

```sh
sudo vim /etc/hosts
```

and add the following line:
```console
127.0.0.1 get-started.com
```

Now we can test that our proxy rule was working

```sh
curl get-started.com
```

Should output:

```json
{
  "now": 1659412739561,
  "headers": {
    "connection": "upgrade",
    "x-forwarded-for": "172.28.237.150",
    "host": "get-started.com",
    "user-agent": "curl/7.68.0",
    "accept": "*/*"
  },
  "env": {
    "NODE_VERSION": "16.16.0",
    "HOSTNAME": "8c5d492b2b04",
    "YARN_VERSION": "1.22.19",
    "PORT": "9000",
    "HOME": "/home/node",
    "TERM": "xterm",
    "CLUSTER": "DEV",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "HOST": "0.0.0.0",
    "PWD": "/home/node/app"
  }
}
```

Now we know how to setup a proxy rule for our cargo enjoy deploying using Nanocl !
