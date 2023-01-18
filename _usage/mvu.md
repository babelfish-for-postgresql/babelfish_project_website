---
layout: default
title: Performing a major version upgrade
nav_order: 9
---

## Performing a major version upgrade

Babelfish supports a major version upgrade (MVU) from implementations deployed with a Babelfish PostgreSQL server version 13.6 or later. Currently, the Babelfish PostgreSQL server only supports an upgrade path using the `pg_upgrade` module. During the upgrade, you will need to:

- Perform a major version upgrade of the PostgreSQL server.
- Update the Babelfish extensions to the target version.
- Confirm that the Babelfish-specific GUCs are the same in the source and target versions.

Before beginning an upgrade, we strongly recommend that you create a copy of the old PostgreSQL `data` directory in case you have trouble and need to revert to it.

Babelfish supports a major version upgrade on Babelfish PostgreSQL servers version 13.6 or later. You can use the following releases as an upgrade source (the server from which you'll upgrade):

- Babelfish 1.2.2, built with PostgreSQL 13.6
- Babelfish 1.3.1, built with PostgreSQL 13.7
- Babelfish 1.4.0, built with PostgreSQL 13.8
- Babelfish 1.5.0, built with PostgreSQL 13.9

The target server must be running Babelfish PostgreSQL servers, version 14.5 or later. You can use the following release as an upgrade target (the version to which you'll upgrade):

- Babelfish 2.3.0, built with PostgreSQL 14.6

If you are not running a version in the source server list, you should first perform a minor version upgrade to a supported version. To perform a minor version upgrade:

- Follow the [instructions](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_3_STABLE/contrib/README.md#build-the-postgres-engine) in the `babelfish_extensions` repository to build and replace the Babelfish PostgreSQL server with a supported version.

- Build and replace your Babelfish extensions with the appropriate extension version for your source version; follow the [instructions](https://github.com/babelfish-for-postgresql/babelfish_extensions/blob/BABEL_1_3_STABLE/contrib/README.md#install--build-dependencies) in the `babelfish_extensions` repository to build the extensions and copy them into the Babelfish binary directory. Finally, rename the binary directory to `postgres_old` to prevent a naming conflict with the new binary directory.

In the examples that follow, the locations are represented by the following variables.  

| Variable | Complete Path | Represents | 
| -------- | ------------- | ---------- | 
| $BABELFISH_HOME_OLD | `/opt/babelfish/OLD_BABELFISH_VERSION` | Home directory of old babelfish version |
| $BABELFISH_HOME_NEW | `/opt/babelfish/NEW_BABELFISH_VERSION` | Home directory of new babelfish version |
| $BABELFISH_DATA_OLD | `/var/lib/babelfish/OLD_BABELFISH_VERSION/data` | Data directory of old babelfish version |
| $BABELFISH_DATA_NEW | `/var/lib/babelfish/NEW_BABELFISH_VERSION/data` | Data directory of new babelfish version |

Use the following steps to perform an MVU on a Babelfish server:

1. Download the zip or tar distribution file of the target Babelfish version which supports MVU from [here](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases). Extract the distribution and follow the instructions in `INSTALLING.md` to build and install new version of Babelfish in the location represented by (`$BABELFISH_HOME_NEW`), and initialize the `data` directory for the new engine version (`$BABELFISH_DATA_NEW`). 

 *Note* that the target Babelfish database should be empty and should not already have the extensions installed. You should skip the `Enabling extensions in the target database` step while following the `INSTALLING.md` instructions for the target Babelfish installation.

2. Stop the source and target servers (if running), with the following `pg_ctl` commands:

- To stop the source server:

`${BABELFISH_HOME_OLD}/bin/pg_ctl -D ${BABELFISH_DATA_OLD}/ stop`

- To stop the target server:

`${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW}/ stop`

3. Perform a major version upgrade to upgrade the Postgres server with the `pg_upgrade` utility. No special handling is needed to use pg_upgrade with Babelfish:

```sql
sudo su - postgres
mkdir ~/upgrade
cd ~/upgrade
${BABELFISH_HOME_NEW}/bin/pg_upgrade -U $USER -b ${BABELFISH_HOME_OLD}/bin \
                                       -B ${BABELFISH_HOME_NEW}/bin \
                                       -d ${BABELFISH_DATA_OLD} \
                                       -D ${BABELFISH_DATA_NEW} \
                                       -p 5432 -P 5433 -j $JOBS --verbose
```

Refer to the [pg_upgrade documentation](https://www.postgresql.org/docs/current/pgupgrade.html) for detailed information about using `pg_upgrade`. 

In the event of a failure, the new `data` directory (`$BABELFISH_DATA_NEW`) might have issues, but the old `data` directory (`$BABELFISH_DATA_OLD`) will remain intact. To retry the upgrade, you can remove the new `data` directory  and re-initialize it again. Follow the instructions in `Initiating the Data directory` from `INSTALLING.md`.

After the upgrade is successfully completed, start the new server with `pg_ctl`:

`${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW} -l logfile start`

To update the Babelfish extensions, connect to the PostgreSQL endpoint of the Babelfish database and execute the following statements from a single session in this order:

```sql
ALTER EXTENSION babelfishpg_common UPDATE;
ALTER EXTENSION babelfishpg_tsql UPDATE;
ALTER EXTENSION babelfishpg_tds UPDATE;
```

Some Babelfish specific GUCs/settings are considered critical and their values must be the same before and after a major version upgrade. Changing any of the parameter values during the upgrade might cause inconsistent database behavior or even data corruption. Therefore, it is mandatory that the following Babelfish related parameters are set to the same values after upgrade as they were before upgrade.

- `babelfishpg_tds.tds_default_numeric_precision`
- `babelfishpg_tds.tds_default_numeric_scale`
- `babelfishpg_tsql.database_name`
- `babelfishpg_tsql.default_locale`
- `babelfishpg_tsql.migration_mode`
- `babelfishpg_tsql.server_collation_name`

You can modify parameter settings at the `psql` command line; connect with the command: 

`$PKGDIR_NEW/bin/psql -U your_user_name -d babelfish_db_name` 

Then run following SQL command to change above settings:

`ALTER SYSTEM SET <setting name> = <setting value>;`

Then, use the following command to reload the configuration file:

`SELECT pg_reload_conf();`

*Note:* If you change any of the following parameters, the server needs to be restarted:

- `babelfishpg_tds.tds_default_numeric_precision`
- `babelfishpg_tds.tds_default_numeric_scale`
- `babelfishpg_tsql.server_collation_name`

Run the following command to restart the server:

`${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW} -l logfile restart`

Please note that you cannot change migration mode during an upgrade.  For example, if `babelfishpg_tsql.migration_mode` was `multi-db` before the upgrade, and you change it to `single-db`, then you will not able to see any user-defined databases that were there before the upgrade.




