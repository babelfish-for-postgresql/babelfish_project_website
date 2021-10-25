---
layout: post
authors: 
    - aht
comments: true
title: "Babelfish Launch Announcement: On Oct 28th, we are launching Babelfish for PostgreSQL"
categories:
- releases
---

Postgres is, possibly, the most extensible database. Extensible in the sense that you can augment its core functionality in many and diverse ways. Extensibility is provided most notably through <b>extensions</b>: code that you can dynamically load into Postgres. Extensions may turn Postgres into a graph database, a distributed database with sharding capabilities, or simply add new data types, operators or functions.

Due to its feature set, clean code, and liberal license, Postgres has also led to many proprietary forks that also enhanced its functionality. But they have done so by modifying the code base. Some examples may be data warehouses or an Oracle compatibility layer.

Today, AWS is announcing the open source <b>Babelfish for PostgreSQL</b> (“Babelfish” in short): a compatibility layer that adds SQL Server compatibility on top of PostgreSQL. Yet Babelfish is neither proprietary nor a fork: it is fully available under the open source, liberal, Apache 2 and PostgreSQL License; and builds on top of existing PostgreSQL. Babelfish enhancements will be prepared and submitted to be merged upstream.

This announcement follows the public statement that Andy Jassy made on December 1st, 2020:

<i>“We are open sourcing Babelfish in 2021. […] We are releasing Babelfish under the Apache 2.0 and PostgreSQL license. We invite others to become active in the project, and we will see it as a sign of success when developers outside of AWS become committers or maintainers. You can help by adding or extending Babelfish functionality, submitting feature requests, working on documentation, and contributing test cases”<i>

Today AWS is delivering on its promise, and publishing Babelfish code and documentation to a [GitHub repository](https://github.com/babelfish-for-postgresql) and a new [Babelfish website](https://babelfish-for-postgresql.github.io/). As we shall see later, Babelfish is structured in two parts: a patch against modern PostgreSQL versions, which will be submitted for inclusion upstream; and a few extensions on top of it. Starting today, you can clone GitHub’s repository, compile it, install and run Babelfish on your own environments, with SQL Server compatibility.

<b>Benefits of Babelfish</b>

The most obvious benefit you get from Babelfish is the SQL Server compatibility. This means that you could run applications that work on SQL Server, without SQL Server. Just with Babelfish for PostgreSQL. Compatibility works at three levels:

- <b>SQL</b>. While SQL is a standard, relational databases are well known for implementing it slightly differently, and not completely. Hence, queries that work in SQL Server may not work directly on PostgreSQL. To solve this, Babelfish has its own parser that creates the appropriate query nodes for SQL Server queries to be executed by PostgreSQL at line speed --it is not a translation layer. Importantly, and also provided by Babelfish, are specific data types, functions and operators that are specific to SQL Server and not present in vanilla Postgres, or don’t behave in the same way.

- <b>T-SQL</b>. T-SQL. T-SQL is SQL Server’s language, which includes the SQL used for queries and the rest of the constructs used for stored procedures (like variables, exceptions, control flow, etc). T-SQL t is different from PostgreSQL’s PL/pgSQL or any other procedural language supported in PostgreSQL, but Babelfish adds T-SQL support as an additionally supported procedural language. This allows you to write and call T-SQL stored procedures --whether you do so from “SQL Server” applications, or even “regular Postgres” applications.

- <b>TDS (SQL Server’s wire protocol)</b>. Babelfish also adds compatibility with SQL Server’s wire protocol. This means that the drivers and other tools that connect to SQL Server over the network should work with Babelfish as-is. This layer is also natively implemented, via a protocol hook, so it’s not a translation layer that would impose some overhead.

While at launch compatibility is not 100%, a wide range of applications should work with Babelfish with little to no changes. The implications are huge: <b>you may save significant costs in SQL Server licensing, that could be replaced by Babelfish; you may include SQL Server compatibility in applications that are open source; and more importantly, Postgres, thanks to Babelfish, will help broaden its ecosystem, user base, and become a more used database targeting more use cases.</b>

Interestingly enough, even if you don’t pursue SQL Server compatibility, you may leverage Babelfish too. Given it adds additional data types, and T-SQL, you may use them in your own, otherwise PostgreSQL-based, applications.
Also, because both SQL Server and PostgreSQL stacks are present at the same time, you may use them together. For example, you may write to some tables from a SQL Server application, but then run analytics on those tables from a PostgreSQL application.

<b>The structure of Babelfish</b>

Babelfish is composed of two main components:
 - A patch against upstream PostgreSQL 13.4. This patch will be submitted upstream to be merged. Once it is merged, this patch will become unnecessary, and Babelfish will consist only of extensions.
 - The Babelfish extensions, which compile against the patched PostgreSQL:
   - babelfishpg_tsql: supports the T-SQL language
   - babelfishpg_tds: supports the TDS wire protocol
   - babelfishpg_common: supports the various datatypes in SQL Server
   - babelfishpg_money: supports the money type in SQL Server. This is an improvement over the already Open Source fixeddecimal extension, which will also be upstreamed.

TODO: add architecture diagram

<b>How to get started</b>
The open source way is to compile and install Babelfish! The Babelfish documentation contains detailed instructions on how to compile and install Babelfish. For more convenience, here are provided instructions on how to run it from Docker.

TODO: provide instructions on how to run with Docker.

Once Babelfish is started, it will listen in the usual PostgreSQL protocol (5432), as well as the standard SQL Server protocol (1433).

TODO: provide instructions on how to connect via CLI to Babelfish using TDS.

<b>A foundation for more than just SQL Server compatibility</b>

Babelfish follows the steps of some other very innovative projects that AWS has recently open sourced and created a Community around, like Firecracker or Bottlerocket. For the PostgreSQL Community, Babelfish is possibly the largest and most significant open source contribution that is expected to be merged upstream, and not a proprietary (or open source, for that matter) fork.

But other than adding SQL Server and T-SQL compatibility, Babelfish presents an opportunity for PostgreSQL to benefit from other internal components that Babelfish requires, and which enhance PostgreSQL independently. For example, protocol hooks.

As discussed above, Postgres is highly extensible. But there are a few areas which remain not extensible. One of them is the ability to speak more than one network protocol. Babelfish requires this, and provides the infrastructure to turn PostgreSQL into a multi-protocol database. Maybe this is the beginning of a new period of innovation for PostgreSQL, adding support for new protocols. After all, doesn’t the [Babel Fish](https://youtu.be/iuumnjJWFO4?t=128) allow you to listen and understand many languages?
