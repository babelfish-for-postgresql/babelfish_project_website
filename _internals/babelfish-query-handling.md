---
layout: default
title: Babelfish query handling
nav_order: 2
---

## Babelfish query handling

Microsoft SQL Server and PostgreSQL handle queries quite 
differently. Babelfish utilizes protocol hooks and provides software
mechanisms that allow you to refine and influence how your queries are processed.


### Processing a query

T-SQL has many syntactic differences from the version of SQL spoken by PostgreSQL. To 
accept queries written in T-SQL, Babelfish utilizes a parser that is distributed in 
the `pltsql` extension. 

Once a client has sent a query to Babelfish via the TDS protocol, parser hooks in the <code>pltsql</code> 
extension are employed to parse, analyze, and execute the query. The extension provides the proper datatype 
conversion from PostgreSQL types to TDS wire types. By taking this approach, processing, executing, 
and materializing query results are handled by the extension only, and we don't need to extend the 
PostgreSQL SQL parser to understand T-SQL and its semantics at all.


### Additional server side variables

Babelfish includes configuration variables that help PostgreSQL handle the TDS protocol 
properly. One such variable is named <code>enable_domain_typmod</code>. When set to <code>on</code>, 
this variable allows typemods for the <code>CREATE DOMAIN</code> command. The default is <code>off</code>.

A typemod allows you to add a data length to a data type. Some data types (such 
as <code>integer</code> and <code>boolean</code>) don't require a data length, but data types 
such as <code>varchar</code> or <code>numeric</code> can be configured to require a maximum size 
(for example, <code>varchar(20)</code>).  

The TDS protocol implementation requires the correct setting for <code>sys</code> domains. The following domains 
are expected to have typmods:

- <code>sys.varchar</code>
- <code>sys.nvarchar</code>
- <code>sys.nchar</code>
- <code>sys.datetime2</code>
- <code>sys.smalldatetime</code>
- <code>sys.varbinary</code>
- <code>sys.binary </code>

You can query the PostgreSQL <code>pg_settings</code> table to find the value of <code>enable_domain_typemod</code>:

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







