# Mariadb

Basic sample to deploy a mariadb server publicly available:

```yaml
Kind: Deployment
ApiVersion: v0.9
Namespace: global
# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
  - Name: mariadb
    Kind: ProxyRule
    Version: v0.6
    Config:
      Watch:
        - mariadb.global.c
      Rules:
        - Domain: mariadb.com
          Network: Public
          Protocol: Tcp
          Port: 3306
          Target:
            Key: mariadb.global.c
            Port: 3306
# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
  - Name: mariadb
    Container:
      Image: mariadb:11.1.2
      Env:
        - MARIADB_ROOT_PASSWORD=example
```

If you want to make it private on only accessible to other cargoes.
Just remove the resource `ProxyRule`.
