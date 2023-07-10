---
description: Nanocl DAEMON References, to list available options, run nanocld --help
keywords: "documentation, references, nanocl, nanocld, nanocl DAEMON, DAEMON"
image: /img/logo.webp
sidebar_label: Overview
---

# Nanocl DAEMON

## Nanocld

```sh
nanocld [OPTIONS]
```

To list available options, run `nanocld --help` :

```console
$ nanocld --help
Nanocl Daemon - Self Sufficient Hybrid Cloud Orchestrator

Usage: nanocld [OPTIONS]

Options:
      --init
          Ensure state is inited
  -H, --hosts <HOSTS>
          Hosts to listen to use tcp:// and unix:// [default: unix:///run/nanocl.sock]
      --docker-host <DOCKER_HOST>
          Docker daemon socket to connect [default: unix:///var/run/docker.sock]
      --state-dir <STATE_DIR>
          State directory [default: /var/lib/nanocl]
      --conf-dir <CONF_DIR>
          Config directory [default: /etc/nanocl]
      --gateway <GATEWAY>
          Gateway automatically detected to host default source ip gateway if not set
      --hostname <HOSTNAME>
          Hostname to use for the node automatically detected if not set
      --node <NODES>
          Join current node to a cluster
      --advertise-addr <ADVERTISE_ADDR>
          Address to advertise to other nodes
      --gid <GID>
          Group id [default: 0]
  -h, --help
          Print help
  -V, --version
          Print version

```

## Options

| Name, shorthand      | Default | Description 
| -------------------- | ------- | -----------
| **-H**, **\--host**=*HOSTS* | unix:///run/nanocl/nanocl.sock | Daemon host to listen to you can use tcp:// and unix://
| **\--docker-host**=*DOCKER\_HOST* | unix:///run/nanocl/docker.sock | Docker daemon socket to connect
| **\--state-dir**=*STATE\_DIR* | /var/lib/nanocl | State directory
| **\--config-dir**=*CONFIG\_DIR* | /etc/nanocl | Config directory
| **-h**, **\--help** | | Print help information
| **-V**, **\--version** | | Print version information
