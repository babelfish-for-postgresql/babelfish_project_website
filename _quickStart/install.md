---
layout: default
title: Installation
nav_order: 12
has_children: false
permalink: /docs/quick-start/installation
---

In order to install Babelfish we need to get the sources of PostgreSQL. To do that let's run the following command:

``` sh
wget https://ftp.postgresql.org/pub/source/v13.4/postgresql-13.4.tar.gz
```
  
Now lets unpack them:
``` sh
tar -xzvf postgresql-13.4.tar.gz
```

Now you should have directory name postgresql-13.4, let's enter:
``` sh
cd postgresql-13.4
```

## Applying the Babelfish patch

In order to support the TDS protocol, Babelfish must enable an aditional port, this way we can use both PostgreSQL, TDS 
 protocols. 

At the moment of this writing, PostgreSQL doesn't have a way for extensions to add new protocols. Nonetheless, Babelfish have 
 developmed this feature for Postgres, and hopefully it will be merged into PostgreSQL. In the meantime we can apply the Babelfish patch, so we can use the Babelfish extension. 

Let's down load the Babelfish patch:

``` sh
wget https://github.com/babelfish-for-postgresql/babelfish-internal-review/blob/main/babelfish_manfred_patch.txt \
  -P /tmp
```

Now in the Postgres source directory execute the following command:
``` sh
patch -p1 < /tmp/babelfish_manfred_patch.txt
```

## Configuring babelfish installation

To install Babelfish we need to configure the directory in 
 which we want to install the abelfish binaries. In this guide 
 we will install it on /usr/local/pgsql-13.4, but you can 
 change it if you like:

``` sh
./configure --prefix=/usr/local/pgsql-13.4
```
Now, we have everything set up to compile postgres. Let's build it with the following command:

``` sh
make
```

This would take a few minutes, and promt a lot of messages. 

For security reasons, It is recommended that you run postgres with a custom user, 
 so let's create an user for postgres. 

``` sh
sudo adduser postgres
```

Now let's create the target directory, since `/usr/local` is owned by root we 
 will need root access to create the directory: `/usr/local/pgsql-13.4`

``` sh
sudo mkdir /usr/local/pgsql-13.4
```

In order to store the binaries in `/usr/local/pgsql-13.4` we should change the 
 owner of this directory to postgres:

``` sh
sudo chown postgres:postgres /usr/local/pgsql-13.4
```
Now we the postgres user we can install Babelfish by running: 

``` sh
sudo su postgres
make install
```

We have Babelfish installed, let's check the installation by 
 starting Babelfish. 
First, we need to initialize our data directory:

``` sh
cd /usr/local/pgsql-13.4/bin
./initdb --pgdata=/usr/local/pgsql-13.4/data --encoding=UTF8
```

Now we can start Babelfish by running:
``` sh
./pg_ctl -D /usr/local/pgsql-13.4/data start
```

We can connect to Babelfish by simply running: 

./psql

We can check the postgres version by simply running:
``` sql
 select version();
```

The output should look something like this:
``` sh
psql (13.4)
Type "help" for help.

postgres=# select version();
                                               version                                               
-----------------------------------------------------------------------------------------------------
 PostgreSQL 13.4 on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0, 64-bit
(1 row)

```

Now we can stop Babelfish:
``` sh
./pg_ctl -D /usr/local/pgsql-13.4/data start
```
