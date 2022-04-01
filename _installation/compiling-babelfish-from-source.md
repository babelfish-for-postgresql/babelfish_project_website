---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---

# Compiling Babelfish from source

This section will walk you through the steps required to create a working Babelfish installation on an Ubuntu 20.04 Linux host. Please note that the steps may vary on other operating systems, but the overall process is roughly the same.

The current installation steps are for the release tarballs at [FIXME!], which combines the following repositories, and with some minor
changes to enhace the compilation process:

- the [PostgreSQL database engine](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish) source code, with changes that provide the protocols, language parsers, and features required by Babelfish. 
- the [extensions](https://github.com/babelfish-for-postgresql/babelfish_extensions) that support the T-SQL protocol, the T-SQL language, the TDS Protocol, and so on.

## Downloading the source code

Before building Babelfish, you will need to download the tarballs.  Babelfish source code is stored in the following repositories: 

- [PostgreSQL for Babelfish 13.5](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish/tree/BABEL_1_1_0__PG_13_5)
- [Babelfish 1.1.0 Extensions](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_1_0)

The installation the instructions are at in the extensions' [contrib/README.md](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_1_0/contrib/README.md).

> Note for [Babelfish 1.0.0](https://github.com/babelfish-for-postgresql/babelfish_extensions/releases/tag/BABEL_1_0_0): keep in mind that it uses ANTLR 4.9.2,
> but tarballs use 4.9.3. 

## Installation with tarballs

## Prerequisites

Many of the Babelfish prerequisites are part of a typical Linux distribution.  You may find that the packages on your distribution use a similar (but not identical) name.  To build Babelfish, you will need access to a user with root privileges, so you can convey privileges with `sudo`. 

You will also need a non-root user named (in our examples) 'postgres':

``` sh
sudo adduser postgres
```

Create the folder in the `postgres` home directory. You can customize the location, but keep in mind to 
change `PG_SRC` accordingly later on:

```sh
su - postgres
mkdir -p /home/postgres/work/postgresql_modified_for_babelfish/
cd /home/postgres/work/postgresql_modified_for_babelfish/
```

FIXME! -- This folders are inherited from the CI.

Get the tarballs and uncompress:

``` sh
curl FIXME! /home/postgres/work/postgresql_modified_for_babelfish/
unzip -d FIXME! 
```


Add the key and location of the Microsoft apt repository to your local system:

``` sh
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add - &&  \
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list
```

Then, install the prerequisite software:

``` sh
sudo apt-get update && sudo apt install -y --no-install-recommends \
  build-essential \
  flex \
  libxml2-dev \
  libxml2-utils \
  libxslt-dev \
  libssl-dev \
  libreadline-dev \
  zlib1g-dev \
  libldap2-dev \
  libpam0g-dev \
  gettext \
  uuid \
  uuid-dev \
  cmake \
  lld \
  apt-utils \
  libossp-uuid-dev \
  gnulib \
  bison \
  xsltproc \
  icu-devtools \
  libicu66 \
  libicu-dev \
  gawk \
  curl \
  openjdk-8-jre \
  openssl \
  g++ \
  libssl-dev \
  python-dev \
  libpq-dev \
  pkg-config \
  unzip \
  libutfcpp-dev \
  gnupg \
  mssql-tools \
  unixodbc-dev
```

Then, add the installation path to your $PATH environment variable. You may want to add this into your shell's profile (e.g. `$HOME/.profile`):

```sh
export PATH=/opt/mssql-tools/bin:$PATH
```


## Copy the ANTLR files into place

The [Antlr 4.9.3 Runtime](https://www.antlr.org/) files are distributed with the Babelfish source code.  Use the following commands to copy the files into place:

```sh
cd contrib/babelfishpg_tsql/antlr/thirdparty/antlr/
sudo cp antlr-${ANTLR4_VERSION}-complete.jar /usr/local/lib
```


## Compile ANTLR

Define the following variables in your environment:

```sh
export ANTLR4_VERSION=4.9.3
export ANTLR4_JAVA_BIN=/usr/bin/java
export ANTLR4_RUNTIME_LIBRARIES=/usr/include/antlr4-runtime
export ANTLR_EXECUTABLE=/usr/local/lib/antlr-${ANTLR4_VERSION}-complete.jar
export ANTLR_RUNTIME=../antlr4
```

After copying the ANTLR .jar files into place, compile ANTLR: 

```sh
cd ..
  wget http://www.antlr.org/download/antlr4-cpp-runtime-${ANTLR4_VERSION}-source.zip
  unzip -d antlr4 antlr4-cpp-runtime-${ANTLR4_VERSION}-source.zip 
  cd antlr4
  mkdir build && cd build 
  cmake .. -D ANTLR_JAR_LOCATION=/usr/local/lib/antlr-${ANTLR4_VERSION}-complete.jar -DCMAKE_INSTALL_PREFIX=/usr/local -DWITH_DEMO=True
  make -j 4
  sudo make install
```


## Build PostgreSQL

The version of PostgreSQL that is distributed with Babelfish includes hooks that allow Babelfish to implement behaviors.  Babelfish will not work with PostgreSQL distributions from other sources.  Use the following commands to configure the build environment, and build the Babelfish PostgreSQL distribution: 

```sh
./configure CFLAGS="-ggdb" \
  --prefix=$HOME/postgres/ \
  --enable-debug \
  --with-ldap \
  --with-libxml \
  --with-pam \
  --with-uuid=ossp \
  --enable-nls \
  --with-libxslt \
  --with-icu \
  --with-extra-version=" Babelfish for PostgreSQL"
          
make clean && make DESTDIR=~/postgres/ -j 4 2>error.txt
          
sudo make install
```

## Export variables to the environment

```sh
export PG_SRC=/home/postgres/work/postgresql_modified_for_babelfish/postgresql_modified_for_babelfish/
export PG_CONFIG=~/postgres/bin/pg_config
```

## Compile the ANTLR parser generator 

Use the following commands to compile the ANTLR parser generator and copy the runtime to the PostgreSQL library location:

``` sh
cmake=$(which cmake)
          
sudo cp /usr/local/lib/libantlr4-runtime.so.${ANTLR4_VERSION} ~/postgres/lib
           
cd ${PG_SRC}/contrib/babelfishpg_tsql/antlr 
cmake -Wno-dev .
``` 


## Compile the Babelfish extensions

Use the following commands to compile the ANTLR parser generator and copy the runtime to the PostgreSQL library location:

``` sh
cmake=$(which cmake)
          
cd $PG_SRC/contrib/ && make && sudo make install 
``` 


## Install the Babelfish extensions

Use the following commands to initialize the database and install the Babelfish extensions:

FIXME - Does this create a single-mode cluster?  If so, we should probably offer an alternative that creates a multi-mode cluster?

``` sh
cd ~
sudo chown -R postgres: ~/postgres
~/postgres/bin/initdb -D ~/postgres/data/ -E "UTF8"
~/postgres/bin/pg_ctl -D ~/postgres/data/ -l logfile start
cd postgres/data

```
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" postgresql.conf
sudo sed -i "s/#shared_preload_libraries = ''/shared_preload_libraries = 'babelfishpg_tds'/g" postgresql.conf
sed -i -e "\$ababelfishpg_tds.listen_addresses = '*'"  postgresql.conf
```

```
ipaddress=$(ifconfig eth0 | grep 'inet ' | cut -d: -f2 | awk '{ print $2}')
sudo echo "host    all             all             $ipaddress/32            trust" >> pg_hba.conf
```

```sh
~/postgres/bin/pg_ctl -D ~/postgres/data/ -l logfile restart
```


```sh
sudo ~/postgres/bin/psql -d postgres -U postgres -c "CREATE USER babelfish_user WITH SUPERUSER CREATEDB CREATEROLE PASSWORD '12345678' INHERIT;"
sudo ~/postgres/bin/psql -d postgres -U postgres -c "DROP DATABASE IF EXISTS babelfish_db;"
sudo ~/postgres/bin/psql -d postgres -U postgres -c "CREATE DATABASE babelfish_db OWNER babelfish_user;"
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "set allow_system_table_mods = on;"
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "CREATE EXTENSION IF NOT EXISTS "babelfishpg_tds" CASCADE;"
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "GRANT ALL ON SCHEMA sys to babelfish_user;"
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "ALTER USER babelfish_user CREATEDB;"
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "ALTER SYSTEM SET babelfishpg_tsql.database_name = 'babelfish_db';"
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "ALTER SYSTEM SET babelfishpg_tds.set_db_session_property = true;"
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "SELECT pg_reload_conf();"
```

By default, the `migration_mode` is `single`. You can change this with the following command:

```sh
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "ALTER DATABASE babelfish_db SET babelfishpg_tsql.migration_mode = 'multi-db';"
```

For more information about the `migration_mode`, read the [Accessing Data in Postgres](https://babelfishpg.org/docs/usage/migration/#accessing-the-data-in-postgresql) section.


```
sudo ~/postgres/bin/psql -d babelfish_db -U postgres -c "CALL sys.initialize_babelfish('babelfish_user');"
sqlcmd -S localhost -U babelfish_user -P 12345678 -Q "SELECT @@version GO"
```


