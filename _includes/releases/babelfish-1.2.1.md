- Babelfish Version: 1.2.1
- PostgreSQL Server Version: 13.7
- Download source distributions:
  - [BABEL_1_2_1__PG_13_7.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_2_1__PG_13_7/BABEL_1_2_1__PG_13_7.zip)
  - [BABEL_1_2_1__PG_13_7.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_2_1__PG_13_7/BABEL_1_2_1__PG_13_7.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: June 5, 2022

## Overview

Babelfish 1.2.1 contains the following fixes that improve the user experience.  1.2.1 fixes include:
- An issue that caused Babelfish to become unavailable after working with temporary tables.
- An issue that prevented transferring data to a table with identity columns using the SQL Server Management Studio import and export wizard.

Babelfish 1.2.1 also contains the changes to PostgreSQL v. 13.7 [documented in the community release notes](https://www.postgresql.org/docs/release/13.7/).



## Upgrading to the new version

**If you’re running Babelfish in a managed environment, please check your vendor’s instructions for upgrading.**

Babelfish 1.2.1 is compatible with the latest major version (Babelfish 1.2.0); a dump/restore is not required to upgrade to the newer version. To upgrade:

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
 babelfishpg_common | 1.2.1   | public     | Transact SQL Datatype Support
                                 ....
 babelfishpg_tsql   | 1.2.1   | public     | Transact SQL Compatibility
                                 ....
```


## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

