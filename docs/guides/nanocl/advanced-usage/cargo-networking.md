---
title: Cargo networking - Nanocl
description: Configure Cargo-owned Docker networks, ports, DNS, and the internal gateway.
keywords: [documentation, nanocl, cargo, docker, network, port bindings, internal gateway]
image: /img/logo.webp
sidebar_position: 6
sidebar_label: Cargo networking
---

# Cargo networking

Nanocl 0.18 keeps network configuration at the Cargo boundary. Set
`NetworkMode`, `PortBindings`, `Hostname`, and `Dns` beside `Containers`, not
inside an individual container.

```yaml
ApiVersion: v0.18
Cargoes:
- Name: api
  NetworkMode: private-api
  PortBindings:
    8080/tcp:
    - HostIp: 127.0.0.1
      HostPort: "8080"
  Dns:
  - $$INTERNAL_GATEWAY
  Containers:
  - Name: api
    Image: ghcr.io/example/api:1.0.0
```

`NetworkMode` accepts a non-empty Docker network name or the supported Docker
built-ins `default`, `bridge`, `host`, and `none`. Omitting it uses Nanocl's
default network. User-authored `container:...` values are rejected because
Nanocl owns the shared network namespace of a multi-container replica.

For a named local network such as `private-api`:

- Nanocl uses an existing Docker network as-is.
- If it does not exist, Nanocl creates an attachable local bridge network.
- Nanocl persists inspected network information so `ncproxy` and `ncdns` can
  resolve named network selectors.
- Removing a Cargo does not automatically remove the Docker network.

Networks are node-local Docker resources, not namespace-owned Nanocl objects.
Nanocl 0.18 does not expose a Statefile API for choosing a driver or subnet.

Cargo-level host port bindings are not supported with `NetworkMode: host` or
`NetworkMode: none`. Fixed host ports can also require the old generation to
stop before an update candidate starts, so they do not guarantee a seamless
handoff.

## Internal gateway

Nanocl expands `$$INTERNAL_GATEWAY` anywhere in the serialized container
configuration. For a named network it resolves to that network's gateway. For
Docker built-in modes, Nanocl falls back to the gateway of `nanoclbr0`.

