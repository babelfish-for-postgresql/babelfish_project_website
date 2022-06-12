---
layout: default
title: Using Python
nav_order: 3
---

## Using Python with Babelfish

In this section, you will learn to use Python to connect to Babelfish and to
extract some data from the server. Three options will be shown:

- Using Python and ODBC
- Using Python and native TDS
- Using Python with FreeTDS (as msobdcsql isn't present on arm64 architecture)

All options are explicit with in real life examples, for dealing with transactional
operations in Babelfish.

### Using Python and ODBC

The first example will focus on using Python, ODBC and Babelfish to create a
connection, read some data and simply display it on the screen.

Before we can run the Python code, we need to ensure that all libraries are
present. If you use Ubuntu 20.04, the following script will do the job
for you:

```bash
#!/bin/bash
sudo su
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list    # Ubuntu 20.04
exit
sudo apt-get update
sudo ACCEPT_EULA=Y apt-get install -y msodbcsql17
```

Depending on your desired flavor of Linux, the process will be slightly
different - but the basic idea will be the same: Make sure the required libraries
exist.

To make this work, we'll created a 'sample' table in Babelfish containing a
couple of rows. Since we use a simple 'SELECT * FROM sample',
the example is going to work with any data in 'sample'. 

The below script does the following steps:

- The first thing we do here is to include pyodbc. In case it is not  available, make sure that all relevant packages are installed on your system. 
- The most important thing here is actually the syntax of the connect string. Make sure it carries all the relevant information in the right format
- Then we can create a cursor, loop over those lines and simply print them.

```python
import sys
import os
import pyodbc

# Setting up MSSQL Credentials
server = 'secret-host.example.com'
database = 'postgres'
username = 'postgres'
password = 'secretpass'


# Trying to establish connection
try:
    connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = connection.cursor()
    print("Connection established for select examples!\n")
except pyodbc.ProgrammingError:
    print("Cannot connect to the database!\nPlease check credentials!")
    exit(1)

# Select values
cursor.execute("SELECT * FROM sample")

for row in cursor.fetchall():
    print(row)
```

The output should look like this:

```bash
Connection established for select examples!

(1, 'Maximilian', 'Guttmann', 1000)
(2, 'Hans-Jürgen', 'Schönig', 1001)
(3, 'Bernd', 'Helmle', 1002)
(4, 'Jan', 'Giefing', 1003)
(5, 'Sascha', 'Nesterovic', 1004)
(6, 'Valentino', 'Lazarevic', 1005)
...
```

The result will display whatever is in the table. In our case, it is simply a
couple of names and a number. As you can see, writing Python code is easy.

Sometimes you want to do more than just read data. The next example will show
some basic transaction handling:

```python
# Transaction example
# Trying to establish transaction connection
try:
    transact_connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password, autocommit=False)
    t_cursor = transact_connection.cursor()
    print("\nConnection established for transaction example!\n")
except pyodbc.ProgrammingError:
    print("\nCan not connect to Database!\nPlease check Credentials!")
    exit(1)


# Insert values into sample table
try:
    t_cursor.execute("INSERT INTO sample VALUES('Max', 'Mustermann', '1020')")
    t_cursor.execute("INSERT INTO sample VALUES('Erika', 'Musterfrau', '1021')")
except pyodbc.Error as e:
    t_cursor.rollback()
    print("Insert failed!: {}".format(e))
else:
    t_cursor.commit()
    print("Insert successful\n")

t_cursor.execute("SELECT * FROM sample")

for row in t_cursor.fetchall():
    print(row)

t_cursor.close()
transact_connection.close()


# Removing inserted values
cursor.execute("DELETE FROM sample WHERE vorname = 'Max' OR vorname = 'Erika'")
cursor.commit()

# Select metadata
print(f"\nDeleted Rows: {cursor.rowcount}\n")


# Closing connection
cursor.close()
connection.close()
print("Transaction closed!")
```

In this case we handle the exceptions from the cursor and proceed with the rollback 
operations. Otherwise, not much has changed.

The output of the above should be similar to this:

```bash
Connection established for transaction example!

Insert successful

(1, 'Maximilian', 'Guttmann', 1000)
(2, 'Hans-Jürgen', 'Schönig', 1001)
(3, 'Bernd', 'Helmle', 1002)
...
(51, 'Max', 'Mustermann', 1020)
(52, 'Erika', 'Musterfrau', 1021)

Deleted Rows: 2

Transaction closed!
```

The content of the table reflects the changes we have made.


## Python with FreeTDS

For _arm64_ architectures, you have available the freetds drivers for connecting through
TDS protocol.

To install the dependencies for this example, we need to execute the following:

```bash
sudo apt install python3-pip python3-venv freetds-dev
python3 -m venv .venv
source .venv/bin/activate
pip install pymssql psycopg2
```

For making things a little more interesting in the example, we are going to write data
through the pymssql and read it from the Postgresql protocol using a popular library
for connecting to: psycopg2.


```python
import sys
import os
import pymssql
import psycopg2

server = 'localhost'
port = 1433
database = 'master'  
username = 'babelfish_user'
password = '12345678'

pg_database = "babelfish_db"
pg_schema   = "master_dbo"

def main():

    with pymssql.connect(server, username, password, database) as conn:
        with conn.cursor() as cursor:

            try:
                cursor.execute("DROP TABLE persons")
                cursor.execute("DROP PROCEDURE FindPerson")
                conn.commit()
            except Exception as e:
                # For the sake of the simplicity of the test, we 
                # ignore execptions if the objects do not exists.
                pass
            
            try:
                print("-- create table: ")
                cursor.execute("""
                    CREATE TABLE persons (
                        id INT NOT NULL,
                        name VARCHAR(100),
                        salesrep VARCHAR(100),
                        owes money,
                        PRIMARY KEY(id) 
                    )
                """)
                cursor.execute("""
                    CREATE PROCEDURE FindPerson
                        @name VARCHAR(100)
                    AS BEGIN
                        SELECT * FROM persons WHERE name like '%'+@name+'%'
                    END
                """)
                conn.commit()
            except Exception as e:
                print("Cannot create table: {}".format(e))
                exit(1)

            try:
                print("-- Insert")
                cursor.executemany(
                    "INSERT INTO persons VALUES (%d, %s, %s, %s)",
                    [
                        (1, 'John Smith', 'John Doe', 1000.2),
                        (2, 'Jane Doe', 'Joe Dog', 303.4433),
                        (3, 'Mike T.', 'Sarah H.', 200.22)
                    ])
                conn.commit()
            except Exception as e:
                print("Transaction could not be committed: {} ".format(e))
                exit(2) # Duplicated key?

    with psycopg2.connect(user=username, password=password, host=server,database=pg_database) as connpg:
        with connpg.cursor() as cursorpg:
            print("-- Output from Postgres: ")
            try:
                cursorpg.execute("SELECT * FROM {}.persons WHERE name like '%{}%'".format(pg_schema,"John"))
                for row in cursorpg:
                    print("{}".format(row))
            except Exception as e:
                print("Read query couldn't be executed: {}".format(e))
                pass
    
    with pymssql.connect(server, username, password, database) as conn:
        with conn.cursor() as cursor:
            print("-- Executing PROCEDURE ")
            cursor.callproc('FindPerson', ('Jane',))
            for row in cursor:
                print("{}".format(row))


if __name__ == "__main__":
    main()
```

The _with_ clause allows us to clean cursors and connections once the block is completed,
allowing a cleaner execution.

Also, you'll see how connection string differs from connecting through TDS protocol. For 
connecting to the Postgres instance, we'll access through the Postgres database in which
we installed the extension. The databases used in the TDS connection are mapped through
Postgres schemas.

Finally, we test the procedure execution.

### FreeTDS references

[pymssql](http://www.pymssql.org/pymssql_examples.html)
[FreeTDS Python module](http://www.freetds.org/userguide/Python.html)

