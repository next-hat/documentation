---
title: Nanocl CLI References
description: To list available commands, either run nanocl with no parameters or execute nanocl help
keywords: [documentation, references, nanocl, nanocl CLI, CLI]
image: /img/logo.webp
sidebar_label: CLI
sidebar_position: 1
---

# Use the Nanocl command line

## Nanocl

```sh
nanocl [OPTIONS] <SUBCOMMAND>
```

To list available commands, either run `nanocl` with no parameters or execute `nanocl help` :

```console
$ nanocl
The Self-Sufficient Hybrid-Cloud Orchestrator CLI

Usage: nanocl [OPTIONS] <COMMAND>

Commands:
  namespace  Manage namespaces
  cargo      Manage cargoes
  vm         Manage virtual machines
  resource   Manage resources
  events     Watch daemon events
  state      Apply or Reverse a state from a configuration file
  info       Show nanocl host information
  version    Show nanocl version information
  setup      Setup nanocl daemon
  ps         Show all processes managed by nanocl
  help       Print this message or the help of the given subcommand(s)

Options:
  -H, --host <HOST>  Nanocld host [default: unix://run/nanocl/nanocl.sock]
  -h, --help         Print help
  -V, --version      Print version

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

## Examples

### Display help text

To list the help on any command just execute the command, followed by the `--help` option.

```console
$ nanocl cargo --help
Manage cargoes

Usage: nanocl cargo [OPTIONS] <COMMAND>

Commands:
  list     List existing cargo
  create   Create a new cargo
  start    Start a cargo by its name
  stop     Stop a cargo by its name
  remove   Remove cargo by its name
  inspect  Inspect a cargo by its name
  patch    Update a cargo by its name
  image    Manage cargo image
  exec     Execute a command inside a cargo
  history  List cargo history
  reset    Reset cargo to a specific history
  logs     Show logs
  run      Run a cargo
  help     Print this message or the help of the given subcommand(s)

Options:
  -n, --namespace <NAMESPACE>  namespace to target by default global is used
  -h, --help                   Print help
  -V, --version                Print version
```
