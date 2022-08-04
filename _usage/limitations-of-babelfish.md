---
layout: default
title: Differences between Babelfish and SQL Server 
nav_order: 3
---

## Differences between Babelfish and SQL Server

In this chapter, you will learn about functional differences between PostgreSQL with Babelfish
and SQL Server.

The following table contains a list of SQL Server features that are currently
not implemented or partially implemented in Babelfish.  This list is subject to change.

| Functionality or Syntax | Version 1.2.0 Updates | Version 2.1.0 Updates | Previous Behavior |
| ----------------------- | --------------------- | --------------------- | ----------------- |
| `ADD SIGNATURE` | | | Functionality related to this command is not supported. |
| `Built-in Functions` | Version 1.2.0 supports COLUMNS_UPDATED(), UPDATE(), FULLTEXTSERVICEPROPERTY(), ISJSON(), JSON_QUERY(), JSON_VALUE(), HAS_DBACCESS(), SUSER_SID(), SUSER_SNAME(), IS_SRVROLEMEMBER() | Version 2.1.0 adds support for IS_MEMBER(), IS_ROLEMEMBER(), HAS_PERMS_BY_NAME() | In previous versions, Built-in functions are partially supported: `SQUARE()`, `CONCAT_WS()`, `DATEFROMPARTS()`, `DATETIMEFROMPARTS()`, `ORIGINAL_LOGIN()`, `SESSION_USER()`, `CHOOSE()`, `CURSOR_STATUS()`; `TRIGGER_NESTLEVEL()` is supported but only without arguments; `SCHEMA_NAME()` is fully supported. |
| `CREATE AGGREGATE` | | | Functionality related to this command is not supported. |
| Aggregate functions | | | `APPROX_COUNT_DISTINCT`, `CHECKSUM_AGG`, `GROUPING_ID`, `ROWCOUNT_BIG`, `STDEV`, `STDEVP`, `VAR`, and `VARP` are not supported. |
| `ALTER` statement | | | You can't use an `ALTER` statement to modify the following objects: `AGGREGATE`, `APPLICATION ROLE`, `ASSEMBLY`, `ASYMMETRIC KEY`, `AUTHORIZATION`, `AVAILABILITY GROUP`, `BROKER PRIORITY`, `COLUMN ENCRYPTION KEY`, `CONTRACT`, `BACKUP CERTIFICATE`, `CREDENTIAL`, `TABLE ... IDENTITY`, `USER`, `CRYPTOGRAPHIC PROVIDER`, `DATABASE ENCRYPTION KEY`, `DATABASE AUDIT SPECIFICATION`, `DEFAULT`, `ENDPOINT`, `EXTERNAL FILE FORMAT`, `EVENT NOTIFICATION`, `EVENT SESSION`, `FULLTEXT CATALOG`, `FULLTEXT INDEX`, `FULLTEXT STOPLIST`, `INDEX`, `SPATIAL INDEX`, `XML INDEX`, `COLUMNSTORE INDEX`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `MASTER KEY`, `MESSAGE TYPE`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `PARTITION FUNCTION`, `PARTITION SCHEME`, `QUEUE`, `REMOTE SERVICE BINDING`, `RESOURCE POOL`, `EXTERNAL RESOURCE POOL`, `RESOURCE GOVERNOR`, `ROLE`, `ROUTE`, `RULE`, `SCHEMA`, `SEARCH PROPERTY LIST`, `SECURITY POLICY`, `SEARCH PROPERTY LIST`, `SERVER AUDIT`, `SERVER AUDIT SPECIFICATION`, `SERVER ROLE`, `SERVICE`, `SERVICE MASTER KEY`, `SYMMETRIC KEY`, `TABLE ... GRANT IDENTITY` clauses, `EXTERNAL TABLE`, `TRIGGER` (schema qualified), `TYPE`, `USER`, `WORKLOAD GROUP`, `WORKLOAD CLASSIFIER`, `SELECTIVE XML INDEX`, `XML SCHEMA COLLECTION` |
| `CREATE/ALTER/DROP APPLICATION ROLE` | | | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP ASSEMBLY` | | | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP ASYMMETRIC KEY` | | | Functionality related to this syntax is not supported. |
| Assembly modules and CLR routines | | | Functionality related to assembly modules and CLR routines is not supported. |
| `CREATE/ALTER/DROP AUTHORIZATION` | | | Functionality related to these commands is not supported. |
| `CREATE/ALTER/DROP AVAILABILITY GROUP` | | | Functionality related to these commands is not supported. |
| `BACKUP` statement | | | This command is not supported.  You will have to backup the database using PostgreSQL techniques. |
| `BEGIN DISTRIBUTED TRANSACTION` | | | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP BROKER PRIORITY` | | | Functionality related to these command is not supported. |
| Bulk copy in and out | | | Functionality related to bulk copy is not supported. |
| `BULK INSERT` | | | This syntax is not supported. |
| `CERTENCODED` function | | | This function is not supported. |
| `CERTID` function | | | This function is not supported. |
| `CERTPRIVATEKEY` function | | | This function is not supported. |
| `CERTPROPERTY` function | | | This function is not supported. |
| SQL keywords `CLUSTERED` and `NONCLUSTERED` for indexes and constraints | | | Babelfish accepts and ignores the `CLUSTERED` and `NONCLUSTERED` keywords. |
| Collation, index on type dependent on the ICU library | | | An index on a user-defined type that depends on the ICU collation library (the library used by Babelfish) will not be invalidated when the version of the library is changed. For more information about collations, [see the locale documentation](/docs/usage/locales). |
| `COLLATIONPROPERTY` function | | | Collation properties are only implemented for the supported BBF collation types. For more information about collations [see the locale documentation](/docs/usage/locales). |
| Column default | | | When creating a column default, the constraint name is ignored. To drop a column default, use the following syntax: `ALTER TABLE...ALTER COLUMN..DROP DEFAULT...`. `ALTER TABLE...ALTER COLUMN`, `NULL` and `NOT NULL` cannot currently be specified. To change the nullability of a column, you must currently use the PostgreSQL SQL statement `ALTER TABLE..{SET|DROP} NOT NULL`. |
| Column name: `IDENTITYCOL` | | | This column name is not supported. |
| Column name: `$IDENTITY` | | | This column name is not supported. |
| Column name: `$ROWGUID` | | | This column name is not supported. |
| `COLUMNPROPERTY()` | | | This function is supported only for CharMaxLen and AllowsNull. |
| Column without alias in result sets  | | | SQL Server and Babelfish handle result set columns without aliases in different ways. SQL Server returns a blank column name, while Babelfish returns a generated column name. |
| Column name case | | | Column names will be stored as lowercase in the PostgreSQL `pg_attribute` catalog, but are stored in whatever case was specified in the `CREATE TABLE` statement in an internal Babelfish catalog. The `SELECT *` operation currently returns column names in lower case rather than in the case specified on the CREATE TABLE statement. This will be fixed in a future version of Babelfish, but until then a workaround is to either specify the columns explicitly in the `SELECT` statement, or to use `SELECT *` from a view.|
| Virtual computed columns (non-persistent) | | | The columns will be created as persistent. |
| Column attributes | | | `ROWGUIDCOL`, `SPARSE`, `FILESTREAM`, `MASKED` aren't supported. |
| `CREATE/ALTER/DROP COLUMN ENCRYPTION KEY` | | | Functionality related to these commands is not supported. |
| `COLUMN MASTER KEY` | | | Functionality related to this object type is not supported. |
| `COMPATIBILITY_LEVEL` | | | `ALTER DATABASE ... SET COMPATIBILITY LEVEL` is accepted and ignored. |
| `sysdatabases.cmptlevel` | | | `sysdatabases.cmptlevel` will always be `NULL`. `ALTER DATABASE ... SET COMPATIBILITY LEVEL` is accepted and ignored. |
| `CREATE CONTRACT` | | | Functionality related to this command is not supported. |
| `CREATE/ALTER/DROP, BACKUP CERTIFICATE` | | | Functionality related to these commands is not supported. |
| `CONTRACT` | | | Functionality related to this object type is not supported. |
| `CONNECTIONPROPERTY()` function | | | Version 1.2.0 supports CONNECTIONPROPERTY() properties physical_net_transport and client_net_address | Prior versions do not support: `local_net_address`, `client_net_address`, `physical_net_transport`. |
| Constraints | | | PostgreSQL doesn't support enabling and disabling individual constraints. The statement is ignored and a warning is raised. |
| Constraints created with `DESC` (descending) columns. | | | Constraints will be created with `ASC` (ascending) columns. |
| Constraints with `IGNORE_DUP_KEY` | | | Constraints will be created without this property. |
| `BEGIN CONVERSATION TIME` | | | This syntax is not supported. |
| `END/MOVE CONVERSATION` | | | This syntax is not supported. |
| `GET CONVERSATION GROUP` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP CREDENTIAL` | | | This syntax is not supported. |
| `ALTER DATABASE` | | | This syntax is not supported. |
| `ALTER DATABASE SCOPED CREDENTIAL` | | | This syntax is not supported. |
| `CREATE statement` | | | You can't use a `CREATE` statement to create the following object types: `AGGREGATE`, `APPLICATION ROLE`, `ASSEMBLY`, `ASYMMETRIC KEY`, `AUTHORIZATION`, `AVAILABILITY GROUP`, `BROKER`, `PRIORITY`, `COLUMN ENCRYPTION KEY`, `CONTRACT`, `BACKUP CERTIFICATE`, `CREDENTIAL`, `TABLE ...`, `IDENTITY`, `USER`, `CRYPTOGRAPHIC PROVIDER`, `DATABASE ENCRYPTION KEY`, `DATABASE AUDIT`, `SPECIFICATION`, `DEFAULT`, `ENDPOINT`, `EXTERNAL`, `FILE FORMAT`, `EVENT NOTIFICATION`, `EVENT`, `SESSION`, `FULLTEXT CATALOG`, `FULLTEXT INDEX`, `FULLTEXT STOPLIST`, `INDEX`, `SPATIAL INDEX`, `XML`, `INDEX`, `COLUMNSTORE INDEX`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `MASTER KEY`, `MESSAGE`, `TYPE`, `EXTERNAL LANGUAGE`, `EXTERNAL LIBRARY`, `LOGIN`, `PARTITION FUNCTION`, `PARTITION SCHEME`, `QUEUE`, `REMOTE SERVICE BINDING`, `RESOURCE POOL`, `EXTERNAL RESOURCE POOL`, `RESOURCE GOVERNOR`, `ROLE`, `ROUTE`, `RULE`, `SCHEMA`, `SEARCH PROPERTY`, `LIST`, `SECURITY POLICY`, `SEARCH PROPERTY LIST`, `SERVER AUDIT`, `SERVER AUDIT SPECIFICATION`, `SERVER ROLE`, `SERVICE`, `SERVICE MASTER KEY`, `SYMMETRIC KEY`, `TABLE ... GRANT/IDENTITY` clauses, `EXTERNAL TABLE`, `TRIGGER` (schema qualified), `TYPE`, `USER`, `WORKLOAD GROUP`, `WORKLOAD CLASSIFIER`, `SELECTIVE XML INDEX`, `XML`, `SCHEMA COLLECTION`
| `CREATE DATABASE` keywords and clauses | | | Options except `COLLATE` and `CONTAINMENT=NONE` are not supported. |
| CREDENTIAL | | | Functionality related to this object type is not supported. |
| Cross-database object reference | | Version 2.1.0 adds support for cross-database references outside the current database with a 3-part object name, for `SELECT`, `SELECT..INTO`, `INSERT`, `UPDATE`, `DELETE`| Three-part object names are only supported if they refer to the current database. |
| Remote object references | | | Four-part object names are not supported. |
| `CRYPTOGRAPHIC PROVIDER` | | | Functionality related to this object type is not supported. |
| Cursors (updatable) | | | Functionality related to this object type is not supported. |
| Cursors (global) | | | `GLOBAL` cursors are not supported. |
| Cursor (fetch behaviors) | | | The following cursor behaviors are not supported: `FETCH PRIOR`, `FIRST`, `LAST`, `ABSOLUTE`, `RELATIVE` |
| Cursor-typed (variables and parameters) | | | Cursor-typed parameters are supported when the parameter is used as an input parameter, but not when used as an output parameter (an error is raised). |
| `CROSS APPLY` | | | Lateral joins are not supported. |
| `CREATE/ALTER/DROP CRYPTOGRAPHIC PROVIDER` | | | This syntax is not supported. |
| Cursor Options | | | `SCROLL`, `KEYSET`, `DYNAMIC`, `FAST_FORWARD`, `SCROLL_LOCKS`, `OPTIMISTIC`, `TYPE_WARNING`, `FOR UPDATE` are not supported. |
| DBCC commands | | | DBCC commands are not supported. |
| `CREATE DATABASE` case-sensitive collation | | | Case-sensitive collations are not supported with the `CREATE DATABASE` statement. |
| `ALTER DATABASE/ALTER DATABASE SET` | | | Functionality related to these commands is not supported. |
| `CREATE/ALTER/DROP DATABASE ENCRYPTION KEY` | | | Functionality related to these commands is not supported.
| Contained databases | | | Contained databases with logins authenticated at the database level rather than at the server level are not supported. |
| `CREATE/ALTER/DROP DATABASE AUDIT SPECIFICATION` | | | Functionality related to this object type is not supported. |
| `CREATE/ALTER EXTERNAL DATA SOURCE` | | | Functionality related to this object type is not supported. |
| Datatype: `ROWVERSION` | Babelfish v.1.2.0 has implemented the ROWVERSION datatype (as an alias). To use ROWVERSION, you must set babelfishpg_tsql.escape_hatch_rowversion to ignore (the default is strict). The Babelfish implementation of ROWVERSION is semantically similar to SQL Server, except that in SQL Server, each inserted or updated row gets a unique ROWVERSION value. In Babelfish, the assigned ROWVERSION value is the same for all rows inserted or updated by the same statement. For example, when an UPDATE statement or INSERT-SELECT statement affects multiple rows, in SQL Server the affected rows will each have a different value in their ROWVERSION column, while in Babelfish/PostgreSQL, their value will be the same. When creating a new table with SELECT-INTO, SQL Server allows casting an explicit value (like NULL) to a to-be-created ROWVERSION column, while Babelfish will assign an actual ROWVERSION value to each row in the new table. | | This data type is not supported prior to 1.2.0. |
| Datatype: `NATIONAL CHARACTER` | | | This data type is not supported. |
| `CREATE/DROP DEFAULT` | | | Functionality related to this object type is not supported. |
| `DENY` | | | This syntax is not supported. |
| `DIAGNOSTIC SESSION` | | | Functionality related to this object type is not supported. |
| `BEGIN DIALOG CONVERSATION` | | | This syntax is not supported. |
| `DROP` statements that drop multiple objects | | | This functionality is not supported. |
| `DROP IF EXISTS` | Version 1.2.0 supports DROP IF EXISTS  for SCHEMA, DATABASE, and USER objects. | | This syntax is not supported for `USER` and `SCHEMA` objects. It is supported for the following objects: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION, DATABASE`. |
| Data encryption | | | Data encryption is not supported. |
| Encryption | | | Built-in functions and statements do not support encryption. |
| `ENCRYPT_CLIENT_CERT` connections | | | Client certificate connections are not supported. |
| `CREATE/ALTER/DROP ENDPOINT` | | | This syntax is not supported. |
| `EXECUTE AS` clause | In version 1.2.0, the "ownership chain" permission mechanism works for views, but does not currently work for stored procedures. This means that when a procedure accesses another object owned by the same owner as the procedure, it is not sufficient to grant the caller EXECUTE permission on the procedure (as is sufficient in SQL Server), but the caller also needs to be granted permissions on the objects accessed by the procedure. | | In previous versions, this syntax is not supported. |
| `EXECUTE AS SELF` clause | | | Not supported in functions, procedures, or triggers. |
| `CREATE ... EXECUTE AS OWNER` clause | | | `EXECUTE AS OWNER/CALLER` is supported for permission, but not for name resolution. |
| `EXECUTE AS USE` clause | | | This clause is not supported in functions, procedures, or triggers. |
| `EXECUTE with AS LOGIN` or `AT` option | | | This syntax is not supported. |
| Using `EXECUTE` to call | | | This syntax is not supported. |
| `EVENTDATA` function | | | This function is not supported. |
| `CREATE/DROP EVENT NOTIFICATION` | | | This functionality is not supported. |
| `CREATE/ALTER/DROP EVENT SESSION` | | | Functionality related to this syntax is not supported. |
| `CREATE EXTERNAL FILE FORMAT` | | | This syntax is not supported. |
| SQL keyword clause `ON filegroup` | | | Currently ignored. |
| Foreign Key constraints referencing database name | | | Foreign Key constraints that reference the database name are not supported. |
| `CREATE/ALTER/DROP FULLTEXT CATALOG` | | | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP FULLTEXT INDEX` | | | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP FULLTEXT STOPLIST` | | | Functionality related to this syntax is not supported. |
| Full-text Search | | | Search with a gist index is not supported. |
| Full-text Search | | | Full-text search of built-in functions and statements are not supported. |
| `ALTER FUNCTION` | | | This syntax is not supported. |
| Function declarations with \> 100 parameters | | | Function declarations that contain more than  100 parameters are not supported. |
| Function calls that calls DEFAULT | | | `DEFAULT` is not a supported parameter value for a function call. |
| Function calls that include :: | | | Function calls that include :: are not supported. |
| Functions, externally defined | | | External functions, including SQL Common Language Runtime (CLR) are not supported. |
| `GEOMETRY` | | | Datatype and all associated functionality is not supported. |
| `GEOGRAPHY` | | | Datatype and all associated functionality is not supported. |
| `GET_TRANSMISSION_STATUS` | | | This function is not supported. |
| Graph functionality | | | All SQL graph functionality is not supported. |
| `GRANT` | Version 1.2.0 supports `GRANT`/`REVOKE` to a database user/principal (but not to a database role), for object permissions `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `REFERENCES`, `EXECUTE`, `ALL [PRIVILEGES]`; `GRANT OPTION`  and `REVOKE... CASCADE` are also supported. `GRANT... TO` PUBLIC is supported, but `GRANT..TO PUBLIC WITH GRANT OPTION` is not currently supported. | | In previous versions, this command is not supported. |
| `GROUP BY ALL` clause | | | This syntax is not supported. |
| `GROUP BY ROLLUP` clause | | | This syntax is not supported. |
| `GROUP BY CUBE` clause | | | This syntax is not supported. |
| `ALTER DATABASE SET HADR` | | | This syntax is not supported. |
| `HASHBYTES()` function | | | The only supported algorithms are: MD5, SHA1, and SHA256 |
| `HIERARCHYID` | | | The datatype and methods are not supported. |
| Hints | | | Hints are not supported for joins, queries, or tables and will be ignored. |
| `INFORMATION_SCHEMA` catalog | Version 1.2.0 supports the following information schema views: `TABLES`, `COLUMNS`, `DOMAINS`, `TABLE_CONSTRAINTS` | | Previously, information schema views are not supported. |
| Identifiers exceeding 63 characters | | | PostgreSQL supports a maximum of 63 characters for identifiers. Babelfish converts identifiers longer than 63 characters to a name that uses a hash of the original name. Use the original name with T-SQL, but the converted name if accessing the database on the PostgreSQL listener port (5432). |
| Identifiers (variables/parameters) with multiple leading `@` characters | | | Identifiers that start with more than one leading `@` are not supported. |
| Identifiers: table or column names that contain `@` or `[]` characters | | | Table or column names that contain an `@` sign or square brackets are not supported. |
| Identifiers with multiple `@` characters | Version 1.2.0 supports @@DBTS, @@LOCK_TIMEOUT, @@SERVICENAME | In version 2.1.0, the PostgreSQL error code for `@@ERROR=213` is now mapped by Babelfish | Previous versions do not support system-defined `@@variables` other than: `@@VERSION`, `@@SPID`, `@@ROWCOUNT`, `@@TRANCOUNT`, `@@IDENTITY`, `@@ERROR`, `@@FETCH_STATUS`, `@@MAX_PRECISION`, `@@SERVERNAME`, `@@DATEFIRST`, `@@PROCID`, `@@MAX_CONNECTIONS`, `@@LOCK_TIMEOUT`, `@@NESTLEVEL`, `@@CURSOR_ROWS`, `@@MICROSOFTVERSION` |
| `IDENTITY` columns support | | | `IDENTITY` columns are supported for data types `tinyint`, `smallint`, `int`, `bigint`, `numeric`, and `decimal`. SQL Server supports precision up to 38 for data types `numeric` and `decimal` in `IDENTITY` columns. PostgreSQL supports precision up to 19 for data types `numeric` and `decimal` in `IDENTITY` columns. |
| Indexes with `IGNORE_DUP_KEY` | | | Syntax that creates an index that includes `IGNORE_DUP_KEY` will create an index as if this property was omitted. |
| Indexes with more than 32 columns | | | An index may not include more than 32 columns; `INCLUDE`d index columns count towards the limit in PostgreSQL, but not in SQL Server. |
| Inline indexes | | | Inline indexes are not supported. |
| Indexes (clustered) | | | Clustered indexes are created as if `NONCLUSTERED` was specified. |
| Indexed views | | | Functionality related to this object type is not supported. |
| `CREATE COLUMNSTORE INDEX` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP INDEX` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP SPATIAL INDEX` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP XML INDEX` | | | This syntax is not supported. |
| Index clauses | | | The following clauses are ignored: `FILLFACTOR`, `ALLOW_PAGE_LOCKS`, `ALLOW_ROW_LOCKS`, `PAD_INDEX`, `STATISTICS_NORECOMPUTE`, `OPTIMIZE_FOR_SEQUENTIAL_KEY`, `SORT_IN_TEMPDB`, `DROP_EXISTING`, `ONLINE`, `COMPRESSION_DELAY`, `MAXDOP`, `DATA_COMPRESSION` |
| `INSERT ... TOP` | | | This syntax is not supported. |
| `INSERT ... DEFAULT VALUES` | | | This syntax is not supported. |
| JSON | | | Datatypes, Built-in Functions, and statements are unsupported. |
| `KILL` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP EXTERNAL LANGUAGE` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP EXTERNAL LIBRARY` | | | Functionality related to this object type is not supported. |
| Localization of messages | | | Only English error messages and date names are currently supported. |
| `CREATE/ALTER LOGIN` clauses are supported with limited syntax | | | The `CREATE LOGIN ... PASSWORD` clause, `...DEFAULT_DATABASE` clause, and `...DEFAULT_LANGUAGE` clause are supported. The `ALTER LOGIN ... PASSWORD` clause is supported, but `ALTER LOGIN ... OLD_PASSWORD` clause is not supported. Only a sysadmin login user can modify a password. |
| `LOGIN` objects | | | All options for `LOGIN` objects except: `PASSWORD`, `DEFAULT_DATABASE`, `ENABLE`, `DISABLE` |
| `LOGINPROPERTY()` function | | | This function is not supported. |
| `CREATE/ALTER/DROP OPEN/CLOSE, BACKUP/RESTORE MASTER KEY` | | | Functionality related to this syntax is not supported. |
| Materialized Views | | | Materialized views are not supported. |
| `CREATE/ALTER/DROP MESSAGE TYPE` | | | This syntax is not supported. |
| `NEWSEQUENTIALID()` function | | | Implemented as NEWID(); sequential behavior is not guaranteed. |
| `MERGE` | | | This syntax is not supported. |
| `NEXT VALUE FOR` sequence clause | | | This syntax is not supported. |
| `NOT FOR REPLICATION clause` | | | This syntax is accepted and ignored. |
| `SET NUMERIC_ROUNDABORT ON` | | | This setting is not supported. |
| `OBJECTPROPERTY()` | | | This function is not supported. |
| `OBJECTPROPERTYEX()` | | | This function is not supported. |
| ODBC escape functions | | | ODBC escape functions are not supported. |
| `OUTER APPLY` | | | Lateral joins are not supported. |
| Procedure or function parameter limit | | | PostgreSQL supports a maximum of 100 parameters for a procedure or function. |
| Partitioning | | | Table and index partitioning is not supported. |
| `CREATE/ALTER/DROP PARTITION FUNCTION` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP PARTITION SCHEME` | | | This syntax is not supported. |
| `ALTER PROCEDURE` statement | | | This syntax is not supported. |
| Procedures `WITH RECOMPILE` | | | `WITH RECOMPILE` (when used in conjunction with the `DECLARE` and `EXECUTE` statements) is not supported. |
| Procedure declarations with more than 100 parameters | | | Declarations with more than 100 parameters are not supported. |
| Procedure calls that includes `DEFAULT` as a parameter value | | | `DEFAULT` is not a supported parameter value. |
| Procedures, externally defined | | | Externally defined procedures (including SQL Common Language Runtime (CLR)) are not supported. |
| Invoking a procedure whose name is in a variable | | | Using a variable as a procedure name is not supported. |
| Procedure versioning | | | Procedure versioning is not supported. |
| `CREATE/ALTER/DROP QUEUE` | | | Functionality related to this syntax is not supported. |
| `READTEXT` | | | This syntax is not supported. |
| Remote object access | | | Remote object access (including tables, views, and procedures) is not supported. |
| `CREATE/ALTER/DROP REMOTE SERVICE BINDING` | | | Functionality related to this object type is not supported. |
| `CREATE/ALTER/DROP RESOURCE POOL` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP EXTERNAL RESOURCE POOL` | | | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP RESOURCE GOVERNOR` | | | Functionality related to this syntax is not supported. |
| `RESTORE` statement | | | This command is not supported.  You have to backup and restore the database using PostgreSQL techniques. |
| `REVERT` | | | This syntax is not supported. |
| `REVOKE` | Version 1.2.0 supports GRANT/REVOKE to a database user/principal (but not to a database role), for object permissions SELECT, INSERT, UPDATE, DELETE, REFERENCES, EXECUTE, ALL [PRIVILEGES]; GRANT OPTION  and REVOKE..CASCADE are also supported.  | | In previous versions, this syntax is not supported. |
| `CREATE ROLE` | | Version 1.2.0 adds support for CREATE ROLE (the AUTHORIZATION clause is not supported), ALTER ROLE, and DROP ROLE | This syntax is not supported. |
| Roles: Server-level roles other than sysadmin | | | Server-level roles (other than sysadmin) are not supported. |
| Roles: Database-level roles other than `db_owner` | | | Database-level roles other than `db_owner` are not supported. |
| `ROLLBACK`: table variables do not support transactional rollback | | | Processing may be interrupted if a rollback occurs in a session with table variables. |
| `CREATE/ALTER/DROP ROUTE` | | | Functionality related to this syntax is not supported. |
| `ROWGUIDCOL` | | | Currently ignored. Queries referencing `$GUIDGOL` will cause a syntax error. |
| Row-level security | | | Row-level security with `CREATE SECURITY POLICY` and inline table-valued functions is currently not supported. |
| `ROWSET` functions | | | The following ROWSET functions are not supported: `OPENXML()`, `OPENJSON()`, `OPENROWSET()`, `OPENQUERY()`, `OPENDATASOURCE()` |
| `ROWVERSION` | | | This datatype is not supported. |
| `CREATE/DROP RULE` | | | Functionality related to this syntax is not supported. |
| `ALTER DATABASE SCOPED CONFIGURATION` | | | This syntax is not supported. |
| `ALTER SCHEMA` | | | This syntax is not supported. |
| `CREATE SCHEMA ...` and supporting clauses | Version 1.2.0 supports `CREATE SCHEMA ... WITH AUTHORIZATION`. In SQL Server, a non-dbo database user who owns a schema that was created by the dbo (with `CREATE SCHEMA ...AUTHORIZATION`), can only create objects in that schema after `CREATE` permission has been granted to this user. In Babelfish, the non-dbo user can currently create objects in that schema without further permissions grants. In SQL Server, for a non-dbo database user who owns a schema that was created by the dbo (with `CREATE SCHEMA ...AUTHORIZATION`), and the dbo has created an object in that schema, the non-dbo user does not require any permissions to reference the dbo-created object. In Babelfish, currently the non-dbo user requires that permissions be granted before they can access the object. When a SQL object (procedure, view, function or trigger) references an object without qualifying it with a schema name, SQL Server resolves the object's schema name by using the schema name of the SQL object in which the reference occurs. Babelfish is currently resolving this differently, using the default schema of the database user executing the procedure. | | In previous versions, you can only use the `CREATE SCHEMA` command to create an empty schema. |
| `CREATE/ALTER/DROP SECURITY POLICY` | | | This syntax is not supported. |
| `CREATE/ALTER/DROP SEARCH PROPERTY LIST` | | | This syntax is not supported. |
| `SEQUENCE` object support | | | `SEQUENCE` objects are supported for data support types `tinyint`, `smallint`, `int`, `bigint`, `numeric`, and `decimal`. PostgreSQL supports precision to 19 places for data types `numeric` and `decimal` in a `SEQUENCE`. |
| `CREATE/ALTER/DROP SERVER AUDIT` | | | Functionality related to this object type is not supported. |
| `CREATE/ALTER/DROP SERVER AUDIT SPECIFICATION` | | | Functionality related to this object type is not supported. |
| `SELECT... FOR BROWSE` | | | This syntax is not supported. |
| `SELECT PIVOT/UNPIVOT` | | | This syntax is not supported. |
| `SELECT TOP x PERCENT WHERE x \< or \> 100` | | | This syntax is not supported. |
| `SELECT TOP ... WITH TIES` | | | This syntax is not supported. |
| `SELECT ... FOR XML PATH, ELEMENTS` | | | Supported without the `ELEMENTS` clause. |
| `SELECT ... FOR XML  RAW, ELEMENTS` | | | Supported without the `ELEMENTS` clause. |
| `SEND` | | | This syntax is not supported. |
| `ALTER SERVER CONFIGURATION` | | | This syntax is not supported. |
| `SERVERPROPERTY()` | The following values are supported in 1.2.0: `Babelfish`, `Collation`, `CollationID`, `Edition`, `EditionID`, `EngineEdition`, `ServerName`, `LicenseType`, `ProductVersion`, `ProductMajorVersion`, `ProductMinorVersion`, `IsSingleUser`, `IsIntegratedSecurityOnly`, `IsLocalDB`, `IsAdvancedAnalyticsInstalled`, `IsBigDataCluster`, `IsPolyBaseInstalled`, `IsFullTextInstalled`, `IsXTPSupported` | | Previous versions did not support: `Babelfish`, `BuildClrVersion`, `Collation`, `CollationID`, `ComparisonStyle`, `ComputerNamePhysicalNetBIOS`, `Edition`, `EditionID`, `EngineEdition`, `HadrManagerStatus`, `InstanceDefaultDataPath`, `InstanceDefaultLogPath`, `InstanceName`, `IsClustered`,  `IsHadrEnabled`, `IsSingleUser`, `IsIntegratedSecurityOnly`, `IsLocalDB`, `IsAdvancedAnalyticsInstalled`, `IsBigDataCluster`, `IsPolyBaseInstalled`, `IsFullTextInstalled`, `IsXTPSupported`, `LCID`, `LicenseType`, `MachineName`, `NumLicenses`, `ProcessID`, `ProductBuild`, `ProductBuildType`, `ProductLevel`, `ProductMinorVersion`, `ProductMajorVersion`, `ProductUpdateLevel`, `ProductUpdateReference`, `ProductVersion`, `ResourceLastUpdateDateTime`, `ResourceVersion`, `ServerName`, `SqlCharSet`, `SqlCharSetName`, `SqlSortOrder`, `SqlSortOrderName`, `FilestreamShareName`, `FilestreamConfiguredLevel`, `FilestreamEffectiveLevel` |
| `CREATE/ALTER/DROP SERVER ROLE` | | | Functionality related to this syntax is not supported. |
| `CREATE/ALTER/DROP SERVICE` | | | Functionality related to this syntax is not supported. |
| `ALTER SERVICE, BACKUP/RESTORE SERVICE MASTER KEY` clause | | | Functionality related to this syntax is not supported. |
| `SESSIONPROPERTY()` | | | Unsupported properties: `ANSI_NULLS`, `ANSI_PADDING`, `ANSI_WARNINGS`, `ARITHABORT`, `CONCAT_NULL_YIELDS_NULL`, `NUMERIC_ROUNDABORT` |
| Service Broker functionality | | | Service Broker functionality is not supported. |
| `SERVICE MASTER KEY` | | | Functionality related to this object type is not supported. |
| `SET ANSI_NULL_DFLT_OFF ON` | | | This setting is not supported. |
| `SET ANSI_NULL_DFLT_ON OFF` | | | This setting is not supported. |
| `SET ANSI_PADDING OFF` | | | This setting is not supported. |
| `SET ANSI_WARNINGS OFF` | | | This setting is not supported. |
| `SET ARITHABORT OFF` | | | This setting is not supported. |
| `SET ARITHIGNORE ON` | | | This setting is not supported. |
| `SET CONTEXT_INFO` | | | This syntax is not supported. |
| `SET CURSOR_CLOSE_ON_COMMIT ON` | | | This setting is not supported. |
| `SET DATEFORMAT` | | | This syntax is not supported. |
| `SET DEADLOCK_PRIORITY` | | | This syntax is not supported. |
| `SET FORCEPLAN` | | | This syntax is not supported. |
| `SET FMTONLY` | Version 1.2.0 and later, `SET FMTONLY ON/OFF` applies only to `SELECT *` queries, and is ignored for all other queries. | | This syntax is supported with limitations. |
| `SET LANGUAGE` | | | This syntax is not supported with any value other than `english` or `us_english`. |
| `SET LOCK_TIMEOUT` | | | This syntax is supported in version 1.2.0 | This syntax is not supported prior to 1.2.0. |
| `SET NO BROWSETABLE` | | | This syntax is not supported. |
| `SET NUMERIC_ROUNDABORT ON` | | | This syntax is not supported. |
| `SET REMOTE_PROC_TRANSACTIONS` | | | This syntax is not supported. |
| `SET ROWCOUNT n WHERE n != 0` | | | This syntax is not supported. |
| `SET ROWCOUNT @variable` | | | This syntax is not supported. |
| `SET SHOWPLAN_ALL` | | | This syntax is not supported. |
| `SET SHOWPLAN_TEXT` | | | This syntax is not supported. |
| `SET SHOWPLAN_XML` | | | This syntax is not supported. |
| `SET STATISTICS` | | | This syntax is not supported. |
| `SET STATISTICS IO` | | | This syntax is not supported. |
| `SET STATISTICS PROFILE` | | | This syntax is not supported. |
| `SET STATISTICS TIME` | | | This syntax is not supported. |
| `SET STATISTICS XML` | | | This syntax is not supported. |
| `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ` | | | This syntax is not supported. |
| `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE` | | | This syntax is not supported. |
| `SET OFFSETS` | | | This syntax is not supported. |
| `SETUSER` statements | | | `SETUSER` statements are not supported. |
| `SHUTDOWN` statement | | | This syntax is not supported. |
| `SP_CONFIGURE` | | | This syntax is not supported. |
| SQL keyword `SPARSE` | | | The keyword SPARSE (related to SQL Server-specific aspects of data storage) is accepted and ignored. |
| System-provided stored procedures are partially supported | Version 1.2.0 supports `SP_TABLE_PRIVILEGES`, `SP_COLUMN_PRIVILEGES`, `SP_SPECIAL_COLUMNS`, `SP_FKEYS`, `SP_PKEYS`, `SP_STORED_PROCEDURES`, `XP_QV`, `SP_DESCRIBE_UNDECLARED_PARAMETERS`, `SP_HELPUSER` | Version 2.1.0 adds support for `SP_SPROC_COLUMNS`, `SP_SPROC_COLUMNS_100`, `SP_HELPROLE`, `SP_HELPROLEMEMBER` | Previous versions supported: `SP_HELPDB`, `SP_GETAPPLOCK`, `SP_RELEASEAPPLOCK`, `SP_COLUMNS`, `SP_COLUMNS_100`, `SP_COLUMNS_MANAGED`, `SP_CURSOR_LIST`, `SP_DATATYPE_INFO`, `SP_DATATYPE_INFO_100`, `SP_DESCRIBE_CURSOR`, `SP_DESCRIBE_FIRST_RESULT_SET`, `SP_DESCRIBE_UNDECLARED_PARAMETERS`, `SP_OLEDB_RO_USRNAME`, `SP_PREPARE`, `SP_TABLECOLLATIONS_100`, `SP_TABLES`, `SP_UNPREPARE`, `SP_STATISTICS`, `SP_STATISTICS_100`, `SP_UPDATESTATS`, `SP_PKEYS`, `SP_DATABASES`, `SP_CURSOR`, `SP_CURSOROPEN`, `SP_CURSORPREPARE`, `SP_CURSOREXECUTE`, `SP_CURSORPREPEXEC`, `SP_CURSORUNPREPARE`, `SP_CURSORFETCH`, `SP_CURSOROPTION`, `SP_CURSORCLOSE` are supported. All other stored procedures are not supported. |
| Unquoted string values in stored procedure calls and default values | | | String value calls to stored procedures and default values must be enclosed in single-quotes. |
| `SYNONYM` | | | Functionality related to this object type is not supported. |
| `CREATE/ALTER/DROP, OPEN/CLOSE SYMMETRIC KEY` | | | Functionality related to this object type is not supported. |
| `System Catalog Views` | Version 1.2.0 supports the following system catalog views: `sys.dm_os_host_info`, `sys.dm_exec_sessions`, `sys.dm_exec_connections`, `sys.endpoints`, `sys.table_types`, `sys.database_principals`, `sys.sysprocesses`, `sys.sysconfigures`, `sys.syscurconfigs`, `sys.configurations`. For `sys.sysconfigures`, `sys.syscurconfigs`, `sys.configurations`, only a single, read-only configuration setting is currently provided. | Version 2.1.0 adds support for `sys.syslanguages`, `sys.indexes`, `sys.all_views`, `sys.database_files`, `sys.sql_modules`, `sys.system_sql_modules`, `sys.all_sql_modules`, `sys.xml_schema_collections`, `sys.dm_hadr_database_replica_states`, `sys.data_spaces`, `sys.database_mirroring`, `sys.database_role_members` | Previously, system catalog views are not supported. |
| `CREATE TABLE ... GRANT` clause | | | Functionality related to this syntax is not supported. |
| `CREATE TABLE ... IDENTITY` clause | | | Functionality related to this syntax is not supported. |
| `CREATE EXTERNAL TABLE` | | | Functionality related to this syntax is not supported. |
| Table value constructor syntax (`FROM` clause) | | | A table constructed with the `FROM` clause is not supported. |
| tempdb is not reinitialized at restart | | | Permanent objects (like tables and procedures) created in tempdb are not removed when the database is restarted. |
| Time precision | | | Babelfish supports 6-digit precision for fractional seconds. Babelfish doesn't perform SQL Server 3-millisecond rounding. No adverse effects are anticipated with this behavior. |
| `TIMESTAMP` | Version 1.2.0 has implemented the `TIMESTAMP` datatype (as an alias). To use `TIMESTAMP`, you must set `babelfishpg_tsql.escape_hatch_rowversion` to `ignore` (the default is `strict`). The Babelfish implementation of `TIMESTAMP` is semantically similar to SQL Server, except that in SQL Server, each inserted or updated row gets a unique `TIMESTAMP` value. In Babelfish, the assigned `TIMESTAMP` value is the same for all rows inserted or updated by the same statement. For example, when an `UPDATE` statement or `INSERT-SELECT` statement affects multiple rows, in SQL Server the affected rows will each have a different value in their `TIMESTAMP` column, while in Babelfish/PostgreSQL, their value will be the same. When creating a new table with SELECT-INTO, SQL Server allows casting an explicit value (like NULL) to a to-be-created TIMESTAMP column, while Babelfish will assign an actual `TIMESTAMP` value to each row in the new table. | | SQL Server's `TIMESTAMP` is unrelated to PostgreSQL `TIMESTAMP`. |
| `TYPEPROPERTY()` function | | | This function is not supported. |
| Global temporary tables (tables with names that start with `##`) | | | Global temporary tables are not supported. |
| Temporary procedures are not dropped automatically | | | This functionality is not supported. |
| Temporal tables | | | Temporal tables are not supported. |
| `TEXTIMAGE_ON filegroup` | | | Babelfish ignores the `TEXTIMAGE_ON` filegroup clause. |
| Transaction isolation levels | | | `READUNCOMMITTED` is treated the same as `READCOMMITTED`. `REPEATABLEREAD`, `SERIALIZABLE`, and `SNAPSHOT` are not supported. |
| `ALTER TRIGGER` | | | This syntax is not supported. |
| `CREATE TRIGGER` (schema qualified) | | | Schema qualified trigger names are not supported. |
| `ENABLE/DISABLE TRIGGER` | | | This syntax is not supported. |
| DDL trigger | | | DDL triggers are not supported. |
| `LOGON` trigger | | | `LOGON` triggers are not supported. |
| Triggers, externally defined | | | Externally defined triggers including SQL Common Language Runtime (CLR) are not supported. |
| `INSTEAD_OF` Triggers | | | `INSTEAD_OF` triggers are not supported. |
| `CREATE/ALTER/DROP TYPE` | | | This syntax is not supported. |
| `SELECT ... FOR XML AUTO` | | | This syntax is not supported. |
| `SELECT ... FOR XML EXPLICIT` | | | This syntax is not supported. |
| `UPDATE STATISTICS` | | | This syntax is not supported. |
| `CREATE USER` | Version 1.2.0 supports USER objects (a.k.a. database principals). For CREATE USER, only the FOR/FROM LOGIN and DEFAULT_SCHEMA options can be specified. For ALTER USER, only the DEFAULT_SCHEMA option can be specified. | | In previous versions, this syntax is not supported. The PostgreSQL statement, `CREATE USER` does not create a user that is equivalent to the SQL Server `CREATE USER` syntax. |
| `UPDATETEXT` | | | This syntax is not supported. |
| `USER` | | | Functionality related to this object type is not supported. |
| Variable | | | Using a transaction or savepoint name in a variable is not supported. |
| `ALTER VIEW` | | | This syntax is not supported. |
| `VIEW ... VIEW_METADATA` clause | | | This syntax is not supported. |
| `VIEW ... CHECK OPTION` clause | | | This syntax is not supported. |
| `@@version` | | | The value returned by `@@version` is slightly different from the value returned by SQL Server. Your code might not work correctly if it depends on the formatting of `@@version`. |
| `WAITFOR DELAY` | | | This syntax is not supported. |
| `WAITFOR/RECEIVE` | | | This syntax is not supported. |
| `WAITFOR TIME` | | | This syntax is not supported. |
| `WITH ENCRYPTION` clause | | | This syntax is not supported for functions, procedures, triggers, or views. |
| `CREATE/ALTER/DROP WORKLOAD CLASSIFIER` | | | Functionality related to this syntax is not supported. |
| `CREATE/DROP WORKLOAD CLASSIFIER` | | | This syntax is not supported. |
| `WRITETEXT` | | | This syntax is not supported. |
| `OPENXML()` | | | This function is not supported. |
| XML datatype with schema (xmlschema) | | | XML type without schema is supported. |
| XML methods | | | This includes .VALUES(), .NODES(), and other methods. |
| XML indexes | | | XML indexes are not supported. |
| XPATH expressions | | | This syntax is not supported. |
| WITH XMLNAMESPACES construct | | | This syntax is not supported. |
| `WITHOUT SCHEMABINDING` clause | | | Not supported in functions, procedures, triggers, or views. The object will be created, but as if `WITH SCHEMABINDING` was specified. |
| `CREATE/ALTER/DROP SELECTIVE XML INDEX` clause | | | This syntax is not supported. |
| `CREATE/ALTER/DROP XML SCHEMA COLLECTION` | | | This syntax is not supported. |

Please note that this may not be a complete list of the functional differences 
between SQL Server and Babelfish. If you find syntax variations that should be 
included in the documentation, please [file an issue to let us know about it](https://github.com/babelfish-for-postgresql/babelfish_project_website/issues).

