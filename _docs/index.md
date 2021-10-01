---
layout: default
title: Get started
nav_order: 1
redirect_from: /404.html
permalink: /docs
---

# Babelfish for PostgreSQL documentation

This site contains the technical documentation for [Babelfish for PostgreSQL](https://babelfishpg.org/), an Apache-2.0 open source project that adds a Microsoft SQL Server-compatible end-point to PostgreSQL to enable your PostgreSQL database to understand the SQL Server wire protocol and commonly used SQL Server commands. With Babelfish, PostgreSQL now understands T-SQL, Microsoft SQL Server's proprietary SQL dialect, and supports the same communications protocol, so your apps that were originally written for SQL Server can now work with PostgreSQL with fewer code changes and without changing database drivers.


[Get started]({{site.url}}{{site.baseurl}}/docs/quick-start/pre-requisites){: .btn .btn-blue }


---

## Why use Babelfish for PostgreSQL?

Babelfish for PostgreSQL is well-suited to the following use cases:

* Smooth transition of you MSSQL Server compatible source code to an Open Source based database.
* Babelfish for PostgreSQL intends to move forward on its integration to the PostgreSQL community.

Component | Purpose
:--- | :---
[Babelfish Patch](https://github.com/babelfish-for-postgresql/babelfishpg-patch-for-postgresql) | Enables protocol hooks for PostgreSQL
[Babelfish extension](https://github.com/babelfish-for-postgresql/babelfishpg-extensions-and-tests) | Implements the TDS protocol


For specifics around the project, see the [FAQ]({{site.url}}{{site.baseurl}}/docs/faq).


## Get involved

[Babelfish](https://babelfish-for-postgresql.github.io/babelfish-for-postgresql/) is supported by Amazon Web Services. All components are available under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) on [GitHub](https://github.com/babelfish-for-postgresql).

The project welcomes GitHub issues, bug fixes, features, plugins, documentation---anything at all. To get involved, see [Contributing](https://babelfish-for-postgresql.github.io/babelfish-for-postgresql/source) on the Babelfish for PostgreSQL website.