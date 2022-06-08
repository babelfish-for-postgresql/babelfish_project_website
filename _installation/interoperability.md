---
layout: default
title: Single vs. multiple database setups
nav_order: 5
---
## Using Both TDS/T-SQL and PostgreSQL with Babelfish

Babelfish provides T-SQL semantics on top of PostgreSQL using the T-SQL dialect via the TDS port. You can also access the Babelfish database through the standard PostgreSQL port with PostgreSQL SQL statements. If you use both (TDS and PostgreSQL) ports and dialects, interference between PostgreSQL and Babelfish may occur, potentially affecting syntax, semantics, and compatibility with future releases of Babelfish. As an administrator or user you should be aware of potential issues related to schema names, identifiers, permissions, transactional semantics, multiple result sets, default collations, and future Babelfish upgrades.


### Babelfish/PostgreSQL Interoperability 

Babelfish for PostgreSQL provides two endpoints through which the Babelfish database can be accessed: 

- the TDS port (by default, 1433) providing a T-SQL interface with T-SQL syntax and semantics. TDS and T-SQL are used as synonyms for SQL Server SQL dialect as well as the corresponding connection to the database.

- the PostgreSQL port (by default, 5432) providing a PL/pgSQL interface with PL/pgSQL syntax and semantics. PostgreSQL and PL/pgSQL are used as synonyms for the PostgreSQL SQL dialect as well as the corresponding connection to the database.

The Babelfish database is a PostgreSQL database created for the purpose of emulating the SQL Server multi-DB environment in the T-SQL dialect, with a `master` and `tempdb` database and one or more user databases. The default name of this database is `babelfish_db`. A TDS connection is placed inside this Babelfish database that cannot be accessed through T-SQL. There can only be a single Babelfish database per PostgreSQL instance.

Since the Babelfish database is ultimately a PostgreSQL database, it is technically possible to access it from the PostgreSQL port and run PL/pgSQL statements against it. However, you should exercise caution when accessing the Babelfish database through the PostgreSQL port. 

From a Babelfish perspective, it is safest to avoid accessing the Babelfish database from PostgreSQL altogether. However, there may be valid reasons for wanting to use PostgreSQL functionality. For example, if a particular aspect of T-SQL is not supported by Babelfish, you may be able to implement similar behavior natively in PostgreSQL to allow application migration to PostgreSQL. This comes with certain implications and risks, as described below.

Considerations apply whenever the execution context is not pure TDS/T-SQL; for example, when PostgreSQL SQL statements are executed in a Babelfish context. This is the case when:

- In a PostgreSQL connection, PostgreSQL statements are executed against objects created on the TDS port (like tables, views, and procedures). 

- In a TDS connection, T-SQL statements are executed against objects created on the PostgreSQL port (like tables, views, and procedures), or when PostgreSQL built-in functions are called from T-SQL. Based on customer feedback, this seems to be a common scenario.

In both cases, the SQL dialect is temporarily (and transparently) switched in the session while accessing/executing objects created in a different SQL dialect.

When one of the above cases occurs in a Babelfish-based application, one or more of the following interoperability aspects may need to be considered. Babelfish is not designed to support mixed-SQL dialect cases, so you will need to determine whether an application with such a mixed-SQL dialect scenario works as expected and anticipate potential issues when upgrading to future versions of Babelfish. 

**Schema names**

Babelfish emulates the SQL Server multi-DB structure by flattening the various SQL Server databases into schemas inside the single `babelfish_db` PostgreSQL database. For example, this means that a T-SQL table created as `mydb.dbo.mytable` and a procedure created as `yourdb.dbo.yourproc` must be referenced from PostgreSQL as table `mydb_dbo.mytable` and procedure `yourdb_dbo.yourproc` respectively.  For details, see [Single vs. multiple instances](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/babelfish.html).

Additionally, SQL Server uses different rules than PostgreSQL for resolving an object name without a qualifying schema name. You must take these differences into account when using a PostgreSQL connection to the Babelfish database.
    
**Identifiers**

PostgreSQL has a maximum identifier length of 63 characters, while SQL Server supports up to 128. In addition, PostgreSQL has stricter uniqueness requirements for index names. Babelfish handles these restrictions by internally appending or replacing part of such identifiers with a 32-character string representing a hash of the identifier. While this is transparent from the TDS port, the identifier-with-hash is the object name when seen from the PostgreSQL port. 
    
For example, an index named `ix1` on table `t1` will internally be named `ix1t1a5111d2a1767bc43a700e9f2162be019` by Babelfish.

**Permissions**

To implement the SQL Server permissions model, Babelfish creates PostgreSQL roles to reflect concepts like SQL Server's database principals. These Babelfish-managed PostgreSQL constructs are transparent from the T-SQL port, but are visible to a PostgreSQL connection. 
It is important to realize that the Babelfish-managed PostgreSQL roles should not be modified from PostgreSQL, and permissions on Babelfish-created objects should not be granted/revoked from PostgreSQL. While it may currently be technically possible to do so, this could result in a Babelfish instance becoming incompatible with future releases of Babelfish, and could lead to future upgrades failing. It could also lead to an unexpected permissions configuration in current or future versions of Babelfish, as security-related T-SQL statements may not have the expected result due to interference with the actions that were performed in PostgreSQL. 

