---
layout: default
title: Install from source code on Linux
nav_order: 2
has_children: false
permalink: /docs/gettingstarted/linuxbuild
---

## Linux installation
Intalling Babelfish on a linux system is very straigthforward, the steps in this 
  section are explained assuming that Ubuntu is being used. 

### Linux Requirements
Additionally, to the tools mentioned before there are some additional tools that we need to install
TODO: describe every package that is going to be installed

### Installing the requirements
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

#### Installing antlr4 runtime

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

##### Build antlr4 from source code. 
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


### Configuring the source tree

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

### Building Babelfish PostgreSQL engine
Now that we have configured the source tree, we can build Babelfish with the 
 following command:

``` sh
make
make install
```

### Building Babelfish Extensions

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