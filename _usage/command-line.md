---
layout: default
title: Using the command line
nav_order: 1
---

## Using client tools to connect to Babelfish

Most people use SQL Server Management Studio (SSMS) or sqlcmd on Microsoft Windows to
connect to SQL Server, and therefore these should be able to connect to Babelfish as well.

However, there is an ever-growing community which prefers to use the command
line on Linux to connect to the server.
Those users have the following command-line tool choices on Linux:

- sqlcmd: Using the Microsoft SQL command-line utility
- tsql: Using the FreeTDS command line tool

Note that there is also a `psql` version for Babelfish, which connects to the 
PostgreSQL port and uses PG SQL. However, this version is not supported.




### Using sqlcmd to connect to the DB instance {#babelfish-connect-sqlcmd}

The most common way to connect to and interact with Babelfish
is with the SQL Server <code>sqlcmd</code> utility, as shown in the following.


```bash
sqlcmd -S host.sample.com,1433 -U PUT_USER_HERE -P PUT_PASSWORD_HERE -d PUT_DBNAME_HERE
```

Where:

- -S is the endpoint and port of the DB instance.
- -U is the login name of the user.
- -P is the password associated with the user.
- -d is the migrated SQL Server database (emulated inside the Babelfish DB).
- "1433" is the port typically used to check connectivity for SQL Server.

### Connecting with SSMS

SSMS is one of the most commonly used clients to connect to Babelfish.

In the following procedure, you connect to your Babelfish database by
using SSMS. You can use the SSMS query editor to connect to a Babelfish database.
Currently, you can not connect using the SSMS Object Explorer.

#### Start SSMS

1. Open the Connect to Server dialog by doing one of the following:

-  Choose New Query.
-  If the Query Editor is open, choose Query, Connection, Connect.

2. Provide the following information for your database:

- For Server type, choose **Database Engine**.

- For Server name, enter the DNS name. For example, your server name
should look similar to the following.

```bashsql
    host.example.com,1433
```

- For Authentication, choose **SQL Server Authentication**.

- For Login, enter the user name that you chose to use when you created
your database.

- For Password, enter the password corresponding to that user name.

- Optionally, choose Options, and then choose the **Connection Properties**
tab.

- For Connect to database, specify the name of the database to connect to,
and choose **Connect**.

3. If a message appears indicating that SSMS can't apply connection
strings, choose **OK**.



#### Limitations

As previously stated, currently you can not connect using the SSMS Object Explorer.


### Using tsql to connect

tsql is a command line tool that is shipped as part of FreeTDS. It allows you to connect
using your Linux terminal, and to interact with Babelfish (or any TDS
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

With these settings, we can connect to the server as follows:

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

There are a couple of things worth mentioning here: First of all, we need to use 'go'
or 'GO' as the batch delimiter to make sqlcmd send the preceding lines to the server, so
that Babelfish can execute the statements. This is just like with sqlcmd. An additional, important point which users
experienced with PostgreSQL might not be familiar with: <code>SELECT 1+1</code> does not yield a column title, so to
ensure that a title is provided, we need to alias the column. You need to be aware
of such small details in order to ensure that the code written stays portable, and still
works with Microsoft SQL Server as well as PostgreSQL.


### Using psql to connect

You can also use PostgreSQL's `psql` to connect to Babelfish. 
This connection is to the PG port (e.g. 5432 by default), and you will have to use
PG SQL syntax instead of T-SQL. The only thing that is strongly not recommended 
is to change the SQL dialect, but that is unrelated to psql itself.
Since this feature is aimed only at specific use cases for Babelfish developers, 
**using psql to connect is not supported and the behavior may be unpredictable**. 
It could potentially result in incorrect results or inconsistent database contents.


