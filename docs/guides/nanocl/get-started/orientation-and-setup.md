---
title: Orientation and Setup | Nanocl
description: This page contains step-by-step instructions on how to get started with Nanocl.
keywords: [documentation, guides, nanocl, get started, orientation and setup]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: 1. Orientation and Setup
---

# Orientation and Setup

> **Tags** <br />
> documentation, guides, nanocl, get started, orientation and setup

#### Welcome! We are excited that you want to learn Nanocl.

This page contains instructions on how to get started with Nanocl. <br />
In this tutorial, you’ll learn how to:

- Basic knowledge about what `container image` `namespace` `cargo` and `cargo instance` are.
- Run a `container image` as a `cargo`.
- Patch a `cargo`.
- Configure a `proxy rule`.
- Use `state configuration` file for fast deployment

This tutorial assumes you have a current version of Nanocl installed on your machine. <br />
If you do not have Nanocl installed, see [how to install it](/docs/setups/nanocl/linux/ubuntu.md).


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
Key: my-cargo.global
Name: my-cargo
ConfigKey: f418e5f3-aa1a-4370-bfe4-b554dc7225f0
NamespaceName: global
Config:
  Key: f418e5f3-aa1a-4370-bfe4-b554dc7225f0
  CargoKey: my-cargo.global
  Version: v0.10.0
  CreatedAt: 2023-10-05T14:33:47.478845
  Name: my-cargo
  Container:
    Cmd: []
    Image: nginx:1.23
    HostConfig:
      AutoRemove: false
InstanceTotal: 1
InstanceRunning: 1
Instances:
- Node: behuman
  IpAddress: 192.168.8.102
  Container:
    Id: ae7756e429bbeb838f11b204e97bbf5fbdbbc37cce6375966ba59d3be0aee5f1
    Names:
    - /my-cargo.global.c
    Image: nginx:1.23
    ImageID: sha256:a7be6198544f09a75b26e6376459b47c5b9972e7aa742af9f356b540fe852cd4
    Command: /docker-entrypoint.sh nginx -g 'daemon off;'
    Created: 1696516427
    Ports:
    - PrivatePort: 80
      Type: tcp
    Labels:
      io.nanocl.cnsp: global
      io.nanocl: enabled
      io.nanocl.n: global
      maintainer: NGINX Docker Maintainers <docker-maint@nginx.com>
      com.docker.compose.project: nanocl_global
      io.nanocl.c: my-cargo.global
    State: running
    Status: Up 8 seconds
    HostConfig:
      NetworkMode: global
    NetworkSettings:
      Networks:
        global:
          NetworkID: bc812c90f4ac077d193a333ac45d9ceb9d151174ca33b966e99a32d8e4b58611
          EndpointID: b75b22214e13454c110c95015d0a2567002b73286a674c7991c2e3520b7a89b2
          Gateway: 10.2.0.1
          IPAddress: 10.2.0.2
          IPPrefixLen: 16
          IPv6Gateway: ''
          GlobalIPv6Address: ''
          GlobalIPv6PrefixLen: 0
          MacAddress: 02:42:0a:02:00:02
    Mounts: []
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
my-cargo    global       nginx:1.23    1/1          v0.10.0    2023-10-05 16:33:47    2023-10-05 16:33:47    
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
  -V, --version                Print version
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
