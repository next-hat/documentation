---
title: Mysql | Nanocl
sidebar_label: Mysql
image: /img/logo.webp
description: Easily deploy a Mysql instance with Nanocl !
keywords: [documentation, samples, examples, Mysql, nanocl, nanocl CLI, CLI]
pagination_next: samples/webapps/adminer
pagination_prev: null
---

import StatefileBlock from '@site/src/components/statefile_block';

# Mysql

[MySQL][mysql] is a relational database management system (RDBMS) developed by Oracle that is based on structured query language (SQL).<br />
Below you can find a basic example to deploy a [mysql][mysql] server using their official [docker image][docker image]:

<StatefileBlock example="samples/databases/mysql" />

Copy past the previous content and save it under a file called `mysql.yml`.<br />
Then execute the following command to startup a [mysql][mysql] server:

```sh
nanocl state apply -s mysql.yml -- --password my_root_password --volume /opt/mysql
```

:::tip
Other cargo created in the same namespace **global** will be able to connect to the mysql using is key **mysql.global.c**
The key can be predicted and caculated, it's formated this way: **cargo_name.namespace_name.c|v** **c** for container or **v** for virtual machine.
This allow us to have the same name for virtual machine and containers.
:::

[mysql]: https://www.mysql.com/
[docker image]: https://hub.docker.com/_/mysql
