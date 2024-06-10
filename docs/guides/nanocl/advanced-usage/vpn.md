---
title: Vpn - Nanocl
description: Use a vpn inside nanocl
keywords: [documentation, nanocl, guides, get started, configuration, state, file, config, yaml, yml, statefile, vpn, private network]
image: /img/logo.webp
sidebar_position: 6
sidebar_label: Your own VPN
pagination_next: null
---

import CodeBlock from '@theme/CodeBlock';
import StatefileBlock from '@site/src/components/statefile_block';
import { nanoclMajorVersion } from '@site/vars';

# Your own VPN

Nanocl aim to make your life easier so we have a prebuilt VPN Statefile.<br />
Based on [hwdsl2/docker-ipsec-vpn-server](https://github.com/hwdsl2/docker-ipsec-vpn-server) from [@Lin Song](https://github.com/hwdsl2) you can use it from our [Official Nanocl Repository](https://nhnr.io)


<CodeBlock className="language-sh">
{`nanocl state apply -fs nhnr.io/v${nanoclMajorVersion}/sys/vpn.yml`}
</CodeBlock>

If you want to tweak it more than what is already possible from the `Statefile Args`, you can download it and customize it to fit your needs:


<CodeBlock className="language-sh">
{`wget nhnr.io/v${nanoclMajorVersion}/sys/vpn.yml`}
</CodeBlock>

Here is the content of the VPN `Statefile`:

<StatefileBlock example="advanced/vpn" />

You can use it in the following way:

<CodeBlock className="language-sh">
{`nanocl state apply -fs nhnr.io/v${nanoclMajorVersion}/sys/vpn.yml -- --namespace private --public-ip $(curl -s http://ipinfo.io/ip)`}
</CodeBlock>

From the file above, you can notice that we create a custom DNS for our VPN.<br/>
This allows us to create and override existing domains and redirect them to our Cargoes.<br/>

But before connecting to the VPN, you can retrieve the credentials using this command:

```sh
nanocl cargo -n private logs vpn
```

You should be able to see something like this:

```console
================================================

IPsec VPN server is now ready for use!

Connect to your new VPN with these details:

Server IP: server-public-ip
IPsec PSK: secret-psk
Username: vpnuser
Password: secret-password
```

We are not going to cover how to connect to a VPN here as it depends on your system.<br/>
You can have a deeper understanding of the container image in the [official documentation](https://github.com/hwdsl2/docker-ipsec-vpn-server).<br/>

Now we can create cargoes on any namespace we want and make them accessible from our vpn for example:

<StatefileBlock example="advanced/vpn-cargo" />

Notice that we use alot of `private.nsp` that reference to the gateway of our namespace `private` you may have to change it if you used a different namespace.

After applying this settings you should be able to access to [http://my-domain.internal](http://my-domain.internal).

![my-domain.internal](../../../..//static/img/my-domain.png)
