---
layout: default
title: Interoperability
nav_order: 8
---

# Guidance on Babelfish Interoperability

Babelfish is designed to provide T-SQL semantics on top of PostgreSQL through the T-SQL dialect via the TDS port. The Babelfish database can also be accessed through the standard PostgreSQL port with PostgreSQL SQL statements. When PostgreSQL statements or PostgreSQL access occur in the context of Babelfish, interference between PostgreSQL and Babelfish may occur, potentially affecting syntax, semantics, and compatibility with future releases of Babelfish. If such scenarios occur, Babelfish users should be aware of potential issues related to schema names, identifiers, permissions, transactional semantics, multiple result sets, default collations, and future Babelfish upgrades.


## Babelfish/PostgreSQL interoperability 

Babelfish for PostgreSQL provides two endpoints through which the Babelfish database can be accessed: the TDS port (default: 1433) providing a T-SQL interface with T-SQL syntax and T-SQL semantics, and the PostgreSQL port (default: 5432) providing a PostgreSQL interface with PostgreSQL SQL syntax and semantics. 
 
Terminology note: in this document, *TDS* and *T-SQL*, and *PostgreSQL* and *PostgreSQL SQL* are used as synonyms for the type of SQL dialect as well as the corresponding connection to the database.

In the context of this document, the Babelfish database is a PostgreSQL database created for the purpose of emulating the SQL Server multi-DB environment in the T-SQL dialect, e.g. with a `master` and `tempdb` database and one or more user databases. By default, this database is named `babelfish_db`. A TDS connection will always be placed inside this Babelfish database, even though that is not visible through T-SQL. There can only be a single Babelfish database per PostgreSQL instance.

Since the Babelfish database is ultimately a PostgreSQL database, it is technically possible to access it from the PostgreSQL port and run PostgreSQL SQL statements against it. You should be cautious when accessing the Babelfish database through PostgreSQL, as there are complexities to be considered. 

A simple approach is to avoid accessing the Babelfish database from PostgreSQL altogether. There are valid reasons for wanting to use PostgreSQL functionality. For example, when a particular aspect of T-SQL is not supported by Babelfish, it might be possible to implement that aspect natively in PostgreSQL to allow migrating the application to Babelfish PostgreSQL.

The interoperability considerations apply whenever the execution context is not pure TDS/T-SQL, i.e. when PostgreSQL SQL statements are executed in a Babelfish context. This is the case when:

- In a PostgreSQL connection, PostgreSQL statements are executed against Babelfish-created objects (e.g. tables, views, procedures). 
- In a TDS connection, T-SQL statements are executed against PostgreSQL-created objects (e.g. tables, views, procedures) or when PostgreSQL built-in functions are called from T-SQL.
- In a TDS connection, a PostgreSQL trigger is defined (and later executed) on a TSQL table (or vice versa)

In these cases, this effectively means the SQL dialect is temporarily (and transparently) switched in the session while accessing/executing the objects created in a different SQL dialect (this does not apply to accessing a table).

When one of the above cases occurs in a Babelfish-based application, one or more of the following interoperability aspects may need to be considered. It is the responsibility of the Babelfish user to determine whether an application with such a mixed-SQL dialect scenario works as expected. Also, the user should anticipate potential issues when upgrading to future versions of Babelfish; such issues may need to be resolved by the user themselves.

