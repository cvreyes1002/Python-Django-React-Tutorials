FROM ubuntu:26.04

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update repository and install Apache along with PHP and common extensions
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-cli \
    php-mysql \
    php-xml \
    php-curl \
    php-mbstring \
    php-zip \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache modules if necessary
RUN a2enmod rewrite

# Set working directory to the Apache web root
WORKDIR /var/www/html

# Remove default dummy index.html and copy your web application files
# RUN rm -f index.html
# COPY ./src /var/www/html

# Configure Apache to run in the foreground (required for Docker containers)
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]