---
title: MariaDB | Nanocl
sidebar_label: MariaDB
image: /img/logo.webp
description: Easily deploy a MariaDB instance with Nanocl !
keywords: [documentation, samples, examples, MariaDB, nanocl, nanocl CLI, CLI]
pagination_next: samples/webapps/adminer
pagination_prev: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Mariadb

[MariaDB][mariadb] is one of the most popular open source relational databases.<br/>
It's made by the original developers of MySQL and guaranteed to stay open source.<br />
Below you can find a basic example to deploy a [mariadb][mariadb] server using their official [docker image][docker image]:

<StatefileBlock example="samples/databases/mariadb" />

Copy past the previous content and save it under a file called `mariadb.yml`.<br />
Then execute the following command to startup a [mariadb][mariadb] server:

```sh
nanocl state apply -s mariadb.yml -- --password my_root_password --volume /opt/mariadb
```

:::tip
Other cargo created in the same namespace **global** will be able to connect to the mariadb using is key **mariadb.global.c**
The key can be predicted and caculated, it's formated this way: **cargo_name.namespace_name.c|v** **c** for container and **v** for virtual machine.
This allow us to have the same name for virtual machine and containers.
:::

[mariadb]: https://mariadb.org
[docker image]: https://hub.docker.com/_/mariadb
