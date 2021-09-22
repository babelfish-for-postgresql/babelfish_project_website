---
layout: default
title: What is Babelfish
nav_order: 3
has_children: false
permalink: /docs/definition/what-it-is
---

“Babelfish” provides compatibility to Microsoft SQL Server database applications along multiple dimensions.

One dimension on which “Babelfish” provides this compatibility is the ability for client applications written in high-level languages (such a C/C++, C#, Java, Javascript, Python etc)
to remain completely unchanged at the client layer. This means such client applications which are already written in database-agnostic high-level languages and coded against
standardized API specifications can continue to run unchanged with the same application model and the same client-side drivers. In order to provide this compatibility, “Babelfish”
implements the handling of the MS-TDS protocol that SQL Server specific drivers use to communicate to SQL Server database server.

Another dimension on which “Babelfish” provides compatibility is in the support of SQL Server **Data Types** and the **T-SQL Procedural Language**.
A new component (called an ‘extension’) has been developed which uses the built-in extensibility framework of PostgreSQL to implement SQL Server compatible data types, associated
functions and operators and to provide support for user-defined objects in the SQL Server Transact-SQL language such as Stored Procedures, Functions and Triggers, Views, System
Functions and Procedures.
