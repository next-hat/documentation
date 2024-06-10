---
title: Patch a cargo - Nanocl
description: Patch a cargo to update his image or his environnements variables and redeploy them instantly.
keywords: [documentation, guides. nanocl, get started, cargo, patch, update]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: 2. Patch a cargo
---

# Patch a cargo

Patch a cargo to update his image or his environment variables and redeploy them instantly.

## Update cargo image

So now let’s change our `Cargo` *my-cargo* with the image we previously downloaded:

```sh
nanocl cargo patch my-cargo --image ghcr.io/next-hat/nanocl-get-started:latest
```

You'll notice a few options being used. Here's some more info on them:

- `my-cargo` is the name of the cargo you want to update
- `--image` is the value we want to change and it's the cargo image
- `ghcr.io/next-hat/nanocl-get-started:latest` is the new image name

We can verify if our changes are made by inspecting our `cargo`:

```sh
nanocl cargo inspect my-cargo
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

To get his new IP

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