Babelfish attempts to ensure that a table or other SQL object that is created with T-SQL from a TDS connection in Babelfish, will be accessible with the same permissions when connecting through the PostgreSQL port with the same user, without running any additional PostgreSQL statements (though some of the other considerations listed here, like schema name changes, may still apply). However, the other way around is not guaranteed: when you create an object on the PostgreSQL port, it may or may not be visible or accessible from a TDS connection, or it may be accessible with different permissions. Therefore, if you plan to access schemas and objects from the PostgreSQL port, you should create those objects in T-SQL on the TDS port. 
    
**Transactional semantics**

Although the semantics of T-SQL and PL/pgSQL are largely identical, there are some notable differences when it comes to transaction rollbacks and error handling. For example, in case of a constraint violation, T-SQL (by default) rolls back the statement in which the error occurs and then proceeds with the next statement, while keeping the active transaction open. In contrast, PL/pgSQL will roll back the entire transaction and exit the block.

When executing T-SQL from a TDS connection, T-SQL transactional semantics will apply; when executing PostgreSQL statements on a PostgreSQL connection, PostgreSQL transactional semantics will apply. But when mixing or combining the two dialects in a connection, T-SQL transactional semantics will be ignored and only PostgreSQL semantics will be used. This could make a T-SQL procedure behave differently when executed in a PostgreSQL context.

**Multiple result sets**

T-SQL supports returning multiple result sets to the client from a batch or procedure, but PostgreSQL does not: 

- PostgreSQL does not support returning result sets from a procedure.
- PostgreSQL sends the first result set only from a batch. 

If a T-SQL procedure/batch is executed in a PostgreSQL context, the customer may not get the expected results.
    
**Default collations**

Default collations are different in the T-SQL and PL/pgSQL, and this may cause some semantic differences. For example, `'a' = 'A'` is true by default in Babelfish T-SQL as the default collation is case-insensitive; but this will be false by default in PL/pgSQL where the collation is case-sensitive. 

**Future Babelfish upgrades**

The most likely reason you might want to implement part of a migrated T-SQL application in PostgreSQL, is to work around a particular piece of T-SQL functionality that is not currently supported by Babelfish. There is a risk that, if Babelfish starts to support those features in a future release, the application would not be compatible with the future release. This could mean that the upgraded future instance may not work correctly, or will cause the upgrade to fail.


### Interoperability scenarios

The simplest interoperability scenario is to vertically split an application into a T-SQL part and a PostgreSQL part, each with their own users and schemas and no interaction between them. The application opens both a TDS connection to the Babelfish database, and a PostgreSQL connection to a separate PostgreSQL database. In this case, there is in fact no interoperability issue on a database level, since the PostgreSQL access and T-SQL access are fully separate and do not interfere. Note that there may be a dependency if both connections use the same username to connect.

A more relevant variation is where the PostgreSQL connection accesses the Babelfish database, but accesses only PostgreSQL-created objects, while T-SQL is used to access only Babelfish-created objects (such as tables, views, and procedures). In this case there is no interference, but in practice there may be a requirement to exchange information between the T-SQL context and the PostgreSQL context, for example, through a commonly accessed table. Such a table should be created in T-SQL rather than in PostgreSQL, but otherwise this scenario should not be problematic. In this case, you may encounter interoperability aspects in schema names, identifiers, and permissions.

A case with few expected complications is using the PostgreSQL connection to read from Babelfish-created tables. This scenario can potentially run into problems with schema names, identifiers, and permissions. When reading from views, you may also run into additional considerations related to schema names and object identifiers referenced by views.

Note that when the PostgreSQL connection modifies Babelfish-created tables or performs DDL, you may run into problems with transactional aspects of the semantics in use.

A more complex scenario is when a PostgreSQL connection executes a T-SQL procedure (either directly or via a PostgreSQL procedure), or modifies a Babelfish-created table which has a Babelfish-created trigger. You should carefully evaluate both the semantics in use and the result set to ensure that the behavior is what you expect. 


### Interoperability Examples

**Unsupported statement**

Consider a 100-statement T-SQL stored procedure where 99 statements are fully supported by Babelfish but 1 statement is not. If the unsupported statement can be rewritten as a PostgreSQL procedure and called from the T-SQL statement, you could use this solution to migrate the procedure. However, it could appear in practice that the unsupported statement can only be represented in PostgreSQL if the rest of the procedure is also rewritten in PostgreSQL. You will need to decide to what extent to rewrite, refactor or redesign the procedure in T-SQL or PostgreSQL.

**Table partitioning**

Babelfish currently does not support SQL Server's table partitioning. It may be possible to create a table in Babelfish, and modify the table in PostgreSQL to apply partitioning. Since partitioning is a performance feature that should be functionally neutral, this should in principle work. However, it could become incompatible with Babelfish if T-SQL style partitioning is supported in a future Babelfish release.
 
**Full-text search**

You may be able to migrate an application that performs full-text search to Babelfish by refactoring an application that uses full-text search so that the full-text search is encapsulated in a PostgreSQL stored procedure which then gets called from T-SQL. Also here, incompatibility issues with future Babelfish releases might arise.
 
**PostGIS extension**

To migrate an application featuring geospatial T-SQL features, you could consider using the PostGIS extension. However, this might require extensive refactoring as well as devising a mechanism to pass data between T-SQL and the PostGIS extension. Future compatibility considerations also apply.

**XML processing**

If your T-SQL application uses XML processing, you may be able to make the application work if the XML functionality can be split off into PostgreSQL procedures and functions. This workaround could potentially be complex. Future compatibility considerations also apply.

