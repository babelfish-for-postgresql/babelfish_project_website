---
layout: default
title: Terminology
nav_order: 10
has_children: false
permalink: /docs/terminology
---

Across the Babelfish documentation there could be several terms that could be confusing for the here. In this page, 
  it’s tried to explain most of them. 

## PL/pgSQL

This acronym stands for Procedural Language/PostgreSQL Structured Query Language. This the programming language that is used to write functions and procedures in PostgreSQL. You can 
can read more [here](https://www.postgresql.org/docs/current/plpgsql.html)
## PL/Perl
Is a procedular language to write functions and procedures in PostgreSQL using the Perl programming language. You can ready more about [here](https://www.postgresql.org/docs/current/plperl.html)

## FE/BE

It stands for Frontend/Backend protocol. It's the communitacion protocol used by clients to connect to PostgreSQL databases. You can read the full specification of the protocol [here](https://www.postgresql.org/docs/current/protocol.html)

## TDS

It stands for Tabular Data Stream. This the comunicación protocol used by SQL Server for clients to connect to the database. The Babelfish extension implements this protocol so SQL Server clients can connect to PostgreSQL databases. You can the specification [here](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-tds/b46a581a-39de-4745-b076-ec4dbb7d13ec)

## T-SQL

It stands for Transact-SQL, it's extension of the standard SQL languange. Messages from clients to SQL Server are sent in this language, also it's used to write store procedures in SQL Server. Babelfish implements an specific query parser for this language. You can read more about T-SQL [here](https://docs.microsoft.com/en-us/sql/t-sql/language-reference?view=sql-server-ver15)