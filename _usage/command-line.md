---
layout: default
title: Connecting to Babelfish
nav_order: 1
---

## Using client tools to connect to Babelfish

You can use a SQL Server client to connect with Babelfish on the TDS port.
When connecting from a Windows system, SQL Server Management Studio (SSMS) or
`sqlcmd` are good choices of clients.  If you are connecting to the TDS port
from a Linux system, `sqlcmd` is a good choice.

Other clients that speak the TDS protocol can also be used, but are not
officially supported by Babelfish.  On Linux, these include the FreeTDS command
line tool `tsql`.

You can use any PostgreSQL client to connect to Babelfish on the PostgreSQL
port.  `psql` and pgAdmin are examples of open-source clients that run on
Windows and Linux platforms and speak the PostgreSQL protocol.


### Using `sqlcmd` to connect to the DB instance {#babelfish-connect-sqlcmd}

The most common way to connect to and interact with Babelfish
is with the SQL Server `sqlcmd` utility, as shown in the following.


```bash
sqlcmd -S host.sample.com,1433 -U PUT_USER_HERE -P PUT_PASSWORD_HERE -d PUT_DBNAME_HERE
```

Where:

- `-S` is the server name and port of the DB instance.
- `-U` is the login name of the user.
- `-P` is the password associated with the user.
- `-d` is the database that is selected initially.

After connecting with `sqlcmd`, you can use familiar T-SQL syntax to create and
manage database objects.

### Using SSMS to connect

SSMS is one of the most commonly used clients to connect to Babelfish.

In the following procedure, you connect to your Babelfish database by
using SSMS. You can use the SSMS query editor to connect to a Babelfish database.


>
> _You **can't currently connect using the SSMS Object Explorer**._
>

#### Connecting with SSMS

1. Open the Connect to Server dialog by doing one of the following:

   - Choose &ldquo;New Query&rdquo;.
   - If the Query Editor is open, choose &ldquo;Query&rdquo; &ndash;
     &ldquo;Connection&rdquo; &ndash; &ldquo;Connect&rdquo;.

2. Provide the following information for your database:

   - For &ldquo;Server type&rdquo;, choose &ldquo;Database Engine&rdquo;.

   - For &ldquo;Server name&rdquo;, enter the DNS name. For example, your server
     name should look similar to the following:

     ```none
     host.example.com,1433
     ```

   - For &ldquo;Authentication&rdquo;, choose &ldquo;SQL Server
     Authentication&rdquo;.

   - For &ldquo;Login&rdquo;, enter the user name that you chose to use when you
     created your database.

   - For &ldquo;Password&rdquo;, enter the password corresponding to that user name.

   - Optionally, choose &ldquo;Options&rdquo;, and then choose the
     &ldquo;Connection Properties&rdquo; tab.

   - For &ldquo;Connect to database&rdquo;, specify the name of the database
     to connect to, and choose &ldquo;Connect&rdquo;.

3. If a message appears indicating that SSMS can't apply connection
   strings, choose &ldquo;OK&rdquo;.


#### Limitations

As previously stated, currently you can not connect using the SSMS Object Explorer.


### Using `tsql` to connect

`tsql` is a command line tool that is shipped as part of FreeTDS. It allows you
to connect and to interact with Babelfish (or any other TDS enabled data source)
from your Linux terminal.

Here is an example how to connect to Babelfish with `tsql`:

```bash
tsql -S database.example.com -p 1433 -U postgres -P secretpassword
```

For information about using `tsql`, consult
[the FreeTDS documentation](https://www.freetds.org/userguide/).

Note that `tsql` is not officially supported.


### Using `psql` to connect

You can also use PostgreSQL's `psql` to connect to Babelfish.  `psql` has to
connect to the PostgreSQL port (by default 5432), and you will have to use
PostgreSQL SQL syntax instead of T-SQL.

Here is an example how to connect with `psql`:

```bash
psql -h database.example.com -p 5432 -U postgres -d dbname
```

Note that Babelfish ships with a modified version of `psql`, which is intended
for use by Babelfish development.  This version can produce incorrect results,
and should not be used in production.
