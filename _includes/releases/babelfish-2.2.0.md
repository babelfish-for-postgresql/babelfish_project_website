- Babelfish Version: 2.2.0
- PostgreSQL Server Version: 14.5
- Download source distributions:
  - [BABEL_2_2_0__PG_14_5.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_2_0__PG_14_5/BABEL_2_2_0__PG_14_5.zip)
  - [BABEL_2_2_0__PG_14_5.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_2_0__PG_14_5/BABEL_2_2_0__PG_14_5.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: September 8, 2022

## Overview

Babelfish 2.2.0 contains enhancements and fixes that improve the user experience, including:

- Support for more catalogs: `assembly_types`, `numbered_procedures`, `triggers`, `spatial_index_tessellations`, `plan_guides`, `synonyms`, `events`, `trigger_events`, `fulltext_indexes`, `dm_hadr_cluster`, `xml_indexes`, `change_tracking_tables`, `key_constraints`, `database_filestream_options`, `filetable_system_defined_objects`, `hash_indexes`, `filegroups`, `master_files`, `assembly_modules`, `change_tracking_databases`, `database_recovery_status`, `fulltext_catalogs`, `fulltext_stoplists`, `fulltext_indexes`, `fulltext_index_columns`, `fulltext_languages`, `selective_xml_index_paths`, `spatial_indexes`, `filetables`, `registered_search_property_lists`, `syspolicy_configuration`, `syspolicy_system_health_state`.
- Support for the `sp_helpsrvrolemember` stored procedure.
- Support for the following INFORMATION_SCHEMA catalogs: `COLUMN_DOMAIN_USAGE`, `CONSTRAINT_COLUMN_USAGE`, `CHECK_CONSTRAINTS`, `ROUTINES`, `VIEWS`.
- Support for the `msdb.dbo.fn_syspolicy_is_automation_enabled()` system function.

## Changes

This version of Babelfish adds support for the following features:

- Support for cross-database procedure execution.
- Support for `CROSS APPLY` and `OUTER APPLY` (lateral join).
- New built-in function support: `SYSTEM_USER`, `HOST_NAME()`; The `SID_BINARY()` function is supported but will always return `NULL` in Babelfish.
- Support for `CAST()` of numeric expressions to `DATETIME`.
- Collation updates: support for multi-byte client encodings other than `UTF-16` for `VARCHAR(n)`.
- Support for the `@@LANGUAGE` variable with constant value `us_english`.
- Support for join hints and query hints.
- Support for old-style function calls with `::` preceding the function name.
- `SET NO_BROWSETABLE {ON|OFF}` is now subject to the `escape_hatch_session_settings` escape hatch, so no error will be raised when set to `ignored`.
- `SET PARSEONLY {ON|OFF}` is now supported. Previously this would raise an error unless the `escape_hatch_session_settings` escape hatch was set to `ignored`.
- The `bcp` utility now supports the `-E` flag (for identity columns) and the `-b` flag (for batching inserts).
- The `DATABASE_DEFAULT` collation is now supported; note that this will reference the server/instance-level collation that was specified when the Babelfish instance was created, as Babelfish does not currently support collations on database level.
- For `OBJECTPROPERTY()` and `OBJECTPROPERTYEX()`, the following properties are now supported: `ExecIsAnsiNullsOn`, `ExecIsQuotedIdentOn`, `IsDefault`, `IsDefaultCnst`, `IsDeterministic`, `IsIndexed`, `IsInlineFunction`, `IsMSShipped`, `IsPrimaryKey`, `IsProcedure`, `IsRule`, `IsScalarFunction`, `IsSchemaBound`, `IsTable`, `IsTableFunction`, `IsTrigger`, `IsUserTable`, `IsView`, `OwnerId`, `TableFulltextPopulateStatus`, `TableHasVarDecimalStorageFormat`.
- `OBJECTPROPERTYEX()` supports the `BaseType`property.
- `INDEXPROPERTY()` supports the following properties: `IndexFillFactor`, `IndexID`, `IsClustered`, `IsDisabled`, `IsHypothetical`, `IsPadIndex`, `IsPageLockDisallowed`, `IsRowLockDisallowed`, `IsUnique`.
- Support for the `sp_helpsrvrolemember` stored procedure.
- Support for the `msdb.dbo.fn_syspolicy_is_automation_enabled()` system function.
- Support for more catalogs: `assembly_types`, `numbered_procedures`, `triggers`, `spatial_index_tessellations`, `plan_guides`, `synonyms`, `events`, `trigger_events`, `fulltext_indexes`, `dm_hadr_cluster`, `xml_indexes`, `change_tracking_tables`, `key_constraints`, `database_filestream_options`, `filetable_system_defined_objects`, `hash_indexes`, `filegroups`, `master_files`, `assembly_modules`, `change_tracking_databases`, `database_recovery_status`, `fulltext_catalogs`, `fulltext_stoplists`, `fulltext_indexes`, `fulltext_index_columns`, `fulltext_languages`, `selective_xml_index_paths`, `spatial_indexes`, `filetables`, `registered_search_property_lists`, `syspolicy_configuration`, `syspolicy_system_health_state`.
- Support for new `INFORMATION_SCHEMA` catalogs: `COLUMN_DOMAIN_USAGE`, `CONSTRAINT_COLUMN_USAGE`, `CHECK_CONSTRAINTS`, `ROUTINES`, `VIEWS`
- Function `fn_mapped_system_error_list()` lists the PG error code mapped to `@@ERROR codes`, as well as the corresponding error message text. This function also exists in previous releases but did not include mapping details.
- Support for the `babelfishpg_tsql.escape_hatch_showplan_all` escape hatch. When set to `ignore`, the `SET SHOWPLAN_ALL` and `SET STATISTICS PROFILE` will behave like `SET BABELFISH_SHOWPLAN_ALL` and `SET BABELFISH_STATISTICS PROFILE`; when set to `strict`, `SET SHOWPLAN_ALL` and `SET STATISTICS PROFILE` are silently ignored. Note that the query plan information displayed is PostgreSQL-style, rather than SQL Server-style. For more information, see [Reviewing a Query Plan](https://babelfishpg.org/docs/usage/query_planning/).
 
## Fixes

- When inserting a NULL value into a `DATETIME` column, a NULL is now actually inserted, as opposed to being set to `1900-01-01 00:00:00` as in previous behavior. Column values in tables created in a previous Babelfish release are not affected.
- `TIME` datatypes that return 7 digits in SQL Server will now return 7 digits in Babelfish as well, with the 7th digit always being zero. In addition, a rounding issue that sometimes affected the 6th digit has been resolved.

## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

