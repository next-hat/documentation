---
title: Nanocl Resource References
keywords: [documentation, references, nanocl, nanocld, resource, specification]
image: /img/logo.webp
sidebar_label: Resource
sidebar_position: 4
---

import ApiSchema from '@theme/ApiSchema'

# Resource

In Nanocl, a `Resource` refers to a configuration setting.<br />
A `Resource` can be any `Kind` of configuration defined by the user, currently there is only one `Kind` of Resource natively supported:

| Built-in Kind    | 	Usage |
| ----------- | ----------- |
| Kind | data to setup your own Kind nativelly supported by the daemon |

While Kind of `Resource` can be defined by the user, there is currently two type of `Resources` usually supported after a basic installation:

| Plugin Kind    | 	Usage |
| ----------- | ----------- |
| ProxyRule | data for setup a proxy config installed by our proxy controller |
| DnsRule   | data for setup a dns config   installed by our dns controller |

## Custom Kind

Advanced user may want to define a custom `Kind` of `Resource`, this can allow to extend `Nanocl` functionality.<br />
This can be done using a `Statefile` by applying a new `Kind` of `Resource`

```yaml
ApiVersion: v0.12

Resources:
- Name: MyKind
  Kind: Kind
  Version: v0.1
  Data:
    Url: http://my-service.com
```

Applying this `Statefile` will create a new `Kind` of `Resource` `MyKind` with version `v0.1`.<br/>
Now we can create new resource with `Kind` `MyKind`.<br/>

```yaml
ApiVersion: v0.12

Resources:
- Name: my-custom-resource
  Kind: MyKind
  Version: v0.1
  Data:
    MyKey: MyValue
```

While doing it it will call your custom url before creating, patching and deleting the resource.<br />
This will allow you to transform the data if needed before the daemon will create or patch it.<br />
It also wont create the data if you return any error.<br />
This is how `ProxyRule` and `DnsRule` are setup.<br />

If you don't need to call a custom url but want a schema validation.<br />
You can use the `Schema` property.

```yaml
ApiVersion: v0.12

Resources:
- Name: MyKind
  Kind: Kind
  Version: v0.1
  Data:
    Schema:
      title: MyKind
      description: My custom kind
      type: object
      required:
      - Data
      properties:
        Data:
          description: MyCustomData
          type: string
```


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
