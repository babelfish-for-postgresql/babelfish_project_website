---
layout: default
title: PostgreSQL Extensions
nav_order: 30
---

## Tested PostgreSQL Extensions

Remember that when using a PostgreSQL extension, you will need to modify the configuration file of the PostgreSQL instance (by default, located under the PostgreSQL `data` directory) and use the `CREATE EXTENSION` command on the PostgreSQL listener port to create the extension.  Consult the documentation for each extension for detailed information.

The following extensions have been successfully tested with Babelfish:

- [`fuzzystrmatch` extension](https://www.postgresql.org/docs/current/fuzzystrmatch.html)

## Extensions that are not recommended

The following extensions have not demonstrated stability when used with Babelfish:

- [`tds_fdw` extension](https://github.com/tds-fdw/tds_fdw)
- [`postgres_fdw` extension](https://www.postgresql.org/docs/current/postgres-fdw.html)
- [`file_fdw` extension](https://www.postgresql.org/docs/current/file-fdw.html)