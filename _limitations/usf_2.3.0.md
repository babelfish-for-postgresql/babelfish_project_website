---
layout: default
title: Version 2.3.0
nav_order: 1
---

## Babelfish Version 2.3.0

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
| CREATE DATABASE options | Unsupported : `ALLOW_SNAPSHOT_ISOLATION`, `ANSI_NULLS`, `ANSI_NULL_DEFAULT`, `ANSI_PADDING`, `ANSI_WARNINGS`, `ARITHABORT`, `AUTO_CLOSE`, `AUTO_SHRINK`, `AUTO_UPDATE_STATISTICS`, `AUTO_UPDATE_STATISTICS_ASYNC`, `CATALOG_COLLATION`, `CATALOG_COLLATION DATABASE_DEFAULT`, `COMPATIBILITY_LEVEL`, `CONCAT_NULL_YIELDS_NULL`, `CONTAINMENT=PARTIAL`, `CURSOR_CLOSE_ON_COMMIT`, `CURSOR_DEFAULT`, `DATE_CORRELATION_OPTIMIZATION`, `DB_CHAINING`, `DELAYED_DURABILITY`, `DISABLE_BROKER`, `FILESTREAM`, `HONOR_BROKER_PRIORITY`, `MULTI_USER`, `NUMERIC_ROUNDABORT`, `PAGE_VERIFY`, `PARAMETERIZATION`, `QUERY_STORE`, `QUOTED_IDENTIFIER`, `READ_COMMITTED_SNAPSHOT`, `RECOVERY`, `RECURSIVE_TRIGGERS`, `TARGET_RECOVERY_TIME`, `TRUSTWORTHY` | |
| CREATE SERVER ROLE | Unsupported | |
| CURSOR parameters | Unsupported | |
| Case-sensitive collation | Unsupported : `CATALOG_COLLATION`, `DATABASE`, `SERVER` | |
| Column attribute | Unsupported | |
| Compound operator containing whitespace | Unsupported | |
| Cross-database reference | Unsupported : `ALTER TABLE`, `CREATE INDEX`, `CREATE TABLE`, `DROP INDEX`, `MERGE`, `TRUNCATE TABLE`, `UPDATE STATISTICS` | |
| Cursor options | Unsupported : `DYNAMIC`, `FAST_FORWARD`, `FOR UPDATE`, `KEYSET`, `OPTIMISTIC`, `SCROLL`, `SCROLL_LOCKS`, `TYPE_WARNING` |[Dynamically defined cursor workaround](https://babelfishpg.org/docs/workaround/dynamically_defined_cursor/) |
| DATABASEPROPERTYEX | Supported : `arg2=Collation`, `Edition`, `IsAutoClose`, `IsAutoCreateStatistics`, `IsInStandBy`, `IsTornPageDetectionEnabled`, `Status`, `Updateability`, `Version` | |
| DATEADD | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MINUTE`, `MM`, `MONTH`, `N`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY`, `arg1=MILLISECOND`, `MS`, `W`, `arg1=MI` | |
| DATEDIFF | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DY`, `HH`, `HOUR`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `WEEK`, `WK`, `WW`, `Y`, `YEAR`, `YY`, `YYYY`, `arg1=W`, `arg1=MI` | |
| DATENAME | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY`, `arg1=W`, `arg1=Y`, `MI` | |
| DATEPART | Supported : `arg1=D`, `DAY`, `DAYOFYEAR`, `DD`, `DW`, `DY`, `HH`, `HOUR`, `ISO_WEEK`, `ISOWK`, `ISOWW`, `M`, `MCS`, `MICROSECOND`, `MILLISECOND`, `MINUTE`, `MM`, `MONTH`, `MS`, `N`, `NANOSECOND`, `NS`, `Q`, `QQ`, `QUARTER`, `S`, `SECOND`, `SS`, `TZ`, `TZOFFSET`, `WEEK`, `WEEKDAY`, `WK`, `WW`, `YEAR`, `YY`, `YYYY`, `arg1=W`, `arg1=Y`, `MI` | |
| DB role options | Unsupported : `AUTHORIZATION` | |
| DB roles | Unsupported | |
| DBA statements | Unsupported | |
| DBCC statements | Unsupported | |
| DELETE | Unsupported : `OPENDATASOURCE`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `TABLE FUNCTION`, `WHERE CURRENT OF` | |
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
| FORMAT() culture | Supported : `aa`, `aa-DJ`, `aa-ER`, `aa-ET`, `af`, `af-NA`, `af-ZA`, `agq`, `agq-CM`, `ak`, `ak-GH`, `am`, `am-ET`, `ar`, `ar-001`, `ar-AE`, `ar-BH`, `ar-DJ`, `ar-DZ`, `ar-EG`, `ar-ER`, `ar-IL`, `ar-IQ`, `ar-JO`, `ar-KM`, `ar-KW`, `ar-LB`, `ar-LY`, `ar-MA`, `ar-MR`, `ar-OM`, `ar-PS`, `ar-QA`, `ar-SA`, `ar-SD`, `ar-SO`, `ar-SS`, `ar-SY`, `ar-TD`, `ar-TN`, `ar-YE`, `arn`, `arn-CL`, `as`, `as-IN`, `asa`, `asa-TZ`, `ast`, `ast-ES`, `az`, `az-Cyrl`, `az-Cyrl-AZ`, `az-Latn`, `az-Latn-AZ`, `ba`, `ba-RU`, `bas`, `bas-CM`, `be`, `be-BY`, `bem`, `bem-ZM`, `bez`, `bez-TZ`, `bg`, `bg-BG`, `bin`, `bin-NG`, `bm`, `bm-Latn`, `bm-Latn-ML`, `bn`, `bn-BD`, `bn-IN`, `bo`, `bo-CN`, `bo-IN`, `br`, `br-FR`, `brx`, `brx-IN`, `bs`, `bs-Cyrl`, `bs-Cyrl-BA`, `bs-Latn`, `bs-Latn-BA`, `byn`, `byn-ER`, `ca`, `ca-AD`, `ca-ES`, `ca-ES-valencia`, `ca-FR`, `ca-IT`, `ce`, `ce-RU`, `cgg`, `cgg-UG`, `chr`, `chr-Cher`, `chr-Cher-US`, `co`, `co-FR`, `cs`, `cs-CZ`, `cu`, `cu-RU`, `cy`, `cy-GB`, `da`, `da-DK`, `da-GL`, `dav`, `dav-KE`, `de`, `de-AT`, `de-BE`, `de-CH`, `de-DE`, `de-IT`, `de-LI`, `de-LU`, `dje`, `dje-NE`, `dsb`, `dsb-DE`, `dua`, `dua-CM`, `dv`, `dv-MV`, `dyo`, `dyo-SN`, `dz`, `dz-BT`, `ebu`, `ebu-KE`, `ee`, `ee-GH`, `ee-TG`, `el`, `el-CY`, `el-GR`, `en`, `en-001`, `en-029`, `en-150`, `en-AG`, `en-AI`, `en-AS`, `en-AT`, `en-AU`, `en-BB`, `en-BE`, `en-BI`, `en-BM`, `en-BS`, `en-BW`, `en-BZ`, `en-CA`, `en-CC`, `en-CH`, `en-CK`, `en-CM`, `en-CX`, `en-CY`, `en-DE`, `en-DK`, `en-DM`, `en-ER`, `en-FI`, `en-FJ`, `en-FK`, `en-FM`, `en-GB`, `en-GD`, `en-GG`, `en-GH`, `en-GI`, `en-GM`, `en-GU`, `en-GY`, `en-HK`, `en-ID`, `en-IE`, `en-IL`, `en-IM`, `en-IN`, `en-IO`, `en-JE`, `en-JM`, `en-KE`, `en-KI`, `en-KN`, `en-KY`, `en-LC`, `en-LR`, `en-LS`, `en-MG`, `en-MH`, `en-MO`, `en-MP`, `en-MS`, `en-MT`, `en-MU`, `en-MW`, `en-MY`, `en-NA`, `en-NF`, `en-NG`, `en-NL`, `en-NR`, `en-NU`, `en-NZ`, `en-PG`, `en-PH`, `en-PK`, `en-PN`, `en-PR`, `en-PW`, `en-RW`, `en-SB`, `en-SC`, `en-SD`, `en-SE`, `en-SG`, `en-SH`, `en-SI`, `en-SL`, `en-SS`, `en-SX`, `en-SZ`, `en-TC`, `en-TK`, `en-TO`, `en-TT`, `en-TV`, `en-TZ`, `en-UG`, `en-UM`, `en-US`, `en-VC`, `en-VG`, `en-VI`, `en-VU`, `en-WS`, `en-ZA`, `en-ZM`, `en-ZW`, `eo`, `eo-001`, `es`, `es-419`, `es-AR`, `es-BO`, `es-BR`, `es-BZ`, `es-CL`, `es-CO`, `es-CR`, `es-CU`, `es-DO`, `es-EC`, `es-ES`, `es-GQ`, `es-GT`, `es-HN`, `es-MX`, `es-NI`, `es-PA`, `es-PE`, `es-PH`, `es-PR`, `es-PY`, `es-SV`, `es-US`, `es-UY`, `es-VE`, `et`, `et-EE`, `eu`, `eu-ES`, `ewo`, `ewo-CM`, `fa`, `fa-IR`, `ff`, `ff-CM`, `ff-GN`, `ff-Latn`, `ff-Latn-SN`, `ff-MR`, `ff-NG`, `fi`, `fi-FI`, `fil`, `fil-PH`, `fo`, `fo-DK`, `fo-FO`, `fr`, `fr-029`, `fr-BE`, `fr-BF`, `fr-BI`, `fr-BJ`, `fr-BL`, `fr-CA`, `fr-CD`, `fr-CF`, `fr-CG`, `fr-CH`, `fr-CI`, `fr-CM`, `fr-DJ`, `fr-DZ`, `fr-FR`, `fr-GA`, `fr-GF`, `fr-GN`, `fr-GP`, `fr-GQ`, `fr-HT`, `fr-KM`, `fr-LU`, `fr-MA`, `fr-MC`, `fr-MF`, `fr-MG`, `fr-ML`, `fr-MQ`, `fr-MR`, `fr-MU`, `fr-NC`, `fr-NE`, `fr-PF`, `fr-PM`, `fr-RE`, `fr-RW`, `fr-SC`, `fr-SN`, `fr-SY`, `fr-TD`, `fr-TG`, `fr-TN`, `fr-VU`, `fr-WF`, `fr-YT`, `fur`, `fur-IT`, `fy`, `fy-NL`, `ga`, `ga-IE`, `gd`, `gd-GB`, `gl`, `gl-ES`, `gn`, `gn-PY`, `gsw`, `gsw-CH`, `gsw-FR`, `gsw-LI`, `gu`, `gu-IN`, `guz`, `guz-KE`, `gv`, `gv-IM`, `ha`, `ha-Latn`, `ha-Latn-GH`, `ha-Latn-NE`, `ha-Latn-NG`, `haw`, `haw-US`, `he`, `he-IL`, `hi`, `hi-IN`, `hr`, `hr-BA`, `hr-HR`, `hsb`, `hsb-DE`, `hu`, `hu-HU`, `hy`, `hy-AM`, `ia`, `ia-001`, `ia-FR`, `ibb`, `ibb-NG`, `id`, `id-ID`, `ig`, `ig-NG`, `ii`, `ii-CN`, `is`, `is-IS`, `it`, `it-CH`, `it-IT`, `it-SM`, `it-VA`, `iu`, `iu-Cans`, `iu-Cans-CA`, `iu-Latn`, `iu-Latn-CA`, `ja`, `ja-JP`, `jgo`, `jgo-CM`, `jmc`, `jmc-TZ`, `jv`, `jv-Java`, `jv-Java-ID`, `jv-Latn`, `jv-Latn-ID`, `ka`, `ka-GE`, `kab`, `kab-DZ`, `kam`, `kam-KE`, `kde`, `kde-TZ`, `kea`, `kea-CV`, `khq`, `khq-ML`, `ki`, `ki-KE`, `kk`, `kk-KZ`, `kkj`, `kkj-CM`, `kl`, `kl-GL`, `kln`, `kln-KE`, `km`, `km-KH`, `kn`, `kn-IN`, `ko`, `ko-KP`, `ko-KR`, `kok`, `kok-IN`, `kr`, `kr-NG`, `ks`, `ks-Arab`, `ks-Arab-IN`, `ks-Deva`, `ks-Deva-IN`, `ksb`, `ksb-TZ`, `ksf`, `ksf-CM`, `ksh`, `ksh-DE`, `ku`, `ku-Arab`, `ku-Arab-IQ`, `ku-Arab-IR`, `kw`, `kw-GB`, `ky`, `ky-KG`, `la`, `la-001`, `lag`, `lag-TZ`, `lb`, `lb-LU`, `lg`, `lg-UG`, `lkt`, `lkt-US`, `ln`, `ln-AO`, `ln-CD`, `ln-CF`, `ln-CG`, `lo`, `lo-LA`, `lrc`, `lrc-IQ`, `lrc-IR`, `lt`, `lt-LT`, `lu`, `lu-CD`, `luo`, `luo-KE`, `luy`, `luy-KE`, `lv`, `lv-LV`, `mas`, `mas-KE`, `mas-TZ`, `mer`, `mer-KE`, `mfe`, `mfe-MU`, `mg`, `mg-MG`, `mgh`, `mgh-MZ`, `mgo`, `mgo-CM`, `mi`, `mi-NZ`, `mk`, `mk-MK`, `ml`, `ml-IN`, `mn`, `mn-Cyrl`, `mn-MN`, `mn-Mong`, `mn-Mong-CN`, `mn-Mong-MN`, `mni`, `mni-IN`, `moh`, `moh-CA`, `mr`, `mr-IN`, `ms`, `ms-BN`, `ms-MY`, `ms-SG`, `mt`, `mt-MT`, `mua`, `mua-CM`, `my`, `my-MM`, `mzn`, `mzn-IR`, `naq`, `naq-NA`, `nb`, `nb-NO`, `nb-SJ`, `nd`, `nd-ZW`, `nds`, `nds-DE`, `nds-NL`, `ne`, `ne-IN`, `ne-NP`, `nl`, `nl-AW`, `nl-BE`, `nl-BQ`, `nl-CW`, `nl-NL`, `nl-SR`, `nl-SX`, `nmg`, `nmg-CM`, `nn`, `nn-NO`, `nnh`, `nnh-CM`, `no`, `nqo`, `nqo-GN`, `nr`, `nr-ZA`, `nso`, `nso-ZA`, `nus`, `nus-SS`, `nyn`, `nyn-UG`, `oc`, `oc-FR`, `om`, `om-ET`, `om-KE`, `or`, `or-IN`, `os`, `os-GE`, `os-RU`, `pa`, `pa-Arab`, `pa-Arab-PK`, `pa-Guru`, `pa-IN`, `pap`, `pap-029`, `pl`, `pl-PL`, `prg`, `prg-001`, `prs`, `prs-AF`, `ps`, `ps-AF`, `pt`, `pt-AO`, `pt-BR`, `pt-CH`, `pt-CV`, `pt-GQ`, `pt-GW`, `pt-LU`, `pt-MO`, `pt-MZ`, `pt-PT`, `pt-ST`, `pt-TL`, `quc`, `quc-Latn`, `quc-Latn-GT`, `quz`, `quz-BO`, `quz-EC`, `quz-PE`, `rm`, `rm-CH`, `rn`, `rn-BI`, `ro`, `ro-MD`, `ro-RO`, `rof`, `rof-TZ`, `ru`, `ru-BY`, `ru-KG`, `ru-KZ`, `ru-MD`, `ru-RU`, `ru-UA`, `rw`, `rw-RW`, `rwk`, `rwk-TZ`, `sa`, `sa-IN`, `sah`, `sah-RU`, `saq`, `saq-KE`, `sbp`, `sbp-TZ`, `sd`, `sd-Arab`, `sd-Arab-PK`, `sd-Deva`, `sd-Deva-IN`, `se`, `se-FI`, `se-NO`, `se-SE`, `seh`, `seh-MZ`, `ses`, `ses-ML`, `sg`, `sg-CF`, `shi`, `shi-Latn`, `shi-Latn-MA`, `shi-Tfng`, `shi-Tfng-MA`, `si`, `si-LK`, `sk`, `sk-SK`, `sl`, `sl-SI`, `sma`, `sma-NO`, `sma-SE`, `smj`, `smj-NO`, `smj-SE`, `smn`, `smn-FI`, `sms`, `sms-FI`, `sn`, `sn-Latn`, `sn-Latn-ZW`, `so`, `so-DJ`, `so-ET`, `so-KE`, `so-SO`, `sq`, `sq-AL`, `sq-MK`, `sq-XK`, `sr`, `sr-Cyrl`, `sr-Cyrl-BA`, `sr-Cyrl-ME`, `sr-Cyrl-RS`, `sr-Cyrl-XK`, `sr-Latn`, `sr-Latn-BA`, `sr-Latn-ME`, `sr-Latn-RS`, `sr-Latn-XK`, `ss`, `ss-SZ`, `ss-ZA`, `ssy`, `ssy-ER`, `st`, `st-LS`, `st-ZA`, `sv`, `sv-AX`, `sv-FI`, `sv-SE`, `sw`, `sw-CD`, `sw-KE`, `sw-TZ`, `sw-UG`, `syr`, `syr-SY`, `ta`, `ta-IN`, `ta-LK`, `ta-MY`, `ta-SG`, `te`, `te-IN`, `teo`, `teo-KE`, `teo-UG`, `tg`, `tg-Cyrl`, `tg-Cyrl-TJ`, `th`, `th-TH`, `ti`, `ti-ER`, `ti-ET`, `tig`, `tig-ER`, `tk`, `tk-TM`, `tn`, `tn-BW`, `tn-ZA`, `to`, `to-TO`, `tr`, `tr-CY`, `tr-TR`, `ts`, `ts-ZA`, `tt`, `tt-RU`, `twq`, `twq-NE`, `tzm`, `tzm-Arab`, `tzm-Arab-MA`, `tzm-Latn`, `tzm-Latn-DZ`, `tzm-Latn-MA`, `tzm-Tfng`, `tzm-Tfng-MA`, `ug`, `ug-CN`, `uk`, `uk-UA`, `ur`, `ur-IN`, `ur-PK`, `uz`, `uz-Arab`, `uz-Arab-AF`, `uz-Cyrl`, `uz-Cyrl-UZ`, `uz-Latn`, `uz-Latn-UZ`, `vai`, `vai-Latn`, `vai-Latn-LR`, `vai-Vaii`, `vai-Vaii-LR`, `ve`, `ve-ZA`, `vi`, `vi-VN`, `vo`, `vo-001`, `vun`, `vun-TZ`, `wae`, `wae-CH`, `wal`, `wal-ET`, `wo`, `wo-SN`, `xh`, `xh-ZA`, `xog`, `xog-UG`, `yav`, `yav-CM`, `yi`, `yi-001`, `yo`, `yo-BJ`, `yo-NG`, `zgh`, `zgh-Tfng`, `zgh-Tfng-MA`, `zh`, `zh-CN`, `zh-Hans`, `zh-Hans-HK`, `zh-Hans-MO`, `zh-Hant`, `zh-HK`, `zh-MO`, `zh-SG`, `zh-TW`, `zu`, `zu-ZA`, `zh-CHS`, `zh-CHT` | |
| Features in computed columns | Unsupported | |
| Function options | Unsupported : `ATOMIC NATIVELY COMPILED`, `CLR`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `INLINE`, `SCHEMABINDING` | |
| GLOBAL cursor | Unsupported | |
| GRANT | Supported : `ALL PRIVILEGES ON OBJECT`, `SELECT ON OBJECT`, `INSERT ON OBJECT`, `UPDATE ON OBJECT`, `DELETE ON OBJECT`, `REFERENCES ON OBJECT`, `EXECUTE ON OBJECT`, `CONNECT` | |
| GROUP BY ROLLUP/CUBE (old syntax) | Unsupported | |
| Geospatial features | Unsupported | |
| Global Temporary Tables | Unsupported | |
| HASHBYTES | Supported : `arg1=MD5`, `SHA1`, `SHA2_256`, `SHA2_512` | |
| HIERARCHYID features | Unsupported | |
| IGNORE_DUP_KEY index | Unsupported | |
| INDEXKEY_PROPERTY | Supported : `arg4=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` | |
| INDEXPROPERTY | Supported : `arg3=IndexFillFactor`, `IndexID`, `IsClustered`, `IsDisabled`, `IsHypothetical`, `IsPadIndex`, `IsPageLockDisallowed`, `IsRowLockDisallowed`, `IsUnique` | |
| INFORMATION_SCHEMA | Unsupported : `COLUMN_PRIVILEGES`, `CONSTRAINT_TABLE_USAGE`, `DOMAIN_CONSTRAINTS`, `KEY_COLUMN_USAGE`, `PARAMETERS`, `REFERENTIAL_CONSTRAINTS`, `ROUTINE_COLUMNS`, `SCHEMATA`, `TABLE_PRIVILEGES`, `VIEW_COLUMN_USAGE`, `VIEW_TABLE_USAGE` | |
| INSERT | Unsupported : `DEFAULT VALUES`, `EXECUTE SP_EXECUTESQL`, `EXECUTE(EXPRESSION)`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `TABLE FUNCTION`, `TOP` | |
| INSERT BULK | Unsupported | |
| Index attribute | Unsupported | |
| Index options | Unsupported | |
| Indexed view | Unsupported | |
| Inline index | Unsupported | |
| Instead-Of Trigger | Unsupported : `VIEW` | |
| JSON features | Unsupported : `SELECT FOR JSON AUTO`, `SELECT FOR JSON AUTO INCLUDE_NULL_VALUES`, `SELECT FOR JSON AUTO ROOT`, `SELECT FOR JSON AUTO WITHOUT_ARRAY_WRAPPER` | |
| Join hint | Supported : `LOOP`, `MERGE`, `HASH` | |
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
| Miscellaneous objects | Unsupported : `AGGREGATE`, `APPLICATION ROLE`, `ASSEMBLY`, `ASYMMETRIC KEY`, `AVAILABILITY GROUP`, `CERTIFICATE`, `COLUMN ENCRYPTION KEY`, `COLUMN MASTER KEY`, `CONTRACT`, `CREDENTIAL`, `CRYPTOGRAPHIC PROVIDER`, `DATABASE SCOPED CREDENTIAL`, `DEFAULT`, `DIAGNOSTIC SESSION`, `EXTERNAL DATA SOURCE`, `EXTERNAL LIBRARY`, `EXTERNAL RESOURCE POOL`, `FULLTEXT CATALOG`, `FULLTEXT INDEX`, `FULLTEXT STOPLIST`, `MASTER KEY`, `MESSAGE TYPE`, `QUEUE`, `QUEUE`, `REMOTE SERVICE BINDING`, `RESOURCE GOVERNOR`, `ROUTE`, `RULE`, `SERVER AUDIT`, `SERVER AUDIT SPECIFICATION`, `SERVER ROLE`, `SERVICE`, `SERVICE MASTER KEY`, `SYMMETRIC KEY`, `SYNONYM`, `WORKLOAD CLASSIFIER`, `WORKLOAD GROUP` | |
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
| Query hint | Supported : `LOOP JOIN`, `MERGE JOIN`, `HASH JOIN`, `MAXDOP` | |
| READTEXT | Unsupported | |
| REVOKE | Supported : `ALL PRIVILEGES ON OBJECT`, `SELECT ON OBJECT`, `INSERT ON OBJECT`, `UPDATE ON OBJECT`, `DELETE ON OBJECT`, `REFERENCES ON OBJECT`, `EXECUTE ON OBJECT`, `CASCADE`, `CONNECT` | |
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
| Scalar UDF in table DDL | Unsupported : ` ALTER TABLE DEFAULT` | |
| Server role options | Unsupported : `AUTHORIZATION`, `NAME` | |
| Service Broker | Unsupported | |
| Special characters in identifier | Unsupported | |
| Special characters in parameter | Unsupported | |
| Special column names | Unsupported | |
| Syntax Issues | Unsupported | |
| T-SQL Outer Join operator | Unsupported | |
| TRIGGER_NESTLEVEL with N arguments | Supported : `0` | |
| TYPEPROPERTY | Supported : `arg2=NO_SUPPORTED_ARGUMENTS_RIGHT_NOW` | |
| Table hint | Supported : `INDEX_NAME` | |
| Temporal table | Unsupported | |
| Temporary procedures | Unsupported | |
| Traceflags | Unsupported | |
| Transactions | Unsupported : `BEGIN DISTRIBUTED TRANSACTION`, `DELAYED_DURABILITY`, `MARK` | |
| Trigger options | Unsupported : `APPEND`, `ENCRYPTION`, `EXECUTE AS CALLER`, `EXECUTE AS OWNER`, `EXECUTE AS SELF`, `EXECUTE AS USER`, `EXTERNAL`, `NATIVE_COMPILATION`, `SCHEMABINDING` | |
| UPDATE | Unsupported : `OPENDATASOURCE`, `OPENQUERY`, `OPENROWSET`, `OUTPUT OUTPUT`, `TABLE FUNCTION`, `WHERE CURRENT OF` | |
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
| XML features | Unsupported : `EXIST`, `MODIFY`, `NODES`, `QUERY`, `SELECT FOR XML AUTO`, `SELECT FOR XML AUTO ELEMENTS`, `SELECT FOR XML EXPLICIT`, `SELECT FOR XML PATH ELEMENTS`, `SELECT FOR XML RAW ELEMENTS`, `SELECTIVE XML INDEX`, `VALUE`, `WITH XMLNAMESPACES`, `XML COLUMN_SET FOR ALL_SPARSE_COLUMNS`, `XML INDEX`, `XML SCHEMA COLLECTION`, `XML TYPE DEFINITION` | |
| expression AT TIME ZONE | Unsupported | |
