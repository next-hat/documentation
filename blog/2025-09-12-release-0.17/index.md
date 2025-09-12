---
slug: nanocl-0.17
title: Introducing Nanocl 0.17
description: Nanocl 0.17 lands with powerful CLI improvements, distributed locks, and experimental HTTP/3 support in ncproxy - plus better Statefile tooling and docs.
image: /img/cloud.webp
authors: [leone]
tags: [nanocl, release, 0.17]
keywords: [containerization, Nanocl, NGINX, HTTP3, DevOps, statefile, release, 0.17]
---

We're excited to announce the release of **Nanocl 0.17**! This version focuses on developer productivity and modern networking: new CLI commands and enhancements, distributed coordination in the daemon, and experimental HTTP/3 support in `ncproxy`. It also brings significant improvements to Statefile authoring with better argument parsing, metadata, and a built-in manual renderer.

<!-- truncate -->

## Highlights of Nanocl 0.17

- CLI boosts: multi-target `nanocl logs`, brand-new `nanocl stats`, and improved Statefile commands including `state man`, `state render`, and smarter args parsing.
- Platform resilience: `nanocld` introduces a distributed mutex to prevent duplicated tasks across nodes and securely syncs DB certs via secrets.
- Modern edge: `ncproxy` adds HSTS configuration from rules and experimental HTTP/3 support with tunable options.

---

## Component Changes

