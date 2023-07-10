---
title: Patch a cargo | Nanocl
description: Patch a cargo to update his image or his environnements variables and redeploy them instantly.
keywords: "documentation, guides. nanocl, get started, cargo, patch, update"
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
nanocl cargo image create nexthat/nanocl-get-started:latest
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
Key: global-my-cargo
Name: my-cargo
ConfigKey: f0ac2176-5599-491f-9e97-341243b40fe8
NamespaceName: global
Config:
  Key: f0ac2176-5599-491f-9e97-341243b40fe8
  Name: my-cargo
  CargoKey: global-my-cargo
  Replication: null
  Container:
    Env: []
    Cmd: []
    Image: nexthat/nanocl-get-started:latest
    HostConfig:
      Binds: []
      AutoRemove: false
RunningInstances: 1
Containers:
- Id: d4acae3d858defb459f821e9ae25e271e1318ca019b6a2eae18033d6dd694294
  Names:
  - /global-my-cargo
  Image: nexthat/nanocl-get-started:latest
  ImageID: sha256:3147ba46f3af247792bd31f91a362eca2ce3f98e2615f2d3c2db0efbe0183954
  Command: docker-entrypoint.sh node .
  Created: 1677017204
  Ports: []
  Labels:
    io.nanocl.cargo: global-my-cargo
    io.nanocl.namespace: global
  State: running
  Status: Up 4 seconds
  HostConfig:
    NetworkMode: global
  NetworkSettings:
    Networks:
      global:
        NetworkID: 1d5971cdbc130ff161b88092b449c108946efd2bf8ebf91aeeb143259c24dad0
        EndpointID: 98cfe670815ee83a45d3804a67773950084e9054299946721ef75cd84614b657
        Gateway: 172.26.0.1
        IPAddress: 172.26.0.3
        IPPrefixLen: 16
        IPv6Gateway: ''
        GlobalIPv6Address: ''
        GlobalIPv6PrefixLen: 0
        MacAddress: 02:42:ac:1a:00:03
  Mounts: []
```

The default port of our *get-started* is **9000** so we can test if access to it.

> **Note** <br />
> When you patch a cargo a related container will have an IP change because it starts a new container before deleting the older one.

```sh
curl 172.26.0.3:9000
```

You should have something like this as output:

```json
{
  "now": 1664225283833,
  "headers": {
    "host": "172.26.0.3:9000",
    "user-agent": "curl/7.68.0",
    "accept": "*/*"
  },
  "env": {
    "NODE_VERSION": "16.17.0",
    "HOSTNAME": "ce7b054be81a",
    "YARN_VERSION": "1.22.19",
    "PORT": "9000",
    "HOME": "/home/node",
    "TERM": "xterm",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "HOST": "0.0.0.0",
    "PWD": "/home/node/app"
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
Key: global-my-cargo
Name: my-cargo
ConfigKey: 4a53f504-b4b0-4722-bc01-1fe0704a4058
NamespaceName: global
Config:
  Key: 4a53f504-b4b0-4722-bc01-1fe0704a4058
  Name: my-cargo
  CargoKey: global-my-cargo
  Replication: null
  Container:
    Env:
    - PORT=9001
    Cmd: []
    Image: nexthat/nanocl-get-started:latest
    HostConfig:
      Binds: []
      AutoRemove: false
RunningInstances: 1
Containers:
- Id: 59cda4e8b214cd4884d66cd098c0be66725926735b161dc044bbb525b93b6b0a
  Names:
  - /global-my-cargo
  Image: nexthat/nanocl-get-started:latest
  ImageID: sha256:3147ba46f3af247792bd31f91a362eca2ce3f98e2615f2d3c2db0efbe0183954
  Command: docker-entrypoint.sh node .
  Created: 1677017308
  Ports: []
  Labels:
    io.nanocl.cargo: global-my-cargo
    io.nanocl.namespace: global
  State: running
  Status: Up 48 seconds
  HostConfig:
    NetworkMode: global
  NetworkSettings:
    Networks:
      global:
        NetworkID: 1d5971cdbc130ff161b88092b449c108946efd2bf8ebf91aeeb143259c24dad0
        EndpointID: 9255ed0b45f3d783069af6af15d8ae39a6765036cbfb8d86279de4320e3e6d15
        Gateway: 172.26.0.1
        IPAddress: 172.26.0.2
        IPPrefixLen: 16
        IPv6Gateway: ''
        GlobalIPv6Address: ''
        GlobalIPv6PrefixLen: 0
        MacAddress: 02:42:ac:1a:00:02
  Mounts: []
```

Then to verify is the new environnement variable has been updated we can run:

```sh
curl 172.26.0.2:9001
```

That output to us:

```json
{
  "now": 1664225784742,
  "headers": {
    "host": "172.26.0.2:9001",
    "user-agent": "curl/7.68.0",
    "accept": "*/*"
  },
  "env": {
    "NODE_VERSION": "16.17.0",
    "HOSTNAME": "6bcb6f22142f",
    "YARN_VERSION": "1.22.19",
    "PORT": "9001",
    "HOME": "/home/node",
    "TERM": "xterm",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "HOST": "0.0.0.0",
    "PWD": "/home/node/app"
  }
}
```

Notice that we used **9001** and not 9000 this time because our service uses the **PORT** environment variable.
