---
title: Nanocl CLI References
description: To list available commands, either run nanocl with no parameters or execute nanocl help
sidebar_label: CLI
---

# Use the Nanocl command line

## Nanocl

```sh
nanocl [OPTIONS] <SUBCOMMAND>
```

To list available commands, either run `nanocl` with no parameters or execute `nanocl help` :

```console
$ nanocl
nanocl 0.1.2
Self-Sufficient Hybrid-Cloud Orchestrator

USAGE:
    nanocl [OPTIONS] <SUBCOMMAND>

OPTIONS:
    -H, --host <HOST>    Nanocld host [default: unix://run/nanocl/nanocl.sock]
    -h, --help           Print help information
    -V, --version        Print version information

SUBCOMMANDS:
    namespace          Manage namespaces
    cluster            Manage clusters
    cargo              Manage cargoes
    apply              Apply a configuration file
    revert             Revert a configuration file
    git-repository     Manage git repositories
    nginx-template     Manage nginx templates
    container-image    Manage container images
    lsc                List container by namespace cluster or cargo
    run                Run a cargo in given environement
    exec               Execute command inside a container
    version            Show the Nanocl version information
    help               Print this message or the help of the given subcommand(s)
```

## Description

Depending on your Nanocl system configuration, you may be required to preface each `nanocl` command with `sudo`. <br />
To avoid having to use `sudo` with the `nanocl` command, your system administrator can create a Unix group called `nanocl` and add users to it.
For more information about installing Nanocl or `sudo` configuration, refer to the [installation](/docs/setups/nanocl/readme.md) instructions for your operating system.

## Options

| Name, shorthand      | Default | Description 
| -------------------- | ------- | ----------- 
| **-H**, **\--host**=*HOST* | unix://run/nanocl/nanocl.sock | Nanocld host
| **-h**, **\--help** | | Print help information
| **-V**, **\--version** | | Print version information

<!-- ## Subcommands

| Name      | Description 
| -------------------- | ----------- 
| [namespace](/docs/references/nanocl/daemon.md) | Manage namespaces 
| [cluster](/docs/references/nanocl/daemon.md) | Manage clusters 
| [cargo](/docs/references/nanocl/daemon.md) | Manage cargoes 
| [apply](/docs/references/nanocl/daemon.md) | Apply a configuration
| [revert](/docs/references/nanocl/daemon.md) | Revert a configuration
| [git-repository](/docs/references/nanocl/daemon.md) | Manage git repositories
| [nginx-template](/docs/references/nanocl/daemon.md) | Manage nginx templates
| [container-image](/docs/references/nanocl/daemon.md) | Manage container images
| [lsc](/docs/references/nanocl/daemon.md) | List container by namespace cluster or cargo
| [run](/docs/references/nanocl/daemon.md) | Run a cargo for given environement
| [exec](/docs/references/nanocl/daemon.md) | Execute command inside a container -->

## Examples

### Display help text

To list the help on any command just execute the command, followed by the `--help` option.

```console
$ nanocl run --help
nanocl-run
Run a cargo in given environement

USAGE:
    nanocl run [OPTIONS] --cluster <CLUSTER> --network <NETWORK> --image <IMAGE> <NAME>

ARGS:
    <NAME>

OPTIONS:
        --namespace <NAMESPACE>
        --cluster <CLUSTER>
        --network <NETWORK>
        --image <IMAGE>
    -h, --help                     Print help information
```
