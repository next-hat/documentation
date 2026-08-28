---
title: CLI References - Nanocl
description: Use the Nanocl 0.18 command line to manage workloads and concrete runtime processes.
keywords: [documentation, references, nanocl, nanocl CLI, CLI]
image: /img/logo.webp
sidebar_label: Overview
sidebar_position: 0
---

# Use the Nanocl command line

```sh
nanocl [OPTIONS] <COMMAND>
```

Run `nanocl --help` for the current command list or append `--help` to a
subcommand. Nanocl 0.18 exposes these top-level command groups and operations:

| Command | Purpose |
| --- | --- |
| `namespace`, `secret`, `job`, `cargo`, `vm`, `resource` | Manage Nanocl objects |
| `metric`, `context`, `node`, `event`, `state` | Manage supporting APIs and Statefiles |
| `ps` | List concrete runtime processes |
| `inspect`, `logs`, `stats` | Inspect one or more processes as supported by each command |
| `exec`, `kill` | Execute in or signal one exact process name/full Docker ID |
| `info`, `version` | Show host and version information |
| `install`, `uninstall`, `backup` | Manage the local installation and export desired state |

The global `--host` option selects a `nanocld` endpoint and defaults to
`unix://run/nanocl/nanocl.sock`.

## Workload keys and process names

Cargo and VM commands use canonical `{namespace}.{name}` keys, for example:

```sh
nanocl cargo inspect global.storefront
nanocl vm inspect global.build-runner
```

Process-scoped commands do not accept a Cargo name and replica selector. Find
the concrete process first, then use the exact returned name or full Docker ID:

```sh
nanocl ps --namespace global --kind cargo
nanocl exec PROCESS -- sh
nanocl kill --signal SIGTERM PROCESS
```

See [Process operations](/guides/nanocl/advanced-usage/process-operations) for
the multi-container workflow.

## Help

```console
$ nanocl cargo --help
Manage cargoes

Usage: nanocl cargo [OPTIONS] <COMMAND>

Commands:
  list     List existing cargo
  create   Create a new cargo
  start    Start cargoes by canonical keys
  stop     Stop cargoes by canonical keys
  restart  Restart cargoes by canonical keys
  remove   Remove cargoes by canonical keys
  inspect  Inspect a cargo by its canonical key
  patch    Update a cargo by its canonical key
  history  List cargo history
  revert   Revert cargo to a specific history
  logs     Show logs
  run      Run a cargo
  stats    Show stats of cargo
  help     Print this message or the help of the given subcommand(s)
```

Depending on the local Unix socket permissions, you may need to run Nanocl as
a user in the `nanocl` group. See the [installation instructions](/manuals/nanocl/install/overview).
