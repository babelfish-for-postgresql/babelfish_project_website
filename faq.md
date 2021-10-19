---
layout: default
title: Frequently asked questions
nav_order: 4
has_children: false
permalink: /docs/faq
---

# Babelfish: Frequently asked questions

This page contains some of the most frequently asked question related to
Babelfish and MS SQL server compatibility.


## Can we use Babelfish for free?

Yes, Babelfish can be used free of charge. It is Open Source software which is
provided under the terms of the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html).


## Is Babelfish 100% compatible with MS SQL?

Babelfish implements as many features as possible but as always there are
limitations. The community tries to be as compatible as possible but there will
always be some limitations. If you want to learn more about those limitations
check out our [documentation](limitations-of-babelfish) related to those issues.


## Can I use a database as TDS and as PostgreSQL database at the same time

Yes, this is possible. A database can expose itself as standard PostgreSQL as
well as as MS SQL Server (TDS driver) at the same time. In fact in the future it
might be even possible to expose the very same PostgreSQL database as even more
incarnations.


## Can Babelfish be used as an extension for PostgreSQL?

The ultimate goal is to make that happen. However, to make Babelfish work
PostgreSQL needs [protocol hooks](architecture/protocol-hooks) which are
currently not part of the standard version of PostgreSQL. Therefore a special
source tree of Babelfish is needed which is provided via the [Babelfish Github
repository](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish).


## What is the performance difference between MS SQL and Babelfish?

This is of course hard to tell because it highly depends on the type of query
you are running. Some operations will be faster some will be slower. There is no
general answer holding true for all cases.


## How many concurrent users does Babelfish support?

There are no practical limitations which harm daily operations. So far no
problems in this area have been observed.

In case that you want to limit the number of users you can use the max_connections 
 postgres configuration


## Does Babelfish support replication?

Yes, Babelfish is a tool that speaks the MS SQL wire protocl (TDS). It does not
impact the way PostgreSQL stores data, does WAL handling and so on. Therefore
replication is of course possible without restrictions. 


## Is it possible to run T-SQL?

Yes, support for a lot of T-SQL code is available. 

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

Yes, the community will maintain the code. We are yet to see if [protocol
hooks](architecture/protocol-hooks) have a chance to make into core or not
but if they don't a separate source tree will be provided for recent versions
of PostgreSQL.


## How can I report a bug?

To report a bug checkout the [Github repository](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish/issues) and report your findings.
Please make sure that a test case as well as software versions and so are
included in the report to make it easier to track down a problem. In case of a
crash a gdb backtrace is highly appreciated. 
