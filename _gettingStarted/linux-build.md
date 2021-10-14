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
Additionally, 

### Installing the requirements
You can install all the tools mentioned above with command:
``` sh
apt-get install flex \
  bison \
  libreadline-dev \
  zlib1g-dev \
  build-essential \
  libxml2-dev \
  libossp-uuid-dev \
  icu-devtools \
  --yes
```

The build-essential package contains a GNU C++ compiler along with `make`.

### Configuring the source tree

Before compiling the source code we need to configure the build. To do that we 
 need to run `configure` script:
``` sh
./configure --with-libxml --with-uuid=ossp --with-icu
```
The above would configure the installation path under `/usr/local/pgsql`, if you 
 want to change the installation directory you can use the `prefix` flag. Therefore, if you want to change the path to `/usr/local/pgsql-13.4`, you can run the configure script as it follows.

 ``` sh
 ./configure --prefix=/usr/local/pgsql-13.4 --with-libxml --with-uuid=ossp --with-icu 
 ```

### Compiling the source code
Now that we have configured the source tree, we can build Babelfish with the 
 following command:

``` sh
make
```

### Installing Babelfish
To install Babelfish we just need to run the command:
``` sh
make install
```