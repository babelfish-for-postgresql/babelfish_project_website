- Babelfish Version: 1.4.0
- PostgreSQL Server Version: 13.8
- Download source distributions:
  - [BABEL_1_4_0__PG_13_8.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_4_0__PG_13_8/BABEL_1_4_0__PG_13_8.zip)
  - [BABEL_1_4_0__PG_13_8.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_4_0__PG_13_8/BABEL_1_4_0__PG_13_8.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: August 29, 2022

## Overview

Babelfish 1.4.0 contains bug fixes that improve the user experience.


## Upgrading to the new version

**If you’re running Babelfish in a managed environment, please check your vendor’s instructions for upgrading.**

Babelfish 1.4.0 is compatible with the version 1.x.x of Babelfish; a dump/restore is not required to upgrade to the newer version. To upgrade:

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
 babelfishpg_common | 1.4.0   | public     | Transact SQL Datatype Support
                                 ....
 babelfishpg_tsql   | 1.4.0   | public     | Transact SQL Compatibility
                                 ....
```


## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

