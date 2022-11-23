---
layout: default
title: Workarounds
nav_order: 1
---

You can use the workarounds in this section to replace unsupported SQL Server syntax or functionality with PostgreSQL functionality or features. Other familiar SQL Server functionality can be replaced by PostgreSQL tools and utilities.  The following table provides links to the PostgreSQL documentation for PostgreSQL features:

| SQL Server feature | PostgreSQL feature | 
| ------- | ------- | 
| SQL Server Replication | [PostgreSQL Replication ](https://www.postgresql.org/docs/current/high-availability) |
| DBCC CLEANTABLE | [PostgreSQL VACCUUM utilities](https://www.postgresql.org/docs/15/routine-vacuuming) |
| SQL Server full-text search | [PostgreSQL full-text search ](https://www.postgresql.org/docs/15/textsearch) |
| SQL Profiler | [auto_explain ](https://www.postgresql.org/docs/current/auto-explain) |
| SQL Server spatial features | [PostGIS spatial data handler](https://postgis.net) |


## Workaround List

- [COLLATE DATABASE_DEFAULT](https://babelfishpg.org/docs/workaround/collate_database_default)
- [Default parameter values](https://babelfishpg.org/docs/workaround/default_param_values)
- [Dynamically defined cursors](https://babelfishpg.org/docs/workaround/dynamically_defined_cursor)
- [Partitioning workaround for a cluster running in Single DB mode](https://babelfishpg.org/docs/workaround/partitioned_table)
- [Rebuilding table indexes](https://babelfishpg.org/docs/workaround/rebuilding_table_indexes)
- [SET ROWCOUNT](https://babelfishpg.org/docs/workaround/set_rowcount)