---
layout: default
title: Programming in C#
nav_order: 2
---

## Programming in C#

MS SQL is one of the dominant database systems on Microsoft Windows
platforms and C# is one of the more popular languages used in this ecosystem.
So it is important to see how a C# connection can be established and how
data can be fetched. 

### Sample code in C#

Let's take a look at the sample code:

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace sample
{
    class Program
    {
        static void Main(string[] args)
        {
            // Setting up MSSQL Credentials
            SqlConnection con;

            string conString = "Server=" + @"PUT_HOSTNAME_HERE" + ";" +
                               "User id=" + "PUT_USERNAME_HERE" + ";" +
                               "Password=" + "PUT_PASSWORD_HERE" + ";" +
                               "Database=" + "PUT_DATABASE_HERE" + ";" +
                               "MultipleActiveResultSets=true;";

            con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand();

            // Creating MSSQL Connection
            try
            {
                con.Open();
                Console.WriteLine("Connection established\n") ;
            }
            catch
            {
                Console.WriteLine("Can not connect to database!\nPlease check credentials!");
                Environment.Exit(1);
            }

            string sqlQuery = "";

            // Select values example
            select_all(con);

            // Transaction example
            // Insert values into sample table
            cmd = con.CreateCommand();
            SqlTransaction transaction = con.BeginTransaction("SampleTransaction");

            try
            {
                sqlQuery = "INSERT INTO sample VALUES(@vorname, @nachname, @persoid)";
                cmd.Parameters.AddWithValue("@vorname", "Max");
                cmd.Parameters.AddWithValue("@nachname", "Mustermann");
                cmd.Parameters.AddWithValue("@persoid", "1020");
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = sqlQuery;
                cmd.Transaction = transaction;

                cmd.ExecuteNonQuery();

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@vorname", "Erika");
                cmd.Parameters.AddWithValue("@nachname", "Musterfrau");
                cmd.Parameters.AddWithValue("@persoid", "1021");

                cmd.ExecuteNonQuery();

                transaction.Commit();

                Console.WriteLine("\nInsert successful!\n");
            }
            catch
            {
                transaction.Rollback();
                Console.WriteLine("\nInsert failed!\n");
            }

            select_all(con);

            // Removing inserted values
            sqlQuery = "DELETE FROM sample WHERE vorname = 'Max' or vorname = 'Erika'";
            cmd = con.CreateCommand();
            cmd.CommandText = sqlQuery;

            int row_count = cmd.ExecuteNonQuery();

            // Select metadata
            // Select row count from delete
            Console.WriteLine("\nDeleted rows: " + row_count + "\n");

            // Select column names from table
            sqlQuery = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'sample'";
            cmd = con.CreateCommand();
            cmd.CommandText = sqlQuery;

            SqlDataReader reader = cmd.ExecuteReader();

            string value = "";

            while (reader.Read())
            {
                value += reader.GetValue(0) + " ";
            }

            Console.WriteLine(value);
            reader.Close();

            // Closing connection
            con.Close();
            Console.WriteLine("\nConnection closed!");
        }

        private static void select_all(SqlConnection con)
        {
            string sqlQuery = "SELECT * FROM sample";
            SqlCommand cmd = con.CreateCommand();
            cmd.CommandText = sqlQuery;
            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                string value = "";
                for (int i = 0; i != reader.FieldCount; i++)
                {
                    value += reader.GetValue(i) + " ";
                }
                Console.WriteLine(value);
            }

            reader.Close();
        }

    }
}
```

The code is relatively straightforward. First, a connection is allocated and
opened. In C#, error handling can easily be done using try / catch. In our case
the program simply terminates in case no connection can be opened. 

Then we call the select\_all function. What it does is to create an SQL command
which simply reads all the data in a 'sample' table and loops over all rows and
all columns to display them on the screen. At the end, the SqlDataReader is
closed. This constitutes a simple example showing how data can easily be extracted from
Babelfish.

The next thing is an example showing how to run a transaction. The way to do
that is to run the BeginTransaction method. After running the SQL we can commit
the transaction. Error handling is done by the try / catch block.

The code can be compiled using Microsoft Studio or any other tool of your
choice. What is important to note is that you can implement code for Babelfish
the same way you would normally implement code, talking to MS SQL directly.

