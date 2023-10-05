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
nanocl cargo image pull nexthat/nanocl-get-started:latest
```

## Update cargo image

So now let’s change our `Cargo` *my-cargo* with the image we previously downloaded:

```sh
nanocl cargo patch my-cargo --image nexthat/nanocl-get-started:latest
```

You'll notice a few options being used. Here's some more info on them:

- `my-cargo` is the name of the cargo you want to update
- `--image` is the value we want to change and it's the cargo image
- `nexthat/nanocl-get-started:latest` is the new image name

We can verify if our changes are made by inspecting our `cargo`:

```sh
nanocl cargo inspect my-cargo
```

This should output

```yml
Key: my-cargo.global
Name: my-cargo
ConfigKey: ace1f65a-c1ec-4f4a-82ad-30fd47c6babe
NamespaceName: global
Config:
  Key: ace1f65a-c1ec-4f4a-82ad-30fd47c6babe
  CargoKey: my-cargo.global
  Version: v0.10.0
  CreatedAt: 2023-10-05T14:33:47.478845
  Name: my-cargo
  Container:
    Env: []
    Cmd: []
    Image: nexthat/nanocl-get-started:latest
    HostConfig:
      Binds: []
      AutoRemove: false
InstanceTotal: 1
InstanceRunning: 1
Instances:
- Node: behuman
  IpAddress: 192.168.8.102
  Container:
    Id: 655052f86168bfd16753984f9eac61f0081e45f3fe50f9a2b45df74961e4b77e
    Names:
    - /my-cargo.global.c
    Image: nexthat/nanocl-get-started:latest
    ImageID: sha256:3147ba46f3af247792bd31f91a362eca2ce3f98e2615f2d3c2db0efbe0183954
    Command: docker-entrypoint.sh node .
    Created: 1696516929
    Ports: []
    Labels:
      io.nanocl.c: my-cargo.global
      com.docker.compose.project: nanocl_global
      io.nanocl: enabled
      io.nanocl.cnsp: global
      io.nanocl.n: global
    State: running
    Status: Up 6 seconds
    HostConfig:
      NetworkMode: global
    NetworkSettings:
      Networks:
        global:
          NetworkID: bc812c90f4ac077d193a333ac45d9ceb9d151174ca33b966e99a32d8e4b58611
          EndpointID: 15b235aa0ea3af54a259567926f435235a334212cdcdef9594cdec93679f5066
          Gateway: 10.2.0.1
          IPAddress: 10.2.0.3
          IPPrefixLen: 16
          IPv6Gateway: ''
          GlobalIPv6Address: ''
          GlobalIPv6PrefixLen: 0
          MacAddress: 02:42:0a:02:00:03
    Mounts: []
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
  "now": 1696516985985,
  "headers": {
    "host": "10.2.0.3:9000",
    "user-agent": "curl/7.88.1",
    "accept": "*/*"
  },
  "env": {
    "NODE_VERSION": "16.18.1",
    "HOSTNAME": "my-cargo-global-c",
    "YARN_VERSION": "1.22.19",
    "PORT": "9000",
    "HOME": "/home/node",
    "NANOCL_CARGO_NAMESPACE": "global",
    "TERM": "xterm",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "NANOCL_CARGO_KEY": "my-cargo.global",
    "HOST": "0.0.0.0",
    "PWD": "/home/node/app",
    "NANOCL_CARGO_INSTANCE": "0"
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
Key: my-cargo.global
Name: my-cargo
ConfigKey: f728329d-2b07-4ff1-b58f-354782ed4489
NamespaceName: global
Config:
  Key: f728329d-2b07-4ff1-b58f-354782ed4489
  CargoKey: my-cargo.global
  Version: v0.10.0
  CreatedAt: 2023-10-05T14:33:47.478845
  Name: my-cargo
  Container:
    Env:
    - PORT=9001
    Cmd: []
    Image: nexthat/nanocl-get-started:latest
    HostConfig:
      Binds: []
      AutoRemove: false
InstanceTotal: 1
InstanceRunning: 1
Instances:
- Node: behuman
  IpAddress: 192.168.8.102
  Container:
    Id: c3176eacf842fd679dd3820ba89d17bda6616437311761ef05aef7368ac5ad5f
    Names:
    - /my-cargo.global.c
    Image: nexthat/nanocl-get-started:latest
    ImageID: sha256:3147ba46f3af247792bd31f91a362eca2ce3f98e2615f2d3c2db0efbe0183954
    Command: docker-entrypoint.sh node .
    Created: 1696517059
    Ports: []
    Labels:
      io.nanocl: enabled
      io.nanocl.c: my-cargo.global
      com.docker.compose.project: nanocl_global
      io.nanocl.n: global
      io.nanocl.cnsp: global
    State: running
    Status: Up 6 seconds
    HostConfig:
      NetworkMode: global
    NetworkSettings:
      Networks:
        global:
          NetworkID: bc812c90f4ac077d193a333ac45d9ceb9d151174ca33b966e99a32d8e4b58611
          EndpointID: d5af5742cdc2b67400376f933a2fb1d9c772fef94fdeb18eb5b82d4300df7cbe
          Gateway: 10.2.0.1
          IPAddress: 10.2.0.2
          IPPrefixLen: 16
          IPv6Gateway: ''
          GlobalIPv6Address: ''
          GlobalIPv6PrefixLen: 0
          MacAddress: 02:42:0a:02:00:02
    Mounts: []
```

Then to verify is the new environnement variable has been updated we can run:

```sh
curl 10.2.0.2:9001
```

That output to us:

```json
{
  "now": 1696517103974,
  "headers": {
    "host": "10.2.0.2:9001",
    "user-agent": "curl/7.88.1",
    "accept": "*/*"
  },
  "env": {
    "NODE_VERSION": "16.18.1",
    "HOSTNAME": "my-cargo-global-c",
    "YARN_VERSION": "1.22.19",
    "PORT": "9001",
    "HOME": "/home/node",
    "NANOCL_CARGO_NAMESPACE": "global",
    "TERM": "xterm",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "NANOCL_CARGO_KEY": "my-cargo.global",
    "HOST": "0.0.0.0",
    "PWD": "/home/node/app",
    "NANOCL_CARGO_INSTANCE": "0"
  }
}
```

Notice that we used **9001** and not 9000 this time because our service uses the **PORT** environment variable.
