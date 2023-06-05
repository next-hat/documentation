---
title: Ssl / Tls | Nanocl
description: Use Ssl to protect your services.
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, ssl, tls, certificate]
image: /img/logo.webp
sidebar_position: 1
sidebar_label: Ssl / Tls
pagination_next: null
---

# SSL / Tls

## SSL Certificate

For now the only way is to connect to the server where the nanocl instance is running and copy the certificate to:<br/>
`/var/lib/nanocl/proxy/certs`

From there you can add an Ssl entry in the state file:

```yaml
ApiVersion: v0.8
Kind: Deployment

Namespace: nexthat

# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
  - Name: doc
    Container:
      Image: nexthat-doc:0.4.1

# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
  - Name: docs.next-hat.com
    Kind: ProxyRule
    Version: v0.5
    Config:
      Watch:
        - doc.nexthat.c
      Rules:
        - Domain: docs.next-hat.com
          Network: Public
          Ssl:
            Certificate: /etc/nginx/certs/docs.next-hat.com/fullchain.pem
            CertificateKey: /etc/nginx/certs/docs.next-hat.com/privkey.pem
          Locations:
            - Path: /
              Target:
                Key: doc.nexthat.c
                Port: 80
```

## SSL Certificate with Let's Encrypt

You can use [certbot](https://certbot.eff.org/) to generate a certificate for your domain.

```sh
nanocl cargo -n system exec nproxy -- certbot --nginx --agree-tos \
  --email email@email.com \
  -d your-domain.com
```

After the command finished Ssl will be enabled already but you need to update your `ProxyRule`.<br />
For example:

```yaml
ApiVersion: v0.8
Kind: Deployment

Namespace: nexthat

# See all options:
# https://docs.next-hat.com/references/nanocl/cargo
Cargoes:
  - Name: doc
    Container:
      Image: nexthat-doc:0.4.1

# See all options:
# https://docs.next-hat.com/references/nanocl/resource
Resources:
  - Name: docs.next-hat.com
    Kind: ProxyRule
    Version: v0.5
    Config:
      Watch:
        - doc.nexthat.c
      Rules:
        - Domain: docs.next-hat.com
          Network: Public
          Ssl:
            Certificate: /etc/letsencrypt/live/docs.next-hat.com/fullchain.pem
            CertificateKey: /etc/letsencrypt/live/docs.next-hat.com/privkey.pem
            Dhparam: /etc/letsencrypt/ssl-dhparams.pem
          Includes:
            - /etc/letsencrypt/options-ssl-nginx.conf
          Locations:
            - Path: /
              Target:
                Key: doc.nexthat.c
                Port: 80
```
