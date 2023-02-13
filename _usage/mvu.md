---
layout: default
title: Babelfish Major Version Upgrade
nav_order: 9
---

## Babelfish Major Version Upgrade

Babelfish for PostgreSQL now supports major version upgrade (MVU). The upgrade is composed of two main steps. You first perform a major version upgrade on the PostgreSQL server to upgrade it to the target version. And, then you update all Babelfish extensions to the target version. Currently, the Babelfish for PostgreSQL only supports upgrade using the `pg_upgrade` module. Other upgrade methods such as `dump`/`restore` and replication are not supported.

## Naming Conventions

The rest of the document refers to the following directory locations:

| Variable | Value | Description |
|----------|-------|-------------|
| $BABELFISH_HOME_OLD | /opt/babelfish/{{OLD_BABELFISH_VERSION}} | Home directory of the source Babelfish installation |
| $BABELFISH_HOME_NEW | /opt/babelfish/{{NEW_BABELFISH_VERSION}} | Home directory of the target Babelfish installation |
| $BABELFISH_DATA_OLD | /var/lib/babelfish/{{OLD_BABELFISH_VERSION}}/data | Data directory of the source Babelfish installation |
| $BABELFISH_DATA_NEW | /var/lib/babelfish/{{NEW_BABELFISH_VERSION}}/data | Data directory of the target Babelfish installation |
| $JOBS | $(nproc) | Number of CPU cores|

Also in the example commands, the default database name for the Babelfish database, `babelfish_db` is being used.

## General Requirements for Major Version Upgrade

- MVU is supported for Babelfish for PostgreSQL servers based on PostgreSQL 13 having version 13.6 or later.
- For Babelfish servers based on PostgreSQL 13, the target PostgreSQL engine version can be 14.6 or higher versions based on PostgreSQL 14.
- You can use the following Babelfish releases as the MVU source (the Babelfish version from which you will upgrade):

    - Babelfish 1.2.2 or higher, built with PostgreSQL 13.6
    - Babelfish 1.3.1 or higher, built with PostgreSQL 13.7
    - Babelfish 1.4.0 or higher, built with PostgreSQL 13.8
    - Babelfish 1.5.0 or higher, built with PostgreSQL 13.9

Note: Babelfish versions 1.0.x, 1.1.x do not support major version upgrade.

- Currently, the following Babelfish release can be used as an upgrade target (the Babelfish version to which you will upgrade):

    - Babelfish 2.3.0, built with PostgreSQL 14.6

To identify the Babelfish version of the source cluster, you can query the Babelfish server. You can use the TDS port or the PostgreSQL port.

  - Through the TDS port: Use `sqlcmd` to connect to Babelfish and query the database as follows:

```sql
sqlcmd -S babelfish_server -U your_user_name -P user_password
1> SELECT CAST(serverproperty('babelfishversion') AS VARCHAR)
2> GO
serverproperty
------------------------------
1.2.1
```

  - Through the PostgreSQL port: Use `psql` to connect to the PostgreSQL port and query the database as follows:

```sql
${BABELFISH_HOME_OLD}/bin/psql -d babelfish_db -U postgres
babelfish_db=# select sys.SERVERPROPERTY('BabelfishVersion') AS Babelfish_Version;
babelfish_version
------------------------------
1.2.1
```

## Performing a Major Version Upgrade

Required steps before performing MVU on a Babelfish server

1. Make sure that the source server is running a version that supports MVU (13.6 or later). If you are not running a version listed in the supported source version list, perform an upgrade to that version. To perform a minor version upgrade, follow the instructions in the `INSTALLING.md` included with the release to build and replace new Babelfish for PostgreSQL server and extensions. To update the Babelfish extensions, connect to the PostgreSQL endpoint of the Babelfish database and execute the following statements from a single session in this order (make sure to run these commands in single transaction/scope to avoid inconsistency in the event of failures):
    
```sql
${BABELFISH_HOME_OLD}/bin/psql -d babelfish_db -U postgres

babelfish_db=# ALTER EXTENSION babelfishpg_common UPDATE;
babelfish_db=# ALTER EXTENSION babelfishpg_tsql UPDATE;
babelfish_db=# ALTER EXTENSION babelfishpg_tds UPDATE;
```

*Note*: This step is not needed if you already have a previous installation of Babelfish with a version which supports MVU.

2. As a backup option, create a copy of the source PostgreSQL `data` directory (`$BABELFISH_DATA_OLD`) in case you run into issues during the MVU and need to revert to the original database. Keep in mind that this directory might consume significant disk space.

### Steps to perform MVU on a Babelfish server

1. Download zip/tar distribution file of the target Babelfish version which supports MVU from here. (https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases) Extract the distribution and follow `INSTALLING.md` to build and install new version of Babelfish (`$BABELFISH_HOME_NEW`) and initialize the `data` directory for the target engine version (`$BABELFISH_DATA_NEW`).
    
    *Note* that the new server should be empty and should not already have Babelfish database or extensions installed (Skip `Enabling extensions in the target database` step and later while following `INSTALLING.md` for new Babelfish version).

2. Switch to the `postgres` user (a non-superuser) and start the old cluster:

```sql
sudo su - postgres
```

For example, if you are upgrading from PG 13.8 (Babelfish 1.4.1) to PG 14.6 (Babelfish 2.3.0) you can set the following environment variables:

```sql
export BABELFISH_HOME_OLD=/opt/babelfish/1.4.1
export BABELFISH_DATA_OLD=/var/lib/babelfish/1.4.1/DATA
export BABELFISH_HOME_NEW=/opt/babelfish/2.3.0
export BABELFISH_DATA_NEW=/var/lib/babelfish/2.3.0/data
```

