---
layout: default
title: Other tools
nav_order: 19
has_children: false
permalink: /docs/connecting-to-babelfish/other-tools
---

## Using other tools

Basically you can use any tool capable of understanding the TDS protocol.
However, there might still be errors or problems. Some client tools might work better than
others. 

Everything that only uses the TDS protocol works out of the box. 
Issues might arise if too many unsupported features are used by the client. 

In the future, many of these issues will be resolved and we encourage you to [report
back issues](https://github.com/babelfish-for-postgresql/babelfish_extensions/issues) with TDS client software. 


### Officially supported client interfaces

The following interfaces are officially supported:

- OLEDB Provider/MSOLEDBSQL
- OLEDB Driver/SQLOLEDB (deprecated)
- Ado.NET entity framework
- SQL Server Native Client 11.0 (deprecated)
- Open Database Connectivity (ODBC)
- Java Database Connectivity (JDBC)

More tooling will be added in the future.  Since Babelfish offers a TDS-compatible
data source, most client code is expected to work, even if it is not officially
supported.

