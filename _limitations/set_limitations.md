---
layout: default
title: SET Statement Limitations 
nav_order: 2
---

## Differences between Babelfish and SQL Server

In this chapter, you will learn about functional differences between PostgreSQL with Babelfish
and SQL Server.

The following table contains a list of SQL Server features that are currently
not implemented or partially implemented in Babelfish.  This list is subject to change.

| Functionality or Syntax | Behavior              | Workaround | 
| ----------------------- | --------------------- | --------------------- |
| `SET ANSI_NULL_DFLT_OFF ON` | This setting is not supported. | |
| `SET ANSI_NULL_DFLT_ON OFF` | This setting is not supported. | |
| `SET ANSI_PADDING OFF` | This setting is not supported. | |
| `SET ANSI_WARNINGS OFF` | This setting is not supported. | |
| `SET ARITHABORT OFF` | This setting is not supported. | |
| `SET ARITHIGNORE ON` | This setting is not supported. | |
| `SET CONTEXT_INFO` | This syntax is not supported. | |
| `SET CURSOR_CLOSE_ON_COMMIT ON` | This setting is not supported. | |
| `SET DATEFORMAT` | This syntax is not supported. | |
| `SET DEADLOCK_PRIORITY` | This syntax is not supported. | |
| `SET FORCEPLAN` | This syntax is not supported. | |
| `SET FMTONLY` | Version 1.2.0 and later, `SET FMTONLY ON/OFF` applies only to `SELECT *` queries, and is ignored for all other queries. | |
| `SET LANGUAGE` |  This syntax is not supported with any value other than `english` or `us_english`. | |
| `SET LOCK_TIMEOUT` | This syntax is supported in version 1.2.0 | |
| `SET NO BROWSETABLE` | This syntax is not supported. | |
| `SET NUMERIC_ROUNDABORT ON` | This syntax is not supported. | |
| `SET REMOTE_PROC_TRANSACTIONS` | This syntax is not supported. | |
| `SET ROWCOUNT n WHERE n != 0` | This syntax is not supported. | |
| `SET ROWCOUNT @variable` | This syntax is not supported. | |
| `SET SHOWPLAN_ALL` | This syntax is not supported. | |
| `SET SHOWPLAN_TEXT` | This syntax is not supported. | |
| `SET SHOWPLAN_XML` | This syntax is not supported. | |
| `SET STATISTICS` | This syntax is not supported. | |
| `SET STATISTICS IO` | This syntax is not supported. | |
| `SET STATISTICS PROFILE` | This syntax is not supported. | |
| `SET STATISTICS TIME` | This syntax is not supported. | |
| `SET STATISTICS XML` | This syntax is not supported. | |
| `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ` | This syntax is not supported. | |
| `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE` | This syntax is not supported. | |
| `SET OFFSETS` | This syntax is not supported. | |
| `SETUSER` statements | `SETUSER` statements are not supported. | |
