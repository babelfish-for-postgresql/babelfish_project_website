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

### New features

- Supports major version upgrade from Babelfish for PostgreSQL DB cluster 13.6 and later to 14.6.
- Support for T-SQL hints (`join methods`, `index usage`, `MAXDOP`). 
- Support the estimated execution plans for `THROW`, `PRINT`, `USE`, and `RAISEERROR` statements.
- Support additional system stored procedures `sp_addrole`, `sp_droprole`, `sp_addrolemember`, `sp_droprolemember`, `sp_helpdbfixedrole`
- Support guest user in all the user created databases and support `GRANT`/`CONNECT TO`/`FROM` user (including guest).

### Additional improvements and enhancements

- Fixed the default collation of Babelfish data types except `TEXT` and `NTEXT` to be the same as that mentioned in the `babelfishpg_tsql.server_collation_name` parameter. Previously, the default collation of the collatable datatypes was `pg_catalog.default`. The datatypes and the objects that depends on these datatypes followed cases-sensitive collation which impacts the T-SQL objects of the database which use case-insensitive collation. Starting with Babelfish 2.3.0, the default collation for the collatable data types (except `TEXT` and `NTEXT`) is the same as the collation specified in the `babelfishpg_tsql.server_collation_name` parameter. 
- Fixed an issue where members of `sysadmin` could not connect through SSMS.
- Corrected the schema name resolution for triggers and views so that it selects/modifies the correct object(tables).
- Improvements in `FOR JSON PATH` clause of `SELECT` statement which supports `ROOT`, `INCLUDE_NULL_VALUES`, `WITHOUT_ARRAY_WRAPPER`.
- Corrected the schema name resolution for Babelfish objects like views and triggers, so that the correct object is selected or modified.
- Fixed issue for dotnet clients (including SSMS) that received invalid precision/scale error for certain arithmetic expressions.
- Fixed issues with various datetime functions such as `DATEPART()`, `DATENAME()`, `DATEDIFF()`, and `DATEADD()`.

### Upgrading to the new version

If you’re running Babelfish in a managed environment, please check your vendor’s instructions for upgrading.

#### Minor Version Upgrade

Babelfish 2.3.0 is compatible with other 2.x.x versions of Babelfish; a `dump`/`restore` is not required to upgrade to the newer version from previous 2.x.x releases. To upgrade:

1. Install the new binaries; for details, see [Compiling Babelfish From Source] (https://babelfishpg.org/docs/installation/compiling-babelfish-from-source/).
2. Start the new server.
3. Update the modified extensions.

To update the extensions that have changed since the last release, connect to the PostgreSQL endpoint of the Babelfish database and execute the following statements from a single session in this order:

```sql
ALTER EXTENSION "babelfishpg_common" UPDATE;
ALTER EXTENSION "babelfishpg_tsql" UPDATE;
```

Please note that the extension owner must invoke `ALTER EXTENSION`. For this release, the `babelfish_tds` and `babelfish_money` extensions don’t include any SQL-level changes and need not be updated.

After the extensions are updated, you can check the extension versions from the PostgreSQL port:

```sql
babelfish_db=# \dx
                                List of installed extensions
        Name        | Version |   Schema   |   Description
--------------------+---------+------------+-------------------------------------------------
 babelfishpg_common | 2.3.0   | public     | Transact SQL Datatype Support
                                 ....
 babelfishpg_tsql   | 2.3.0   | public     | Transact SQL Compatibility
                                 ....

```

#### Major Version Upgrade

Babelfish 2.3.0 also provides the ability  to upgrade from some 1..x.x versions of Babelfish. This process is called major version upgrade (MVU). It consists of two steps. First, you need to perform a major version upgrade on the PostgreSQL server to upgrade it to the target version. Second, you need to update all Babelfish extensions to the target version. Currently, Babelfish only supports upgrade using the `pg_upgrade` module. Other upgrade methods such as `dump`/`restore` and replication are not supported.


## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

