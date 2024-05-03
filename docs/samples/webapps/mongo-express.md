---
title: Mongo Express - Nanocl
sidebar_label: Mongo Express
image: /img/logo.webp
description: Easily deploy a Mongo Express instance with Nanocl !
keywords: [documentation, samples, examples, Mongo Express, nanocl, nanocl CLI, CLI]
sidebar_position: 2
pagination_next: null
pagination_prev: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Mongo Express

[Mongo Express][mongo express] is a Web-based MongoDB admin interface, written with Node.js and express!<br />
You can easily deploy [mongo express][mongo express] using their official [docker image][docker image]:

<StatefileBlock example="samples/webapps/mongo-express" />

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
