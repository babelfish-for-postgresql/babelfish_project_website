---
layout: default
title: System Views
nav_order: 13
---

## Babelfish system views 

Once in a while, an application has to access an MS SQL-compatible system view to
work properly. This is especially true for graphical user interfaces. However,
accessing an MS SQL-compatible system view is also necessary for some applications 
which have to collect information from the database to function properly.

Providing support for system views is therefore important. The following views
are currently available:

- `sys.sysdatabases`
- `sys.pg_namespace_ext `
- `sys.server_principals`
- `sys.databases`
- `sys.tables `
- `sys.views `
- `sys.all_columns`
- `sys.all_views `
- `sys.columns `
- `sys.foreign_key_columns`
- `sys.foreign_keys `
- `sys.identity_columns `
- `sys.indexes `
- `sys.key_constraints `
- `sys.procedures`
- `sys.schemas `
- `sys.sql_modules`
- `sys.sysforeignkeys `
- `sys.sysindexes `
- `sys.sysprocesses `
- `sys.types `
- `sys.objects `
- `sys.sysobjects `
- `sys.all_objects `
- `sys.system_objects `
- `sys.sysmail_allitems`
- `sys.sysmail_faileditems`
- `sys.sysmail_mailattachments`
- `sys.sysmail_sentitems`
- `sys.sysmail_unsentitems`
- `sys.syscharsets`

The content and the structure of these views are as compatible with MS SQL as
technically possible. If you want to find out more check out the [Microsoft
documentation](https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/object-catalog-views-transact-sql?view=sql-server-ver15)
describing this functionality.
