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
If you do not have Nanocl installed, see [how to install it](/manuals/nanocl/install/overview).


## Start the tutorial

Let's get started by creating and running a `cargo` using this command:

```sh
nanocl cargo run my-cargo nginx:1.23
```

This may take a few minutes to complete, time to download image and start the container.

You'll notice a options used. Here’s some more info on them:

- `my-cargo` The name of your cargo
- `nginx:1.23` The name of the container image to use

Running this command will create and start a single `cargo instance` of *my-cargo*

> Note that Nanocl will choose an ipv4 address for your `cargo instance`
> Everything is by default with the best practice.

To display the chosen IP, inspect your cargo using:

```sh
nanocl cargo inspect global.my-cargo
```

So for me, the ipv4 address assigned is `10.2.0.2`; let's curl it to see what is going on!

```sh
curl 10.2.0.2
```

As you can notice we now have a Nginx `cargo instance` running on ipv4 address `10.2.0.2`

## What is a Cargo ?

Now that you’ve run a `cargo`, what is a `cargo`? <br />
Cargoes are durable workload configurations. A Cargo contains one or more
named application containers, optional ordered init containers, and a fixed
replica count. Each replica contains the processes declared by the Cargo.

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
KEY                CONTAINERS             STATUS                   INSTANCES  VERSION  CREATED AT           UPDATED AT
global.my-cargo    my-cargo=nginx:1.23    start/start (unknown)    1/1        v0.1.0   2026-08-28 21:24:27  2026-08-28 21:24:27
```

In a more general way to manage our `cargoes` we will use:

```sh
nanocl cargo
```

You can see available commands by running:

```sh
nanocl cargo help
```

Which outputs:

```console
Manage cargoes

Usage: nanocl cargo [OPTIONS] <COMMAND>

Commands:
  list     List existing cargo
  create   Create a new cargo
  start    Start cargoes by canonical keys
  stop     Stop cargoes by canonical keys
  restart  Restart cargoes by canonical keys
  remove   Remove cargoes by canonical keys
  inspect  Inspect a cargo by its canonical key
  patch    Update a cargo by its canonical key
  history  List cargo history
  revert   Revert cargo to a specific history
  logs     Show logs
  run      Run a cargo
  stats    Show stats of cargo
  help     Print this message or the help of the given subcommand(s)

Options:
  -h, --help  Print help
```

To summarize, a `Cargo`:

- Describes one or more named application containers.
- Can declare ordered init containers and a durable replica count.
- Spawns and manages the processes that belong to each replica.

## What is a cargo instance ?

Now that you know what a `Cargo` is, what is a `Cargo instance`?
A Cargo replica is one realization of the Cargo specification. It can contain
multiple application processes and, on non-host networks, an internal shared
network sandbox. Container isolation uses Docker's Linux namespaces and
cgroups.

To summarize, a `Cargo instance`:

- Contains the named application processes declared by its Cargo.
- Has an ordinal exposed through `NANOCL_CARGO_INSTANCE`.
- Is isolated from other replicas and runs on the local Docker node.

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

A `namespace` groups namespaced Nanocl objects such as Cargoes and virtual
machines. Docker networks are node-local and are not owned by namespaces.<br />
For example, if you have different domain names like *facebook.com*, *instagram.com*,
you may separate them using different namespaces.
