- Babelfish Version: 1.5.0
- Extension Version: 1.3.0
- PostgreSQL Server Version: 13.9
- Download source distributions:
  - [BABEL_1_5_0__PG_13_9.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_5_0__PG_13_9/BABEL_1_5_0__PG_13_9.zip)
  - [BABEL_1_5_0__PG_13_9.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_5_0__PG_13_9/BABEL_1_5_0__PG_13_9.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: January 9, 2023

## Overview

Babelfish 1.5.0 contains fixes and features that improve the user experience.

### High priority stability enhancements

- Fixed an issue related to money operator class during minor version upgrade from 13.4 to 13.5 or later due to which the upgrade was failing


## Upgrading to the new version

**If you’re running Babelfish in a managed environment, please check your vendor’s instructions for upgrading.**

Babelfish 1.5.0 is compatible with the version 1.x.x of Babelfish; a dump/restore is not required to upgrade to the newer version. To upgrade:

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
 babelfishpg_tsql   | 1.3.0   | public     | Transact SQL Compatibility
                                 ....
```


## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

