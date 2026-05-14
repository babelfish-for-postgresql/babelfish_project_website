---
layout: default
title: Connecting to Babelfish
nav_order: 1
---

## Using client tools to connect to Babelfish

You can use a SQL Server client to connect with Babelfish on the TDS port.
When connecting from a Windows system, SQL Server Management Studio (SSMS) or
`sqlcmd` are good choices of clients.  If you are connecting to the TDS port
from a Linux system, `sqlcmd` is a good choice.

Other clients that speak the TDS protocol can also be used, but are not
officially supported by Babelfish.  On Linux, these include the FreeTDS command
line tool `tsql`.

You can use any PostgreSQL client to connect to Babelfish on the PostgreSQL
port.  `psql` and pgAdmin are examples of open-source clients that run on
Windows and Linux platforms and speak the PostgreSQL protocol.