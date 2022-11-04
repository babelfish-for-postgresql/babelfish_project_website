
- Babelfish Version: 1.0.1
- PostgreSQL Server Version: 13.4
- Download Source distributions:
  - [BABEL_1_0_1__PG_13_4.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_0_1__PG_13_4/BABEL_1_0_1__PG_13_4.zip)
  - [BABEL_1_0_1__PG_13_4.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_1_0_1__PG_13_4/BABEL_1_0_1__PG_13_4.tar.gz)
- Minimum Compass Version: [1.0.0](https://github.com/babelfish-for-postgresql/babelfish_compass/releases/tag/v1.0)
- Date: Nov 4, 2022


This version of Babelfish (1.0.1) contains all of the features and limitations of Babelfish version 1.0.0, as well as a security enhancement that fixes critical issues in Babelfish due to incorrect handling of user input for some application features.

You can use the following command to check the version of Babelfish that you have installed:

```sql
babelfish_db[124386]# SELECT sys.serverProperty('BabelfishVersion') AS BabelfishVersion;
 babelfishversion 
------------------
 1.0.1
(1 row)
```

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 
