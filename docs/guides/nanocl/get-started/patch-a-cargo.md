---
title: Patch a cargo | Nanocl
description: Patch a cargo to update his image or his environnements variables and redeploy them instantly.
keywords: [documentation, guides. nanocl, get started, cargo, patch, update]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: 2. Patch a cargo
---

# Patch a cargo
> **Tags** <br />
> documentation, guides. nanocl, get started, cargo, patch, update

Patch a cargo to update his image or his environment variables and redeploy them instantly.

## Download get started image

First, let's download the official Nanocl get started image.
We will do it using this command:

```sh
nanocl cargo image pull ghcr.io/nxthat/nanocl-get-started:latest
```

## Update cargo image

So now let’s change our `Cargo` *my-cargo* with the image we previously downloaded:

```sh
nanocl cargo patch my-cargo --image ghcr.io/nxthat/nanocl-get-started:latest
```

You'll notice a few options being used. Here's some more info on them:

- `my-cargo` is the name of the cargo you want to update
- `--image` is the value we want to change and it's the cargo image
- `ghcr.io/nxthat/nanocl-get-started:latest` is the new image name

We can verify if our changes are made by inspecting our `cargo`:

```sh
nanocl cargo inspect my-cargo
```

This should output

```yml
NamespaceName: global
CreatedAt: 2023-12-08T11:49:52.949358
InstanceTotal: 1
InstanceRunning: 1
Spec:
  Key: e44fa9a4-1d8d-432f-93d1-08a4afe36761
  CargoKey: my-cargo.global
  Version: v0.12.0
  CreatedAt: 2023-12-08T11:54:13.593260
  Name: my-cargo
  Container:
    Env: []
    Cmd: []
    Image: ghcr.io/nxthat/nanocl-get-started:latest
    HostConfig:
      Binds: []
      AutoRemove: false
Instances:
- Key: 820cb664a2cd368a3414e95dfe45df8028c0f6dfdcc348a054c933d11ada2ede
  CreatedAt: 2023-12-08T11:54:13.836990
  UpdatedAt: 2023-12-08T11:54:14.131765
  Name: my-cargo-dBxXso.global.c
  Kind: cargo
  NodeKey: behuman
  KindKey: my-cargo.global
  Data:
    Id: 820cb664a2cd368a3414e95dfe45df8028c0f6dfdcc348a054c933d11ada2ede
    Created: 2023-12-08T11:54:13.76469817Z
    Path: /bin/nanocl-get-started
    Args: []
    State:
      Status: running
      Running: true
      Paused: false
      Restarting: false
      OOMKilled: false
      Dead: false
      Pid: 115451
      ExitCode: 0
      Error: ''
      StartedAt: 2023-12-08T11:54:14.122693214Z
      FinishedAt: 0001-01-01T00:00:00Z
    Image: sha256:cf2d078cb5d08f5594ca117dfaa9f283feb30c5e96f79b5a7ec56bd2d605e23f
    ResolvConfPath: /var/lib/docker/containers/820cb664a2cd368a3414e95dfe45df8028c0f6dfdcc348a054c933d11ada2ede/resolv.conf
    HostnamePath: /var/lib/docker/containers/820cb664a2cd368a3414e95dfe45df8028c0f6dfdcc348a054c933d11ada2ede/hostname
    HostsPath: /var/lib/docker/containers/820cb664a2cd368a3414e95dfe45df8028c0f6dfdcc348a054c933d11ada2ede/hosts
    LogPath: /var/lib/docker/containers/820cb664a2cd368a3414e95dfe45df8028c0f6dfdcc348a054c933d11ada2ede/820cb664a2cd368a3414e95dfe45df8028c0f6dfdcc348a054c933d11ada2ede-json.log
    Name: /my-cargo-dBxXso.global.c
    RestartCount: 0
    Driver: overlay2
    Platform: linux
    MountLabel: ''
    ProcessLabel: ''
    AppArmorProfile: docker-default
    HostConfig:
      CpuShares: 0
      Memory: 0
      CgroupParent: ''
      BlkioWeight: 0
      CpuPeriod: 0
      CpuQuota: 0
      CpuRealtimePeriod: 0
      CpuRealtimeRuntime: 0
      CpusetCpus: ''
      CpusetMems: ''
      MemoryReservation: 0
      MemorySwap: 0
      NanoCpus: 0
      CpuCount: 0
      CpuPercent: 0
      IOMaximumIOps: 0
      IOMaximumBandwidth: 0
      Binds: []
      ContainerIDFile: ''
      LogConfig:
        Type: json-file
        Config: {}
      NetworkMode: global
      RestartPolicy:
        Name: always
        MaximumRetryCount: 0
      AutoRemove: false
      VolumeDriver: ''
      ConsoleSize:
      - 0
      - 0
      CgroupnsMode: private
      IpcMode: private
      Cgroup: ''
      OomScoreAdj: 0
      PidMode: ''
      Privileged: false
      PublishAllPorts: false
      ReadonlyRootfs: false
      UTSMode: ''
      UsernsMode: ''
      ShmSize: 67108864
      Runtime: runc
      Isolation: ''
      MaskedPaths:
      - /proc/asound
      - /proc/acpi
      - /proc/kcore
      - /proc/keys
      - /proc/latency_stats
      - /proc/timer_list
      - /proc/timer_stats
      - /proc/sched_debug
      - /proc/scsi
      - /sys/firmware
      - /sys/devices/virtual/powercap
      ReadonlyPaths:
      - /proc/bus
      - /proc/fs
      - /proc/irq
      - /proc/sys
      - /proc/sysrq-trigger
    GraphDriver:
      Name: overlay2
      Data:
        UpperDir: /var/lib/docker/overlay2/c0cf50dc4339c0a84f5610fe88f9e5ee120984addf8246b510f5ff628c278d8b/diff
        WorkDir: /var/lib/docker/overlay2/c0cf50dc4339c0a84f5610fe88f9e5ee120984addf8246b510f5ff628c278d8b/work
        LowerDir: /var/lib/docker/overlay2/c0cf50dc4339c0a84f5610fe88f9e5ee120984addf8246b510f5ff628c278d8b-init/diff:/var/lib/docker/overlay2/3af6bd2aa522fcb2cb3436142fa605cba4d1f7b95815db8b7acee723545250e7/diff
        MergedDir: /var/lib/docker/overlay2/c0cf50dc4339c0a84f5610fe88f9e5ee120984addf8246b510f5ff628c278d8b/merged
    Mounts: []
    Config:
      Hostname: my-cargo-dBxXso.global.c
      Domainname: ''
      User: ''
      AttachStdin: false
      AttachStdout: true
      AttachStderr: true
      ExposedPorts:
        9000/tcp: {}
      Tty: true
      OpenStdin: false
      StdinOnce: false
      Env:
      - NANOCL_NODE=behuman
      - NANOCL_NODE_ADDR=192.168.8.102
      - NANOCL_CARGO_KEY=my-cargo.global
      - NANOCL_CARGO_NAMESPACE=global
      - NANOCL_CARGO_INSTANCE=0
      - PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
      Image: ghcr.io/nxthat/nanocl-get-started:latest
      WorkingDir: /
      Entrypoint:
      - /bin/nanocl-get-started
      Labels:
        io.nanocl.kind: cargo
        io.nanocl.n: global
        org.opencontainers.image.source: https://github.com/nxthat/nanocl-get-started
        com.docker.compose.project: nanocl_global
        org.opencontainers.image.description: Nanocl get started image
        io.nanocl.c: my-cargo.global
        io.nanocl: enabled
    NetworkSettings:
      Bridge: ''
      SandboxID: a91aa0e7ddfedb41fdf4b84e20b590ec85f9d4403bb598e801f82b16162565f7
      HairpinMode: false
      LinkLocalIPv6Address: ''
      LinkLocalIPv6PrefixLen: 0
      Ports:
        9000/tcp: null
      SandboxKey: /var/run/docker/netns/a91aa0e7ddfe
      EndpointID: ''
      Gateway: ''
      GlobalIPv6Address: ''
      GlobalIPv6PrefixLen: 0
      IPAddress: ''
      IPPrefixLen: 0
      IPv6Gateway: ''
      MacAddress: ''
      Networks:
        global:
          Aliases:
          - 820cb664a2cd
          - my-cargo-dBxXso.global.c
          NetworkID: 8522aae81bd1dabc639194a2cbb5230802f1805dc5e780b624080335adc1421b
          EndpointID: f18e99756bac42c64d29fb70fc9f7ffc43f0061d46a479b3f1e34735a7929256
          Gateway: 10.2.0.1
          IPAddress: 10.2.0.3
          IPPrefixLen: 16
          IPv6Gateway: ''
          GlobalIPv6Address: ''
          GlobalIPv6PrefixLen: 0
          MacAddress: 02:42:0a:02:00:03
```

