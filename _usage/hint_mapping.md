---
layout: default
title: Using Hint Mapping
nav_order: 9
---

## Using Query Hint Mapping

Support for query hint mapping is available with Babelfish version 2.3.0. 

Query optimizers do their best to select the best execution plan for your workload based on an engine’s cost model and column/table statistics, but real-world datasets show that query optimizers sometimes don't make the best choices. You can use a query hint to encourage the query optimizer to avoid performance issues caused by bad execution plans.  

A query hint instructs the database engine how to execute a query. Babelfish can use the [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan) extension to create and manage query hints.


### Installing pg_hint_plan

Babelfish version 2.3.0 supports version 1.4 of [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan/releases/tag/REL14_1_4_0). To install pg_hint_plan:

1. Download the  `pg_hint_plan14` module. 
2. Navigate to the top of the source tree. 
3. Assume the identity of the cluster owner, and run `make`, and then `make install`. 
4. Modify your PATH environment variable to include the Babelfish PostgreSQL installation.

You are not required to CREATE the pg_hint_plan extension, but you must either LOAD the extension.  Use the following command to load the extension for use in an individual session:

```sql
postgres=# LOAD 'pg_hint_plan';
LOAD
```

Or, to enable the extension globally, add the extension to the end of the `shared_preload_libraries` parameter in the `postgresql.conf` and reload the parameters.


### How to Turn on T-SQL Hints 

By default, Babelfish ignores all T-SQL hints. To apply the supported T-SQL hints,  you need to use `sp_babelfish_configure` to turn on `enable_pg_hint` . Connect to the TDS listener port and run the following command:

```sql
EXEC sp_babelfish_configure 'enable_pg_hint', 'on' [, 'server'] 
```

Once `enable_pg_hint` is set to `ON`, Babelfish applies the following T-SQL hints:

* `INDEX` hints
* `JOIN` hints
* `FORCE ORDER` hints
* `MAXDOP` hints

### Limitations

- If a query plan is cached before `enable_pg_hint` is turned on, hints won’t be applied in the same session. If you create a new session, hints will be applied as expected.
- If schema names are explicitly given, then hints cannot be applied. A workaround is to use table aliases.
- Views and sub-queries cannot be hinted.
- Hints do not work for `UPDATE`/`DELETE` statements with joins.
- An index hint for a non-existing index or table is silently ignored.
- `FORCE ORDER` hints do not work for HASH joins and non-ANSI joins.

