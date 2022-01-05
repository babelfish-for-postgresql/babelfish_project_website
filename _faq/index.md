---
layout: default
title: FAQ
nav_order: 2
permalink: /docs/faq/
---

# Babelfish: Frequently asked questions

This page contains some of the most frequently asked questions related to
Babelfish and Microsoft SQL Server compatibility.

## Can we use Babelfish for free?

Yes, Babelfish can be used free of charge. It is open-source software, provided under the terms of the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) and [PostgreSQL license](https://www.postgresql.org/about/licence/).

## Is Babelfish 100% compatible with Microsoft SQL Server?

The Babelfish community tries to be as compatible as possible but there are some limitations. To learn more about 
these limitations, check out our [documentation](/docs/usage/limitations-of-babelfish) for a more detailed description.

Babelfish supports TDS protocol versions 7.1 and higher.

### Which Babelfish versions are available?

Babelfish version 1.0.0 works with PostgreSQL 13.4; version 1.1.0 works with PostgreSQL version 13.5. 

### How can I find out which version of Babelfish I am running?

To find your Babelfish version, connect to the TDS port and query the <code>@@version</code> variable as shown in the following listing:

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

You can also use the following commands to find out which version is running:

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

Yes. A database can support PostgreSQL syntax and SQL Server (TDS protocol) syntax at the same time. 

### Which TDS clients are known to work with Babelfish?

The following clients are officially supported:

- OLEDB Provider/MSOLEDBSQL
- OLEDB Driver/SQLOLEDB (deprecated)
- Ado.NET entity framework
- SQL Server Native Client 11.0 (deprecated)
- Open Database Connectivity (ODBC)
- Java Database Connectivity (JDBC)

Other tools (such as FreeTDS) are known to work, but are not officially supported.

## Can Babelfish be used as an extension for PostgreSQL?

Right now, to make Babelfish work, PostgreSQL needs [hooks](/docs/internals/postgresql-hooks) which are
currently not part of the community version of PostgreSQL. Therefore, you need to use a special
source tree of PostgreSQL with Babelfish - check out our [installation guide](/docs/installation/compiling-babelfish-from-source) for more information. 

## What is the performance difference between Microsoft SQL Server and Babelfish?

The performance difference is highly dependent on the type of query
you are running. Some operations will be faster, some will be slower. There is no
general answer which holds true for all cases.

## How many concurrent users does Babelfish support?

There is no hard limit on the number of concurrent users, but in practice, the number of concurrent queries will be limited by the resources (CPU, I/O) of your system. 

## Can I run T-SQL queries?

Yes, Babelfish supports a great deal of T-SQL language. Here is an example:

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

## Will Babelfish be available for new versions of PostgreSQL?

There are ongoing efforts to incorporate [Babelfish hooks](/docs/internals/postgresql-hooks) into PostgreSQL. In the meantime, a code tree with all the hooks built into it will be available separate from the extensions. This code tree will be maintained for the subsequent versions of PostgreSQL.

## How can I report a bug?

To report a bug, visit the [Github Babelfish Extensions repository](https://github.com/babelfish-for-postgresql/babelfish_extensions/issues) and open an issue report.

Please make sure that the steps to reproduce the issue, your software versions, and all other relevant information about your installation is included in the report to make it easier to reproduce the issue and track down the cause. If the issue is causing a crash, a [gdb backtrace](https://ftp.gnu.org/old-gnu/Manuals/gdb/html_node/gdb_42.html) is highly appreciated.
