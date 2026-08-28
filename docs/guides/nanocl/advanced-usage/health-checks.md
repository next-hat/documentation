---
title: Health checks and rolling updates - Nanocl
description: Configure container health checks and safe rolling cargo updates in Nanocl.
keywords: [documentation, nanocl, healthcheck, health check, rolling update, cargo, statefile]
image: /img/logo.webp
sidebar_position: 7
sidebar_label: Health checks
---

# Health checks and rolling updates

Nanocl uses Docker container health checks to decide when the essential
application containers in a Cargo replica are ready. Define a health check on
a named application container, or use one already included in its image.

```yaml
ApiVersion: v0.18
Cargoes:
- Name: api
  Containers:
  - Name: api
    Image: ghcr.io/example/api:1.2.0
    Healthcheck:
      Test: ["CMD-SHELL", "curl -fsS http://127.0.0.1:8080/health || exit 1"]
      Interval: 5000000000
      Timeout: 3000000000
      Retries: 3
      StartPeriod: 10000000000
```

The duration fields use Docker's nanosecond representation. An image-defined
health check does not need to be repeated. Docker's `NONE` health check
disables an inherited check.

Container start and Cargo readiness are different states. An essential
application without an enabled health check is ready when Docker reports it as
running. An essential application with a health check must report `healthy`.
For a shared multi-container replica, its sandbox must also be running.
Non-essential application containers do not gate readiness.

## Rolling updates

Nanocl prepares replacement replicas serially and waits up to five minutes for
each candidate's required topology to become ready. When networking and host
ports allow it, the retained generation stays running and continues serving
until the candidate is ready. `ncproxy` hands routes over only after the
committed replacement is ready.

If a candidate fails before promotion, Nanocl removes it and restores the
retained generation. A failed committed update also attempts to restore the
previous mappings and processes, and records an unhealthy/failed Cargo state.

This is not an unconditional zero-downtime guarantee. Fixed host port bindings
require the retained generation to be deleted before the candidate binds the
same ports. Host networking requires the retained generation to stop first,
although Nanocl can restart it if the candidate fails. A process that has no
health check is considered ready once running, so application-level readiness
requires a Docker health check.

The same readiness rules apply when restarting a Cargo. Restart preserves a
replica's sandbox and completed init containers, restarts its application
containers, and waits for its essential applications to become ready.
