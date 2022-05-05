
- Babelfish Version: 1.1.0
- PostgreSQL Server Version: 13.5
- Download source distributions:
  - [BABEL_1_1_0__PG_13_5.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_1_0__PG_13_5/BABEL_1_1_0__PG_13_5.zip)
  - [BABEL_1_1_0__PG_13_5.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_1_0__PG_13_5/BABEL_1_1_0__PG_13_5.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: March 15, 2022

## Overview

Babelfish 1.1.0 contains:

* Enhancements and fixes that improve the user experience, listed below.
* Additional built-in functions, including `ORIGINAL_LOGIN()`, `SQUARE()` and more.
    
* Additional system views, including `sys.columns`, `sys.sysindexes`, and more.
* Additional system stored procedures, including `sp_columns`, `sp_statistics`, and more.

The above items and other new features of Babelfish 1.1.0 are explained in more detail in the sections below.

## Upgrading to the new version

**If you’re running Babelfish in a managed environment, please check your vendor’s instructions for upgrading.**

Babelfish 1.1.0 is compatible with the latest major version (Babelfish 1.0.0); a dump/restore is not required to upgrade to the newer version. To upgrade:

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
 babelfishpg_common | 1.1.0   | public     | Transact SQL Datatype Support
                                 ....
 babelfishpg_tsql   | 1.1.0   | public     | Transact SQL Compatibility
                                 ....
```

## Changes

- Add syntax support for `'ALIAS' = <expression>` in the `CREATE FUNCTION` statement, sub-queries and CTE (Jungkook Lee)
- Support omitted database/schema in object name (for example, `..objname`) in `DDL` and `EXECUTE` (Sangil Song)
- Support a leading dot in a qualified column name (`.<table>.<column>`) (Sangil Song)
- Support `FOREIGN KEY REFERENCES` table without column list (Zheng Li)
- Support `CREATE TRIGGER` and `DROP TRIGGER` with an optional schema name (Zhibai Song)
- Support T-SQL compatible functions:
    - `ORIGINAL_LOGIN()` (Avneet Kaur)    
    - `SQUARE()` (Rishabh Tanwar)
    - `SUBSTRING()` (Brent Sienko)
- Support system catalog views:
    - `sys.columns`  (Rishabh Tanwar)
    - `sys.sysindexes` (Shalini Lohia)
    - `sys.syscolumns` (Sharu Goel)
- Support system procedures:
    - `sp_updatestats` (Harsh Lunagariya)
    - `sp_databases` (Satarupa Biswas)
    - `sp_statistics` / `sp_statistics_100` (Huansong Fu)
- Support the `@@PROCID` session variable (Rishabh Tanwar)
- Add initial infrastructure for the `INSERT BULK` statement (Kushaal Shroff, Tim Chang)
- Add initial infrastructure for future Import Export wizard support in SQL Server Management Studio (Kushaal Shroff, Tim Chang)
- Fix error when `@@rowcount` result is `0` when `1` should be returned inside trigger execution (Zhibai Song)
- Fix error when multiple events are associated with a trigger (Zhibai Song)
- Allow table-constraint not following comma in table definition (Sangil Song)
- Allow multiple references to same column in the `OUTPUT` target list (Avantika Dasgupta)
- Block variable assignment in a `SELECT` statement if a union is involved or used in sub-query/derived table (Sangil Song)
- Preserve case of column names for `SELECT -` statements in T-SQL (Tim Chang)
- Add support for block dropping the last member of `sysadmin` (Di Wu)
- Enforce that `APPLOCK_TEST(..., 'transaction')` can only be used inside a transaction (Huansong Fu)
- Make the `text`, `ntext`, and `image` data types invalid for local variables (Harsh Lunagariya)
- Fix the numeric overflow error when accepting values with format 0.00..1 (Kushaal Shroff)
- Support implicit conversion of empty string or spaces-only string to `integer` / `float` (Jungkook Lee)
- Ensure that `date` built-in functions return NULL for a NULL `date` argument (Shalini Lohia)
- Fix permissions error on system views, functions and procedures (Shalini Lohia)
- Fix underflow error in the `EXP` function (Harsh Lunagariya)
- Fix the return type of the `SIGN` function to match the input type (Harsh Lunagariya)
- Fix column datatypes of system catalog views (Rishabh Tanwar, Sharu Goel, Shalini Lohia)
    - `sys.default_constraints`
    - `sys.index_columns`
    - `sys.check_constraints`
    - `sys.computed_columns`
- Fix the `sp_tablecollations_100` procedure trying to search for string `@object` (Kushaal Shroff)
- Ensure that the `sys.all_columns` view displays the default server collation name (Kushaal Shroff)
- Fix the TDS protocol error for output parameter of type `binary` (Satarupa Biswas)
- Fix issue with calling stored procedures with output parameters from a .NET program (Rishabh Tanwar)
- Make the error line number use a relative number from batch start instead of procedure body start (Sangil Song)
- Fix errors when inserting into a view with column list (Jungkook Lee)

## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

