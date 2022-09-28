---
sidebar_label: Daemon
description: To list available options, run nanocld --help
---

# Nanocl DAEMON

## Nanocld

```sh
nanocld [OPTIONS]
```

To list available options, run `nanocld --help` :

```console
nanocld 0.1.2
Nanocl DAEMON Self Sufficient Hybrid Cloud Orchestrator

USAGE:
    nanocld [OPTIONS]

OPTIONS:
    --install-components            Only install required components

    -H, --host <HOSTS>              Daemon host to listen to you can use tcp:// and unix:// 
                                    [default: unix:///run/nanocl/nanocl.sock]

    --docker-host <DOCKER_HOST>     Docker daemon socket to connect
                                    [default: unix:///run/nanocl/docker.sock]

    --state-dir <STATE_DIR>         State directory
                                    [default: /var/lib/nanocl]

    --config-dir <CONFIG_DIR>       Config directory 
                                    [default: /etc/nanocl]

    --github-user <GITHUB_USER>     Github user used to make request with identity

    --github-token <GITHUB_TOKEN>   Generated token for given github user

    -h, --help                      Print help information

    -V, --version                   Print version information
```

## Options

| Name, shorthand      | Default | Description 
| -------------------- | ------- | -----------
| **-H**, **\--host**=*HOSTS* | unix:///run/nanocl/nanocl.sock | Daemon host to listen to you can use tcp:// and unix://
| **\--docker-host**=*DOCKER\_HOST* | unix:///run/nanocl/docker.sock | Docker daemon socket to connect
| **\--state-dir**=*STATE\_DIR* | /var/lib/nanocl | State directory
| **\--config-dir**=*CONFIG\_DIR* | /etc/nanocl | Config directory
| **\--github-user**=*GITHUB\_USER* |  Github user used to make request with identity
| **\--github-token**=*GITHUB\_TOKEN* | Generated token for given github user
| **\--install-components** |  | Only install required components
| **-h**, **\--help** | | Print help information
| **-V**, **\--version** | | Print version information


## Config Directory

Nanocld use a config file inside a config directory by default located at `/etc/nanocl`. <br />
It will look for a file called `nanocl.conf` and have a `yml` format.

For example :

```yaml
docker_host: /run/docker.sock
github_user: my_user
github_token: my_token
host: /run/nanocl.sock
state_dir: /var/lib/nanocl
```
