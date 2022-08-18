- Babelfish Version: 2.1.0
- PostgreSQL Server Version: 14.3
- Download source distributions:
  - [BABEL_2_1_0__PG_14_3.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_1_0__PG_14_3/BABEL_2_1_0__PG_14_3.zip)
  - [BABEL_2_1_0__PG_14_3.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_1_0__PG_14_3/BABEL_2_1_0__PG_14_3.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: June 9, 2022

## Overview

Babelfish 2.1.0 contains enhancements and fixes that improve the user experience, including:
- Support for new functions, catalogs, and system stored procedures.
- Support for Japanese collations.
- Improved client support.

Babelfish does not support an upgrade path to version 2.1.0 from Babelfish 1.x.x.

## Changes

This version of Babelfish adds support for the following features:

- Support for functions: `IS_MEMBER()`, `IS_ROLEMEMBER()`, `HAS_PERMS_BY_NAME()`.

- Support for the following catalogs: 

|syslanguages|sys.indexes|sys.all_views|
|sys.database_files|sys.sql_modules|sys.system_sql_modules|
|sys.all_sql_modules|sys.xml_schema_collections|sys.dm_hadr_database_replica_states|
|sys.data_spaces|sys.database_mirroring|sys.database_role_members|


- Support for the system stored procedures: 

|sp_sproc_columns|sp_sproc_columns_100||
|sp_helprole|sp_helprolemember|


- Cross-DB references outside the current database, with a 3-part object name, for SELECT,SELECT..INTO, INSERT, UPDATE, DELETE
CREATE ROLE (AUTHORIZATION clause not supported), DROP ROLE, ALTER ROLE.

- Support for the following collations: Japanese_CS_AS, Japanese_CI_AI, Japanese_CI_AS

- Babelfish now supports `CHARINDEX()` substring searches on systems using nondeterministic collations.

- Babelfish now maps the error code for `@@ERROR=213`.

- Query plan output is generated following `SET BABELFISH_SHOWPLAN_ALL ON (and OFF)` and `SET BABELFISH_STATISTICS PROFILE ON (OFF)`. This will generate PostgreSQL-style query plan information for T-SQL queries in Babelfish. Note that these SET statements are identical to existing T-SQL statements, but with the added BABELFISH_ prefix.

- Support for data migration with the SSMS Import/Export Wizard.

- Support for data migration using the bcp client utility, as an experimental feature. Some bcp options (-b, -C, -E, -G, -h, -K, -k, -q, -R, -T, -V) are not currently supported.

- Support for connecting with the SSMS object explorer connection dialog (rather than only the Query Editor connection dialog), as well as partial support for the SSMS object explorer itself.


## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

