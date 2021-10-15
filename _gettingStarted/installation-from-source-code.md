---
layout: default
title: Install from source code
nav_order: 1
has_children: false
permalink: /docs/gettingstarted/sourcecodebuild
---
# Compiling from source code

Babelfish can be installed by compiling its source code. 

## Requirements

Regardless of the OS that it's being used, there are three tools that are requiered to compile Babelfish, which are:

- [Bison](https://www.gnu.org/software/bison/)
- [Flex](https://github.com/westes/flex)
- [Python 2.7](https://www.python.org/downloads/release/python-2714/)
- [Libxml2](http://xmlsoft.org/)
- [OSSP uuid](http://www.ossp.org/pkg/lib/uuid/)
- A C compiler

### Recommended tools to install
Depending on which PostgreSQL features are needed to be enabled you would need to 
 install additional tools, but the following are recommended in all cases:

- readline: it's required to compile by default, but you can disable it by using 
 the flag `--without-readline`. Nonetheless, it recommended to install it because 
 it allows [psql](https://www.postgresql.org/docs/13/app-psql.html) to remember 
 the commands that you type, which it be very useful.
- zlib: it's required to compile by default, you can disable it by using the flag
 `--without-zlib`.  If is disabled, pg_dump and pg_restore will not be available. 

## Getting the source code
Babelfish is separated in two repos, the first of them containes the PostgreSQL database engine, with some changes 
 that enables the protocol hooks. The second one contains extensions to support the T-SQL prototcol, T-SQL Database, etc..

The Babelfish PostgreSQL engine can be downloaded from [here](https://github.com/babelfish-for-postgresql/babelfishpg-patch-for-postgresql). 

The Babelfish extensions can be downloaded from [here](https://github.com/babelfish-for-postgresql/babelfishpg-extensions-and-tests).

If you have git installed, you can clone the repos with the following command: 

``` sh
git clone https://github.com/babelfish-for-postgresql/babelfishpg-patch-for-postgresql.git
git clone https://github.com/babelfish-for-postgresql/babelfishpg-extensions-and-tests.git
```

## Installation from source code
Depending of your environment, the building procedure would be different. 

- [Installation from source code on Linux](linuxbuild)
- [Installation from source code on Windows](windowsbuild)