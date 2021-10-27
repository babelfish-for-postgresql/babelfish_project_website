---
layout: default
title: Babelfish / MS SQL comparison
nav_order: 6
---

## Managing differences in behavior

Babelfish tries to be as compatible with MS SQL as possible. However, some
variances still persist. In this section you will learn how things differ from
each other and which incompatibilities are known to exist.

#### Application roles

- MS SQL: Application roles are set with <code>CREATE APPLICATION ROLE</code> or sp_setapprole
- Babelfish: This is currently not supported.


#### `COMPATIBILITY_LEVEL`

- MS SQL: Backwards compatibility is set with <code>COMPATIBILITY_LEVEL</code>
- Babelfish: <code>ALTER DATABASE... SET COMPATIBILITY LEVEL</code> will be accepted and ignored 


#### `sysdatabases.cmptlevel`

- MS SQL: <code>sysdatabases.cmptlevel</code> will always be NULL
- Babelfish: <code>ALTER DATABASE... SET COMPATIBILITY LEVEL</code> will be accepted and ignored


#### Hints

- MS SQL: Supports table hints, query hints, and join hints.
- Babelfish: Accepted and ignored.


#### Assembly modules and CLR routines

- MS SQL: Assembly modules and common language runtime (CLR) routines are not supported 
  	  (<code>CREATE ASSEMBLY</code>).
- Babelfish: Currently not supported


#### Backup and restore

- MS SQL: Completely different behavior
- Babelfish: Use backup tools as for standard PostgreSQL


#### bcp, bulk copy, bulk insert

- MS SQL: Microsoft SQL Server offers a command line utility called
  <code>bcp</code> as a common way of importing and exporting data. 
- Babelfish: This is currently not supported. 


#### Blank column names when there is no column alias

- MS SQL: Allows column names to be blank when sending a result set to a client application. 
          This can happen when the column is an expression involving more than a table column 
          reference and no column alias is specified. sqlcmd and psql handle
          columns with blanks differently. MS SQL sqlcmd returns a blank column
          name.
- Babelfish: psql returns a generated column name.


#### Case-sensitivity for identifiers

- MS SQL: By default, SQL Server is case-insensitive for identifiers. So <code>MyTable</code> 
	  and <code>MYTABLE</code> reference the same object. However, SQL Server can be 
	  configured so that identifiers are case-sensitive. In this setting, 
	  <code>MyTable</code> and <code>MYTABLE</code> would identify two different objects. 
- Babelfish: For PostgreSQL, only case-insensitive identifiers are supported. For example, the
	  identifiers <code>MyTable</code> and <code>MYTABLE</code> refer to the same 
	  object. If your SQL Server database is configured to be case-sensitive for 
	  identifiers, Babelfish will identify <code>MyTable</code> and <code>MYTABLE</code> 
	  as the same object.


#### Column default

- MS SQL: Supports creating a column default with an explicitly specified constraint name. 
	  For example: <code>ALTER TABLE ADD CONSTRAINT...DEFAULT...FOR...</code>. 
	  SQL Server also supports dropping the default using that same name. 
	  <code>ALTER TABLE...DROP CONSTRAINT...</code>.
- Babelfish: PostgreSQL handles column defaults in a different manner than SQL Server does, and there is no 
	  constraint name associated with a column default. Therefore, when creating a column 
	  default this way, the constraint name is ignored. To drop a column default use the
	  following: <code>ALTER TABLE...ALTER COLUMN...DROP DEFAULT...</code>.


#### Common language runtime (CLR)

- MS SQL: Supports Microsoft common language runtime (CLR) procedures, functions, and triggers.
- Babelfish: Currently not supported.


#### Constraints

- MS SQL: SQL Server supports enabling and disabling individual constraints such as the following.
	  <code>ALTER TABLE...[NO]CHECK CONSTRAINT...</code>. 
- Babelfish: PostgreSQL does not support enabling and disabling individual constraints. The 
	  statement is ignored and a warning is raised.


#### Contained databases

- MS SQL: Contained databases have logins authenticated at the database level rather than 
	  at the server level.
- Babelfish: Currently not supported.


#### Data encryption

- MS SQL: Encrypting data in the database. An example is for an entire database with 
	  <code>CREATE DATABASE ENCRYPTION KEY</code> (TDE) or for finer-grained 
	  encryption with <code>ENCRYPTBYKEY</code>, 
	  <code>CREATE SYMMETRIC KEY</code>, etc., is not supported.
- Babelfish: Currently not supported.


#### IDENTITY columns support

- MS SQL: <code>IDENTITY</code> columns are supported for data types <code>tinyint</code>, 
	  <code>smallint</code>, <code>int</code>, <code>bigint</code>. <code>numeric</code>, 
	  and <code>decimal</code>. SQL Server supports precision up to 38 for data types 
	  <code>numeric</code> and <code>decimal</code> in <code>IDENTITY</code> columns.
