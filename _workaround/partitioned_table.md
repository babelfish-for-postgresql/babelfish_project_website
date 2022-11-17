---
layout: default
title: Migrating partitioned tables to Babelfish
nav_order: 1
---

## Migrating partitioned tables to Babelfish

Note: This workaround applies to Babelfish clusters running in single-db mode.

The primary difference between partitioned tables created on the Babelfish TDS port and partitioned tables created on the PostgreSQL port is the table owner. The examples that follow demonstrate changing the owner of the tables created on the PostgreSQL port to dbo, so you can access the tables on both the Babelfish port and the PostgreSQL port.

### Range Partitioning Example

The example that follows creates and tests a partitioned table with two partitions. First, use pgAdmin (on the PostgreSQL port) to create the table:

```sql
DROP TABLE IF EXISTS dbo.PartitionTest;
DROP TABLE IF EXISTS dbo.PartitionTest_y2022m01;
DROP TABLE IF EXISTS dbo.PartitionTest_y2022m02;
DROP INDEX dbo.partitiontest_logdate_idx;`

CREATE TABLE IF NOT EXISTS dbo.PartitionTest
(
    city_id integer NOT NULL,
    logdate date NOT NULL,
    peaktemp integer,
    unitsales integer
) PARTITION BY RANGE (logdate);

CREATE INDEX PartitionTest_logdate_idx
    ON dbo.PartitionTest(logdate ASC NULLS LAST);

Then, create the partitions:

CREATE TABLE IF NOT EXISTS dbo.PartitionTest_y2022m01 PARTITION OF dbo.PartitionTest
    FOR VALUES FROM ('2022-01-01') TO ('2022-02-01');
    
CREATE TABLE IF NOT EXISTS dbo.PartitionTest_y2022m02 PARTITION OF dbo.PartitionTest
    FOR VALUES FROM ('2022-02-01') TO ('2022-03-01');
```

Then, use pgAdmin to add data:

```sql
INSERT INTO dbo.partitiontest VALUES (1,'2022-01-01',1,1);
INSERT INTO dbo.partitiontest VALUES (2,'2022-01-10',1,2);
INSERT INTO dbo.partitiontest VALUES (3,'2022-01-15',1,3);
INSERT INTO dbo.partitiontest VALUES (4,'2022-02-01',2,1);
INSERT INTO dbo.partitiontest VALUES (5,'2022-02-03',2,2);
INSERT INTO dbo.partitiontest VALUES (6,'2022-02-11',2,3);
INSERT INTO dbo.partitiontest VALUES (7,'2022-02-15',2,4);
INSERT INTO dbo.partitiontest VALUES (8,'2022-02-16',2,5);
INSERT INTO dbo.partitiontest VALUES (8,'2022-02-17',2,6);
INSERT INTO dbo.partitiontest VALUES (8,'2022-02-20',2,7);
INSERT INTO dbo.partitiontest VALUES (8,'2022-02-21',2,8);
```

When you query the data from pgAdmin and Babelfish:

```sql
SELECT * FROM dbo.partitiontest  
```
•    pgAdmin (on the PostgreSQL port) will display all the data.
•    SSMS (on the Babelfish port) will display the following error message and the object browser will not display the table name:
```sql
Msg 33557097, Level 16, State 1, Line 3
relation "master_dbo.partitiontest" does not exist
```    
Use pgAdmin (on the PostgreSQL port) to change the table owner to dbo:
```sql
ALTER TABLE dbo.partitiontest OWNER to dbo;
ALTER TABLE dbo.partitiontest_y2022m01 OWNER to dbo;
ALTER TABLE dbo.partitiontest_y2022m02 OWNER to dbo;
```
Then, when you query the data from pgAdmin and SSMS:
```sql
SELECT * FROM dbo.partitiontest
```
- pgAdmin (on the PostgreSQL port) will display all the data.
- SSMS (on the Babelfish port) will display the data and you should see the tables in the object browser.

### Analyzing the result set
    
First, query the database using SSMS on the TDS port: 

```sql
SET BABELFISH_SHOWPLAN_ALL ON

SELECT * FROM dbo.partitiontest WHERE logdate = '2022-02-21'

