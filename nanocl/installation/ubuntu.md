# Install Nanocl on Ubuntu

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

   ```console
   $ sudo apt-get update

   $ sudo apt-get install \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```
2. Add Next hat's official GPG key:

   ```console
   $ sudo mkdir -p /etc/apt/keyrings
   $ curl -fsSL https://download.next-hat.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/next-hat.gpg
   ```
3. Use the following command to set up the repository:

   ```console
   $ echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/next-hat.gpg] https://download.next-hat.com/repo/linux/ubuntu stable main" \
     | sudo tee /etc/apt/sources.list.d/next-hat.list > /dev/null
   ```
4. Update the `apt` package index, and install the _latest version_ of Nanocl

   ```console
   $ sudo apt-get update
   $ sudo apt-get install nanocl nanocld -y
   ```

   > Receiving a GPG error when running `apt-get update`? Your default umask may
   > not be set correctly, causing the public key file for the repo to not be
   > detected.</br> Run the following command and then try to update your repo
   > again:</br> `sudo chmod a+r /etc/apt/keyrings/next-hat.gpg`
