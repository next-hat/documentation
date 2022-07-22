# From sources

## Linux

Install rustlang

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Clone the reposiory

```bash
git clone https://github.com/leon3s/nanocl
cd nanocl
```

Install ubuntu dependencies

```bash
sudo sh ./scripts/ubuntu.deps.sh
cargo make release
```

for other linux distro refer to the package name and install it with your the
correct package manager / name and if you can make a pr to update the doc it
would be greate you can see what package is needed by looking into the script

```bash
cat ./scripts/ubuntu.deps.sh
```

Then you need to install rust dependencies

```bash
sh ./scripts/rust.deps.sh
```

Finally you can build from sources

```bash
sh ./scripts/release_nanocl.sh
sh ./scripts/release_nanocld.sh
```

You will find a .dep package inside `target/debian` folder or release binary in
`target/release` folder.
