---
title: Secret TLS | Nanocl
description: Use TLS to protect your services.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, ssl, tls, certificate]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Secret TLS
pagination_next: null
---
import CodeBlock from '@theme/CodeBlock';
import StatefileBlock from '@site/src/components/statefile_block';
import { nanoclMajorVersion } from '@site/vars';

# Secret TLS

To add an SSL Certificate you must create a secret.<br/>

## Manual Setup

:::tip
You can create secrets directly from a deployment `Statefile`!<br/>
But we recommend you to use `Secret` kind of Statefile and manage them separatly.
:::

There is an `Statefile` example on how to do it:

<StatefileBlock example="advanced/secret-tls" />

## Automatic with Let's Encrypt

You can use [certbot](https://certbot.eff.org/) to generate a certificate for your domain.<br/>
To do so we crafted a generic `Statefile` for you that can handle the job and create a proper `secret`.<br/>
The secret will be named as follow: `cert.{domain_name}`.<br/>

<CodeBlock className="language-sh">
{`nanocl state apply -s nhnr.io/v${nanoclMajorVersion}/sys/certbot.yml -f -- --email your@email.com --domain deploy-example.com
`}
</CodeBlock>

After the command finished Ssl will be enabled already but you need to update your `ProxyRule`.<br/>
To use the `secret` for your next deployment:

<StatefileBlock example="advanced/secret-tls-cargo" />

For more information about secrets refer to our [secret reference][secret_ref]

[secret_ref]: /docs/references/nanocl/objects/secret.md
