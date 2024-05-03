---
title: Orientation and Setup - Nanocl
description: This page contains step-by-step instructions on how to get started with Nanocl.
keywords: [documentation, guides, nanocl, get started, orientation and setup]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: 1. Orientation and Setup
---

# Orientation and Setup

#### Welcome! We are excited that you want to learn Nanocl.

This page contains instructions on how to get started with Nanocl. <br />
In this tutorial, you’ll learn how to:

- Basic knowledge about what `container image` `namespace` `cargo` and `cargo instance` are.
- Run a `container image` as a `cargo`.
- Patch a `cargo`.
- Configure a `proxy rule`.
- Use `state configuration` file for fast deployment

This tutorial assumes you have a current version of Nanocl installed on your machine. <br />
If you do not have Nanocl installed, see [how to install it](/docs/manuals/nanocl/install/overview.md).


## Start the tutorial

Let's get started by creating and running a `cargo` using this command:

```sh
nanocl cargo run my-cargo nginx:1.23
```

You'll notice a options used. Here’s some more info on them:

- `my-cargo` The name of your cargo
- `nginx:1.23` The name of the container image to use

Running this command will create and start a single `cargo instance` of *my-cargo*

> Note that Nanocl will choose an ipv4 address for your `cargo instance`
> Everything is by default with the best practice.

To display the chosen IP, inspect your cargo using:

```sh
nanocl cargo inspect my-cargo
```

You should see a list of instances:

```yml
NamespaceName: global
CreatedAt: 2023-12-08T11:49:52.949358
InstanceTotal: 1
InstanceRunning: 1
Spec:
  Key: 058dcfb3-7020-4827-b01a-78eb823245cd
  CargoKey: my-cargo.global
  Version: v0.12.0
  CreatedAt: 2023-12-08T11:49:52.945178
  Name: my-cargo
  Container:
    Cmd: []
    Image: nginx:1.23
    HostConfig:
      AutoRemove: false
Instances:
- Key: 34ec129bed6cc2a8b73236a0069f06dc6c0f9ccb8bab352eccdb6570faa2667e
  CreatedAt: 2023-12-08T11:49:53.026331
  UpdatedAt: 2023-12-08T11:49:53.345457
  Name: my-cargo-W4ylJV.global.c
  Kind: cargo
  NodeKey: behuman
  KindKey: my-cargo.global
  Data:
    Id: 34ec129bed6cc2a8b73236a0069f06dc6c0f9ccb8bab352eccdb6570faa2667e
    Created: 2023-12-08T11:49:52.955492094Z
    Path: /docker-entrypoint.sh
    Args:
    - nginx
    - -g
    - daemon off;
    State:
      Status: running
      Running: true
      Paused: false
      Restarting: false
      OOMKilled: false
      Dead: false
      Pid: 114583
      ExitCode: 0
      Error: ''
      StartedAt: 2023-12-08T11:49:53.334209336Z
      FinishedAt: 0001-01-01T00:00:00Z
    Image: sha256:a7be6198544f09a75b26e6376459b47c5b9972e7aa742af9f356b540fe852cd4
    ResolvConfPath: /var/lib/docker/containers/34ec129bed6cc2a8b73236a0069f06dc6c0f9ccb8bab352eccdb6570faa2667e/resolv.conf
    HostnamePath: /var/lib/docker/containers/34ec129bed6cc2a8b73236a0069f06dc6c0f9ccb8bab352eccdb6570faa2667e/hostname
    HostsPath: /var/lib/docker/containers/34ec129bed6cc2a8b73236a0069f06dc6c0f9ccb8bab352eccdb6570faa2667e/hosts
    LogPath: /var/lib/docker/containers/34ec129bed6cc2a8b73236a0069f06dc6c0f9ccb8bab352eccdb6570faa2667e/34ec129bed6cc2a8b73236a0069f06dc6c0f9ccb8bab352eccdb6570faa2667e-json.log
    Name: /my-cargo-W4ylJV.global.c
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
        UpperDir: /var/lib/docker/overlay2/6da68df2bbecc5bbfee769af76084e8df6e837d6279bf6b371b2ba2aba32528f/diff
        LowerDir: /var/lib/docker/overlay2/6da68df2bbecc5bbfee769af76084e8df6e837d6279bf6b371b2ba2aba32528f-init/diff:/var/lib/docker/overlay2/bec78dd605d9b5ee0703056f45bb285430eee55b5b3d9af3533459aaed51922d/diff:/var/lib/docker/overlay2/ddc3358a2a57acd9f45b53d757120d7061088aee0558fcbff0e346eb11970caa/diff:/var/lib/docker/overlay2/237b7fbf1f240445f63f2e1595fa9d4d03f00c58c3e915d4988fd2de7c2970b0/diff:/var/lib/docker/overlay2/074230c716ab103cfdb6764ad501c4ecdb4aeb9a0f7c25bc7684c2b0cf717d7c/diff:/var/lib/docker/overlay2/9ef1f37ab3aea3cad8ad7ecee5e67aae7cd67e56c19c4f8021f82df771bc239d/diff:/var/lib/docker/overlay2/539808f22dfceb13ca7c7dbffdae62d9bd1c91959c017265f7826659db587a05/diff
        WorkDir: /var/lib/docker/overlay2/6da68df2bbecc5bbfee769af76084e8df6e837d6279bf6b371b2ba2aba32528f/work
        MergedDir: /var/lib/docker/overlay2/6da68df2bbecc5bbfee769af76084e8df6e837d6279bf6b371b2ba2aba32528f/merged
    Mounts: []
    Config:
      Hostname: my-cargo-W4ylJV.global.c
      Domainname: ''
      User: ''
      AttachStdin: false
      AttachStdout: true
      AttachStderr: true
      ExposedPorts:
        80/tcp: {}
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
      - NGINX_VERSION=1.23.4
      - NJS_VERSION=0.7.11
      - PKG_RELEASE=1~bullseye
      Cmd:
      - nginx
      - -g
      - daemon off;
      Image: nginx:1.23
      WorkingDir: ''
      Entrypoint:
      - /docker-entrypoint.sh
      Labels:
        io.nanocl: enabled
        io.nanocl.kind: cargo
        io.nanocl.n: global
        com.docker.compose.project: nanocl_global
        maintainer: NGINX Docker Maintainers <docker-maint@nginx.com>
        io.nanocl.c: my-cargo.global
      StopSignal: SIGQUIT
    NetworkSettings:
      Bridge: ''
      SandboxID: ecc0a9d8d1d2e0edf4573774a8c8830336082bd72714249f87f38eb38035fd61
      HairpinMode: false
      LinkLocalIPv6Address: ''
      LinkLocalIPv6PrefixLen: 0
      Ports:
        80/tcp: null
      SandboxKey: /var/run/docker/netns/ecc0a9d8d1d2
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
          - 34ec129bed6c
          - my-cargo-W4ylJV.global.c
          NetworkID: 8522aae81bd1dabc639194a2cbb5230802f1805dc5e780b624080335adc1421b
          EndpointID: 4aafc681be0e0fd8a534a77fd02517c8c4b3ff688c06827d28e024300ec0726f
          Gateway: 10.2.0.1
          IPAddress: 10.2.0.2
          IPPrefixLen: 16
          IPv6Gateway: ''
          GlobalIPv6Address: ''
          GlobalIPv6PrefixLen: 0
          MacAddress: 02:42:0a:02:00:02
```

