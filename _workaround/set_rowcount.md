---
layout: default
title: SET ROWCOUNT
nav_order: 1
---

## SET ROWCOUNT

If your queries make use of the SQL Server `SET_ROWCOUNT` clause, you can use the `TOP` clause instead. For example, the following code snippet:

```sql
SET ROWCOUNT @N;
SELECT foo
FROM   bar;
```

Can be replaced with the following syntax:

```sql
SELECT TOP (@N) foo
FROM   bar;
```

You can also use `TOP` to replace `SET ROWCOUNT` in ad hoc queries; for example, in a `DELETE` statement:

```sql

DELETE TOP (@N) FROM table [WHERE condition];
```

Similarly, you can use `TOP` in an `UPGRADE` statement:

```sql
UPDATE TOP (@N) table SET field = value
```

Unlike `TOP`, the `SET ROWCOUNT` clause persists for the life of a connection; to return a complete result set after using `SET ROWCOUNT`, you must reset the rowcount to `0`. If you are using `TOP` as a replacement for `SET ROWCOUNT`, note that you must specify `TOP` each time you wish to limit the number of rows in a query.

For more information about using Babelfish from the TDS port and the PostgreSQL port, [visit the Babelfish website](https://babelfishpg.org/docs/usage/interoperability/).
