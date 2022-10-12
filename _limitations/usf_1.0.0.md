---
layout: default
title: Version 1.0.0
nav_order: 1
---

## Babelfish Version 1.0.0

| Feature | Options | Notes | More Info | 
| ------- | ------- | ------- | ------- | 
| ::function call (old syntax) | Unsupported |  |  |
| @@variable | Unsupported : `@@CONNECTIONS`, `@@CPU_BUSY`, `@@CURSOR_ROWS`, `@@DBTS`, `@@IDLE`, `@@IO_BUSY`, `@@LANGID`, `@@LANGUAGE`, `@@LOCK_TIMEOUT`, `@@MAX_CONNECTIONS`, `@@MICROSOFTVERSION`, `@@NESTLEVEL`, `@@PACKET_ERRORS`, `@@PACK_RECEIVED`, `@@PACK_SENT`, `@@PROCID`, `@@REMSERVER`, `@@SERVICENAME`, `@@TEXTSIZE`, `@@TIMETICKS`, `@@TOTAL_ERRORS`, `@@TOTAL_READ`, `@@TOTAL_WRITE` |  |  |
| ADD SIGNATURE | Unsupported |  |  |
| ALTER AUTHORIZATION | Unsupported |  |  |
| ALTER DATABASE | Unsupported |  |  |
| ALTER DATABASE options | Unsupported |  |  |
| ALTER FUNCTION | Unsupported |  |  |
| ALTER INDEX | Unsupported |  |  |
| ALTER PROCEDURE | Unsupported |  |  |
| ALTER ROLE | Unsupported |  |  |
| ALTER SCHEMA | Unsupported |  |  |
| ALTER SERVER CONFIGURATION | Unsupported |  |  |
| ALTER SERVER ROLE | Unsupported : `BULKADMIN`, `DBCREATOR`, `DISKADMIN`, `PROCESSADMIN`, `SECURITYADMIN`, `SERVERADMIN`, `SETUPADMIN` |  |  |
| ALTER TABLE | Unsupported : `ADD MULTIPLE COLUMNS/CONSTRAINTS`, `ADD PERIOD FOR SYSTEM TIME`, `ALTER COLUMN NOT NULL`, `ALTER COLUMN NULL`, `CHECK CONSTRAINT`, `DISABLE CHANGE_TRACKING`, `DROP CONSTRAINT_BY_NAME_ONLY`, `DROP MULTIPLE COLUMNS`, `DROP MULTIPLE CONSTRAINTS`, `DROP MULTIPLE ITEMS`, `DROP PERIOD FOR SYSTEM_TIME`, `ENABLE CHANGE_TRACKING`, `NOCHECK CONSTRAINT`, `REBUILD`, `SET FILESTREAM_ON`, `SET FILETABLE`, `SET LOCK_ESCALATION`, `SET SYSTEM_VERSIONING` |  |  |
| ALTER TRIGGER | Unsupported |  |  |
| ALTER VIEW | Unsupported |  |  |
| Aggregate functions | Unsupported : `APPROX_COUNT_DISTINCT`, `CHECKSUM_AGG`, `GROUPING_ID`, `ROWCOUNT_BIG`, `STDEV`, `STDEVP`, `VAR`, `VARP` |  |  |
| BULK INSERT | Unsupported |  |  |
| CHECKPOINT | Unsupported |  |  |
| CHECKSUM | Supported : `arg1=SINGLE ARGUMENT` |  |  |
| CLOSE KEY | Unsupported |  |  |
| CLUSTERED index | Unsupported |  |  |
  |  |
