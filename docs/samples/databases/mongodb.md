---
title: MongoDB - Nanocl
sidebar_label: MongoDB
image: /img/logo.webp
description: Easily deploy a MongoDB instance with Nanocl !
keywords: [documentation, samples, examples, MongoDB, nanocl, nanocl CLI, CLI]
pagination_next: samples/webapps/mongo-express
pagination_prev: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Mongodb

[MongoDB][mongodb] is a popular document database.<br />
Below you can find a basic example to deploy a [mongodb][mongodb] server using their official [docker image][docker image]:

<StatefileBlock example="samples/databases/mongodb" />

Copy past the previous content and save it under a file called `mongodb.yml`.<br />
Then execute the following command to startup a [mongodb](mongodb) server:

```sh
nanocl state apply -s mongodb.yml -- --password my_root_password --volume /opt/mongodb
```

:::tip
Other cargo created in the same namespace **global** will be able to connect to the mongodb using is key **mongodb.global.c**
The key can be predicted and caculated, it's formated this way: **cargo_name.namespace_name.c|v** **c** stand for container and **v** for virtual machine.
This allow us to have the same name for virtual machine and containers.
:::

[mongodb]: https://www.mongodb.com
[docker image]: https://hub.docker.com/_/mongo