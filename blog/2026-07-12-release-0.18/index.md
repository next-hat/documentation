---
slug: nanocl-0.18
title: Introducing Nanocl 0.18
description: Nanocl 0.18 introduces multi-container Cargoes, health-aware rollouts, process-scoped operations, and simpler proxy and DNS services.
image: /img/cloud.webp
authors: [leone]
tags: [nanocl, release, 0.18]
keywords: [containerization, Nanocl, multi-container, init container, replica, healthcheck, rolling update, networking, release, 0.18]
---

Nanocl 0.18 makes a Cargo a real multi-container workload. Named application
containers, ordered init containers, durable replicas, shared networking, and
health-aware updates now form one consistent runtime model. The release also
makes day-to-day operations process-scoped and simplifies the proxy and DNS
stack.

<!-- truncate -->

## A Cargo is now a multi-container workload

`Containers` replaces the old singular `Container` field. Every application
container has a name, and `InitContainers` run in declaration order before the
applications start. `Replicas` is now a simple integer, with the same declared
processes created for each replica.

Here is a small 0.18 Statefile for an API and worker that need a schema
migration first:

```yaml
ApiVersion: v0.18
Namespace: global

Cargoes:
- Name: storefront
  Replicas: 2
  NetworkMode: storefront-net
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
```

For each replica, `migrate` must exit successfully before `api` and `worker`
start. Because this Cargo has two application containers and does not use host
networking, Nanocl creates one internal sandbox for each replica. Both
applications join that sandbox's network namespace, share an IP address, and
can communicate over `localhost`.

Cargo-owned network, port, hostname, and DNS fields configure that shared
network boundary. Image, command, environment, health checks, mounts,
capabilities, and container-only secrets stay on each named container. A
single-container Cargo remains direct and does not pay for an extra sandbox.

Read the complete [multi-container Cargo guide](/guides/nanocl/advanced-usage/multi-container-cargoes).

## Readiness is part of the rollout

Starting a Docker container is no longer the whole readiness decision. An
essential application with a health check must become `healthy`; without one,
running is considered ready. A shared sandbox must also be running, while a
container marked `Essential: false` does not gate the Cargo.

During an update, Nanocl prepares replacement replicas serially and waits up
to five minutes for required processes to become ready. When network and host
port choices allow it, the retained generation keeps serving until the
candidate is ready. A candidate that fails before promotion is removed and the
retained generation is restored.

That behavior deliberately does not promise zero downtime. A fixed host port
may require the old process to be removed before the candidate can bind, and
host networking requires the old generation to stop first. Define a Docker
health check when application-level readiness matters.

See [Health checks and rolling updates](/guides/nanocl/advanced-usage/health-checks)
for the full readiness and rollback boundaries.

## Operate the process you mean

A replicated multi-container Cargo has several runtime processes, so `exec`
and `kill` now select one concrete process instead of resolving through a
Cargo. Use `nanocl ps` to find the authoritative process name or full Docker
ID, then target it directly:

```sh
nanocl ps --namespace global --kind cargo
nanocl exec PROCESS -- sh
nanocl kill --signal SIGTERM PROCESS
```

`nanocl exec` supports interactive input, TTY allocation, detach mode,
environment files and values, user, working directory, and privileged mode.
In attached non-TTY mode, stdout and stderr remain separate and the executed
command's exit status becomes the CLI exit status. `inspect`, `logs`, and
`stats` also accept process identities where appropriate.

The old Cargo-scoped exec and group-kill operations have been removed. See the
[process operations guide](/guides/nanocl/advanced-usage/process-operations).

## Deliberately small networking

Named local Docker networks can now be selected at the Cargo level. Nanocl
uses an existing network as-is or creates a missing attachable bridge network,
then persists its inspected details for proxy and DNS selectors. It does not
introduce a network-driver, subnet, mesh, or automatic cleanup API, and Docker
networks are not owned by Nanocl namespaces.

