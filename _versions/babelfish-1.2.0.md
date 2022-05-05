---
date: 2022-4-5

title: Babelfish 1.2.0
nav_order: 1

product: Babelfish for PostgreSQL
version: '1.2.0'

components:
  -
    role: engine
    artifact: babelfish
    version: 1.2.0
sections:
  source:
    explanation: "/releases/babelfish-1.2.0.md"
pretty:
  artifacts:
    babelfish: ''
  sections:
    source: 'Babelfish 1.2.0'
---

Babelfish Version: 1.2.0 [Downloads](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases)
PostgreSQL Server Version: 13.6
Babelfish Compass [Downloads](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
Date: April 5, 2022

## Overview

Babelfish 1.2.0 contains enhancements and fixes that improve the user experience, listed below.
- Support for more built-in functions: `COLUMNS_UPDATED`, `UPDATE`, `FULLTEXTSERVICEPROPERTY`, `ISJSON`, `JSON_QUERY`, `JSON_VALUE`, `HAS_DBACCESS`, `SUSER_SID`, `SUSER_SNAME`, `IS_SRVROLEMEMBER`.
- Support for the additional catalog views: `sys.dm_os_host_info`, `sys.dm_exec_sessions`, `sys.dm_exec_connections`, `sys.endpoints`, `sys.table_types`, `sys.database_principals`, `sys.sysprocesses`, `sys.sysconfigures`, `sys.syscurconfigs`, `sys.configurations`, and more.
- Additional system stored procedures, including `sp_table_privileges`, `sp_column_privileges`, `sp_special_columns`, `sp_fkeys`, `sp_pkeys`, `sp_stored_procedures`, `xp_qv`, `sp_describe_undeclared_parameters`, `sp_helpuser`, and more.

The above items and other new features of Babelfish 1.2.0 are listed in the sections below.

## Upgrading to the new version

**If you’re running Babelfish in a managed environment, please check your vendor’s instructions for upgrading.**

Babelfish 1.2.0 is compatible with the latest major version (Babelfish 1.1.0); a dump/restore is not required to upgrade to the newer version. To upgrade:

1. Install the new binaries; for details, see [Compiling Babelfish From Source] (https://babelfishpg.org/docs/installation/compiling-babelfish-from-source/).

2. Start the new server.

3. Update the modified extensions. 

To update the extensions that have changed since the last release, connect to the PostgreSQL endpoint of the Babelfish database and execute the following statements from a single session in this order:

```bash
ALTER EXTENSION "babelfishpg_common" UPDATE;
ALTER EXTENSION "babelfishpg_tsql" UPDATE;
```

Please note that the extension owner must invoke ALTER EXTENSION. For this release, the `babelfish_tds` and `babelfish_money` extensions don’t include any SQL-level changes and need not be updated.

After the extensions are updated, you can check the extension version from the PostgreSQL port:

```bash
babelfish_db[124386]# \dx
                                List of installed extensions
        Name        | Version |   Schema   |                   Description
--------------------+---------+------------+-------------------------------------------------
 babelfishpg_common | 1.2.0   | public     | Transact SQL Datatype Support
                                 ....
 babelfishpg_tsql   | 1.2.0   | public     | Transact SQL Compatibility
                                 ....
```


## Changes

- Casing (upper-case, lower-case) of column names as created with T-SQL is now retained.
- INSTEAD-OF triggers are now supported on tables. This support is for tables only, not views.
- Support for the following system-defined global variables: `@@DBTS`, `@@LOCK_TIMEOUT`, `@@SERVICENAME`.
- Support for `SET LOCK_TIMEOUT`
- Support for the following datatypes:
   - `TIMESTAMP`
   - `ROWVERSION`
- Support for the following built-in functions:
   - `COLUMNS_UPDATED`
   - `UPDATE`
   - `FULLTEXTSERVICEPROPERTY``
   - `ISJSON`
   - `JSON_QUERY`
   - `JSON_VALUE`
   - `HAS_DBACCESS`
   - `SUSER_SID`
   - `SUSER_SNAME`
   - `IS_SRVROLEMEMBER`
- Full support for the `CHECKSUM` function. This function now supports * and multiple columns (`CHECKSUM ( * | expression [ ,...n ])` ).
- Full support for the `SCHEMA_ID` function. This function can now be used without any arguments (`SCHEMA_ID ( [ schema_name ])`).
- Support for `DROP IF EXISTS` with `SCHEMA`, `DATABASE`, and `USER` objects.
- Support for the following values for `CONNECTIONPROPERTY`:
   - `physical_net_transport`
   - `client_net_address`
- Support for the following values for `SERVERPROPERTY`:
   - `EditionID`
   - `EngineEdition`
   - `LicenseType`
   - `ProductVersion`
   - `ProductMajorVersion`
   - `ProductMinorVersion`
   - `IsIntegratedSecurityOnly`
   - `IsLocalDB`
   - `IsAdvancedAnalyticsInstalled`
   - `IsBigDataCluster`
   - `IsPolyBaseInstalled`
   - `IsFullTextInstalled`
   - `IsXTPSupported`
- Support for the following catalogs:
   - `sys.dm_os_host_info`
   - `sys.dm_exec_sessions`
   - `sys.dm_exec_connections`
   - `sys.endpoints`
   - `sys.table_types`
   - `sys.database_principals`
   - `sys.sysprocesses`
   - `sys.sysconfigures`
   - `sys.syscurconfigs`
   - `sys.configurations`
- Support for the following `INFORMATION_SCHEMA` catalogs:
   - `TABLES`
   - `COLUMNS`
   - `DOMAINS`
   - `TABLE_CONSTRAINTS`
- Support for the following system stored procedures:
   - `sp_table_privileges`
   - `sp_column_privileges`
   - `sp_special_columns`
   - `sp_fkeys`
   - `sp_pkeys`
   - `sp_stored_procedures`
   - `xp_qv`
   - `sp_describe_undeclared_parameters`
   - `sp_helpuser`
- Limited support for creating, altering, and dropping database principals (USER objects). Limitations for `CREATE`/`ALTER`/`DROP` syntax with USER objects are as follows:
   - For `CREATE USER`, you can specify the `FOR`/`FROM LOGIN` and `DEFAULT_SCHEMA` options only.
   - For `ALTER USER`, you can specify `DEFAULT_SCHEMA` option only.
- Support for granting and revoking (`GRANT`/`REVOKE`) permisions for database principals only (not database roles). Support includes `GRANT OPTION` and `REVOKE..CASCADE` options for the following:
   - `SELECT`
   - `INSERT`
   - `UPDATE`
   - `DELETE`
   - `REFERENCES`
   - `EXECUTE`
   - `ALL` [`PRIVILEGES`]
- Support for `WITH AUTHORIZATION` on `CREATE SCHEMA`.
- Support for the following new escape hatches and escape hatch functionality:
   - Ability to restore the default settings for escape hatches. You can restore all the default settings for your Babelfish DB instance by passing `default` as the second argument to the `sp_babelfish_configure` stored procedure.
   - Support for a new escape hatch, `escape_hatch_ignore_dup_key` (default=`strict`). This escape hatch controls the `IGNORE_DUP_KEY` option in `CREATE`/`ALTER TABLE` and `CREATE INDEX` statements. When `IGNORE_DUP_KEY=ON`, an error is raised unless `escape_hatch_ignore_dup_key` is set to `ignore`.
   - Support for the `ignore` option on the `escape_hatch_storage_options` escape hatch. When this escape hatch is set to `ignore`, Babelfish ignores errors raised in the following cases:
   - Ignores errors raised in the `ON` clause in a `CREATE DATABASE` statement.
   - Ignores errors raised by `CREATE INDEX` when used with `SORT_IN_TEMPDB`, `DROP_EXISTING`, or `ONLINE` options.


## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

