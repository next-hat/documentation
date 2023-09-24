---
title: Adminer | Nanocl
sidebar_label: Adminer
image: /img/logo.webp
description: Easily deploy a Adminer instance with Nanocl !
keywords: [documentation, samples, examples, Adminer, nanocl, nanocl CLI, CLI]
sidebar_position: 1
pagination_next: null
pagination_prev: null
---
# Adminer

[Adminer][adminer] (formerly phpMinAdmin) is a full-featured database management tool written in PHP.
You can easily deploy [adminer][adminer] using their official [docker image][docker image]:

```yaml
Kind: Deployment
ApiVersion: v0.9
Namespace: global
Args:
  - Name: domain
    Kind: String
    Default: adminer.internal
  - Name: network
    Kind: String
    Default: Public
# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
  - Name: adminer
    Kind: ProxyRule
    Version: v0.6
    Config:
      Watch:
        - adminer.global.c
      Rules:
        - Network: ${{ Args.network }}
          Domain: ${{ Args.domain }}
          Locations:
            - Path: /
              Target:
                Key: adminer.global.c
                Port: 8080
# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
  - Name: adminer
    Container:
      Image: adminer:4.8.1
```

Copy past the previous content and save it under a file called `adminer.yml`.<br />
Then execute the following command to startup a [adminer][adminer] server:

```sh
nanocl state apply -s adminer.yml
```

If you are using `Nanocl` on your local computer, edit your `/etc/hosts` to add this line:

```
127.0.0.1 adminer.internal
```

You should be able to see the following page:

<img src="/img/adminer.png" />

Optionally you can choose the domain name using this command:

```sh
nanocl state apply -s adminer.yml -- --domain my-domain.com
```

For production, we recommand you to deploy it inside a vpn follow our [vpn guide][vpn guide].<br />
And rerun the previos command with the network of your vpn, if you didn't took something fancy it should be:

```sh
nanocl state apply -s adminer.yml -- --network private.nsp
```

This way [adminer][adminer] will only be accessible over the vpn!


[adminer]: https://www.adminer.org
[docker image]: https://hub.docker.com/_/adminer/
[vpn guide]: /guides/nanocl/advanced-usage/vpn
