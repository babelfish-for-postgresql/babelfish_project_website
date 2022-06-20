---
layout: default
title: Using Python
nav_order: 3
---

## Using Python with Babelfish

In this section, you will learn to use Python to connect to Babelfish and
extract data from the server. Three variations will be shown:

- Using Python and ODBC
- Using Python and native TDS
- Using Python with FreeTDS (`msobdcsql` isn't present on arm64 architecture)

All three variations include examples that will help you deal with transactional
operations in Babelfish.

### Using Python and ODBC

Before running the Python code, you need to ensure that all of the libraries are
present. If you are using Ubuntu 20.04, you can use the following commands to update any missing packages:

```bash
#!/bin/bash
sudo su
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
exit
sudo apt-get update
sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17
```

Depending on your Linux distribution, the installation process will be slightly different, but the basic requirements 
are the same - make sure the libraries are installed.

Before invoking the sample code, you'll also need to create a Babelfish table named `contacts`. You can connect on the TDS port of your Babelfish database with your choice of client, and use the following commands:

```sql
CREATE TABLE contacts (
    contact_id INT PRIMARY KEY,
    first_name VARCHAR (10) NOT NULL,
    last_name VARCHAR (20) NOT NULL,
    visited DATE
);

INSERT INTO contacts VALUES ('1', 'Alex', 'Arthur', '20210831');
INSERT INTO contacts VALUES ('2', 'Bonnie', 'Bret', '20210831');
INSERT INTO contacts VALUES ('3', 'Colin', 'Cristobal', '20210901');
INSERT INTO contacts VALUES ('4', 'Danielle', 'Dexter', '20210907');
INSERT INTO contacts VALUES ('5', 'Earl', 'Edwards', '20210908');
INSERT INTO contacts VALUES ('6', 'Fiona', 'Ferdinand', '20210917');
```

Our example focuses on using Python, ODBC, and Babelfish to create a connection, read data, and display it 
on the screen. First, the example includes the libraries that it will use: 

```python
import sys
import os
import pyodbc
```

Then, the example creates a connection with the SQL Server host. The syntax of the connection string must contain all the relevant information in the right format:

```python
# Provide your SQL Server credentials
server = 'host.example.com'
database = 'postgres'
username = 'postgres'
password = '1safepassword'

# Establish a connection
try:
    connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = connection.cursor()
    print("Connection established for select examples\n")
except pyodbc.ProgrammingError:
    print("Cannot connect to the database\nPlease check credentials")
    exit(1)
```

Then, the example creates a cursor that iterates through the rows of your contacts table and displays them:

```python
# Select values
cursor.execute("SELECT * FROM contacts")

for row in cursor.fetchall():
    print(row)
```

The example will display:

```bash
Connection established for select examples

(1, 'Alex', 'Arthur', 20210831)
(2, 'Bonnie', 'Bret', 20210831)
(3, 'Colin', 'Cristobal', 20210901)
(4, 'Danielle', 'Dexter', 20210907)
(5, 'Earl', 'Edwards', 20210908)
(6, 'Fiona', 'Ferdinand', 20210917)

```

### Transaction handling

Our next example demonstrates using cursors and native TDS to perform some basic transaction handling.  First, the example establishes a connection with the server:

```python
# Transaction example
# Establish a Babelfish connection
try:
    transact_connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password, autocommit=False)
    t_cursor = transact_connection.cursor()
    print("\nConnection established\n")
except pyodbc.ProgrammingError:
    print("\nConnection attempt failed\nPlease check credentials")
    exit(1)
```

Then, the example uses a cursor to add new entries to the database:

```python
# Insert values into your contacts table
try:
    t_cursor.execute("INSERT INTO contacts VALUES('Gaston', 'Gordon', '20210918')")
    t_cursor.execute("INSERT INTO contacts VALUES('Hermione', 'Henry', '20210925')")
except pyodbc.Error as e:
    t_cursor.rollback()
    print("Insert failed: {}".format(e))
else:
    t_cursor.commit()
    print("Insert successful\n")
```

Then, the example iterates through the table and display the contents:

```python
t_cursor.execute("SELECT * FROM contacts")

for row in t_cursor.fetchall():
    print(row)

t_cursor.close()
transact_connection.close()
```

The example then removes two rows from the table:

```python
# Remove inserted values
cursor.execute("DELETE FROM contacts WHERE last_name = 'Bret' OR last_name = 'Edwards'")
cursor.commit()

# Select metadata
print(f"\nDeleted Rows: {cursor.rowcount}\n")
```

 Then, the example closes the connection and alerts the user:

```python
# Close connection
cursor.close()
connection.close()
print("Success")
```

The example should display the following messages:

```bash
Connection established

Insert successful

(1, 'Alex', 'Arthur', 20210831)
(3, 'Colin', 'Cristobal', 20210901)
(4, 'Danielle', 'Dexter', 20210907)
(6, 'Fiona', 'Ferdinand', 20210917)
(7, 'Gaston', 'Gordon', 20210918)
(8, 'Hermione', 'Henry', 20210925)

Deleted Rows: 2

Success
```

The table now reflects the changes made in the example.


## Using Python with FreeTDS

If you are using an _arm64_ architecture, you can use the FreeTDS drivers to connect through
the TDS protocol.

Before invoking the sample code, use the following commands to install the prerequisite software:

```bash
sudo apt install python3-pip python3-venv freetds-dev
python3 -m venv .venv
source .venv/bin/activate
pip install pymssql psycopg2
```

The example writes data to Babelfish with the [`pymssql` API](http://www.pymssql.org/pymssql_examples.html), and reads it from Babelfish with the [`psycopg2` library](http://www.freetds.org/userguide/Python.html).  The example includes the libraries it needs to use those libraries before establishing a connection with the Babelfish host:

```python
import sys
import os
import pymssql
import psycopg2

server = 'host.example.com'
port = 1433
database = 'master'  
username = 'babelfish_user'
password = '1safepassword'

pg_database = "babelfish_db"
pg_schema   = "master_dbo"

def main():

    with pymssql.connect(server, username, password, database) as conn:
        with conn.cursor() as cursor:
```

Then, the example drops and recreates a simple table (named `contacts`) and a procedure (named `find_contact`):

```python
            try:
                cursor.execute("DROP TABLE contacts")
                cursor.execute("DROP PROCEDURE find_contact")
                conn.commit()
            except Exception as e:
                # For the sake of this example, we 
                # ignore exceptions if the objects do not exist.
                pass
            
            try:
                print("-- create table: ")
                cursor.execute("""
                    CREATE TABLE contacts (
                        contact_id INT PRIMARY KEY,
                        first_name VARCHAR (10) NOT NULL,
                        last_name VARCHAR (20) NOT NULL,
                        visited DATE
                    )
                """)
                cursor.execute("""
                    CREATE PROCEDURE find_contact
                        @last_name VARCHAR(100)
                    AS BEGIN
                        SELECT * FROM contacts WHERE last_name like '%'+@last_name+'%'
                    END
                """)
                conn.commit()
            except Exception as e:
                print("Cannot create table: {}".format(e))
                exit(1)

```

The example adds contacts to the table:

```python
            try:
                print("-- Insert")
                cursor.executemany(
                    "INSERT INTO contacts VALUES (%d, %s, %s, %s)",
                    [
                        (11, 'Imelda', 'Imani', '20211004'),
                        (12, 'Julian', 'Joyce', '20211015'),
                        (13, 'Katia', 'Kirk', '20211027')
                    ])
                conn.commit()
            except Exception as e:
                print("Transaction could not be committed: {} ".format(e))
                exit(2) # Duplicate key error
```

The example then queries the table, first with the `psycopg2` library, and then with the `pymmssql` API:

```python
    with psycopg2.connect(user=username, password=password, host=server,database=pg_database) as connpg:
        with connpg.cursor() as cursorpg:
            print("-- Output from Babelfish: ")
            try:
                cursorpg.execute("SELECT * FROM {}.contacts WHERE last_name like '%{}%'".format(pg_schema,"Joyce"))
                for row in cursorpg:
                    print("{}".format(row))
            except Exception as e:
                print("Read query couldn't be executed: {}".format(e))
                pass
    
    with pymssql.connect(server, username, password, database) as conn:
        with conn.cursor() as cursor:
            print("-- Executing PROCEDURE ")
            cursor.callproc('find_contact', ('Joyce',))
            for row in cursor:
                print("{}".format(row))
```

The `with` clause allows the example to clean cursors and connections once the block is complete for a cleaner execution.

Finally, add the init call to `main()` function:


```python
if __name__ == "__main__":
    main()
```

You can download this example from [here](/assets/examples/tds.py).