The default port of our *get-started* is **9000** so we can test if access to it.

:::info
When you patch a cargo a related container will have an IP change.<br/>
because it starts a new container before deleting the older one.
:::

```sh
curl 10.2.0.3:9000
```

You should have something like this as output:

```json
{
  "headers": {
    "accept": "*/*",
    "host": "10.2.0.3:9000",
    "user-agent": "curl/8.2.1"
  },
  "envs": {
    "HOME": "/",
    "NANOCL_NODE_ADDR": "192.168.8.102",
    "NANOCL_CARGO_KEY": "my-cargo.global",
    "NANOCL_CARGO_NAMESPACE": "global",
    "NANOCL_CARGO_INSTANCE": "0",
    "TERM": "xterm",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "   ": "/bin/nanocl-get-started",
    "HOSTNAME": "my-cargo-dBxXso.global.c",
    "NANOCL_NODE": "behuman"
  }
}
```

Congrats you have updated your first `cargo` to a new image!

## Update cargo environnement

Now that we have updated our `cargo` to a new image, that returns us the `environment variables`, <br />
we are going to update some `Environnement variables`

Let's update the port used by your `cargo` by updating the **PORT** `environment variable`:

```sh
nanocl cargo patch my-cargo --env PORT=9001
```

As said before this will update the IP address so we run:

