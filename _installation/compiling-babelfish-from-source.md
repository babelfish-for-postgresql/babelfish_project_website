---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---

# Compiling Babelfish from distribution tarballs

This section will walk you through the steps required to create a working Babelfish installation on an Ubuntu 20.04 Linux host. Please note that the steps may vary on other operating systems, but the overall process is roughly the same.

The current installation steps are for the release tarballs at [FIXME!], which combines the following repositories, and with some minor
changes to enhace the compilation process:

- the [PostgreSQL database engine](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish) source code, with changes that provide the protocols, language parsers, and features required by Babelfish. 
- the [extensions](https://github.com/babelfish-for-postgresql/babelfish_extensions) that support the T-SQL protocol, the T-SQL language, the TDS Protocol, and so on.

## Compiling Babelfish for Development

For building Babelfish for development, you'll need to clone the following repositories: 

- [PostgreSQL for Babelfish 13.5](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish/tree/BABEL_1_1_0__PG_13_5)
- [Babelfish 1.1.0 Extensions](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_1_0)

The compilation and installation instructions are at in the extensions' [contrib/README.md](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_1_0/contrib/README.md).

> Note for [Babelfish 1.0.0](https://github.com/babelfish-for-postgresql/babelfish_extensions/releases/tag/BABEL_1_0_0): keep in mind that it uses ANTLR 4.9.2,
> but tarballs use 4.9.3. 

## Prerequisites

### Hardware and Specs

The current installation instructions were tested using `t4g.large`, `t4.large`, and `c6g.xlarge` as hardware specs.

Also, it has been used [ami-0fb653ca2d3203ac1 for amd64](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#Images:visibility=public-images;imageId=ami-0fb653ca2d3203ac1), and [ami-02af65b2d1ebdfafc for arm64](https://us-east-2.console.aws.amazon.com/ec2/v2/home?region=us-east-2#Images:visibility=public-images;imageId=ami-02af65b2d1ebdfafc).

For compiling Babelfish, you should have at least 4GB of available memory.

### Required Software

Install the following dependencies:

```
sudo apt-get update && sudo apt install -y --no-install-recommends \
  build-essential flex libxml2-dev libxml2-utils \
  libxslt-dev libssl-dev libreadline-dev zlib1g-dev \
  libldap2-dev libpam0g-dev gettext uuid uuid-dev \
  cmake lld apt-utils libossp-uuid-dev gnulib bison \
  xsltproc icu-devtools libicu66 \
  libicu-dev gawk \
  curl openjdk-8-jre openssl \
  g++ libssl-dev python-dev libpq-dev \
  pkg-config unzip libutfcpp-dev \
  gnupg unixodbc-dev
```

### Download the distribution tarballs

Many of the Babelfish prerequisites are part of a typical Linux distribution.  You may find that the packages on your distribution use a similar (but not identical) name.  To build Babelfish, you will need access to a user with root privileges, so you can convey privileges with `sudo`. 

You'll also need a non-root user for the compilation and installation process. In this example, the 'postgres' user will be used:

FIXME! We need the links of the tarball tags

```sh
curl -L https://github.com/ongres/postgresql_modified_for_babelfish/archive/refs/tags/BABEL_1_1_0__PG_13_5__RC3.zip -o BABEL_1_1_0__PG_13_5__RC3.zip
unzip BABEL_1_1_0__PG_13_5__RC3.zip
``` 

Once the tarball is unzipped, it will create a folder named `postgresql_modified_for_babelfish-<tag-name>/`. We'll export
this directory into the `PG_SRC` variable.

```sh
export PG_SRC=$HOME/postgresql_modified_for_babelfish-BABEL_1_1_0__PG_13_5__RC3
```

### Compile ANTLR 4

Unfortunately, there are [no prebuilt C++ binaries for 4.9.3 runtime version](https://www.antlr.org/download.html) for Linux. It 
is necessary to compile and install accordingly.

Define the following variables in your environment:

```sh
export ANTLR4_VERSION=4.9.3
export ANTLR4_JAVA_BIN=/usr/bin/java
export ANTLR4_RUNTIME_LIBRARIES=/usr/include/antlr4-runtime
export ANTLR_EXECUTABLE=/usr/local/lib/antlr-${ANTLR4_VERSION}-complete.jar
export ANTLR_RUNTIME=../antlr4
```

The [Antlr 4.9.3 Runtime](https://www.antlr.org/) files are distributed with the Babelfish source code.  Use the following commands to copy the files into place:

```sh
sudo cp ${PG_SRC}/contrib/babelfishpg_tsql/antlr/thirdparty/antlr/antlr-${ANTLR4_VERSION}-complete.jar /usr/local/lib
```

After copying the ANTLR .jar files into place, compile ANTLR: 

```sh
wget http://www.antlr.org/download/antlr4-cpp-runtime-${ANTLR4_VERSION}-source.zip
unzip -d antlr4 antlr4-cpp-runtime-${ANTLR4_VERSION}-source.zip 
cd antlr4
mkdir build && cd build 
cmake .. -D ANTLR_JAR_LOCATION=/usr/local/lib/antlr-${ANTLR4_VERSION}-complete.jar -DCMAKE_INSTALL_PREFIX=/usr/local -DWITH_DEMO=True
make -j 4
sudo make install
```

## Build modified PostgreSQL for Babelfish

The version of PostgreSQL that is distributed with Babelfish includes hooks that allow Babelfish to implement behaviors.  Babelfish will not work with PostgreSQL distributions from other sources.  Use the following commands to configure the build environment, and build the Babelfish PostgreSQL distribution: 

```sh
cd ${PG_SRC}

./configure CFLAGS="-ggdb" \
  --prefix=/opt/babelfish/1.1/ \
  --enable-debug \
  --with-ldap \
  --with-libxml \
  --with-pam \
  --with-uuid=ossp \
  --enable-nls \
  --with-libxslt \
  --with-icu \
  --with-extra-version=" Babelfish for PostgreSQL"
          
make clean && make DESTDIR=/opt/babelfish/1.1/ -j 4 2>error.txt
          
sudo make install
```

Export `PG_CONFIG` variable:

```sh
export PG_CONFIG=/opt/babelfish/1.1/bin/pg_config
```

> NOTICE: this step is going to be deprecated in future versions.

### Compile the ANTLR parser generator 

Use the following commands to compile the ANTLR parser generator and copy the runtime to the PostgreSQL library location:

``` sh
export cmake=$(which cmake)
          
sudo cp /usr/local/lib/libantlr4-runtime.so.${ANTLR4_VERSION} /opt/babelfish/1.1/lib
           
cd ${PG_SRC}/contrib/babelfishpg_tsql/antlr 
cmake -Wno-dev .
``` 

> NOTICE: this step is going to be deprecated in future versions.

### Compile the built-in contrib and Babelfish extensions

Now, it is time to compile and install the contrib. This is going to install all the built-in extensions and the 
Babelfish required ones:

```sh
cd $PG_SRC/contrib/ && make -j 2 && sudo make install 
```

## Setting up the Postgres modified instance

The process of creating a new cluster directory, and start up is very similar to a Postgres community setup.
Use the following commands to initialize the database and install the Babelfish extensions:

```sh
sudo mkdir -p /var/lib/babelfish/1.1

sudo adduser postgres --home /var/lib/babelfish

sudo chown -R postgres: /opt/babelfish/
sudo chown -R postgres: /var/lib/babelfish/
```

Switch to the `postgres` user and start the cluster:

```sh
sudo su - postgres
```

If you're willing to do a local setup and test, you can create your data directory, and pass the authentication
methods as below for simplifying local network tests (`--auth-host=trust` should not be used for data-sensitive instances):

```sh
/opt/babelfish/1.1/bin/initdb -D /var/lib/babelfish/1.1/data/ -E "UTF8" --auth=trust --auth-host=trust --auth-local=trust
```

For a more granular access method setup, it is possible to do as following:

```sh
/opt/babelfish/1.1/bin/initdb -D /var/lib/babelfish/1.1/data/ -E "UTF8"
ipaddress=$(ifconfig eth0 | grep 'inet ' | cut -d: -f2 | awk '{ print $2}')
echo "host    all             all             $ipaddress/32            trust" >> /var/lib/babelfish/1.1/data/pg_hba.conf
```

### Configuring Postgres for Babelfish

The below configuration is the minimal required for starting the service:

```sh
cat << EOF >> /var/lib/babelfish/1.1/data/postgresql.conf

#------------------------------------------------------------------------------
# BABELFISH RELATED OPTIONS
# These are going to step over previous duplicated variables.
#------------------------------------------------------------------------------
listen_addresses = '*'
allow_system_table_mods = on
shared_preload_libraries = 'babelfishpg_tds'
babelfishpg_tds.listen_addresses = '*'
EOF

```

> For the extensions' variable references, go to [Configuring Babelfish](https://babelfishpg.org/docs/internals/configuration/)

Start the instance by:

```sh
/opt/babelfish/1.1/bin/pg_ctl -D /var/lib/babelfish/1.1/data/ -l logfile start
```

### Enabling extensions in the target database

Create the database on top of which the extensions will be installed:

```sh
/opt/babelfish/1.1/bin/psql -d postgres -U postgres -c "CREATE USER babelfish_user WITH SUPERUSER CREATEDB CREATEROLE PASSWORD '12345678' INHERIT;"
/opt/babelfish/1.1/bin/psql -d postgres -U postgres -c "DROP DATABASE IF EXISTS babelfish_db;"
/opt/babelfish/1.1/bin/psql -d postgres -U postgres -c "CREATE DATABASE babelfish_db OWNER babelfish_user;"
```

Connect to the target database, configure, and install the extensions:

```sh
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "CREATE EXTENSION IF NOT EXISTS "babelfishpg_tds" CASCADE;"
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "GRANT ALL ON SCHEMA sys to babelfish_user;"
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "ALTER USER babelfish_user CREATEDB;"
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "ALTER SYSTEM SET babelfishpg_tsql.database_name = 'babelfish_db';"
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "ALTER SYSTEM SET babelfishpg_tds.set_db_session_property = true;"
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "SELECT pg_reload_conf();"
```


By default, the `migration_mode` is `single-db`. You can change this behavior by issuing:

```sh
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "ALTER DATABASE babelfish_db SET babelfishpg_tsql.migration_mode = 'multi-db';"
```

> For more information about the `migration_mode`, read the [Accessing Data in Postgres](https://babelfishpg.org/docs/usage/migration/#accessing-the-data-in-postgresql) section.


Finally, we initialize the database by calling _sys.initialize_babelfish_:

```sh
/opt/babelfish/1.1/bin/psql -d babelfish_db -U postgres -c "CALL sys.initialize_babelfish('babelfish_user');"
```

## Connecting to the Babelfish Database through TDS port

For testing, we're going to use freetds command-line client, as it is present both in _x86_ and _arm64_ platforms:

- Installing the packages.

```sh
sudo apt install -y freetds-bin freetds-common
```

- Connecting with `tsql`.

```sh
$ tsql -H localhost -U babelfish_user -p 1433  -P 12345678 -D master
locale is "C.UTF-8"
locale charset is "UTF-8"
using default charset "UTF-8"
Setting master as default database in login packet
Changed database context to 'master'.
1> SELECT @@VERSION
2> GO
version
Babelfish for PostgreSQL with SQL Server Compatibility - 12.0.2000.8
Apr  5 2022 14:58:23
Copyright (c) Amazon Web Services
PostgreSQL 13.5 Babelfish for PostgreSQL on x86_64-pc-linux-gnu
(1 row affected)
```

- As a similtar e.g., the below command will access to the database through `sqlcmd` client:

```sh
sqlcmd -S localhost -U babelfish_user -P 12345678 
```

> `mssql-tools` does not have _arm64_ packages.
