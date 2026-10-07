FROM ubuntu:26.04

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install Apache, PHP, and common extensions
RUN apt-get update && apt-get install -y \
    apache2 \
    curl \
    php \
    libapache2-mod-php \
    php-cli \
    php-mbstring \
    php-xml \
    php-zip \
    php-gd \
    php-curl \
    php-mysql \
    && rm -rf /var/lib/apt/lists/*

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable Apache rewrite module
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy project files into the container
COPY . /var/www/html

# Expose Apache port
EXPOSE 80

# Start Apache in the foreground
CMD ["apachectl", "-D", "FOREGROUND"]
