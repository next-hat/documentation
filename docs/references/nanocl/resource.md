---
title: Nanocl Resource References
keywords: [documentation, references, nanocl, nanocld, resource, specification]
image: /img/logo.webp
sidebar_label: Resource
sidebar_position: 3
---

# Resource

In Nanocl, a `Resource` refers to a configuration setting.<br />
While Resource can be any kind of configuration, currently only one type of `Resource` is natively supported: the ProxyRule.<br />
As the name suggests, a `ProxyRule` is a configuration that determines how your `cargoes` can be accessed through the proxy. <br />
By configuring `ProxyRules`, you can fine-tune the accessibility of your `cargoes` and ensure that they're only accessible in the ways you want.

## Proxy Rule

There is the openapi specification for a `ProxyRule`

import ApiSchema from '@theme/ApiSchema'

<ApiSchema example={false} id="nanocld-latest" pointer="#/components/schemas/ResourceProxyRule" />
