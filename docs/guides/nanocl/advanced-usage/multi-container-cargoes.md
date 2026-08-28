---
title: Multi-container Cargoes - Nanocl
description: Run named application and init containers as one replicated Cargo workload.
keywords: [documentation, nanocl, cargo, containers, init containers, replicas, sandbox]
image: /img/logo.webp
sidebar_position: 5
sidebar_label: Multi-container Cargoes
---

# Multi-container Cargoes

A Cargo describes one workload. In Nanocl 0.18, each Cargo declares one or
more named application `Containers`, optional ordered `InitContainers`, and a
durable `Replicas` count.

```yaml
ApiVersion: v0.18
Namespace: global

Cargoes:
- Name: storefront
  Replicas: 2
  NetworkMode: storefront-net
  Secrets:
  - shared-env
  InitContainers:
  - Name: migrate
    Image: ghcr.io/example/storefront-migrate:1.0.0
  Containers:
  - Name: api
    Image: ghcr.io/example/storefront-api:1.0.0
    Healthcheck:
      Test: ["CMD-SHELL", "wget -qO- http://127.0.0.1:8080/health || exit 1"]
      Interval: 5000000000
      Timeout: 3000000000
      Retries: 3
  - Name: worker
    Image: ghcr.io/example/storefront-worker:1.0.0
    Essential: false
    Secrets:
    - worker-env
```

Container names must be unique across both lists. `_sandbox` is reserved by
Nanocl. A Cargo must have at least one application container and at least one
essential application container. Application containers are essential unless
`Essential: false` is set; init containers are always essential.

## Replicas and the sandbox

Each replica has its own application processes and its own init-container
executions. With two or more application containers on a non-host network,
Nanocl also creates one internal sandbox process for that replica. The
application containers join that sandbox's network namespace, so they share an
IP address and can reach each other over `localhost`.

A single-application Cargo runs that application directly, even when it has
init containers. A Cargo using `NetworkMode: host` also runs its applications
directly. The sandbox is a runtime implementation detail; do not declare it in
the Statefile or target it as an application container.

Init containers run sequentially in declaration order for each replica. Nanocl
starts the application containers only after every init container exits with
status `0`. A non-zero exit stops that replica from progressing to its
applications.

## Shared and per-container settings

Cargo-level `NetworkMode`, `PortBindings`, `Hostname`, and `Dns` configure the
replica's network owner. Cargo-level `Secrets` are inherited by all init and
application containers. `Placement` and `ResourceRequirement` also belong to
the Cargo.

Each named container keeps its own Docker configuration, including image,
command, environment, health check, capabilities, devices, binds, mounts, and
container-only secrets. Filesystems, IPC, PID, UTS, user, and cgroup namespaces
are not implicitly shared between containers. To share persistent data,
configure the same Docker volume or bind mount on the containers that need it.

Nanocl reserves network ownership and lifecycle fields. Per-container
`HostConfig.PortBindings`, `PublishAllPorts`, `AutoRemove`,
`NetworkingConfig`, and `NetworkDisabled` are rejected. A container's
`HostConfig.NetworkMode` may be omitted or set to `host` or `none`; raw
`container:...` references in network, IPC, PID, UTS, user, or cgroup settings
are rejected.

## Runtime identity and failures

The Cargo key remains `namespace.name`, while every runtime process has a
concrete name that includes the replica ordinal and logical container name.
Use `nanocl ps` to get the actual name or full Docker ID before using
process-scoped commands. See [Process operations](./process-operations.md).

Application processes use Docker's `always` restart policy by default. If an
essential application or required sandbox is not ready, Nanocl reports the
Cargo as unhealthy. A non-essential application is still managed, but its
health does not gate Cargo readiness.
