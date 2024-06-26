---
title: Redis - Nanocl
sidebar_label: Redis
image: /img/logo.webp
description: Easily deploy a Redis instance with Nanocl !
keywords: [documentation, samples, examples, Redis, nanocl, nanocl CLI, CLI]
pagination_next: null
pagination_prev: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Redis

[Redis][redis] is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.<br />
Below you can find a basic example to deploy a [redis][redis] server using their official [docker image][docker image]:

<StatefileBlock example="samples/databases/redis" />

Copy past the previous content and save it under a file called `redis.yml`.<br />
Then execute the following command to startup a `redis` server:

```sh
nanocl state apply -s redis.yml -- --volume /opt/redis
```

:::tip
Other cargo created in the same namespace **global** will be able to connect to the redis using is key **redis.global.c**
The key can be predicted and caculated, it's formated this way: **cargo_name.namespace_name.c|v** **c** for container or **v** for virtual machine.
This allow us to have the same name for virtual machine and containers.
:::

[redis]: https://redis.com
[docker image]: https://hub.docker.com/_/redis
