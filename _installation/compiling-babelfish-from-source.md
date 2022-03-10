---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---

# Compiling Babelfish from source

This section will walk you through the steps required to create a working Babelfish installation on Linux. 


## Downloading the source code

Before building Babelfish, you will need to download the source code.  Babelfish source code is separated into two repositories that contain:

- the [PostgreSQL database engine](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish) source code, with changes that provide the protocols, language parsers, and features required by Babelfish. 
- the [extensions](https://github.com/babelfish-for-postgresql/babelfish_extensions) that support the T-SQL protocol, the T-SQL language, the TDS Protocol, and so on.

If you have installed git, you can clone the repos with the following commands:

``` sh
git clone https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish.git
git clone https://github.com/babelfish-for-postgresql/babelfish_extensions.git
```

## Preparing your system

Most of the packages required to compile Babelfish are part of a typical Linux distribution.  You may find that the packages on your distribution use a similar (but not identical) name.  You will also need a user with root privileges, so you can convey privileges with `sudo`.

In addition, we recommend installing the following additional packages on top of the hard requirements listed above:

- [Flex 2.6.4](https://github.com/westes/flex)
- [Libxml2](http://xmlsoft.org/) development libraries
- [Open SSL](https://www.openssl.org/) development libraries
- [Readline](https://tiswww.cwru.edu/php/chet/readline/rltop.html) development libraries
- [Zlib](https://zlib.net/)
- [OSSP uuid](http://www.ossp.org/pkg/lib/uuid/) development libraries
- [pkg-config](https://linux.die.net/man/1/pkg-config)
- [ICU](https://icu.unicode.org/) development libraries
- [Bison 3.0.5 or higher](https://www.gnu.org/software/bison/)

If you use Debian or Ubuntu, you can use the following commands to install the development libraries:

``` sh
sudo apt install -y build-essential flex libxml2-dev bison libreadline-dev zlib1g-dev
sudo apt install -y uuid-dev pkg-config libossp-uuid-dev libssl-dev icu-devtools
```

## Compiling the code 

Before compiling the Babelfish for PostgreSQL source code, you will need to configure the
build.  Run the `configure` script in the directory where you have downloaded the Babelfish for PostgreSQL source code:

``` sh
./configure CFLAGS="-ggdb" \
  --enable-debug \
  --with-libxml \
  --with-uuid=ossp \
  --with-icu \
  --with-extra-version=" Babelfish for PostgreSQL"
``` 

The above commands configure the installation path under `/usr/local/pgsql`; to change the installation directory, you can include the `prefix` flag.  For example, to change the path to `/usr/local/pgsql-13.4`, you can
include the following options in the configure script:

 ``` sh
 ./configure CFLAGS="-ggdb" \
  --prefix=/usr/local/pgsql-13.4 \
  --enable-debug \
  --with-libxml \
  --with-uuid=ossp \
  --with-icu \
  --with-extra-version=" Babelfish for PostgreSQL"
 ```

#### Building Babelfish for PostgreSQL engine

After configuring the source tree, you need to configure the installation folder. 

``` sh
INSTALLATION_PATH=<the path you specified as prefix>
mkdir "$INSTALLATION_PATH"
```

To avoid installation errors, assume ownership of the installation directory. You can can change the 
 ownership of the installation path with the following command:

``` sh
sudo chown -R <your user>:<your group> "$INSTALLATION_PATH"
```

For example, if your installation path is `/usr/local/pgsql-13.4` and your user name is `johndoe`, 
 the command should be as follows:

``` sh
sudo chown -R johndoe:johndoe /usr/local/pgsql-13.4
```

Then, you can build Babelfish with the following commands:

``` sh
make            # Compiles the Babefish for PostgreSQL engine
cd contrib 

make            # Compiles the PostgreSQL default extensions
cd ..

make install    # Installs the Babelfish for PostgreSQL engine
cd contrib

make install    # Installs the PostgreSQL default extensions
```

#### Building Babelfish Extensions

To build the Babelfish extensions, you will need to install some additional tools: 

##### Additional required tools
- [Antlr 4.9.3 Runtime](https://www.antlr.org/)
- [Open Java 8](https://openjdk.java.net/)
- Unzip
- [pkgconf](http://pkgconf.org/)
- libutfcpp development libraries
- [CMake](https://cmake.org/)

You can use apt to install most of these tools with the following command:

``` sh
sudo apt install -y openjdk-8-jre unzip libutfcpp-dev cmake curl
```

##### Installing Antlr4 runtime

> For Antlr4 4.9.3 Runtime, there are no available binaries for C++ in Ubuntu Focal, so it's necessary to compile it from source. Versions below 4.9 have not been fully tested yet. 


To install the Antlr4 runtime, you will use the Antlr4 .jar file. The Babelfish extensions source code includes 
the .jar file in `/contrib/babelfishpg_tsql/antlr/thirdparty/antlr`.

You can install Antlr4 runtime by running the following commands:

``` sh
# Dowloads the compressed Antlr4 Runtime sources on /opt/antlr4-cpp-runtime-4.9.3-source.zip 
sudo curl https://www.antlr.org/download/antlr4-cpp-runtime-4.9.3-source.zip \
  --output /opt/antlr4-cpp-runtime-4.9.3-source.zip 


# Uncompress the source into /opt/antlr4
sudo unzip -d /opt/antlr4 /opt/antlr4-cpp-runtime-4.9.3-source.zip

sudo mkdir /opt/antlr4/build 
cd /opt/antlr4/build

EXTENSIONS_SOURCE_CODE_PATH="<the patch in which you downloaded the Babelfish extensions source code>"

# Generates the make files for the build
sudo cmake .. -DANTLR_JAR_LOCATION="$EXTENSIONS_SOURCE_CODE_PATH/contrib/babelfishpg_tsql/antlr/thirdparty/antlr/antlr-4.9.3-complete.jar" \
         -DCMAKE_INSTALL_PREFIX=/usr/local -DWITH_DEMO=True
# Compile and install
sudo make
sudo make install
```

Now that we have the antlr4 runtime installed, we need to copy the
`libantlr4-runtime.so.4.9.3` library into the installed Babelfish for PostgreSQL
engine libs folder. We can do that by running the following command:


``` sh
sudo cp /usr/local/lib/libantlr4-runtime.so.4.9.3 "$INSTALLATION_PATH/lib"
```


# Build and install the extensions

After installing the tools used to build the Babelfish extension, you will need to configure some environment variables: 

- `PG_CONFIG`: should point to the location of the pg_config file in the
  Babelfish for PostgreSQL engine installation; for our example: `$INSTALLATION_PATH/bin/pg_config`.

- `PG_SRC`: should point to the location of the Babelfish for PostgreSQL engine
  source folder.

- `cmake`: should contain the path of the cmake binary.

For example, if you have installed the Babelfish for PostgreSQL engine in
`/usr/local/pgsql-13.4/`, you have downloaded the Babelfish for PostgreSQL engine
source code in `~/postgresql_modified_for_babelfish`, and cmake is installed in
`/usr/local/bin/cmake`, you could use the following commands to set the environment variables:

``` sh
export PG_CONFIG=/usr/local/pgsql-13.4/bin/pg_config
export PG_SRC=$HOME/postgresql_modified_for_babelfish
export cmake=/usr/local/bin/cmake
```

Now you are ready to build the extensions. Go to the contrib folder in the Babelfish extension source code, and build the extensions one at a time. The following commands demonstrate building the extensions:

``` sh
# Install babelfishpg_money extension
cd contrib/babelfishpg_money
make
make install

# Install babelfishpg_common extension
cd ../babelfishpg_common
make 
make install

# Install babelfishpg_tds extension
cd ../babelfishpg_tds
make 
make install

# Installs the babelfishpg_tsql extension
cd ../babelfishpg_tsql
make 
make install
```

After all of the extensions have been compiled you can start PostgreSQL.

## Additional installation steps

Before starting Babelfish you will need to create a `data` directory, change ownership of the directory, and set configuration variables.  

First, create the data directory; in this example the directory name is `/usr/local/pgsql/data`:

``` sh
sudo mkdir -p /usr/local/pgsql/data
```

PostgreSQL won't start if the PostgreSQL owner has root access.  Create a user/owner named `postgres` that does not have root access:

``` sh
sudo adduser postgres
```

Change the ownership of the Babelfish binaries and the `data` directory to the new user (`postgres`).

``` sh
sudo chown -R postgres:postgres $INSTALLATION_PATH
sudo chown -R postgres:postgres /usr/local/pgsql/data
```

Then, use `sudo` and the `postgres` user to initialize the database directory:

``` sh
sudo su postgres
$INSTALLATION_PATH/bin/initdb -D /usr/local/pgsql/data
```

After initializing the `data` directory, modify the `postgresql.conf` file by uncommenting the following properties and setting values:

``` conf
listen_addresses = '*'
shared_preload_libraries = 'babelfishpg_tds'
```

Then,  you can start Babelfish with the command:

``` sh
$INSTALLATION_PATH/bin/pg_ctl -D /usr/local/pgsql/data start
```

Before using Babelfish, you will need to [choose a migration mode and create a Babelfish cluster](/docs/installation/single-multiple). 
