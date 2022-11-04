- Babelfish Version: 1.3.2
- PostgreSQL Server Version: 13.7
- Download source distributions:
  - [BABEL_1_3_2__PG_13_7.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_3_2__PG_13_7/BABEL_1_3_2__PG_13_7.zip)
  - [BABEL_1_3_2__PG_13_7.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_3_2__PG_13_7/BABEL_1_3_2__PG_13_7.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: November 4, 2022

## Overview

Babelfish 1.3.2 contains the features and limitations of 1.3.1, as well as the following updates:

- a fix for a critical issue in Babelfish due to incorrect handling of user input for some application features.
- a fix for error handling in sp_prepare calls which can cause a server crash when a large number of parameters are sent by the application. Babelfish currently supports a maximum of 100 parameters for a procedure or function.
- a fix for error handling in SSL/TLS handshake for some client drivers.


## Upgrading to the new version

**If you’re running Babelfish in a managed environment, please check your vendor’s instructions for upgrading.**

Babelfish 1.3.2 is compatible with the latest major version of Babelfish; a dump/restore is not required to upgrade to the newer version. To upgrade:

1. Install the new binaries; for details, see [Compiling Babelfish From Source] (https://babelfishpg.org/docs/installation/compiling-babelfish-from-source/).

2. Start the new server.

3. Update the modified extensions. 

To update the extensions that have changed since the last release, connect to the PostgreSQL endpoint of the Babelfish database and execute the following statements from a single session in this order:

```sql
ALTER EXTENSION "babelfishpg_common" UPDATE;
ALTER EXTENSION "babelfishpg_tsql" UPDATE;
```

Please note that the extension owner must invoke ALTER EXTENSION. For this release, the `babelfish_tds` and `babelfish_money` extensions don’t include any SQL-level changes and need not be updated.

After the extensions are updated, you can check the extension version from the PostgreSQL port:

```sql
babelfish_db[124386]# \dx
                                List of installed extensions
        Name        | Version |   Schema   |                   Description
--------------------+---------+------------+-------------------------------------------------
 babelfishpg_common | 1.2.1   | public     | Transact SQL Datatype Support
                                 ....
 babelfishpg_tsql   | 1.2.1   | public     | Transact SQL Compatibility
                                 ....
```

Use the following command to check the version of Babelfish that you have installed:

```sql
babelfish_db[124386]# SELECT sys.serverProperty('BabelfishVersion') AS BabelfishVersion;
 babelfishversion 
------------------
 1.3.2
(1 row)
```

## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

