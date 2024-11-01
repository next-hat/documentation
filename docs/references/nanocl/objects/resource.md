---
title: Resource References - Nanocl
keywords: [documentation, references, nanocl, nanocld, resource, specification, spec, proxy]
image: /img/logo.webp
sidebar_label: Resource
sidebar_position: 6
---

import ApiSchema from '@theme/ApiSchema'

# Resource

In Nanocl, a `Resource` refers to a configuration setting.<br />
A `Resource` can be any `Kind` of configuration defined by the user, currently there is only no `Kind` of Resource natively supported:

While Kind of `Resource` can be defined by the user, there is currently two type of `Resources` usually supported after a basic installation:

| Plugin Kind    | 	Usage |
| ----------- | ----------- |
| ncproxy.io/rule | data for setup a proxy config installed by our proxy controller |
| ncdns.io/rule   | data for setup a dns config   installed by our dns controller |

## Proxy Rule

As the name suggests, a `ProxyRule` is a configuration that determines how your `cargoes` can be accessed through the proxy. <br />
By configuring `ProxyRules`, you can fine-tune the accessibility of your `cargoes`.

There is the openapi specification to create a proxy `ProxyRule`:

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/ResourceProxyRule" />

### Proxy Rule Network

| Network    | 	Usage |
| ----------- | ----------- |
| All | Bind on all network addresses |
| Local | Bind only on 127.0.0.1 |
| Public   | Bind only on public ip address |
| Internal | Bind on internal nanocl gateway |

## Dns Rule

As the name suggests, a `DnsRule` is a configuration that determines how a dns server is configured.<br/>
That way you can tunes your network access with domain names.

There is the openapi specification to create a proxy `ProxyRule`:

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/ResourceDnsRule" />