- Babelfish: PostgreSQL supports precision up to 19 for data types <code>numeric</code> 
	  and <code>decimal</code> in <code>IDENTITY</code> columns.


#### Identifiers exceeding 63 characters

- MS SQL: Supports using up to 128 characters for identifiers.
- Babelfish: PostgreSQL supports a maximum of 63 characters for identifiers.
  	  Babelfish converts identifiers longer than 63 characters to a name that
          uses a hash of the original name. Use the original name with T-SQL but the 
	  converted name when accessing the database using PostgreSQL.


#### Language customization

- MS SQL: Supports using a non-default language for error messages and for day 
	  and month names.
- Babelfish: For PostgreSQL, only English error messages and date names are 
	  currently supported.


#### `NEWSEQUENTIALID()` function

- MS SQL: SQL Server supports the <code>NEWSEQUENTIALID()</code> function to 
	  generate a GUID value, which is guaranteed to have a higher value than 
	  a set of previously generated GUID values.
- Babelfish: When calling <code>NEWSEQUENTIALID()</code>, PostgreSQL cannot guarantee 
	  a higher GUID value so it will just generate a new GUID value, 
	  just like <code>NEWID()</code> does.


#### Procedure or function parameter limit

- MS SQL: SQL Server supports up to 2100 parameters for a SQL stored procedure 
	  or SQL function. 
- Babelfish: PostgreSQL supports a maximum of 100 parameters for a procedure or function.


#### Remote object access

- MS SQL: SQL Server can access objects on a remote server including tables, 
	  views, and procedures.
- Babelfish: Currently not supported.


#### `ROWGUIDCOL`

- Babelfish: Currently ignored. Queries referencing <code>$GUIDGOL</code> will 
	  cause a syntax error.


#### Row-level security

- Babelfish: Row-level security with <code>CREATE SECURITY POLICY</code> and inline 
	  table-valued functions is currently not supported.


#### `SEQUENCE` objects support

- MS SQL: <code>SEQUENCE</code> objects are supported for data types 
	  <code>tiny int</code>, <code>smallint</code>, <code>int</code>, 
	  <code>bigint</code> . <code>numeric</code>, and <code>decimal</code>. 
	  SQL Server supports precision up to 38 for data types <code>numeric</code>
	  and <code>decimal</code> in <code>SEQUENCE</code> objects.
- Babelfish: PostgreSQL supports precision up to 19 for data types 
	  <code>numeric</code> and <code>decimal</code> in <code>SEQUENCE</code>
	  objects.


#### SQL keywords `CLUSTERED` and `UNCLUSTERED` constraints

- Babelfish: Currently not supported. PostgreSQL ignores <code>CLUSTERED</code> 
	  and <code>UNCLUSTERED</code> keywords for indexes or constraints. 
	  Babelfish does not support this storage structure (whereby the index 
	  key defines the physical storage order of the rows). A clustered 
	  index can impact query plans and performance aspects, though the 
	  precise effects are non-trivial.


#### SQL keyword `FILLFACTOR`

- MS SQL: Related to SQL Server-specific aspects of data storage. 
- Babelfish: Currently ignored.


#### SQL keyword `NONCLUSTERED` for indexes and constraints

- MS SQL: SQL Server uses <code>NONCLUSTERED</code> keywords for indexes 
	  and constraints.
- Babelfish: Currently ignored. PostgreSQL supports heap structures.


#### SQL keyword clause `NOT FOR REPLICATION`

- MS SQL: Related to SQL Server-specific aspects of data storage.<
- Babelfish: Currently ignored


#### SQL keyword clause <code>ON</code> filegroup

- MS SQL: For SQL Server, the commands <code>CREATE TABLE</code> and 
	  <code>CREATE INDEX</code> support the object placement clause 
	  <code>ON</code> filegroup. This is related to SQL Server-specific 
	  aspects of data storage.
- Babelfish: Currently ignored because it is irrelevant for PostgreSQL.


#### SQL keyword <code>SPARSE</code>

- MS SQL: Related to SQL Server-specific aspects of data storage.
- Babelfish: Currently ignored.


#### SQL keyword <code>TEXTIMAGE_ON</code> filegroup

- MS SQL: or SQL Server, the commands <code>CREATE TABLE</code> and 
	  <code>CREATE INDEX</code> support the object placement clause 
	  <code>TEXTIMAGE_ON</code> filegroup
- Babelfish: PostgreSQL ignores the <code>TEXTIMAGE_ON</code> filegroup 
	 clause because it is irrelevant for PostgreSQL.


#### SQL statement <code>USE</code> database name

- Babelfish: Currently not supported


#### Sort order with <code>DESC</code>

