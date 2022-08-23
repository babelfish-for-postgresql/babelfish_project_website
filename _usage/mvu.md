---
layout: default
title: Performing a Major Version Upgrade
nav_order: 9
---

## Performing a major version upgrade

Babelfish supports major version upgrade (MVU) from implementations deployed with a Babelfish PostgreSQL server version 13.6 or later. Currently the Babelfish PostgreSQL server only supports an upgrade path using the `pg_upgrade` module. During the upgrade, you will need to:

- Perform a major version upgrade of the PostgreSQL server.
- Update the Babelfish extensions to the target version.
- Confirm that the Babelfish specific GUCs are the same in the source and target versions.

Babelfish supports a major version upgrade on Babelfish PostgreSQL servers version 13.6 or later. You can use the following release as an upgrade source (the server from which you'll upgrade):

- Babelfish 1.3.1, built with PostgreSQL 13.7

The target server must be running Babelfish PostgreSQL servers, version 14.5 or later.  You can use the following release as an upgrade target (the version to which you'll upgrade):

- Babelfish 2.2.0, built with PostgreSQL 14.5

If you are not running version 1.3.1, you should first perform a minor version upgrade to version 1.3.1.  To perform a minor version upgrade:

- Follow the [instructions](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_3_STABLE/contrib/README.md#build-the-postgres-engine) in the `babelfish_extensions` repository to build and replace the Babelfish PostgreSQL server with version 13.6 or higher.  

- Build and replace your Babelfish extensions with extension version 1.2.2;  follow the [instructions](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_3_STABLE/contrib/README.md#install--build-dependencies) in the `babelfish_extensions` repository to build the extensions and copy them into the Babelfish binary directory. Finally, rename binary directory to *postgres_old* to prevent a naming conflict with the new binary directory.

If you are running version 1.3.1, use the following steps to perform an MVU on a Babelfish server:

1. Follow the [instructions at the Babelfish repo](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_2_X_DEV/contrib/README.md#build-the-postgres-engine) to build and install the Babelfish version 2.2.0 PostgreSQL server and extensions.

2. Then, initialize the `data` directory for new engine version. For convenience, add /opt/mssql-tools/bin/ and ~/postgres/bin to your PATH environment variable. This enables you to run the tools without specifying the full path. For Z shell (the default shell for Cloud Desktop), add the following lines to your ~/.zshrc file:

```sql
export PATH=/opt/mssql-tools/bin:$PATH
export PATH=~/postgres/bin:$PATH
```

3. Adjust the paths of the following commands to point to the directory of the target server, and run them to start the Postgres server:

```sql
~/postgres/bin/initdb -D ~/postgres/data/
~/postgres/bin/pg_ctl -D ~/postgres/data/ -l logfile start
```

4. Modify the `~/postgres/data/postgresql.conf` file by uncommenting the following parameters and including the `babelfishpg_tds` extension in the `shared_preload_libraries` parameter:

```sql
listen_addresses = '*'
shared_preload_libraries = 'babelfishpg_tds'
```

5. Modify `~/postgres/data/pg_hba.conf` to [allow connections](https://www.postgresql.org/docs/14/auth-pg-hba-conf.html) from your IP address:

```sql
host    all             all     10.x.y.z/32            trust
```

6. Use the following command to apply the changes:

```sql
~/postgres/bin/pg_ctl -D ~/postgres/data/ -l logfile restart
```

Note that new server should not contain a Babelfish database, or have the extensions installed.

7. Use `pg_ctl` to stop both `source` and `target` servers:

  On the old server:

```sql
  ~/postgres_old/bin/pg_ctl -D ~/postgres_old/data/ stop
```

  On the new server:

```sql  
  ~/postgres_new/bin/pg_ctl -D ~/postgres_new/data/ stop
```

8. Then, use the `pg_upgrade` utility to perform the major version upgrade.  For detailed information about using pgupgrade, refer to the [official postgres documentation](https://www.postgresql.org/docs/current/pgupgrade.html). For example:

```sql
mkdir ~/upgrade
cd ~/upgrade
~/postgres_new/bin/pg_upgrade -U $USER -b ~/postgres_old/bin \
                                       -B ~/postgres_new/bin \
                                       -d ~/postgres_old/data \
                                       -D ~/postgres_new/data \
                                       -p 5432 -P 5433 -j 4 --link --verbose
``` 

9. When `pg_upgrade` completes, start the new server:

```sql
~/postgres_new/bin/pg_ctl -D ~/postgres_new/data/ -l logfile start
```

10. Connect to the server with `psql`: 

```sql
~/postgres/bin/psql -U your_user_name -d babelfish_db_name 
```

11. Update Babelfish extensions to latest version in the order specified below:

```sql
ALTER EXTENSION babelfishpg_common UPDATE;
ALTER EXTENSION babelfishpg_tsql UPDATE;
ALTER EXTENSION babelfishpg_tds UPDATE;
```

12. Confirm that the values of following Babelfish specific settings (GUCs) in the new server are same as in the old server, and modify them if any have changed:

```sql
babelfishpg_tds.tds_default_numeric_precision
babelfishpg_tds.tds_default_numeric_scale
babelfishpg_tsql.database_name
babelfishpg_tsql.default_locale
babelfishpg_tsql.migration_mode
babelfishpg_tsql.server_collation_name
```

  To change a setting, connect with `psql`: 

```sql
  ~/postgres/bin/psql -U your_user_name -d babelfish_db_name
```

  Then, you can use the following command to change GUC settings:

```sql
  ALTER SYSTEM SET babelfishpg_tsql.<setting name> = <setting value>;
```

13. Then, use the following command to reload the configuration file:

```sql
SELECT pg_reload_conf();
```

*Note:* If you have updated any of the following parameters in the previous step, the server needs to be restarted:

```sql
babelfishpg_tds.tds_default_numeric_precision
babelfishpg_tds.tds_default_numeric_scale
babelfishpg_tsql.server_collation_name
```

  You can use the following command to reload the server:

```sql
  ~/postgres_new/bin/pg_ctl -D ~/postgres_new/data/ -l logfile restart
```

