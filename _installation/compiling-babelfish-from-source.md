---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---

# Compiling Babelfish from source

If you want to compile Babelfish on your own, you need to follow a couple of steps to
produce a working binary. In this section, we will describe how this works on
Linux (and thus UNIX-style systems in general). 


## Getting the source code

The first thing to do is to actually download the source code you want to build.
Babelfish is separated into two repositories, the first of them contains 
the PostgreSQL database engine, with some changes that enables the 
protocols, language parsers, and more features to be hooked into PostgreSQL that are required by Babelfish to work. 
The second one contains extensions to support the T-SQL protocol, the T-SQL language, the TDS Protocol, etc.

The Babelfish for PostgreSQL engine source code can be downloaded 
from [here](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish).

The Babelfish extensions source code can be downloaded 
from [here](https://github.com/babelfish-for-postgresql/babelfish_extensions).

If you have git installed, you can clone the repos with the following command:

``` sh
git clone https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish.git
git clone https://github.com/babelfish-for-postgresql/babelfish_extensions.git
```


## Preparing your system

To compile Babelfish, you have to make sure that a variety of software components
are available on your system. These packages should be part of every modern
Linux distribution, under similar - but not identical - names. 

Also keep in mind that you will need a user with root privileges, so that you are able to run commands with `sudo`

If you want to run more than just the bare version of Babelfish, we recommend
installing the following additional packages on top of the hard requirements listed
above.

- [Flex 2.6.4](https://github.com/westes/flex)
- [Libxml2](http://xmlsoft.org/) development libraries
- [Libxslt](http://www.xmlsoft.org/libxslt/) development libraries
- [xsltproc](http://xmlsoft.org/XSLT/xsltproc2.html)
- [Open SSL](https://www.openssl.org/) development libraries
- [Readline](https://tiswww.cwru.edu/php/chet/readline/rltop.html) development libraries
- [Zlib](https://zlib.net/)
- [OpenLDAP](https://www.openldap.org/) development libraries
- [Linux-PAM](http://www.linux-pam.org/) development libraries
- [OSSP uuid](http://www.ossp.org/pkg/lib/uuid/) development libraries
- [LLVM-based linker](https://lld.llvm.org/)
- [pkg-config](https://linux.die.net/man/1/pkg-config)
- [Gnulib](https://www.gnu.org/software/gnulib/)
- [ICU](https://icu.unicode.org/) development libraries
- [Gawk](https://www.gnu.org/software/gawk/)
- [Bison 3.0.5 or higher](https://www.gnu.org/software/bison/)

If you happen to use Debian or Ubuntu, you might want to use the following
commands to install dependencies:

``` sh
sudo apt install -y build-essential flex libxml2-dev libxslt-dev libssl-dev
sudo apt install -y libreadline-dev zlib1g-dev libldap2-dev libpam0g-dev bison
sudo apt install -y uuid uuid-dev lld pkg-config libossp-uuid-dev gnulib
sudo apt install -y libxml2-utils xsltproc icu-devtools libicu66 libicu-dev gawk
```

## Compiling the code 

Before compiling the Babelfish for PostgreSQL source code, we need to configure the
build. To do that we need to run the `configure` script in the directory where you
have downloaded the Babelfish for PostgreSQL engine sources:

``` sh
./configure CFLAGS="${CFLAGS:--Wall -Wmissing-prototypes -Wpointer-arith -Wdeclaration-after-statement -Wendif-labels -Wmissing-format-attribute -Wformat-security -fno-strict-aliasing -fwrapv -fexcess-precision=standard -O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic}" \
  --enable-thread-safety \
  --enable-cassert \
  --enable-debug \
  --with-ldap \
  --with-python \
  --with-libxml \
  --with-pam \
  --with-uuid=ossp \
  --enable-nls \
  --with-libxslt \
  --with-icu \
  --with-python PYTHON=/usr/bin/python2.7 \
  --with-extra-version=" Babelfish for PostgreSQL"
``` 

The above would configure the installation path under `/usr/local/pgsql`; if
you want to change the installation directory, you can use the `prefix` flag.
Therefore, if you want to change the path to `/usr/local/pgsql-13.4`, you can
run the configure script as follows.
 

 ``` sh
 ./configure CFLAGS="${CFLAGS:--Wall -Wmissing-prototypes -Wpointer-arith -Wdeclaration-after-statement -Wendif-labels -Wmissing-format-attribute -Wformat-security -fno-strict-aliasing -fwrapv -fexcess-precision=standard -O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic}" \
  --prefix=/usr/local/pgsql-13.4 \
  --enable-thread-safety \
  --enable-cassert \
  --enable-debug \
  --with-ldap \
  --with-python \
  --with-libxml \
  --with-pam \
  --with-uuid=ossp \
  --enable-nls \
  --with-libxslt \
  --with-icu \
  --with-python PYTHON=/usr/bin/python2.7 \
  --with-extra-version=" Babelfish for PostgreSQL"
 ```

#### Building Babelfish for PostgreSQL engine

Now that we have configured the source tree, we can build Babelfish with the 
 following command:

``` sh
INSTALLATION_PATH=<the path you specified as prefix>
mkdir "$INSTALLATION_PATH"

make            # Compiles the Babefish for PostgreSQL engine
cd contrib 

make            # Compiles the PostgreSQL default extensions
cd ..

make install    # Installs the Babelfish for PostgreSQL engine
cd contrib

make install    # Installs the PostgreSQL default extensions
```

#### Building Babelfish Extensions

In order to build the extensions we would need to install some additional tools: 

##### Additional requied tools
- [Antlr 4.9.2 Runtime](https://www.antlr.org/)
- [Open Java 8](https://openjdk.java.net/)
- Unzip
- [libpq](https://www.postgresql.org/docs/13/libpq.html)
- [pkgconf](http://pkgconf.org/)
- libutfcpp development libraries
- [CMake 3.20.6](https://cmake.org/)

You can install most of these tools by running the command:

``` sh
sudo apt install -y openjdk-8-jre openssl python-dev libpq-dev pkgconf unzip libutfcpp-dev
```

For the CMake and Antlr4 Runtime, it's better to install it from the source code. 


##### Installing CMake

We can install CMake by running the following script:

``` sh
sudo curl -L https://github.com/Kitware/CMake/releases/download/v3.20.6/cmake-3.20.6-linux-x86_64.sh --output /opt/cmake-3.20.6-linux-x86_64.sh
sudo chmod +x /opt/cmake-3.20.6-linux-x86_64.sh 
sudo /opt/cmake-3.20.6-linux-x86_64.sh --prefix=/usr/local --skip-license
```


##### Installing Antlr4 runtime

To install the Antlr4 runtime, we need to have the Antlr4 .jar. Babelfish extensions source code includes this .jar in 
  the path `/contrib/babelfishpg_tsql/antlr/thirdparty/antlr`.

Keeping this in mind, we can install Antlr4 runtime by running:

``` sh
# Dowloads the compressed Antlr4 Runtime sources on /opt/antlr4-cpp-runtime-4.9.2-source.zip 
sudo curl https://www.antlr.org/download/antlr4-cpp-runtime-4.9.2-source.zip \
  --output /opt/antlr4-cpp-runtime-4.9.2-source.zip 

# Uncompress the source into /opt/antlr4
sudo unzip -d /opt/antlr4 /opt/antlr4-cpp-runtime-4.9.2-source.zip

sudo mkdir /opt/antlr4/build 
cd /opt/antlr4/build

EXTENSIONS_SOURCE_CODE_PATH="<the patch in which you downloaded the Babelfish extensions source code>"

# Generates the make files for the build
sudo cmake .. -DANTLR_JAR_LOCATION="$EXTENSIONS_SOURCE_CODE_PATH/contrib/babelfishpg_tsql/antlr/thirdparty/antlr/antlr-4.9.2-complete.jar" \
         -DCMAKE_INSTALL_PREFIX=/usr/local -DWITH_DEMO=True
# Compiles and install
make
sudo make install
```

Now that we have the antlr4 runtime installed, we need to copy the
`libantlr4-runtime.so.4.9.2` library into the installed Babelfish for PostgreSQL
engine libs folder. We can do that by running the following command:

``` sh
sudo cp /usr/local/lib/libantlr4-runtime.so.4.9.2 "$INSTALLATION_PATH/lib"
```


# Build and install the extensions

Now that we have all of the tools installed to build the Babelfish extension, we
need to configure some environment variables: 

- `PG_CONFIG`: should point to the location of the pg_config file in the
  Babelfish for PostgreSQL engine installation, in our case: `$INSTALLATION_PATH/bin/pg_config`.

- `PG_SRC`: should point to the location of the Babelfish for PostgreSQL engine
  source folder.

- `cmake`: should contain the path of the cmake binary

Supposing that you have installed the Babelfish for PostgreSQL engine in
`/usr/local/pgsql-13.4/`, you have downloaded the Babelfish for PostgreSQL engine
source code in `~/postgresql_modified_for_babelfish`, and cmake is installed in
`/usr/local/bin/cmake`, the environment variables set up would be like this:

``` sh
export PG_CONFIG=/usr/local/pgsql-13.4/bin/pg_config
export PG_SRC=$HOME/postgresql_modified_for_babelfish
export cmake=/usr/local/bin/cmake
```

Now we are all set to build the extensions. To do so, we need to go to the
contrib folder in the Babelfish extension source code, and then build the
extensions one by one. We do it with the following script:

``` sh
# Install babelfishpg_money extension
cd contrib/babelfishpg_money
make
sudo make install

# Install babelfishpg_common extension
cd ../babelfishpg_common
make 
sudo make install

# Install babelfishpg_tds extension
cd ../babelfishpg_tds
make 
sudo make install

# Installs the babelfishpg_tsql extension
cd ../babelfishpg_tsql
make 
sudo make install
```

Once all extensions have been compiled you can start PostgreSQL manually.
