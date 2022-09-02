---
layout: default
title: -- Version 1.0.0
nav_order: 1
---

## Babelfish Version 1.0.0

| Feature | Options | 
| ------- | ------- | 
| ::function call (old syntax) | Unsupported |
| @@variable | Supported: `@@VERSION`, `@@SPID`, `@@ROWCOUNT`, `@@TRANCOUNT`, `@@IDENTITY`, `@@ERROR`, `@@FETCH_STATUS`, `@@MAX_PRECISION`, `@@SERVERNAME`, `@@DATEFIRST`, `@@OPTIONS` |
| ADD SIGNATURE | No support |
| ALTER AUTHORIZATION | No support |
| ALTER DATABASE | No support |
| ALTER DATABASE options | No support |
| ALTER FUNCTION | No support |
| ALTER INDEX | No support |
| ALTER PROCEDURE | No support |
| ALTER ROLE | Unsupported |
| ALTER SCHEMA | No support |
| ALTER SERVER CONFIGURATION | No support |
| ALTER SERVER ROLE | Supported: `SYSADMIN` |
| ALTER TABLE | Supported: `DROP CONSTRAINT`, `DROP COLUMN`, `ADD COLUMN/CONSTRAINT`, `ADD COLUMN`, `ALTER COLUMN`, `ENABLE TRIGGER`, `DISABLE TRIGGER` |
| ALTER TRIGGER | No support |
| ALTER VIEW | No support |
| Aggregate functions | Supported: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`, `COUNT_BIG`, `CUME_DIST`, `DENSE_RANK`, `DENSE_RANK`, `DISTINCT`, `FIRST_VALUE`, `GROUPING`, `LAG`, `LAST_VALUE`, `LEAD`, `NTILE`, `PERCENTILE_CONT`, `PERCENTILE_DISC`, `PERCENT_RANK`, `RANK`, `ROW_NUMBER`, `STRING_AGG` |
| BULK INSERT | No support |
| CHECKPOINT | Fully supported |
| CHECKSUM | No support |
| CLOSE KEY | No support |
| CLUSTERED index | No support |
| COLLATIONPROPERTY | Fully supported |
| COLUMNPROPERTY | Unsupported |
| CONNECTIONPROPERTY | Supported: `arg1=net_transport`, `protocol_type`, `auth_scheme`, `local_tcp_port` |
| CREATE DATABASE options | Supported: `COLLATE`, `CONTAINMENT=NONE` |
| CREATE ROLE | Unsupported |
| CREATE SERVER ROLE | No support |
| CURSOR parameters | No support |
| CURSOR variables | Fully supported |
| Case-sensitive collation | Supported: `COLUMN`, `EXPRESSION` |
| Column attribute | No support |
| Compound operator containing whitespace | No support |
| Cross-database reference | Unsupported |
| Cursor options | Supported: `FORWARD_ONLY`, `STATIC`, `LOCAL`, `READ_ONLY`, `INSENSITIVE` |
| DATABASEPROPERTYEX | Supported: `arg2=Collation`, `Edition`, `IsAutoClose`, `IsAutoCreateStatistics`, `IsInStandBy`, `IsTornPageDetectionEnabled`, `Status`, `Updateability`, `Version` |
| DATEADD | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MINUTE`, `MM`, `MONTH`, `N`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `W`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |
| DATEDIFF | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |
| DATENAME | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |
| DATEPART | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |
| DB role options | Unsupported |
| DB roles | No support |
| DBA statements | No support |
| DBCC statements | No support |
| DELETE | Supported: `TOP`, `CTE`, `OUTPUT` |
| DENY | No support |
| DESC constraint | No support |
| DISABLE TRIGGER | No support |
| DML Table Source | No support |
| DROP IF EXISTS | Supported: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION`, `DATABASE`, `INDEX` |
| DROP INDEX | Supported: `INDEX ON TABLE` |
| DROP multiple objects | Supported: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION` |
| Datatypes | No support |
| Delimited database name | No support |
| Double-quoted string | Supported: `STRING` |
| ENABLE TRIGGER | No support |
| EXECUTE AS | No support |
| EXECUTE SQL function | No support |
| Execute procedure options | Supported: `RESULT SETS`, `RESULT SETS NONE`, `RESULT SETS UNDEFINED` |
| Execute string options | No support |
| FETCH cursor | Supported: `NEXT` |
| FK constraint referencing DB name | No support |
| FOR REPLICATION | No support |
| Features in computed columns | No support |
| Function options | Supported: `RETURNS NULL ON NULL INPUT`, `CALLED ON NULL INPUT`, `WITHOUT SCHEMABINDING` |
| GLOBAL cursor | No support |
| GOTO | Fully supported |
| GRANT | Unsupported |
| GROUP BY ALL | Unsupported |
| GROUP BY ROLLUP/CUBE (old syntax) | No support |
| Global Temporary Tables | No support |
| HASHBYTES | Supported: `arg1=MD5`, `SHA1`, `SHA2_256`, `SHA2_512` |
| HIERARCHYID features | No support |
| IGNORE_DUP_KEY index | No support |
| INDEXKEY_PROPERTY | Supported: `arg4=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| INDEXPROPERTY | Unsupported |
| INFORMATION_SCHEMA | Unsupported |
| INSERT | Supported: `VALUES`, `SELECT`, `EXECUTE PROCEDURE`, `CTE`, `OUTPUT` |
| INSERT BULK | No support |
| Index attribute | No support |
| Index options | No support |
| Indexed view | No support |
| Inline index | No support |
| Instead-Of Trigger | Unsupported |
| JSON features | No support |
| Join hint | No support |
| LIKE '[...]' | No support |
| LOGINPROPERTY | Supported: `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| Lateral join | Unsupported |
| Leading dots in identifier | Unsupported |
| Line continuation character | No support |
| Login options | Supported: `PASSWORD`, `DEFAULT_DATABASE`, `DEFAULT_LANGUAGE`, `ENABLE`, `DISABLE` |
| MERGE | No support |
| MONEY literal | Fully supported |
| Materialized view | No support |
| Maximum columns per index | Supported: `32` |
| Maximum identifier length | Supported: `63` |
| Maximum parameters per function | Supported: `100` |
| Maximum parameters per procedure | Supported: `100` |
| Maximum precision IDENTITY column | Supported: `18` |
| Miscellaneous objects | Supported: `SEQUENCE`, `LOGIN` |
| NEXT VALUE FOR | No support |
| NONCLUSTERED HASH index | No support |
| NOT FOR REPLICATION | No support |
| NUMERIC/DECIMAL column with non-numeric default | Unsupported |
| Non-PERSISTED computed columns | No support |
| Nullable column | No support |
| Numeric assignment to datetime variable/parameter/column | No support |
| Numeric representation of datetime | Unsupported |
| OBJECTPROPERTY | Unsupported |
| OBJECTPROPERTYEX | Unsupported |
| ODBC Outer Join | No support |
| ODBC literal | No support |
| ODBC scalar function | No support |
| OPEN KEY | No support |
| Parameter value DEFAULT | No support |
| Partitioning | No support |
| Procedure options | Supported: `WITHOUT SCHEMABINDING` |
| Procedure versioning (declaration) | No support |
| Procedure versioning (execution) | No support |
| Query hint | No support |
| READTEXT | No support |
| REVOKE | Unsupported |
| Regular variable named @@v | Supported: `0`, `102`, `132`, `133`, `134`, `135`, `136`, `141`, `142`, `153`, `155`, `180`, `217`, `219`, `220`, `232`, `266`, `289`, `293`, `306`, `346`, `352`, `477`, `487`, `506`, `512`, `515`, `517`, `545`, `547`, `550`, `556`, `574`, `628`, `1034`, `1049`, `1051`, `1205`, `1505`, `1715`, `1752`, `1765`, `1768`, `1776`, `1778`, `1801`, `1946`, `2627`, `2714`, `2732`, `2747`, `2787`, `3609`, `3616`, `3623`, `3701`, `3723`, `3726`, `3728`, `3729`, `3732`, `3902`, `3903`, `3914`, `3930`, `4514`, `4708`, `4712`, `4901`, `4920`, `6401`, `8003`, `8004`, `8007`, `8009`, `8011`, `8016`, `8018`, `8023`, `8028`, `8029`, `8031`, `8032`, `8037`, `8043`, `8047`, `8050`, `8057`, `8058`, `8106`, `8107`, `8115`, `8134`, `8143`, `8152`, `8159`, `8179`, `9441`, `9451`, `9809`, `10610`, `10727`, `10733`, `10793`, `11555`, `11700`, `11701`, `11702`, `11703`, `11705`, `11706`, `11708`, `11709`, `11717`, `16901`, `16902`, `16903`, `16915`, `16916`, `16948`, `16950`, `18456` |
| Remote object reference | No support |
| SCHEMA options | Unsupported |
| SCHEMA_ID with N arguments | Supported: `1` |
| SCHEMA_NAME with N arguments | Supported: `1` |
| SECURITY DEFINER transaction mgmt | No support |
| SELECT TOP PERCENT | Supported: `100` |
| SELECT TOP WITH TIES | No support |
| SELECT TOP in Table-Valued Function | No support |
| SELECT TOP without ORDER BY | No support |
| SELECT..PIVOT | No support |
| SELECT..UNPIVOT | No support |
| SEQUENCE options | No support |
| SERVERPROPERTY | Supported: `arg1=Collation`, `CollationID`, `Edition`, `IsSingleUser`, `ServerName`, `Babelfish` |
| SESSIONPROPERTY | Fully supported |
| SET ANSI_NULLS | Fully supported |
| SET ANSI_NULL_DFLT_OFF | Supported: `OFF` |
| SET ANSI_NULL_DFLT_ON | Supported: `ON` |
| SET ANSI_PADDING | Supported: `ON` |
| SET ANSI_WARNINGS | Supported: `ON` |
| SET ARITHABORT | Supported: `ON` |
| SET ARITHIGNORE | Supported: `OFF` |
| SET CONCAT_NULL_YIELDS_NULL | Fully supported |
| SET CONTEXT_INFO | No support |
| SET CURSOR_CLOSE_ON_COMMIT | Supported: `OFF` |
| SET DATEFIRST | Fully supported |
| SET DATEFORMAT | No support |
| SET DEADLOCK_PRIORITY | No support |
| SET FMTONLY | No support |
| SET IDENTITY_INSERT | Fully supported |
| SET IMPLICIT_TRANSACTIONS | Fully supported |
| SET LANGUAGE | Supported: `english`, `us_english` |
| SET LOCK_TIMEOUT | Unsupported |
| SET NOCOUNT | Fully supported |
| SET NOEXEC | Supported: `OFF` |
| SET NO_BROWSETABLE | No support |
| SET NUMERIC_ROUNDABORT | Supported: `OFF` |
| SET OFFSETS | No support |
| SET PARSEONLY | Unsupported |
| SET QUERY_GOVERNOR_COST_LIMIT | Unsupported |
| SET QUOTED_IDENTIFIER | Fully supported |
| SET QUOTED_IDENTIFIER in batch | No support |
| SET ROWCOUNT | Supported: `0` |
| SET SHOWPLAN_ALL | Unsupported |
| SET STATISTICS | Unsupported |
| SET TEXTSIZE | No support |
| SET TRANSACTION ISOLATION LEVEL | Supported: `READ COMMITTED`, `READ UNCOMMITTED`, `SNAPSHOT` |
| SET XACT_ABORT | Fully supported |
| SET, multiple options combined | Fully supported |
| SETUSER | No support |
| SQL graph | No support |
| SQL_VARIANT_PROPERTY | Supported: `arg2=*` |
| STRING_AGG() WITHIN GROUP | Supported: `arg1=SINGLE ARGUMENT` |
| Server role options | Supported: `ADD MEMBER`, `DROP MEMBER` |
| Service Broker | No support |
| Special characters in identifier | No support |
| Special characters in parameter | No support |
| Special column names | No support |
| Syntax Issues | No support |
| System Functions | Supported: `fn_helpcollations`, `fn_listextendedproperty` |
| T-SQL Outer Join operator | No support |
| TIMESTAMP column without column name | Supported: `XML`, `CURSOR` |
| TRIGGER_NESTLEVEL with N arguments | Unsupported |
| TRUNCATE TABLE | Fully supported |
| TYPEPROPERTY | Supported: `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| Table hint | No support |
| Table value constructor | No support |
| Table variables | Fully supported |
| Temporal table | No support |
| Temporary procedures | No support |
| Traceflags | No support |
| Transactions | Supported: `TRANSACTION NAME IN VARIABLE` |
| Transition table reference for multi-DML trigger | Unsupported |
| Trigger created with schema name | Unsupported |
| Trigger options | Supported: `WITHOUT SCHEMABINDING` |
| UPDATE | Supported: `TOP`, `CTE`, `OUTPUT` |
| UPDATE STATISTICS | No support |
| UPDATETEXT | No support |
| Unquoted string | No support |
| User options | Unsupported |
| Variable aggregates across rows | No support |
| Variable assignment dependency | No support |
| Variable procedure name | No support |
| View options | Supported: `SCHEMABINDING` |
| WAITFOR | No support |
| WRITETEXT | No support |
| XML features | Supported: `SELECT FOR XML PATH`, `SELECT FOR XML RAW` |
| expression AT TIME ZONE | No support |
