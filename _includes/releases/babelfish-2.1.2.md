- Babelfish Version: 2.1.2
- PostgreSQL Server Version: 14.3
- Download source distributions:
  - [BABEL_2_1_2__PG_14_3.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_1_2__PG_14_3/BABEL_2_1_2__PG_14_3.zip)
  - [BABEL_2_1_2__PG_14_3.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_1_2__PG_14_3/BABEL_2_1_2__PG_14_3.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: November 8, 2022

## Overview

Babelfish 2.1.2 contains the functionality and features of versions 2.1.0 and 2.1.1, as well as:

- a fix for critical issues in Babelfish due to incorrect handling of user input for some application features.
- a fix for error handling in sp_prepare calls which can cause a server crash when a large number of parameters are sent by the application. Babelfish currently supports a maximum of 100 parameters for a procedure or function.
- a fix for error handling in SSL/TLS handshake for some client drivers.


Babelfish does not support an upgrade path to version 2.1.2 from Babelfish 1.x.x.

## Acknowledgements

To see a list of the individuals that have contributed to the Babelfish project, [visit the project website](https://babelfishpg.org/contributors/).

Babelfish for PostgreSQL is open-source software that uses the Apache License version 2 (ALv2) and the PostgreSQL License. The source for the project is available on [GitHub](https://github.com/babelfish-for-postgresql). 

