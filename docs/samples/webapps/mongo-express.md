---
title: Mongo Express | Nanocl
sidebar_label: Mongo Express
image: /img/logo.webp
description: Easily deploy a Mongo Express instance with Nanocl !
keywords: [documentation, samples, examples, Mongo Express, nanocl, nanocl CLI, CLI]
sidebar_position: 2
pagination_next: null
pagination_prev: null
---
# Mongo Express

[Mongo Express][mongo express] is a Web-based MongoDB admin interface, written with Node.js and express!<br />
You can easily deploy [mongo express][mongo express] using their official [docker image][docker image]:

```yaml
Kind: Deployment
ApiVersion: v0.10

Namespace: global

Args:
- Name: domain
  Kind: String
  Default: mongo-express.internal
- Name: network
  Kind: String
  Default: Public

# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
- Name: mongo-express
  Container:
    Image: mongo-express:0.54
    Env:
    - ME_CONFIG_MONGODB_ADMINUSERNAME=root
    - ME_CONFIG_MONGODB_ADMINPASSWORD=root
    - ME_CONFIG_MONGODB_SERVER=mongodb.global.c
    - ME_CONFIG_MONGODB_PORT=27017
    - ME_CONFIG_MONGODB_URL=mongodb://root:root@mongodb.global.c:27017/

# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
- Name: mongo-express
  Kind: ProxyRule
  Version: v0.7
  Data:
    Rules:
    - Network: ${{ Args.network }}
      Domain: ${{ Args.domain }}
      Locations:
      - Path: /
        Target:
          Key: mongo-express.global.c
          Port: 8081
```

Copy past the previous content and save it under a file called `mongo-express.yml`.<br />
Then execute the following command to startup a [mongo express][mongo-express] server:

```sh
nanocl state apply -s mongo-express.yml
```

If you are using `Nanocl` on your local computer, edit your `/etc/hosts` to add this line:

```
127.0.0.1 mongo-express.internal
```

You should be able to see the following page:

<img src="/img/mongo-express.png" />

Optionally you can choose the domain name using this command:

```sh
nanocl state apply -s mongo-express.yml -- --domain my-domain.com
```

For production, we recommand you to deploy it inside a vpn follow our [vpn guide][vpn guide].<br />
And rerun the previos command with the network of your vpn, if you didn't took something fancy it should be:

```sh
nanocl state apply -s mongo-express.yml -- --network private.nsp
```

This way [mongo express][mongo express] will only be accessible over the vpn!

[mongo express]: https://github.com/mongo-express/mongo-express
[docker image]: https://hub.docker.com/_/mongo-express
[vpn guide]: /guides/nanocl/advanced-usage/vpn
