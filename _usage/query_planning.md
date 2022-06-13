---
layout: default
title: Reviewing a Query Plan
nav_order: 8
---

## Reviewing a Query Plan

Babelfish version 2.1.0 includes support for SET statements that allow you to review estimated and actual (executed) query plans. This allows you to use the TDS port to identify and refine slow-performing queries. The functions can display an query plan for:

- `SELECT`, `INSERT`, `UPDATE`, and `DELETE` statements
- Nested procedures, multiple statements in a batch
- Variable declarations (for example, `DECLARE @t TABLE (a int, b int);`)

The SET statements *do not* support query plan retrieval from functions, control flows, and cursors.

You can use a SET statement on the TDS port to turn on/off the following functions: 

- SET BABELFISH_STATISTICS PROFILE {ON|OFF} to display the query plan used to execute a statement. The command implements the behavior of the [PostgreSQL EXPLAIN ANALYZE statement] (https://www.postgresql.org/docs/current/using-explain.html#USING-EXPLAIN-ANALYZE).
    
- SET BABELFISH_SHOWPLAN_ALL {ON|OFF} to display estimated execution plans for a statement without performing the command. The command implements the behavior of the [PostgreSQL EXPLAIN statement](https://www.postgresql.org/docs/current/using-explain.html#USING-EXPLAIN-BASICS).

Please note that you should not enable both SET statements at the same time.

The following example turns on query planning, displays the query plan for the SELECT statement without executing the command, and then turns off query planning:

```
SET BABELFISH_SHOWPLAN_ALL ON
GO

SELECT CategoryID, CategoryName FROM dbo.categories ORDER BY 1 DESC
GO

CategoryID  CategoryName
----------- ---------------
8           Seafood
7           Produce
6           Meat/Poultry
5           Grains/Cereals
4           Dairy Products
3           Confections
2           Condiments
1           Beverages
(8 rows affected)
QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Query Text: select CategoryID, CategoryName from dbo.categories order by 1 desc
Sort  (cost=45.59..47.17 rows=630 width=36) (actual rows=8 loops=1)
  Sort Key: categoryid DESC NULLS LAST
  Sort Method: quicksort  Memory: 25kB
  ->  Seq Scan on categories  (cost=0.00..16.30 rows=630 width=36) (actual rows=8 loops=1)
Completion time: 2022-06-13T10:18:53.3661572-07:00

SET BABELFISH_SHOWPLAN_ALL OFF
GO
```

For example, the following command sequence returns an estimated cost to execute the SELECT statement and then turns off query planning:

```
SET BABELFISH_STATISTICS PROFILE ON
GO

SELECT CategoryID, CategoryName FROM dbo.categories ORDER BY 1 DESC
GO

QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Query Text: select CategoryID, CategoryName from dbo.categories order by 1 desc
Sort  (cost=45.59..47.17 rows=630 width=36)
  Sort Key: categoryid DESC NULLS LAST
  ->  Seq Scan on categories  (cost=0.00..16.30 rows=630 width=36)
Completion time: 2022-06-13T10:20:13.1794503-07:00
1:20
select CategoryID, CategoryName from dbo.categories order by 1 desc
1:21
SELECT        dbo.Orders.OrderID, dbo.Orders.CustomerID, dbo.Orders.EmployeeID, dbo.Orders.OrderDate, dbo.Employees.LastName, dbo.Employees.FirstName, dbo.Employees.Title
FROM            dbo.Orders LEFT OUTER JOIN
                         dbo.Employees ON dbo.Orders.EmployeeID = dbo.Employees.EmployeeID
order by dbo.Orders.EmployeeID, dbo.Orders.CustomerID, dbo.Orders.OrderID

SET BABELFISH_STATISTICS PROFILE OFF
GO
```


**Query Plan display options**

You can use settings that are similar to the PostgreSQL [EXPLAIN and EXPLAIN ANALYZE statement settings](https://www.postgresql.org/docs/current/sql-explain.html) to control the type of information that is displayed with your query plan.  To query Babelfish for a list of settings and their current values, use the following command:

```
SELECT name,
       setting,
       short_desc,
       vartype,
       enumvals,
       boot_val,
       reset_val,
       pending_restart
FROM pg_settings
WHERE name LIKE '%babelfishpg_tsql.explain%';
```

| name                               | setting | short_desc                          | vartype | enumvals | boot_val | reset_val | pending_restart |
| ---------------------------------- | ------- | ----------------------------------- | ------- | -------- | -------- | --------- | --------------- |
| babelfishpg_tsql.explain_buffers | off | Include information on buffer usage bool | off | off | FALSE |
| babelfishpg_tsql.explain_costs | on | Include information on estimated startup and total cost | bool | on | on | FALSE |
| babelfishpg_tsql.explain_format text | Specify the output format, which can be TEXT, XML, JSON, or YAML | enum | {text,xml,json,yaml} | text | text | FALSE |
| babelfishpg_tsql.explain_settings | off | Include information on configuration parameters | bool | off | off | FALSE |
| babelfishpg_tsql.explain_summary | off | Include summary information (e.g., totaled timing information) after the query plan | bool | off | off | FALSE |
| babelfishpg_tsql.explain_timing | off | Include actual startup time and time spent in each node in the output | bool | off | off | FALSE |
| babelfishpg_tsql.explain_verbose | off | Display additional information regarding the plan | bool | off | off | FALSE |
| babelfishpg_tsql.explain_wal | off | Include information on WAL record generation | bool | off | off | FALSE |

You can use the PostgreSQL [set_config()](https://www.postgresql.org/docs/14/functions-admin.html#FUNCTIONS-ADMIN-SET) function to set a parameter value on the command line. Specify the following arguments:

```
SELECT set_config(‘setting_name’, ‘value’, is_local); 
```

Where:

`setting_name` is the name of the parameter you want to set.
`value` is the parameter value.
`is_local` : specify `true` if you would like the parameter to revert to the original setting when the transaction completes; set to `false` to make the setting persistent to the end of the session.

For example, the following command sets `babelfishpg_tsql.explain_verbose` parameter to `on`; the setting reverts to the original value when the session ends:

```
SELECT set_config('babelfishpg_tsql.explain_verbose', 'on', false);
```

You can also set the parameters in the `postgresql.conf` file.  After setting the parameters in the configuration file, use the following command to reload the configuration parameters:

```
SELECT pg_reload_conf();
```

**Example**

The following example shows a verbose version of the query plan used to execute the statement:

```
SELECT set_config('babelfishpg_tsql.explain_verbose', 'on', false);
GO

SET BABELFISH_SHOWPLAN_ALL ON;
GO

SELECT dbo.Orders.OrderID, dbo.Orders.CustomerID, dbo.Orders.EmployeeID, dbo.Orders.OrderDate, dbo.Employees.LastName, dbo.Employees.FirstName, dbo.Employees.Title
FROM dbo.Orders LEFT OUTER JOIN dbo.Employees ON dbo.Orders.EmployeeID = dbo.Employees.EmployeeID
ORDER BY dbo.Orders.EmployeeID, dbo.Orders.CustomerID, dbo.Orders.OrderID
GO

QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Query Text: SELECT dbo.Orders.OrderID, dbo.Orders.CustomerID, dbo.Orders.EmployeeID, dbo.Orders.OrderDate, dbo.Employees.LastName, dbo.Employees.FirstName, dbo.Employees.Title
FROM dbo.Orders LEFT OUTER JOIN dbo.Employees ON dbo.Orders.EmployeeID = dbo.Employees.EmployeeID
ORDER BY dbo.Orders.EmployeeID, dbo.Orders.CustomerID, dbo.Orders.OrderID

Sort  (cost=80.38..82.45 rows=830 width=118)
  Output: orders.orderid, orders.customerid, orders.employeeid, orders.orderdate, employees.lastname, employees.firstname, employees.title
  Sort Key: orders.employeeid NULLS FIRST, orders.customerid NULLS FIRST, orders.orderid NULLS FIRST
  ->  Hash Left Join  (cost=13.60..40.13 rows=830 width=118)
        Output: orders.orderid, orders.customerid, orders.employeeid, orders.orderdate, employees.lastname, employees.firstname, employees.title
        Inner Unique: true
        Hash Cond: (orders.employeeid = employees.employeeid)
        ->  Seq Scan on northwind_dbo.orders  (cost=0.00..24.30 rows=830 width=22)
              Output: orders.orderid, orders.customerid, orders.employeeid, orders.orderdate
        ->  Hash  (cost=11.60..11.60 rows=160 width=100)
              Output: employees.lastname, employees.firstname, employees.title, employees.employeeid
              ->  Seq Scan on northwind_dbo.employees  (cost=0.00..11.60 rows=160 width=100)
                    Output: employees.lastname, employees.firstname, employees.title, employees.employeeid
Completion time: 2022-06-13T10:22:02.0657336-07:00

SET BABELFISH_SHOWPLAN_ALL off;
GO

SELECT set_config('babelfishpg_tsql.explain_verbose', 'off', false);
GO
