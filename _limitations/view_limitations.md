---
layout: default
title: System Catalog Views
nav_order: 5
---

## Supported Views

Babelfish provides limited support for SQL Server views. The following lists detail the functionality implemented for each version of Babelfish (and subsequent releases).

The following System Catalog Views are supported for versions 2.1.0 and higher: 

- `sys.syslanguages`
- `sys.indexes`
- `sys.all_views`
- `sys.database_files`
- `sys.sql_modules`
- `sys.system_sql_modules`
- `sys.all_sql_modules`
- `sys.xml_schema_collections`
- `sys.dm_hadr_database_replica_states`
- `sys.data_spaces`
- `sys.database_mirroring`
- `sys.database_role_members` 

The following System Catalog Views are supported for versions 1.2.0 and higher:

- `sys.dm_os_host_info`
- `sys.dm_exec_sessions`
- `sys.dm_exec_connections`
- `sys.endpoints`
- `sys.table_types`
- `sys.database_principals`
- `sys.sysprocesses`
- `sys.sysconfigures` - a single, read-only configuration setting is currently provided.
- `sys.syscurconfigs` - a single, read-only configuration setting is currently provided.
- `sys.configurations` - a single, read-only configuration setting is currently provided.

