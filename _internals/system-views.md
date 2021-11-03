---
layout: default
title: Babelfish system views
nav_order: 4
---

## Babelfish system views

Once in a while, an application has to access an MS SQL-compatible system view
or a server side function to
work properly. This is especially true for graphical user interfaces. However,
accessing an MS SQL-compatible system view is also necessary for some applications
which have to collect information from the database to function properly.

Providing support for system views is therefore important. The following views
are currently available:

- `sys.all_columns`
- `sys.all_objects`
- `sys.all_views`
- `sys.columns`
- `sys.databases`
- `sys.foreign_key_columns`
- `sys.foreign_keys`
- `sys.identity_columns`
- `sys.indexes`
- `sys.key_constraints`
- `sys.objects`
- `sys.pg_namespace_ext`
- `sys.procedures`
- `sys.schemas`
- `sys.server_principals`
- `sys.sp_columns_100_view`
- `sys.sp_tables_view`
- `sys.spt_columns_view_managed`
- `sys.spt_tablecollations_view`
- `sys.sql_modules`
- `sys.syscharsets`
- `sys.sysdatabases`
- `sys.sysforeignkeys`
- `sys.sysindexes`
- `sys.sysobjects`
- `sys.sysprocesses`
- `sys.system_objects`
- `sys.tables`
- `sys.types`
- `sys.views`

The content and the structure of these views are as compatible with MS SQL as
technically possible. If you want to find out more check out the [Microsoft
documentation](https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/object-catalog-views-transact-sql?view=sql-server-ver15)
describing this functionality.
