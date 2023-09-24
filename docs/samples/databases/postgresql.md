---
title: Postgresql | Nanocl
sidebar_label: Postgresql
image: /img/logo.webp
description: Easily deploy a Postgresql instance with Nanocl !
keywords: [documentation, samples, examples, Postgresql, nanocl, nanocl CLI, CLI]
pagination_next: samples/webapps/adminer
pagination_prev: null
---
# Postgresql

[PostgreSQL][postgresql] is a powerful, open source object-relational database system with over 35 years of active development.<br />
Below you can find a basic example to deploy a [postgresql][postgresql] server using their official [docker image][docker image]:

```yaml
Kind: Deployment
ApiVersion: v0.9
Namespace: global
Args:
  - Name: password
    Kind: String
  - Name: volume
    Kind: String
# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
  - Name: postgresql
    Container:
      Image: postgres:16.0
      Env:
        # More info on env variable can be found there https://hub.docker.com/_/postgres
        - POSTGRES_PASSWORD=${{ Args.password }}
      HostConfig:
        Binds:
          - ${{ Args.volume }}:/var/lib/postgresql/data
```

Copy past the previous content and save it under a file called `postgresql.yml`.<br />
Then execute the following command to startup a `postgresql` server:

```sh
nanocl state apply -s postgresql.yml -- --password my_root_password --volume /opt/postgresql
```

:::tip
Other cargo created in the same namespace **global** will be able to connect to the postgresql using is key **postgresql.global.c**
The key can be predicted and caculated, it's formated this way: **{cargo_name}.{namespace_name}.{c|v}** **c** for container or **v** for virtual machine.
This allow us to have the same name for virtual machine and containers.
:::

[postgresql]: https://www.postgresql.org/
[docker image]: https://hub.docker.com/_/postgres