### nanocl 0.17.0
- Added:
  - `nanocl stats` to get stats of multiple processes by name (thanks [n0tank3sh](https://github.com/n0tank3sh)).
  - `nanocl state man` to get the manual of the Statefile.
  - `nanocl state render` to render a Statefile with the current context variables.
  - `nanocl logs` now accept multiple names.
  - Better Statefile arguments parsing with required, multiple and description fields.
  - Statefile metadata to enhance the manual of a statefile.
  - `nanocl secret patch` to update a secret without having to remove it.

### nanocld 0.17.0
- Added:
  - Endpoint `GET /process/{name}/stats` to get process stats by it's name by [n0tank3sh](https://github.com/n0tank3sh)
  - Save database cert into a secret for multinode exchange and sync.
  - Distributed mutex lock to avoid node to run the same task at the same time.

### ncproxy 0.14.0
- Added:
  - Hsts configuration from the proxy rule by [n0tank3sh](https://github.com/n0tank3sh)
  - Http3 experimental support

---

## HTTP/3 and HSTS

Since nginx now come with HTTP/3 support, we have added experimental support for HTTP/3 in the proxy rule. This includes options to enable HTTP/3 on a per-domain basis. We also added HSTS (HTTP Strict Transport Security) configuration options to enhance security by enforcing HTTPS connections.

Example of a Statefile to deploy a simple cargo with HTTP/3 support:

```yaml
ApiVersion: v0.17

Secrets:
- Name: tls.secret
  Kind: nanocl.io/tls
  Data:
    Certificate: |
      -----BEGIN CERTIFICATE-----
      MIIDETCCAfkCFFOJVQs8PxWlcJQDn/AQpSopkhISMA0GCSqGSIb3DQEBCwUAMEUx
      CzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRl
      cm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMjMwNTI5MDM0MDQwWhcNMjQwNTI4MDM0
      MDQwWjBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UE
      CgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOC
      AQ8AMIIBCgKCAQEAyH+TAzIAxxrMKh88p1emIxsttpjqCHdlQuboves+0vI6ORwU
      BI3HP7gTMQpgK+QnEZw1XIs6/Zdg2VfUiNgQXyh72/0cdurIIqRbF2fLAMSaYElA
      RRT9F60eHqQ12bXf6ITWB/0ZSnacbLIsic1HcVwr0Awx+xu1YsB9ojssXyIIU/yx
      d6FjPtiqJTPT9RhVb6Vmfpclse21qGek8tg88U+TrrJZ/Eg5cZojnQTyxhMGHeQf
      F71nb7no1v5hdki3p50Ik//9lvY/5onWrBUCuAsHi8OkSSyElTQ/JYzuMBjqOaMw
      PYLZf3d2eRqpiEC/5WI8OJDAk3/y83nG3zy3+QIDAQABMA0GCSqGSIb3DQEBCwUA
      A4IBAQAz8b7U0jbgBVEen1vd15V6DAxTmg768OkMRoNqK/y0oSK0qHn3IYSADK6M
      fl6qPnTY3xts+j8ohvNRGR5rJiv25b8koQs6K/ACzMgVlvXeSBVgjBArxgyp3K3q
      Tpeqg11R5YuJLaMKjWTzOzSq6shLO5/TscLGpkDbZ12HElc5hXyLrEZmsdCb1Wg7
      RCaMqsmgD/bYTOgP41DN6MVaSmxCshCGcL78enStPDheCmkk7eLMetMrJZLkf5Ch
      YWs3OUPos4v9GN40VyNWtbrz9g8TzmD4QOfuhuj9nUg9Psa2c22rgr3XaJEU8nyp
      rSHTKorbCvimz1/m0crjE91CP9JE
      -----END CERTIFICATE-----
    CertificateKey: |
      -----BEGIN PRIVATE KEY-----
      MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIf5MDMgDHGswq
      HzynV6YjGy22mOoId2VC5ui96z7S8jo5HBQEjcc/uBMxCmAr5CcRnDVcizr9l2DZ
      V9SI2BBfKHvb/Rx26sgipFsXZ8sAxJpgSUBFFP0XrR4epDXZtd/ohNYH/RlKdpxs
      siyJzUdxXCvQDDH7G7ViwH2iOyxfIghT/LF3oWM+2KolM9P1GFVvpWZ+lyWx7bWo
      Z6Ty2DzxT5Ousln8SDlxmiOdBPLGEwYd5B8XvWdvuejW/mF2SLennQiT//2W9j/m
      idasFQK4CweLw6RJLISVND8ljO4wGOo5ozA9gtl/d3Z5GqmIQL/lYjw4kMCTf/Lz
      ecbfPLf5AgMBAAECggEAHK2Su5xFXDVLCqNZK55v1wmmKj4JC5j4VO9uTuv9GnMn
      PM/1VQlqfIS5ygPv6ZdCt1QeldQcZfVnFu9nKQOuo83ImZjEn4XJhpr3pItmEAAP
      DMKtfLQZ128dpchbI37OPhXx/0aGfY4lpa5+jF9eXqqOYb280GwQL8XUsoXAPQMC
      MwAOHbgHH5lYxD9fizjrWIFIC9jfHjVM3qjOfmz+NujKs+nmVI5AQRCd6C66hbgr
      2EJe/8ZlDaZX3bfDnRPxhQN8T3VZcwHGj3zqGPnfkr8Ut9nqDhOcqGuTjNdqGEIi
      meDmKzPsssZg5+sPjgzMsPVf/XQ+v4dLQ2GSYuehOQKBgQDTfzD+K5/rR382HWHX
      VnL+KXD7cTA7DQq4ma/7UlJMaxhuA11w/4wF/lRiXKNUTfpUSyIybT8IP23fgFDV
      zLq2G36+mpUXbxPjlFaJfxNOlcr35xvsIC3HMBqOKYm74B9rJbLIwsMZcPi/BuJS
      ve7pj9blvjf8ZUXw8erhFFoGUwKBgQDyr+u7OQyIhqhCOpy9Is/DtYBg3MQSDLTO
      TfmqaaUcDvRNy4pgJ2B5Kbs20yAqgBtGDEP+MdtBo3NgIHOA7xjU5biNSz8R12WR
      UmDrdxIvAo2iixN8TDvIs0EEmE5hrRgPRaf6WP3o1okaWnYuq2VC7HSJJFCtWx9V
      Aj7VEOgnAwKBgGAXWdshVvc+9L1RfDKqRHTVv09+jbtGoahdq2c0b8/omKDjRoEg
      mi3e79gA3vReuW2y9UaT/B9zMihp1FBPREWZGGzhLvwGq7Kqoua1pb/+rskTZ8xQ
      knv9jxMoLDwACEZWSnSMiLf2bA3ewtV1FidoAus/EZDLMovWXjEFXiGhAoGBAIGb
      YhGCzia7g3CbTMnVpY+nhwAz5qKdFpJ3IjbYZM0vT1mcsjHX1bXfi5Qj/LG16Nro
      AgfnKGlNmXhk3EqnZmOMq5sJ7Izis+OAUzJtTNC+VFXSYH2pWOQ+lyKVFIclogvF
      74fLrw6CRIZGeYdDEblD/pifRFbQq1MC9/tiJBlxAoGAAo/XDJSTRlcrJuutk5jG
      CZPG5LBlxvdUbsuu2vZ7XIoWp3BvuK+yM8m9kEQgl3x8F3bqRjoQmMN6cImMYC2W
      F02Hw2EcWWx4w+liGjDy8/rcb9KfYTht3Q3W9RYYPZwn+hg4pmGVb4+yOqd183QQ
      Ug0MvH79P7CUpecFPJliDME=
      -----END PRIVATE KEY-----

Resources:
- Name: secret-tls.com
  Kind: ncproxy.io/rule
  Metadata:
    Cert: certbot
  Data:
    Rules:
    - Domain: secret-tls.com
      Network: All
      Ssl: tls.secret
      Hsts: Recommended
      Http3: true
      Locations:
      - Path: /
        Target:
          Key: secret-tls.global.c
          Port: 9000

Cargoes:
- Name: secret-tls
  Container:
    Image: ghcr.io/next-hat/nanocl-get-started:latest
    Env:
      - APP=SECRET_TLS
```

:::info
Refer to the [proxy rule][proxy-rule] documentation for all HTTP/3 and HSTS options.
:::

---

## Statefile Manuals

You can now display a manual for your Statefile directly in the terminal. Using the new `nanocl state man` command, you can display a comprehensive manual that includes metadata, argument descriptions, and usage examples.

![Statefile Man](/img/statefile-man.png)

Example of a statefile to display a nice manual using the `nanocl state man` command:

```yaml
ApiVersion: v0.17

Metadata:
  Name: Nginx with Certbot SSL
  Tags:
  - cargo
  - nginx
  - certbot
  - ssl
  - proxy
  About: Example of an Nginx cargo with Certbot managed SSL certificates.
  LongAbout: |
    This example demonstrates how to create an Nginx cargo with SSL certificates
    managed by Certbot. The cargo is configured to always pull the latest Nginx image
    and automatically handle SSL certificate issuance and renewal.

Args:
- Name: name
  Kind: String
  Required: true
  Description: Name of the cargo to create.
- Name: testtt
  Kind: String
  Description: sample test
- Name: multiple
  Kind: String
  Multiple: true
  Description: sample multiple
- Name: boolean
  Kind: Boolean
  Description: sample boolean

Namespace: cargo-example

Cargoes:
- Name: ${{ Args.name }}
  ImagePullPolicy: Always
  Metadata:
    Certbot: managed
  Container:
    Image: nginx:latest
```

Refer to the [Statefile][statefile-doc] documentation for all available metadata and argument options.

---

## What’s Next?

We’ll continue refining multi-node operations, expanding Statefile tooling, and iterating on HTTP/3 to graduate it from experimental. As always, feedback is welcome - [join the discussion on GitHub](https://github.com/next-hat/nanocl).

Happy deploying!

Nanocl Team

[proxy-rule]: /references/nanocl/objects/resource#proxy-rule
[statefile-doc]: /references/nanocl/statefile
