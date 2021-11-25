---
layout: default
title: Software architecture
nav_order: 1
use_mermaid: true
---

Babelfish implements Microsoft SQL Server behavior on top of PostgreSQL. To achieve this goal, a
couple of areas had to be modified inside the PostgreSQL core. PostgreSQL does
not offer this capability out-of-the-box, therefore add-ons had to be provided
to make this happen.

The way Babelfish implements Microsoft SQL Server behavior is by using
[hooks](/docs/internals/postgresql-hooks). The idea is to make database protocols &ldquo;pluggable&rdquo;,
which means that PostgreSQL can present itself as a different database. In fact, it
is even possible to speak more than a single protocol at the same time, making
the setup more flexible and easy to handle.

<img src="/assets/images/babel_architecture.png" title="System architecture" width="800"/>

Once the TDS handler has accepted the request coming in on the default port 1433,
and once it has processed it, it is passed on via pltds to a standard PostgreSQL backend.
PostgreSQL will still be exposed to the client on port 5432 (default).

To sum it up: default:

- SQL Server dialect, clients connect to port 1433.
- PostgreSQL dialect, clients connect to port 5432.

In other words, a Babelfish enabled database will listen for connections on two
TCP ports instead of one. Administrators have to take that into account. The ports
used can be configured using PostgreSQL parameters.

How does that work? The TDS listener captures the requests coming
from the client and sends them though a parser for the SQL dialect of Microsoft
SQL Server.  The query will then be handled by a regular PostgreSQL
backend. The optimizer and the executor will basically be the same.

However, some changes had to be made to the PostgreSQL core to prepare for
trigger processing, transaction handling and other aspects that are different in
Microsoft SQL Server.  This means that the database server is not 100% identical
to what one would expect from PostgreSQL.  Some behavior had to be changed to
behave like Microsoft SQL Server.  Keep that in mind!

To find out more about what has to be changed and which challenges there are, check
out our section about [limitations and compatibility issues](/docs/usage/limitations-of-babelfish).

### Databases vs. schemas

PostgreSQL offers the following logical structure of objects:

- Instance: a running PostgreSQL server
- Databases: what a user connects to
- Schemas: a logical grouping of tables and other objects inside a database
- Tables: where the data are really stored

Microsoft SQL Server has the same layers.  There, the `USE` command
allows us to switch between databases. Also, in contrast to PostgreSQL,
one can query tables from another database and join tables from different databases.
To enable cross-database joins, you can use the `multi-db` migration mode
in Babelfish.  In that mode, databases in TDS connections (let's call them
&ldquo;T-SQL databases&rdquo; for short) have been modelled as schemas in PostgreSQL.

In `multi-db` mode, if you are calling `USE` to switch from one
database to the other, you actually remain connected to the same
PostgreSQL database, but you will be working in different
schemas. Understanding this fact is important to organize data
properly and query the same tables using both protocols.

If you want to find out more about single- and multi-database
setups [see the documentation](/docs/installation/single-multiple),
which deals with this topic in more detail.

### Extensions needed for Babelfish

Making PostgreSQL compatible with Microsoft SQL Server requires some additional
extensions which are provided by the Babelfish distribution. In this section, you
will learn which ones are important and what their purpose is.

- `babelfishpg_common`: Microsoft SQL Server data types
- `babelfishpg_money`: Fixed precision numeric type
- `babelfishpg_tds`: TDS protocol extension
- `babelfishpg_tsql`: T-SQL extension

Here is a more detailed description of these extensions:

#### `babelfishpg_common`: Microsoft SQL Server data types

Data types are often really similar but not necessarily 100% identical.
Therefore, the Babelfish development team provides specific data types which
mimic Microsoft SQL Server behavior. Fortunately, there were only a handful of
types which behave differently. Here is a complete list of these types:

- `sys.BBF_BINARY`: Data type for binary data.
- `sys.BIT`: Converts 1 or 0 to `t` or `f`.
- `sys.BPCHAR` and `sys.VARCHAR`: Microsoft SQL Server specific `varchar` implementation
- `sys.DATETIME`: A simple data type for time and date. For more precision use
  `DATETIME2`.
- `sys.DATETIME2`: An extension for `DATETIME` with more
  precision and functionality.
- `sys.DATETIMEOFFSET`: Like `DATETIME2`, but with timezone awareness.
- `sys.SMALLDATETIME`: Defines a date that is combined with a time of day. The time
  is based on a 24-hour day, with seconds always zero (:00) and without
  fractional seconds.
- `sys.SQL_VARIANT`: Enables these database objects to support values of
  other data types.
- `sys.UNIQUEIDENTIFIER`: 16 byte GUID (e.g. `6F9619FF-8B86-D011-B42D-00C04FC964FF`)

#### `babelfishpg_money`: Fixed precision numeric type

In addition to the core data types outlined in the previous section, there is
one more data type which is packaged into a separate extension for licensing
reasons: `fixeddecimal`.

See the
[documentation of the original software](https://github.com/2ndQuadrant/fixeddecimal/blob/master/README.md)
for usage instructions and other information.

#### `babelfishpg_tds`: TDS protocol extension

This extension handles the TDS client-server protocol.  It has to be loaded
at server startup time using `shared_preload_libraries`, so that it can start
listening on the TDS port for incoming connections.

#### `babelfishpg_tsql`: T-SQL extension

The purpose of this extension is to provide all code needed for T-SQL handling.
Without it, writing stored procedure code is impossible.

It contains a large number of functions, system views and other infrastructure
needed to implement Microsoft SQL Server functionality.

Babelfish provides [a variety of system views](/docs/internals/system-views).
