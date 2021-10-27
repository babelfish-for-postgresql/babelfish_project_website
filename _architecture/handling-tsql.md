---
layout: default
title: Handling Transact-SQL
nav_order: 10
---

## Handling Transact-SQL

If you are already using T-SQL on MS SQL, you might be interested in using the
same type of functionality in the Babelfish environment. PostgreSQL provides a
language called PL/pgSQL which is often used to write functions as well as
procedures. The MS SQL equivalent to PL/pgSQL is called T-SQL (Transact-SQL). 

To make Babelfish as compatible with MS SQL as possible, it provides a T-SQL
implementation capable of understanding MS SQL Server code. As with every
software which is modeling some other software's behavior, there are some 
differences and [limitations](/docs/limitations-of-babelfish). 


### Deploying T-SQL code in Babelfish

In this section, you will get to know T-SQL and learn how to implement basic
functions. Let's get started with some basic examples. The first example will
show how to convert kilometers into statute miles using the TDS interface (= port
1433). 

Let's quickly dive into the code:

```sql
CREATE FUNCTION km_to_miles (@km float)
RETURNS float
AS
BEGIN
        DECLARE @miles float
        SELECT @miles = @km*0.6214
        RETURN(@miles)
END
GO

SELECT km_to_miles (234)
GO
km_to_miles
145,4076
(1 row affected)
```

The T-SQL code can be executed directly. What you can instantly see is that
there is no language clause anymore, and we have a slightly different syntax than
PostgreSQL users are used to in PL/pgSQL.

Note that this is the way the function is created when you are operating using
the TDS protocol. In other words: This is how it works when you connect as a MS
SQL user. However, there is a second way to deploy T-SQL code: You can always
deploy the function PostgreSQL-style via port 5432 (= standard PostgreSQL port).
Here's how it works:

```sql
CREATE FUNCTION public.km_to_miles("@km" double precision) 
RETURNS double precision
    LANGUAGE pltsql
AS '{"version_num": "1", "typmod_array": ["-1", "-1"], "original_probin": ""}', 
'BEGIN
	DECLARE @miles float
	SELECT @miles = @km*0.6214
	RETURN(@miles)
END';
```

Now this may look a bit strange, but it does the same thing. 



### Running simple loops

The next example shows how to run a simple loop in T-SQL. Just like in other
languages, you can use WHILE loops. FOR loops are usually simulated. 
To demonstrate how T-SQL in Babelfish works, we have implemented a simple 
<code>WHILE</code> loop:

```sql
CREATE TABLE counter (
	number 	int
)
GO

DELETE FROM counter
GO

-- simple loop function
CREATE FUNCTION simple_loop(@num int)
	RETURNS varchar
AS
BEGIN
	DECLARE @Counter int
	SET @Counter = 1
	WHILE (@Counter <= @num)
		BEGIN
			INSERT INTO counter(number) VALUES (@Counter)
			SET @Counter = @Counter + 1
		END
	RETURN (@Counter)
END
GO

SELECT simple_loop(5)
GO

SELECT * from counter
GO
```

This example contains two things that are of importance. First of all, you can
see a loop in action. That's pretty standard and straightforward. What you need 
to be aware of here is the type mismatch. We create an integer variable which
is returned. However, what is returned is a varchar. In standard PostgreSQL, this
would instantly create an error. Babelfish (and MS SQL) are way more tolerant
in this case. 

What is also important: If you want to ensure that the data is safe and visible:
Don't forget to COMMIT. Otherwise data will be lost. Babelfish is not playing to
the same transactional rules as standard PostgreSQL. You need to keep that in
mind.

But let's look at one more example. In the following case, we want to prevent a division
by zero. The way to fix that in Babelfish is to use the NULLIF function:

```sql
CREATE FUNCTION simple_division (@num1 float, @num2 float)
	RETURNS float
AS
BEGIN
	DECLARE @result varchar
	SELECT @result = @num1/NULLIF(@num2,0)
	RETURN(@result)
END
GO
```

The NULLIF function is the best way to prevent division by zero.

### Using <code>CASE ... WHEN ...</code> in T-SQL

In T-SQL you can use <code>CASE ... WHEN ...</code> similar to the way you can 
use it in PostgreSQL. The following listing contains an example of how to use 
<code>CASE ... WHEN ...</code> correctly. We used the "PostgreSQL" method to 
connect to the database:

```sql
CREATE FUNCTION case_in_assignment() 
	RETURNS void AS 
$$
DECLARE @a text,
        @b int = 1,
        @c text = 'one';
BEGIN
    SET @a = CASE @b WHEN 1 THEN @c ELSE 'other value' END
    PRINT @a
    SET @b = 3
    SET @a = CASE @b WHEN 1 THEN @c ELSE 'other value' END
    PRINT @a
END
$$ LANGUAGE pltsql;
```

What is noteworthy here is the <code>PRINT</code> command. It is basically the
T-SQL equivalent of <code>RAISE INFO</code>. When we run the code (in
PostgreSQL mode) we can see what happens:

