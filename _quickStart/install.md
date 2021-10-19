---
layout: default
title: Installation
nav_order: 12
has_children: false
permalink: /docs/quick-start/installation
---

## Installing from Docker

The easiesy way to get Babelfish installed is by running it as Docker Container. 

By running the following command you can have a Babelfish node running:

``` sh
docker run --name babelfish  \
  -e POSTGRES_PASSWORD=secretbabelfishpassword \
  -d {{site.data.images[0].image}} \
  -p 5432:5432 \
  -p 1433:1433
```

After the above command completes Babelfish should be up and running. The port `5432` would listen for 
  FE/BE connections (PostgreSQL protocol) while `1433` whould listen for TDS conncetions (MSSQL Server protocol)

## Installing from source code

Babelfish can be installed by compiling its source code. 

### Requirements

Regardless of the OS that it's being used, there are three tools that are requiered to compile Babelfish, which are:

- [Bison](https://www.gnu.org/software/bison/)
- [Flex](https://github.com/westes/flex)
- [Python 2.7](https://www.python.org/downloads/release/python-2714/)
- [Libxml2](http://xmlsoft.org/)
- [OSSP uuid](http://www.ossp.org/pkg/lib/uuid/)
- A C compiler

#### Recommended tools to install
Depending on which PostgreSQL features are needed to be enabled you would need to 
 install additional tools, but the following are recommended in all cases:

- readline: it's required to compile by default, but you can disable it by using 
 the flag `--without-readline`. Nonetheless, it recommended to install it because 
 it allows [psql](https://www.postgresql.org/docs/13/app-psql.html) to remember 
 the commands that you type, which it be very useful.
- zlib: it's required to compile by default, you can disable it by using the flag
 `--without-zlib`.  If is disabled, pg_dump and pg_restore will not be available. 

### Getting the source code
Babelfish is separated in two repos, the first of them containes the PostgreSQL database engine, with some changes 
 that enables the protocol hooks. The second one contains extensions to support the T-SQL prototcol, T-SQL Database, etc..

The Babelfish PostgreSQL engine can be downloaded from [here](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish). 

The Babelfish extensions can be downloaded from [here](https://github.com/babelfish-for-postgresql/babelfish_extensions).

If you have git installed, you can clone the repos with the following command: 

``` sh
git clone https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish.git
git clone https://github.com/babelfish-for-postgresql/babelfish_extensions.git
```

## Installation from source code
Depending of your environment, the building procedure would be different. 

- [Installation from source code on Linux](#linux-installation)
- [Installation from source code on Windows](#windows-installation)


### Linux Installation
Intalling Babelfish on a linux system is very straigthforward, the steps in this 
  section are explained assuming that Ubuntu is being used. 

#### Requirements
Additionally, to the tools mentioned before there are some additional tools that we need to install
TODO: describe every package that is going to be installed

#### Installing the requirements
You can install the tools mentioned above but antlr4 with command:
``` sh
apt-get install flex \
  bison \
  libreadline-dev \
  zlib1g-dev \
  build-essential \
  libxml2-dev \
  libossp-uuid-dev \
  icu-devtools \
  libssl-dev \
  uuid-dev \
  pkgconf \
  postgresql-server-dev-all \
  libantlr4-runtime-dev \
  libantlr4-runtime4.7.2
  --yes
```

##### Installing antlr4 runtime

In order to build the Babeldish T-SQL extension with need to install antlr4 and its runtime environment. 

The first thing that we need to do is download antlr4 jar file and install it in `/usr/local/lib`: 

``` sh
cd /usr/local/lib
sudo wget http://www.antlr.org/download/antlr-4.7.2-complete.jar
```

Then, we need to create an executable script so we start antlr4 from everywhere, we can create 
 the script with the following command:

``` sh
cat << EOF > /usr/local/lib/antlr4 
#!/bin/bash
export CLASSPATH=".:/usr/local/lib/antlr-4.7.2-complete.jar:$CLASSPATH"
java -jar /usr/local/lib/antlr-4.7.2-complete.jar "$@"
EOF
```

We also need to give them execution permissions by executing:

``` sh
chmod +x /usr/local/lib/antlr4
```

###### Build antlr4 from source code. 
We need to download the antlr4 source code and compile it. To so, let's create a folder and download it there

``` sh
mkdir ~/antlr-src
cd ~/antlr-crd
wget http://www.antlr.org/download/antlr4-cpp-runtime-4.7.2-source.zip
unzip antlr4-cpp-runtime-4.7.2-source.zip
```

Now we to create a build folder and build and install antlr4 from there:
``` sh
mkdir build && cd build
## The following creates the makefiles
cmake .. -DANTLR_JAR_LOCATION=/usr/local/lib/antlr-4.7.2-complete.jar -DCMAKE_INSTALL_PREFIX=/usr/local -DWITH_DEMO=True 
make
sudo make install
```


#### Configuring the source tree

Before compiling the source code we need to configure the build. To do that we 
 need to run `configure` script:
``` sh
./configure --with-libxml --with-uuid=ossp --with-icu
```
The above would configure the installation path under `/usr/local/pgsql`, if you 
 want to change the installation directory you can use the `prefix` flag. Therefore, if you want to change the path to `/usr/local/pgsql-13.4`, you can run the configure script as it follows.

 ``` sh
 ./configure --prefix=/usr/local/pgsql-13.4  --with-libxml --with-uuid=ossp --with-icu 
 ```

#### Building Babelfish PostgreSQL engine
Now that we have configured the source tree, we can build Babelfish with the 
 following command:

``` sh
make
make install
```

#### Building Babelfish Extensions

Once that we have Babelfish PostgreSQL builded, we can build the Babelfish extensions. 

To do so, we need to configure some environment variables: 

- `PG_CONFIG`: should point to the location of the pg_config file in the Babelfish PostgreSQL Engine installation, in our case: `/usr/local/pgsql-13.4/bin/pg_config`

- `PG_SRC`: should point to the location of the Babelfish PostgreSQL engine source folder, something like: `~/babelfishpg-patch-for-postgresql/`


Now we have all set to build the extensions. To so, we need to go to the contrib folder in the Babelfish extension source code, and then build the 
extensions one by one. We do it with the following script:

``` sh
cd contrib/babelfishpg_money
make & make install
cd ../babelfishpg_common
make & make install
cd ../babelfishpg_tds
make & make install
cd ../babelfishpg_tsql
make & make install
```

### Windows Installation

#### Requirements
To be able to compile Babelfish on Windows. you would need to install:
- Visual Studio 2019. 
- ActiveState Perl
- libxml2
- libxslt
- iconv


##### Visual Studio 
You can download Visual Studio from [here](https://visualstudio.microsoft.com/). 

##### ActiveState Perl
You can download ActiveState Perl from [here](https://www.activestate.com/products/perl/).
 Make sure that the installer configures the binaries in the environment variable `PATH`

##### libxml, libxslt and inconv
You can download these 3 libraries from [here](https://zlatkovic.com/pub/libxml/). Take note of where did you extracted the libraries, because we will need them later.

#### Configuring the build
To be able to build Babelfish we need to configure the paths of the extra libraries that are required. 

To do that, go to the path src\tool\msvc, inside the Babelfish source code folder. 

Copy the file config_default.pl to create a new file named config.pl. 

Change the config.pl to add the paths of where you have extracted the libraries. 

Suppose that you have extracted the libraries in the following paths:

- libxml: D:\libxml2\libxml2-2.7.8.win32
- xstl: D:\libxslt\libxslt-1.1.26.win32
- iconv: D:\iconv\iconv-1.9.2.win32

The config.pl file should look something like these:

``` perl
# Configuration arguments for vcbuild.
use strict;
use warnings;

our $config = {
        asserts => 0,    # --enable-cassert

        # blocksize => 8,         # --with-blocksize, 8kB by default
        # wal_blocksize => 8,     # --with-wal-blocksize, 8kB by default
        ldap      => 1,        # --with-ldap
        extraver  => undef,    # --with-extra-version=<string>
        gss       => undef,    # --with-gssapi=<path>
        icu       => undef,    # --with-icu=<path>
        nls       => undef,    # --enable-nls=<path>
        tap_tests => undef,    # --enable-tap-tests
        tcl       => undef,    # --with-tcl=<path>
        perl      => undef,    # --with-perl=<path>
        python    => undef,    # --with-python=<path>
        openssl   => undef,    # --with-openssl=<path>
        uuid      => undef,    # --with-uuid=<path>
        xml       => 'D:\libxml2\libxml2-2.7.8.win32',    # --with-libxml=<path>
        xslt      => 'D:\libxslt\libxslt-1.1.26.win32',    # --with-libxslt=<path>
        iconv     => 'D:\iconv\iconv-1.9.2.win32',    # (not in configure, path to iconv)
        zlib      => undef     # --with-zlib=<path>
};

1;
```

#### Building Babelfish PostgreSQL Engine
Open the [Developer Command Prompt for VS 2019](https://docs.microsoft.com/en-gb/visualstudio/ide/reference/command-prompt-powershell?view=vs-2019). 
  It should be located in the path `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Visual Studio 2019\Visual Studio Tools`

In the command promt, navigate to the folder in which you downloaded the Babelfish 
code. Once there, go to the msvc folder with the command:

``` cmd
cd src\tools\msvc
```

Now you can build Babelfish by executing:
``` cmd
build
```

#### Installing Babelfish 

Once Babelfish is compiled, to install it we just need to run from the `src\tools\msvc` using the Developer Command Prompt, the following command:
``` cmd
install C:\destination\directory
```

TODO: Installing Babelfish extensions on windows