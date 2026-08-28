---
title: DAEMON References - Nanocl
description: Nanocl daemon options and operational scope.
keywords: [documentation, references, nanocl, nanocld, daemon]
image: /img/logo.webp
sidebar_label: Overview
---

# Nanocl daemon

`nanocld` manages the local Docker node, persists desired and observed state,
and exposes the Nanocl API. Node join options remain experimental in 0.18; do
not treat them as an automatic multi-node scheduling or high-availability
setup.

```sh
nanocld [OPTIONS]
```

| Option | Purpose |
| --- | --- |
| `-H, --hosts HOSTS` | API listeners; the installed default uses `unix:///run/nanocl.sock` |
| `--docker-host DOCKER_HOST` | Docker daemon endpoint; installed default `unix:///var/run/docker.sock` |
| `--store-addr STORE_ADDR` | CockroachDB connection address |
| `--state-dir STATE_DIR` | Runtime state directory; installed default `/var/lib/nanocl` |
| `--conf-dir CONF_DIR` | Configuration directory; default `/etc/nanocl` |
| `--gateway GATEWAY` | Host gateway; detected when omitted |
| `--hostname HOSTNAME` | Node name; detected when omitted |
| `--node NODES` | Experimental node endpoints to join |
| `--advertise-addr ADDRESS` | Address advertised to other nodes |
| `--gid GID` | Group ID for the Unix socket; default `0` |
| `--cert`, `--cert-key`, `--cert-ca` | Optional API TLS material |
| `--verify`, `--password` | Optional API TLS verification and password settings |

Run `nanocld --help` for the exact syntax of the installed build. The latest
0.18 API is available from the sidebar or at the
[versioned OpenAPI page](/references/nanocl/daemon/v0.18).
