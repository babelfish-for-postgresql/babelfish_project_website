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

One way to connect to and interact with Babelfish is with the SQL Server `sqlcmd` utility. A Babelfish 
connection string takes the following form:

```bash
sqlcmd -S host.sample.com,1433 -U PUT_USER_HERE -P PUT_PASSWORD_HERE -d PUT_DBNAME_HERE
```

Where:

- `-S` is the server name and TDS port of the DB instance.
- `-U` is the login name of the user.
- `-P` is the password associated with the user.
- `-d` is the database to which you are connecting. This value is optional; if omitted, the client will 
connect to the `master` database.

After connecting, you can use familiar T-SQL syntax to create and manage database objects.

### Using SSMS to connect

SQL Server Management Studio (SSMS) is a commonly used SQL Server client. When loading SSMS, it 
may attempt to connect with the Object Explorer `Connect to Server` dialog box. If this dialog 
box opens by default, hit `Cancel`. Babelfish **only** supports connecting from the Query Editor.

#### Connecting with SSMS

1. Open the Connect to Server dialog by doing one of the following:

   - Choose `New Query`.
   - If the Query Editor is open, choose `Query` &ndash;
     `Connection` &ndash; `Connect`.

2. Provide the following information for your database:

   - For `Server type`, choose `Database Engine`.

   - For `Server name`, enter the DNS name followed by a comma and the TDS port. For example, your server
     name should look similar to the following:

     ```none
     host.example.com,1433
     ```

   - For `Authentication`, choose `SQL Server Authentication`.

   - For `Login`, enter the user name that you chose to use when you
     created your database.

   - For `Password`, enter the password corresponding to that user name.

   - Optionally, choose `Options`, and then choose the
     `Connection Properties` tab.

   - For `Connect to database`, specify the name of the database
     to connect to, and choose `Connect`.

3. If a message appears indicating that SSMS can't apply the connection
   strings, choose `OK`.


### Using `tsql` to connect

`tsql` is a command line tool that is shipped as part of FreeTDS. It allows you
to connect and to interact with Babelfish (or any other TDS enabled data source)
from a Linux terminal.

A Babelfish connection string takes the following form:

```bash
tsql -S database.example.com -p 1433 -U postgres -P secretpassword
```

For information about using `tsql`, consult [the FreeTDS documentation](https://www.freetds.org/userguide/).

Note that `tsql` is not officially supported.


### Using `psql` to connect

You can use PostgreSQL's `psql` client to connect to Babelfish on the PostgreSQL port (by default `5432`). 
`psql` supports [PostgreSQL-style SQL syntax](https://www.postgresql.org/docs/current/sql-commands.html).

Here is an example how to connect with `psql`:

```bash
psql -h database.example.com -p 5432 -U postgres -d dbname
```

Note that Babelfish ships with a modified version of `psql`, which is intended
for use by Babelfish development.  This version is not intended for use in a production
environment.
