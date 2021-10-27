---
layout: default
title: Babelfish query handling
nav_order: 2
---

## Babelfish query handling

In this section, you will learn about Babelfish query handling. The first and
most important thing is: MS SQL and PostgreSQL differ quite substantially in their query handling.
For that reason, various transformations have to be applied to make it work.

Let us therefore take a closer look, and discuss some of the changes made to PostgreSQL
core to make Babelfish work in the first place. As already stated, Babelfish is
heavily based on protocol hooks. However, there is more to the story than that. 


### Processing a query

The first thing to understand is how Babelfish handles a query. 

T-SQL is a variant of SQL with a great many syntactic differences. To be able to
accept queries written in T-SQL, Babelfish provides its own parser via the
`pltsql` extension. Once a client has sent a query to Babelfish via the TDS
protocol, various parser hooks are employed to parse, analyse and then finally
execute the query.  The parser hooks create a representation suitable to be
handed over to the `pltsql` compiler and interpreter, which finally executes the
query.  Finally, pltsql is responsible to provide the proper datatype
conversion from PostgreSQL types to TDS wire types. With this approach,
processing, executing and materializing query results are located within the
pltsql extension only, and we don't need to extend the PostgreSQL SQL parser to
understand T-SQL and its semantics at all.


### Additional server side variables

Babelfish offers new config variables to handle queries. One of the variables
added is called <code>enable_domain_typmod</code>. To understand what this variable means,
we first have to clarify what a PostreSQL typmod really is. Data types such as
integer, boolean and so on are as they are - there is not much to configure.
However, this is not true for data types such as varchar or numeric. Both data types
can be 'configured' (e.g. <code>varchar(20)</code> ). A <code>typmod</code> 
is therefore a means to add parameters to data types. 

Let us take a look at the new variable:

```sql
SELECT name, setting FROM pg_settings WHERE name LIKE 'enable%';
              name              | setting
--------------------------------+---------
...
 enable_bitmapscan              | on
 enable_domain_typmod           | off
 enable_gathermerge             | on
...
```

The purpose of this variable is to allow typemods for the <code>CREATE DOMAIN</code> command. The
TDS protocol implementation requires the correct setting for sys domains to be
passed around. The following sys domains are allowed to have typmods:

- <code>sys.varchar</code>
- <code>sys.nvarchar</code>
- <code>sys.nchar</code>
- <code>sys.datetime2</code>
- <code>sys.smalldatetime</code>
- <code>sys.varbinary</code>
- <code>sys.binary </code>

This config variable has been added on top of PostgreSQL, and is therefore a
Babelfish-specific addon.



