---
layout: default
title: Limitations of Babelfish
nav_order: 3
has_children: false
permalink: /docs/limitations-of-babelfish
---

# Limitations

Babelfish Supports the following features with some restrictions:

* A DB cluster that supports babelfish supports only one babelfish database.
* Works with the PostgreSQL engine version 13.x only

Babelfish doesn't support the following SQL Server functionality:

| Functionality | Notes | 
| ------------- | ----- |
| SELECT TOP x PERCENT WHERE x &lt; or &gt; 100 | |
| SELECT TOP... WITH TIES | |
| INSERT... TOP | |
| INSERT... DEFAULT VALUES | |
| MERGE | |
| SELECT PIVOT/UNPIVOT | |
| CROSS APPLY | |
| OUTER APPLY | |
| SET ROWCOUNT n WHERE n != 0 | Expecting to support n == 0 for GA | 
| SET ROWCOUNT @variable | |
| SELECT... FOR XML AUTO | |
| SELECT... FOR XML EXPLICIT |
| SELECT... FOR XML PATH, ELEMENTS | Supported without the ELEMENTS clause |
| SELECT... FOR XML RAW, ELEMENTS | Supported without the ELEMENTS clause |
| All XML methods | This includes .VALUES(), .NODES(), and other methods |
| XPATH expressions | |
| OPENXML() | |
| XML indexes |  |
| WITH XMLNAMESPACES construct |   |
| APPROX_COUNT_DISTINCT |  |
| CHECKSUM_AGG |   |
| GROUPING ID |  |
| ROWCOUNT_BIG |   |
| STDEV |  |
| STDEVP |   |
| VAR |  |
| VARP |   |
| HIERARCHYID | datatype |
| HIERARCHYID | All methods are unsupported |
| GEOMETRY | datatype |
| GEOMETRY | All associated functionality |
| GEOGRAPHY | datatype |
| GEOGRAPHY | All associated functionality |
| Graph functionality | All SQL graph functionality is unsupported |
| Temporal tables |  |
| ROWVERSION | datatype |
| TIMESTAMP | SQL Server's TIMESTAMP is unrelated to PostgreSQL TIMESTAMP |
| XML datatype with schema (xmlschema) | XML type without schema is supported |
| JSON | All Built in Functions and statements |
| Fulltext Search | All Built in Functions and statements |
| Encryption | All Built in Functions and statements |
| HASHBYTES() | MD5, SHA1, SHA256 are supported |
| NEWSEQUENTIALID() function | Implemented as NEWID(); sequential behavior is not supported. |
| DATETIME | Numeric representation |
| DATETIME | 3 millisecond rounding for DATETIME datatype |
| ROWSET functions | OPENXML(),  OPENJSON(), OPENROWSET(), OPENQUERY(), OPENDATASOURCE() |
| Cursors (Updatable) |  |
| Cursors | GLOBAL |
| Cursor (misc options) | SCROLL,KEYSET,DYNAMIC,FAST_FORWARD,SCROLL_LOCKS,OPTIMISTIC,TYPE_WARNING,FOR UPDATE |
| Cursor (fetch behaviors) | FETCH PRIOR,FIRST,LAST,ABSOLUTE,RELATIVE |
| Cursor-typed | variables and parameters |
| ##TEMP tables (global) |  |
| Virtual computed colums (non-persistant) | Will be created as persistant |
| Views WITHOUT SCHEMABINDING clause |  |
| Procedures WITHOUT SCHEMABINDING clause |  |
| Functions WITHOUT SCHEMABINDING clause |  |
| Triggers WITHOUT SCHEMABINDING clause |  |
| Views WITH ENCRYPTION clause |  |
| Procedures WITH ENCRYPTION clause |  |
| Functions WITH ENCRYPTION clause |  |
| Triggers WITH ENCRYPTION clause |  |
| Procedures EXECUTE AS SELF clause |  |
| Functions EXECUTE AS SELF clause |  |
| Triggers EXECUTE AS SELF clause |  |
|  Procedures EXECUTE AS USE clause |  |
| Functions EXECUTE AS USE |  |
| Triggers EXECUTE AS USE |  |
| Procedures WITH RECOMPILE | Applies to both DECLARE and EXECUTE statements |
| View VIEW_METADATA clause |  |
| View CHECK clause |  |
| Indexes with IGNORE_DUP_KEY | Indexes will be created without this property. |
| Constraints with IGNORE_DUP_KEY | Constraints will be created without this property. |
| Indexes (inline) |  |
| Indexes (clustered) | Created as if NONCLUSTERED was specified |
| ALTER INDEX |  |
| Index clauses | The following clauses are not supported:  FILLFACTOR,  							ALLOW_PAGE_LOCKS, ALLOW_ROW_LOCKS, PAD_INDEX, STATISTICS_NORECOMPUTE,  							OPTIMIZE_FOR_SEQUENTIAL_KEY, SORT_IN_TEMPDB, DROP_EXISTING, ONLINE,  							COMPRESSION_DELAY, MAXDOP, DATA_COMPRESSION |
| COLUMNSTORE indexes |  |
| Constraints (DESC columns) | Constraints will be created as ASC. |
| Query hints |  |
| Table hints |  |
| Join hints |  |
| Column attributes | ROWGUIDCOL, SPARSE, FILESTREAM, MASKED |
| Indexes with more than 32 columns | Where  'included' columns count |
| Procedure declarations with more than 100 parameters |  |
| Function declarations with more than 100 parameters |  |
| Procedure calls that includes DEFAULT as a parameter value |  |
| Function calls that includes DEFAULT as a parameter value |  |
| ALTER PROCEDURE |  |
| ALTER FUNCTION |  |
| ALTER TRIGGER |  |
| Procedures, externally defined | Including SQL Common Language Runtime (CLR) |
| Functions, externally defined | Including SQL Common Language Runtime (CLR) |
| Triggers, externally defined | Including SQL Common Language Runtime (CLR) |
| INSTEAD_OF Triggers |  |
| Using EXECUTE to call a SQL function |  |
| Invoking a procedure whose name is in a variable |  |
| Procedure versioning |  |
| Database Console Command statements (DBCC) |  |
| READTEXT |  |
| WRITETEXT |  |
| UPDATETEXT |  |
| Transaction isolation levels other than READCOMMITTED and READUNCOMMITTED | READ UNCOMMITTED  is  treated the same as READ COMMITTED. |
| Table partitioning |  |
| Index partitioning |  |
| DROP statements that drop multiple objects |  |
| DROP IF EXISTS |  |
| LOGINPROPERTY() |  |
| COLUMNPROPERTY() |  |
| OBJECTPROPERTY() |  |
| OBJECTPROPERTYEX() |  |
| TYPEPROPERTY() |  |
| SERVERPROPERTY() | Unsupported properties include: BuildClrVersion, ComparisonStyle, ComputerNamePhysicalNetBIOS, EditionID, EngineEdition, HadrManagerStatus, InstanceDefaultDataPath, InstanceDefaultLogPath, InstanceName, IsAdvancedAnalyticsInstalled, IsBigDataCluster, IsClustered, IsFullTextInstalled, 							IsHadrEnabled, IsIntegratedSecurityOnly, IsLocalDB, IsPolyBaseInstalled, IsXTPSupported, LCID, LicenseType, MachineName, NumLicenses, ProcessID, ProductBuild, ProductBuildType, ProductLevel, ProductMajorVersion, ProductMinorVersion, ProductUpdateLevel, ProductUpdateReference, ProductVersion, ResourceLastUpdateDateTime, ResourceVersion, ServerName, SqlCharSet, SqlCharSetName, SqlSortOrder, SqlSortOrderName, FilestreamShareName, FilestreamConfiguredLevel, FilestreamEffectiveLevel |
| CONNECTIONPROPERTY() | Unsupported properties include: local_net_address, client_net_address, physical_net_transport 						 |
| COLLATIONPROPERTY() | Collation properties are only implemented for the supported BBF collation types. |
| SESSIONPROPERTY() | Unsupported properties include: ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, NUMERIC_ROUNDABORT, QUOTED_IDENTIFIER |
| DDL trigger |  |
| LOGON trigger |  |
| EXECUTE with AS LOGIN or AT option |  |
| CREATE DATABASE options | All options except COLLATE and CONTAINMENT=NONE |
| ALTER DATABASE |  |
| Contained databases |  |
| Double-quoted strings |  |
| SET QUOTED_IDENTIFIER OFF |  |
| ODBC escape functions |  |
| Cross-database object references | 3 part object names |
| Remote object references | 4 part object names |
| Column name: IDENTITYCOL |  |
| Column name: $IDENTITY |  |
| Column name: $ROWGUID |  |
| WAITFOR DELAY |  |
| WAITFOR TIME |  |
| NEXT VALUE FOR sequence |  |
| BACKUP statement |  |
| RESTORE statement |  |
| KILL statement |  |
| SHUTDOWN statement |  |
| BEGIN DISTRIBUTED TRANSACTION |  |
| Using a transaction or savepoint name in a variable |  |
| Catalogs are partially supported | SYS.DATABASES, SYSDATABASES, SYS.SCHEMAS are supported |
| INFORMATION_SCHEMA catalogs |  |
| Stored procedures are partially supported | SP_HELPDB, SP_GETAPPLOCK, SP_RELEASEAPPLOCK are supported |
| SP_CONFIGURE |  |
| System functions are partially supported | FN_HELPCOLLATION is supported |
| GRANT |  |
| REVOKE |  |
| DENY |  |
| ALTER AUTHORIZATION |  |
| EXECUTE AS |  |
| REVERT |  |
| SETUSER |  |
| GROUP BY ALL |  |
| Bulk copy in and out |  |
| Any locale other than en-US |  |
| Service Broker functionality |  |
| CREATE ROLE | Both server and database level |
| ALTER ROLE | Both server and database level |
| Server-level roles other than sysadmin |  |
| Database-level roles other than db_owner |  |
| ALTER SCHEME |  |
| SYNONYM | All functionality related to this object type |
| QUEUE | All functionality related to this object type |
| AGGREGATE | All functionality related to this object type |
| APPLICATION ROLE | All functionality related to this object type |
| ASSEMBLY | All functionality related to this object type |
| ASYMMETRIC KEY | All functionality related to this object type |
| BULK INSERT |  |
| COLUMN ENCRYPTION KEY | All functionality related to this object type |
| COLUMN MASTER KEY | All functionality related to this object type |
| MASTER KEY | All functionality related to this object type |
| CERTIFICATE | All functionality related to this object type |
| CONTRACT | All functionality related to this object type |
| CREATE SCHEMA | With additional DDL statements |
| CREATE USER |  |
| CREDENTIAL | All functionality related to this object type |
| CRYPTOGRAPHIC PROVIDER | All functionality related to this object type |
| DEFAULT | All functionality related to this object type |
| DIAGNOSTIC SESSION | All functionality related to this object type |
| MESSAGE TYPE | All functionality related to this object type |
| QUEUE | All functionality related to this object type |
| ROUTE | All functionality related to this object type |
| RULE | All functionality related to this object type |
| SERVER ROLE | All functionality related to this object type |
| SERVICE | All functionality related to this object type |
| SERVICE MASTER KEY | All functionality related to this object type |
| SYMMETRIC KEY | All functionality related to this object type |
| UPDATE STATISTICS |  |
| USER | All functionality related to this object type |
| WORKLOAD GROUP | All functionality related to this object type |