- MS SQL: Allows the column sorting order in <code>UNIQUE</code> 
	  and <code>PRIMARY KEY</code> constraints to be specified 
	  as <code>DESC</code>. This helps to optimize queries that can 
	  benefit from this ordering.
- Babelfish: PostgreSQL does not support <code>DESC</code> for constraints. 
	  PostgreSQL constraints are created with the default <code>ASC</code> 
	  ordering. However, PostgreSQL does support <code>DESC</code> ordering 
	  for columns in explicitly created indexes. 


#### Time precision

- MS SQL: SQL Server supports fractions of a second for precision of the 
	  <code>datetime2</code> data type to 7 digits with 3 fractional digits.
	  SQL Server rounds this to 3-millisecond precision. This means that 
	  when you store a particular time value, the milliseconds might be 
	  rounded and end up being stored differently than what you specified. 
	  For example, the command <code>SELECT CAST('2016-12-26 23:59:59.999' as
	  datetime)</code> returns the value 2016-12-27 00:00:00.000.
- Babelfish: PostgreSQL supports 6-digit precision for fractional seconds. 
	  PostgreSQL does not perform SQL Server 3-millisecond rounding. 
	  No adverse effects are anticipated with this behavior.


#### Transaction isolation levels

- MS SQL: Choosing a transaction isolation level doesn't affect the locks that 
	are acquired to protect data modifications. A transaction always gets 
	an exclusive lock on any data it modifies and holds that lock until the 
	transaction completes, regardless of the isolation level set for that 
	transaction. For read operations, transaction isolation levels primarily 
 	define the level of protection from the effects of modifications made by 
	other transactions.
- Babelfish: We use standard PostgreSQL MVCC behavior. This implies that
        <code>READ UNCOMMITED</code> is automatically mapped to <code>READ
        COMMITTED</code> as PostgreSQL does not have a lower isolation level.
	<code>REPEATABLE READ</code> and <code>SERIALIZABLE</code> are currently
	not supported. MS SQL <code>snapshot> is treated as the equivalent of 
	<REPEATABLE READ>.


#### Triggers for LOGON and DDL

- Babelfish: Currently this is not supported.


#### @@version

- Babelfish: The contents of <code>@@version</code> in Babelfish than the 
	native content for SQL Server. Your code might not work correctly if
	it depends on the native formatting of <code>@@version</code>, such
	as to extract specific minor version numbers.


## Unsupported stored procedures

MS SQL comes with a huge set of predefined stored procedures which make database
handling easier, or in some cases make it possible at all. However, some of these procedures are not
supported by Babelfish. 


### Missing catalog related procedures

The following catalog procedures are currently not supported:

- <code>sp_column_privileges</code>
- <code>sp_databases</code>
- <code>sp_fkeys</code>
- <code>sp_pkeys</code>
- <code>sp_server_info</code>
- <code>sp_special_columns</code>
- <code>sp_sproc_columns</code>
- <code>sp_statistics</code>
- <code>sp_stored_procedures</code>
- <code>sp_table_privileges</code>


### Missing cursor related procedures

The following list contains an overview of missing cursor-related procedures:

- <code>sp_describe_cursor_columns</code>
- <code>sp_describe_cursor_tables</code>


### Missing database engine related procedures

This is a list of database engine-related functionality which is not yet available:

