---
layout: default
title: Unsupported SET Statements 
nav_order: 2
---

## Unsupported SET statements

The following SET statements are available for use with Babelfish versions 1.2.0 and higher:

- `SET FMTONLY` - `SET FMTONLY ON/OFF` applies only to `SELECT *` queries, and is ignored for all other queries.
- `SET LOCK_TIMEOUT`

The following SET statement limitations apply:

- `SET LANGUAGE` - This syntax is not supported with any value other than `english` or `us_english`. 


The following SET statements are not implemented by Babelfish: 

- `SET ANSI_NULL_DFLT_OFF ON`
- `SET ANSI_NULL_DFLT_ON OFF`
- `SET ANSI_PADDING OFF`
- `SET ANSI_WARNINGS OFF`
- `SET ARITHABORT OFF`
- `SET ARITHIGNORE ON`
- `SET CONTEXT_INFO`
- `SET CURSOR_CLOSE_ON_COMMIT ON`
- `SET DATEFORMAT`
- `SET DEADLOCK_PRIORITY`
- `SET FORCEPLAN`
- `SET NO BROWSETABLE`
- `SET NUMERIC_ROUNDABORT ON`
- `SET REMOTE_PROC_TRANSACTIONS`
- `SET ROWCOUNT n WHERE n != 0`
- `SET ROWCOUNT @variable`
- `SET SHOWPLAN_ALL`
- `SET SHOWPLAN_TEXT`
- `SET SHOWPLAN_XML`
- `SET STATISTICS`
- `SET STATISTICS IO`
- `SET STATISTICS PROFILE`
- `SET STATISTICS TIME`
- `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ`
- `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE`
- `SET OFFSETS`
- `SETUSER`