| COLUMNPROPERTY | Unsupported |  |  |
| CONNECTIONPROPERTY | Supported : `arg1=net_transport`, `protocol_type`, `auth_scheme`, `local_tcp_port` |  |  |
| CREATE DATABASE options | Unsupported : `ALLOW_SNAPSHOT_ISOLATION`, `ANSI_NULLS`, `ANSI_NULL_DEFAULT`, `ANSI_PADDING`, `ANSI_WARNINGS`, `ARITHABORT`, `AUTO_CLOSE`, `AUTO_SHRINK`, `AUTO_UPDATE_STATISTICS`, `AUTO_UPDATE_STATISTICS_ASYNC`, `CATALOG_COLLATION`, `COMPATIBILITY_LEVEL`, `CONCAT_NULL_YIELDS_NULL`, `CONTAINMENT=PARTIAL`, `CURSOR_CLOSE_ON_COMMIT`, `CURSOR_DEFAULT`, `DATE_CORRELATION_OPTIMIZATION`, `DB_CHAINING`, `DELAYED_DURABILITY`, `DISABLE_BROKER`, `FILESTREAM`, `HONOR_BROKER_PRIORITY`, `MULTI_USER`, `NUMERIC_ROUNDABORT`, `PAGE_VERIFY`, `PARAMETERIZATION`, `QUERY_STORE`, `QUOTED_IDENTIFIER`, `READ_COMMITTED_SNAPSHOT`, `RECOVERY`, `RECURSIVE_TRIGGERS`, `TARGET_RECOVERY_TIME`, `TRUSTWORTHY` |  |  |
| CREATE ROLE | Unsupported |  |  |
| CREATE SERVER ROLE | Unsupported |  |  |
| CURSOR parameters | Unsupported |  |  |
  |  |
