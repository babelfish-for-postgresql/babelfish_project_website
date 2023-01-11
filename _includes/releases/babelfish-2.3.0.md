- Babelfish Version: 2.3.0
- Extension Version: 2.3.0
- PostgreSQL Server Version: 14.6
- Download source distributions:
  - [BABEL_2_3_0__PG_14_6.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_3_0__PG_14_6/BABEL_2_3_0__PG_14_6.zip)
  - [BABEL_2_3_0__PG_14_6.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_3_0__PG_14_6/BABEL_2_3_0__PG_14_6.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: January 9, 2023

## Overview

Babelfish 2.3.0 contains fixes that improve the user experience, including:

- Support for T-SQL hints (join methods, index usage, `MAXDOP`).

- Support for the `FORMAT()` built-in function with minor limitations.

- Support the estimated execution plans for `THROW`, `PRINT`, and `USE` statements.

- Improvements to the `sp_addrole`, `sp_droprole`, `sp_addrolemember`, `sp_droprolemember` stored procedures.

- Support for the `JSON_MODIFY()` function in Babelfish which updates the value of a property in a JSON string and returns the updated JSON string.

- Support `SELECT FOR JSON PATH`, including options `ROOT`, `INCLUDE_NULL_VALUES`, `WITHOUT_ARRAY_WRAPPER`.

- Support `CHECKPOINT` statement. This fix creates an escape hatch, `escape_hatch_checkpoint`, that gives you the ability to control the error thrown when `CHECKPOINT` is called.

- Support `VALUES()` constructor in `FROM` clause in a `SELECT` statement.

- Support `sp_addrole`, `sp_droprole`, `sp_addrolemember`, `sp_droprolemember` procedures to create or alter role.

- Support for the `sys.all_parameters` catalog.

- Support guest user in all the user created databases and support `GRANT`/`CONNECT` `TO`/`FROM` user (including guest).

- Support the `sp_helpdbfixedrole` and `DATETIMEOFFSETFROMPARTS` functions.


### Critical stability enhancements

- Fixed the cross database references to `tempdb.sys.objects` to correct results.


### High priority stability enhancements

- Improved performance for the `INSERT` statement with `IDENTITY_INSERT=ON`.

- Fixed an issue where the `DROP DATABASE` statement fails due to incorrect comparison operator used.

- Corrected numeric overflow rectification by adding proper condition on precision and scale.

- Fixed an issue where DB owner is not `dbo` in its own DB.

- Fixed an issue when `UPDATE`/`DELETE` is used with table aliases.

- Fixed issues with SSL handshake failure.

- Fixed issues for the following properties in `OBJECTPROPERTY`: `IsScalarFunction`, `IsTableFunction`, `IsInlineFunction`. Also, fixed misidentifying table functions as scalar functions in SSMS.

- Fixed an issue where `DBO` is assumed member of a DB role incorrectly.

- Fixed an issue where member of `sysadmin` could not connect through SSMS.

- Corrected the schema name resolution for triggers and views so that it selects/modifies the correct object(tables).

- Fixed the mapping inconsistency in catalog when creating roles with names in upper/lowercase.

- Fixed an issue to make trigger names unique for each database.

- Fixed an issue where `DROP DATABASE` is blocked after access denial to other logins due to in sufficient permission.

- Fixed the default collation of Babelfish data types.

### Additional improvements and enhancements

- Fixed an issue in `sp_tables` when it is invoked from JDBC metadata functions.

- Fixed an issue when `CHECK` constraints are used with the `LIKE` condition.

- Performance improvements with `sp_sproc_columns` when dealing with stored procedures.

- `sp_sproc_columns` now includes table-valued parameter row for stored procedures that use TVP as a parameter.

- Fixed the cross db references to `INFORMATION_SCHEMA.ROUTINES` and `tempdb.sys.objects` to give the correct results.

- Fixed issues to support `datetime`/`smalldatetime` operation with various numeric and non numeric datatypes.

- Fixed the return values of `SUM` aggregates for integer datatypes.

- Fixed issue for SSMS clients while getting numeric zero from server.

- Support added for `sysobjects.crdate` (`create_date`) for all user defined tables, views, procedures, functions, triggers and table types.

- Fixed procedure/function call not allowed when required parameter is missing and an explicit error is raised.

- Fixed issue with calculating the day difference and the hour difference, without considering `timestamp` (`hh:mm:ss.msec`).

- Fixed an issue with `DATEPART()` and `DATENAME()` to allow units `y`.

- Fixed issues with `DATEPART()`, `DATENAME()`, `DATEDIFF()`, and `DATEADD()` functions to convert string to `datetime` and to recognize units.

- Support for `TRY_CONVERT()` function.

- Fixed issue with using strict/lax `jsonpath` with arrays to avoid `OPENJSON` error: `syntax error at or near " " of jsonpath input"`.

- Support UDF (User Defined Function) as column default in `ALTER TABLE` statement.

- Fixed an issue where `SUBSTRING()` takes `NULL` arguments.

- Support for cast operations to `SMALLDATETIME` from various numeric types.

- Fixed an issue where `dbname` parameter is not handled properly for `sp_helpdb`.

- Fixed an issue where database owner is allowed to create another user for itself.

- Fixed an issue where trailing spaces are not ignored in `sp_helpsrvrolemember` and `IS_ROLEMEMBER`/`IS_MEMBER` functions.

- Improved error message for unsupported data types: `HIERARCHYID`, `GEORGRAPHY`, `GEOMETRY`.

- Fixed issues where cross database procedure calls and `sp_ procedures` access from other databases should succeed without the `EXECUTE` keyword.

- Fixed and issue where user `guest` is not dropped in any database, but only disabled.

- Fixed the column value for `SID` in the procedure `sp_helpuser` when the user is `guest`.

- Fixed an issue where overflow/underflow is not getting handled with `MONEY` datatype.

- Fixed an issue where error is not getting handled while error processing.

- Fixed a better error message for `CREATE USER WITHOUT LOGIN`.

- Fixed an issue where `sp_helpsrvrolemember` is throwing unsupported errors for unsupported server level roles.

- Fixed an issue where `SET BABELFISH_STATISTICS PROFILE` shows planning and execution times.

- Corrected the schema name resolution for Babelfish objects like views and triggers, so that correct object is selected or modified.

- Support `ROWVERSION`/`TIMESTAMP` Datatype for `INSERT BULK`.

- `sp_babelfish_configure` now supports `enable_pg_hint` and explain-related configurations.

- Support the `Keep Nulls` (`-k`) bcp option for optimised implementation to bulk insert.

- Support multi-byte currency symbols.

- Added logic to the `rdsutils` extension to prevent a non-Babelfish database session from dropping/renaming Babelfish DB's, roles.



## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