```sql
postgres=> SELECT case_in_assignment();
INFO:  one
INFO:  other value
 case_in_assignment 
--------------------
 
(1 row)
```

<code>PRINT</code> simply issues a message.


## Managing nested blocks

Just like PL/pgSQL, T-SQL is a classical block-oriented language. The concept is
pretty similar to what we see in PostgreSQL. Of course, the syntax is slightly
different, but it should be simple and straightforward. The following example
shows how a simple <code>IF</code> and a nested block can be used in T-SQL:

```sql
CREATE OR REPLACE FUNCTION if_samples() 
        RETURNS int AS 
$$
DECLARE @a int
BEGIN
    SET @a = 0
    IF 2 > @a
        IF @a = 1
            PRINT '@a = 1'
        ELSE
            PRINT '@a < 1'
    ELSE
        BEGIN
            SET @a = NULL
            PRINT @a
        END

    RETURN 0
END
$$ LANGUAGE pltsql;
```

The following listing shows the output of the script (executed in PostgreSQL
mode):

```sql
postgres=> SELECT if_samples();
INFO:  @a < 1
 if_samples 
------------
          1 
(1 row)
```

Let's now run the same thing using the <code>tsql</code> command line tool so that
we can compare the outputs:

```sql
2> SELECT if_samples()
3> GO
if_samples
@a < 1
(0 rows affected)
```

What might seem strange for PostgreSQL users is the way Babelfish (and therefore
MS SQL) handles procedures vs. functions. In PostgreSQL, these two things are
totally different and using a procedure in the content of a function will
certainly error out. In Babelfish the situation is as follows:

```sql
1> CALL if_samples()
2> GO
Msg 102 (severity 16, state 0) from BABEL Line 1:
	"syntax error near ')' at line 1 and character position 16"
1> 
2> CALL if_samples
3> GO
```

As you can see, the resultant behavior is slightly different.


### Return values and data types

MS SQL and PostgreSQL differ in one important point. Often, the return data type
of a function in PostgreSQL is <code>void</code>. In other words: A function can
return nothing. 

That is not possible in Babelfish and MS SQL. Let us modify the function we just
used and see what happens:

```sql
postgres=> CREATE OR REPLACE FUNCTION if_samples() 
        RETURNS void AS 
$$
DECLARE @a int
BEGIN
    SET @a = 0
    IF 2 > @a
        IF @a = 1
            PRINT '@a = 1'
        ELSE
            PRINT '@a < 1'
    ELSE
        BEGIN
            SET @a = NULL
            PRINT @a
        END
END
$$ LANGUAGE pltsql;
```

The PostgreSQL side is no problem. We can make the T-SQL function return void (=
nothing). In PostgreSQL mode one can call the function normally:

```sql
postgres=> SELECT if_samples();
INFO:  @a < 1
 if_samples 
------------
 
(1 row)
```

Calling the same function via TDS will error out because <code>void</code> is
not supported. You need to be aware of this fact:

```sql
bash# tsql -H PUT_HOSTNAME_HERE -p 1433 -U PUT_USER_HERE \
	-P PUT_PASSWORD_HERE -D postgres
...
1> SELECT if_samples()
2> GO
Msg 50856066 (severity 16, state 0) from BABEL Line 1:
	"data type void is not supported yet"
1> 

```

### Calling non-MS SQL functions

In real life, Babelfish users will use T-SQL functions and utilize MS SQL
compatible functions (which is the whole idea of Babelfish in the first place).
However, it can happen that an end user wants to call PostgreSQL code which does
not exist in MS SQL.

The important point is that it is possible. Here is an example:

```sql
1> SELECT pg_database_size('postgres')
2> GO
pg_database_size
11128571
(1 row affected)
```

The <code>pg_database_size</code> function is definitely PostgreSQL-specific.
However, that doesn't mean we cannot call the function. Quite to the
contrary, we can make full use of all the procedures and functions PostgreSQL has to
offer, unless there is a name conflict.


### Temporary tables in action

PostgreSQL as well as Babelfish / MS SQL support the concept of a temporary
table. However, there are some major differences. To show how this works, we first create a
standard table:

```sql
1> CREATE TABLE a (id int)
2> GO
```

In Babelfish (and thus in MS SQL) a temporary table is prefixed using a hash as
shown in the next listing:

```sql
1> CREATE TABLE #a (x int, y int)
2> GO
```



```sql
1> SELECT * FROM #a
2> GO
x	y
1> SELECT * FROM a
2> GO
id
```


```sql
1> SELECT * FROM #a
2> GO
Msg 208 (severity 16, state 0) from BABEL Line 1:
	"relation "#a" does not exist"
```

### Fetching the row count

When you write a stored procedure, it often happens that you want to
know the number of rows affected by a change. The way to do that in T-SQL is by
using the <code>@@ROWCOUNT</code> variable.

The following code snippet shows an example of how this works:

