---
layout: default
title: Unsupported	Features, Version 1.2.0
nav_order: 1
---

## Babelfish Version 1.2.0

| Feature | Options | 
| ------- | ------- | 
| ::function call (old syntax) | Unsupported |
| @@variable | Supported: `@@VERSION`, `@@SPID`, `@@ROWCOUNT`, `@@TRANCOUNT`, `@@IDENTITY`, `@@ERROR`, `@@FETCH_STATUS`, `@@MAX_PRECISION`, `@@SERVERNAME`, `@@DATEFIRST`, `@@OPTIONS`, `@@MICROSOFTVERSION`, `@@PROCID`, `@@MAX_CONNECTIONS`, `@@NESTLEVEL`, `@@CURSOR_ROWS`, `@@DBTS`, `@@LOCK_TIMEOUT`, `@@SERVICENAME` |
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
| ALTER SERVER ROLE | Unsupported: `SYSADMIN` |
| ALTER TABLE | Unsupported: `DROP CONSTRAINT`, `DROP COLUMN`, `ADD COLUMN/CONSTRAINT`, `ADD COLUMN`, `ALTER COLUMN`, `ENABLE TRIGGER`, `DISABLE TRIGGER` |
| ALTER TRIGGER | Unsupported |
| ALTER VIEW | Unsupported |
| Aggregate functions | Unsupported: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`, `COUNT_BIG`, `CUME_DIST`, `DENSE_RANK`, `DENSE_RANK`, `DISTINCT`, `FIRST_VALUE`, `GROUPING`, `LAG`, `LAST_VALUE`, `LEAD`, `NTILE`, `PERCENTILE_CONT`, `PERCENTILE_DISC`, `PERCENT_RANK`, `RANK`, `ROW_NUMBER`, `STRING_AGG` |
| BULK INSERT | Unsupported |
| CHECKPOINT | Unsupported |
| CHECKSUM | Unsupported |
| CLOSE KEY | Unsupported |
| CLUSTERED index | Unsupported |
| COLLATIONPROPERTY | Unsupported |
| COLUMNPROPERTY | Unsupported: `arg3=CharMaxLen`, `AllowsNull` |
| CONNECTIONPROPERTY | Supported: `arg1=net_transport`, `protocol_type`, `auth_scheme`, `local_tcp_port`, `arg1=physical_net_transport`, `client_net_address` |
| CREATE DATABASE options | Unsupported: `COLLATE`, `CONTAINMENT=NONE` |
| CREATE ROLE | Unsupported |
| CREATE SERVER ROLE | Unsupported |
| CURSOR parameters | Unsupported |
| CURSOR variables | Unsupported |
| Case-sensitive collation | Unsupported: `COLUMN`, `EXPRESSION` |
| Column attribute | Unsupported |
| Compound operator containing whitespace | Unsupported |
| Cross-database reference | Unsupported |
| Cursor options | Unsupported: `FORWARD_ONLY`, `STATIC`, `LOCAL`, `READ_ONLY`, `INSENSITIVE` |
| DATABASEPROPERTYEX | Unsupported: `arg2=Collation`, `Edition`, `IsAutoClose`, `IsAutoCreateStatistics`, `IsInStandBy`, `IsTornPageDetectionEnabled`, `Status`, `Updateability`, `Version` |
| DATEADD | Unsupported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MINUTE`, `MM`, `MONTH`, `N`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `W`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |
| DATEDIFF | Unsupported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY` |
| DATENAME | Unsupported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |
| DATEPART | Unsupported: `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY` |
| DB role options | Unsupported |
| DB roles | Unsupported |
| DBA statements | Unsupported |
| DBCC statements | Unsupported |
| DELETE | Unsupported: `TOP`, `CTE`, `OUTPUT` |
| DENY | Unsupported |
| DESC constraint | Unsupported |
| DISABLE TRIGGER | Unsupported |
| DML Table Source | Unsupported |
| DROP IF EXISTS | Supported: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION`, `DATABASE`, `INDEX`, `SCHEMA`, `DATABASE`, `USER` |
| DROP INDEX | Unsupported: `INDEX ON TABLE` |
| DROP multiple objects | Unsupported: `TABLE`, `VIEW`, `PROCEDURE`, `FUNCTION` |
| Datatypes | Unsupported |
| Delimited database name | Unsupported |
| Double-quoted string | Unsupported: `STRING` |
| ENABLE TRIGGER | Unsupported |
| EXECUTE AS | Unsupported |
| EXECUTE SQL function | Unsupported |
| Execute procedure options | Unsupported: `RESULT SETS`, `RESULT SETS NONE`, `RESULT SETS UNDEFINED` |
| Execute string options | Unsupported |
| FETCH cursor | Unsupported: `NEXT` |
| FK constraint referencing DB name | Unsupported |
| FOR REPLICATION | Unsupported |
| Features in computed columns | Unsupported |
| Function options | Unsupported: `RETURNS NULL ON NULL INPUT`, `CALLED ON NULL INPUT`, `WITHOUT SCHEMABINDING` |
| GLOBAL cursor | Unsupported |
| GOTO | Unsupported |
| GRANT | Supported: `ALL PRIVILEGES ON OBJECT`, `SELECT ON OBJECT`, `INSERT ON OBJECT`, `UPDATE ON OBJECT`, `DELETE ON OBJECT`, `REFERENCES ON OBJECT`, `EXECUTE ON OBJECT` |
| GROUP BY ALL | Unsupported |
| GROUP BY ROLLUP/CUBE (old syntax) | Unsupported |
| Global Temporary Tables | Unsupported |
| HASHBYTES | Unsupported: `arg1=MD5`, `SHA1`, `SHA2_256`, `SHA2_512` |
| HIERARCHYID features | Unsupported |
| IGNORE_DUP_KEY index | Unsupported |
| INDEXKEY_PROPERTY | Unsupported: `arg4=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| INDEXPROPERTY | Unsupported |
| INFORMATION_SCHEMA | Supported: `TABLES`, `COLUMNS`, `DOMAINS`, `TABLE_CONSTRAINTS` |
| INSERT | Unsupported: `VALUES`, `SELECT`, `EXECUTE PROCEDURE`, `CTE`, `OUTPUT` |
| INSERT BULK | Unsupported |
| Index attribute | Unsupported |
| Index options | Unsupported |
| Indexed view | Unsupported |
| Inline index | Unsupported |
| Instead-Of Trigger | Supported: `TABLE` |
| JSON features | Unsupported |
| Join hint | Unsupported |
| LIKE '[...]' | Unsupported |
| LOGINPROPERTY | Unsupported: `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| Lateral join | Unsupported |
| Leading dots in identifier | Unsupported |
| Line continuation character | Unsupported |
| Login options | Unsupported: `PASSWORD`, `DEFAULT_DATABASE`, `DEFAULT_LANGUAGE`, `ENABLE`, `DISABLE` |
| MERGE | Unsupported |
| MONEY literal | Unsupported |
| Materialized view | Unsupported |
| Maximum columns per index | Unsupported: `32` |
| Maximum identifier length | Unsupported: `63` |
| Maximum parameters per function | Unsupported: `100` |
| Maximum parameters per procedure | Unsupported: `100` |
| Maximum precision IDENTITY column | Unsupported: `18` |
| Miscellaneous objects | Supported: `SEQUENCE`, `LOGIN`, `USER` |
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
| Procedure options | Unsupported: `WITHOUT SCHEMABINDING` |
| Procedure versioning (declaration) | Unsupported |
| Procedure versioning (execution) | Unsupported |
| Query hint | Unsupported |
| READTEXT | Unsupported |
| REVOKE | Supported: `ALL PRIVILEGES ON OBJECT`, `SELECT ON OBJECT`, `INSERT ON OBJECT`, `UPDATE ON OBJECT`, `DELETE ON OBJECT`, `REFERENCES ON OBJECT`, `EXECUTE ON OBJECT`, `CASCADE` |
| Regular variable named @@v | Supported: `0`, `102`, `132`, `133`, `134`, `135`, `136`, `141`, `142`, `153`, `155`, `180`, `217`, `219`, `220`, `232`, `266`, `289`, `293`, `306`, `346`, `352`, `477`, `487`, `506`, `512`, `515`, `517`, `545`, `547`, `550`, `556`, `574`, `628`, `1034`, `1049`, `1051`, `1205`, `1505`, `1715`, `1752`, `1765`, `1768`, `1776`, `1778`, `1801`, `1946`, `2627`, `2714`, `2732`, `2747`, `2787`, `3609`, `3616`, `3623`, `3701`, `3723`, `3726`, `3728`, `3729`, `3732`, `3902`, `3903`, `3914`, `3930`, `4514`, `4708`, `4712`, `4901`, `4920`, `6401`, `8003`, `8004`, `8007`, `8009`, `8011`, `8016`, `8018`, `8023`, `8028`, `8029`, `8031`, `8032`, `8037`, `8043`, `8047`, `8050`, `8057`, `8058`, `8106`, `8107`, `8115`, `8134`, `8143`, `8152`, `8159`, `8179`, `9441`, `9451`, `9809`, `10610`, `10727`, `10733`, `10793`, `11555`, `11700`, `11701`, `11702`, `11703`, `11705`, `11706`, `11708`, `11709`, `11717`, `16901`, `16902`, `16903`, `16915`, `16916`, `16948`, `16950`, `18456`, `201`, `206`, `2733`, `8144`, `8145`, `8146` |
| Remote object reference | Unsupported |
| SCHEMA options | Supported: `AUTHORIZATION` |
| SCHEMA_ID with N arguments | Supported: `1`, `0` |
| SCHEMA_NAME with N arguments | Unsupported: `1`, `0` |
| SECURITY DEFINER transaction mgmt | Unsupported |
| SELECT TOP PERCENT | Unsupported: `100` |
| SELECT TOP WITH TIES | Unsupported |
| SELECT TOP in Table-Valued Function | Unsupported |
| SELECT TOP without ORDER BY | Unsupported |
| SELECT..PIVOT | Unsupported |
| SELECT..UNPIVOT | Unsupported |
| SEQUENCE options | Unsupported |
| SERVERPROPERTY | Supported: `arg1=Collation`, `CollationID`, `Edition`, `IsSingleUser`, `ServerName`, `Babelfish`, `arg1=EditionID`, `EngineEdition`, `LicenseType`, `ProductVersion`, `ProductMajorVersion`, `ProductMinorVersion`, `IsIntegratedSecurityOnly`, `IsLocalDB`, `IsAdvancedAnalyticsInstalled`, `IsBigDataCluster`, `IsPolyBaseInstalled`, `IsFullTextInstalled`, `IsXTPSupported` |
| SESSIONPROPERTY | Unsupported |
| SET ANSI_NULLS | Unsupported |
| SET ANSI_NULL_DFLT_OFF | Unsupported: `OFF` |
| SET ANSI_NULL_DFLT_ON | Unsupported: `ON` |
| SET ANSI_PADDING | Unsupported: `ON` |
| SET ANSI_WARNINGS | Unsupported: `ON` |
| SET ARITHABORT | Unsupported: `ON` |
| SET ARITHIGNORE | Unsupported: `OFF` |
| SET CONCAT_NULL_YIELDS_NULL | Unsupported |
| SET CONTEXT_INFO | Unsupported |
| SET CURSOR_CLOSE_ON_COMMIT | Unsupported: `OFF` |
| SET DATEFIRST | Unsupported |
| SET DATEFORMAT | Unsupported |
| SET DEADLOCK_PRIORITY | Unsupported |
| SET FMTONLY | Unsupported |
| SET IDENTITY_INSERT | Unsupported |
| SET IMPLICIT_TRANSACTIONS | Unsupported |
| SET LANGUAGE | Unsupported: `english`, `us_english` |
| SET LOCK_TIMEOUT | Fully supported in this version |
| SET NOCOUNT | Unsupported |
| SET NOEXEC | Unsupported: `OFF` |
| SET NO_BROWSETABLE | Unsupported |
| SET NUMERIC_ROUNDABORT | Unsupported: `OFF` |
| SET OFFSETS | Unsupported |
| SET PARSEONLY | Unsupported |
| SET QUERY_GOVERNOR_COST_LIMIT | Unsupported |
| SET QUOTED_IDENTIFIER | Unsupported |
| SET QUOTED_IDENTIFIER in batch | Unsupported |
| SET ROWCOUNT | Unsupported: `0` |
| SET SHOWPLAN_ALL | Unsupported |
| SET STATISTICS | Unsupported |
| SET TEXTSIZE | Unsupported |
| SET TRANSACTION ISOLATION LEVEL | Unsupported: `READ COMMITTED`, `READ UNCOMMITTED`, `SNAPSHOT` |
| SET XACT_ABORT | Unsupported |
| SET, multiple options combined | Unsupported |
| SETUSER | Unsupported |
| SQL graph | Unsupported |
| SQL_VARIANT_PROPERTY | Unsupported: `arg2=*` |
| STRING_AGG() WITHIN GROUP | Supported: `arg1=SINGLE ARGUMENT`, `arg1=STAR`, `MULTIPLE ARGUMENTS` |
| Server role options | Unsupported: `ADD MEMBER`, `DROP MEMBER` |
| Service Broker | Unsupported |
| Special characters in identifier | Unsupported |
| Special characters in parameter | Unsupported |
| Special column names | Unsupported |
| Syntax Issues | Unsupported |
| System Functions | Supported: `fn_helpcollations`, `fn_listextendedproperty`, `sp_statistics`, `sp_statistics_100`, `sp_updatestats`, `sp_pkeys`, `sp_databases`, `sp_cursor`, `sp_cursoropen`, `sp_cursorprepare`, `sp_cursorexecute`, `sp_cursorprepexec`, `sp_cursorunprepare`, `sp_cursorfetch`, `sp_cursoroption`, `sp_cursorclose`, `sp_table_privileges`, `sp_column_privileges`, `sp_special_columns`, `sp_fkeys`, `sp_pkeys`, `sp_stored_procedures`, `xp_qv`, `sp_describe_undeclared_parameters`, `sp_helpuser` |
| T-SQL Outer Join operator | Unsupported |
| TIMESTAMP column without column name | Supported: `XML`, `CURSOR`, `*` |
| TRIGGER_NESTLEVEL with N arguments | Unsupported: `0` |
| TRUNCATE TABLE | Unsupported |
| TYPEPROPERTY | Unsupported: `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` |
| Table hint | Unsupported |
| Table value constructor | Unsupported |
| Table variables | Unsupported |
| Temporal table | Unsupported |
| Temporary procedures | Unsupported |
| Traceflags | Unsupported |
| Transactions | Unsupported: `TRANSACTION NAME IN VARIABLE` |
| Transition table reference for multi-DML trigger | Unsupported |
| Trigger created with schema name | Unsupported |
| Trigger options | Unsupported: `WITHOUT SCHEMABINDING` |
| UPDATE | Unsupported: `TOP`, `CTE`, `OUTPUT` |
| UPDATE STATISTICS | Unsupported |
| UPDATETEXT | Unsupported |
| Unquoted string | Unsupported |
| User options | Supported: `FOR LOGIN`, `DEFAULT_SCHEMA` |
| Variable aggregates across rows | Unsupported |
| Variable assignment dependency | Unsupported |
| Variable procedure name | Unsupported |
| View options | Unsupported: `SCHEMABINDING` |
| WAITFOR | Unsupported |
| WRITETEXT | Unsupported |
| XML features | Unsupported: `SELECT FOR XML PATH`, `SELECT FOR XML RAW` |
| expression AT TIME ZONE | Unsupported |
