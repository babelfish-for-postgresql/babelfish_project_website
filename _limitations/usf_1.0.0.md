---
layout: default
title: - Version 1.0.0
nav_order: 1
---

## Babelfish Version 1.0.0

| Feature | Options | 
| ------- | ------- | 
| ::function call (old syntax) | Unsupported |
| @@variable | Supported: `@@VERSION`, `@@SPID`, `@@ROWCOUNT`, `@@TRANCOUNT`, `@@IDENTITY`, `@@ERROR`, `@@FETCH_STATUS`, `@@MAX_PRECISION`, `@@SERVERNAME`, `@@DATEFIRST`, `@@OPTIONS` |
| ADD SIGNATURE | Unsupported |
| ALTER AUTHORIZATION | Unsupported |
| ALTER DATABASE | Unsupported |
| ALTER DATABASE options | Unsupported |
| ALTER FUNCTION | Unsupported |
| ALTER INDEX | Unsupported |
| ALTER PROCEDURE | Unsupported |
| ALTER ROLE | Unsupported |
| ALTER SCHEMA | Unsupported |
| ALTER SERVER CONFIGURATION | Unsupported |
| ALTER SERVER ROLE | Supported: `SYSADMIN` |
| ALTER TABLE | Supported: `DROP CONSTRAINT`, `DROP COLUMN`, `ADD COLUMN/CONSTRAINT`, `ADD COLUMN`, `ALTER COLUMN`, `ENABLE TRIGGER`, `DISABLE TRIGGER` |
| ALTER TRIGGER | Unsupported |
| ALTER VIEW | Unsupported |
| Aggregate functions | Supported: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`, `COUNT_BIG`, `CUME_DIST`, `DENSE_RANK`, `DENSE_RANK`, `DISTINCT`, `FIRST_VALUE`, `GROUPING`, `LAG`, `LAST_VALUE`, `LEAD`, `NTILE`, `PERCENTILE_CONT`, `PERCENTILE_DISC`, `PERCENT_RANK`, `RANK`, `ROW_NUMBER`, `STRING_AGG` |
| BULK INSERT | Unsupported |
| CHECKSUM | Unsupported |
| CLOSE KEY | Unsupported |
| CLUSTERED index | Unsupported |
| COLUMNPROPERTY | Unsupported |
| CONNECTIONPROPERTY | Supported: `arg1=net_transport`, `protocol_type`, `auth_scheme`, `local_tcp_port` |
| CREATE DATABASE options | Supported: `COLLATE`, `CONTAINMENT=NONE` |
| CREATE ROLE | Unsupported |
| CREATE SERVER ROLE | Unsupported |
| CURSOR parameters | Unsupported |
| Case-sensitive collation | Supported: `COLUMN`, `EXPRESSION` |
| Column attribute | Unsupported |
| Compound operator containing whitespace | Unsupported |
| Cross-database reference | Unsupported |
| Cursor options | Supported: `FORWARD_ONLY`, `STATIC`, `LOCAL`, `READ_ONLY`, `INSENSITIVE` |
| DATABASEPROPERTYEX | Supported: `arg2=Collation`, `Edition`, `IsAutoClose`, `IsAutoCreateStatistics`, `IsInStandBy`, `IsTornPageDetectionEnabled`, `Status`, `Updateability`, `Version` |
| DATEADD | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MINUTE`, `MM`, `MONTH`, `N`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `W`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |
| DATEDIFF | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |
| DATENAME | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |
| DATEPART | Supported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |
| DB role options | Unsupported |
| DB roles | Unsupported |
| DBA statements | Unsupported |
| DBCC statements | Unsupported |
| DELETE | Supported: `TOP`, `CTE`, `OUTPUT` |
| DENY | Unsupported |
| DESC constraint | Unsupported |
| DISABLE TRIGGER | Unsupported |
| DML Table Source | Unsupported |
| DROP IF EXISTS | Supported: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION`, `DATABASE`, `INDEX` |
| DROP INDEX | Supported: `INDEX ON TABLE` |
| DROP multiple objects | Supported: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION` |
| Datatypes | Unsupported |
| Delimited database name | Unsupported |
| Double-quoted string | Supported: `STRING` |
| ENABLE TRIGGER | Unsupported |
| EXECUTE AS | Unsupported |
| EXECUTE SQL function | Unsupported |
| Execute procedure options | Supported: `RESULT SETS`, `RESULT SETS NONE`, `RESULT SETS UNDEFINED` |
| Execute string options | Unsupported |
| FETCH cursor | Supported: `NEXT` |
| FK constraint referencing DB name | Unsupported |
| FOR REPLICATION | Unsupported |
| Features in computed columns | Unsupported |
| Function options | Supported: `RETURNS NULL ON NULL INPUT`, `CALLED ON NULL INPUT`, `WITHOUT SCHEMABINDING` |
| GLOBAL cursor | Unsupported |
| GRANT | Unsupported |
| GROUP BY ALL | Unsupported |
| GROUP BY ROLLUP/CUBE (old syntax) | Unsupported |
| Global Temporary Tables | Unsupported |
| HASHBYTES | Supported: `arg1=MD5`, `SHA1`, `SHA2_256`, `SHA2_512` |
| HIERARCHYID features | Unsupported |
| IGNORE_DUP_KEY index | Unsupported |
| INDEXKEY_PROPERTY | Supported: `arg4=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| INDEXPROPERTY | Unsupported |
| INFORMATION_SCHEMA | Unsupported |
| INSERT | Supported: `VALUES`, `SELECT`, `EXECUTE PROCEDURE`, `CTE`, `OUTPUT` |
| INSERT BULK | Unsupported |
| Index attribute | Unsupported |
| Index options | Unsupported |
| Indexed view | Unsupported |
| Inline index | Unsupported |
| Instead-Of Trigger | Unsupported |
| JSON features | Unsupported |
| Join hint | Unsupported |
| LIKE '[...]' | Unsupported |
| LOGINPROPERTY | Supported: `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| Lateral join | Unsupported |
| Leading dots in identifier | Unsupported |
| Line continuation character | Unsupported |
| Login options | Supported: `PASSWORD`, `DEFAULT_DATABASE`, `DEFAULT_LANGUAGE`, `ENABLE`, `DISABLE` |
| MERGE | Unsupported |
| Materialized view | Unsupported |
| Maximum columns per index | Supported: `32` |
| Maximum identifier length | Supported: `63` |
| Maximum parameters per function | Supported: `100` |
| Maximum parameters per procedure | Supported: `100` |
| Maximum precision IDENTITY column | Supported: `18` |
| Miscellaneous objects | Supported: `SEQUENCE`, `LOGIN` |
| NEXT VALUE FOR | Unsupported |
| NONCLUSTERED HASH index | Unsupported |
| NOT FOR REPLICATION | Unsupported |
| NUMERIC/DECIMAL column with non-numeric default | Unsupported |
| Non-PERSISTED computed columns | Unsupported |
| Nullable column | Unsupported |
| Numeric assignment to datetime variable/parameter/column | Unsupported |
| Numeric representation of datetime | Unsupported |
| OBJECTPROPERTY | Unsupported |
| OBJECTPROPERTYEX | Unsupported |
| ODBC Outer Join | Unsupported |
| ODBC literal | Unsupported |
| ODBC scalar function | Unsupported |
| OPEN KEY | Unsupported |
| Parameter value DEFAULT | Unsupported |
| Partitioning | Unsupported |
| Procedure options | Supported: `WITHOUT SCHEMABINDING` |
| Procedure versioning (declaration) | Unsupported |
| Procedure versioning (execution) | Unsupported |
| Query hint | Unsupported |
| READTEXT | Unsupported |
| REVOKE | Unsupported |
| Regular variable named @@v | Supported: `0`, `102`, `132`, `133`, `134`, `135`, `136`, `141`, `142`, `153`, `155`, `180`, `217`, `219`, `220`, `232`, `266`, `289`, `293`, `306`, `346`, `352`, `477`, `487`, `506`, `512`, `515`, `517`, `545`, `547`, `550`, `556`, `574`, `628`, `1034`, `1049`, `1051`, `1205`, `1505`, `1715`, `1752`, `1765`, `1768`, `1776`, `1778`, `1801`, `1946`, `2627`, `2714`, `2732`, `2747`, `2787`, `3609`, `3616`, `3623`, `3701`, `3723`, `3726`, `3728`, `3729`, `3732`, `3902`, `3903`, `3914`, `3930`, `4514`, `4708`, `4712`, `4901`, `4920`, `6401`, `8003`, `8004`, `8007`, `8009`, `8011`, `8016`, `8018`, `8023`, `8028`, `8029`, `8031`, `8032`, `8037`, `8043`, `8047`, `8050`, `8057`, `8058`, `8106`, `8107`, `8115`, `8134`, `8143`, `8152`, `8159`, `8179`, `9441`, `9451`, `9809`, `10610`, `10727`, `10733`, `10793`, `11555`, `11700`, `11701`, `11702`, `11703`, `11705`, `11706`, `11708`, `11709`, `11717`, `16901`, `16902`, `16903`, `16915`, `16916`, `16948`, `16950`, `18456` |
| Remote object reference | Unsupported |
| SCHEMA options | Unsupported |
| SCHEMA_ID with N arguments | Supported: `1` |
| SCHEMA_NAME with N arguments | Supported: `1` |
| SECURITY DEFINER transaction mgmt | Unsupported |
| SELECT TOP PERCENT | Supported: `100` |
| SELECT TOP WITH TIES | Unsupported |
| SELECT TOP in Table-Valued Function | Unsupported |
| SELECT TOP without ORDER BY | Unsupported |
| SELECT..PIVOT | Unsupported |
| SELECT..UNPIVOT | Unsupported |
| SEQUENCE options | Unsupported |
| SERVERPROPERTY | Supported: `arg1=Collation`, `CollationID`, `Edition`, `IsSingleUser`, `ServerName`, `Babelfish` |
| SET ANSI_NULL_DFLT_OFF | Supported: `OFF` |
| SET ANSI_NULL_DFLT_ON | Supported: `ON` |
| SET ANSI_PADDING | Supported: `ON` |
| SET ANSI_WARNINGS | Supported: `ON` |
| SET ARITHABORT | Supported: `ON` |
| SET ARITHIGNORE | Supported: `OFF` |
| SET CONTEXT_INFO | Unsupported |
| SET CURSOR_CLOSE_ON_COMMIT | Supported: `OFF` |
| SET DATEFORMAT | Unsupported |
| SET DEADLOCK_PRIORITY | Unsupported |
| SET FMTONLY | Unsupported |
| SET LANGUAGE | Supported: `english`, `us_english` |
| SET LOCK_TIMEOUT | Unsupported |
| SET NOEXEC | Supported: `OFF` |
| SET NO_BROWSETABLE | Unsupported |
| SET NUMERIC_ROUNDABORT | Supported: `OFF` |
| SET OFFSETS | Unsupported |
| SET PARSEONLY | Unsupported |
| SET QUERY_GOVERNOR_COST_LIMIT | Unsupported |
| SET QUOTED_IDENTIFIER in batch | Unsupported |
| SET ROWCOUNT | Supported: `0` |
| SET SHOWPLAN_ALL | Unsupported |
| SET STATISTICS | Unsupported |
| SET TEXTSIZE | Unsupported |
| SET TRANSACTION ISOLATION LEVEL | Supported: `READ COMMITTED`, `READ UNCOMMITTED`, `SNAPSHOT` |
| SETUSER | Unsupported |
| SQL graph | Unsupported |
| SQL_VARIANT_PROPERTY | Supported: `arg2=*` |
| STRING_AGG() WITHIN GROUP | Supported: `arg1=SINGLE ARGUMENT` |
| Server role options | Supported: `ADD MEMBER`, `DROP MEMBER` |
| Service Broker | Unsupported |
| Special characters in identifier | Unsupported |
| Special characters in parameter | Unsupported |
| Special column names | Unsupported |
| Syntax Issues | Unsupported |
| System Functions | Supported: `fn_helpcollations`, `fn_listextendedproperty` |
| T-SQL Outer Join operator | Unsupported |
| TIMESTAMP column without column name | Supported: `XML`, `CURSOR` |
| TRIGGER_NESTLEVEL with N arguments | Unsupported |
| TYPEPROPERTY | Supported: `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| Table hint | Unsupported |
| Table value constructor | Unsupported |
| Temporal table | Unsupported |
| Temporary procedures | Unsupported |
| Traceflags | Unsupported |
| Transactions | Supported: `TRANSACTION NAME IN VARIABLE` |
| Transition table reference for multi-DML trigger | Unsupported |
| Trigger created with schema name | Unsupported |
| Trigger options | Supported: `WITHOUT SCHEMABINDING` |
| UPDATE | Supported: `TOP`, `CTE`, `OUTPUT` |
| UPDATE STATISTICS | Unsupported |
| UPDATETEXT | Unsupported |
| Unquoted string | Unsupported |
| User options | Unsupported |
| Variable aggregates across rows | Unsupported |
| Variable assignment dependency | Unsupported |
| Variable procedure name | Unsupported |
| View options | Supported: `SCHEMABINDING` |
| WAITFOR | Unsupported |
| WRITETEXT | Unsupported |
| XML features | Supported: `SELECT FOR XML PATH`, `SELECT FOR XML RAW` |
| expression AT TIME ZONE | Unsupported |