```sh
nanocl cargo inspect my-cargo
```

To get his new IP:

```yml
NamespaceName: global
CreatedAt: 2023-12-08T11:49:52.949358
InstanceTotal: 1
InstanceRunning: 1
Spec:
  Key: 7f7422de-f04a-4ca7-9bb8-2deaa78d4cfa
  CargoKey: my-cargo.global
  Version: v0.12.0
  CreatedAt: 2023-12-08T11:55:39.698445
  Name: my-cargo
  Container:
    Env:
    - PORT=9001
    Cmd: []
    Image: ghcr.io/nxthat/nanocl-get-started:latest
    HostConfig:
      Binds: []
      AutoRemove: false
Instances:
- Key: d4585d0657bb16c46b560fb59085b7c059712c326aad02d672b5ec4eb14aff43
  CreatedAt: 2023-12-08T11:55:40.062077
  UpdatedAt: 2023-12-08T11:55:40.375615
  Name: my-cargo-46cAuD.global.c
  Kind: cargo
  NodeKey: behuman
  KindKey: my-cargo.global
  Data:
    Id: d4585d0657bb16c46b560fb59085b7c059712c326aad02d672b5ec4eb14aff43
    Created: 2023-12-08T11:55:39.899198836Z
    Path: /bin/nanocl-get-started
    Args: []
    State:
      Status: running
      Running: true
      Paused: false
      Restarting: false
      OOMKilled: false
      Dead: false
      Pid: 116394
      ExitCode: 0
      Error: ''
      StartedAt: 2023-12-08T11:55:40.3634695Z
      FinishedAt: 0001-01-01T00:00:00Z
    Image: sha256:cf2d078cb5d08f5594ca117dfaa9f283feb30c5e96f79b5a7ec56bd2d605e23f
    ResolvConfPath: /var/lib/docker/containers/d4585d0657bb16c46b560fb59085b7c059712c326aad02d672b5ec4eb14aff43/resolv.conf
    HostnamePath: /var/lib/docker/containers/d4585d0657bb16c46b560fb59085b7c059712c326aad02d672b5ec4eb14aff43/hostname
    HostsPath: /var/lib/docker/containers/d4585d0657bb16c46b560fb59085b7c059712c326aad02d672b5ec4eb14aff43/hosts
    LogPath: /var/lib/docker/containers/d4585d0657bb16c46b560fb59085b7c059712c326aad02d672b5ec4eb14aff43/d4585d0657bb16c46b560fb59085b7c059712c326aad02d672b5ec4eb14aff43-json.log
    Name: /my-cargo-46cAuD.global.c
    RestartCount: 0
    Driver: overlay2
    Platform: linux
    MountLabel: ''
    ProcessLabel: ''
    AppArmorProfile: docker-default
    HostConfig:
      CpuShares: 0
      Memory: 0
      CgroupParent: ''
      BlkioWeight: 0
      CpuPeriod: 0
      CpuQuota: 0
      CpuRealtimePeriod: 0
      CpuRealtimeRuntime: 0
      CpusetCpus: ''
      CpusetMems: ''
      MemoryReservation: 0
      MemorySwap: 0
      NanoCpus: 0
      CpuCount: 0
      CpuPercent: 0
      IOMaximumIOps: 0
      IOMaximumBandwidth: 0
      Binds: []
      ContainerIDFile: ''
      LogConfig:
        Type: json-file
        Config: {}
      NetworkMode: global
      RestartPolicy:
        Name: always
        MaximumRetryCount: 0
      AutoRemove: false
      VolumeDriver: ''
      ConsoleSize:
      - 0
      - 0
      CgroupnsMode: private
      IpcMode: private
      Cgroup: ''
      OomScoreAdj: 0
      PidMode: ''
      Privileged: false
      PublishAllPorts: false
      ReadonlyRootfs: false
      UTSMode: ''
      UsernsMode: ''
      ShmSize: 67108864
      Runtime: runc
      Isolation: ''
      MaskedPaths:
      - /proc/asound
      - /proc/acpi
      - /proc/kcore
      - /proc/keys
      - /proc/latency_stats
      - /proc/timer_list
      - /proc/timer_stats
      - /proc/sched_debug
      - /proc/scsi
      - /sys/firmware
      - /sys/devices/virtual/powercap
      ReadonlyPaths:
      - /proc/bus
      - /proc/fs
      - /proc/irq
      - /proc/sys
      - /proc/sysrq-trigger
    GraphDriver:
      Name: overlay2
      Data:
        LowerDir: /var/lib/docker/overlay2/f849f5d07aa520230cb77781620a73ae5f29f94a6b3be5291b2184c6094c3d1f-init/diff:/var/lib/docker/overlay2/3af6bd2aa522fcb2cb3436142fa605cba4d1f7b95815db8b7acee723545250e7/diff
        WorkDir: /var/lib/docker/overlay2/f849f5d07aa520230cb77781620a73ae5f29f94a6b3be5291b2184c6094c3d1f/work
        UpperDir: /var/lib/docker/overlay2/f849f5d07aa520230cb77781620a73ae5f29f94a6b3be5291b2184c6094c3d1f/diff
        MergedDir: /var/lib/docker/overlay2/f849f5d07aa520230cb77781620a73ae5f29f94a6b3be5291b2184c6094c3d1f/merged
    Mounts: []
    Config:
      Hostname: my-cargo-46cAuD.global.c
      Domainname: ''
      User: ''
      AttachStdin: false
      AttachStdout: true
      AttachStderr: true
      ExposedPorts:
        9000/tcp: {}
      Tty: true
      OpenStdin: false
      StdinOnce: false
      Env:
      - PORT=9001
      - NANOCL_NODE=behuman
      - NANOCL_NODE_ADDR=192.168.8.102
      - NANOCL_CARGO_KEY=my-cargo.global
      - NANOCL_CARGO_NAMESPACE=global
      - NANOCL_CARGO_INSTANCE=0
      - PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
      Image: ghcr.io/nxthat/nanocl-get-started:latest
      WorkingDir: /
      Entrypoint:
      - /bin/nanocl-get-started
      Labels:
        com.docker.compose.project: nanocl_global
        io.nanocl.c: my-cargo.global
        io.nanocl.kind: cargo
        io.nanocl.n: global
        org.opencontainers.image.description: Nanocl get started image
        org.opencontainers.image.source: https://github.com/nxthat/nanocl-get-started
        io.nanocl: enabled
    NetworkSettings:
      Bridge: ''
      SandboxID: 57c34c7add8de927d6207a93bfa6940c16793a60db9b9c07455e156c8d5ae925
      HairpinMode: false
      LinkLocalIPv6Address: ''
      LinkLocalIPv6PrefixLen: 0
      Ports:
        9000/tcp: null
      SandboxKey: /var/run/docker/netns/57c34c7add8d
      EndpointID: ''
      Gateway: ''
      GlobalIPv6Address: ''
      GlobalIPv6PrefixLen: 0
      IPAddress: ''
      IPPrefixLen: 0
      IPv6Gateway: ''
      MacAddress: ''
      Networks:
        global:
          Aliases:
          - d4585d0657bb
          - my-cargo-46cAuD.global.c
          NetworkID: 8522aae81bd1dabc639194a2cbb5230802f1805dc5e780b624080335adc1421b
          EndpointID: 4651a2c085d9a71120c24ccb449174ed0fbe881e38bc70b201dbf327288ededb
          Gateway: 10.2.0.1
          IPAddress: 10.2.0.2
          IPPrefixLen: 16
          IPv6Gateway: ''
          GlobalIPv6Address: ''
          GlobalIPv6PrefixLen: 0
          MacAddress: 02:42:0a:02:00:02
```

Then to verify is the new environnement variable has been updated we can run:

```sh
curl 10.2.0.2:9001
```

That output to us:

```json
{
  "headers": {
    "accept": "*/*",
    "host": "10.2.0.2:9001",
    "user-agent": "curl/8.2.1"
  },
  "envs": {
    "NANOCL_CARGO_INSTANCE": "0",
    "   ": "/bin/nanocl-get-started",
    "HOSTNAME": "my-cargo-46cAuD.global.c",
    "HOME": "/",
    "NANOCL_NODE": "behuman",
    "TERM": "xterm",
    "NANOCL_NODE_ADDR": "192.168.8.102",
    "PORT": "9001",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "NANOCL_CARGO_KEY": "my-cargo.global",
    "NANOCL_CARGO_NAMESPACE": "global"
  }
}
```

Notice that we used **9001** and not 9000 this time because our service uses the **PORT** environment variable.
