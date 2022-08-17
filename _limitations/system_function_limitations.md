---
layout: default
title: System Function, View, and Procedure Limitations 
nav_order: 3
---

## Unsupported functions, views, and procedures

In this chapter, you will learn about functional differences between PostgreSQL with Babelfish
and SQL Server.

The following table contains a list of SQL Server features that are currently
not implemented or partially implemented in Babelfish.  This list is subject to change.

| Functionality or Syntax | Behavior              | Workaround            | 
| ----------------------- | --------------------- | --------------------- |
| `Built-in Functions` | Version 2.1.0 adds support for IS_MEMBER(), IS_ROLEMEMBER(), HAS_PERMS_BY_NAME() 
Version 1.2.0 supports COLUMNS_UPDATED(), UPDATE(), FULLTEXTSERVICEPROPERTY(), ISJSON(), JSON_QUERY(), JSON_VALUE(), HAS_DBACCESS(), SUSER_SID(), SUSER_SNAME(), IS_SRVROLEMEMBER()
In version 1.0.0, Built-in functions are partially supported: `SQUARE()`, `CONCAT_WS()`, `DATEFROMPARTS()`, `DATETIMEFROMPARTS()`, `ORIGINAL_LOGIN()`, `SESSION_USER()`, `CHOOSE()`, `CURSOR_STATUS()`; `TRIGGER_NESTLEVEL()` is supported but only without arguments; `SCHEMA_NAME()` is fully supported. | |
| System-provided stored procedures are partially supported | Version 2.1.0 adds support for `SP_SPROC_COLUMNS`, `SP_SPROC_COLUMNS_100`, `SP_HELPROLE`, `SP_HELPROLEMEMBER` 
 Version 1.2.0 supports `SP_TABLE_PRIVILEGES`, `SP_COLUMN_PRIVILEGES`, `SP_SPECIAL_COLUMNS`, `SP_FKEYS`, `SP_PKEYS`, `SP_STORED_PROCEDURES`, `XP_QV`, `SP_DESCRIBE_UNDECLARED_PARAMETERS`, `SP_HELPUSER`
 Version 1.0.0 supported: `SP_HELPDB`, `SP_GETAPPLOCK`, `SP_RELEASEAPPLOCK`, `SP_COLUMNS`, `SP_COLUMNS_100`, `SP_COLUMNS_MANAGED`, `SP_CURSOR_LIST`, `SP_DATATYPE_INFO`, `SP_DATATYPE_INFO_100`, `SP_DESCRIBE_CURSOR`, `SP_DESCRIBE_FIRST_RESULT_SET`, `SP_DESCRIBE_UNDECLARED_PARAMETERS`, `SP_OLEDB_RO_USRNAME`, `SP_PREPARE`, `SP_TABLECOLLATIONS_100`, `SP_TABLES`, `SP_UNPREPARE`, `SP_STATISTICS`, `SP_STATISTICS_100`, `SP_UPDATESTATS`, `SP_PKEYS`, `SP_DATABASES`, `SP_CURSOR`, `SP_CURSOROPEN`, `SP_CURSORPREPARE`, `SP_CURSOREXECUTE`, `SP_CURSORPREPEXEC`, `SP_CURSORUNPREPARE`, `SP_CURSORFETCH`, `SP_CURSOROPTION`, `SP_CURSORCLOSE` | |
| `System Catalog Views` | Version 2.1.0 adds support for `sys.syslanguages`, `sys.indexes`, `sys.all_views`, `sys.database_files`, `sys.sql_modules`, `sys.system_sql_modules`, `sys.all_sql_modules`, `sys.xml_schema_collections`, `sys.dm_hadr_database_replica_states`, `sys.data_spaces`, `sys.database_mirroring`, `sys.database_role_members` 
 Version 1.2.0 supports the following system catalog views: `sys.dm_os_host_info`, `sys.dm_exec_sessions`, `sys.dm_exec_connections`, `sys.endpoints`, `sys.table_types`, `sys.database_principals`, `sys.sysprocesses`, `sys.sysconfigures`, `sys.syscurconfigs`, `sys.configurations`. 
 For `sys.sysconfigures`, `sys.syscurconfigs`, `sys.configurations`, only a single, read-only configuration setting is currently provided. | |
