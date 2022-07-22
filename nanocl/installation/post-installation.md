# Post installation

This section contains required procedures for configuring Nanocl.

## Manage Nanocl as a non-root user

The Nanocl daemon binds to a Unix socket instead of a TCP port. By default that
Unix socket is owned by the user root and other users can only access it using
sudo. The Nanocl daemon always runs as the root user.

If you don’t want to preface the nanocl command with sudo, create a Unix group
called nanocl and add users to it. When the Nanocl daemon starts, it creates a
Unix socket accessible by members of the root group.

```sh
sudo groupadd nanocl
sudo usermod -aG nanocl YOUR_USERNAME
newgrp nanocl
```

After nanocl and nanocld binary have been installed, you need first to start a
docker instance. By default we provide a systemd script.

```sh
sudo systemctl start nanocld@dockerd
```

But in order to be abble to run nanocl as non root user we need to fix file
permission after have been lauched your docker instace. Not that our docker
instance is totaly isolate from existing docker instance.

```sh
sudo chown -R :nanocl /run/nanocl
```

Then we need to install nanocl services. This will download a bench of images
such as

- nginx as proxy
- dnsmasq as dns and dhcp server
- ipsec as vpn server
- postgresql as nanocld database

```sh
nanocl --install-services
```

Then start the daemon

```sh
sudo systemctl start nanocld
```

We need to fix permission one last time.

```sh
sudo chown -R :nanocl /run/nanocl
sudo chmod 770 /run/nanocl/nanocl.sock
```

Test if we have global namespace

```sh
nanocl namespace ls
```

And there we go we can start enjoy using nanocl !
