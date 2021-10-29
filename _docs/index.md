---
layout: default
title: Get started
redirect_from: /404.html
nav_exclude: true
permalink: /docs/
---

# Babelfish for PostgreSQL documentation

This site contains the technical documentation for [Babelfish for PostgreSQL](https://babelfishpg.org/), an [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) and [PostgreSQL](https://www.postgresql.org/about/licence/) open source project that adds a Microsoft SQL Server-compatible end-point to PostgreSQL to enable your PostgreSQL database to understand the SQL Server wire protocol and commonly used SQL Server commands. With Babelfish, PostgreSQL now understands T-SQL, Microsoft SQL Server's proprietary SQL dialect, and supports the same communications protocol, so your apps that were originally written for SQL Server can now work with PostgreSQL with fewer code changes and without changing database drivers.


[Get started](/getstarted/){: .btn .btn-blue }


---

## Why use Babelfish for PostgreSQL?

Babelfish for PostgreSQL is well-suited to the following use cases:

* Smooth transition of your MSSQL Server compatible source code to an Open Source based database.
* Babelfish for PostgreSQL intends to move forward on its integration to the PostgreSQL community.

Component | Purpose
:--- | :---
[Babelfish Patch](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish) | Enables Babelfish hooks for PostgreSQL.
[Babelfish TDS Extension](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_tds) | TDS - provides a secondary endpoint that speaks the TDS (SQL Server) network protocol.
[Balbelfish Language Extension](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_tsql) | Provides a procedural language compatible with TSQL Uses ANTLR parser.
[Babelfish Money Type](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_money) | Supports the money type in MSSQL. This is a variation of the opensource fixeddecimal extension.
[Babelfish Common](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_common) | Supports the various datatypes in MSSQL.



For specifics around the project, see the [FAQ](/docs/faq/).


## Get involved

[Babelfish](https://babelfishpg.org/) is supported by Amazon Web Services. All components are available under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) and the [PostgreSQL License](https://www.postgresql.org/about/licence/) on [GitHub](https://github.com/babelfish-for-postgresql).

The project welcomes GitHub issues, bug fixes, features, plugins, documentation---anything at all. To get involved, see [Contributing](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_X_DEV/CONTRIBUTING.md) on the Babelfish for PostgreSQL website.