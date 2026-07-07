FROM ubuntu:26.04

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# 1. Remove the dpkg configuration that drops man pages and documentation
RUN rm -f /etc/dpkg/dpkg.cfg.d/excludes

# 2. Update and pull down full system utilities, man-db, and core packages
RUN apt-get update && apt-get install -y \
    sudo \
    curl \
    git \
    vim \
    systemd \
    man-db \
    manpages \
    ubuntu-minimal \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 3. Reinstall core packages to restore their missing documentation and assets
RUN apt-get update && apt-get install -y --reinstall \
    coreutils \
    bash \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 4. Create user creyes
RUN userdel -r ubuntu && \
    useradd -m -u 1000 -s /bin/bash creyes && \
    usermod -aG sudo creyes && \
    echo 'creyes:abcd' | chpasswd

# 5. Switch to the non-root user
USER creyes
WORKDIR /home/creyes

# Set the default command to bash
CMD ["/bin/bash"]