So for me, the ipv4 address assigned is `10.2.0.2`; let's curl it to see what is going on!

```
curl 10.2.0.2
```

This outputs:

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

As you can notice we now have a Nginx `cargo instance` running on ipv4 address `10.2.0.2`

## What is a Cargo ?

Now that you’ve run a `cargo`, what is a `cargo`? <br />
Cargoes are lightweight configurations based on a container image, containing everything needed to deploy and scale your application or share it while working to be sure that everyone gets it works the same way.
Running a cargo in Nanocl will create one or multiple `cargo instances` or `container`.
Based on the number of Nanocl nodes and the number of replicas you need. They can also autoscale based on ressources available on your hosts.

:::info
If you’re familiar with `Kubernetes` then think of a
cargo as a version of a `pod`. <br />
:::

To list your Cargoes you can do it by running:

```sh
nanocl cargo ls
```

It should output something like this:

```console
NAME        NAMESPACE    IMAGE         INSTANCES    VERSION    CREATED AT             UPDATED AT             
my-cargo    global       nginx:1.23    1/1          v0.12.0    2023-12-08 12:49:52    2023-12-08 12:49:52
```

In a more general way to manage our `cargoes` we will use:

```sh
nanocl cargo
```

You can see available commands by running:

```
nanocl cargo help
```

Which outputs:

```console
Manage cargoes

Usage: nanocl cargo [OPTIONS] <COMMAND>

Commands:
  list     List existing cargo
  create   Create a new cargo
  start    Start a cargo by its name
  stop     Stop a cargo by its name
  restart  Restart a cargo by its name
  remove   Remove cargo by its name
  inspect  Inspect a cargo by its name
  patch    Update a cargo by its name
  image    Manage cargo image
  exec     Execute a command inside a cargo
  history  List cargo history
  revert   Revert cargo to a specific history
  logs     Show logs
  run      Run a cargo
  stats    Show stats of cargo
  help     Print this message or the help of the given subcommand(s)

Options:
  -n, --namespace <NAMESPACE>  namespace to target by default global is used
  -h, --help                   Print help
```

To summarize, a `Cargo`:

- Is a lightweight configuration based on a container image.
- Contains every configuration needed to deploy your application which can be autoscaled.
- Will spawn and manage containers, called `cargo instances`.

## What is a cargo instance ?

Now that you know what a `Cargo` is, what is a `Cargo instance`?
A Cargo instance is exactly like a container but with possibly multiple instances of the same Cargo. It’s a sandboxed process on your host machine that is isolated from the rest of the host's processes. That isolation leverages kernel namespaces and cgroups, features that have been in Linux for a long time.

To summarize, a `Cargo instance`:

- Is most likely a container instance where `Cargo` is the configuration.
- is a runnable instance of a `Container image`. You can create, start, stop, move, or
  delete a cargo instance using the Nanocl API or CLI.
- can be run on local machines or virtual machines.
- is portable (can be run on any OS).
- are isolated from each other and run their own software, binaries, and
  configurations.

## What is a container image ?

Running a `Cargo` will spawn `Cargo Instance` that uses a isolated filesystem.
This filesystem is known as `Container image` and contains the container instance’s filesystem, which must have everything needed to run an application - all dependencies, configuration, scripts, binaries, etc.
The image also contains other configurations for the container, such as environment variables, a default command to run, and other metadata.

We won't get to dive deeper into containers and images, and covering all topics will take a long time, so you should take a look into the [Docker documentation](https://www.docker.com/resources/what-container/)

:::info
If you’re familiar with `chroot` think of a
container as an extended version of `chroot`. <br />
The filesystem is simply coming from the image.<br />
But, a container adds additional isolation not available when simply using chroot.
:::

## What is a namespace ?

A `namespace` in Nanocl encapsulates cargoes along networks.<br />
For example, if you have different domain names like *facebook.com*, *instagram.com*,
you may separate them using different namespaces.
