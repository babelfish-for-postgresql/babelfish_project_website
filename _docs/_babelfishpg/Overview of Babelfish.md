---
layout: default
title: Overview of the “Babelfish” Feature
nav_order: 1
---




## Overview of the “Babelfish” Feature

The basic idea of the “Babelfish” feature of PostgreSQL is to provide Microsoft SQL Server compatibility for PostgreSQL. 
Providing a high-degree of compatibility to applications
specifically designed for Microsoft SQL Server helps customers reduce the effort required to modify these applications to run on PostgreSQL, enabling faster, cheaper, and lower risk migrations. 
“Babelfish” provides compatibility to Microsoft SQL Server database applications along multiple dimensions.



One dimension on which “Babelfish” provides this compatibility is the ability for client applications written in high-level languages (such a C/C++, C#, Java, Javascript, Python etc) to
remain completely unchanged at the client layer. 
This means such client applications which are already written in database-agnostic high-level languages and coded against standardized API specifications can continue to run unchanged with the same application model and the same client-side drivers. 
In order to provide this compatibility, “Babelfish” implements the handling of the MS-TDS protocol that SQL Server specific drivers use to communicate to SQL Server database server.


The generic backend flowchart for a query in PostgreSQL is given here:

![]() 

The application-layer network protocol handling for interactions with SQL Server client-drivers is implemented in a server component called the TDS Listener, which functionally is the same asthe PostgreSQL backend process (which handles the FE/BE protocol). 
The TDS Listener backend process is forked off by the Postmaster when a connection is established to the TDS port – from then on, client applications (via the technology-specific driver) communicate to the TDS Listener using the TDS protocol.


Another dimension on which “Babelfish” provides compatibility is in the support of SQL Server **Data Types** and the **T-SQL Procedural Language**[9].
A new component (called an ‘extension’) has been developed which uses the built-in extensibility framework of PostgreSQL to implement SQL Server compatible data types, associated functions and operators and to provide support for user-defined objects in the SQL Server Transact-SQL language such as Stored Procedures, Functions and Triggers, Views, System Functions and Procedures. 
In the diagram above, the blocks with a __red__ border are what have been implemented from scratch for “Babelfish”. The SQL Parser component has been changed to the extent it has been necessary to provide compatibility with the extended SQL Server dialect for the SQL language.

An additional dimension in which “Babelfish” provides support for applications migrating from SQL server is in the support for system metadata in the form of Catalog views, Information schemas, System and Property functions, System Compatibility views and System Stored