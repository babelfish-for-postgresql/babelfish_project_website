---
layout: default
title: Using Babelfish to migrate to PostgreSQL
nav_order: 3
---

## Migrating to Babelfish

Babelfish offers a path to migrate from licensed Microsoft SQL Server to PostgreSQL, which is a capable open source product.

In this section, you will learn how to approach a migration and how to transition to Babelfish.


### Create a Babelfish instance

The first thing to do is to [install Babelfish](/docs/installation/compiling-babelfish-from-source/) and for Windows users, make sure a connection can be established with a client tool like SSMS or sqlcmd. 

For Linux users, a good way to check connectivity is to use the FreeTDS command line
client as described in the [Babelfish documentation](/docs/usage/command-line).

Once your Babelfish instance has been set up, you can move forward and proceed with
the next step.

### Assess the compatibility with Babelfish using Babelfish Compass

Babelfish comes with an assessment tool called Babelfish Compass to assist with
determining the complexity of an application and the feasibility of migrating to Babelfish.
The first step is to run an assessment with Babelfish Compass.
Run the Babelfish Compass tool on the DDL and determine to what extent the T-SQL code will
be supported by Babelfish, and identify T-SQL code that may require changing before
executing against Babelfish.

To download Babelfish Compass, see here https://github.com/babelfish-for-postgresql/babelfish_compass/releases/latest and here https://github.com/babelfish-for-postgresql/babelfish_compass/blob/main/BabelfishCompass_UserGuide.pdf (for the user guide).

### Reverse-engineer the SQL Server schema

Once you have run an assessment, migrate your existing SQL Server schema to the new
cluster. Generate the DDL for all SQL Server user databases which you want to migrate.
The DDL is SQL code that describes database objects such
as those that contain user data (for example, tables, indexes, and
views) and user-written database code (stored procedures,
user-defined functions, or triggers).

You can use SQL Server Management Studio (SSMS) to reverse-engineer the DDL.
Generate the script by clicking on your database in SSMS and use the
functionality provided by the tool to generate the export.

Do not forget to enable triggers, logins, owners, and
permissions. These are disabled by default in SSMS.

### Deploying the schema and migrating the data

Make SQL code adjustments as needed. In case you are facing errors or problems,
we recommend you check out our [discussion about differences in functionality](/docs/usage/limitations-of-babelfish).
Run the DDL on your new Babelfish server to recreate your schema on Babelfish,
either with sqlcmd or with SSMS. 

In the next step you can migrate the data from one server to the other.


### Reconfiguring client applications

Once the schema and data have been migrated successfully, you can reconfigure your 
client applications to connect to the Babelfish instance instead of to SQL Server. 
Point your applications to the new data source, and launch your tests.

To a client, Babelfish is expected to look just like a normal SQL Server. Unless
you hit a [limitation](/docs/usage/limitations-of-babelfish), your apps should work
normally. However, we recommend thorough testing.




### Moving to production

When you are satisfied with your application test results, start using your
Babelfish database for production. During this time, DMS needs to continue
to incrementally replicate changes to the Babelfish database(s). When ready,
temporarily quiesce the original database and redirect live client applications
to use the Babelfish TDS port.


### Performance considerations

SQL might exhibit performance differences on different platforms, so performance
adjustments may be necessary during a migration. You should keep in mind that you
have just left the universe of Microsoft SQL Server and entered the world of PostgreSQL.
Performance won't necessarily be identical. 

Adjusting database parameters properly does make a difference, but it might not
be sufficient to fix each and every performance problem. In other words, expect
to rewrite queries for good performance.

### Accessing the data in PostgreSQL

So far, we have described how to use Babelfish with your Microsoft SQL Server
application.  But since the data are actually stored in a PostgreSQL database,
you can access them with the PostgreSQL protocol as well.  To do that, you can
use any PostgreSQL client.  Make sure that you connect to the PostgreSQL port
(by default 5432) and not to the TDS port (by default 1433).

While object names will be identical, the names of the schemas in the migrated SQL
Server user databases may look different when access through PG, depending on the
[migration mode_GUC](docs/installation/single-multiple):

- in `single-db` migration mode, the schema names of the migrated SQL Server user
databases will be the same when accessed using T-SQL or using PG SQL

- in `multi-db` migration mode, the schema names in PostgreSQL will be composed
  of the database name and the schema name that you used when connected
  through the TDS port.  For example, if you created a table `t1` in schema
  `s1` of database `d1` while accessing using T-SQL, the table needs to be referenced
  (or accessed) as d1_s1.t1 when connected to the PostgreSQL protocol.
