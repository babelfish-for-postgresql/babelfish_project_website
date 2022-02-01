---
layout: default
title: Single vs. multiple database setups
nav_order: 4
---
## Single vs. multiple instances

Babelfish offers two modes of operation:

- `single-db`
- `multi-db`

When you create a Babelfish cluster, you choose between using a single T-SQL database or multiple T-SQL databases together. Your choice will affects how the names of T-SQL schemas inside the Babelfish database appear in PostgreSQL. For more information about selecting between `single-db` and `multi-db` mode, review [Choosing a migration mode](https://babelfishpg.org/docs/installation/single-multiple/#choosing-a-migration-mode).

If you specify `single-db`, you can create only a single T-SQL database in Babelfish, and T-SQL schemas will be created as regular PostgreSQL schemas in your Babelfish database.  If you specify `multi-db`, you can create
multiple T-SQL databases (each with its own schemas), and a T-SQL schema will be created as a PostgreSQL schema (`<database name>_<schema_name>`) to avoid name conflicts.

The migration mode is stored in the `migration_mode` parameter. You can't change the value of this parameter after initializing Babelfish.  To change the migration mode, you'll need to create a new cluster. If you don't select a  `migration_mode`, Babelfish is initialized with the default value of `single-db`.

The following code snippet creates a user and database before setting the migration mode and initializing the Babelfish extension. The code snippet is in psql, invoked on the PostgreSQL port (by default, 5432):  

```sql
/* Create a user that will own the sample database */
CREATE USER babelfish_user WITH CREATEDB 
	CREATEROLE PASSWORD '<PUT_SECRET_PASSWORD_HERE>' INHERIT;

/* Create a database named demo, owned by the above user */
CREATE DATABASE demo OWNER babelfish_user;
ALTER SYSTEM SET babelfishpg_tsql.database_name = 'demo';
SELECT pg_reload_conf();

/* Specify the migration mode for the database */
ALTER DATABASE demo SET babelfishpg_tsql.migration_mode = 'multi-db';

/* Move into the demo database */
\c demo

/* Create the extension in the demo database and initialize Babelfish */
CREATE EXTENSION IF NOT EXISTS "babelfishpg_tds" CASCADE;
CALL SYS.INITIALIZE_BABELFISH('babelfish_user');
```

In the example, the `ALTER DATABASE` statement sets migration mode to `multi-db`. The `SYS.INITIALIZE_BABELFISH` function then performs the steps required to initialize Babelfish in the mode that you've specified.

When you connect to the TDS port, you will be connected to the PostgreSQL database named by the `babelfishpg_tsql.database_name` parameter. During initialization, `babelfishpg_tsql.database_name` will be set to the name of the database from which you invoked SYS.INITIALIZE_BABELFISH. If you are using `multi-db` mode, you can then connect to the TDS port and use the `CREATE DATABASE` and `USE` statements as you would in Microsoft SQL Server; in `single-db` mode, you can connect to the TDS port and use the single T-SQL database.


### Choosing a migration mode

Each migration mode has advantages and disadvantages. Choose your migration
mode based on the number of user databases you have, and your migration plans.
After you initialize Babelfish, you can't change the
migration mode. When choosing a migration mode, consider the requirements of
your user databases and clients.

When you initialize Babelfish, Babelfish creates the system databases
`master`. and `tempdb`.  If you created or modified objects in the
system databases (`master` or `tempdb`), make sure you re-create those objects
in your new cluster.  Unlike SQL Server, Babelfish doesn't reinitialize `tempdb`
after a cluster reboot.

Use single database migration mode in the following cases:

- If you are migrating a single SQL Server database. In single database mode,
  migrated schema names (when seen from PostgreSQL) are identical to the
  original SQL Server schema names.
  If you plan to ultimately migrate your application to native
  PostgreSQL, your SQL code will require fewer modifications.

- If your end goal is a complete migration to native PostgreSQL.  Before
  migrating, consolidate your schemas into a single schema (`dbo`) and then migrate
  into a single cluster to reduce the required changes.

Use multiple database migration mode in the following cases:

- If you are trying out Babelfish and you aren't sure of your future needs.

- If multiple user databases need to be migrated together, and the end goal isn't
  to perform a fully native PostgreSQL migration.

- If you may be migrating multiple databases to PostgreSQL in the future.