- <code>sp_add_data_file_recover_suspect_db</code>
- <code>sp_add_log_file_recover_suspect_db</code>
- <code>sp_addextendedproc</code>
- <code>sp_addextendedproperty</code>
- <code>sp_addmessage</code>
- <code>sp_addtype</code>
- <code>sp_addumpdevice</code>
- <code>sp_altermessage</code>
- <code>sp_attach_db</code>
- <code>sp_attach_single_file_db</code>
- <code>sp_autostats</code>
- <code>sp_bindefault</code>
- <code>sp_bindrule</code>
- <code>sp_bindsession</code>
- <code>sp_certify_removable</code>
- <code>sp_clean_db_file_free_space</code>
- <code>sp_clean_db_free_space</code>
- <code>sp_configure</code>
- <code>sp_control_plan_guide</code>
- <code>sp_create_plan_guide</code>
- <code>sp_create_plan_guide_from_handle</code>
- <code>sp_create_removable</code>
- <code>sp_createstats</code>
- <code>sp_cycle_errorlog</code>
- <code>sp_db_increased_partitions</code>
- <code>sp_dbcmptlevel</code>
- <code>sp_dbmmonitoraddmonitoring</code>
- <code>sp_dbmmonitorchangealert</code>
- <code>sp_dbmmonitorchangemonitoring</code>
- <code>sp_dbmmonitordropalert</code>
- <code>sp_dbmmonitordropmonitoring</code>
- <code>sp_dbmmonitorhelpalert</code>
- <code>sp_dbmmonitorhelpmonitoring</code>
- <code>sp_dbmmonitorresults</code>
- <code>sp_delete_backuphistory</code>
- <code>sp_depends</code>
- <code>sp_detach_db</code>
- <code>sp_dropdevice</code>
- <code>sp_dropextendedproc</code>
- <code>sp_dropextendedproperty</code>
- <code>sp_dropmessage</code>
- <code>sp_droptype</code>
- <code>sp_getbindtoken</code>
- <code>sp_help</code>
- <code>sp_helpconstraint</code>
- <code>sp_helpdevice</code>
- <code>sp_helpextendedproc</code>
- <code>sp_helpfile</code>
- <code>sp_helpfilegroup</code>
- <code>sp_helpindex</code>
- <code>sp_helplanguage"</code>
- <code>sp_helpserver</code>
- <code>sp_helpsort</code>
- <code>sp_helpstats</code>
- <code>sp_helptext</code>
- <code>sp_helptrigger</code>
- <code>sp_indexoption</code>
- <code>sp_invalidate_textptr</code>
- <code>sp_lock</code>
- <code>sp_monitor</code>
- <code>sp_prepexecrpc</code>
- <code>sp_procoption</code>
- <code>sp_recompile</code>
- <code>sp_refreshview</code>
- <code>sp_rename</code>
- <code>sp_renamedb</code>
- <code>sp_resetstatus</code>
- <code>sp_sequence_get_range</code>
- <code>sp_serveroption</code>
- <code>sp_set_session_context</code>
- <code>sp_setnetname</code>
- <code>sp_settriggerorder</code>
- <code>sp_spaceused</code>
- <code>sp_tableoption</code>
- <code>sp_unbindefault</code>
- <code>sp_unbindrule</code>
- <code>sp_updateextendedproperty</code>
- <code>sp_updatestats</code>
- <code>sp_validname</code>
- <code>sp_who</code>


### Missing security related procedures

- <code>sp_add_trusted_assembly</code>
- <code>sp_addapprole</code>
- <code>sp_addlinkedserver</code>
- <code>sp_addlinkedsrvlogin</code>
- <code>sp_addlogin</code>
- <code>sp_addremotelogin</code>
- <code>sp_addrole</code>
- <code>sp_addrolemember</code>
- <code>sp_addserver</code>
- <code>sp_addsrvrolemember</code>
- <code>sp_adduser</code>
- <code>sp_approlepassword</code>
- <code>sp_audit_write</code>
- <code>sp_change_users_login</code>
- <code>sp_changedbowner</code>
- <code>sp_changeobjectowner</code>
- <code>sp_control_dbmasterkey_password</code>
- <code>sp_dbfixedrolepermission</code>
- <code>sp_defaultdb</code>
- <code>sp_defaultlanguage</code>
- <code>sp_denylogin</code>
- <code>sp_describe_parameter_encryption</code>
- <code>sp_dropalias</code>
- <code>sp_drop_trusted_assembly</code>
- <code>sp_dropapprole</code>
- <code>sp_droplinkedsrvlogin</code>
- <code>sp_droplogin</code>
- <code>sp_dropremotelogin</code>
- <code>sp_droprole</code>
- <code>sp_droprolemember</code>
- <code>sp_dropserver</code>
- <code>sp_dropsrvrolemember</code>
- <code>sp_dropuser</code>
- <code>sp_generate_database_ledger_digest</code>
- <code>sp_grantdbaccess</code>
- <code>sp_grantlogin</code>
- <code>sp_helpdbfixedrole</code>
- <code>sp_helplinkedsrvlogin</code>
- <code>sp_helplogins</code>
- <code>sp_helpntgroup</code>
- <code>sp_helpremotelogin</code>
- <code>sp_helprole</code>
- <code>sp_helprolemember</code>
- <code>sp_helprotect</code>
- <code>sp_helpsrvrole</code>
- <code>sp_helpsrvrolemember</code>
- <code>sp_helpuser</code>
- <code>sp_migrate_user_to_contained</code>
- <code>sp_MShasdbaccess</code>
- <code>sp_password</code>
- <code>sp_refresh_parameter_encryption</code>
- <code>sp_remoteoption</code>
- <code>sp_revokedbaccess</code>
- <code>sp_revokelogin</code>
- <code>sp_setapprole</code>
- <code>sp_srvrolepermission</code>
- <code>sp_testlinkedserver</code>
- <code>sp_unsetapprole</code>
- <code>sp_validatelogins</code>
- <code>sp_verify_database_ledger</code>
- <code>sp_verify_database_ledger_from_digest_storage</code>
- <code>sp_xp_cmdshell_proxy_account</code>


## Dealing with limitations

