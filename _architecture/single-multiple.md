---
layout: default
title: Single vs. Multiple Instances
nav_order: 11
---
## Single vs. multiple instances

Babelfish offers two modes of operation:

- `single-db`
- `multi-db`

What is the purpose of these two modes? In MS SQL, it is really cheap to perform
joins between tables located in different databases. In PostgreSQL, it is also
possible to join between databases, but it is far more expensive to do so. Since
joining different databases is pretty common in MS SQL, this is an important
issue. The question now is: How can Babelfish model the desired MS SQL behavior?
In the case of `single-db`, MS SQL databases are mapped to schemas in PostgreSQL. In
the case of `multi-db`, many databases are used instead of just one.

During the deployment process you can decide which mode to use.
How does this work? Consider the following code snippet:  

```sql
CREATE USER babelfish_user WITH CREATEDB 
	CREATEROLE PASSWORD '<PUT_SECRET_PASS_HERE>' INHERIT;
DROP DATABASE IF EXISTS demo;

CREATE DATABASE demo OWNER babelfish_user;

\c demo

CREATE EXTENSION IF NOT EXISTS "babelfishpg_tds" CASCADE;
ALTER SYSTEM SET babelfishpg_tsql.database_name = 'demo';
ALTER DATABASE demo SET babelfishpg_tsql.migration_mode = 'single-db'|'multi-db';
CALL SYS.INITIALIZE_BABELFISH('babelfish_user');
```

The `ALTER DATABASE` statement assigns the correct parameter to the database.
The init function will then perform all the steps needed to perform the setup.