| Case-sensitive collation | Unsupported : `CATALOG_COLLATION`, `DATABASE`, `SERVER` |  |  |
| Column attribute | Unsupported |  |  |
| Compound operator containing whitespace | Unsupported |  |  |
| Cross-database reference | Unsupported |  |  |
| Cursor options | Unsupported : `DYNAMIC`, `FAST_FORWARD`, `FOR UPDATE`, `KEYSET`, `OPTIMISTIC`, `SCROLL`, `SCROLL_LOCKS`, `TYPE_WARNING` |  |  |
| DATABASEPROPERTYEX | Supported : `arg2=Collation`, `Edition`, `IsAutoClose`, `IsAutoCreateStatistics`, `IsInStandBy`, `IsTornPageDetectionEnabled`, `Status`, `Updateability`, `Version` |  |  |
| DATEADD | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MINUTE`, `MM`, `MONTH`, `N`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |  |  |
| DATEDIFF | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |  |  |
| DATENAME | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |  |  |
| DATEPART | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |  |  |
| DB role options | Unsupported |  |  |
| DB roles | Unsupported |  |  |
| DBA statements | Unsupported |  |  |
| DBCC statements | Unsupported |  |  |
| DELETE | Unsupported : `OPENDATASOURCE`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `WHERE CURRENT OF` |  |  |
| DENY | Unsupported |  |  |
| DESC constraint | Unsupported |  |  |
| DISABLE TRIGGER | Unsupported |  |  |
| DML Table Source | Unsupported |  |  |
| DROP IF EXISTS | Unsupported : `ROLE`, `SCHEMA`, `USER` |  |  |
| DROP INDEX | Unsupported : `INDEX ON SCHEMA.TABLE`, `SCHEMA.TABLE.INDEX`, `TABLE.INDEX` |  |  |
| DROP multiple objects | Unsupported : `DATABASE`, `INDEX`, `TRIGGER` |  |  |
| Datatypes | Unsupported : `CHARACTER VARYING`, `GEOGRAPHY`, `GEOMETRY`, `HIERARCHYID`, `NATIONAL CHARACTER`, `NATIONAL CHARACTER VARYING`, `NCHARACTER`, `NCHARACTER VARYING`, `ROWVERSION`, `TIMESTAMP`, `XML COLUMN_SET FOR ALL_SPARSE_COLUMNS`, `XML(xmlschema)` |  |  |
  |  |
| Double-quoted string | Unsupported : `EMBEDDED_DOUBLE_QUOTE`, `EMBEDDED_SINGLE_QUOTE` |  |  |
| Dynamic SQL | Unsupported |  |  |
| ENABLE TRIGGER | Unsupported |  |  |
| EXECUTE AS | Unsupported |  |  |
| EXECUTE SQL function | Unsupported |  |  |
| Execute procedure options | Unsupported : `RECOMPILE` |  |  |
| Execute string options | Unsupported |  |  |
| FETCH cursor | Unsupported : `ABSOLUTE`, `FIRST`, `LAST`, `PRIOR`, `RELATIVE` |  |  |
  |  |
| FOR REPLICATION | Unsupported |  |  |
| Features in computed columns | Unsupported |  |  |
| Function options | Unsupported : `ATOMIC NATIVELY COMPILED`, `CLR`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `INLINE`, `SCHEMABINDING` |  |  |
| GLOBAL cursor | Unsupported |  |  |
  |  |
| GRANT | Unsupported |  |  |
| GROUP BY ALL | Unsupported |  |  |
| GROUP BY ROLLUP/CUBE (old syntax) | Unsupported |  |  |
| Geospatial features | Unsupported |  |  |
| Global Temporary Tables | Unsupported |  |  |
| HASHBYTES | Supported : `arg1=MD5`, `SHA1`, `SHA2_256`, `SHA2_512` |  |  |
| HIERARCHYID features | Unsupported |  |  |
| IGNORE_DUP_KEY index | Unsupported |  |  |
| INDEXKEY_PROPERTY | Supported : `arg4=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |  |  |
| INDEXPROPERTY | Unsupported |  |  |
| INFORMATION_SCHEMA | Unsupported |  |  |
| INSERT | Unsupported : `DEFAULT VALUES`, `EXECUTE SP_EXECUTESQL`, `EXECUTE(EXPRESSION)`, `EXECUTE(STRING)`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `TOP` |  |  |
| INSERT BULK | Unsupported |  |  |
| Index attribute | Unsupported |  |  |
| Index options | Unsupported |  |  |
| Indexed view | Unsupported |  |  |
| Inline index | Unsupported |  |  |
| Instead-Of Trigger | Unsupported |  |  |
| JSON features | Unsupported |  |  |
| Join hint | Unsupported |  |  |
| LIKE '[...]' | Unsupported |  |  |
| LOGINPROPERTY | Supported : `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |  |  |
| Lateral join | Unsupported |  |  |
| Leading dots in identifier | Unsupported |  |  |
| Line continuation character | Unsupported |  |  |
| Login options | Unsupported : `ADD CREDENTIAL`, `CHECK_EXPIRATION`, `CHECK_POLICY`, `CREDENTIAL`, `DROP CREDENTIAL`, `FROM ASYMMETRIC KEY`, `FROM CERTIFICATE`, `FROM WINDOWS`, `MUST_CHANGE`, `NAME`, `NO CREDENTIAL`, `OLD_PASSWORD`, `PASSWORD HASHED`, `SID`, `UNLOCK` |  |  |
| MERGE | Unsupported |  |  |
  |  |
| Materialized view | Unsupported |  |  |
| Maximum columns per index | Supported : `32` |  |  |
| Maximum identifier length | Supported : `63` |  |  |
| Maximum parameters per function | Supported : `100` |  |  |
| Maximum parameters per procedure | Supported : `100` |  |  |
| Maximum precision IDENTITY column | Supported : `18` |  |  |
| Miscellaneous objects | Unsupported : `AGGREGATE`, `APPLICATION ROLE`, `ASSEMBLY`, `ASYMMETRIC KEY`, `AVAILABILITY GROUP`, `CERTIFICATE`, `COLUMN ENCRYPTION KEY`, `COLUMN MASTER KEY`, `CONTRACT`, `CREDENTIAL`, `CRYPTOGRAPHIC PROVIDER`, `DEFAULT`, `DIAGNOSTIC SESSION`, `EXTERNAL DATA SOURCE`, `EXTERNAL LIBRARY`, `EXTERNAL RESOURCE POOL`, `FULLTEXT CATALOG`, `FULLTEXT INDEX`, `FULLTEXT STOPLIST`, `MASTER KEY`, `MESSAGE TYPE`, `QUEUE`, `QUEUE`, `REMOTE SERVICE BINDING`, `RESOURCE GOVERNOR`, `ROLE`, `ROUTE`, `RULE`, `SERVER AUDIT`, `SERVER AUDIT SPECIFICATION`, `SERVER ROLE`, `SERVICE`, `SERVICE MASTER KEY`, `SYMMETRIC KEY`, `SYNONYM`, `USER`, `WORKLOAD CLASSIFIER`, `WORKLOAD GROUP` |  |  |
| NEXT VALUE FOR | Unsupported |  |  |
| NONCLUSTERED HASH index | Unsupported |  |  |
| NOT FOR REPLICATION | Unsupported |  |  |
| NUMERIC/DECIMAL column with non-numeric default | Unsupported |  |  |
| Non-PERSISTED computed columns | Unsupported |  |  |
| Nullable column | Unsupported |  |  |
| Numeric assignment to datetime variable/parameter/column | Unsupported |  |  |
| Numeric representation of datetime | Unsupported |  |  |
| OBJECTPROPERTY | Unsupported |  |  |
| OBJECTPROPERTYEX | Unsupported |  |  |
| ODBC Outer Join | Unsupported |  |  |
| ODBC literal | Unsupported |  |  |
| ODBC scalar function | Unsupported |  |  |
| OPEN KEY | Unsupported |  |  |
| Parameter value DEFAULT | Unsupported |  |  |
| Partitioning | Unsupported |  |  |
| Partitioning2 | Unsupported | Babelfish code supports PostgreSQL-style partitioning on the PostgreSQL port, but use of PostgreSQL-styled partitioned tables from the TDS port is not recommended | [Partitioning workaround](https://babelfishpg.org/docs/workaround/partitioned_table/) |
| Procedure options | Unsupported : `ATOMIC NATIVELY COMPILED`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `RECOMPILE`, `SCHEMABINDING` |  |  |
| Procedure versioning (declaration) | Unsupported |  |  |
| Procedure versioning (execution) | Unsupported |  |  |
| Query hint | Unsupported |  |  |
| READTEXT | Unsupported |  |  |
| REVOKE | Unsupported |  |  |
| Regular variable named @@v | Unsupported |  |  |
| Remote object reference | Unsupported |  |  |
| SCHEMA options | Unsupported |  |  |
| SCHEMA_ID with N arguments | Supported : `1` |  |  |
| SCHEMA_NAME with N arguments | Supported : `1` |  |  |
| SECURITY DEFINER transaction mgmt | Unsupported |  |  |
| SELECT TOP PERCENT | Unsupported : `0`, `EXPRESSION`, `NONZERO`, `VARIABLE` |  |  |
| SELECT TOP WITH TIES | Unsupported |  |  |
| SELECT TOP in Table-Valued Function | Unsupported |  |  |
| SELECT TOP without ORDER BY | Unsupported |  |  |
| SELECT..PIVOT | Unsupported |  |  |
| SELECT..UNPIVOT | Unsupported |  |  |
| SEQUENCE options | Unsupported |  |  |
| SERVERPROPERTY | Supported : `arg1=Collation`, `CollationID`, `Edition`, `IsSingleUser`, `ServerName`, `Babelfish` |  |  |
  |  |
  |  |
| SET ANSI_NULL_DFLT_OFF | Supported : `OFF` |  |  |
| SET ANSI_NULL_DFLT_ON | Supported : `ON` |  |  |
| SET ANSI_PADDING | Supported : `ON` |  |  |
| SET ANSI_WARNINGS | Supported : `ON` |  |  |
| SET ARITHABORT | Supported : `ON` |  |  |
| SET ARITHIGNORE | Supported : `OFF` |  |  |
  |  |
| SET CONTEXT_INFO | Unsupported |  |  |
| SET CURSOR_CLOSE_ON_COMMIT | Supported : `OFF` |  |  |
  |  |
| SET DATEFORMAT | Unsupported |  |  |
| SET DEADLOCK_PRIORITY | Unsupported |  |  |
| SET FMTONLY | Unsupported |  |  |
  |  |
  |  |
| SET LANGUAGE | Supported : `english`, `us_english` |  |  |
| SET LOCK_TIMEOUT | Unsupported |  |  |
  |  |
| SET NOEXEC | Supported : `OFF` |  |  |
| SET NO_BROWSETABLE | Unsupported |  |  |
| SET NUMERIC_ROUNDABORT | Supported : `OFF` |  |  |
| SET OFFSETS | Unsupported |  |  |
| SET PARSEONLY | Unsupported |  |  |
| SET QUERY_GOVERNOR_COST_LIMIT | Unsupported |  |  |
  |  |
| SET QUOTED_IDENTIFIER in batch | Unsupported |  |  |
| SET ROWCOUNT | Unsupported : `NONZERO`, `VARIABLE` |  |  |
| SET SHOWPLAN_ALL | Unsupported |  |  |
| SET SHOWPLAN_TEXT | Unsupported |  |  |
| SET SHOWPLAN_XML | Unsupported |  |  |
| SET STATISTICS | Unsupported |  |  |
| SET TEXTSIZE | Unsupported |  |  |
| SET TRANSACTION ISOLATION LEVEL | Supported : `READ COMMITTED`, `READ UNCOMMITTED`, `SNAPSHOT` |  |  |
  |  |
  |  |
| SETUSER | Unsupported |  |  |
| SQL graph | Unsupported |  |  |
| SQL_VARIANT_PROPERTY | Supported : `arg2=*` |  |  |
| STRING_AGG() WITHIN GROUP | Unsupported |  |  |
| Server role options | Unsupported : `AUTHORIZATION`, `NAME` |  |  |
| Service Broker | Unsupported |  |  |
| Special characters in identifier | Unsupported |  |  |
| Special characters in parameter | Unsupported |  |  |
| Special column names | Unsupported |  |  |
| Syntax Issues | Unsupported |  |  |
| T-SQL Outer Join operator | Unsupported |  |  |
| TIMESTAMP column without column name | Unsupported |  |  |
| TRIGGER_NESTLEVEL with N arguments | Unsupported |  |  |
  |  |
| TYPEPROPERTY | Supported : `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |  |  |
| Table hint | Unsupported |  |  |
| Table value constructor | Unsupported |  |  |
  |  |
