---
layout: default
title: Reviewing a Query Plan
nav_order: 8
---

## Reviewing a Query Plan

Babelfish version 2.1.0 includes support for functions and parameters that allow you to review estimated and actual (executed) query plans. This allows you to use the TDS port to identify and refine slow-performing queries. The functions can display an query plan for:

- `SELECT`, `INSERT`, `UPDATE`, and `DELETE` statements
- Nested procedures, multiple statements in a batch
- Variable declarations (for example, `DECLARE @t TABLE (a int, b int);`)

The functions *do not* support query plan retrieval from functions, control flows, and cursors.

You can use a SET statement on the TDS port to turn on/off the following functions: 

- SET BABELFISH_STATISTICS PROFILE {ON|OFF} to display the query plan used to execute a statement. The command implements the behavior of the [PostgreSQL EXPLAIN ANALYZE statement] (https://www.postgresql.org/docs/current/using-explain.html#USING-EXPLAIN-ANALYZE).
    
- SET BABELFISH_SHOWPLAN_ALL {ON|OFF} to display estimated execution plans for a statement without performing the command. The command implements the behavior of the [PostgreSQL EXPLAIN statement](https://www.postgresql.org/docs/current/using-explain.html#USING-EXPLAIN-BASICS).

For example, the following command sequence turns on query planning, returns the query plan for the SELECT statement without executing the command, and then turns off query planning:

```
SET BABELFISH_SHOWPLAN_ALL ON
GO
SELECT b.bid, b.bbalance, t.tid, t.tbalance FROM pgbench_branches b, pgbench_tellers t WHERE b.bid=t.bid ORDER BY b.bid;
GO
                                     QUERY PLAN                                      
-------------------------------------------------------------------------------------
 Sort  (cost=37.96..39.21 rows=500 width=16)
   Sort Key: b.bid
   ->  Hash Join  (cost=3.12..15.55 rows=500 width=16)
         Hash Cond: (t.bid = b.bid)
         ->  Seq Scan on pgbench_tellers t  (cost=0.00..11.00 rows=500 width=12)
         ->  Hash  (cost=2.50..2.50 rows=50 width=8)
               ->  Seq Scan on pgbench_branches b  (cost=0.00..2.50 rows=50 width=8)
(7 rows)

SET BABELFISH_SHOWPLAN_ALL OFF
GO
```

If you use the BABELFISH_STATISTICS PROFILE function, Babelfish will display the query plan that provides the best performance as it invokes the SELECT statement.  For example, the following command sequence returns an estimated cost to execute the SELECT statement and then turns off query planning:

```
SET BABELFISH_STATISTICS PROFILE ON
GO
SELECT b.bid, b.bbalance, t.tid, t.tbalance FROM pgbench_branches b, pgbench_tellers t WHERE b.bid=t.bid ORDER BY b.bid;
GO

                                                           QUERY PLAN                                                           
--------------------------------------------------------------------------------------------------------------------------------
 Sort  (cost=37.96..39.21 rows=500 width=16) (actual time=13.295..13.345 rows=500 loops=1)
   Sort Key: b.bid
   Sort Method: quicksort  Memory: 48kB
   ->  Hash Join  (cost=3.12..15.55 rows=500 width=16) (actual time=4.035..13.111 rows=500 loops=1)
         Hash Cond: (t.bid = b.bid)
         ->  Seq Scan on pgbench_tellers t  (cost=0.00..11.00 rows=500 width=12) (actual time=2.263..11.175 rows=500 loops=1)
         ->  Hash  (cost=2.50..2.50 rows=50 width=8) (actual time=1.733..1.734 rows=50 loops=1)
               Buckets: 1024  Batches: 1  Memory Usage: 10kB
               ->  Seq Scan on pgbench_branches b  (cost=0.00..2.50 rows=50 width=8) (actual time=0.012..1.712 rows=50 loops=1)
 Planning Time: 0.218 ms
 Execution Time: 13.452 ms
(11 rows)

SET BABELFISH_STATISTICS PROFILE OFF
```


**Query Plan display options**

You can use parameter settings that are supported by the PostgreSQL [EXPLAIN and EXPLAIN ANALYZE statements](https://www.postgresql.org/docs/current/sql-explain.html) to control the type of information that is displayed with your query plan.  To query Babelfish for a list of parameters and their current values, use the following command:

```
SELECT name,
       setting,
       short_desc,
       vartype,
       enumvals,
       boot_val,
       reset_val,
       pending_restart
FROM pg_settings
WHERE name LIKE '%babelfishpg_tsql.explain%';
```

| name                               | setting | short_desc                          | vartype | enumvals | boot_val | reset_val | pending_restart |
| ---------------------------------- | ------- | ----------------------------------- | ------- | -------- | -------- | --------- | --------------- |
| babelfishpg_tsql.explain_buffers | off | Include information on buffer usage bool | off | off | FALSE |
| babelfishpg_tsql.explain_costs | on | Include information on estimated startup and total cost | bool | on | on | FALSE |
| babelfishpg_tsql.explain_format text | Specify the output format, which can be TEXT, XML, JSON, or YAML | enum | {text,xml,json,yaml} | text | text | FALSE |
| babelfishpg_tsql.explain_settings | off | Include information on configuration parameters | bool | off | off | FALSE |
| babelfishpg_tsql.explain_summary | off | Include summary information (e.g., totaled timing information) after the query plan | bool | off | off | FALSE |
| babelfishpg_tsql.explain_timing | off | Include actual startup time and time spent in each node in the output | bool | off | off | FALSE |
| babelfishpg_tsql.explain_verbose | off | Display additional information regarding the plan | bool | off | off | FALSE |
| babelfishpg_tsql.explain_wal | off | Include information on WAL record generation | bool | off | off | FALSE |

You can use the PostgreSQL [set_config()](https://www.postgresql.org/docs/14/functions-admin.html#FUNCTIONS-ADMIN-SET) function to set a parameter value on the command line. Specify the following arguments:

```
SELECT set_config(‘babelfish_tsql.parameter_name’, ‘value’, is_local); 
```

Where:

`babelfish_tsql.parameter_name` is the name of the parameter you want to set.
`value` is the parameter value.
`is_local` : specify `true` if you wish the parameter should revert to its original setting when the transaction completes; set to `false` to make the setting persistent to the end of the session.

For example, the following command sets `babelfishpg_tsql.explain_verbose` parameter to `on`; the setting reverts to the original value when the session ends:

```
SELECT set_config('babelfishpg_tsql.explain_verbose', 'on', false);
```

You can also set the parameters in the `postgresql.conf` file.  After setting the parameters in the configuration file, use the following command to reload the configuration parameters:

```
SELECT pg_reload_conf();
```

**Example**

The following example shows a verbose version of the query plan used to 

```
select set_config('babelfishpg_tsql.explain_verbose', 'on', false);
GO
set BABELFISH_SHOWPLAN_ALL on;
GO
SELECT b.bid, b.bbalance, t.tid, t.tbalance FROM pgbench_branches b, pgbench_tellers t WHERE b.bid=t.bid ORDER BY b.bid;
GO

                                         QUERY PLAN                                         
--------------------------------------------------------------------------------------------
 Sort  (cost=37.96..39.21 rows=500 width=16)
   Output: b.bid, b.bbalance, t.tid, t.tbalance
   Sort Key: b.bid
   ->  Hash Join  (cost=3.12..15.55 rows=500 width=16)
         Output: b.bid, b.bbalance, t.tid, t.tbalance
         Inner Unique: true
         Hash Cond: (t.bid = b.bid)
         ->  Seq Scan on public.pgbench_tellers t  (cost=0.00..11.00 rows=500 width=12)
               Output: t.tid, t.tbalance, t.bid
         ->  Hash  (cost=2.50..2.50 rows=50 width=8)
               Output: b.bid, b.bbalance
               ->  Seq Scan on public.pgbench_branches b  (cost=0.00..2.50 rows=50 width=8)
                     Output: b.bid, b.bbalance
(13 rows)

set BABELFISH_SHOWPLAN_ALL off;
GO
select set_config('babelfishpg_tsql.explain_verbose', 'off', false);
GO
