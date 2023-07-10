---
title: Nanocl Resource References
keywords: "documentation, references, nanocl, nanocld, resource, specification"
image: /img/logo.webp
sidebar_label: Resource
sidebar_position: 4
---

import ApiSchema from '@theme/ApiSchema'

# Resource

In Nanocl, a `Resource` refers to a configuration setting.<br />
While Resource can be any kind of configuration, currently there is two type of `Resource` natively supported:
- ProxyRule
- DnsRule

## Proxy Rule

As the name suggests, a `ProxyRule` is a configuration that determines how your `cargoes` can be accessed through the proxy. <br />
By configuring `ProxyRules`, you can fine-tune the accessibility of your `cargoes`.

There is the openapi specification to create a proxy `ProxyRule`:

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/ResourceProxyRule" />

## Dns Rule

As the name suggests, a `DnsRule` is a configuration that determines how a dns server is configured.<br/>
That way you can tunes your network access with domain names.

There is the openapi specification to create a proxy `ProxyRule`:

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/ResourceDnsRule" />
