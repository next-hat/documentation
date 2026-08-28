---
title: Process operations - Nanocl
description: Identify and operate one concrete Cargo, Job, or VM process.
keywords: [documentation, nanocl, process, ps, exec, kill, logs, stats]
image: /img/logo.webp
sidebar_position: 8
sidebar_label: Process operations
---

# Process operations

Cargo names identify workloads; process names identify their concrete runtime
containers. A multi-container, replicated Cargo therefore has several process
names. List them before targeting one:

```sh
nanocl ps --namespace global --kind cargo
```

Application process names expose the namespace and Cargo key, replica ordinal,
and declared container name. Init, sandbox, and temporary rollout processes
are also distinguishable in `nanocl ps`. Treat the returned process name or
full Docker ID as authoritative instead of constructing a name in scripts.

Use that exact value with the process-scoped commands:

```sh
nanocl inspect PROCESS
nanocl logs -f PROCESS
nanocl stats PROCESS
nanocl exec PROCESS -- env
nanocl kill --signal SIGTERM PROCESS
```

`nanocl exec` targets one running process. `--interactive` keeps standard input
open, `--tty` allocates a pseudo-TTY, and `--detach` starts the command in the
background. It also accepts repeatable `--env`, repeatable `--env-file`,
`--user`, `--workdir`, `--privileged`, and `--detach-keys` options. In attached
mode, standard output and standard error remain separate when no TTY is used,
and the CLI exits with the executed command's status.

`nanocl kill` also targets one process. Its default signal is `SIGKILL`; pass
`--signal` when graceful termination is required. There is no 0.18 Cargo-wide
`cargo kill`, and the former `cargo exec` command has been removed.