And, then start the old cluster as follows:

```sql
${BABELFISH_HOME_OLD}/bin/pg_ctl -D ${BABELFISH_DATA_OLD} -l logfile start
```

3. Some Babelfish specific parameters are considered critical and their values must be the same before and after a major version upgrade. Changing any of the parameter values during the upgrade might cause inconsistent database behavior or even data corruption. Therefore, it is mandatory that the following Babelfish related parameters are set to the same values after upgrade as they were before upgrade.

Note down the values of following Babelfish parameters from the source server and later we will set them back to the same values for the target server:

a. `babelfishpg_tds.tds_default_numeric_precision`
b. `babelfishpg_tds.tds_default_numeric_scale`
c. `babelfishpg_tsql.database_name`
d. `babelfishpg_tsql.default_locale`
e. `babelfishpg_tsql.migration_mode`
f. `babelfishpg_tsql.server_collation_name`

Connect to source PostgreSQL server using `psql` and then run the following SQL command to get the parameters values individually:

```sql
${BABELFISH_HOME_OLD}/bin/psql -U postgres -d babelfish_db

babelfish_db=# show <setting name>;
```

Alternatively, you can use the following command to return all the values of the parameters mentioned above:

```sql
babelfish_db=# select name, setting from pg_settings where name in 
('babelfishpg_tds.tds_default_numeric_precision',
'babelfishpg_tds.tds_default_numeric_scale',
'babelfishpg_tsql.database_name',
'babelfishpg_tsql.default_locale',
'babelfishpg_tsql.migration_mode',
'babelfishpg_tsql.server_collation_name');
```

4. Stop the source and target servers if either of them is running, by using `pg_ctl` as follows:

```sql
--- old server
${BABELFISH_HOME_OLD}/bin/pg_ctl -D ${BABELFISH_DATA_OLD}/ stop

--- new server
${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW}/ stop
```

5. Now perform MVU to upgrade the PostgreSQL server using the `pg_upgrade` utility. No special handling is needed to use `pg_upgrade` for Babelfish. You can refer to the official [PostgreSQL documentation](https://www.postgresql.org/docs/14/pgupgrade.html) for detailed information about using `pg_upgrade`.

Example commands:

```sql
mkdir ~/upgrade
cd ~/upgrade
${BABELFISH_HOME_NEW}/bin/pg_upgrade -U postgres -b ${BABELFISH_HOME_OLD}/bin \
                                 -B ${BABELFISH_HOME_NEW}/bin \
                                 -d ${BABELFISH_DATA_OLD} \
                                 -D ${BABELFISH_DATA_NEW} \
                                 -j $JOBS --verbose
```

6. In case of a failure, the target `data` directory (`$BABELFISH_DATA_NEW`) might have issues but the source `data` directory (`$BABELFISH_DATA_OLD`) will still remain intact. To retry the upgrade, just remove the target `data` directory (`$BABELFISH_DATA_NEW`) and re-initialize it again (Follow `Initializing the Data Directory` from `INSTALLING.md`).

7. After the upgrade is successfully completed, start the new server using `pg_ctl` as follows:

```sql
${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW} -l logfile start
```

8. To update the extensions, connect to the PostgreSQL endpoint of the Babelfish database using psql and execute the following statements from a single session in this order:

```sql
${BABELFISH_HOME_NEW}/bin/psql -d babelfish_db -U postgres

babelfish_db=# ALTER EXTENSION babelfishpg_common UPDATE;
babelfish_db=# ALTER EXTENSION babelfishpg_tsql UPDATE;
babelfish_db=# ALTER EXTENSION babelfishpg_tds UPDATE;
```

9. It is important to make sure that the required Babelfish parameters are the same after the major version upgrade as what we noted in step 3 earlier.

For example, if `babelfishpg_tsql.migration_mode` was `multi-db` before the upgrade, but after the upgrade it changes to `single-db`, then you will not able to see any user defined databases that were there before the upgrade.

The following parameters need to be validated:

a. `babelfishpg_tds.tds_default_numeric_precision`
b. `babelfishpg_tds.tds_default_numeric_scale`
c. `babelfishpg_tsql.database_name`
d. `babelfishpg_tsql.default_locale`
e. `babelfishpg_tsql.migration_mode`
f. `babelfishpg_tsql.server_collation_name`

Important: It is mandatory to set `babelfishpg_tsql.database_name` parameters using any of the methods given below even if its value is already the same as source cluster.

  - Using PSQL CLI:

Connect via `psql` using the command `${BABELFISH_HOME_NEW}/bin/psql -U postgres -d babelfish_db` and then run following SQL command to restore the above settings to the same values as before the upgrade that you obtained in Step 3:

```sql
ALTER SYSTEM SET <setting name> = <setting value>;
```

  - Using `postgresql.conf` configuration file:

Run following command to update the `postgresql.conf` file with the correct parameter values, just remember to replace in the command with the correct values obtained from step 3:

```sql
cat << EOF >> ${BABELFISH_DATA_NEW}/postgresql.conf

babelfishpg_tds.tds_default_numeric_precision = <setting value>
babelfishpg_tds.tds_default_numeric_scale = <setting value>
babelfishpg_tsql.database_name = <setting value>
babelfishpg_tsql.default_locale = <setting value>
babelfishpg_tsql.migration_mode = <setting value>
babelfishpg_tsql.server_collation_name = <setting value>
EOF
```

10. Finally after completing any of the steps above, restart the PostgreSQL server for all of the settings to take effect:

```sql
${BABELFISH_HOME_NEW}/bin/pg_ctl -D ${BABELFISH_DATA_NEW} -l logfile restart
```


