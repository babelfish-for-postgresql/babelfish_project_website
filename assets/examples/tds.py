import sys
import os
import pymssql
import psycopg2

# If you followed the installation instructions in the tarballs, these
# are the credentials:
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

if __name__ == "__main__":
    main()