| Temporal table | Unsupported |  |  |
| Temporary procedures | Unsupported |  |  |
| Traceflags | Unsupported |  |  |
| Transactions | Unsupported : `BEGIN DISTRIBUTED TRANSACTION`, `DELAYED_DURABILITY`, `MARK` |  |  |
| Transition table reference for multi-DML trigger | Unsupported |  |  |
| Trigger created with schema name | Unsupported |  |  |
| Trigger options | Unsupported : `APPEND`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `NATIVE_COMPILATION`, `SCHEMABINDING` |  |  |
| UPDATE | Unsupported : `OPENDATASOURCE`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `WHERE CURRENT OF` |  |  |
| UPDATE STATISTICS | Unsupported |  |  |
| UPDATETEXT | Unsupported |  |  |
| Unquoted string | Unsupported |  |  |
| User options | Unsupported |  |  |
| Variable aggregates across rows | Unsupported |  |  |
| Variable assignment dependency | Unsupported |  |  |
| Variable procedure name | Unsupported |  |  |
| View options | Unsupported : `CHECK OPTION`, `ENCRYPTION`, `VIEW_METADATA`, `WITHOUT SCHEMABINDING` |  |  |
| WAITFOR | Unsupported |  |  |
| WRITETEXT | Unsupported |  |  |
| XML features | Unsupported : `EXIST`, `MODIFY`, `NODES`, `QUERY`, `SELECT FOR XML AUTO`, `SELECT FOR XML AUTO ELEMENTS`, `SELECT FOR XML EXPLICIT`, `SELECT FOR XML PATH ELEMENTS`, `SELECT FOR XML RAW ELEMENTS`, `SELECTIVE XML INDEX`, `VALUE`, `WITH XMLNAMESPACES`, `XML INDEX`, `XML SCHEMA COLLECTION`, `XML TYPE DEFINITION` |  |  |
| expression AT TIME ZONE | Unsupported |  |  |
