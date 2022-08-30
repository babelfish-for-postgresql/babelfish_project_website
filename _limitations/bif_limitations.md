---
layout: default
title: Unsupported Built-in Functions 
nav_order: 3
---

## Unsupported Built-in Functions

Babelfish provides limited support for system-implemented built-in functions. The following lists detail the functionality implemented for each version of Babelfish (and subsequent releases).

The following built-in functions are supported for versions 2.1.0 and higher: 

- IS_MEMBER()
- IS_ROLEMEMBER()
- HAS_PERMS_BY_NAME() 

The following built-in functions are supported for versions 1.2.0 and higher: 

- COLUMNS_UPDATED()
- UPDATE()
- FULLTEXTSERVICEPROPERTY()
- ISJSON()
- JSON_QUERY()
- JSON_VALUE()
- HAS_DBACCESS()
- SUSER_SID()
- SUSER_SNAME()
- IS_SRVROLEMEMBER()

The following built-in functions are supported for versions 1.0.0 and higher:

- `SQUARE()`
- `CONCAT_WS()`
- `DATEFROMPARTS()`
- `DATETIMEFROMPARTS()`
- `ORIGINAL_LOGIN()`
- `SESSION_USER()`
- `CHOOSE()`
- `CURSOR_STATUS()`
- `SCHEMA_NAME()`
- `TRIGGER_NESTLEVEL()` is supported but only without arguments.

