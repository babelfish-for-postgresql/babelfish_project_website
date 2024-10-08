---
layout: default
title: Using other client tools
nav_order: 5
---

## Using other tools

Client applications that use a connectivity driver compliant with TDS version 7.1 or higher, 
should be able to connect to Babelfish, except for use of the Bulk Copy API. 

Please [report back](https://github.com/babelfish-for-postgresql/babelfish_extensions/issues)
if you face an issue. 

### Supported connectivity drivers

The following interfaces are officially supported:

- Open Database Connectivity (ODBC)
- OLEDB Provider/MSOLEDBSQL
- Java Database Connectivity (JDBC) version 8.2.2 (mssql-jdbc-8.2.2) and higher
- Microsoft SqlClient Data Provider for SQL Server
- .NET Data Provider for SQL Server
- SQL Server Native Client 11.0 (deprecated)
- OLEDB Driver/SQLOLEDB (deprecated)






More connectivity drivers might be added in the future.  Since Babelfish supports the TDS 
protocol, most TDS-based client applications are expected to work with Babelfish.