```sql
CREATE PROCEDURE test_changes @id int, @newid int
AS
BEGIN
        
        UPDATE sample
                SET persoid = @newID
                WHERE persoid = @ID
        
        IF @@ROWCOUNT = 0  
                PRINT 'Warning: No rows were updated'; 
END
GO

EXEC test_changes @id = 1200, @newid = 100000
GO
Warning: No rows were updated
(return status = 0)
```

The variable is set automatically and carries the number of rows touched by the
<code>UPDATE</code> statement we executed before. It offers a simple way to
control the behavior of your procedure.


### Running multi-transactional procedures

In T-SQL, a procedure can contain more than just one transaction. This allows us
to commit directly inside a procedure. PostgreSQL has the same feature, which is why
it was relatively easy to model Babelfish's behavior on top of PostgreSQL.

The following listing shows some code demonstrating how to run multiple transactions
inside the sample procedure.

```sql
CREATE PROCEDURE transactions_sample
AS
BEGIN
	BEGIN TRANSACTION
	INSERT INTO sample
		VALUES ('Test', 'User', 1010)
	COMMIT TRANSACTION

	PRINT ('INSERT: ')
	SELECT * FROM sample
	
	BEGIN TRANSACTION
	DELETE FROM sample
		WHERE persoid = 1010
	COMMIT TRANSACTION

	PRINT ('DELETE: ')
	SELECT * FROM sample
END
GO

EXEC transactions_sample
GO
```

The behavior is similar to what one would expect in PostgreSQL.


### How T-SQL code is stored internally

In this section, you will learn how Babelfish stores stored procedure code
internally. To understand how this works, we first need to connect using a normal
PostgreSQL connection (so <code>psql</code> on the PostgreSQL port and not
<code>tsql</code> on the MS SQL port.

What we see here is that PostgreSQL stores T-SQL code not quite like other code:

```sql
postgres=> SELECT proname, prosrc, probin 
	   FROM   pg_proc 
	   WHERE  proname = 'km_to_miles' ;
   proname   |               prosrc               |                                  probin                                   
-------------+------------------------------------+---------------------------------------------------------------------------
 km_to_miles | BEGIN                             +| {"version_num": "1", "typmod_array": ["-1", "-1"], "original_probin": ""}
             |         DECLARE @miles float      +| 
             |         SELECT @miles = @km*0.6214+| 
             |         RETURN(@miles)            +| 
             | END                                | 
(1 row)
``` 

In case of other languages it works like this: If you are writing plain SQL or
PL/pgSQL, the code is normally only stored in prosrc (plain text). If you happen to
use a C function, you will find the function name of the C level in prosrc and
the link to the shared library in the probin column. To show how this works, we
have deployed the dblink extensions and run a simple query:
 
```sql
postgres=> CREATE EXTENSION dblink;
CREATE EXTENSION
postgres=> SELECT proname, prosrc, probin 
	   FROM   pg_proc 
	   WHERE  proname = 'dblink' 
	   LIMIT 1;
 proname |    prosrc     |     probin     
---------+---------------+----------------
 dblink  | dblink_record | $libdir/dblink
(1 row)
```

If you look at T-SQL code, you'll see that there is a bit more magic involved.
The code is in prosrc just like in other cases. However, the probin column is
used to store a JSON document dealing with typmod-related information. This
behavior is specific to T-SQL and is handled by [Babelfish specific
hooks](postgresql_protocol_hooks.html). 

The MS SQL equivalent to this query is the <code>sp_helptext</code> function
which is currently not supported by Babelfish. 

Let's take a look at one more example using the "PostgreSQL style interface" to
writing stored procedures. The following code shows some more complex behavior:

```sql
CREATE PROCEDURE [HumanResources].[uspUpdateEmployeePersonalInfo]
    @BusinessEntityID [int], 
    @NationalIDNumber [nvarchar](15), 
    @BirthDate [datetime], 
    @MaritalStatus [nchar](1), 
    @Gender [nchar](1)
WITH EXECUTE AS CALLER
AS $$
BEGIN
    -- SET NOCOUNT ON;

    BEGIN TRY
        UPDATE [HumanResources].[Employee] 
        SET [NationalIDNumber] = @NationalIDNumber 
            ,[BirthDate] = @BirthDate 
            ,[MaritalStatus] = @MaritalStatus 
            ,[Gender] = @Gender 
        WHERE [BusinessEntityID] = @BusinessEntityID;
    END TRY
    BEGIN CATCH
        EXECUTE [dbo].[uspLogError];
    END CATCH;
END; $$ LANGUAGE 'pltsql';
```

As you can see, the syntax of CREATE PROCEDURE is not the way it works in
PostgreSQL. The question is: How does it work internally? The TDS handler takes
this code and processes it completely. pltsql is therefore an "additional stored
procedure language". The handlers take care of these syntax elements before the
body of the real function starts. 

Nevertheless, there are differences: We still see PostgreSQL-style dollar quoting and
so on, which is different from a "real" MS SQL Server stored
procedure.


