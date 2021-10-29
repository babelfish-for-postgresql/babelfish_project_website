---
layout: default
title: FAQ
nav_order: 2
permalink: /docs/faq/
---

# Babelfish: Frequently asked questions

This page contains some of the most frequently asked question related to
Babelfish- and MS SQL server- compatibility.

## Can we use Babelfish for free?

Yes, Babelfish can be used free of charge. It is Open Source software which is
provided under the terms of the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) and [PostgreSQL license](https://www.postgresql.org/about/licence/).

## Is Babelfish 100% compatible with MS SQL?

The Babelfish community tries to be as compatible as possible but there will
always be some limitations. If you want to learn more about these limitations
check out our [documentation](/docs/usage/limitations-of-babelfish)  which gives a more detailed description.

Babelfish supports TDS protocol versions 7.1 and higher.

### Which Babelfish versions are available?

Currently we support addons to PostgreSQL 13 or higher. Support for older 
versions is not planned. However, there is a string commitment to support
future versions of PostgreSQL as they are released.

### How can I figure out which version I am running?

In Babelfish (and MS SQL) you can make use of the <code>@@version</code>
variable as shown in the next listing:

```sql
1> SELECT @@version;
2> GO
version                                                                                                                                                                                                                                                         
---------------------------------------------------------------------
Babelfish for PostgreSQL with SQL Server Compatibility - 12.0.2000.8
Oct 19 2021 13:21:04
Copyright (c) Amazon Web Services
PostgreSQL 13.4 on x86_64-pc-linux-gnu                                                                                              
(1 rows affected)
```

You can also use the following commands to figure out which versions are used:

```sh
1> SELECT SERVERPROPERTY('BabelfishVersion')
2> GO
serverproperty
1.0.0
(1 row affected)

1> SELECT SERVERPROPERTY('Babelfish')
2> GO
serverproperty
1
(1 row affected)
```

## Can I use a database with the TDS protocol and the PostgreSQL protocol at the same time?

Yes, this is possible. A database can present itself as standard PostgreSQL and as MS SQL Server (TDS protocol) at the same time. In fact, in the future it
might be even be possible to use the very same PostgreSQL database with other protocols.

### Which TDS clients are known to work with Babelfish?

The following clients are officially supported:

- OLEDB Provider/MSOLEDBSQL
- OLEDB Driver/SQLOLEDB (deprecated)
- Ado.NET entity framework
- SQL Server Native Client 11.0 (deprecated)
- Open Database Connectivity (ODBC)
- Java Database Connectivity (JDBC)

Other tools such as FreeTDS are known to work but are not officially supported
(yet).

## Can Babelfish be used as an extension for PostgreSQL?

The ultimate goal is to make that happen. However, to make Babelfish work,
PostgreSQL needs [postgresql hooks](/docs/internals/postgresql-hooks) which are
currently not part of the standard version of PostgreSQL. Therefore, a special
source tree of Babelfish is needed - 
check out our [installation guide](/docs/installation/compiling-babelfish-from-source). 

## What is the performance difference between MS SQL and Babelfish?

This is hard to tell, because it is highly dependent on the type of query
you are running. Some operations will be faster, some will be slower. There is no
general answer which holds true for all cases.


## How many concurrent users does Babelfish support?

There are no hard limits which harm daily operations. So far, no
problems in this area have been observed. Basically, the same limitations as in
standard PostgreSQL apply, with some overhead.

## Is it possible to run T-SQL?

Yes, support for a great deal of T-SQL language is available. Here is an example:

```sql
CREATE PROCEDURE [HumanResources].[uspUpdateEmployeePersonalInfo]
    @BusinessEntityID [int], 
    @NationalIDNumber [nvarchar](15), 
    @BirthDate [datetime], 
    @MaritalStatus [nchar](1), 
    @Gender [nchar](1)
WITH EXECUTE AS CALLER
AS $$
BEGIN
    -- SET NOCOUNT ON;

    BEGIN TRY
        UPDATE [HumanResources].[Employee] 
        SET [NationalIDNumber] = @NationalIDNumber 
            ,[BirthDate] = @BirthDate 
            ,[MaritalStatus] = @MaritalStatus 
            ,[Gender] = @Gender 
        WHERE [BusinessEntityID] = @BusinessEntityID;
    END TRY
    BEGIN CATCH
        EXECUTE [dbo].[uspLogError];
    END CATCH;
END; $$ LANGUAGE 'pltsql';
```
If you want to learn more about T-SQL, we have compiled an entire page focusing
on this important topic: [T-SQL in action](/docs/usage/handling-tsql).


## Will Babelfish be available for new versions of PostgreSQL?

There are ongoing efforts to incorporate [Babelfish hooks](/docs/internals/postgresql-hooks) into PostgreSQL. In the meantime, a separate code tree will be available separate from the extensions, with all the hooks built into it. This code tree will be maintained for the subsequent versions of PostgreSQL


## How can I report a bug?

To report a bug, checkout the [Github repository](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish/issues) and report your findings.
Please make sure that a test case as well as software versions (and so on) are
included in the report, to make it easier to track down problems. In case of a
crash, a gdb backtrace is highly appreciated.