---
layout: default
title: Get started
redirect_from: /404.html
nav_exclude: true
permalink: /docs/
---

# Babelfish for PostgreSQL documentation

This site contains the technical documentation for [Babelfish for PostgreSQL](https://babelfishpg.org/), an [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) and [PostgreSQL](https://www.postgresql.org/about/licence/) open source project that adds a Microsoft SQL Server-compatible end-point to PostgreSQL. With the addition of Babelfish, PostgreSQL understands T-SQL, SQL Server's proprietary SQL dialect, and supports the TDS communication protocol, so applications originally written for SQL Server may work with PostgreSQL with fewer code changes and without changing database drivers.


[Get started](/getstarted/){: .btn .btn-blue }


---

## Why use Babelfish for PostgreSQL?

Babelfish for PostgreSQL may help in the following use cases:

* When transitionioning your SQL Server compatible source code to an Open Source based database.
* When moving away from proprietary or legacy applications that don't make source code available.

Babelfish for PostgreSQL functionality is distributed in five components:

Component | Purpose
:--- | :---
[Babelfish PostgreSQL](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish) | A customized PostgreSQL server that provides hooks used to implement Babelfish.
[Babelfish TDS Extension](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_tds) | An extension that implements a secondary endpoint that speaks the TDS (SQL Server) network protocol.
[Babelfish Language Extension](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_tsql) | An extension that provides a procedural language compatible with TSQL Uses ANTLR parser.
[Babelfish Money Type](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_money) | An extension that supports the money type in SQL Server. This is a variation of the opensource fixeddecimal extension.
[Babelfish Common](https://github.com/babelfish-for-postgresql/babelfish_extensions/tree/BABEL_1_X_DEV/contrib/babelfishpg_common) | An extension that supports the various datatypes used in SQL Server.

For information about the project components, see the [Software architecture page](https://babelfishpg.org/docs/internals/software-architecture/).


## Get involved

[Babelfish](https://babelfishpg.org/) is supported by Amazon Web Services. All components are available under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) and the [PostgreSQL License](https://www.postgresql.org/about/licence/) on [GitHub](https://github.com/babelfish-for-postgresql).

The project welcomes GitHub issues, bug fixes, features, plugins, and documentation patches. To get involved, see [Contributing to Babelfish](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_X_DEV/CONTRIBUTING.md) on the Babelfish for PostgreSQL website.