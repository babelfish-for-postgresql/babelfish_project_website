---
layout: default
title: Dynamically Defined Cursors
nav_order: 2
---

## Dynamically Defined Cursors

Currently, Babelfish does not recognize a cursor that is defined dynamically in a stored procedure or function. The workaround is to rewrite the cursor using a temporary table.

Setup code:

```sql
DROP TABLE IF EXISTS my_table
GO
CREATE TABLE my_table (c1 int, c2 varchar(64), c3 tinyint, c4 money, c5 datetime)
GO
```

Procedure that compiles and works in SQL Server, but not Babelfish:

```sql
DROP PROC IF EXISTS sp_cur_test
GO

CREATE PROC sp_cur_test (@TableName varchar(100))
AS
DECLARE @exec_str VARCHAR(4000);
DECLARE @table_schema VARCHAR(100), @table_name VARCHAR(100), @column_name VARCHAR(100);
SELECT @exec_str = 'DECLARE fetch_cursor
CURSOR FOR SELECT table_schema, table_name, column_name
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name = ''' + @TableName + '''';

EXEC(@exec_str);
OPEN fetch_cursor;
FETCH fetch_cursor INTO @table_schema, @table_name, @column_name;
WHILE @@FETCH_STATUS = 0
  BEGIN
    PRINT @table_schema;
    PRINT @table_name;
    PRINT @column_name;
    FETCH fetch_cursor INTO @table_schema, @table_name, @column_name;
  END;
CLOSE fetch_cursor;
DEALLOCATE fetch_cursor;
GO

execute sp_cur_test 'MY_TABLE';
GO
```

Procedure that works in SQL Server or Babelfish, after rewriting the cursor using a temporary table:

```sql
DROP PROC IF EXISTS sp_cur_test;
GO

CREATE PROC sp_cur_test (@TableName varchar(100))
AS
DECLARE @exec_str VARCHAR(4000);
DECLARE @table_schema VARCHAR(100), @table_name VARCHAR(100), @column_name VARCHAR(100);
CREATE TABLE #temp_cur (table_schema VARCHAR(100), table_name VARCHAR(100), column_name
VARCHAR(100));
SELECT @exec_str = 'INSERT INTO #temp_cur
SELECT table_schema, table_name, column_name
FROM INFORMATION_SCHEMA.COLUMNS
WHERE lower(table_name) = LOWER(''' + @TableName + ''')';
EXEC(@exec_str);
DECLARE fetch_cursor CURSOR FOR SELECT * FROM #temp_cur;
OPEN fetch_cursor;
FETCH fetch_cursor INTO @table_schema, @table_name, @column_name;
WHILE @@FETCH_STATUS = 0
  BEGIN
    PRINT @table_schema;
    PRINT @table_name;
    PRINT @column_name;
    FETCH fetch_cursor INTO @table_schema, @table_name, @column_name;
  END;
CLOSE fetch_cursor;
DEALLOCATE fetch_cursor;
GO

execute sp_cur_test 'MY_TABLE';
GO
```

For information about using Babelfish from both the TDS port and the PostgreSQL port, [visit the Babelfish website](https://babelfishpg.org/docs/usage/interoperability/).
