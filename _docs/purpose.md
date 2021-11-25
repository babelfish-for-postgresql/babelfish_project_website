---
layout: default
title: Purpose of Babelfish
nav_order: 1
---

Babelfish for PostgreSQL extends your PostgreSQL database with the ability to
accept database connections from Microsoft SQL Server clients.  Doing this
allows applications originally built for SQL Server to work directly with
PostgreSQL with few code changes compared to a traditional migration and without
changing database drivers.  For more information about migrating, see
[migrating to Babelfish](/docs/usage/migration).

Babelfish provides an additional endpoint for a PostgreSQL database cluster
that allows it to understand the SQL Server wire-level protocol and commonly
used SQL Server statements.  This approach allows client applications that use
the Tabular Data Stream (TDS) wire protocol to connect natively to the TDS
listener port on PostgreSQL. Babelfish supports TDS versions 7.1 and higher.
For more information on the SQL Server wire-level protocol, see
[\[MS-TDS\]: Tabular Data Stream Protocol](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-tds/b46a581a-39de-4745-b076-ec4dbb7d13ec)
on the Microsoft website.

You can access your data simultaneously using a Babelfish TDS connection from
one application and a native PostgreSQL connection from another application.
You can customize the ports used for client connections when you initialize
Babelfish, or later by setting PostgreSQL parameters.  For more information
about the parameters that control Babelfish, see
[configuring Babelfish](/docs/internals/configuration).

By default, to use the following dialects use the following ports:

- SQL Server dialect, clients connect to port 1433.

- PostgreSQL dialect, clients connect to port 5432.

Babelfish runs the Transact-SQL (T-SQL) language with the exceptions documented
in [T-SQL limitations](/docs/usage/limitations-of-babelfish).


### Join the Babelfish community

Be part of the community and help to make improvements.
You're welcome to [contribute to Babelfish](/docs/contributing).