In this section, we've written a lot about limitations, unsupported features and
such. However, how do you deal with these things in real life? If Babelfish 
runs a SQL statement that doesn't return a result set that is identical to the 
result set when run against SQL Server, the SQL statement will fail. 
To better deal with statements that might fail, Babelfish allows you to define 
escape hatches. An escape hatch is a flag that specifies Babelfish behavior
when it encounters an unsupported feature or syntax. Babelfish can either return 
an error or ignore the condition if the PostgreSQL result set is not a perfect 
match for the result set returned by SQL Server.

You can use the <code>sp_babelfish_configure</code> stored procedure to control 
the settings of each escape hatch. Use the script to specify if each escape 
hatch should be set to <code>ignored</code> or <code> strict</code>.

If set to <code>strict</code>, Babelfish will return an error that you must 
correct before continuing. Include the <code>cluster</code>keyword to apply 
the changes to the current session and on a cluster level.

The following types of hatches exist. The list should give you an impression of
what is possible:

- <code>storage_options</code>: Controls treatment of ...
	- Column options (sparse files, file streams, <code>ROWGUIDCOL</code>)
	- Index options (<code>PAD_INDEX, FILLFACTOR, SORT_IN_TEMPDB, IGNORE_DUP_KEY,
	  STATISTICS_NORECOMPUTE, STATISTICS_INCREMENTAL, ALLOW_ROW_LOCKS,
	  ALLOW_PAGE_LOCKS, OPTIMIZE_FOR_SEQUENTIAL_KEY, MAXDOP, DATA_COMPRESSION</code>)
- <code>storage_on_partition</code>: Handle invalid partition streams
- <code>database_misc_options</code>: Handle database chaining, database property
  <code>TRUSTWORTHY</code>, databases with persistent log buffers
- <code>language_non_english</code>: Create databases with default languages other than
  english
- <code>compatibility_level</code>: Currently no options.
- <code>CHARINDEX</index>: not supported on case-insensitive or accent-insensitive collations

- <code>fulltext</code>: Databases with default fulltext languages. <code>CREATE FULLTEXT INDEX,
  ALTER FULL TEXT INDEX, DROP FULL TEXT INDEX</code>
- <code>schemabinding_function</code>: Handles errors when no SCHEMABINDING option is given
- <code>schemabinding_trigger</code>: Throw an error when it is not given
- <code>schemabinding_procedure</code>: Throw an error when it is not given
- <code>schemabinding_view</code>: Throw an error when it is not given
- <code>index_clustering</code>: CLUSTERED columns are not supported. Control this behavior.
- <code>index_columnstore</code>: Column stores are not supported. Ignore or error out.
- <code>for_replication</code>: Handle unsupported <code>ALTER PROCEDURE ... ENCRYPTION, ALTER
  PROCEDURE ... NATIVE_COMPILATION, ALTER PROCEDURE ... RECOMPILE</code>.
- <code>rowguidcol_column</code>: Handle unsupported <code>ROWGUIDCOL</code> columns
- <code>nocheck_add_constraint</code>: Handle unsupported <code>ALTER TABLE WITH [NO]CHECK
  ADD</code>
- <code>nocheck_existing_constraint</code>: Handle <code>ALTER TABLE [NO]CHECK</code>
- <code>constraint_name_for_default</code>: Handle <code>CONSTRAINT DEFAULT</code>
- <code>table_hints</code>: PostgreSQL does not support table hints 
- <code>query_hints</code>: PostgreSQL does not support query hints
- <code>join_hints</code>: PostgreSQL does not support join hints
- <code>session_settings</code>: Handle <code>SET SHOWPLAN_TEXT ON, FORCEPLAN,
  OFFSETS, PARSEONLY, REMOTE_PROC_TRANSACTIONS, SHOWPLAN_ALL, SHOWPLAN_TEXT,
  SHOWPLAN_XML, STATISTICS, DATEFORMAT, DEADLOCK_PRIORITY, LOCK_TIMEOUT, 
  CONTEXT_INFO, QUERY_GOVERNOR_COST_LIMIT, STATISTICS</code>, XML modify method.


### Dealing with unsupported functions 

The following is a list of functions that are not supported by Babelfish:

