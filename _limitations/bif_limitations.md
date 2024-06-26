---
layout: default
title: Built-in Functions 
nav_order: 10
---

## Supported Built-in Functions

Babelfish provides limited support for system-implemented built-in functions. The following lists detail the functionality implemented for each version of Babelfish (and subsequent releases).

The following built-in functions are supported for versions 2.1.0 and higher: 

- `IS_MEMBER()`
- `IS_ROLEMEMBER()`
- `HAS_PERMS_BY_NAME()` 

The following built-in functions are supported for versions 1.2.0 and higher: 

- `COLUMNS_UPDATED()`
- `UPDATE()`
- `FULLTEXTSERVICEPROPERTY()`
- `ISJSON()`
- `JSON_QUERY()`
- `JSON_VALUE()`
- `HAS_DBACCESS()`
- `SUSER_SID()`
- `SUSER_SNAME()`
- `IS_SRVROLEMEMBER()`

The following built-in functions are supported for versions 1.1.0 and higher:

- `CONCAT_WS`
- `DATEFROMPARTS`
- `DATETIMEFROMPARTS`
- `ORIGINAL_LOGIN`
- `SESSION_USER`
- `SQUARE`
- `CHOOSE`
- `TRIGGER_NESTLEVEL`
- `CURSOR_STATUS`

The following built-in functions are supported for versions 1.0.0 and higher:

- `ABS`
- `ACOS`
- `ASCII`
- `ASIN`
- `ATAN`
- `APPLOCK_MODE`
- `APPLOCK_TEST`
- `CAST`
- `CEILING`
- `CHAR`
- `CHARINDEX`
- `CHECKSUM`
- `COALESCE`
- `CONCAT`
- `CONVERT`
- `COS`
- `COT`
- `CURRENT_TIMESTAMP`
- `CURRENT_USER`
- `USER`
- `DATALENGTH`
- `DATEADD`
- `DATEDIFF`
- `DATENAME`
- `DATEPART`
- `DAY`
- `DB_ID`
- `DB_NAME`
- `SUSER_ID`
- `SUSER_NAME`
- `USER_ID`
- `USER_NAME`
- `DEFAULT_DOMAIN`
- `DEGREES`
- `EXP`
- `ERROR_LINE`
- `ERROR_MESSAGE`
- `ERROR_NUMBER`
- `ERROR_PROCEDURE`
- `ERROR_SEVERITY`
- `ERROR_STATE`
- `FLOOR`
- `GETDATE`
- `GETUTCDATE`
- `IIF`
- `ISDATE`
- `ISNULL`
- `ISNUMERIC`
- `LEFT`
- `LEN`
- `LOG`
- `LOG10`
- `LOWER`
- `LTRIM`
- `MONTH`
- `NCHAR`
- `NEWID`
- `NULLIF`
- `OBJECT_ID`
- `OBJECT_NAME`
- `PATINDEX`
- `PI`
- `POWER`
- `RADIANS`
- `RAND`
- `REPLACE`
- `REPLICATE`
- `REVERSE`
- `RIGHT`
- `ROUND`
- `RTRIM`
- `SCOPE_IDENTITY`
- `IDENT_CURRENT`
- `IDENT_INCR`
- `IDENT_SEED`
- `SCHEMA_ID`
- `SCHEMA_NAME`
- `SERVERPROPERTY`
- `SIGN`
- `SIN`
- `SPACE`
- `SQRT`
- `STRING_AGG`
- `STRING_SPLIT`
- `STUFF`
- `SUBSTRING`
- `SYSDATETIME`
- `SYSDATETIMEOFFSET`
- `SYSUTCDATETIME`
- `TAN`
- `TRIM`
- `TRY_CAST`
- `TRY_PARSE`
- `UPPER`
- `YEAR`
- `QUOTENAME`
- `XACT_STATE`
- `STRING_ESCAPE`
- `DATABASEPROPERTYEX`
- `CONNECTIONPROPERTY`
- `SQL_VARIANT_PROPERTY`
- `SESSIONPROPERTY`
- `COLLATIONPROPERTY`
- `UNICODE`

- `TRIGGER_NESTLEVEL()` is supported but only without arguments.


## Unsupported Built-in Functions

The following Built-in functions are not supported:


