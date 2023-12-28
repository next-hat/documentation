---
title: Post install | Nanocl
description: This section contains required procedures for configuring Nanocl after installation.
keywords: [documentation, nanocl , setup, installation, post installation]
image: /img/logo.webp
sidebar_position: 4
sidebar_label: Post Installation
pagination_next: guides/nanocl/get-started/orientation-and-setup
---

# Nanocl post installation instruction

This section contains the required procedures for configuring Nanocl after installation.

## Create a Unix group for Nanocl

The Nanocl daemon binds to a Unix socket instead of a TCP port. <br />
By default that Unix socket is owned by the user `root` and group `nanocl` and other users can only access it using sudo or by being in `nanocl` group. <br />

If you don't want to preface the nanocl command with sudo, create a Unix group
called nanocl and add users to it. When the Nanocl daemon starts, it creates a
Unix socket accessible by members of the `nanocl` group.
```sh
sudo groupadd nanocl
sudo usermod -aG nanocl $USER
newgrp nanocl
```

## Install Nanocl Components

You installed the CLI now we need to spin up Nanocl components.
It's use a default installation template that you can find [here][nanocl_installer]
Nanocl have a strong docker support so it will detect automatically if you are running docker or docker desktop and detect the unix socket to use.
But for some reason if you want to use a custom unix socket you can pass the `--docker-host` argument to the install command as follow

```sh
nanocl install --docker-host unix:///var/run/docker.sock
```

If you are using podman you need to specify the `--docker-host` argument as follow

```sh
nanocl install --docker-host unix:///var/run/podman/podman.sock
```

You can also choose the group assiociated to the unix socket by passing the `--group` argument to the install command as follow

```sh
nanocl install --group my-custom-group
```

## Test if everything is good
```sh
nanocl version
nanocl cargo run my-cargo nginx:latest
```

Congratz you are now ready to you use Nanocl !<br />

[nanocl_installer]: https://github.com/next-hat/nanocl/blob/nightly/installer.yml
