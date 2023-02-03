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

In the examples in this document, the locations are represented by the following variables:

| Variable | Complete Path | Represents | 
| -------- | ------------- | ---------- | 
| $BABELFISH_HOME_OLD | `/opt/babelfish/OLD_BABELFISH_VERSION` | Home directory of old babelfish version |
| $BABELFISH_HOME_NEW | `/opt/babelfish/NEW_BABELFISH_VERSION` | Home directory of new babelfish version |
| $BABELFISH_DATA_OLD | `/var/lib/babelfish/OLD_BABELFISH_VERSION/data` | Data directory of old babelfish version |
| $BABELFISH_DATA_NEW | `/var/lib/babelfish/NEW_BABELFISH_VERSION/data` | Data directory of new babelfish version |
| $JOBS               | `$nproc`     | Number of CPU cores |


### Prerequisites

Before beginning an upgrade, we strongly recommend that you create a copy of the old PostgreSQL `data` directory in case you have trouble and need to revert to it.

Some Babelfish specific parameter settings are considered critical and their values must be the same before and after an upgrade. Changing the following parameter values during the upgrade might cause inconsistent database behavior or even data corruption. 

- `babelfishpg_tds.tds_default_numeric_precision`
- `babelfishpg_tds.tds_default_numeric_scale`
- `babelfishpg_tsql.database_name`
- `babelfishpg_tsql.default_locale`
- `babelfishpg_tsql.migration_mode`
- `babelfishpg_tsql.server_collation_name`

You should note the value of any parameter that you've modified so you can ensure that the parameter is reset to the original value after upgrading. To find the values, connect with psql, and use the `SHOW` command:

```sql
${BABELFISH_HOME_OLD}/bin/psql -d babelfish_db -U postgres

=> SHOW parameter_name;
```
Alternatively, you can use the following command to return the values of the parameters mentioned above:

```sql
SELECT name, setting FROM pg_settings WHERE name IN 
('babelfishpg_tds.tds_default_numeric_precision',
'babelfishpg_tds.tds_default_numeric_scale',
'babelfishpg_tsql.database_name',
'babelfishpg_tsql.default_locale',
'babelfishpg_tsql.migration_mode',
'babelfishpg_tsql.server_collation_name');
```