The Docker built-ins `default`, `bridge`, `host`, and `none` remain available;
user-authored `container:...` network modes are reserved. The
`$$INTERNAL_GATEWAY` placeholder resolves to a selected custom network's
gateway, or to the `nanoclbr0` gateway for built-in modes.

More detail is available in [Cargo networking](/guides/nanocl/advanced-usage/cargo-networking).

## Fewer moving parts in the runtime

`ncproxy` now embeds its Nginx data plane, and `ncdns` embeds dnsmasq. There is
no separately operated `nproxy` or `ndns` service to coordinate with
`docker exec`. Both controllers reconcile committed rules after startup and
event-stream reconnects. Proxy changes are validated and reloaded
transactionally, while DNS rules are kept as independent fragments so one
resource change does not erase another.

The rest of the default single-node architecture remains familiar:
`nanocld` manages workloads and the API, `nstore` persists control-plane state,
`nmetrics` collects host metrics, and `ncvpnkit` integrates Docker Desktop
networking. Nanocl 0.18 does not claim automatic multi-node scheduling,
autoscaling, cluster-wide high availability, or a service mesh.

## Runtime reliability

Reliability work includes Docker daemon health monitoring, durable
Cargo replica records, startup reconciliation, transactional proxy and DNS
updates, and removal of unhealthy or addressless proxy routes.

## Component releases

- **nanocl 0.18.0** — the new Statefile and CLI model, process-scoped `exec`
  and `kill`, canonical resource keys, full-path VM images, and re-applicable
  backups without daemon-injected secret binds.
- **nanocld 0.18.0** — multi-container compilation and lifecycle, durable
  replicas, readiness-aware updates, named network discovery, VM init
  containers, and PEM-backed database TLS values.
- **ncproxy 0.15.0** — embedded Nginx, named-network target resolution,
  readiness-aware route handoff, startup reconciliation, and transactional
  reloads.
- **ncdns 0.10.0** — embedded dnsmasq, named-network selectors, independent
  rule fragments, validation, rollback, and restart reconciliation.
- **ncvpnkit 0.8.0** — compatibility with the Nanocl 0.18 client and controller
  APIs.

The former standalone `nproxy` (`1.28.0-n0.15.0`) and `ndns`
(`2.91.0-n0.10.0`) release tracks are superseded by the data planes embedded in
`ncproxy` and `ncdns`.

VMs also gain an optional `InitContainer` for preparing a full local image
path before QEMU starts, replacing the removed `nanocl vm image` workflow. TLS
secret inputs are persisted as PEM contents rather than node-local paths;
legacy readable paths in the database certificate secret are converted on the
first upgraded daemon startup.

## Breaking changes and migration

Nanocl is pre-v1, and 0.17 to 0.18 is a breaking upgrade that may require
downtime. Before replacing an installation, run:

```sh
nanocl backup -o ./nanocl-0.17-backup
```

The export contains per-namespace Statefiles plus jobs, secrets, and resources.
Those files still describe the 0.17 schema. Review and rewrite them before
reapplying:

- `Container` becomes named `Containers`; add ordered `InitContainers` when
  needed.
- The old replication object becomes integer `Replicas`.
- Network, host ports, hostname, and DNS move to the Cargo.
- Canonical keys and proxy targets use `{namespace}.{name}` order.
- VM `Disk.Image` and daemon-managed VM images become a full local `Image`
  path, optionally prepared by `InitContainer`.
- `cargo exec`, Cargo-wide kill, and `vm image` commands are removed.

Keep the legacy database certificate files readable for the first 0.18 daemon
startup so their contents can be migrated. Do not treat a 0.17 backup as an
automatically compatible or zero-downtime restore artifact.

Follow the [0.17 to 0.18 migration guide](/manuals/nanocl/upgrade) before
upgrading.

## What comes next

0.18 establishes the workload, readiness, and process identity foundations
needed for future work. For now, the supported operational story remains
focused on making a single Nanocl node predictable, observable, and easier to
recover. We will share later capabilities when they are implemented and ready
to document.
