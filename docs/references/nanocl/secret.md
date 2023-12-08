---
title: Nanocl Secret References
keywords: [documentation, references, nanocl, nanocld, secret, specification]
image: /img/logo.webp
sidebar_label: Secret
sidebar_position: 5
---

import ApiSchema from '@theme/ApiSchema'

# Secret

A Secret is an object that contains a small amount of sensitive data such as a password, a token, or a key.<br/>
Such information might otherwise be put in a `Cargo` specification.<br />
Using a Secret means that you don't need to include confidential data in your application code.

Because Secrets can be created independently of the `Cargoes` that use them, there is less risk of the Secret (and its data) being exposed during the workflow of creating, viewing, and editing `Cargoes`.<br />
`Nanocl`, and applications that run in your cluster, can also take additional precautions with `Secrets`, such as avoiding writing secret data to nonvolatile storage.


:::warning
Nanocl Secrets are, by default, stored unencrypted in the API server's underlying data store (cockroachdb).<br />
Anyone with API access can retrieve or modify a `Secret`, and so can anyone with access to cockroachdb. Additionally, anyone who is authorized to create a `Cargo` can use that access to read any `Secret`; this includes indirect access such as the ability to create a Deployment.

In order to safely use `Secrets`, take at least the following steps:

* Enable Encryption at Rest for Secrets.
<!-- * Restrict `Secret` access to specific containers. -->
* Consider using external `Secret` store providers.
:::

## Uses for Secrets

You can use Secrets for purposes such as the following:

* Set environment variables for a `Cargo`.
* Store your TLS certificates

The `Nanocl` daemon also uses `Secrets`; for example, bootstrap token `Secrets` are a mechanism to help automate node registration.


## Kinds of secrets

When creating a `Secret`, you must specify its `Kind` using the type field of the `Secret` resource.<br/>
The `Secret` type is used to facilitate programmatic handling of the `Secret` data.

`Nanocl` provides several built-in types for some common usage scenarios.<br />
These types vary in terms of the validations performed and the constraints `Nanocl` imposes on them.

You can define and use your own `Secret` type by assigning your own value string as the `Kind` value for a `Secret` object.

Nanocl doesn't impose any constraints on the type name. However, if you are using one of the built-in types, you must meet all the requirements defined for that type.

| Built-in Kind      | 	Usage |
| ----------- | ----------- |
| `Env` | data for an environments variables |
| `Tls`   | data for a TLS client or server    |


### Env

Secret of `Kind` `Env` are environement variable that you can bind to your `Cargoes`.<br />
You can create then using the following `Statefile`:

```yaml
ApiVersion: v0.12

Secrets:
- Key: env.super-secret
  Kind: Env
  Data:
  - MY_ENV=MY_VALUE
  - MY_ENV1=MY_VALUE1
```

### Tls

Secret of `Kind` `Tls` are certificat that you can bind to your `ProxyRules`.<br />
You can create then using the following `Statefile`:

```yaml
ApiVersion: v0.12

Secrets:
- Key: cert.my-certificate
  Kind: Tls
  Data:
    Certificate: |
      -----BEGIN CERTIFICATE-----
      MIIDETCCAfkCFFOJVQs8PxWlcJQDn...
    CertificateKey: |
      -----BEGIN PRIVATE KEY-----
      MIIEvQIBADANBgkqhkiG9w0B...
```

Below you can find the full spec of the `Tls` `Kind`:

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/ProxySslConfig" />


:::info
When using a `Tls Secret` we will need to content of the file instead of their path.
:::
