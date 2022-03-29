---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---

# Compiling Babelfish from source

This section will walk you through the steps required to create a working Babelfish installation on an Ubuntu 20.04 Linux host. Please note that the steps may vary on other operating systems, but the overall process is roughly the same. 


## Downloading the source code

Before building Babelfish, you will need to download the source code.  Babelfish source code is stored in the following repositories: FIXME-are_these_still_the_same_repo_names_?

- the [PostgreSQL database engine](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish) source code, with changes that provide the protocols, language parsers, and features required by Babelfish. 
- the [extensions](https://github.com/babelfish-for-postgresql/babelfish_extensions) that support the T-SQL protocol, the T-SQL language, the TDS Protocol, and so on.

FIXME - Do we need to ask the user to navigate into a specific directory location before invoking these commands so the build commands later in this page work?

If you have installed git, you can clone the repos with the following commands:

``` sh
git clone https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish.git
git clone https://github.com/babelfish-for-postgresql/babelfish_extensions.git
```

## Prerequisites

Many of the Babelfish prerequisites are part of a typical Linux distribution.  You may find that the packages on your distribution use a similar (but not identical) name.  To build Babelfish, you will need access to a user with root privileges, so you can convey privileges with `sudo`. 

FIXME - Do we need to create a user named 'runner'? If so:

You will also need a non-root user named (in our examples) 'runner':

``` sh
sudo adduser runner
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
  unixodbc-dev \
```

Then, add the installation path to your $PATH environment variable:

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


## Compile the ANTLR parser generator 

Use the following commands to compile the ANTLR parser generator and copy the runtime to the PostgreSQL library location:

``` sh
export ANTLR4_JAVA_BIN=/usr/bin/java
export ANTLR4_RUNTIME_LIBRARIES=/usr/include/antlr4-runtime
export ANTLR_EXECUTABLE=/usr/local/lib/antlr-${ANTLR4_VERSION}-complete.jar
export ANTLR_RUNTIME=../antlr4
export PG_SRC=/home/runner/work/postgresql_modified_for_babelfish/postgresql_modified_for_babelfish/
export PG_CONFIG=~/postgres/bin/pg_config

cmake=$(which cmake)
          
sudo cp /usr/local/lib/libantlr4-runtime.so.${ANTLR4_VERSION} ~/postgres/lib
           
cd ${PG_SRC}/contrib/babelfishpg_tsql/antlr 
cmake -Wno-dev .
``` 


## Compile the Babelfish extensions

Use the following commands to compile the ANTLR parser generator and copy the runtime to the PostgreSQL library location:

``` sh
export ANTLR4_JAVA_BIN=/usr/bin/java
export ANTLR4_RUNTIME_LIBRARIES=/usr/include/antlr4-runtime
export ANTLR_EXECUTABLE=/usr/local/lib/antlr-${ANTLR4_VERSION}-complete.jar
export ANTLR_RUNTIME=../antlr4
export PG_SRC=/home/runner/work/postgresql_modified_for_babelfish/postgresql_modified_for_babelfish/
export PG_CONFIG=~/postgres/bin/pg_config

cmake=$(which cmake)
          
cd $PG_SRC/contrib/ && make && sudo make install 
``` 


## Install the Babelfish extensions

Use the following commands to initialize the database and install the Babelfish extensions:

FIXME - Does this create a single-mode cluster?  If so, we should probably offer an alternative that creates a multi-mode cluster?

``` sh
cd ~
sudo chown -R runner: ~/postgres
~/postgres/bin/initdb -D ~/postgres/data/ -E "UTF8"
~/postgres/bin/pg_ctl -D ~/postgres/data/ -l logfile start
cd postgres/data
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" postgresql.conf
sudo sed -i "s/#shared_preload_libraries = ''/shared_preload_libraries = 'babelfishpg_tds'/g" postgresql.conf
ipaddress=$(ifconfig eth0 | grep 'inet ' | cut -d: -f2 | awk '{ print $2}')
sudo echo "host    all             all             $ipaddress/32            trust" >> pg_hba.conf
~/postgres/bin/pg_ctl -D ~/postgres/data/ -l logfile restart
sudo ~/postgres/bin/psql -d postgres -U runner -c "CREATE USER jdbc_user WITH SUPERUSER CREATEDB CREATEROLE PASSWORD '12345678' INHERIT;"
sudo ~/postgres/bin/psql -d postgres -U runner -c "DROP DATABASE IF EXISTS jdbc_testdb;"
sudo ~/postgres/bin/psql -d postgres -U runner -c "CREATE DATABASE jdbc_testdb OWNER jdbc_user;"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "set allow_system_table_mods = on;"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "CREATE EXTENSION IF NOT EXISTS "babelfishpg_tds" CASCADE;"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "GRANT ALL ON SCHEMA sys to jdbc_user;"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "ALTER USER jdbc_user CREATEDB;"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "ALTER SYSTEM SET babelfishpg_tsql.database_name = 'jdbc_testdb';"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "ALTER SYSTEM SET babelfishpg_tds.set_db_session_property = true;"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "SELECT pg_reload_conf();"
sudo ~/postgres/bin/psql -d jdbc_testdb -U runner -c "CALL sys.initialize_babelfish('jdbc_user');"
sqlcmd -S localhost -U jdbc_user -P 12345678 -Q "SELECT @@version GO"
```