Query Text: Select * from dbo.partitiontest where logdate = '2022-02-21'
Bitmap Heap Scan on partitiontest_y2022m02 partitiontest  (cost=4.22..14.76 rows=9 width=16)
  Recheck Cond: (logdate = '2022-02-21'::date)
  ->  Bitmap Index Scan on partitiontest_y2022m02_logdate_idx  (cost=0.00..4.22 rows=9 width=0)
        Index Cond: (logdate = '2022-02-21'::date)
```              

Then, using pgAdmin on the PostgreSQL port: 

```sql
EXPLAIN ANALYZE
SELECT * FROM dbo.partitiontest WHERE logdate = '2022-02-21'

"Bitmap Heap Scan on partitiontest_y2022m02 partitiontest  (cost=4.22..14.76 rows=9 width=16) (actual time=0.015..0.016 rows=1 loops=1)"
"  Recheck Cond: (logdate = '2022-02-21'::date)"
"  Heap Blocks: exact=1"
"  ->  Bitmap Index Scan on partitiontest_y2022m02_logdate_idx  (cost=0.00..4.22 rows=9 width=0) (actual time=0.011..0.011 rows=1 loops=1)"
"        Index Cond: (logdate = '2022-02-21'::date)"
"Planning Time: 0.124 ms"
"Execution Time: 0.043 ms"
```

### Inheritance Partitioning Example

First, create the database objects that will be used in our example:
```sql
DROP TRIGGER IF EXISTS insert_measurement_trigger ON dbo.measurement_inheritance;
DROP FUNCTION IF EXISTS dbo.measurement_inheritance_insert_trigger();
DROP TABLE IF EXISTS dbo.measurement_inheritance_y2006m02;
DROP TABLE  IF EXISTS dbo.measurement_inheritance_y2006m03;
DROP TABLE  IF EXISTS dbo.measurement_inheritance;  
CREATE TABLE dbo.measurement_inheritance (
    city_id         int not null,
    logdate         date not null,
    peaktemp        int,
    unitsales       int
);

CREATE TABLE dbo.measurement_inheritance_y2006m02 (
    CHECK ( logdate >= DATE '2006-02-01' AND logdate < DATE '2006-03-01' )
) INHERITS (dbo.measurement_inheritance);

CREATE TABLE dbo.measurement_inheritance_y2006m03 (
    CHECK ( logdate >= DATE '2006-03-01' AND logdate < DATE '2006-04-01' )
) INHERITS (dbo.measurement_inheritance);

DROP INDEX IF EXISTS dbo_log_measurement_inheritance_y2006m02;
DROP INDEX IF EXISTS dbo_log_measurement_inheritance_y2006m03;

CREATE INDEX dbo_log_measurement_inheritance_y2006m02 ON dbo.measurement_inheritance_y2006m02 (logdate);
CREATE INDEX dbo_log_measurement_inheritance_y2006m03 ON dbo.measurement_inheritance_y2006m03 (logdate);


CREATE OR REPLACE FUNCTION dbo.measurement_insert_trigger()
RETURNS TRIGGER AS $$
DECLARE
  year1 int;
  month1 smallint;
BEGIN
  year1 = EXTRACT(YEAR FROM   new.logdate );
  month1 = EXTRACT(month FROM   new.logdate );
  raise info 'year1 : % ',year1;
  if month1<10 then
  EXECUTE 'INSERT INTO dbo.measurement_inheritance_y'|| year1::varchar(4)||'m0'||  month1::varchar||' VALUES ('||
            NEW.city_id::varchar||','|| '''' ||NEW.logdate::date||''''
            ' ,'|| NEW.peaktemp::varchar||','||NEW.unitsales::varchar
            || ')'; 
  ELSE
  EXECUTE 'INSERT INTO dbo.measurement_inheritance_y'|| year1::varchar(4)||'m'|| month1::varchar||' VALUES ('||
            NEW.city_id::varchar||','|| '''' ||NEW.logdate::date||''''
            ' ,'|| NEW.peaktemp::varchar||','||NEW.unitsales::varchar
            || ')'; 
END IF;
     -- 2008m01 VALUES (NEW.*);
     RETURN NULL;
END;
$$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS insert_measurement_trigger ON dbo.measurement_inheritance;

CREATE TRIGGER insert_measurement_trigger
    BEFORE INSERT ON dbo. measurement_inheritance
    FOR EACH ROW EXECUTE FUNCTION dbo.measurement_insert_trigger();
