---
layout: default
title: Using JDBC
nav_order: 4
---

## Utilizing JDBC

After focusing on some other popular programming languages such as Python and C#,
we also want to sit back and figure out how to use Babelfish in conjunction
with Java and JDBC. Again, some basic operations will be shown to describe how
code can be written.

As we have seen before, there is no real difference between writing JDBC client
code for Microsoft SQL Server and Babelfish. Still, let's dive in and take a look at some
examples:

### Sample code using JDBC

To compile the Java code you will need the Microsoft SQL Server JDBC driver. For the sake of
this example, we have used the version 9.4 (mssql-jdbc-9.4.0.jre11.jar). However,
since the example features pretty basic code, it should be possible to run things
with other versions of the driver as well.

Here is the code:


```java
package sample;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class sample {
	public static void main(String[] args) {
		Connection connection;
		// Setting up MSSQL Credentials
		String connectionUrl =
			"jdbc:sqlserver://PUT_HOSTNAME_HERE;"
			+ "database=PUT_NAME_OF_DATABASE_HERE;"
			+ "user=PUT_USERNAME_HERE;"
			+ "password=PUT_PASSWORD_HERE;";

		try {
			// Trying to establish connection
			connection = DriverManager.getConnection(connectionUrl);
			System.out.println("Connection established for select examples!\n");
			
			// Select values example
			select_all(connection);
			
			// Transaction example
			connection.setAutoCommit(false);
			
			// Insert values into sample table
			try {
				connection.setAutoCommit(false);
			
				String insert = "INSERT INTO sample VALUES('Max', 'Mustermann', '1020')";
				Statement statement = connection.createStatement();
				statement.execute(insert);
				
				insert = "INSERT INTO sample VALUES('Erika', 'Musterfrau', '1021')";
				statement.execute(insert);
				
				connection.commit();
				System.out.println("\nInsert successful!\n");
			}
			catch (SQLException e){
				connection.rollback();
				System.out.println("\nInsert failed!\n");
			}
			
			select_all(connection);
			
			connection.setAutoCommit(true);
			
			// Removing inserted values and displaying rowcount
			try {
				String delete = "DELETE FROM sample WHERE vorname = 'Max' or vorname = 'Erika'";
				Statement statement = connection.createStatement();
				int rowcount = statement.executeUpdate(delete);
				
				System.out.println("\nDeleted Rows: " + rowcount + "\n");
				
				// Select column names
				String select = "SELECT * FROM sample";
				ResultSet result = statement.executeQuery(select);
				
				String value = "";
				
				for(int i = 1; i <= result.getMetaData().getColumnCount(); i++) {
					value += result.getMetaData().getColumnName(i) + " ";
				}
				
				System.out.println(value);
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private static void select_all(Connection connection) {
		try {
			Statement statement = connection.createStatement();
			
			String select = "SELECT * FROM sample";
			ResultSet result = statement.executeQuery(select);
			
			while(result.next()) {
				String value = "";
				for(int i = 1; i <= result.getMetaData().getColumnCount(); i++) {
					value += result.getString(i) + " ";
				}
				System.out.println(value);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
```

First of all, a standard JDBC connection is created. JDBC is an abstraction
layer, so the main magic is actually in the connect string: 'jdbc:sqlserver' will
tell our program to use the Microsoft SQL Server driver to connect to Babelfish.

Otherwise, the sample code is mostly trivial and pretty much represents a
standard JDBC application.