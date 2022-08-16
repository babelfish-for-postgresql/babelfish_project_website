
---
layout: default
title: Improving Query Performance with pg_hint_plan
nav_order: 10
---

## Improving Query Performance with pg_hint_plan

The query optimizer reviews a query and selects the best query execution plan based on engine cost and column and table statistics. Real world datasets often reveal the limitations of query optimizers by misleading the optimizer into selecting a query execution plan that doesn't lead to the best performance. 

You can use query hints to address performance issues caused by bad query execution plans.  A hint is a detailed instruction to the database engine about which execution plan it should use to execute a query. For example, a hint may tell the engine to follow a sequential scan even if the query optimizer would decide otherwise.

You can use the [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan) open-source extension to use query hints to help optimize query performance.


### Installing pg_hint_plan

Download the pg_hint_plan module (Babelfish 2.2.x supports `pg_hint_plan14` 1.4) from the [Github project site](https://github.com/ossc-db/pg_hint_plan/releases/tag/REL14_1_4_0). Navigate to the top of the source tree and run `make`, and then `make install` as the cluster owner.

Modify your PATH environment variable to include the target PostgreSQL installation.

Modify the `postgresql.conf` file, adding `pg_hint_plan` to the `shared_preload_libraries` or `session_preload_libraries` parameter. Then you can use pg_hint_plan’s query hints in T-SQL connections.


### Using T-SQL Hint Mapping with Babelfish

By default, Babelfish ignores all T-SQL hints. To apply a T-SQL hint, you need to turn on the `babelfishpg_tsql.enable_hint_mapping` GUC; you can use the following command on the Babelfish TDS port:

```sql
SELECT set_config('babelfishpg_tsql.enable_hint_mapping', 'on', false);
```

### Supported Hints

After setting `babelfishpg_tsql.enable_hint_mapping` to `ON` and loading `pg_hint_plan` you can use the following [T-SQL hints](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-query?view=sql-server-ver16) on the TDS port.

#### Index Hints

You can specify an [INDEX hint](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-join?view=sql-server-ver16) in two ways:

- As a table hint; for example:

```sql
SELECT * FROM t1 (index(index_t1_b1)) WHERE b1 = 1
SELECT * FROM t1 with(index(index_t1_b1)) WHERE b1 = 1
```

- As a query hint through the OPTION clause; for example:

SELECT * FROM t1 WHERE b1=1 OPTION(table hint(t1, index(index_t1_b1)))

#### Join Hint

You can specify a [JOIN hint](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-join?view=sql-server-ver16) in two ways:

- As a join hint; for example:

```sql
SELECT * FROM t1 INNER MERGE JOIN t2 ON t1.a1 = t2.a2
```

- As a query hint; for example:

```sql
SELECT * FROM t1 JOIN t2 ON t1.a1 = t2.a2 OPTION(loop join)
```

A query hint may include a join hint specified both as a join hint and a query hint in a conflicting manner. An example of a conflicting join hint is:

```sql
SELECT * FROM t1 INNER MERGE JOIN t2 ON t1.a1 = t2.a2 OPTION(HASH JOIN)
```

In this case, the server returns the following error: C

```sql
Conflicting JOIN optimizer hints specified
```

#### FORCE ORDER Hint

You can use a [FORCE ORDER hint](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-join?view=sql-server-ver16) as a query hint specified with the OPTION clause. A force order hint specifies that the join order indicated by the query syntax is preserved during query optimization; for example:

```sql
SELECT * FROM t1 
            JOIN t2 ON t1.a1 = t2.a2
            JOIN t3 ON t1.a1 = t3.a3 OPTION(FORCE ORDER)
```

#### MAXDOP Hint

You can use a [MAXDOP hint](https://docs.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-join?view=sql-server-ver16) as a query hint specified with the OPTION clause. To apply this hint, you must first set the PostgreSQL `max_parallel_workers_per_gather` GUC to the value specified in the hint; for example:

```sql
SELECT * FROM t1 WHERE a1=1 OPTION(MAXDOP 4)
```

### Example

First, create the sample environment by creating test tables and turning on the `BABELFISH_SHOWPLAN_ALL` GUC:

```sql
1> CREATE TABLE t1 (a1 INT PRIMARY KEY, b1 INT);
2> CREATE TABLE t2 (a2 INT PRIMARY KEY, b2 INT);
3> SELECT set_config('babelfishpg_tsql.enable_hint_mapping', 'on', false);
4> GO

1> SET BABELFISH_SHOWPLAN_ALL ON;
2> GO
```

Then, query the tables with a simple join, with no hints:

```sql
1> SELECT * FROM t1 JOIN t2 ON t1.a1 = t2.a2; -- NO HINTS
2> GO
QUERY PLAN
------------------------------------------------------------------
Query Text: SELECT * FROM t1 JOIN t2 ON t1.a1 = t2.a2
Hash Join  (cost=60.85..99.39 rows=2260 width=16)
  Hash Cond: (t1.a1 = t2.a2)
  ->  Seq Scan on t1  (cost=0.00..32.60 rows=2260 width=8)
  ->  Hash  (cost=32.60..32.60 rows=2260 width=8)
        ->  Seq Scan on t2  (cost=0.00..32.60 rows=2260 width=8)
```

Then, query the tables using a merge join; the result set shows the execution costs:

```sql
1> SELECT * FROM t1 INNER MERGE JOIN t2 ON t1.a1 = t2.a2; -- USE MERGE JOIN
2> GO
QUERY PLAN
---------------------------------------------------------------------------------------------------
Query Text: /*+ MergeJoin(t1 t2) Leading(t1 t2)*/ SELECT * FROM t1 INNER JOIN t2 ON t1.a1 = t2.a2
Merge Join  (cost=0.31..190.01 rows=2260 width=16)
  Merge Cond: (t1.a1 = t2.a2)
  ->  Index Scan using t1_pkey on t1  (cost=0.15..78.06 rows=2260 width=8)
  ->  Index Scan using t2_pkey on t2  (cost=0.15..78.06 rows=2260 width=8)        
        
```

Then, query the same tables using a loop join:

```sql
1> SELECT * FROM t1 JOIN t2 ON t1.a1 = t2.a2 OPTION(LOOP JOIN); -- USE LOOP JOIN
2> GO
QUERY PLAN
----------------------------------------------------------------------------------------------------------------
Query Text: /*+ Set(enable_hashjoin off) Set(enable_mergejoin off) */ SELECT * FROM t1 JOIN t2 ON t1.a1 = t2.a2
Nested Loop  (cost=0.15..466.41 rows=2260 width=16)
  ->  Seq Scan on t1  (cost=0.00..32.60 rows=2260 width=8)
  ->  Index Scan using t2_pkey on t2  (cost=0.15..0.19 rows=1 width=8)
        Index Cond: (a2 = t1.a1)

1> SET BABELFISH_SHOWPLAN_ALL OFF;
2> GO
```


### Limitations

`pg_hint_plan` reads hints from only the first block comment, so if the query has any existing hints as a `pg_hint_plan` comment, it will be ignored. You can disable the feature using the GUC if the existing `pg_hint_plan` comment block should be considered:

```sql
1> CREATE TABLE t1 (a1 INT PRIMARY KEY, b1 INT);
2> CREATE TABLE t2 (a2 INT PRIMARY KEY, b2 INT);
3> SELECT set_config('babelfishpg_tsql.enable_hint_mapping', 'on', false);
4> GO

1> SET BABELFISH_SHOWPLAN_ALL ON;
2> GO

-- Query hints will be applied and the existing hint will be ignored as the GUC is on
1> SELECT /*+ NestLoop(t1,t2) */ * FROM t1 INNER MERGE JOIN t2 ON t1.a1 =t2.a2 
2> GO
QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------------
Query Text: /*+ MergeJoin(t1 t2) Leading(t1 t2)*/ SELECT /*+ NestLoop(t1 t2)*/ * FROM t1 INNER       JOIN t2 on t1.a1 = t2.a2
Merge Join  (cost=0.31..190.01 rows=2260 width=16)
  Merge Cond: (t1.a1 = t2.a2)
  ->  Index Scan using t1_pkey on t1  (cost=0.15..78.06 rows=2260 width=8)
  ->  Index Scan using t2_pkey on t2  (cost=0.15..78.06 rows=2260 width=8)
  
1> SET BABELFISH_SHOWPLAN_ALL OFF;
2> GO

1> SELECT set_config('babelfishpg_tsql.enable_hint_mapping', 'off', false);
2> GO

1> SET BABELFISH_SHOWPLAN_ALL ON;
2> GO

-- Query hints will be ignored and the existing hint will be applied as the GUC is off
1> SELECT /*+ NestLoop(t1,t2) */ * FROM t1 INNER MERGE JOIN t2 ON t1.a1 =t2.a2 
2> GO
QUERY PLAN
-----------------------------------------------------------------------------------------
Query Text: SELECT /*+ NestLoop(t1 t2)*/ * FROM t1 INNER       JOIN t2 on t1.a1 = t2.a2
Nested Loop  (cost=0.15..466.41 rows=2260 width=16)
  ->  Seq Scan on t1  (cost=0.00..32.60 rows=2260 width=8)
  ->  Index Scan using t2_pkey on t2  (cost=0.15..0.19 rows=1 width=8)
        Index Cond: (a2 = t1.a1)
```

You should note that `pg_hint_plan` cannot distinguish schema names:

```sql
1> CREATE TABLE t1 (a1 INT PRIMARY KEY, b1 INT);
2> CREATE SCHEMA s1
3> CREATE TABLE s1.t1 (a1 INT PRIMARY KEY, b1 INT);
4> SELECT set_config('babelfishpg_tsql.enable_hint_mapping', 'on', false);
5> GO

1> SET BABELFISH_SHOWPLAN_ALL ON;
2> GO

1> SELECT * FROM dbo.t1 INNER MERGE JOIN s1.t1 ON dbo.t1.a1 = s1.t1.a1; 
2> GO
QUERY PLAN
----------------------------------------------------------------------------------------------------------------------
Query Text: /*+ MergeJoin(t1 t1) Leading(t1 t1)*/ SELECT * FROM dbo.t1 INNER       JOIN s1.t1 ON dbo.t1.a1 = s1.t1.a1
Hash Join  (cost=60.85..99.39 rows=2260 width=16)
  Hash Cond: (t1.a1 = t1_1.a1)
  ->  Seq Scan on t1  (cost=0.00..32.60 rows=2260 width=8)
  ->  Hash  (cost=32.60..32.60 rows=2260 width=8)
        ->  Seq Scan on t1 t1_1  (cost=0.00..32.60 rows=2260 width=8)
``` 

`pg_hint_plan` does not support hints for views and sub-queries:

```sql
1> CREATE TABLE t1 (a INT PRIMARY KEY, b INT);
2> CREATE TABLE t2 (a INT PRIMARY KEY, b INT);
3> CREATE VIEW v1 AS SELECT * FROM t2 t1;
4> SELECT set_config('babelfishpg_tsql.enable_hint_mapping', 'on', false);
5> GO

1> SET BABELFISH_SHOWPLAN_ALL ON;
2> GO

1> SELECT * FROM t1 INNER MERGE JOIN v1 ON t1.a = v1.a;
2> GO
QUERY PLAN
----------------------------------------------------------------
Query Text: SELECT * FROM t1 INNER       JOIN v1 ON t1.a = v1.a
Hash Join  (cost=60.85..99.39 rows=2260 width=16)
  Hash Cond: (t1.a = t1_1.a)
  ->  Seq Scan on t1  (cost=0.00..32.60 rows=2260 width=8)
  ->  Hash  (cost=32.60..32.60 rows=2260 width=8)
        ->  Seq Scan on t2 t1_1  (cost=0.00..32.60 rows=2260 width=8)
```        

In the following example, `pg_hint_plan` is accidentally applied to underlying tables of a view:

```sql
1> CREATE TABLE t1 (a INT PRIMARY KEY, b INT);
2> CREATE TABLE t2 (a INT PRIMARY KEY, b INT);
3> CREATE INDEX t1_b ON t1(b);
4> CREATE INDEX t2_b ON t2(b);
5> CREATE VIEW v1 AS SELECT * FROM t2 t1;
6> SELECT set_config('babelfishpg_tsql.enable_hint_mapping', 'on', false);
7> GO

1> SET BABELFISH_SHOWPLAN_ALL ON;
2> GO

1> SELECT /*+ NoIndexScan(t1) */ * FROM t1 , t2 WHERE t1.b = t2.b;
2> GO
QUERY PLAN
---------------------------------------------------------------------------
Query Text: SELECT /*+ NoIndexScan(t1) */ * FROM t1 , t2 WHERE t1.b = t2.b
Merge Join  (cost=158.66..625.28 rows=25538 width=16)
  Merge Cond: (t2.b = t1.b)
  ->  Index Scan using t2_bt25ef84531ae508ec2af09f380b1eb29e1 on t2  (cost=0.15..78.06 rows=2260 width=8)
  ->  Sort  (cost=158.51..164.16 rows=2260 width=8)
        Sort Key: t1.b
        ->  Seq Scan on t1  (cost=0.00..32.60 rows=2260 width=8)


1> SELECT /*+ NoIndexScan(t1) */ * FROM t1 , v1 WHERE t1.b = v1.b;
2> GO
QUERY PLAN
---------------------------------------------------------------------------
Query Text: SELECT /*+ NoIndexScan(t1) */ * FROM t1 , v1 WHERE t1.b = v1.b
Merge Join  (cost=317.01..711.38 rows=25538 width=16)
  Merge Cond: (t1.b = t1_1.b)
  ->  Sort  (cost=158.51..164.16 rows=2260 width=8)
        Sort Key: t1.b
        ->  Seq Scan on t1  (cost=0.00..32.60 rows=2260 width=8)
  ->  Sort  (cost=158.51..164.16 rows=2260 width=8)
        Sort Key: t1_1.b
        ->  Seq Scan on t2 t1_1  (cost=0.00..32.60 rows=2260 width=8)
```        

