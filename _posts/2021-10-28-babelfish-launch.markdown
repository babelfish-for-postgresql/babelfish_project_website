---
layout: post
author: The Babelfish Project Team
authors: 
    - The Babelfish Project Team
comments: true
title: "Announcing Open Source Babelfish for PostgreSQL: An Accelerator for SQL Server Migration"
categories:
- releases
---
One of the features that sets PostgreSQL apart from other databases is
its extensibility. Today there are 329 open-source extensions registered in the
[PostgreSQL Extension Network](https://pgxn.org/about/), adding
functionality that includes handling geospacial data, computational
biology, statistics, job scheduling, graph databases and more.

Today, we are excited to announce the release of the open source Babelfish for PostgreSQL (Babelfish): a utility
that lets PostgreSQL understand queries from applications written for Microsoft SQL Server.
Babelfish is a set of extensions that provide both T-SQL capabilities and a Tabular Data Stream (TDS)
listener port as enhancements to PostgreSQL. It supports the SQL Server dialect, T-SQL, and notable
features including savepoints, stored procedures, nested transactions, and much more.

Babelfish is available under the open source Apache 2.0 and PostgreSQL licenses and builds on top of
existing PostgreSQL. The licensing allows you to freely use, modify, distribute, and sell your own
products that include Apache 2.0 licensed or PostgreSQL licensed software.

At re:Invent 2020, we [announced](https://aws.amazon.com/blogs/opensource/want-more-postgresql-you-just-might-like-babelfish/) plans to open source Babelfish for PostgreSQL. Today we have delivered on that promise, and published Babelfish code to GitHub. Babelfish is structured in two parts: a patch against community PostgreSQL, which will be submitted for inclusion in future versions of PostgreSQL; and extensions built on top of the patch. You can clone, compile, install, and run Babelfish on your own environments to obtain T-SQL capabilities.

A key component of this release is the Babelfish Compass tool ([GitHub repo](https://github.com/babelfish-for-postgresql/babelfish_compass)). It is an assessment tool
that analyzes SQL/DDL code for Microsoft SQL Server, determines the level of support for Babelfish,
and generates a report. The report is intended to help you make a go/no-go decision about whether
it makes sense to start a migration project from SQL Server to PostgreSQL using
Babelfish. The Compass assessment report lists all the SQL features found in the SQL/DDL code, and
notes whether or not these are supported by the latest version of Babelfish.

### Benefits of Babelfish

Babelfish helps eliminate expensive licensing fees by making it easier to migrate SQL Server applications to PostgreSQL. With Babelfish, applications that were originally built for SQL Server can work directly with PostgreSQL with fewer code changes and without changing database drivers. This works on three levels:

 - <b>SQL</b>. While SQL is an ANSI standard, relational databases are well-known for implementing the specifications with varying degrees of support and with specific language extensions. Hence, queries that work in SQL Server may not work directly in PostgreSQL. To solve this, Babelfish has its own parser that creates the appropriate query nodes, so the SQL Server dialect can be executed by PostgreSQL natively. Babelfish also provides specific data types, functions and operators for SQL Server that are not present in PostgreSQL or do not work the same way across SQL Server and PostgreSQL.

 - <b>T-SQL</b>. T-SQL is SQL Server’s language, which includes an extension of the SQL standard. In particular, T-SQL includes constructs used for stored procedures, such as variables, exceptions, control flow, and more. Babelfish adds support for these constructs into PostgreSQL. Babelfish also supports T-SQL semantics. For example, there are cases where an error would create a rollback in traditional PostgreSQL but not in SQL Server. When used through the TDS port, Babelfish makes PostgreSQL follow the SQL Server behaviors, ensuring correctness.

- <b>TDS (SQL Server’s wire protocol)</b>. Babelfish also adds support for SQL Server’s wire protocol, TDS, which by default runs on port 1433. This means Babelfish uses the same network protocol, port, and connectivity drivers. This is natively implemented via a protocol hook, so it’s not a translation layer.   

With no requirement to replace the database drivers, and significantly reduced effort to update SQL language code, applications that are moving from SQL Server to PostgreSQL using Babelfish will be up and running much more quickly than if they needed to be ported completely to native PostgreSQL drivers and PL/pgSQL. Because Babelfish is open source, the community can extend the functionality if gaps in migration are identified, enhancing extensibility of PostgreSQL and targeting more use cases.

### How to get started
The Babelfish documentation contains detailed instructions on how to compile and install Babelfish. You can find the documentation on the Babelfish [website](https://www.babelfishpg.org/). 

Once Babelfish starts running as part of PostgreSQL, the database server will listen for PostgreSQL native traffic on port 5432 (by default), and listen for TDS traffic on port 1433 (by default).

### This is only the beginning

Babelfish for PostgreSQL accelerates the migration of SQL Server applications to PostgreSQL by enhancing PostgreSQL so it can understand both the TDS wire protocol and T-SQL language constructs of SQL Server. These extensions will continue to evolve as support for additional capabilities of T-SQL are added in the future. We hope you enjoy Babelfish, and we’re excited to welcome you to this new era of database freedom!
 

