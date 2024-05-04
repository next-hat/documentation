---
title: Contexts - Nanocl
description: Use contexts to switch between different nanocl daemons.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, ssl, tls, certificate]
image: /img/logo.webp
sidebar_label: Contexts
---

import StatefileBlock from '@site/src/components/statefile_block';

# Contexts

Contexts are a way to communicate with different [nanocl daemon](../../../references/nanocl/daemon/overview.md)

For example you may have a nanocl daemon running on your local machine and another one running on a remote server. You can use contexts to switch between them.

We need to enable the daemon to be available from internet.
There is multiple ways to do it, but the easiest is to use a [ProxyRule](../../../references/nanocl/objects/resource.md).


## Create your SSL/TLS certificate

First, you need to create your SSL/TLS certificate.
This certificate will ensure only people with a specific certificate generated from the CA can access the daemon.

You can use the following commands to generate the certificates:

```sh
openssl req -x509 -newkey rsa:4096 -keyout ca.key -out ca.crt -days 365 -nodes -subj "/CN=NanoclCA"
openssl req -newkey rsa:4096 -keyout server.key -out server.csr -nodes -subj "/CN=*"
openssl x509 -req -in server.csr -out server.crt -CA ca.crt -CAkey ca.key -CAcreateserial -days 365
openssl req -newkey rsa:4096 -keyout client.key -out client.csr -nodes -subj "/CN=NanoclClient"
openssl x509 -req -in client.csr -out client.crt -CA ca.crt -CAkey ca.key -CAcreateserial -days 365
```

Then move the certificates to the correct location on the remote server where nanocl is running:

```sh
sudo mkdir -p /var/lib/nanocl/proxy/certs
sudo mv ca.crt /var/lib/nanocl/proxy/certs/nanocl_ca.crt
sudo mv server.crt /var/lib/nanocl/proxy/certs/nanocl_server.crt
sudo mv server.key /var/lib/nanocl/proxy/certs/nanocl_server.key
```

## Apply the ProxyRule

Next you need to apply a ProxyRule to expose the daemon to the internet.

Create a `nanocl-proxy.yml` file:

<StatefileBlock example="advanced/context-resource" />

Apply the ProxyRule by running:

```sh
nanocl apply -f nanocl-proxy.yml
```

## Create the Context

Move your client certificate to the correct location on your host machine:

```sh
mkdir -p ~/.nanocl/certs
mv client.crt ~/.nanocl/certs/nanocl_client.crt
mv client.key ~/.nanocl/certs/nanocl_client.key
```

Finally, you can create the context to switch between the different daemons.

Let create a `my-secure-context.yml` file:

<StatefileBlock example="advanced/context" />

:::note
Make sure to replace `my-remote-server` with the actual IP address or domain name of your remote server.<br/>
And replace `my-user` with your actual username.
:::

You can import the context by running:

```sh
nanocl context from my-secure-context.yml
```

To switch between contexts, you can use the following command:

```sh
nanocl context use my-secure-context
```

You can also list existing contexts:

```sh
nanocl context list
```

In a more general way use the following command:

```sh
nanocl context --help
```

To get more information about the context command.
