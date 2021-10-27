---
layout: default
title: Using the command line
nav_order: 1
---

## Using the command line to work with Babelfish

Many people use MS Windows to connect to Babelfish. However, there is an 
ever-growing community which prefers to use the command line to work with the server.
Those users have two choices on Linux:

- sqlcmd: Using the MS SQL interface
- SSMS: SQL Server Management Studio
- tsql: Using the FreeTDS command line tool
- psql: Using an extended version of psql


### Using sqlcmd to connect to the DB cluster {#babelfish-connect-sqlcmd}

The most common way to connect to and interact with Babelfish
is with the SQL Server <code>sqlcmd</code> utility, as shown in the following.

```bash
sqlcmd -S host.sample.com,1433 -U PUT_USER_HERE -P PUT_PASSWORD_HERE -d PUT_DBNAME_HERE
```

Where:

- -S is the endpoint and port of the DB cluster.
- -U is the login name of the user.
- -P is the password associated with the user.
- -d is the name of your Babelfish database.


### Connecting with SSMS

The SQL Server Management Studio is an additional option to talk to Babelfish. 

In the following procedure, you connect to your Babelfish database by
using Microsoft SQL Server Management Studio (SSMS). You can use the
SSMS query editor to connect to a Babelfish database.

#### Start SSMS.

Open the Connect to Server dialog by doing one of the following:

-  Choose New Query.
-  If the Query Editor is open, choose Query, Connection, Connect.

Provide the following information for your database:

For Server type, choose Database Engine.

For Server name, enter the DNS name. For example, your server name
should look similar to the following.

```bashsql
    host.example.com,1433
```

For Authentication, choose SQL Server Authentication.

For Login, enter the user name that you chose to use when you created
your database.

For Password, enter the password that you chose when you created your
database.

Optionally, choose Options, and then choose the Connection Properties
tab.

For Connect to database, specify the name of the database to connect to,
and choose Connect.

If a message appears indicating that SSMS can't apply connection
strings, choose OK.



#### Limitations

Currently you can not connect using the SSMS Object Explorer.


### Using tsql to connect

Let us take a look at the FreeTDS version of things first. tsql is a command
line tool that is shipped as part of FreeTDS. It allows you to quickly connect
using your Linux terminal, and to easily interact with Babelfish (or any TDS
enabled data source).

Here is the syntax of the command line tool:

```bash
Usage: tsql [-a <appname>] [-S <server> | -H <hostname> -p <port>] -U <username> 
	[-P <password>] [-I <config file>] [-o <options>] [-t delim] [-r delim] [-D database]
  or:  tsql -C
  or:  tsql -L -H <hostname>
If -C is specified just print configuration and exit.
If -L is specified with a host name (-H) instances found are printed.
  -a  specify application name
  -S  specify server entry in freetds.conf to connect
  -H  specify hostname to connect
  -p  specify port to connect to
  -U  specify username to use
  -P  specify password to use
  -D  specify database name to use
  -I  specify old configuration file (called interface) to use
  -J  specify character set to use
  -v  verbose mode
-o options:
	f	Do not print footer
	h	Do not print header
	t	Print time informations
	v	Print TDS version
	q	Quiet

	Delimiters can be multi-char strings appropriately escaped for your shell.
	Default column delimitor is <tab>; default row delimiter is <newline>
```

As you can see, the syntax is relatively easy and straightforward. 

If you want to see which compile time settings are available in your client
interface, use the -C flag as shown in the next listing:

```bash
[user@host]$ tsql -C
Compile-time settings (established with the "configure" script)
                            Version: freetds v1.1.20
             freetds.conf directory: /etc
     MS db-lib source compatibility: yes
        Sybase binary compatibility: yes
                      Thread safety: yes
                      iconv library: yes
                        TDS version: auto
                              iODBC: no
                           unixodbc: yes
              SSPI "trusted" logins: no
                           Kerberos: yes
                            OpenSSL: no
                             GnuTLS: yes
                               MARS: yes

```

Now that the syntax and the client settings are clear, we can easily connect to the server:

```bash
tsql -S database.example.com -p 1433 -U postgres -P secretpassword
```

A word of caution: The tsql binary allows you to send
the password as part of the command. This normally results in a security
problem. Fortunately, tsql replaces the command name so that the password is not
visible in the process table, as shown in the next listing:

```bash
 425705 pts/5    Ss     0:00  |   \_ bash
 426036 pts/5    S+     0:00  |   |   \_ tsql -H database.example..com -p 1433 -U postgres -P ************* -D postgres
```

If your connection has been established successfully, you should find yourself in
a command line:

```bash
1> SELECT 1+1
2> GO

2
(1 row affected)

1> SELECT 1+1 AS x UNION ALL SELECT 2+2
2> GO
x
2
4
(2 rows affected)
```

There are a couple of things worth mentioning here: First of all, we have to use
<code>GO</code> to make Babelfish execute the command. This is just like in standard MS SQL,
as well as in Sybase. But there is more, which might be alien to users
experienced with PostgreSQL: <code>SELECT 1+1</code> does not yield a column title, so to
ensure that a title is provided, we need to alias the column. You need to be aware
of such small details in order to ensure that the code written stays portable, and still
works with MS SQL as well as PostgreSQL.


### Using psql to connect

If you don't want to use tsql as your Linux command line interface, you can use a
modified version of psql which comes as part of the Babelfish package. Note:
This HAS to be the Babelfish version of psql - otherwise the following feature
will NOT work.

```bash
SET babelfishpg_tsql.sql_dialect = 'tsql';
\tsql on

INSERT INTO some_table VALUES (1);
GO
```

As you can see, the \\tsql setting will enable the MS SQL mode. You can now use 'GO' instead of a
semi-colon to start the execution of commands. psql can
therefore be abused as a command line client.

However, as stated before: This ONLY works with the Babelfish
incarnation of psql. The standard version of the client as shipped with
PostgreSQL does not have this feature and most likely never will.