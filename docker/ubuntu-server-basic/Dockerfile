FROM ubuntu:26.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists and install basic utilities
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    iputils-ping \
    net-tools \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Create user creyes
RUN userdel -r ubuntu && \
    useradd -m -u 1000 -s /bin/bash creyes && \
    usermod -aG sudo creyes && \
    echo 'creyes:abcd' | chpasswd

# Switch to the non-root user
USER creyes
WORKDIR /home/creyes

# Set default command
CMD ["/bin/bash"]
