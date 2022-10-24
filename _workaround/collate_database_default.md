---
layout: default
title: COLLATE DATABASE_DEFAULT
nav_order: 1
---

## COLLATE DATABASE_DEFAULT


In a T-SQL `CREATE TABLE` statement, you can include the `COLLATE DATABASE_DEFAULT` to specify that a column or table should use the database's default collation. In Babelfish, you should either remove the COLLATE DATABASE_DEFAULT clause, or specify the collation name.

```sql
DROP TABLE IF EXISTS t1
-- This CREATE TABLE statement works in T-SQL but not in Babelfish.
CREATE TABLE t1( col1 NVARCHAR(24) COLLATE DATABASE_DEFAULT NOT NULL )

DROP TABLE IF EXISTS t1
-- This CREATE TABLE statement works the same in T-SQL and Babelfish.
CREATE TABLE t1( col1 NVARCHAR(24) NOT NULL )
```

Removing the COLLATE DATABASE_DEFAULT clause as shown above is generally considered preferable, because you don't have to hardcode any collation names in your source code. If you do want to specify the exact collation name instead, you can retrieve the collation for the database you're using with the following command:

```sql
SELECT CAST(DATABASEPROPERTYEX('my_database', 'Collation') AS varchar(64)) AS CollationId

CollationId                                                   
----------------------------------------------------------------
sql_latin1_general_cp1_ci_as                                    
```

Then, specify the database's collation instead of `DATABASE_DEFAULT` in Babelfish.

```sql
drop table if exists t1
CREATE TABLE t1( col1 NVARCHAR(24) COLLATE sql_latin1_general_cp1_ci_as NOT NULL )
```

For more information about using Babelfish from the TDS port and the PostgreSQL port, [visit the Babelfish website](https://babelfishpg.org/docs/usage/interoperability/).
