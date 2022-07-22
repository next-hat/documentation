<h1 id="nxtmdoc-meta-title">Install Nanocl from sources</h1>

<blockquote class="tags">
 <strong>Tags</strong>
 </br>
 <span id="nxtmdoc-meta-keywords">
  documentation, installation, from sources
 </span>
</blockquote>

<p id="nxtmdoc-meta-description">
This section contains required procedures for installing Nanocl from sources.
</p>

## Linux

1.  Install rustlang

    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

2.  Clone the reposiory

    ```sh
    git clone https://github.com/nxthat/nanocl
    cd nanocl
    ```

3.  Install ubuntu dependencies

    ```sh
    sudo sh ./scripts/ubuntu.deps.sh
    ```

    for other linux distro refer to the package name and install it with your the
    correct package manager / name and if you can make a pr to update the doc it
    would be greate you can see what package is needed by looking into the script


4.  Then you need to install rust dependencies

    ```sh
    sh ./scripts/rust.deps.sh
    ```

5.  Finally you can build from sources

    ```sh
    sh ./scripts/release_nanocl.sh
    ```

    You will find a .dep package inside `target/debian` folder or release binary in
    `target/release` folder.
