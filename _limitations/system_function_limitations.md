---
layout: default
title: Unsupported Functions, Views, and Procedures 
nav_order: 3
---

## Unsupported functions, views, and procedures

Babelfish provides limited support for SQL Server system-implemented functions, views, and procedures. The following lists detail the functionality implemented for each version of Babelfish (and subsequent releases).

### Built-in Functions

The following Built-in Functions are supported for versions 2.1.0 and higher: 

- IS_MEMBER()
- IS_ROLEMEMBER()
- HAS_PERMS_BY_NAME() 

The following Built-in functions are supported for versions 1.2.0 and higher: 

- COLUMNS_UPDATED()
- UPDATE()
- FULLTEXTSERVICEPROPERTY()
- ISJSON()
- JSON_QUERY()
- JSON_VALUE()
- HAS_DBACCESS()
- SUSER_SID()
- SUSER_SNAME()
- IS_SRVROLEMEMBER()

The following Built-in functions are supported for versions 1.0.0 and higher:

- `SQUARE()`
- `CONCAT_WS()`
- `DATEFROMPARTS()`
- `DATETIMEFROMPARTS()`
- `ORIGINAL_LOGIN()`
- `SESSION_USER()`
- `CHOOSE()`
- `CURSOR_STATUS()`
- `SCHEMA_NAME()`
- `TRIGGER_NESTLEVEL()` is supported but only without arguments.

### System Catalog Views

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

### System-provided Stored Procedures

The following System-provided Stored Procedures are supported for versions 2.1.0 and higher: 

- `SP_SPROC_COLUMNS`
- `SP_SPROC_COLUMNS_100`
- `SP_HELPROLE`
- `SP_HELPROLEMEMBER` 
 
The following System-provided Stored Procedures are supported for versions 1.2.0 and higher:

- `SP_TABLE_PRIVILEGES`
- `SP_COLUMN_PRIVILEGES`
- `SP_SPECIAL_COLUMNS`
- `SP_FKEYS`, `SP_PKEYS`
- `SP_STORED_PROCEDURES`
- `XP_QV`
- `SP_DESCRIBE_UNDECLARED_PARAMETERS`
- `SP_HELPUSER`

The following System-provided Stored Procedures are supported for versions 1.0.0 and higher: 

- `SP_HELPDB`
- `SP_GETAPPLOCK`
- `SP_RELEASEAPPLOCK`
- `SP_COLUMNS`
- `SP_COLUMNS_100`
- `SP_COLUMNS_MANAGED`
- `SP_CURSOR_LIST`
- `SP_DATATYPE_INFO`
- `SP_DATATYPE_INFO_100`
- `SP_DESCRIBE_CURSOR`
- `SP_DESCRIBE_FIRST_RESULT_SET`
- `SP_DESCRIBE_UNDECLARED_PARAMETERS`
- `SP_OLEDB_RO_USRNAME`
- `SP_PREPARE`
- `SP_TABLECOLLATIONS_100`
- `SP_TABLES`
- `SP_UNPREPARE` 
- `SP_STATISTICS`
- `SP_STATISTICS_100`
- `SP_UPDATESTATS`
- `SP_PKEYS`
- `SP_DATABASES`
- `SP_CURSOR`
- `SP_CURSOROPEN`
- `SP_CURSORPREPARE`
- `SP_CURSOREXECUTE`
- `SP_CURSORPREPEXEC`
- `SP_CURSORUNPREPARE`
- `SP_CURSORFETCH`
- `SP_CURSOROPTION`
- `SP_CURSORCLOSE`
|