- **Schema names**
     Babelfish emulates the SQL Server multi-DB structure by flattening the various SQL Server databases into schemas inside the PostgreSQL database (by default, `babelfish_db`). For example, this means that a T-SQL table created as `mydb.dbo.mytable` and a procedure created as `yourdb.dbo.yourproc` must be referenced from PostgreSQL as table `mydb_dbo.mytable` and procedure `yourdb_dbo.yourproc`, respectively [see Using Babelfish with a single database or multiple databases](https://babelfishpg.org/docs/installation/single-multiple/).
     In addition, SQL Server uses different rules than PostgreSQL for resolving an object name without a schema name. 

     These differences must be taken into account when operating a PostgreSQL connecting in the Babelfish database.
    
- **Identifiers**

     PostgreSQL has a maximum identifier length of 63 characters, while SQL Server supports up to 128. In addition, PostgreSQL has stricter uniqueness requirements for index names. Babelfish handles these restrictions by internally appending or replacing part of such identifiers with a 32-character string representing a hash of the identifier. While this is transparent from T-SQL, the identifier-with-hash is the object name when seen from PostgreSQL. 

     For example, an index named `ix1` on table `t1` will internally be named `ix1t1a5111d2a1767bc43a700e9f2162be019` by Babelfish. Here, Babelfish concatenates the index name with the table name along the string generated using MD5 for the lowercase index name.
    
- **Permissions**
    
    To implement the SQL Server permissions model, Babelfish creates PostgreSQL roles to reflect concepts like SQL Server database principals. These Babelfish-managed PostgreSQL constructs are transparent in T-SQL, but are visible in a PostgreSQL connection.

    It is important to realize that the Babelfish-managed PostgreSQL roles should not be modified from PostgreSQL, and permissions on Babelfish-created objects should not be granted/revoked from PostgreSQL. While it may currently be technically possible to do so, this could result in a Babelfish instance becoming incompatible with future releases of Babelfish, and could lead to future upgrades failing. It could also lead to an unexpected permissions configuration in current or future versions of Babelfish, as security-related T-SQL statements may not have the expected result due to interference with the actions that were performed in PostgreSQL. 

    Babelfish guarantees that a table (or other SQL object) that is created by T-SQL in a TDS connection in Babelfish, will be accessible with the same permissions when connecting through the PostgreSQL port with the same user as when connecting to TDS, without running any additional PostgreSQL statements (though some of the other considerations listed here, like schema name changes, may still apply). However, the other way around is not guaranteed: when creating an object in PostgreSQL, it may not be visible or accessible from a TDS connection, or it may be accessible with different permissions. Therefore, schemas and objects that will be accessed from PostgreSQL, should be created in T-SQL. 
    

- **Transactional semantics**
     
     Although the semantics of T-SQL and PostgreSQL SQL are largely identical, there are some notable differences when it comes to transaction rollbacks and error handling. For example, in case of a constraint violation, T-SQL by default rolls back the statement in which the error occurs and then proceeds with the next statement, while keeping the active transaction open. In contrast, PostgreSQL SQL will roll back the entire transaction and exit the block.

     When executing T-SQL from a TDS connection, T-SQL transactional semantics will apply; when executing PostgreSQL statements on a PostgreSQL connection, PostgreSQL transactional semantics will apply. But when mixing or combining the two dialects in a connection, in principle T-SQL transactional semantics will be ignored and only PostgreSQL semantics will be used. This could mean that a T-SQL procedure could behave differently when executed in a PostgreSQL context.
    
- **Multiple result sets**

     T-SQL supports returning multiple result sets to the client from a batch or procedure, but PostgreSQL does not: for procedures, PostgreSQL does not support returning result sets at all, and for batches PostgreSQL sends the first result set only. In such cases, if a T-SQL procedure/batch is executed in a PostgreSQL context, the customer may not get the expected results.
    
- **Default collations**

     Default collations are different in the T-SQL and PostgreSQL SQL, and this may cause some semantic differences. For example, `'a' = 'A'` is true by default in Babelfish T-SQL as the default collation is case-insensitive; but this will be false by default in PostgreSQL SQL where the collation is case-sensitive. 
    
- **Future Babelfish upgrades**

     The most likely reason why Babelfish users might want to implement part of the migrated T-SQL application in PostgreSQL, is to work around a particular piece of T-SQL functionality that is not currently supported by Babelfish, so the user then tries to implement that part in PostgreSQL. There is a risk that, if Babelfish starts to support those features in a future release, the application would not be compatible with that future release. This could mean that the upgraded future instance may not work correctly, or cause the upgrade to fail.


## Interoperability scenarios

- As a starting point, the simplest, zero-interoperability scenario is to vertically split an application in a T-SQL part and a PostgreSQL part, each with their own users and schemas and no interaction between them. The application opens both a TDS connection to the Babelfish database, and a PostgreSQL connection to a separate PostgreSQL database. In this case, there is in fact no interoperability issue on database level at all since the PostgreSQL access and T-SQL access are fully separate and do not interfere. (note that there may be a dependency when both connections use the same username to connect).

- A more relevant variation is where the PostgreSQL connection accesses the Babelfish database, but accesses only PostgreSQL-created objects, while T-SQL accesses only Babelfish-created objects (e.g. tables, views, procedures). In this case there is no interference, but in practice there will usually be a requirement to exchange information between the T-SQL context and the PostgreSQL context, for example through a commonly accessed table. Such a table should be created in T-SQL rather than in PostgreSQL, but otherwise this scenario should not be problematic. 
Interoperability aspects: schema names; identifiers; permissions.

- Another case with few expected complications is when the PostgreSQL connection only reads from Babelfish-created tables.  Interoperability aspects: schema names; identifiers; permissions. When also reading from views, there may be additional considerations related to schema names and identifiers referenced by these views.

- When the PostgreSQL connection also modifies the Babelfish-created tables or performs DDL to modify such objects, then also transactional semantics aspects will apply.

- A more complex scenario is when a PostgreSQL connection executes a T-SQL procedure (either directly or via a PostgreSQL procedure), or modifies a Babelfish-created table which has a Babelfish-created trigger. The resulting semantics should be carefully validated by the Babelfish user. Beginning with Babelfish v.3.3.0, Babelfish intentionally blocks these configurations to prevent such issues.


## Interoperability Examples

**Unsupported statement**

Consider a 100-statement T-SQL stored procedure where 99 statements are fully supported by Babelfish but 1 statement is not. If the unsupported statement can be rewritten as a PostgreSQL procedure and called from the T-SQL statement, this could be a solution to migrate the procedure. However, it could appear in practice that the unsupported statement can only be represented in PostgreSQL if the rest of the procedure is also rewritten in PostgreSQL. The user needs to decide to what extent to rewrite, refactor or redesign the procedure in T-SQL or PostgreSQL.
 
**Table partitioning**

Babelfish currently does not support SQL Server's table partitioning. It may be possible to create a table in Babelfish, and modify the table in PostgreSQL to apply partitioning. Since partitioning is a performance feature that should be functionally neutral, this should in principle work. However, it could become incompatible with Babelfish if T-SQL style partitioning were to be supported in a future Babelfish release.
 
**Full-text search**

It may be possible to migrate an application that performs full-text search to Babelfish by refactoring the application such that the full-text search is encapsulated in a PostgreSQL stored procedure which then gets called from T-SQL. Also here, incompatibility issues with future Babelfish release might arise.
 
**PostGIS extension**

To migrate an application featuring geospatial T-SQL features, it could be an option to consider the PostGIS extension. However, this might require more extensive refactoring as well as devising a mechanism to pass data between T-SQL and the PostGIS extension. Future compatibility considerations apply.

**XML processing**

For a T-SQL application using XML processing, this could perhaps be made to work if the XML functionality can be split off into PostgreSQL procedures and functions. Such workarounds could potentially be complex. Future compatibility considerations apply. 