Babelfish supports a major version upgrade on Babelfish PostgreSQL servers version 13.6 or later. You can use the following releases as an upgrade source (the server from which you'll upgrade):

- Babelfish 1.2.2, built with PostgreSQL 13.6
- Babelfish 1.3.1, built with PostgreSQL 13.7
- Babelfish 1.4.0, built with PostgreSQL 13.8
- Babelfish 1.5.0, built with PostgreSQL 13.9

You can use the following Babelfish release as an upgrade target (the version to which you'll upgrade):

- Babelfish 2.3.0, built with PostgreSQL 14.6

To identify the Babelfish version you are currently using, you can query the Babelfish server with psql:

```sql
${BABELFISH_HOME_OLD}/bin/psql -d babelfish_db -U postgres

=> select sys.SERVERPROPERTY('BabelfishVersion') AS Babelfish_Version;
  babelfish_version
--------------------
       1.2.1
```

If you are not running a version listed in the source server list, you should first perform a minor version upgrade to a supported version. To perform a minor version upgrade, follow the instructions listed in the `INSTALLING.md` file included in the download of the release to which you are upgrading; this will build and replace the earlier version with new binaries and libraries. After upgrading the server, use the following commands to update the extensions. 

You should run these commands in a single transaction/scope to avoid inconsistency in the event of failures:

```sql
${BABELFISH_HOME_OLD}/bin/psql -d babelfish_db -U postgres

=> ALTER EXTENSION babelfishpg_common UPDATE;
=> ALTER EXTENSION babelfishpg_tsql UPDATE;
ALTER EXTENSION babelfishpg_tds UPDATE;
```

When you're finished, exit psql:

```sql
exit
```


## Performing a Major Version Upgrade

Use the following steps to perform a major version upgrade:

1. Download the zip or tar distribution file of the target Babelfish version which supports MVU from [here](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases). Extract the distribution and follow the instructions in `INSTALLING.md` to build and install new version of Babelfish in the location represented by (`$BABELFISH_HOME_NEW`), and initialize the `data` directory for the new engine version (`$BABELFISH_DATA_NEW`). 

  *Note* that the target Babelfish database should be empty and should not already have the extensions installed. You should skip the `Enabling extensions in the target database` step while following the `INSTALLING.md` instructions for the target Babelfish installation.

2. Stop the source and target servers (if running), with the following `pg_ctl` commands:

- To stop the source server:

```sql
${BABELFISH_HOME_OLD}/bin/pg_ctl -D ${BABELFISH_DATA_OLD}/ stop
```

- To stop the target server:

```sql
${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW}/ stop
```

3. Switch to the `postgres` user (a non-superuser):

```sql
sudo su - postgres
```

4. You can use the `pg_upgrade` utility to upgrade the Postgres server. No special handling is needed to use pg_upgrade with Babelfish.  To simplify the commands, you can use environment variables; for example, if you are upgrading from Babelfish 1.4.1 to Babelfish 2.3.0, you can use the following commands to set environment variables:

```sql
export BABELFISH_HOME_OLD=/opt/babelfish/1.4.1
export BABELFISH_DATA_OLD=/var/lib/babelfish/1.4.1/data
export BABELFISH_HOME_NEW=/opt/babelfish/2.3.0
export BABELFISH_DATA_NEW=/var/lib/babelfish/2.3.0/data
```
Then, use the following command to perform an upgrade:

```sql
mkdir ~/upgrade
cd ~/upgrade
${BABELFISH_HOME_NEW}/bin/pg_upgrade -U postgres -b ${BABELFISH_HOME_OLD}/bin \
                                       -B ${BABELFISH_HOME_NEW}/bin \
                                       -d ${BABELFISH_DATA_OLD} \
                                       -D ${BABELFISH_DATA_NEW} \
                                       -p 5432 -P 5433 -j $JOBS --verbose
```

Refer to the [pg_upgrade documentation](https://www.postgresql.org/docs/14/pgupgrade.html) for detailed information about using `pg_upgrade`. 

In the event of a failure, the new `data` directory (`$BABELFISH_DATA_NEW`) might have issues, but the old `data` directory (`$BABELFISH_DATA_OLD`) will remain intact. To retry the upgrade, you can remove the new `data` directory  and re-initialize it again. Follow the instructions in `Initiating the Data directory` from `INSTALLING.md`.

5. After the upgrade is successfully completed, start the new server with `pg_ctl`:

`${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW} -l logfile start`

6. To update the Babelfish extensions, connect to the PostgreSQL endpoint of the Babelfish database and execute the following statements from a single session in this order:

```sql
${BABELFISH_HOME_OLD}/bin/psql -d database_name -U user_name

ALTER EXTENSION babelfishpg_common UPDATE;
ALTER EXTENSION babelfishpg_tsql UPDATE;
ALTER EXTENSION babelfishpg_tds UPDATE;
```

## Preparing the Upgraded Server for Use

After upgrading, you need to update the parameter settings to ensure they match the parameter settings in use before the upgrade. Note that you are required to set `babelfishpg_tsql.database_name` even if the value is the same as in the new cluster as it was in the old cluster.

There are two ways to set the parameter values at the `psql` command line; first, connect to `psql`: 

`$PKGDIR_NEW/bin/psql -U your_user_name -d babelfish_db_name` 

To change each individual parameter setting to match the values before the upgrade, use the following command:

`ALTER SYSTEM SET <setting_name> = <setting_value>;`

To update a group of parameters with a single command, replace the `setting_value` in the following command with the values that you saved from the cluster before performing the upgrade:

```sql
cat << EOF >> ${BABELFISH_DATA_NEW}/postgresql.conf
 
babelfishpg_tds.tds_default_numeric_precision = setting_value
babelfishpg_tds.tds_default_numeric_scale = setting_value
babelfishpg_tsql.database_name = setting_value
babelfishpg_tsql.default_locale = setting_value
babelfishpg_tsql.migration_mode = setting_value
babelfishpg_tsql.server_collation_name = setting_value
 EOF
```

After updating the parameters, use the following command to restart the server:

`${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW} -l logfile restart`

Please note that you cannot change migration mode during an upgrade.  For example, if `babelfishpg_tsql.migration_mode` was `multi-db` before the upgrade, and you change it to `single-db`, you will not able to see any user-defined databases that were there before the upgrade.




