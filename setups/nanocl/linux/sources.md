<h1 id="nxtmdoc-meta-title">Install Nanocl from sources</h1>

<blockquote class="tags">
 <strong>Tags</strong>
 </br>
 <span id="nxtmdoc-meta-keywords">
  documentation, installation, from sources
 </span>
</blockquote>

<p id="nxtmdoc-meta-description">
This section contains required procedures for installing Nanocl from the source code.
</p>

<h2>daemon installation</h2> 

1.  Install rustlang

    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

2.  Clone the repository

    ```sh
    git clone https://github.com/nxthat/nanocld 
    cd nanocld
    ```

3.  Install Ubuntu dependencies, you might need to install gcc first

    ```sh
    sudo apt install gcc
    ```

    ```sh
    sudo sh ./scripts/ubuntu.deps.sh
    ```

    For other linux distros refer to the package name and install it with the
    correct package manager / name, in addition if you can make a PR to update the doc it
    would be great! You can see what package is needed by looking in the script


4.  Afterwards install rust dependencies
   
    ```sh
    sh ./scripts/rust.deps.sh
    ```

5.  Finally you can build from the source

    ```sh
    sh ./scripts/release_nanocld.sh
    ```

    You will find a .deb package inside `target/debian` folder or release binary in
    `target/release` folder.
    
6.  Install the .deb package 
 
    ```sh
    sudo dpkg -i ./target/debian/nanocld_0.1.1_amd64.deb
    ```
<h2>cli installation</h2>

1.  Clone the repository 

    ```sh
    git clone https://github.com/nxthat/nanocl
    cd nanocl
    ```
2.  Run the build script
    ```sh
    sh ./scripts/release_nanocl.sh
    ```



