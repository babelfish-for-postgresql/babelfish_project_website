---
layout: default
title: Migrating to Babelfish
nav_order: 3
has_children: false
permalink: /docs/migration
---

## Migrating to Babelfish

Babelfish is a great tool and offers a path to avoid MS SQL by moving to an Open
Source product capable of providing good handling as well as TDS handling.

In this section, you will learn how to approach a migration and how to manage a
smooth transition to Babelfish.


### Create a Babelfish deployment

The first thing to do is to [install Babelfish](/docs/installation-guide/build-from-source) and
make sure that a connection can be established. 

A good way to check connectivity on Linux is to use the FreeTDS command line
client as described in the [Babelfish documentation](/docs/connecting-to-babelfish/command-line).

Once your deployment is ready for action, you can move forward and proceed with
the next step.


### Moving the data structure to Babelfish

 The first step is to move your existing SQL Server schema to the new
 cluster. Export the DDL (data definition language) of the SQL Server
 database. The DDL is SQL code that describes database objects such
 as those that contain user data (for example, tables, indexes, and
 views) and user-written database code (stored procedures,
 user-defined functions, or triggers).

You can use SQL Studio Management Studio (SSMS) to export the DDL.
Generate the script by clicking on your database in MS SQL Studio and use the
functionality provided by the tool to generate the export.

Do not forget to enable triggers, logins, owners, and
permissions. These are disabled by default in SSMS.


### Assess the situation using Compass

Babelfish comes with an assessment tool called Babelfish Compass to help people
with the migration ahead. Simply run the Compass tool on the DDL and determine
to what extent the T-SQL code will be supported by Babelfish, and identify T-SQL
code that may require changing before executing against Babelfish. 

 
### Deploying the data structure and move the data

Run the DDL on your new Babelfish server to recreate your schema on Babelfish. 
Make code adjustments as needed. Most of the code is expected to work out of the
box. 

In case you are facing errors or problems, we recommend you check out our [discussion about
differences in functionality](limitations_of_babelfish.html).

In the next step you can already move the data from one server to the other.
Once the data structure has been adjusted properly and once it has been deployed
successfully moving the data itself is not expected to cause errors anymore.


### Reconfiguring client applications

Once structure and data have been migrated successfully it is time to adjust
your database connections. Simply make your applications point to the new data
source and launch your tests.

To a client, Babelfish is expected to look just like a normal SQL Server. Unless
you hit a [missing feature](missing_feature.html) your apps are expected to work
normally under most circumstances. However, we recommend thorough testing, and
adjusting details here and there.

In particular, complex SQL might exhibit performance differences on different platforms. Thus
performance adjustments may be necessary during a migration.


### Moving to production

When you are satisfied with your application test results, start using your
Babelfish database for production. During this time, DMS needs to continue
to incrementally replicate changes to the Babelfish database(s). When ready,
temporarily quiesce the original database and redirect live client applications
to use the Babelfish TDS port.


### Performance considerations

You should keep in mind that you have just left the universe of MS SQL and
entered the world of PostgreSQL. This implies that performance won't be
identical. In some cases, PostgreSQL will do better than MS SQL and in some
situations, it will not perform as well, which is to be expected. 

Adjusting database parameters properly does make a difference, but it might not
be sufficient to fix each and every performance problem. In other words, expect
to rewrite queries for good performance.
