- Babelfish Version: 2.2.0
- PostgreSQL Server Version: 14.5
- Download source distributions:
  - [BABEL_2_2_0__PG_14_5.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_2_0__PG_14_5/BABEL_2_2_0__PG_14_5.zip)
  - [BABEL_2_2_0__PG_14_5.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_2_0__PG_14_5/BABEL_2_2_0__PG_14_5.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: November 15, 2022

## Overview

Babelfish 2.2.0 contains enhancements and fixes that improve the user experience, including:

### Security enhancements

- Fixed critical issues in Babelfish due to incorrect handling of user input for some application features. This is tracked in https://github.com/babelfish-for-postgresql/babelfish_extensions/security/advisories/GHSA-m399-rrc8-j6fj.

### High priority stability enhancements

- Fixed error handling in `sp_prepare` calls which can cause a server crash when a large number of parameters are sent by the application. Babelfish currently supports a maximum of 100 parameters for a procedure or function.
- Fixed error handling in SSL/TLS handshake for some client drivers.
- Fixed an issue where a login can access the database without creating a database user after the `DROP`/`CREATE` of a login.
- Fixed an issue where a login isn't dropped if it is logged in to any session.

## Changes

This version of Babelfish adds support for the following new features:

- Support for data migration using the BCP client and the bcp utility now supports `-E` flag (for identity columns) and `-b` flag (for batching inserts).
- Support for cross-database stored procedure execution.
- Support for `CROSS APPLY` and `OUTER APPLY` (lateral join).
- Support for the `SYSTEM_USER`, and `HOST_NAME` built-in functions. The `HOST_NAME` is visible in the `sys.sysprocesses` T-SQL view; the `SID_BINARY` function is supported but always returns `NULL` in Babelfish.
- Support for `CAST` function of numeric expressions to `DATETIME`.
- Support for `@@LANGUAGE` variable with the constant value of `us_english`.
- Support for the old-style function calls with `::` preceding the function name.
- Support for the `sp_helpsrvrolemember` stored procedure.
- Support for the `msdb.dbo.fn_syspolicy_is_automation_enabled system` function.
- Support for more catalogs: Support for more catalogs: `assembly_types`, `numbered_procedures`, `triggers`, `spatial_index_tessellations`, `plan_guides`, `synonyms`, `events`, `trigger_events`, `fulltext_indexes`, `dm_hadr_cluster`, `xml_indexes`, `change_tracking_tables`, `key_constraints`, `database_filestream_options`, `filetable_system_defined_objects`, `hash_indexes`, `filegroups`, `master_files`, `assembly_modules`, `change_tracking_databases`, `database_recovery_status`, `fulltext_catalogs`, `fulltext_stoplists`, `fulltext_indexes`, `fulltext_index_columns`, `fulltext_languages`, `selective_xml_index_paths`, `spatial_indexes`, `filetables`, `registered_search_property_lists`, `syspolicy_configuration`, `syspolicy_system_health_state`.
- Support for new `INFORMATION_SCHEMA` catalogs: `COLUMN_DOMAIN_USAGE`, `CONSTRAINT_COLUMN_USAGE`, `CHECK_CONSTRAINTS`, `ROUTINES`, `VIEWS`.
- Support for executing stored procedures with `sp_ prefix` in the master database without using a three-part name.
- Support for the `babelfishpg_tsql.escape_hatch_showplan_all` escape hatch. When set to `ignore`, the `SET SHOWPLAN_ALL` and `SET STATISTICS PROFILE` will behave like `SET BABELFISH_SHOWPLAN_ALL` and `SET BABELFISH_STATISTICS PROFILE`. When set to `strict`, `SET SHOWPLAN_ALL` and `SET STATISTICS PROFILE` are silently ignored. Note that the query plan information displayed is PostgreSQL-style, rather than SQL Server-style. For more information, see [Reviewing a Query Plan](https://babelfishpg.org/docs/usage/query_planning/).


### This version of Babelfish adds support for the following additional improvements and enhancements:

- Fixed an issue where a value of `1900-01-01 00:00:00` was stored when a `NULL` was inserted or updated into a `datetime` column. A `NULL` value is inserted now. Column values in tables created in a previous Babelfish release are not affected.
- `TIME` datatypes that return 7 digits in SQL Server now returns 7 digits in Babelfish as well, with the 7th digit always being zero. In addition, a rounding issue that sometimes affected the 6th digit has been resolved.
- Increased parameter lengths for `@tsql` and `@params` for `sp_describe_first_result_set` from `nvarchar(384)` to `nvarchar(8000)`. This increases the number of columns the DMS Babelfish target endpoint can support from 25 to 1000.
- Improved performance for system stored procedures: `sys.sp_tablecollations_100`, `sp_columns_managed`, and `sp_describe_undeclared_parameters`. This fix improves the performance of the DMS Babelfish target endpoint, SQL Server Management Studio import and export wizard, and prevents timeouts.
- Fixed an issue with Bitwise `NOT ~` operator and it returns the correct result with BIT data types now.
- Fixed an issue with `BCP` when it is used for tables that have triggers.
- Fixed an issue of backend failure in `INSERT BULK` when using Import-Export wizard.
- Fixed an issue where SQL Server Management Studio (SSMS) returns an error while expanding `Triggers` for a table in the Object Explorer view.
- Fixed an issue where the name column in the `sys.sysobjects` view was using case sensitive collation.
- Fixed an issue to refer SQL objects inside a function and is resolved to the function's schema rather than the default schema of the user.
- Fixed an issue where a backend crash can occur when using the `ISNULL` function with `CONVERT` on computed columns.
- Fixed an issue with the `DATEPART` function when the date argument is a string literal.
- Fixed an issue where a role can be dropped even if it has members.
- Fixed an issue so that the database user can't add to a role or drop from a role.
- Fixed an issue to allow `BCP` to work correctly with collations other than English collations.
- Fixed an issue to make `sp_helpuser` procedure show login name for the `dbo` user.
- Fixed an issue to handle NULL and mix-cased inputs correctly for the functions `SUSER_SNAME` and `SUSER_SID`.
- Fixed an issue with Babelfish returning an invalid TDS protocol stream when there is a numeric overflow error.
- Fixed an issue where `is_fixed_role` column returns incorrect value in the `sys.server_principals` view for the `sysadmin` role.
- Fixed the transaction error handling in a batch if the string passed to execute contains `USE dbname` and fails because the database `dbname` was not found.
- Fixed the issue with procedures created in the master database context with `prefix sp_` that are not accessible from other database context.
- Fixed the failure to resolve object name inside a procedure when used with schema name.
- Fixed case-sensitivity issue with arguments to the functions `USER_ID` and `SUSER_ID`.
- Fixed an issue where triggers were allowed to be created on Babelfish temporary tables.
- Fixed several performance issues with Import-Export wizard.
- Support for multi-byte client encodings other than `UTF-16` for `VARCHAR(n)`.
- Fixed the system compatibility view `sys.sysprocesses` to show the correct value for hostname provided by the client connection.
- Fixed case sensitivity issue with `Polish_CI_AS` collation.
- Fixed the `@@DBTS` function so that value of `@@DBTS` correctly returns the current transaction id after each DML statement even when used within a transaction.
- Improved performance for queries that refer to the functions `SCOPE_IDENTITY` and `@@IDENTITY`.
- Support added for collations `Japanese_CS_AS`, `Japanese_CI_AI` and `Japanese_CI_AS` for `fn_helpcollations`.
- `@@SERVERNAME` and `SERVERPROPERTY('ServerName')` now return the name of the Babelfish instance as specified by the user when the instance is created. This value is also returned by the newly supported properties `SERVERPROPERTY('MachineName')` and `SERVERPROPERTY('InstanceName')`.
- Function `fn_mapped_system_error_list` lists the PG error code mapped to `@@ERROR` codes, as well as the corresponding error message text. This function also exists in previous Babelfish releases but did not include mapping details.
- Fixed `DATEADD` function to now support `milliseconds(ms)` time units.
- `SET NO_BROWSETABLE {ON|OFF}` is now subject to escape hatch `escape_hatch_session_settings`, so no error is raised when set to `ignored`.
- `SET PARSEONLY {ON|OFF}` is now supported. Previously this would raise an error unless escape hatch `escape_hatch_session_settings` is set to `ignored`.
- The `DATABASE_DEFAULT` AND `CATALOG_DEFAULT` collation is now supported; this refers to the server/instance-level collation that was specified when the Babelfish instance was created, as Babelfish doesn't currently support collations on database level.
- For `OBJECTPROPERTY()` and `OBJECTPROPERTYEX()`, the following properties are now supported: `ExecIsAnsiNullsOn`, `ExecIsQuotedIdentOn`, `IsDefault`, `IsDefaultCnst`, `IsDeterministic`, `IsIndexed`, `IsInlineFunction`, `IsMSShipped`, `IsPrimaryKey`, `IsProcedure`, `IsRule`, `IsScalarFunction`, `IsSchemaBound`, `IsTable`, `IsTableFunction`, `IsTrigger`, `IsUserTable`, `IsView`, `OwnerId`, `TableFulltextPopulateStatus`, `TableHasVarDecimalStorageFormat`.
- The `OBJECTPROPERTYEX` function supports the `BaseType` property.
- The `INDEXPROPERTY` function supports the following properties: `IndexFillFactor`, `IndexID`, `IsClustered`, `IsDisabled`, `IsHypothetical`, `IsPadIndex`, `IsPageLockDisallowed`, `IsRowLockDisallowed`, `IsUnique`.


## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

