<h1 id="nxtmdoc-meta-title">Install Nanocl for ubuntu</h1>

<blockquote class="tags">
 <strong>Tags</strong>
 </br>
 <span id="nxtmdoc-meta-keywords">
  documentation, nanocl , setup, installation, ubuntu
 </span>
</blockquote>

<p id="nxtmdoc-meta-description">
This section contains required procedures for installaling Nanocl on Ubuntu.
</p>

## Prerequisites

### OS requirements

To install Nanocl, you need the 64-bit version of one of these Ubuntu versions:

- Ubuntu Jammy 22.04 (LTS)
- Ubuntu Impish 21.10
- Ubuntu Focal 20.04 (LTS)
- Ubuntu Bionic 18.04 (LTS)

## Installation methods

You can install Nanocl in different ways, depending on your needs:

- Most users set up Next hat’s repositories and install from them, for ease of
  installation and upgrade tasks. This is the recommended approach.

- Some users download the DEB package and install it manually and manage
  upgrades completely manually. This is useful in situations such as installing
  Nanocl on air-gapped systems with no access to the internet.

### Install using the repository

1. Update the `apt` package index and install packages to allow `apt` to use a
   repository over HTTPS:

   ```sh
   sudo apt-get update

   sudo apt-get install \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```
2. Add Next hat's official GPG key:

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.next-hat.com/repo/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/next-hat.gpg
   ```
3. Use the following command to set up the repository:

   ```sh
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/next-hat.gpg] https://download.next-hat.com/repo/linux/ubuntu stable main" \
     | sudo tee /etc/apt/sources.list.d/next-hat.list > /dev/null
   ```
4. Update the `apt` package index, and install the _latest version_ of Nanocl

   ```sh
   sudo apt-get update
   sudo apt-get install nanocl nanocld -y
   ```

   > Receiving a GPG error when running `apt-get update`? Your default umask may
   > not be set correctly, causing the public key file for the repo to not be
   > detected.</br> Run the following command and then try to update your repo
   > again:</br> `sudo chmod a+r /etc/apt/keyrings/next-hat.gpg`

Congratz you are now able to you Nanocl !
To continue see our [post installation guide](/setups/nanocl/post-installation.md)
