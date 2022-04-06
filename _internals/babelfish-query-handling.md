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

