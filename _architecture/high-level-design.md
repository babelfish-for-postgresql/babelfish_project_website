---
layout: default
title: High-Level Design
nav_order: 4
use_mermaid: true
---

Babelfish emulates MS SQL behavior on top of PostgreSQL. To achieve this goal, a
couple of areas had to be modified inside the PostgreSQL core. PostgreSQL does 
not offer this capability out-of-the-box, therefore addons have to be provided 
to make this happen.

The way Babelfish emulates MS SQL behavior is by using [protocol
hooks](protocol-hooks). The idea is to make database protocols plugable
which means that PostgreSQL can expose itself as a different database. In fact, it
is even possible to speak more than a single protocol at the same time, making
the setup even more flexible and easy to handle. 

<img src="/assets/images/babel_architecture.png" title="System architecture" width="800"/>

Once the TDS handler has accepted the request coming in on default port 1433, 
and once it has processed it, it is passed on via pltds to a standard PostgreSQL backend.
PostgreSQL will still be exposed to the client on port 5432 (default).

To sum it up: default:

- SQL Server dialect, clients connect to port 1433.
- PostgreSQL dialect, clients connect to port 5432.

In other words, a Babelfish enabled database will expose two TCP ports instead of
one to the end user. Administrators have to take that into account. The ports
used can of course be configured in the configuration files using standard
PostgreSQL variables.

How does the entire thing work? The TDS listener captures the requests coming
from the client and sends it though an SQL parser speaking the MS SQL dialect
instead of PostgreSQL. The query will then be handled by a regular PostgreSQL
backend. The optimizer and the executor will basically be the same. 

However, some changes had to be made to the PostgreSQL core to prepare for
trigger processing, transaction handling and so. This means that the 'PostgreSQL
part' is not 100% identical with what one would expect from PostgreSQL. Some
behavior had to be changed to be MS SQL compatible. Keep that in mind.

To find out more about what has to be changed and which challenges there are, check
out our section about [limitations and compatibility
issues](/docs/limitations-of-babelfish).

### Databases vs. schemas

PostgreSQL offers the following logical structuring of objects inside the
database:

- Instance: "one running PostgreSQL"
- Databases: That is what a user connects to
- Schemas: A logical grouping of tables and functions inside a database
- Tables: Where the data is really stored

MS SQL does not have all these layers. The <code>USE</code> command allows us to
easily switch between "databases" in MS SQL. However, in contrast to PostgreSQL,
it is easily possible to join and switch between these types of databases.
To enable cross-database joins, the concept of a database on the MS SQL side 
has been modelled as schemas in PostgreSQL, just like it is in MS SQL. 

What does that mean? If you are calling <code>USE</code> to switch from one
database to the other, it basically means that you stay inside the same
PostgreSQL , but behind the scenes you will be working in different
schemas. Understanding this fact is important in case you want to organize data
properly and query it using both protocols.

If you want to find out more about single and multi database 
setups [check out the documentation](single-multiple)
which deals with this topic in more detail.

### Extensions needed for Babelfish

Making PostgreSQL compatible with MS SQL requires some additional extensions
which are of course provided by the Babelfish distribution. In this section, you
will learn which ones are important and what their purpose is. So let's dive in
and go through them one by one, to gain a better understanding of things: 

- <code>babelfishpg_common</code>: MS SQL data types
- <code>babelfishpg_money</code>: Fixed precision numeric type
- <code>babelfishpg_tds</code>: TDS protocol extension
- <code>babelfishpg_tsql</code>: T-SQL extension

Below, we go through each one in turn.

#### babelfishpg_common: MS SQL data types

Data types are often really similar but not necessarily 100% identical.
Therefore, the Babelfish development team provides specific data types which
mimic MS SQL behavior. Fortunately, there were only a handful of types which needed
changes. Here is a complete list of types that had to be reimplemented or
created for work with Babelish:


- <code>sys.BBF_BINARY</code>
- <code>sys.BIT</code>: converts 1 or 0 to "t" or "f"
- <code>sys.BPCHAR</code> and <code>sys.VARCHAR</code>: MS SQL specific varchar implementation 
- <code>sys.DATETIME</code>: A simple data type for time and date. For more precision use
  <code>DATETIME2</code>.
- <code>sys.DATETIME2</code>: Basically, an extension for <code>DATETIME</code> with more 
  precision and more functionality. 
- <code>sys.DATETIMEOFFSET</code>: Like <code>DATETIME2</code> but with timezone awareness. 
- <code>sys.SMALLDATETIME</code>: Defines a date that is combined with a time of day. The time 
  is based on a 24-hour day, with seconds always zero (:00) and without 
  fractional seconds.
- <code>sys.SQL_VARIANT</code>: Enables these database objects to support values of 
  other data types.
- <code>sys.UNIQUEIDENTIFIER</code>: 16 byte GUID (e.g. 6F9619FF-8B86-D011-B42D-00C04FC964FF)

#### babelfishpg_money: Fixed precision numeric type

In addition to the core data types outlined in the previous section, there is
one more data type which is packaged into a separate extension for licensing
reasons: <code>FIXEDDECIMAL</code>. The length of the data type is 8 bytes. It
is basically a subset of the standard PostgreSQL <code>NUMERIC</code> data types
aligned as a fixed-length type to dramatically improve performance. 

What does the word subset mean in this context? 

- The precision is limited to (17, 2). 
- <code>FIXEDDECIMAL</code> always rounds towards zero and not to the nearest number. 
- NaN ("not a number") is not supported. 
- Changing the precision will lead to an error. 
  For example: <code>SELECT '123.223'::FIXEDDECIMAL(4,1)</code> will 
  definitely error out which is not the case with <code>NUMERIC</code>


#### babelfishpg_tds: TDS protocol extension

This extension handles the protocol side of things. It tries to abstract the TDS
part as much as possible.


#### babelfishpg_tsql: T-SQL extension

The purpose of this extension is to provide all code needed for T-SQL handling.
Without it, writing stored procedure code is impossible. 

It contains a large number of functions, system views and other infrastructure
needed to make PostgreSQL look like MS SQL. 

Babelfish provides [a variety of system views](system-views).