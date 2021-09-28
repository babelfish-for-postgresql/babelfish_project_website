---
layout: default
title: Compatibility
parent: Architecture
nav_order: 9
has_children: false
permalink: /docs/architecture/compatibility
---

# Babelfish Compatibility

## Compatibility between SQL Server and PostgreSQL

Babelfish ensures compatibility of SQL Server features by implementing SQL Server data types and functions directly in PostgreSQL. Babelfish supports the same wire-level protocol as SQL Server, which enables SQL Server applications to transparently communicate with PostgreSQL. By taking this approach, you can continue to use the same SQL Server query and development tools that you're familiar with. Babelfish is compatible with SQL Server Management Studio (SSMS), the SQL Server language dialect T-SQL, and SQL Server database drivers.

Babelfish currently supports only the SQL Server Database Engine component of Microsoft SQL Server. Babelfish doesn't currently support other SQL Server components. In other words, it doesn't support SQL Server Integration Services, SQL Server Business Intelligence (BI), SQL Server Reporting Services, or SQL Server Analysis Services.

The following table includes features of the SQL Server database engine component and describes the behavior differences for Babelfish.

| SQL Server feature | SQL Server standard behavior | Babelfish behavior differences |
| ------------------ | ---------------------------- | ------------------------------ |
| Application roles | Application roles are set with CREATE APPLICATION ROLE or sp_setapprole | Currently not supported. |
| COMPATIBILITY_LEVEL | Backwards compatibility is set with COMPATIBILITY_LEVEL | ALTER DATABASE... SET COMPATIBILITY LEVEL will be accepted and ignored. |
| sysdatabases.cmptlevel | sysdatabases.cmptlevel | ALTER DATABASE... SET COMPATIBILITY LEVEL will be accepted and ignored. |
| Hints | SQL Server supports table hints, query hints, and join hints. | Accepted and ignored. |
| Assembly modules and CLR routines | Assembly modules and common language runtime (CLR) routines are not supported (CREATE ASSEMBLY). | Currently not supported. |
| Backup and restore |  | PostgreSQL snapshots of a database aren't compatible with backup files created in SQL Server. Also, the granularity of when the backup and restore occurs might be different between SQL Server and PostgreSQL. |
| bcp Bulk copy BULK INSERT | SQL Server uses the bulk copy bcp When exporting, bcp When importing, bcp bulk copy SQL INSERT | Currently not supported. The SQL statement BULK INSERT bcp Note that this limitation also affects 3rd party products that use the bulk copy API such as extract, transform, and load (ETL) tools. |
| Blank column names when there is no column alias | SQL Server allows column names to be blank when sending a result set to a client application. This can happen when the column is an expression involving more than a table column reference and no column alias is specified. | The sqlcmd psql SQL Server sqlcmd PostgreSQL psql |
| Case-sensitivity for identifiers | By default, SQL Server is case-insensitive for identifiers. So MyTable MYTABLE MyTable MYTABLE | For PostgreSQL, only case-insensitive identifiers are supported. For example, the identifiers MyTable MYTABLE If your SQL Server database is configured to be case-sensitive for identifiers, Babelfish will identify MyTable MYTABLE |
| Column default | SQL Server supports creating a column default with an explicitly specified constraint name. For example: ALTER TABLE ADD CONSTRAINT...DEFAULT...FOR... SQL Server also supports dropping the default using that same name. ALTER TABLE...DROP CONSTRAINT... | PostgreSQL handles column defaults differently than SQL Server, and there is no constraint name associated with a column default. Therefore, when creating a column default this way, the constraint name is ignored. ALTER TABLE...ALTER COLUMN..DROP DEFAULT... |
| Common language runtime (CLR) | SQL Server supports Microsoft common language runtime (CLR) procedures, functions, and triggers. | Currently not supported. |
| Constraints | SQL Server supports enabling and disabling individual constraints such as the following. ALTER TABLE...[NO]CHECK CONSTRAINT... | PostgreSQL doesn't support enabling and disabling individual constraints. The statement is ignored and a warning is raised. |
| Contained databases | Contained databases have logins authenticated at the database level rather than at the server level. | Currently not supported. |
| Data encryption | Encrypting data in the database. An example is for an entire database with CREATE DATABASE ENCRYPTION KEY (TDE) or for finer-grained encryption with ENCRYPTBYKEY, CREATE SYMMETRIC KEY, and so on, isn't supported. | Currently not supported. |
| IDENTITY columns support | IDENTITY tinyint smallint int bigint numeric decimal SQL Server supports precision up to 38 for data types numeric decimal | PostgreSQL supports precision up to 19 for data types numeric decimal |
| Identifiers exceeding 63 characters | SQL Server supports using up to 128 characters for identifiers. | PostgreSQL supports a maximum of 63 characters for identifiers. Babelfish converts identifiers longer than 63 characters to a name that uses a hash of the original name. Use the original name with T-SQL but the converted name when accessing the database using PostgreSQL. |
| Language customization | SQL Server supports using a non-default language for error messages and for day and month names. | For PostgreSQL, only English error messages and date names are currently supported. |
| NEWSEQUENTIALID() | SQL Server supports the NEWSEQUENTIALID() | When calling NEWSEQUENTIALID() NEWID() |
| Procedure or function parameter limit | SQL Server supports up to 2100 parameters for a SQL stored procedure or SQL function. | PostgreSQL supports a maximum of 100 parameters for a procedure or function. |
| Remote object access | SQL Server can access objects on a remote server including tables, views, and procedures. | Currently not supported. |
| ROWGUIDCOL |  | Currently ignored. Queries referencing $GUIDGOL |
| Row-level security |  | Row-level security with CREATE SECURITY POLICY and inline table-valued functions is currently not supported. |
| SEQUENCE | SEQUENCE tinyint smallint int bigint numeric decimal SQL Server supports precision up to 38 for data types numeric decimal SEQUENCE | PostgreSQL supports precision up to 19 for data types numeric decimal SEQUENCE |
| SQL keywords CLUSTERED UNCLUSTERED |  | Currently not supported. PostgreSQL ignores CLUSTERED UNCLUSTERED |
| SQL keyword FILLFACTOR | Related to SQL Server-specific aspects of data storage. | Currently ignored. |
| SQL keyword NONCLUSTERED | SQL Server uses NONCLUSTERED | Currently ignored. PostgreSQL supports heap structures. |
| SQL keyword clause NOT FOR REPLICATION | Related to SQL Server-specific aspects of data storage. | Currently ignored. |
| SQL keyword clause ON filegroup | For SQL Server, the commands CREATE TABLE CREATE INDEX ON filegroup | Currently ignored because it is irrelevant for PostgreSQL. |
| SQL keyword SPARSE | Related to SQL Server-specific aspects of data storage. | Currently ignored. |
| SQL keyword TEXTIMAGE_ON filegroup | For SQL Server, the commands CREATE TABLE CREATE INDEX TEXTIMAGE_ON filegroup | PostgreSQL ignores the TEXTIMAGE_ON filegroup |
| SQL statement USE database-name |  | Currently not supported. |
| Sort order with DESC | SQL Server allows the column sorting order in UNIQUE PRIMARY KEY DESC | PostgreSQL doesn't support DESC ASC DESC |
| Time precision | SQL Server supports fractions of a second for precision of the datetime2 SQL Server rounds this to 3-millisecond precision. This means that when you store a particular time value, the milliseconds might be rounded and end up being stored differently than what you specified. For example, the command SELECT CAST('2016-12-26 23:59:59.999' as datetime) | PostgreSQL supports 6-digit precision for fractional seconds. PostgreSQL doesn't perform SQL Server 3-millisecond rounding. No adverse effects are anticipated with this behavior. |
| Transaction isolation levels | Choosing a transaction isolation level doesn't affect the locks that are acquired to protect data modifications. A transaction always gets an exclusive lock on any data it modifies and holds that lock until the transaction completes, regardless of the isolation level set for that transaction. For read operations, transaction isolation levels primarily define the level of protection from the effects of modifications made by other transactions. |  |
| Transaction isolation level read committed | SQL Server uses locks and DB reader instances can block on DB writer instances. | PostgreSQL uses multi-version concurrency control |
| Transaction isolation level read committed (with read_committed_snapshot | With the read_committed_snapshot ON | PostgreSQL uses multi-version concurrency control |
| Transaction isolation level read uncommitted | SQL Server allows reading uncommitted data. | The syntax will work for PostgreSQL but it internally maps this transaction isolation level to a read committed. |
| Transaction isolation level repeatable read | SQL Server uses locks and concurrent updates that can lead to deadlock-based termination. | Currently not supported. |
| Transaction isolation level serializable | SQL Server uses serial execution order. | Currently not supported. |
| Transaction isolation level snapshot | In SQL Server, concurrent updates lead to snapshot conflict-based termination. | Babelfish uses a repeatable read transaction for the SQL Server snapshot. This is transaction-level read consistency. Repeatable read is equivalent to snapshot isolation level in PostgreSQL. |
| Triggers for LOGON and DDL |  | Currently not supported. |
| @@version |  | The contents of @@version @@version |

