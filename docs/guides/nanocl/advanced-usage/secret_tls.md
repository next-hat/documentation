---
title: Secret TLS | Nanocl
description: Use TLS to protect your services.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, ssl, tls, certificate]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Secret TLS
pagination_next: null
---

# Secret TLS

To add an SSL Certificate you must create a secret.<br/>

## Manual Setup

:::tip
You can create secrets directly from a deployment `Statefile`!<br/>
But we recommend you to use `Secret` kind of Statefile and manage them separatly.
:::

There is an `Statefile` example on how to do it:

```yaml
ApiVersion: v0.12

Namespace: global

Secrets:
- Key: cert.deploy-example.com
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

# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
- Name: my-cargo
  Container:
    Image: ghcr.io/next-hat/nanocl-get-started:latest

# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
- Name: deploy-example.com
  Kind: ncproxy.io/rule/v0.9
  Data:
    Rules:
    - Domain: deploy-example.com
      Network: Public
      # Enable usage of our secret
      Ssl: cert.deploy-example.com
      Locations:
      - Path: /
        Target:
          Key: my-cargo.global.c
          Port: 9000
```

## Automatic with Let's Encrypt

You can use [certbot](https://certbot.eff.org/) to generate a certificate for your domain.<br/>
To do so we crafted a generic `Statefile` for you that can handle the job and create a proper `secret`.<br/>
The secret will be named as follow: `cert.{domain_name}`.<br/>

```sh
nanocl state apply -s nhnr.io/sys/certbot.yml -f -- --email your@email.com --domain deploy-example.com
```

After the command finished Ssl will be enabled already but you need to update your `ProxyRule`.<br/>
To use the `secret` for your next deployment:

```yaml
ApiVersion: v0.12

Namespace: global

# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
- Name: my-cargo
  Container:
    Image: ghcr.io/next-hat/nanocl-get-started:latest

# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
- Name: deploy-example.com
  Kind: ncproxy.io/rule/v0.9
  Data:
    Rules:
    - Domain: deploy-example.com
      Network: Public
      # Enable usage of our secret
      Ssl: cert.deploy-example.com
      Locations:
      - Path: /
        Target:
          Key: my-cargo.global.c
          Port: 9000
```

For more information about secrets refer to our [Secret reference](/references/nanocl/secret)