```
Then, add half of the test data to the table using pgAdmin (on the PostgreSQL port):
```sql
INSERT INTO dbo.measurement_inheritance VALUES (1,'2006-02-01',1,1);
INSERT INTO dbo.measurement_inheritance VALUES (2,'2006-02-10',1,2);
INSERT INTO dbo.measurement_inheritance VALUES (3,'2006-02-15',1,3);
INSERT INTO dbo.measurement_inheritance VALUES (4,'2006-03-01',2,1);
INSERT INTO dbo.measurement_inheritance VALUES (5,'2006-03-03',2,2);
INSERT INTO dbo.measurement_inheritance VALUES (6,'2006-03-11',2,3);
INSERT INTO dbo.measurement_inheritance VALUES (7,'2006-03-15',2,4);
INSERT INTO dbo.measurement_inheritance VALUES (8,'2006-03-16',2,5);
INSERT INTO dbo.measurement_inheritance VALUES (8,'2006-03-17',2,6);
INSERT INTO dbo.measurement_inheritance VALUES (8,'2006-03-20',2,7);
INSERT INTO dbo.measurement_inheritance VALUES (8,'2006-03-21',2,8);
```
Use pgAdmin to change the table owner to dbo:
```sql
ALTER FUNCTION dbo.measurement_insert_trigger() OWNER TO dbo;
ALTER TABLE dbo.measurement_inheritance OWNER to dbo;
ALTER TABLE dbo.measurement_inheritance_y2006m02 OWNER TO dbo;
ALTER TABLE dbo.measurement_inheritance_y2006m03 OWNER TO dbo;
```
Add Data from SSMS:
```sql
INSERT INTO dbo.measurement_inheritance values (1,'2006-02-05',1,4);
INSERT INTO dbo.measurement_inheritance values (2,'2006-02-15',1,5);
INSERT INTO dbo.measurement_inheritance values (3,'2006-02-20',1,6);
INSERT INTO dbo.measurement_inheritance values (4,'2006-03-02',2,9);
INSERT INTO dbo.measurement_inheritance values (5,'2006-03-05',2,10);
INSERT INTO dbo.measurement_inheritance values (6,'2006-03-12',2,11);
INSERT INTO dbo.measurement_inheritance values (7,'2006-03-16',2,12);
INSERT INTO dbo.measurement_inheritance values (8,'2006-03-18',2,13);
INSERT INTO dbo.measurement_inheritance values (8,'2006-03-19',2,14);
INSERT INTO dbo.measurement_inheritance values (8,'2006-03-23',2,15);
INSERT INTO dbo.measurement_inheritance values (8,'2006-03-25',2,16);
```

Turn on the EXECUTE ANALYZE functionality, and query the data:
```sql
SET BABELFISH_SHOWPLAN_ALL on

SELECT * FROM dbo.measurement_inheritance WHERE logdate ='2006-03-25';
```
### On-conflict Partitioning Example

First, create the database objects that will be used in our example:
```sql
DROP TABLE IF EXISTS  dbo.customers;

CREATE TABLE dbo.customers (
    customer_id serial PRIMARY KEY,
    name VARCHAR UNIQUE,
    email VARCHAR NOT NULL,
    active bool NOT NULL DEFAULT TRUE
);

Then, add data:

INSERT INTO 
    dbo.customers (name, email)
VALUES 
    (‘ABC’, 'contact@abc.com'),
    ('MBA', 'contact@mba.com'),
    ('XYZ', 'contact@xyz.com');
    

CREATE OR REPLACE FUNCTION dbo.onConflictTestFromSSM()
RETURNS void AS $$
DECLARE
    year1 int;
    month1 smallint;
BEGIN
  INSERT INTO dbo.customers (NAME, email)
    VALUES('MBA','hotline@mbacom') 
    ON CONFLICT (name )
    DO 
   UPDATE SET email = EXCLUDED.email || ';' || customers.email;
    RAISE INFO 'function executes';
END;
$$
LANGUAGE plpgsql;

ALTER FUNCTION dbo.onConflictTestFromSSM()  OWNER TO dbo;
ALTER TABLE dbo.customers  OWNER to dbo;
```
Use SSMS to query dbo.onConflictTestFromSSM():

```sql
SELECT * FROM dbo.onConflictTestFromSSM()
EXEC dbo.onConflictTestFromSSM

SELECT * FROM dbo.customers
```

For more information about using Babelfish from the TDS port and the PostgreSQL port, [visit the Babelfish website](https://babelfishpg.org/docs/usage/interoperability/).
