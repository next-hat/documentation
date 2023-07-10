---
title: Orientation and Setup | Nanocl
description: This page contains step-by-step instructions on how to get started with Nanocl.
keywords: "documentation, guides, nanocl, get started, orientation and setup"
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
Key: global-my-cargo
Name: my-cargo
ConfigKey: 38de5258-230f-4dc4-bec4-80b3e757705b
NamespaceName: global
Config:
  Key: 38de5258-230f-4dc4-bec4-80b3e757705b
  Name: my-cargo
  CargoKey: global-my-cargo
  DnsEntry: null
  Replication: null
  Container:
    Cmd: []
    Image: nginx:1.23
    HostConfig:
      AutoRemove: false
RunningInstances: 1
Containers:
- Id: f476462a05b882362ca03caf7e19099f3358fa58d7a02c6f60972f449e9d8167
  Names:
  - /global-my-cargo
  Image: nginx:1.23
  ImageID: sha256:88736fe827391462a4db99252117f136b2b25d1d31719006326a437bb40cb12d
  Command: /docker-entrypoint.sh nginx -g 'daemon off;'
  Created: 1676903377
  Ports:
  - PrivatePort: 80
    Type: tcp
  Labels:
    io.nanocl.namespace: global
    maintainer: NGINX Docker Maintainers <docker-maint@nginx.com>
    io.nanocl.cargo: global-my-cargo
  State: running
  Status: Up 16 seconds
  HostConfig:
    NetworkMode: global
  NetworkSettings:
    Networks:
      global:
        NetworkID: 1d5971cdbc130ff161b88092b449c108946efd2bf8ebf91aeeb143259c24dad0
        EndpointID: 80039a4336ba31e06177202cc49d71f7651a657b2bb813eac929f6e42c409a5c
        Gateway: 172.26.0.1
        IPAddress: 172.26.0.2
        IPPrefixLen: 16
        IPv6Gateway: ''
        GlobalIPv6Address: ''
        GlobalIPv6PrefixLen: 0
        MacAddress: 02:42:ac:1a:00:02
  Mounts: []
```

So for me, the ipv4 address assigned is `172.26.0.2`; let's curl it to see what is going on!

```
curl 172.26.0.2
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

As you can notice we now have a Nginx `cargo instance` running on ipv4 address `192.168.144.2`

## What is a Cargo ?

Now that you’ve run a `cargo`, what is a `cargo`? <br />
Cargoes are lightweight configurations based on a container image, containing everything needed to deploy and scale your application or share it while working to be sure that everyone gets it works the same way.
Running a cargo in Nanocl will create one or multiple `cargo instances` or `container`.
Based on the number of Nanocl nodes and the number of replicas you need. They can also autoscale based on ressources available on your hosts.

> **Info** <br />
> If you’re familiar with `Kubernetes` then think of a
> cargo as a version of a `pod`. <br />

To list your Cargoes you can do it by running:

```sh
nanocl cargo ls
```

It should output something like this:

```console
NAMESPACE     NAME            IMAGE           INSTANCES    
global        my-cargo        nginx:1.23      1/1
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
  remove   Remove cargo by its name
  inspect  Inspect a cargo by its name
  patch    Update a cargo by its name
  image    Manage cargo image
  exec     Execute a command inside a cargo
  history  List cargo history
  reset    Reset cargo to a specific history
  logs     Show logs
  run      Run a cargo
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

> **Info** <br />
> If you’re familiar with `chroot` think of a
> container as an extended version of `chroot`. <br />
> The filesystem is simply coming from the image.
> But, a container adds additional isolation not available when simply using chroot.

## What is a namespace ?

A `namespace` in Nanocl encapsulates cargoes along networks.
For example, if you have different domain names like *facebook.com*, *instagram.com*,
you may separate them using different namespaces.