| MSSQL Function | Babelfish potential workaround |
| -------------- | ------------------------------ |
| [app_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/app-name-transact-sql.md) | `SELECT application_name FROM pg_stat_activity WHERE pid = pg_backend_pid();` |
| [approx_count_distinct](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/approx-count-distinct-transact-sql.md) |
| [assemblyproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/assemblyproperty-transact-sql.md) |
| [asymkey_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/asymkey-id-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) | 
| [asymkeyproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/asymkeyproperty-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [atn2](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/atn2-transact-sql.md) | atan2 |
| [cast_and_convert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cast-and-convert-transact-sql.md) |
| [cert_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cert-id-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [certencoded](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certencoded-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [certprivatekey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certprivatekey-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [certproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certproperty-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [checksum_agg](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/checksum-agg-transact-sql.md) |
| [col_length](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/col-name-transact-sql.md) | User Defined Function |
| [col_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/col-name-transact-sql.md) | `SELECT attname FROM pg_attribute WHERE attrelid = object_id('public.info') and attnum = 1` |
| [columnproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/columnproperty-transact-sql.md) | User defined function to match property names                               |
| [columns_updated](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/columns-updated-transact-sql.md) | SQL allows you to define aliases for the "old" and "new" rows or tables for use in the definition of the triggered action (e.g., CREATE TRIGGER ... ON tablename REFERENCING OLD ROW AS somename NEW ROW AS othername ...). More information [here](https://www.postgresql.org/docs/13/sql-createtrigger.html) | 
| [compress](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/compress-transact-sql.md) | [Gzip extension](https://pgxn.org/dist/gzip/?spm=a2c65.11461447.0.0.7ab13d3a2dbsHD) |
| [connections](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/connections-transact-sql.md) | Can only get active/idle connections with `SELECT count(*) FROM pg_stat_activity;` |
| [context_info](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/context-info-transact-sql.md) |
| [cpu_busy](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cpu-busy-transact-sql.md) | |
| [crypt_gen_random](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/crypt-gen-random-transact-sql.md) | Use [gen_random_uuid()](https://www.postgresql.org/docs/13/pgcrypto.html#id-1.11.7.34.10) with [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [current_request_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-request-id-transact-sql.md) |
| [current_timezone](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-timezone-transact-sql.md) |
| [current_transaction_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-transaction-id-transact-sql.md) |
| [database_principal_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/database-principal-id-transact-sql.md) | See [pg_database](https://www.postgresql.org/docs/13/catalog-pg-database.html), [pg_db_role_setting](https://www.postgresql.org/docs/13/catalog-pg-db-role-setting.html), [pg_roles](https://www.postgresql.org/docs/13/view-pg-roles.html) |
| [datediff_big](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datediff-big-transact-sql.md) | Need to create UDF similar to one in [this post](http://www.sqlines.com/postgresql/how-to/datediff) using DATE_PART |
| [datefirst](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datefirst-transact-sql.md) | `SELECT setting FROM pg_settings WHERE name = 'datefirst'` |
| [datetimeoffsetfromparts](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datetimeoffsetfromparts-transact-sql.md) |
| [dbts](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/dbts-transact-sql.md) | Use txid_currrent() |
| [decompress](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decompress-transact-sql.md) |
| [decryptbyasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbyasymkey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbycert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbycert-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbykey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbykey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbykeyautoasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbykeyautoasymkey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbykeyautocert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbykeyautocert-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbypassphrase](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbypassphrase-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [difference](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/difference-transact-sql.md) | Use extension [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch.html) |
| [encryptbyasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbyasymkey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [encryptbycert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbycert-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [encryptbykey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbykey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [encryptbypassphrase](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbypassphrase-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [eomonth](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/eomonth-transact-sql.md) |
| [eventdata](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/eventdata-transact-sql.md) |
| [file_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/file-id-transact-sql.md) |
| [file_idex](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/file-idex-transact-sql.md) |
| [file_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/file-name-transact-sql.md) |
| [filegroup_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filegroup-id-transact-sql.md) |
| [filegroup_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filegroup-name-transact-sql.md) |
| [filegroupproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filegroupproperty-transact-sql.md) |
| [fileproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/fileproperty-transact-sql.md) |
| [filepropertyex](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filepropertyex-transact-sql.md) |
| [format](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/format-transact-sql.md) | Currently, there is no overrtide for the PF Format command so it behaves completely different than T-SQL. The [to_char function](https://www.postgresql.org/docs/13/functions-formatting.html) is the closest match to T-SQL format.) |
| [fulltextcatalogproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/fulltextcatalogproperty-transact-sql.md) | |
| [fulltextserviceproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/fulltextserviceproperty-transact-sql.md) | |
| [get_filestream_transaction_context](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/get-filestream-transaction-context-transact-sql.md) | |
| [getansinull]() | |
| [grouping_id]() | Use [grouping()](https://www.postgresql.org/docs/current/functions-aggregate.html#:~:text=Table%C2%A09.59.%C2%A0Grouping%20Operations) |
| [has_perms_by_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/has-perms-by-name-transact-sql.md) | Need to use a combination of the [access privilege inquire functions](https://www.postgresql.org/docs/13/functions-info.html#FUNCTIONS-INFO-ACCESS-TABLE)
| [host_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/host-id-transact-sql.md) | [pg_backend_pid()](https://www.postgresql.org/docs/13/functions-info.html#:~:text=Unix-domain%20socket.-,pg_backend_pid%20(),-%E2%86%92%20integer) |
| [host_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/host-name-transact-sql.md) | [inet_client_addr()](https://www.postgresql.org/docs/13/functions-info.html#:~:text=current%20execution%20context.-,inet_client_addr,-()%20%E2%86%92%20inet) |
| [identity_function](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/identity-function-transact-sql.md) | nextval() with PG SEQUENCE object |
| [idle](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/idle-transact-sql.md) | |
| [index_col](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/index-col-transact-sql.md) | [pg_index view](https://www.postgresql.org/docs/current/catalog-pg-index.html) |
| [indexkey_property](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/indexkey-property-transact-sql.md) | [pg_index view](https://www.postgresql.org/docs/current/catalog-pg-index.html) |
| [indexproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/indexproperty-transact-sql.md) | [pg_index view](https://www.postgresql.org/docs/current/catalog-pg-index.html) |
| [io_busy](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/io-busy-transact-sql.md) | |
| [is_member](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/is-member-transact-sql.md) | `select pg_has_role(CURRENT_USER,'pg_signal_backend', 'MEMBER')` |
| [is_objectsigned](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/is-objectsigned-transact-sql.md) | |
| [is_rolemember](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/is-rolemember-transact-sql.md) | `select pg_has_role('sa', 'pg_signal_backend','MEMBER')` |
| [isjson](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/isjson-transact-sql.md) | create a PL/pgSQL function using return expression `(p_json::json is not null)` |
| [json_modify](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/json-modify-transact-sql.md) | create a PL/pgSQL function to wrap `jsonb_set()` to return a varchar value |
| [json_query](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/json-query-transact-sql.md) | create a PL/pgSQL function to wrap `jspnb_path_query` to return varchar value |
| [json_value](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/json-value-transact-sql.md) | `select cast(jsonb_path_query('{"info":{"address":[{"town":"Paris"},{"town":"London"}]}}','$.info.address[0].town') as varchar(100) );` |
| [key_guid](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/key-guid-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [key_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/key-id-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) | 
| [key_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/key-name-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) | 
| [langid](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/langid-transact-sql.md) | |
| [language](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/language-transact-sql.md) | |
| [last_value](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/last-value-transact-sql.md) | |
| [lead](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/lead-transact-sql.md) | Use PostgreSQL window function [lead](https://www.postgresql.org/docs/13/functions-window.html)
| [lock_timeout](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/lock-timeout-transact-sql.md) | `select s.setting FROM pg_catalog.pg_settings s where name = 'lock_timeout'` |
| [loginproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/loginproperty-transact-sql.md) | Use columns in pg_roles, but SQL logins have more properties than PG |
| [max_connections](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/max-connections-transact-sql.md) | `select s.setting FROM pg_catalog.pg_settings s where name = 'max_connections'` |
| [min_active_rowversion](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/min-active-rowversion-transact-sql.md) | |
| [next_value_for](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/next-value-for-transact-sql.md) | |
| [object_definition](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/object-definition-transact-sql.md) | Use PG [System Catalog Information Functions](https://www.postgresql.org/docs/13/functions-info.html#FUNCTIONS-INFO-CATALOG-TABLE) like pg_get_constraintdef, pg_get_expr, pg_get_functiondef, pg_get_indexdef, pg_get_ruledef, pg_get_triggerdef, pg_get_veiwdef based on the object type for the specified name. |
| [object_schema_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/object-schema-name-transact-sql.md) | Use pg_namespace joined to pg_class, pg_proc, etc to look up the name |
| [objectproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/objectproperty-transact-sql.md) | Use pg_class and others to look for the property |
| [objectpropertyex](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/objectpropertyex-transact-sql.md) | Use pg_class and others to look for the property |
| [opendatasource](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/opendatasource-transact-sql.md) | |
| [openjson](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/openjson-transact-sql.md) | |
| [openquery](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/openquery-transact-sql.md) | |
| [openrowset](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/openrowset-transact-sql.md) | |
| [openxml](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/openxml-transact-sql.md) | |
| [options](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/options-transact-sql.md) | |
| [original_db_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/original-db-name-transact-sql.md) | |
| [original_login](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/original-login-transact-sql.md) | |
| [pack_received](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/pack-received-transact-sql.md) | |
| [pack_sent](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/pack-sent-transact-sql.md) | |
| [packet_errors](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/packet-errors-transact-sql.md) | |
| [parse](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/parse-transact-sql.md) | |
| [partition](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/partition-transact-sql.md) | |
| [percentile_cont](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/percentile-cont-transact-sql.md) | |
| [percentile_disc](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/percentile-disc-transact-sql.md) | |
| [permissions](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/permissions-transact-sql.md) | |
| [pwdcompare](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/pwdcompare-transact-sql.md) | |
| [pwdencrypt](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/pwdencrypt-transact-sql.md) | |
| [remserver](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/remserver-transact-sql.md) | |
| [rowcount_big](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/rowcount-big-transact-sql.md) | |
| [schema_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/schema-id-transact-sql.md) | Use pg_class, pg_proc, etc to get relnamespace |
| [servicename](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/servicename-transact-sql.md) | |
| [session_context](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/session-context-transact-sql.md) | |
| [session_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/session-id-transact-sql.md) | |
| [session_user](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/session-user-transact-sql.md) | |
| [sessionproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/sessionproperty-transact-sql.md) | |
| [signbyasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/signbyasymkey-transact-sql.md) | |
| [signbycert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/signbycert-transact-sql.md) | |
| [soundex](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/soundex-transact-sql.md) | use extension [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch.html) - includes soundex() |
| [square](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/square-transact-sql.md) | [power(n, 2)](https://www.postgresql.org/docs/13/functions-math.html#:~:text=power%20(%20a%20numeric%2C%20b%20numeric%20)) |
| [stats_date](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/stats-date-transact-sql.md) | |
| [stdev](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/stdev-transact-sql.md) | [stddev](https://www.postgresql.org/docs/current/functions-aggregate.html#:~:text=Yes-,stddev,-(%20numeric_type%20)%20%E2%86%92%20double%20precision) |
| [stdevp](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/stdevp-transact-sql.md) | [stddev_pod](https://www.postgresql.org/docs/current/functions-aggregate.html#:~:text=Yes-,stddev_pop,-(%20numeric_type%20)%20%E2%86%92%20double%20precision) |
| [str](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/str-transact-sql.md) | [to_char(125.856, '999D9')](https://www.postgresql.org/docs/current/functions-formatting.html#:~:text=15%3A02%3A12-,to_char,-(%20numeric_type%2C%20text%20)%20%E2%86%92%20text) |
| [string_agg](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/string-agg-transact-sql.md) | |
| [suser_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/suser-name-transact-sql.md) | |
| [suser_sid](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/suser-sid-transact-sql.md) | There is no SID concept in PostgreSQL |
| [switchoffset](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/switchoffset-transact-sql.md) | |
| [symkeyproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/symkeyproperty-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [system_user](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/system-user-transact-sql.md) | [current_user](https://www.postgresql.org/docs/current/functions-info.html#:~:text=in%20the%20result.-,current_user,-%E2%86%92%20name) |
| [textsize](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/textsize-transact-sql.md) | `select s.setting FROM pg_catalog.pg_settings s where name = 'babelfish_pg_tsql.text_size'` |
| [textvalid](https://docs.microsoft.com/en-us/sql/t-sql/functions/text-and-image-functions-textvalid-transact-sql?view=sql-server-ver15) | |
| [timeticks](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/timeticks-transact-sql.md) | |
| [todatetimeoffset](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/todatetimeoffset-transact-sql.md) | |
| [total_errors](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/total-errors-transact-sql.md) | |
| [total_read](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/total-read-transact-sql.md) | |
| [total_write](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/total-write-transact-sql.md) | |
| [trigger_nestlevel](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/trigger-nestlevel-transact-sql.md) | [pg_trigger_depth](https://www.postgresql.org/docs/current/functions-info.html#:~:text=a%20short%20time.-,pg_trigger_depth%20(),-%E2%86%92%20integer) |
| [try_cast](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/try-cast-transact-sql.md) | |
| [try_convert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/try-convert-transact-sql.md) | |
| [try_parse](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/try-parse-transact-sql.md) | |
| [txtptr](https://docs.microsoft.com/en-us/sql/t-sql/functions/text-and-image-functions-textptr-transact-sql?view=sql-server-ver15) | |
| [type_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/type-name-transact-sql.md) | [format_type(c.user_type_id,null)](https://www.postgresql.org/docs/current/functions-info.html#:~:text=format_type%20(%20type%20oid%2C%20typemod%20integer%20)) |
| [typeproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/typeproperty-transact-sql.md) | Use [pg_catalog.pg_type](https://www.postgresql.org/docs/13/catalog-pg-type.html) view |
| [user_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/user-id-transact-sql.md) | Use [pg_catalog.pg_roles](https://www.postgresql.org/docs/13/view-pg-roles.html) view |
| [user_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/user-name-transact-sql.md) | Use [pg_catalog.pg_roles](https://www.postgresql.org/docs/13/view-pg-roles.html) view |
| [var](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/var-transact-sql.md) | Use [variance](https://www.postgresql.org/docs/current/functions-aggregate.html#:~:text=Yes-,variance,-(%20numeric_type%20)%20%E2%86%92%20double%20precision) |
| [varp](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/varp-transact-sql.md) | Use [var_pop](https://www.postgresql.org/docs/current/functions-aggregate.html#:~:text=Yes-,var_pop,-(%20numeric_type%20)%20%E2%86%92%20double%20precision) |
| [verifysignedbyasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/verifysignedbyasymkey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [verifysignedbycert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/verifysignedbycert-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
