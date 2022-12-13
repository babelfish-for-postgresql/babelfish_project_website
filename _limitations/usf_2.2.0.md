---
layout: default
title: Version 2.2.0
nav_order: 1
---

## Babelfish Version 2.2.0

| Feature | Options | Notes | 
| ------- | ------- | ------- | 
| @@variable | Unsupported : `@@CONNECTIONS`, `@@CPU_BUSY`, `@@IDLE`, `@@IO_BUSY`, `@@LANGID`, `@@PACKET_ERRORS`, `@@PACK_RECEIVED`, `@@PACK_SENT`, `@@REMSERVER`, `@@TEXTSIZE`, `@@TIMETICKS`, `@@TOTAL_ERRORS`, `@@TOTAL_READ`, `@@TOTAL_WRITE` | |
| ADD SIGNATURE | Unsupported | |
| ALTER AUTHORIZATION | Unsupported | |
| ALTER DATABASE | Unsupported | |
| ALTER DATABASE options | Unsupported | |
| ALTER FUNCTION | Unsupported | |
| ALTER INDEX | Unsupported |[Index rebuilding workaround](https://babelfishpg.org/docs/workaround/rebuilding_table_indexes/) |
| ALTER PROCEDURE | Unsupported | |
| ALTER SCHEMA | Unsupported | |
| ALTER SERVER CONFIGURATION | Unsupported | |
| ALTER SERVER ROLE | Unsupported : `BULKADMIN`, `DBCREATOR`, `DISKADMIN`, `PROCESSADMIN`, `SECURITYADMIN`, `SERVERADMIN`, `SETUPADMIN` | |
| ALTER TABLE | Unsupported : `ADD MULTIPLE COLUMNS/CONSTRAINTS`, `ADD PERIOD FOR SYSTEM TIME`, `ALTER COLUMN NOT NULL`, `ALTER COLUMN NULL`, `CHECK CONSTRAINT`, `DISABLE CHANGE_TRACKING`, `DROP CONSTRAINT_BY_NAME_ONLY`, `DROP MULTIPLE COLUMNS`, `DROP MULTIPLE CONSTRAINTS`, `DROP MULTIPLE ITEMS`, `DROP PERIOD FOR SYSTEM_TIME`, `ENABLE CHANGE_TRACKING`, `NOCHECK CONSTRAINT`, `REBUILD`, `SET FILESTREAM_ON`, `SET FILETABLE`, `SET LOCK_ESCALATION`, `SET SYSTEM_VERSIONING` | |
| ALTER TRIGGER | Unsupported | |
| ALTER VIEW | Unsupported | |
| Aggregate functions | Unsupported : `APPROX_COUNT_DISTINCT`, `CHECKSUM_AGG`, `GROUPING_ID`, `ROWCOUNT_BIG`, `STDEV`, `STDEVP`, `VAR`, `VARP` | |
| BULK INSERT | Unsupported | |
| CHECKPOINT | Unsupported | |
| CHECKSUM | Supported : `arg1=SINGLE ARGUMENT`, `arg1=STAR`, `MULTIPLE ARGUMENTS` | |
| CLOSE KEY | Unsupported | |
| CLUSTERED index | Unsupported | |
| COLUMNPROPERTY | Supported : `arg3=CharMaxLen`, `AllowsNull` | |
| CONNECTIONPROPERTY | Supported : `arg1=net_transport`, `protocol_type`, `auth_scheme`, `local_tcp_port`, `arg1=physical_net_transport`, `client_net_address` | |
| CREATE DATABASE options | Unsupported : `ALLOW_SNAPSHOT_ISOLATION`, `ANSI_NULLS`, `ANSI_NULL_DEFAULT`, `ANSI_PADDING`, `ANSI_WARNINGS`, `ARITHABORT`, `AUTO_CLOSE`, `AUTO_SHRINK`, `AUTO_UPDATE_STATISTICS`, `AUTO_UPDATE_STATISTICS_ASYNC`, `CATALOG_COLLATION`, `COMPATIBILITY_LEVEL`, `CONCAT_NULL_YIELDS_NULL`, `CONTAINMENT=PARTIAL`, `CURSOR_CLOSE_ON_COMMIT`, `CURSOR_DEFAULT`, `DATE_CORRELATION_OPTIMIZATION`, `DB_CHAINING`, `DELAYED_DURABILITY`, `DISABLE_BROKER`, `FILESTREAM`, `HONOR_BROKER_PRIORITY`, `MULTI_USER`, `NUMERIC_ROUNDABORT`, `PAGE_VERIFY`, `PARAMETERIZATION`, `QUERY_STORE`, `QUOTED_IDENTIFIER`, `READ_COMMITTED_SNAPSHOT`, `RECOVERY`, `RECURSIVE_TRIGGERS`, `TARGET_RECOVERY_TIME`, `TRUSTWORTHY` | |
| CREATE SERVER ROLE | Unsupported | |
| CURSOR parameters | Unsupported | |
| Case-sensitive collation | Unsupported : `CATALOG_COLLATION`, `DATABASE`, `SERVER` | |
| Column attribute | Unsupported | |
| Compound operator containing whitespace | Unsupported | |
| Cross-database reference | Unsupported : `ALTER TABLE`, `CREATE INDEX`, `CREATE TABLE`, `DROP INDEX`, `MERGE`, `TRUNCATE TABLE`, `UPDATE STATISTICS` | |
| Cursor options | Unsupported : `DYNAMIC`, `FAST_FORWARD`, `FOR UPDATE`, `KEYSET`, `OPTIMISTIC`, `SCROLL`, `SCROLL_LOCKS`, `TYPE_WARNING` |[Dynamically defined cursor workaround](https://babelfishpg.org/docs/workaround/dynamically_defined_cursor/) |
| DATABASEPROPERTYEX | Supported : `arg2=Collation`, `Edition`, `IsAutoClose`, `IsAutoCreateStatistics`, `IsInStandBy`, `IsTornPageDetectionEnabled`, `Status`, `Updateability`, `Version` | |
| DATEADD | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MINUTE`, `MM`, `MONTH`, `N`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY`, `arg1=MILLISECOND`, `MS`, `W` | |
| DATEDIFF | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY`, `arg1=W` | |
| DATENAME | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY`, `arg1=W` | |
| DATEPART | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY`, `arg1=W` | |
| DB role options | Unsupported : `AUTHORIZATION` | |
| DB roles | Unsupported | |
| DBA statements | Unsupported | |
| DBCC statements | Unsupported | |
| DELETE | Unsupported : `OPENDATASOURCE`, `OPENQUERY`, `OPENROWSET`, Two `OUTPUT` clauses, `WHERE CURRENT OF` | |
| DENY | Unsupported | |
| DESC constraint | Unsupported | |
| DISABLE TRIGGER | Unsupported | |
| DML Table Source | Unsupported | |
| DROP INDEX | Unsupported : `INDEX ON SCHEMA.TABLE`, `SCHEMA.TABLE.INDEX`, `TABLE.INDEX` | |
| DROP multiple objects | Unsupported : `DATABASE`, `INDEX`, `TRIGGER` | |
| Datatypes | Unsupported : `CHARACTER VARYING`, `GEOGRAPHY`, `GEOMETRY`, `HIERARCHYID`, `NATIONAL CHARACTER`, `NATIONAL CHARACTER VARYING`, `NCHARACTER`, `NCHARACTER VARYING`, `XML COLUMN_SET FOR ALL_SPARSE_COLUMNS`, `XML(xmlschema)` | |
| Double-quoted string | Unsupported : `EMBEDDED_DOUBLE_QUOTE`, `EMBEDDED_SINGLE_QUOTE` | |
| Dynamic SQL | Unsupported | |
| ENABLE TRIGGER | Unsupported | |
| EXECUTE AS | Unsupported | |
| EXECUTE SQL function | Unsupported | |
| Execute procedure options | Unsupported : `RECOMPILE` | |
| Execute string options | Unsupported | |
| FETCH cursor | Unsupported : `ABSOLUTE`, `FIRST`, `LAST`, `PRIOR`, `RELATIVE` | |
| FOR REPLICATION | Unsupported | |
| Features in computed columns | Unsupported | |
| Function options | Unsupported : `ATOMIC NATIVELY COMPILED`, `CLR`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `INLINE`, `SCHEMABINDING` | |
| GLOBAL cursor | Unsupported | |
| GRANT | Supported : `ALL PRIVILEGES ON OBJECT`, `SELECT ON OBJECT`, `INSERT ON OBJECT`, `UPDATE ON OBJECT`, `DELETE ON OBJECT`, `REFERENCES ON OBJECT`, `EXECUTE ON OBJECT` | |
| GROUP BY ROLLUP/CUBE (old syntax) | Unsupported | |
| Geospatial features | Unsupported | |
| Global Temporary Tables | Unsupported | |
| HASHBYTES | Supported : `arg1=MD5`, `SHA1`, `SHA2_256`, `SHA2_512` | |
| HIERARCHYID features | Unsupported | |
| IGNORE_DUP_KEY index | Unsupported | |
| INDEXKEY_PROPERTY | Supported : `arg4=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` | |
| INDEXPROPERTY | Supported : `arg3=IndexFillFactor`, `IndexID`, `IsClustered`, `IsDisabled`, `IsHypothetical`, `IsPadIndex`, `IsPageLockDisallowed`, `IsRowLockDisallowed`, `IsUnique` | |
| INFORMATION_SCHEMA | Unsupported : `COLUMN_PRIVILEGES`, `CONSTRAINT_TABLE_USAGE`, `DOMAIN_CONSTRAINTS`, `KEY_COLUMN_USAGE`, `PARAMETERS`, `REFERENTIAL_CONSTRAINTS`, `ROUTINE_COLUMNS`, `SCHEMATA`, `TABLE_PRIVILEGES`, `VIEW_COLUMN_USAGE`, `VIEW_TABLE_USAGE` | |
| INSERT | Unsupported : `DEFAULT VALUES`, `EXECUTE SP_EXECUTESQL`, `EXECUTE(EXPRESSION)`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `TOP` | |
| INSERT BULK | Unsupported | |
| Index attribute | Unsupported | |
| Index options | Unsupported | |
| Indexed view | Unsupported | |
| Inline index | Unsupported | |
| Instead-Of Trigger | Unsupported : `VIEW` | |
| JSON features | Unsupported | |
| Join hint | Unsupported | |
| LIKE '[...]' | Unsupported | |
| LOGINPROPERTY | Supported : `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` | |
| Line continuation character | Unsupported | |
| Login options | Unsupported : `ADD CREDENTIAL`, `CHECK_EXPIRATION`, `CHECK_POLICY`, `CREDENTIAL`, `DROP CREDENTIAL`, `FROM ASYMMETRIC KEY`, `FROM CERTIFICATE`, `FROM WINDOWS`, `MUST_CHANGE`, `NAME`, `NO CREDENTIAL`, `OLD_PASSWORD`, `PASSWORD HASHED`, `SID`, `UNLOCK` | |
| MERGE | Unsupported | |
| Materialized view | Unsupported | |
| Maximum columns per index | Supported : `32` | |
| Maximum identifier length | Supported : `63` | |
| Maximum parameters per function | Supported : `100` | |
| Maximum parameters per procedure | Supported : `100` | |
| Maximum precision IDENTITY column | Supported : `18` | |
| Miscellaneous objects | Unsupported : `AGGREGATE`, `APPLICATION ROLE`, `ASSEMBLY`, `ASYMMETRIC KEY`, `AVAILABILITY GROUP`, `CERTIFICATE`, `COLUMN ENCRYPTION KEY`, `COLUMN MASTER KEY`, `CONTRACT`, `CREDENTIAL`, `CRYPTOGRAPHIC PROVIDER`, `DEFAULT`, `DIAGNOSTIC SESSION`, `EXTERNAL DATA SOURCE`, `EXTERNAL LIBRARY`, `EXTERNAL RESOURCE POOL`, `FULLTEXT CATALOG`, `FULLTEXT INDEX`, `FULLTEXT STOPLIST`, `MASTER KEY`, `MESSAGE TYPE`, `QUEUE`, `QUEUE`, `REMOTE SERVICE BINDING`, `RESOURCE GOVERNOR`, `ROUTE`, `RULE`, `SERVER AUDIT`, `SERVER AUDIT SPECIFICATION`, `SERVER ROLE`, `SERVICE`, `SERVICE MASTER KEY`, `SYMMETRIC KEY`, `SYNONYM`, `WORKLOAD CLASSIFIER`, `WORKLOAD GROUP` | |
| NEXT VALUE FOR | Unsupported | |
| NONCLUSTERED HASH index | Unsupported | |
| NOT FOR REPLICATION | Unsupported | |
| Non-PERSISTED computed columns | Unsupported | |
| Nullable column | Unsupported | |
| Numeric assignment to datetime variable/parameter/column | Unsupported | |
| Numeric representation of datetime | Unsupported : `CONVERT`, `DATEADD`, `DATEDIFF`, `DATENAME`, `DATEPART`, `PARSE`, `TRY_CAST`, `TRY_CONVERT`, `TRY_PARSE` | |
| OBJECTPROPERTY | Supported : `arg2=ExecIsAnsiNullsOn`, `ExecIsQuotedIdentOn`, `IsDefault`, `IsDefaultCnst`, `IsDeterministic`, `IsIndexed`, `IsInlineFunction`, `IsMSShipped`, `IsPrimaryKey`, `IsProcedure`, `IsRule`, `IsScalarFunction`, `IsSchemaBound`, `IsTable`, `IsTableFunction`, `IsTrigger`, `IsUserTable`, `IsView`, `OwnerId`, `TableFulltextPopulateStatus`, `TableHasVarDecimalStorageFormat` | |
| OBJECTPROPERTYEX | Supported : `arg2=ExecIsAnsiNullsOn`, `ExecIsQuotedIdentOn`, `IsDefault`, `IsDefaultCnst`, `IsDeterministic`, `IsIndexed`, `IsInlineFunction`, `IsMSShipped`, `IsPrimaryKey`, `IsProcedure`, `IsRule`, `IsScalarFunction`, `IsSchemaBound`, `IsTable`, `IsTableFunction`, `IsTrigger`, `IsUserTable`, `IsView`, `OwnerId`, `TableFulltextPopulateStatus`, `TableHasVarDecimalStorageFormat`, `BaseType` | |
| ODBC Outer Join | Unsupported | |
| ODBC literal | Unsupported | |
| ODBC scalar function | Unsupported | |
| OPEN KEY | Unsupported | |
| Parameter value DEFAULT | Unsupported |[DEFAULT parameter value workaround](https://babelfishpg.org/docs/workaround/default_param_values/) |
| Partitioning | Unsupported |[Partitioning Workaround](https://babelfishpg.org/docs/workaround/partitioned_table/) - Babelfish code supports PostgreSQL-style partitioning on the PostgreSQL port, but use of PostgreSQL-styled partitioned tables from the TDS port is not recommended. |
| Procedure options | Unsupported : `ATOMIC NATIVELY COMPILED`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `RECOMPILE`, `SCHEMABINDING` | |
| Procedure versioning (declaration) | Unsupported | |
| Procedure versioning (execution) | Unsupported | |
| Query hint | Unsupported | |
| READTEXT | Unsupported | |
| REVOKE | Supported : `ALL PRIVILEGES ON OBJECT`, `SELECT ON OBJECT`, `INSERT ON OBJECT`, `UPDATE ON OBJECT`, `DELETE ON OBJECT`, `REFERENCES ON OBJECT`, `EXECUTE ON OBJECT`, `CASCADE` | |
| Regular variable named @@v | Unsupported | |
| Remote object reference | Unsupported | |
| SCHEMA options | Unsupported : `CREATE TABLE`, `CREATE VIEW`, `DENY`, `GRANT`, `REVOKE`, `TRANSFER`, `TRANSFER OBJECT`, `TRANSFER TYPE`, `TRANSFER XML SCHEMA COLLECTION` | |
| SCHEMA_ID with N arguments | Supported : `1`, `0` | |
| SCHEMA_NAME with N arguments | Supported : `1`, `0` | |
| SECURITY DEFINER transaction mgmt | Unsupported | |
| SELECT TOP PERCENT | Unsupported : `0`, `EXPRESSION`, `NONZERO`, `VARIABLE` | |
| SELECT TOP WITH TIES | Unsupported | |
| SELECT TOP in Table-Valued Function | Unsupported | |
| SELECT TOP without ORDER BY | Unsupported | |
| SELECT..PIVOT | Unsupported | |
| SELECT..UNPIVOT | Unsupported | |
| SEQUENCE options | Unsupported | |
| SERVERPROPERTY | Supported : `arg1=Collation`, `CollationID`, `Edition`, `IsSingleUser`, `ServerName`, `Babelfish`, `arg1=EditionID`, `EngineEdition`, `LicenseType`, `ProductVersion`, `ProductMajorVersion`, `ProductMinorVersion`, `IsIntegratedSecurityOnly`, `IsLocalDB`, `IsAdvancedAnalyticsInstalled`, `IsBigDataCluster`, `IsPolyBaseInstalled`, `IsFullTextInstalled`, `IsXTPSupported`, `arg1=MachineName`, `InstanceName` | |
| SET ANSI_NULL_DFLT_OFF | Supported : `OFF` | |
| SET ANSI_NULL_DFLT_ON | Supported : `ON` | |
| SET ANSI_PADDING | Supported : `ON` | |
| SET ANSI_WARNINGS | Supported : `ON` | |
| SET ARITHABORT | Supported : `ON` | |
| SET ARITHIGNORE | Supported : `OFF` | |
| SET CONTEXT_INFO | Unsupported | |
| SET CURSOR_CLOSE_ON_COMMIT | Supported : `OFF` | |
| SET DATEFORMAT | Unsupported | |
| SET DEADLOCK_PRIORITY | Unsupported | |
| SET FMTONLY | Unsupported | |
| SET LANGUAGE | Supported : `english`, `us_english` | |
| SET NOEXEC | Supported : `OFF` | |
| SET NUMERIC_ROUNDABORT | Supported : `OFF` | |
| SET OFFSETS | Unsupported | |
| SET QUERY_GOVERNOR_COST_LIMIT | Unsupported | |
| SET QUOTED_IDENTIFIER in batch | Unsupported | |
| SET ROWCOUNT | Unsupported : `NONZERO`, `VARIABLE` |[SET ROWCOUNT workaround](https://babelfishpg.org/docs/workaround/set_rowcount/) |
| SET SHOWPLAN_TEXT | Unsupported | |
| SET SHOWPLAN_XML | Unsupported | |
| SET TEXTSIZE | Unsupported | |
| SET TRANSACTION ISOLATION LEVEL | Supported : `READ COMMITTED`, `READ UNCOMMITTED`, `SNAPSHOT` | |
| SETUSER | Unsupported | |
| SQL graph | Unsupported | |
| SQL_VARIANT_PROPERTY | Supported : `arg2=*` | |
| STRING_AGG() WITHIN GROUP | Unsupported | |
| Scalar UDF in table DDL | Unsupported : `ALTER TABLE DEFAULT` | |
| Server role options | Unsupported : `AUTHORIZATION`, `NAME` | |
| Service Broker | Unsupported | |
| Special characters in identifier | Unsupported | |
| Special characters in parameter | Unsupported | |
| Special column names | Unsupported | |
| Syntax Issues | Unsupported | |
| T-SQL Outer Join operator | Unsupported | |
| TRIGGER_NESTLEVEL with N arguments | Supported : `0` | |
| TYPEPROPERTY | Supported : `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` | |
| Table hint | Unsupported | |
| Table value constructor | Unsupported | |
| Temporal table | Unsupported | |
| Temporary procedures | Unsupported | |
| Traceflags | Unsupported | |
| Transactions | Unsupported : `BEGIN DISTRIBUTED TRANSACTION`, `DELAYED_DURABILITY`, `MARK` | |
| Trigger options | Unsupported : `APPEND`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `NATIVE_COMPILATION`, `SCHEMABINDING` | |
| UPDATE | Unsupported : `OPENDATASOURCE`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `WHERE CURRENT OF` | |
| UPDATE STATISTICS | Unsupported | |
| UPDATETEXT | Unsupported | |
| Unquoted string | Unsupported | |
| User options | Unsupported : `ALLOW_ENCRYPTED_VALUE_MODIFICATIONS`, `DEFAULT_LANGUAGE`, `FROM ASYMMETRIC KEY`, `FROM CERTIFICATE`, `OLD_PASSWORD`, `PASSWORD`, `WITH LOGIN`, `WITH NAME`, `WITHOUT LOGIN` | |
| Variable aggregates across rows | Unsupported | |
| Variable assignment dependency | Unsupported | |
| Variable procedure name | Unsupported | |
| View options | Unsupported : `CHECK OPTION`, `ENCRYPTION`, `VIEW_METADATA`, `WITHOUT SCHEMABINDING` | |
| WAITFOR | Unsupported | |
| WRITETEXT | Unsupported | |
| XML features | Unsupported : `EXIST`, `MODIFY`, `NODES`, `QUERY`, `SELECT FOR XML AUTO`, `SELECT FOR XML AUTO ELEMENTS`, `SELECT FOR XML EXPLICIT`, `SELECT FOR XML PATH ELEMENTS`, `SELECT FOR XML RAW ELEMENTS`, `SELECTIVE XML INDEX`, `VALUE`, `WITH XMLNAMESPACES`, `XML INDEX`, `XML SCHEMA COLLECTION`, `XML TYPE DEFINITION` | |
| expression AT TIME ZONE | Unsupported | |