- `ASSEMBLYPROPERTY`
- `ASYMKEYPROPERTY`
- `ASYMKEY_ID`
- `ATN2`
- `BINARY_CHECKSUM`
- `CAST`
- `CERTENCODED`
- `CERTPROPERTY`
- `CERT_ID`
- `CHOOSE`
- `COALESCE`
- `COLLATIONPROPERTY`
- `COLUMNPROPERTY`
- `COLUMNS_UPDATED`
- `COL_LENGTH`
- `COL_NAME`
- `COMPRESS`
- `CONTAINS`
- `CONTAINSTABLE`
- `CONTEXT_INFO`
- `CONVERT`
- `CURRENT_REQUEST_ID`
- `CURRENT_TIMEZONE`
- `CURRENT_TIMEZONE_ID`
- `CURRENT_TRANSACTION_ID`
- `DATABASEPROPERTY`
- `DATABASE_PRINCIPAL_ID`
- `DATEDIFF_BIG`
- `DATETIME2FROMPARTS`
- `DATETIMEOFFSETFROMPARTS`
- `DECOMPRESS`
- `DIFFERENCE`
- `EOMONTH`
- `EVENTDATA`
- `FILEGROUPPROPERTY`
- `FILEGROUP_ID`
- `FILEGROUP_NAME`
- `FILEPROPERTY`
- `FILEPROPERTYEX`
- `FILE_ID`
- `FILE_IDEX`
- `FILE_NAME`
- `FN_GET_SQL`
- `FORMAT`
- `FORMATMESSAGE`
- `GETANSINULL`
- `GET_FILESTREAM_TRANSACTION_CONTEXT`
- `HASHBYTES`
- `HOST_ID`
- `HOST_NAME`
- `IDENTITY`
- `IIF`
- `INDEXKEY_PROPERTY`
- `INDEXPROPERTY`
- `INDEX_COL`
- `IS_OBJECTSIGNED`
- `JSON`
- `JSON_MODIFY`
- `KEY_GUID`
- `KEY_ID`
- `KEY_NAME`
- `LOGINPROPERTY`
- `MIN_ACTIVE_ROWVERSION`
- `NEWSEQUENTIALID`
- `NULLIF`
- `OBJECTPROPERTY`
- `OBJECTPROPERTYEX`
- `OBJECT_DEFINITION`
- `OBJECT_SCHEMA_NAME`
- `OPENDATASOURCE`
- `OPENJSON`
- `OPENQUERY`
- `OPENROWSET`
- `OPENXML`
- `ORIGINAL_DB_NAME`
- `PARSE`
- `PARSENAME`
- `PARTITION`
- `PERMISSIONS`
- `PUBLISHINGSERVERNAME`
- `REVERSE`
- `ROWCOUNT_BIG`
- `SESSION_CONTEXT`
- `SIGNBYASYMKEY`
- `SIGNBYCERT`
- `SMALLDATETIMEFROMPARTS`
- `SOUNDEX`
- `STATS_DATE`
- `STR`
- `SID_BINARY`
- `SWITCHOFFSET`
- `SYMKEYPROPERTY`
- `SYSTEM_USER`
- `TERTIARY_WEIGHTS`
- `TEXTPTR`
- `TEXTVALID`
- `TIMEFROMPARTS`
- `TODATETIMEOFFSET`
- `TRANSLATE`
- `TRY_CONVERT`
- `TRY_PARSE`
- `TYPEPROPERTY`
- `TYPE_ID`
- `TYPE_NAME`
- `UPDATE`
- `VERIFYSIGNEDBYASMKEY`
- `VERIFYSIGNEDBYCERT`
- `VERIGYSIGNEDBYCERT`
- `CHANGETABLE`
- `CHANGE_TRACKING_MIN_VALID_VERSION`
- `CHANGE_TRACKING_CURRENT_VERSION`
- `CHANGE_TRACKING_IS_COLUMN_IN_MASK`
- `CHANGE_TRACKING_CONTEXT`
- `DEFAULT_DOMAIN`
- `FILETABLEROOTPATH`
- `GETFILENAMESPACEPATH`
- `GETPATHLOCATOR`
- `PATHNAME`
- `CONTAINSTABLE`
- `FREETEXT`
- `FREETEXTTABLE`
- `SEMANTICKEYPHRASETABLE`
- `SEMANTICSIMILARITYDETAILSTABLE`
- `SEMANTICSIMILARITYTABLE`
- `FULLTEXTCATALOGPROPERTY`
- `FULLTEXTSERVICEPROPERTY`
- `ENCRYPTBYASYMKEY`
- `ENCRYPTBYCERT`
- `ENCRYPTBYKEY`
- `ENCRYPTBYPASSPHRASE`
- `PWDCOMPARE`
- `PWDENCRYPT`
- `DECRYPTBYASYMKEY`
- `DECRYPTBYCERT`
- `DECRYPTBYKEY`
- `DECRYPTBYKEYAUTOASYMKEY`
- `DECRYPTBYKEYAUTOCERT`
- `DECRYPTBYPASSPHRASE`
- `DECRYPTBYKEYAUTOCERT`
- `PREDICT`
