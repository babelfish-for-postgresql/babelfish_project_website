---
layout: default
title: Python
nav_order: 17
---

## Using Python with Babelfish

In this section, you will learn to use Python to connect to Babelfish and to
extract some data from the server. Two options will be shown:

- Using Python and ODBC
- Using Python and native TDS

Both options are used in real life and thus it makes sense to take a look at
both ways to handle Babelfish


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

Let us take a look a the code and see how data can be retrieved:

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

To make this work, we have created a 'sample' table in Babelfish containing a
couple of rows. Since we use a simple 'SELECT * FROM sample',
the example is going to work with any data in 'sample'. But let's focus on the 
code: The first thing we do here is to include pyodbc. In case it is not 
available, make sure that all relevant packages are installed on your system. 

The most important thing here is actually the syntax of the connect string. Make
sure it carries all the relevant information in the right format. Then we can
create a cursor, loop over those lines and simply print them:

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

```bash
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
except pyodbc.Error:
    t_cursor.rollback()
    print("Insert failed!")
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

Again, we connect to the database normally, create a cursor and do our magic. The
main difference is that we added commands to control the transaction
(rollback, commit, etc.). Otherwise, not much has changed.

The following listing shows what has happened:

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
