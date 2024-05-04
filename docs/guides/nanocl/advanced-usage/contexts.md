---
title: Contexts - Nanocl
sidebar_label: Contexts
---

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

## Create the ProxyRule

Next you can create the ProxyRule to expose the daemon to the internet.

```yaml
ApiVersion: v0.14

# See all options:
# https://docs.next-hat.com/references/nanocl/objects/resource
Resources:
  - Name: nanocl-daemon
    Kind: ncproxy.io/rule
    Data:
      Rules:
        - Protocol: Tcp
          Port: 9443
          Network: All
          Ssl:
            Certificate: /var/lib/nanocl/proxy/certs/nanocl_server.crt
            CertificateKey: /var/lib/nanocl/proxy/certs/nanocl_server.key
            CertificateClient: /var/lib/nanocl/proxy/certs/nanocl_ca.crt
            VerifyClient: true
          Target:
            UnixPath: /run/nanocl/nanocl.sock
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

```yaml
Name: my-secure-context
MetaData:
  Description: Secure connection to my remote server
Endpoints:
  Nanocl:
    Host: https://my-remote-server:9443
    Ssl:
      Cert: /home/my-user/.nanocl/certs/nanocl_client.crt
      CertKey: /home/my-user/.nanocl/certs/nanocl_client.key
```

:::note
Make sure to replace `my-remote-server` with the actual IP address or domain name of your remote server.
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
