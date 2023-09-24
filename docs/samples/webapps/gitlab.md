---
title: Gitlab | Nanocl
sidebar_label: Gitlab
image: /img/logo.webp
description: Easily deploy a Gitlab instance with Nanocl !
keywords: [documentation, samples, examples, Gitlab, nanocl, nanocl CLI, CLI]
sidebar_position: 3
pagination_next: null
pagination_prev: null
---
# Gitlab

[Gitlab][gitlab] is a Project Planning and Source Code Management to CI/CD.<br />
You can easily deploy [gitlab][gitlab] using their official [docker image][docker image]:

```yml
Kind: Deployment
ApiVersion: v0.9
Namespace: global
Args:
  - Name: domain
    Kind: String
    Default: gitlab.internal
  - Name: network
    Kind: String
    Default: Public
# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
  - Name: gitlab
    Kind: ProxyRule
    Version: v0.6
    Config:
      Watch:
        - gitlab.global.c
      Rules:
        - Network: ${{ Args.network }}
          Domain: ${{ Args.domain }}
          Locations:
            - Path: /
              Target:
                Key: gitlab.global.c
                Port: 80
# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
  - Name: gitlab
    Container:
      Image: gitlab/gitlab-ee:16.4.0-ee.0
      Env:
        - GITLAB_ROOT_PASSWORD=root
      HostConfig:
        ShmSize: 268435456
        Binds:
          - /opt/gitlab/config:/etc/gitlab
          - /opt/gitlab/logs:/var/log/gitlab
          - /opt/gitlab/data:/var/opt/gitlab
```

Copy past the previous content and save it under a file called `gitlab.yml`.<br />
Then execute the following command to startup a [gitlab][gitlab] server:

```sh
nanocl state apply -s gitlab.yml
```

If you are using `Nanocl` on your local computer, edit your `/etc/hosts` to add this line:

```
127.0.0.1 gitlab.internal
```

You should be able to see the following page:

<img src="/img/gitlab.png" />

Optionally you can choose the domain name using this command:

```sh
nanocl state apply -s gitlab.yml -- --domain my-domain.com
```

For production, we recommand you to deploy it inside a vpn follow our [vpn guide][vpn guide].<br />
And rerun the previos command with the network of your vpn, if you didn't took something fancy it should be:

```sh
nanocl state apply -s gitlab.yml -- --network private.nsp
```

This way [gitlab][gitlab] will only be accessible over the vpn!

[gitlab]: https://about.gitlab.com/
[docker image]: https://hub.docker.com/r/gitlab/gitlab-ee
[vpn guide]: /guides/nanocl/advanced-usage/vpn