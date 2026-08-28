---
title: Secret TLS - Nanocl
description: Use TLS to protect your services.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, ssl, tls, certificate]
image: /img/logo.webp
sidebar_position: 2
sidebar_label: Secret TLS
pagination_next: null
---
import CodeBlock from '@theme/CodeBlock';
import StatefileBlock from '@site/src/components/statefile_block';
import { nanoclMajorVersion } from '@site/vars';

# Secret TLS

To add an SSL Certificate you must create a secret.<br/>

Nanocl stores TLS certificate, private-key, certificate-authority, and DH
parameter values as PEM contents in CockroachDB. `ncproxy` writes those values
to its runtime directory only when Nginx requires files.

## Manual Setup

:::tip
You can create secrets directly from a deployment `Statefile`!<br/>
But we recommend you to use `Secret` kind of Statefile and manage them separatly.
:::

There is an `Statefile` example on how to do it:

<StatefileBlock example="advanced/secret-tls" />

You can also load local PEM files with the CLI. Nanocl reads the files before
creating the secret, so CockroachDB stores their contents instead of the local
paths:

<CodeBlock className="language-sh">
{`nanocl secret create tls tls.secret \\
  --certificate-path ./server.crt \\
  --certificate-key-path ./server.key \\
  --certificate-client-path ./ca.crt
`}
</CodeBlock>

:::info
On the first startup after upgrading to Nanocl 0.18, `nanocld` converts the
legacy database TLS secret from readable filesystem paths to PEM contents.
Keep the old files available for that startup. If they will not be available,
patch the secret to PEM contents while the 0.17 daemon and files are still
accessible, or restore the files before starting 0.18.
:::

## Automatic with Let's Encrypt

You can use [certbot](https://certbot.eff.org/) to generate a certificate for your domain.<br/>
To do so we crafted a generic `Statefile` for you that can handle the job and create a proper `secret`.<br/>
The secret will be named as follow: `cert.{domain_name}`.<br/>

<CodeBlock className="language-sh">
{`nanocl state apply -fs nr.next-hat.com/v${nanoclMajorVersion}/certbot -- --email your@email.com --domain deploy-example.com
`}
</CodeBlock>

After the command finished Ssl will be enabled already but you need to update your `ProxyRule`.<br/>
To use the `secret` for your next deployment:

<StatefileBlock example="advanced/secret-tls-cargo" />

For more information about secrets refer to our [secret reference][secret_ref]

[secret_ref]: /docs/references/nanocl/objects/secret.md
