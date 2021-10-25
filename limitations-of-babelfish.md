---
layout: default
title: Limitations of Babelfish
nav_order: 2
has_children: false
permalink: /docs/limitations-of-babelfish
---

## T-SQL limitations

In this chapter, you will learn about Babelfish limitations and compatibility.
There is never going to be 100% compatibility between large database systems.
However, much can be done to stay as compatible as possible, which is definitely
true for Babelfish.

Let's dive in and figure out what works, and where challenges still lay ahead.

### Missing features

The following table contains a list of missing features. Note that the list of
limitations will change in the future as more features are added, new missing
features are discovered, and additional features are added to MS SQL:

| Functionality or Syntax | Notes |
| ----------------------- | ----- |
| `ADD SIGNATURE` | Functionality related to this command is not supported. |
| `CREATE AGGREGATE` | Functionality related to this command is not supported. |
| Aggregate functions | `APPROX_COUNT_DISTINCT`, `CHECKSUM_AGG`, `GROUPING_ID`, `ROWCOUNT_BIG`, `STDEV`, `STDEVP`, `VAR`, and `VARP` are not supported. |
| `ALTER` statement | You can\'t use an `ALTER` statement to modify the following objects: `AGGREGATE`, `APPLICATION ROLE`, `ASSEMBLY`, `ASYMMETRIC KEY`, `AUTHORIZATION`, `AVAILABILITY GROUP`, `BROKER PRIORITY`, `COLUMN ENCRYPTION KEY`, `CONTRACT`, `BACKUP CERTIFICATE`, `CREDENTIAL`, `TABLE ... IDENTITY`, `USER`, `CRYPTOGRAPHIC PROVIDER`, `DATABASE ENCRYPTION KEY`, `DATABASE AUDIT SPECIFICATION`, `DEFAULT`, `ENDPOINT`, `EXTERNAL FILE FORMAT`, `EVENT NOTIFICATION`, `EVENT SESSION`, `FULLTEXT CATALOG`, `FULLTEXT INDEX`, `FULLTEXT STOPLIST`, `INDEX`, `SPATIAL INDEX`, `XML INDEX`, `COLUMNSTORE INDEX`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `MASTER KEY`, `MESSAGE TYPE`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `PARTITION FUNCTION`, `PARTITION SCHEME`, `QUEUE`, `REMOTE SERVICE BINDING`, `RESOURCE POOL`, `EXTERNAL RESOURCE POOL`, `RESOURCE GOVERNOR`, `ROLE`, `ROUTE`, `RULE`, `SCHEMA`, `SEARCH PROPERTY LIST`, `SECURITY POLICY`, `SEARCH PROPERTY LIST`, `SERVER AUDIT`, `SERVER AUDIT SPECIFICATION`, `SERVER ROLE`, `SERVICE`, `SERVICE MASTER KEY`, `SYMMETRIC KEY`, `TABLE ... GRANT IDENTITY` clauses, `EXTERNAL TABLE`, `TRIGGER` (schema qualified), `TYPE`, `USER`, `WORKLOAD GROUP`, `WORKLOAD CLASSIFIER`, `SELECTIVE XML INDEX`, `XML SCHEMA COLLECTION` |
| `CREATE/ALTER/DROP APPLICATION ROLE` | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP ASSEMBLY` | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP ASYMMETRIC KEY` | Functionality related to this syntax is not supported. |
| Assembly modules and CLR routines | Functionality related to assembly modules and CLR routines is not supported. |
| `CREATE/ALTER/DROP AUTHORIZATION AVAILABILITY GROUP` | Functionality related to these commands. |
| `CREATE/ALTER/DROP` | Functionality related to these commands. |
| | |
| `BACKUP` statement | PostgreSQL snapshots of a database are dissimilar to backup files created in SQL Server. Also, the granularity of when a backup and restore occurs might be different between SQL Server and PostgreSQL. |
| `BEGIN DISTRIBUTEDi TRANSACTION` | Functionality related to this syntax is not supported |
| `CREATE/ALTER/DROP BROKER PRIORITY` | Functionality related to these command is |
| Bulk copy in and out | Functionality related to bulk copy is not supported |
| `BULK INSERT` | This syntax is not supported. |
| `CERTENCODED` function | This function is not supported. |
| `CERTID` function | This function is not supported. |
| `CERTPRIVATEKEY` function | This function is not supported. |
| `CERTPROPERTY` function | This function is not supported. |
| SQL keywords `CLUSTERED` and `NONCLUSTERED` for indexes and constraints | Babelfish accepts and ignores the `CLUSTERED` and `NONCLUSTERED` keywords. |
| Collation, index on type dependant on the ICU library | An index on a user-defined type that depends on the ICU collation library (the library used by Babelfish) will not be invalidated when the version of the library is changed. For more information about collations, [see](locales.html) |
| `COLLATIONPROPERTY` function | Collation properties are only implemented for the supported BBF collation types. For more information about collations [see](locales.html) |
| Column default | When creating a column default, the constraint name is ignored. To drop a column default, use the following syntax: `ALTER TABLE...ALTER COLUMN..DROP DEFAULT...` |
| Column name: `IDENTITYCOL` | This column name is not supported. |
| Column name: `$IDENTITY` | This column name is not supported. |
| Column name: `$ROWGUID` | This column name is not supported. |
| `COLUMNPROPERTY()` | This function is not supported. |
| Blank column names with no column alias  | The `sqlcmd` and `psql` utilities handle columns with blank names in different ways. SQL Server `sqlcmd` returns a blank column name  PostgreSQL `psql` returns a generated column name. |
| Column name case | Column names will be stored as lowercase in the PostgreSQL catalogs, and will be returned to the client in lowercase as well. This is also the case when column names are delimited by square brackets or double quotes. Likewise, column alias names in queries will always be returned as lowercase. In general, [all schema identifiers will be stored in lowercase in the PostgreSQL catalogs ](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS). |
| Virtual computed columns (non-persistent) | Will be created as persistent |
| Column attributes | `ROWGUIDCOL`, `SPARSE`, `FILESTREAM`, `MASKED` |
| `CREATE/ALTER/DROP COLUMN ENCRYPTION KEY` | Functionality related to these commands. |
| `COLUMN MASTER KEY` | Functionality related to this object type. |
| `COMPATIBILITY_LEVEL` | `ALTER DATABASE ... SET COMPATIBILITY LEVEL` is accepted and ignored |
| `sysdatabases.cmptlevel` | `sysdatabases.cmptlevel` will always be `NULL`. `ALTER DATABASE ... SET COMPATIBILITY LEVEL` is accepted and ignored. |
| `CREATE CONTRACT` | Functionality related to this command. |
| `CREATE/ALTER/DROP, BACKUP CERTIFICATE` | Functionality related to these commands. |
| `CONTRACT` | Functionality related to this object type. |
| `CONNECTIONPROPERTY()` function | The unsupported properties include: local_net_address, client_net_address, physical_net_transport. |
| Constraints | PostgreSQL doesn\'t support enabling and disabling individual constraints. The statement is ignored and a warning is raised.
| Constraints created with `DESC` (ascending) columns. | Constraints will be created with `ASC` (ascending) columns. |
| Constraints with `IGNORE_DUP_KEY` | Constraints will be created without this property |
| `BEGIN CONVERSATION TIME` | This syntax is not supported. |
| `END/MOVE CONVERSATION` | This syntax is not supported. |
| `GET CONVERSATION GROUP` | This syntax is not supported. |
| `CREATE/ALTER/DROP CREDENTIAL` | This syntax is not supported. |
| `ALTER DATABASE` | This syntax is not supported. |
| `ALTER DATABASE SCOPED CREDENTIAL` | This syntax is not supported. |
| `CREATE statement` | You can\'t use a `CREATE` statement to create the following object types: `AGGREGATE`, `APPLICATION ROLE`, `ASSEMBLY`, `ASYMMETRIC KEY`, `AUTHORIZATION`, `AVAILABILITY GROUP`, `BROKER`, `PRIORITY`, `COLUMN ENCRYPTION KEY`, `CONTRACT`, `BACKUP CERTIFICATE`, `CREDENTIAL`, `TABLE ...`, `IDENTITY`, `USER`, `CRYPTOGRAPHIC PROVIDER`, `DATABASE ENCRYPTION KEY`, `DATABASE AUDIT`, `SPECIFICATION`, `DEFAULT`, `ENDPOINT`, `EXTERNAL`, `FILE FORMAT`, `EVENT NOTIFICATION`, `EVENT`, `SESSION`, `FULLTEXT CATALOG`, `FULLTEXT INDEX`, `FULLTEXT STOPLIST`, `INDEX`, `SPATIAL INDEX`, `XML`, `INDEX`, `COLUMNSTORE INDEX`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `MASTER KEY`, `MESSAGE`, `TYPE`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `PARTITION FUNCTION`, `PARTITION SCHEME`, `QUEUE`, `REMOTE SERVICE BINDING`, `RESOURCE POOL`, `EXTERNAL RESOURCE POOL`, `RESOURCE GOVERNOR`, `ROLE`, `ROUTE`, `RULE`, `SCHEMA`, `SEARCH PROPERTY`, `LIST`, `SECURITY POLICY`, `SEARCH PROPERTY LIST`, `SERVER AUDIT`, `SERVER AUDIT SPECIFICATION`, `SERVER ROLE`, `SERVICE`, `SERVICE MASTER KEY`, `SYMMETRIC KEY`, `TABLE ... GRANT/IDENTITY` clauses, `EXTERNAL TABLE`, `TRIGGER` (schema qualified), `TYPE`, `USER`, `WORKLOAD GROUP`, `WORKLOAD CLASSIFIER`, `SELECTIVE XML INDEX`, `XML`, `SCHEMA COLLECTION`
| `CREATE DATABASE` keywords and clauses | Options except `COLLATE` and `CONTAINMENT=NONE` | are not supported. |
| CREDENTIAL | Functionality related to this object type is not supported. |
| Cross-database object referemce | Three part object names are not supported. |
| Remote object references | Four part object names are not supported. |
| `CRYPTOGRAPHIC PROVIDER` | Functionality related to this object type is not supported. |
| Cursors (updatable) | Functionality related to this object type is not supported. |
| Cursors (global) | `GLOBAL` cursors are not supported. |
| Cursor (fetch behaviors) | The following cursor behaviors are not supported: `FETCH PRIOR`, `FIRST`, `LAST`, `ABSOLUTE`, `RELATIVE` |
| Cursor-typed (variables and parameters) | cursor-typed variables and parameters are not supported |
| `CROSS APPLY` | Lateral joins are not supported. |
| `CREATE/ALTER/DROP CRYPTOGRAPHIC PROVIDER`| This syntax is not supported. |
| Cursor Options | `SCROLL`, `KEYSET`, `DYNAMIC`, `FAST_FORWARD`, `SCROLL_LOCKS`, `OPTIMISTIC`, `TYPE_WARNING`, `FOR UPDATE` |
| DBCC commands | DBCC commands are not supported. |
| `CREATE DATABASE` case-sensitive collation | Case-sensitive collations are not supported with the CREATE DATABASE statement. |
| `ALTER DATABASE/ALTER DATABASE SET` | Functionality related to these commands is not supported. |
| `CREATE/ALTER/DROP DATABASE ENCRYPTION KEY` | Functionality related to these commands is not supported.
| Contained databases | Contained databases with logins authenticated at the database level rather than at the server level are not supported. |
| `CREATE/ALTER/DROP DATABASE AUDIT SPECIFICATION` | Functionality related to this object type is not supported. |
| `CREATE/ALTER EXTERNAL DATA SOURCE` | Functionality related to this object type is not supported. |
| Datatype: `DATETIME` | Numeric representation and 3 millisecond rounding for `DATETIME` is not supported. |
| Datatype: `ROWVERSION` | This datatype is not supported. |
| Datatype: `NATIONAL CHARACTER` | This datatype is not supported. |
| `CREATE/DROP DEFAULT` | Functionality related to this object type is not supported. |
| `DENY` | This syntax is not supported. |
| `DIAGNOSTIC SESSION` | Functionality related to this object type is not supported. |
| `BEGIN DIALOG CONVERSATION` | This syntax is not supported. |
| `DROP` statements that drop multiple objects | This functionality is not supported. |
| `DROP IF EXISTS` | This syntax is not supported for `USER` and `SCHEMA` objects. It is supported for the following objects: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION, DATABASE`. |
| Data encryption | Data encryption is not supported. |
| Encryption | Built in functions and statements do not support encryption. |
| `ENCRYPT_CLIENT_CERT` connections | Client certificate connections are not supported. |
| `CREATE/ALTER/DROP ENDPOINT` | This syntax is not supported. |
| `EXECUTE AS` clause | This syntax is not supported. |
| `EXECUTE AS SELF` clause | Not supported in functions, procedures, or triggers |
| `CREATE ... EXECUTE AS OWNER` clause | `EXECUTE AS OWNER/CALLER` is supported for permission, but not for name resolution |
| `EXECUTE AS USE` clause | This clause is not supported in functions, procedures, or triggers. |
| `EXECUTE with AS LOGIN` or `AT` option | This syntax is not supported. |
| Using `EXECUTE` to call | This syntax is not supported. |
| `EVENTDATA` function | This function is not supported. |
| `CREATE/DROP EVENT NOTIFICATION` | |
| `CREATE/ALTER/DROP EVENT SESSION` | Functionality related to this syntax is not supported. |
| `CREATE EXTERNAL FILE FORMAT` | This syntax is not supported. |
| SQL keyword clause `ON filegroup` | Currently ignored. |
| Foreign Key constraints referencing database name | Foreign Key constraints that reference the database name are not supported. |
| `CREATE/ALTER/DROP FULLTEXT CATALOG` | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP FULLTEXT INDEX`| Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP FULLTEXT STOPLIST` | Functionality related to this syntax is not supported. |
| Full-text Search | Search with a gist index is not supported. |
| Full-text Search | Full-text search built-in functions and statements are not supported. |
| `ALTER FUNCTION` | This syntax is not supported. |
| Function declarations with \> 100 parameters | Function declarations that contain more than  100 parameters are not supported. |
| Function calls that | DEFAULT is not a supported parameter value | `DEFAULT` is not a supported parameter value for a function call. |
| Function calls that include :: | Function calls that include :: are not supported. |
| Functions, externally defined | Including SQL Common Language Runtime (CLR) |
| `GEOMETRY` | Datatype and all associated functionality is not supported. |
| `GEOGRAPHY` | Datatype and all associated functionality is not supported. |
| `GET_TRANSMISSION_STATUS` | This function is not supported. |
| Graph functionality | All SQL graph functionality is not supported |
| `GRANT` | This command is not supported. |
| `GROUP BY ALL` clause | This syntax is not supported. |
| `GROUP BY ROLLUP` clause | This syntax is not supported. |
| `GROUP BY CUBE` clause | This syntax is not supported. |
| `ALTER DATABASE SET HADR`| This syntax is not supported. |
| `HASHBYTES()` function | The only supported algorithms are: MD5, SHA1, and SHA256 |
| `HIERARCHYID` | The datatype and methods are not supported. |
| Hints | Hints are not supported for joins, queries, or tables. |
| `INFORMATION_SCHEMA` catalog | Information schema views are not supported. |
| Identifiers exceeding 63 characters | PostgreSQL supports a maximum of 63 characters for identifiers. Babelfish converts identifiers longer than 63 characters to a name that uses a hash of the original name. Use the original name with T-SQL, but the converted name if accessing the database on the PostgreSQL listener port (5432). |
| Identifiers with leading dot characters | Identifiers that start with a `.` are not supported. |
| Identifiers (variables/parameters) with multiple leading @ characters | Identifiers that start with more than one leading `@` are not supported. |
| Identifiers: table or column names that contain @ or \]\] characters | Table or column names that contain an `@` sign or square-brackets are not supported. |
| Identifiers with multiple `@` characters | Babelfish does not support system-defined `@@variables` other than: `@@VERSION`, `@@SPID`, `@@ROWCOUNT`, `@@TRANCOUNT`, `@@IDENTITY`, `@@ERROR`, `@@FETCH_STATUS`, `@@MAX_PRECISION`, `@@SERVERNAME`, `@@DATEFIRST` |
| `IDENTITY` columns support | `IDENTITY` columns are supported for data types `tinyint`, `smallint`, `int`, `bigint`, `numeric`, and `decimal`. SQL Server supports precision up to 38 for data types `numeric` and `decimal` in `IDENTITY` columns. PostgreSQL supports precision up to 19 for data types `numeric` and `decimal` in `IDENTITY` columns. |
| Indexes with `IGNORE_DUP_KEY` | Syntax that creates an index that includes `IGNORE_DUP_KEY` will create an index as if this property was omitted. |
| Indexes with more than 32 columns | An index may not include more than 32 columns; \'included\' index columns count towards the maximum in PostgreSQL, but not in SQL Server. |
| Inline indexes | Inline indexes are not supported. |
| Indexes (clustered) | Clustered indexes are created as if `NONCLUSTERED` was specified. |
| Indexed views | Functionality related to this object type is not supported. |
| `CREATE COLUMNSTORE INDEX` | This syntax is not supported. |
| `CREATE/ALTER/DROP INDEX` | This syntax is not supported. |
| `CREATE/ALTER/DROP SPATIAL INDEX` | This syntax is not supported. |
| `CREATE/ALTER/DROP XML INDEX` | This syntax is not supported. |
| Index clauses | The following clauses are ignored: | `FILLFACTOR`, `ALLOW_PAGE_LOCKS`, `ALLOW_ROW_LOCKS`, `PAD_INDEX`, `STATISTICS_NORECOMPUTE`, `OPTIMIZE_FOR_SEQUENTIAL_KEY`, `SORT_IN_TEMPDB`, `DROP_EXISTING`, `ONLINE`, `COMPRESSION_DELAY`, `MAXDOP`, `DATA_COMPRESSION` |
| `INSERT ... TOP` | This syntax is not supported. |
| `INSERT ... DEFAULT VALUES` | This syntax is not supported. |
| JSON | Datatypes, Built-in Functions, and statements are unsupported. |
| `KILL` | This syntax is not supported. |
| `CREATE/ALTER/DROP EXTERNAL LANGUAGE` | This syntax is not supported. |
| `CREATE/ALTER/DROP EXTERNAL LIBRARY` | Functionality related to this object type |
| `CREATE/ALTER LOGIN` clauses are supported with limited syntax | The `CREATE LOGIN ... PASSWORD` clause, `...DEFAULT_DATABASE` clause, and `...DEFAULT_LANGUAGE` clause are supported. The `ALTER LOGIN ... PASSWORD` clause is supported, but `ALTER LOGIN ... OLD_PASSWORD` clause is not supported. Only a sysadmin login user can modify a password. |
| `LOGIN` objects | All options for `LOGIN` objects except: `PASSWORD`, `DEFAULT_DATABASE`, `ENABLE`, `DISABLE` |
| `LOGINPROPERTY()` function | This function is not supported. |
| `CREATE/ALTER/DROP OPEN/CLOSE, BACKUP/RESTORE MASTER KEY`, | Functionality related to this syntax is not supported |
| Materialized Views | Materialized views are not supported. |
| `CREATE/ALTER/DROP MESSAGE TYPE`| This syntax is not supported. |
| `NEWSEQUENTIALID()` function | Implemented as NEWID(); sequential behavior is not supported. |
| `MERGE` | This syntax is not supported. |
| `NEWSEQUENTIALID()` function | When calling `NEWSEQUENTIALID()`, PostgreSQL can\'t guarantee a higher GUID value so it will just generate a new GUID value, just like `NEWID()` does. |
| `NEXT VALUE FOR` sequence clause | This syntax is not supported. |
| `NOT FOR REPLICATION clause` | This syntax is accepted and ignored. |
| `SET NUMERIC_ROUNDABORT ON` | This setting is not supported. |
| `OBJECTPROPERTY()` | This function is not supported. |
| `OBJECTPROPERTYEX()` | This function is not supported. |
| ODBC escape functions | ODBC escape functions are not supported. |
| `OUTER APPLY` | Lateral joins are not supported. |
| Procedure or function parameter limit | PostgreSQL supports a maximum of 100 parameters for a procedure or function. |
| Partitioning | Table and index partitioning is not supported. |
| `CREATE/ALTER/DROP PARTITION FUNCTION` | This syntax is not supported. |
| `CREATE/ALTER/DROP PARTITION SCHEME` | This syntax is not supported. |
| `ALTER PROCEDURE` statement | This syntax is not supported. |
| Procedures `WITH RECOMPILE` | `WITH RECOMPILE` (when used in conjunction with the DECLARE and EXECUTE statements) is not supported. |
| Procedure declarations with more than 100 parameters | Declarations with more than 100 parameters are not supported |
| Procedure calls that includes `DEFAULT` as a parameter value | `DEFAULT` is not a supported parameter value. |
| Procedures, externally defined | Externally defined procedures (including SQL Common Language Runtime (CLR)) are not supported |
| Invoking a procedure whose name is in a variable | Using a variable as a procedure name is not supported |
| Procedure versioning | Procedure versioning is not supported. |
| `CREATE/ALTER/DROP QUEUE`| Functionality related to this syntax is not supported. |
| `READTEXT` | This syntax is not supported. |
| Remote object access | Remote object access (including tables, views, and procedures) is not supported. |
| `CREATE/ALTER/DROP REMOTE SERVICE BINDING` | Functionality related to this object type |
| `CREATE/ALTER/DROP RESOURCE POOL` | This syntax is not supported. |
| `CREATE/ALTER/DROP EXTERNAL RESOURCE POOL` | Functionality related to this syntax is not supported |
| `CREATE/ALTER/DROP RESOURCE GOVERNOR` | Functionality related to this syntax is not supported |
| `RESTORE` statement | PostgreSQL snapshots of a database are dissimilar to backup files created in SQL Server. Also, there may be differences between SQL Server and PostgreSQL in the granularity of when the backup and restore occurs. |
| `REVERT` | This syntax is not supported. |
| `REVOKE` | This syntax is not supported. |
| `CREATE/ALTER/DROP ROLE` | This syntax is not supported. |
| Roles: Server-level roles other than sysadmin | Server-level roles (other than sysadmin) are not supported |
| Roles: Database-level roles other than db_owner | Database-level roles other than db_owner are not supported. |
| db_owner | |
| `ROLLBACK`: table variables do not support transactional rollback | Processing may be interrupted if a rollback occurs in a session with table variables. |
| `CREATE/ALTER/DROP ROUTE` | Functionality related to this syntax is not supported. |
| `ROWGUIDCOL` | Currently ignored. Queries referencing `$GUIDGOL` will cause a syntax error. |
| Row-level security | Row-level security with `CREATE SECURITY POLICY` and inline table-valued functions is currently not supported. |
| `ROWSET` functions | The following ROWSET functions are not supported: `OPENXML()`, `OPENJSON()`, `OPENROWSET()`, `OPENQUERY()`, `OPENDATASOURCE()` |
| `ROWVERSION` | This datatype is not supported. |
| `CREATE/DROP RULE` | Functionality related to this syntax is not supported. |
| `ALTER DATABASE SCOPED CONFIGURATION` | This syntax is not supported. |
| `ALTER SCHEMA` | This syntax is not supported. |
| `CREATE SCHEMA ...` supporting clause | You can use the `CREATE SCHEMA` command to create an empty schema. Use later commands to create schema objects. |
| `CREATE/ALTER/DROP SECURITY POLICY` | This syntax is not supported. |
| `CREATE/ALTER/DROP SEARCH PROPERTY LIST` | This syntax is not supported. |
| `SEQUENCE` object support | `SEQUENCE` objects are supported for data support | types `tinyint`, `smallint`, `int`, `bigint`, `numeric`, and `decimal`. PostgreSQL supports precision to 19 places for data types `numeric` and `decimal` in a `SEQUENCE`. |
| `CREATE/ALTER/DROP SERVER AUDIT` | Functionality related to this object type |
| `CREATE/ALTER/DROP SERVER AUDIT SPECIFICATION` | Functionality related to this object type |
| `SELECT PIVOT/UNPIVOT` | This syntax is not supported. |
| `SELECT TOP x PERCENT WHERE x \< or \> 100` | This syntax is not supported. |
| `SELECT TOP ... WITH TIES` | This syntax is not supported. |
| `SELECT ... FOR XML PATH, ELEMENTS` | Supported without the `ELEMENTS` clause |
| `SELECT ... FOR XML  RAW, ELEMENTS` | Supported without the `ELEMENTS` clause |
| `SEND` | This syntax is not supported. |
| `ALTER SERVER CONFIGURATION` | This syntax is not supported. |
| `SERVERPROPERTY()` | Unsupported properties: BuildClrVersion, ComparisonStyle, ComputerNamePhysicalNetBIOS, EditionID, EngineEdition, HadrManagerStatus, InstanceDefaultDataPath, InstanceDefaultLogPath, InstanceName, IsAdvancedAnalyticsInstalled, IsBigDataCluster, IsClustered, IsFullTextInstalled, IsHadrEnabled, IsIntegratedSecurityOnly, IsLocalDB, IsPolyBaseInstalled, IsXTPSupported, LCID, LicenseType, MachineName, NumLicenses, ProcessID, ProductBuild, ProductBuildType, ProductLevel, ProductMajorVersion, ProductMinorVersion, ProductUpdateLevel, ProductUpdateReference, ProductVersion, ResourceLastUpdateDateTime, ResourceVersion, ServerName, SqlCharSet, SqlCharSetName, SqlSortOrder, SqlSortOrderName, FilestreamShareName, FilestreamConfiguredLevel, FilestreamEffectiveLevel |
| `CREATE/ALTER/DROP SERVER ROLE` | Functionality related to this syntax is not supported |
| `CREATE/ALTER/DROP SERVICE` | Functionality related to this syntax is not supported |
| `ALTER SERVICE, BACKUP/RESTORE SERVICE MASTER KEY` clause | Functionality related to this syntax is not supported. |
| `SESSIONPROPERTY()` | Unsupported properties: `ANSI_NULLS`, `ANSI_PADDING`, `ANSI_WARNINGS`, `ARITHABORT`, `CONCAT_NULL_YIELDS_NULL`, `NUMERIC_ROUNDABORT` |
| Service Broker functionality | Service Broker functionality is not supported. |
| `SERVICE MASTER KEY` | Functionality related to this object type is not supported. |
| `SET ANSI_NULL_DFLT_OFF ON` | This setting is not supported. |
| `SET ANSI_NULL_DFLT_ON OFF` | This setting is not supported. |
| `SET ANSI_PADDING OFF` | This setting is not supported. |
| `SET ANSI_WARNINGS OFF` | This setting is not supported. |
| `SET ARITHABORT OFF` | This setting is not supported. |
| `SET ARITHIGNORE ON` | This setting is not supported. |
| `SET CONTEXT_INFO` | This syntax is not supported. |
| `SET CURSOR_CLOSE_ON_COMMIT ON` | This setting is not supported. |
| `SET DATEFORMAT` | This syntax is not supported. |
| `SET DEADLOCK_PRIORITY` | This syntax is not supported. |
| `SET FORCEPLAN` | This syntax is not supported. |
| `SET FMTONLY` | This syntax is not supported. |
| `SET LANGUAGE` | This syntax is not supported with any value other than `english` or `us_english`. |
| `SET LOCK_TIMEOUT` | This syntax is not supported. |
| `SET NUMERIC_ROUNDABORT ON` | This syntax is not supported. |
| `SET REMOTE_PROC_TRANSACTIONS` | This syntax is not supported. |
| `SET ROWCOUNT n WHERE n != 0` | This syntax is not supported. |
| `SET ROWCOUNT @variable` | This syntax is not supported. |
| `SET SHOWPLAN_ALL` | This syntax is not supported. |
| `SET SHOWPLAN_TEXT` | This syntax is not supported. |
| `SET SHOWPLAN_XML` | This syntax is not supported. |
| `SET STATISTICS` | This syntax is not supported. |
| `SET STATISTICS IO` | This syntax is not supported. |
| `SET STATISTICS PROFILE` | This syntax is not supported. |
| `SET STATISTICS TIME` | This syntax is not supported. |
| `SET STATISTICS XML` | This syntax is not supported. |
| `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ` | This syntax is not supported. |
| `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE` | This syntax is not supported. |
| `SET OFFSETS` | This syntax is not supported. |
| `SETUSER` statements | `SETUSER` statements are not supported. |
| `SHUTDOWN` statement | This syntax is not supported. |
| `SP_CONFIGURE` | This syntax is not supported. |
| SQL keyword `SPARSE` | The keyword SPARSE (related to SQL Server-specific aspects of data storage) is accepted and ignored. |
| System-provided stored procedures are partially supported | `SP_HELPDB`, `SP_GETAPPLOCK`, `SP_RELEASEAPPLOCK` are supported. All other stored procedures are not supported. |
| Unquoted string values in stored procedure calls and default values | String value calls to stored procedures and default values must be enclosed in single-quotes. |
| `SYNONYM` | Functionality related to this object type is not supported. |
| `CREATE/ALTER/DROP, OPEN/CLOSE SYMMETRIC KEY` | Functionality related to this object type is not supported. |
| `CREATE TABLE ... GRANT` clause | Functionality related to this syntax is not supported. |
| `CREATE TABLE ... IDENTITY` clause | Functionality related to this syntax is not supported. |
| `CREATE EXTERNAL TABLE` | Functionality related to this syntax is not supported. |
| Table value constructor syntax (`FROM` clause) | The unsupported syntax is for a derived table constructed with the `FROM` clause. |
| tempdb is not reinitialized at restart | Permanent objects (like tables and procedures) created in tempdb are not removed when the database is restarted. |
| Time precision | Babelfish supports 6-digit precision for fractional seconds. Babelfish doesn\'t perform SQL Server 3-millisecond rounding. No adverse effects are anticipated with this behavior. |
| `TIMESTAMP` | SQL Server\'s `TIMESTAMP` is unrelated to PostgreSQL `TIMESTAMP`. |
| `TYPEPROPERTY()` function | This function is not supported. |
| Global temporary tables (tables with names that start with `##`) | Global temporary tables are not supported. |
| Temporary procedures are not dropped automatically | This functionality is not supported. |
| Temporal tables | Temporal tables are not supported. |
| `TEXTIMAGE_ON filegroup` | Babelfish ignores the `TEXTIMAGE_ON` filegroup clause. |
| Transaction isolation levels | `READUNCOMMITTED` is treated the same as `READCOMMITTED`. `REPEATABLEREAD`, `SERIALIZABLE`, and `SNAPSHOT` are not supported. |
| `ALTER TRIGGER` | |
| `CREATE TRIGGER` (schema qualified) | Schema qualified trigger names are not supported. |
| `ENABLE/DISABLE TRIGGER` | This syntax is not supported. |
| DDL trigger | DDL triggers are not supported. |
| `LOGON` trigger | `LOGON` triggers are not supported. |
| Triggers, externally defined | Including SQL Common Language Runtime (CLR) |
| `INSTEAD_OF` Triggers | `INSTEAD_OF` triggers are not supported. |
| Trigger for multiple DML actions cannot reference transition tables  | Triggers that reference multiple DML actions cannot reference transition tables. |
| `CREATE/ALTER/DROP TYPE` | This syntax is not supported. |
| `SELECT ... FOR XML AUTO` | This syntax is not supported. |
| `SELECT ... FOR XML EXPLICIT` | This syntax is not supported. |
| `UPDATE STATISTICS` | This syntax is not supported. |
| `CREATE USER` | This syntax is not supported. The PostgreSQL statement, `CREATE USER` does not create a user that is equivalent to the SQL Server `CREATE USER` syntax. |
| `UPDATETEXT` | This syntax is not supported. |
| `USER` | Functionality related to this object type is not supported. |
| Variable | Using a transaction or savepoint name in a variable is not supported. |
| `ALTER VIEW` | This syntax is not supported. |
| `VIEW ... VIEW_METADATA` clause | This syntax is not supported. |
| `VIEW ... CHECK OPTION` clause | This syntax is not supported. |
| `@@version` | The value returned by `@@version` is slightly different from the value returned by SQL Server. Your code might not work correctly if it depends on the formatting of `@@version`. |
| `WAITFOR DELAY` | This syntax is not supported. |
| `WAITFOR/RECEIVE` | This syntax is not supported. |
| `WAITFOR TIME` | This syntax is not supported. |
| `WITH ENCRYPTION` clause | This syntax is not supported for functions, procedures, triggers, or views. |
| `CREATE/ALTER/DROP WORKLOAD CLASSIFIER` | Functionality related to this syntax is not supported |
| `CREATE/DROP WORKLOAD CLASSIFIER` | This syntax is not supported. |
| `WRITETEXT` | This syntax is not supported. |
| `OPENXML()` | This function is not supported. |
| XML datatype with schema (xmlschema) | XML type without schema is supported |
| XML methods | This includes .VALUES(), .NODES(), and other methods |
| XML indexes | XML indexes are not supported. |
| XPATH expressions | This syntax is not supported. |
| WITH XMLNAMESPACES construct | This syntax is not supported. |
| `WITHOUT SCHEMABINDING` clause | Not supported in functions, procedures, triggers, or views. The object will be created, but as if `WITH SCHEMABINDING` was specified. |
| `CREATE/ALTER/DROP SELECTIVE XML INDEX` clause | This syntax is not supported. |
| `CREATE/ALTER/DROP XML SCHEMA COLLECTION` | This syntax is not supported. |

However, more is missing than just features. In some case there are also some
corner cases which will provide the end user with a [different
behavior](/docs/architecture/missing-features) than otherwise expected from MS SQL. It is
important to understand those corner cases, as well.

### Unsupported functions 

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
