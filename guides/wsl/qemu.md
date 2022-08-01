<h1 id="nxtmdoc-meta-title">Qemu KVM on wsl2</h1>

<blockquote class="tags">
 <strong>Tags</strong>
 </br>
 <span id="nxtmdoc-meta-keywords">
  documentation, guides, qemu, kvm, qemu-kvm, kernel, vm, virtualization
 </span>
</blockquote>

<p id="nxtmdoc-meta-description">
Build An Accelerated KVM Guest Custom Kernel for WSL 2.
Simpler guide for building a custom Linux kernel for WSL 2 optimized for running nested KVM guests.
</p>

<h2>Get the Microsoft WSL 2 kernel sources</h2>

1.  Ensure you have this tools installed before continue
    ```sh
    sudo apt install -y make jq aria2 bison flex libelf-dev pahole
    ```

2.  Download and unpack the latest kernel version
    ```sh
    curl -s https://api.github.com/repos/microsoft/WSL2-Linux-Kernel/releases/latest | jq -r '.name' | sed 's/$/.tar.gz/' | sed 's#^#https://github.com/microsoft/WSL2-Linux-Kernel/archive/refs/tags/#' | aria2c -i -
    tar -xf *.tar.gz
    ```

3.  Change to the kernel directory
    ```sh
    cd "$(find -type d -name "WSL2-Linux-Kernel-linux-msft-wsl-*")"
    ```

<h2>Tweak the Microsoft kernel<h2>

1.  Copy the default Microsoft kernel configuration
    ```sh
    cp Microsoft/config-wsl .config
    ```

2.  Tweak the default Microsoft kernel configuration for KVM guests
    ```sh
    sed -i 's/# CONFIG_KVM_GUEST is not set/CONFIG_KVM_GUEST=y/g' .config

    sed -i 's/# CONFIG_ARCH_CPUIDLE_HALTPOLL is not set/CONFIG_ARCH_CPUIDLE_HALTPOLL=y/g' .config

    sed -i 's/# CONFIG_HYPERV_IOMMU is not set/CONFIG_HYPERV_IOMMU=y/g' .config

    sed -i '/^# CONFIG_PARAVIRT_TIME_ACCOUNTING is not set/a CONFIG_PARAVIRT_CLOCK=y' .config

    sed -i '/^# CONFIG_CPU_IDLE_GOV_TEO is not set/a CONFIG_CPU_IDLE_GOV_HALTPOLL=y' .config

    sed -i '/^CONFIG_CPU_IDLE_GOV_HALTPOLL=y/a CONFIG_HALTPOLL_CPUIDLE=y' .config

    sed -i 's/CONFIG_HAVE_ARCH_KCSAN=y/CONFIG_HAVE_ARCH_KCSAN=n/g' .config

    sed -i '/^CONFIG_HAVE_ARCH_KCSAN=n/a CONFIG_KCSAN=n' .config
    ```

3.  Build the kernel
    ```sh
    make -j 8
    ```

<h2>Install your tweaked kernel</h2>

1.  Copy the built kernel to your Windows user's home folder
    ```sh
    powershell.exe /C 'Copy-Item .\arch\x86\boot\bzImage $env:USERPROFILE'
    ```

2.  Point to your custom kernel in .wslconfig
    ```sh
    powershell.exe /C 'Write-Output [wsl2]`nkernel=$env:USERPROFILE\bzImage | % {$_.replace("\","\\")} | Out-File $env:USERPROFILE\.wslconfig -encoding ASCII'
    ```

3.  Restart WSL
    Open a powershell and run
    ```powershell
    wsl.exe --shutdown
    ```

4.  Confirm you are booting your custom kernel
    ```powershell
    wsl uname -a
    ```

Congrats, your WSL 2 kernel is now optimized for KVM guests.