The following is a list of functions that are not supported by Babelfish:

| MSSQL Function | Babelfish potential workaround |
| -------------- | ------------------------------ |
| [app_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/app-name-transact-sql.md) | `SELECT application_name FROM pg_stat_activity WHERE pid = pg_backend_pid();` |
| [approx_count_distinct](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/approx-count-distinct-transact-sql.md) | |
| [assemblyproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/assemblyproperty-transact-sql.md) | |
| [asymkey_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/asymkey-id-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) | 
| [asymkeyproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/asymkeyproperty-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [atn2](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/atn2-transact-sql.md) | atan2 |
| [cast_and_convert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cast-and-convert-transact-sql.md) | |
| [cert_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cert-id-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [certencoded](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certencoded-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [certprivatekey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certprivatekey-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [certproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certproperty-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html) at build time |
| [checksum_agg](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/checksum-agg-transact-sql.md) | |
| [col_length](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/col-name-transact-sql.md) | User Defined Function |
| [col_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/col-name-transact-sql.md) | `SELECT attname FROM pg_attribute WHERE attrelid = object_id('public.info') and attnum = 1` |
| [columnproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/columnproperty-transact-sql.md) | User defined function to match property names                               |
| [columns_updated](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/columns-updated-transact-sql.md) | SQL allows you to define aliases for the "old" and "new" rows or tables for use in the definition of the triggered action (e.g., CREATE TRIGGER ... ON tablename REFERENCING OLD ROW AS somename NEW ROW AS othername ...). More information [here](https://www.postgresql.org/docs/13/sql-createtrigger.html) | 
| [compress](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/compress-transact-sql.md) | [Gzip extension](https://pgxn.org/dist/gzip/?spm=a2c65.11461447.0.0.7ab13d3a2dbsHD) |
| [connections](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/connections-transact-sql.md) | Can only get active/idle connections with `SELECT count(*) FROM pg_stat_activity;` |
| [context_info](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/context-info-transact-sql.md) | |
| [cpu_busy](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cpu-busy-transact-sql.md) | |
| [crypt_gen_random](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/crypt-gen-random-transact-sql.md) | Use [gen_random_uuid()](https://www.postgresql.org/docs/13/pgcrypto.html#id-1.11.7.34.10) with [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [current_request_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-request-id-transact-sql.md) | |
| [current_timezone](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-timezone-transact-sql.md) | |
| [current_transaction_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-transaction-id-transact-sql.md) | |
| [database_principal_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/database-principal-id-transact-sql.md) | See [pg_database](https://www.postgresql.org/docs/13/catalog-pg-database.html), [pg_db_role_setting](https://www.postgresql.org/docs/13/catalog-pg-db-role-setting.html), [pg_roles](https://www.postgresql.org/docs/13/view-pg-roles.html) |
| [datediff_big](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datediff-big-transact-sql.md) | Need to create UDF similar to one in [this post](http://www.sqlines.com/postgresql/how-to/datediff) using DATE_PART |
| [datefirst](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datefirst-transact-sql.md) | `SELECT setting FROM pg_settings WHERE name = 'datefirst'` |
| [datetimeoffsetfromparts](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datetimeoffsetfromparts-transact-sql.md) | |
| [dbts](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/dbts-transact-sql.md) | Use txid_currrent() |
| [decompress](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decompress-transact-sql.md) | |
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
| [eomonth](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/eomonth-transact-sql.md) | |
| [eventdata](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/eventdata-transact-sql.md) | |
| [file_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/file-id-transact-sql.md) | |
| [file_idex](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/file-idex-transact-sql.md) | |
| [file_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/file-name-transact-sql.md) | |
| [filegroup_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filegroup-id-transact-sql.md) | |
| [filegroup_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filegroup-name-transact-sql.md) | | 
| [filegroupproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filegroupproperty-transact-sql.md) | |
| [fileproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/fileproperty-transact-sql.md) | |
| [filepropertyex](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/filepropertyex-transact-sql.md) | |
| [format](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/format-transact-sql.md) | Currently, there is no overrtide for the PF Format command so it behaves completely different than T-SQL. The [to_char function](https://www.postgresql.org/docs/13/functions-formatting.html) is the closest match to T-SQL format.) | |
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
