FROM php:8.2-fpm
# --- Enable the following if using Laravel Vite ---
EXPOSE 5173
COPY php.ini /usr/local/etc/php/

# Add user for rootless container
ARG UID=1000
ARG GID=1000
RUN useradd -m -u ${UID} docker

RUN apt-get update \
  && apt-get install -y zlib1g-dev mariadb-client vim libzip-dev unzip \
  && docker-php-ext-install zip pdo_mysql

#Composer install
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# Instaill Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g

# Set the user UID and theuser group GID added above
USER ${UID}:${GID}

WORKDIR /project
