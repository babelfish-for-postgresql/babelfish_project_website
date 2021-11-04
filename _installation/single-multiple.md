---
layout: default
title: Single vs. multiple database setups
nav_order: 4
---
## Single vs. multiple instances

Babelfish offers two modes of operation:

- `single-db`
- `multi-db`

When you create a Babelfish cluster, you choose between using a single
T-SQL database on its own or multiple T-SQL databases together.
Your choice affects how the names of T-SQL schemas inside the Babelfish
database appear in PostgreSQL.

If you specify `single-db`, you can create only a single T-SQL database in
Babelfish, and T-SQL schemas will be created as regular PostgreSQL schemas
in your Babelfish database.  If you specify `multi-db`, you can create
several T-SQL databases, each with its own schemas, and an T-SQL schema will
be created as PostgreSQL schema `<database name>_<schema_name>` to avoid name
collisions.

The migration mode is stored in the `migration_mode` parameter. You can't change
this parameter after creating your cluster (if you want to change the migration
mode, you'll have to create a new cluster).
During the deployment process you must decide which mode to use.  If you don't
set `migration_mode`, the default value of `single-db` is chosen.

How does this work? Consider the following code snippet:  

```sql
CREATE USER babelfish_user WITH CREATEDB 
	CREATEROLE PASSWORD '<PUT_SECRET_PASS_HERE>' INHERIT;
DROP DATABASE IF EXISTS demo;

/* the Babelfish database */
CREATE DATABASE demo OWNER babelfish_user;
ALTER SYSTEM SET babelfishpg_tsql.database_name = 'demo';
SELECT pg_reload_conf();

/* determine the migration mode */
ALTER DATABASE demo SET babelfishpg_tsql.migration_mode = 'single-db'|'multi-db';

\c demo

CREATE EXTENSION IF NOT EXISTS "babelfishpg_tds" CASCADE;
CALL SYS.INITIALIZE_BABELFISH('babelfish_user');
```

The `ALTER DATABASE` statement assigns the correct migration mode to the
database.  The `SYS.INITIALIZE_BABELFISH` function will then perform all
the steps needed to set up Babelfish.

When you connect to the TDS port, you will be connected to the PostgreSQL
database defined by `babelfishpg_tsql.database_name`.  You can then use the
`CREATE DATABASE` and `USE` statements as you would in Microsoft SQL Server.
(If you use `single-db` mode, you can only have a single T-SQL database.)


### Choosing a migration mode

Each migration mode has advantages and disadvantages. Choose your migration
mode based on the number of user databases you have, and your migration plans.
After you create a cluster for use with Babelfish, you can't change the
migration mode. When choosing a migration mode, consider the requirements of
your user databases and clients.

When you initialize Babelfish, Babelfish creates the system databases
`master`. and `tempdb`.  If you created or modified objects in the
system databases (`master` or `tempdb`), make sure to re-create those objects
in your new cluster.  Unlike SQL Server, Babelfish doesn't reinitialize `tempdb`
after a cluster reboot.

Use single database migration mode in the following cases:

- If you are migrating a single SQL Server database. In single database mode,
  migrated schema names (when seen from PostgreSQL) are identical to the
  original SQL Server schema names.
  In case you plan to ultimately migrate your application to native
  PostgreSQL, your SQL code will require fewer modifications.

- If your end goal is a complete migration to native PostgreSQL.  Before
  migrating, consolidate your schemas into a single schema (`dbo`) and then migrate
  into a single cluster to reduce the required changes.

Use multiple database migration mode in the following cases:

- If you are trying out Babelfish and you aren't sure of your future needs.

- If multiple user databases need to be migrated together, and the end goal isn't
  to perform a fully native PostgreSQL migration.

- If you might be migrating multiple databases in the future.
