---
layout: default
title: High-Level Design
nav_order: 7
has_children: false
permalink: /docs/architecture/high-level-design
use_mermaid: true
---

On regular PostgreSQL there is a single listener that supports the FE/BE protocol,
and a query usually goes through the following path:

<div class="mermaid">
graph TD;
    A[FE/BE Listener] --> B[SQL Parser];
    B --> C[SQL Executor];
    C --> D[PL/pgSQL Interpreter/Compiler];
    C --> E[PL/Perl Interpreter/Compiler];
</div>

Babelfish runs as a PostgreSQL branch, which means that it took the PostgreSQL
code and modify it in order to support protocol hookability, TDS protocol, TSQL
Parser, and PL/T-SQL Interpreter and PL/T-SQL compiler.

<div class="mermaid">
graph TD;
    A[Babelfish TDS Listener] --> B(Babelfish SQL Parser);
    B --> C[SQL Executor];
    C --> D[PL/T-SQL Interpreter/Compiler];
    C --> E[PL/pgSQL Interpreter/Compiler];
    C --> F[PL/Perl Interpreter/Compiler];
    G[FE/BE Listener] --> H[Postgres SQL Parser];
    H --> C;
    I[Postmaster] --> A;
    I --> G;
</div>

The application-layer network protocol handling for interactions with SQL Server
client-drivers is implemented in a server component called the TDS Listener,
which functionally is the same as the PostgreSQL backend process (which handles
the FE/BE protocol).
The TDS Listener backend process is forked off by the Postmaster when a connection
is established to the TDS port – from then on, client applications (via the
technology-specific driver) communicate to the TDS Listener using the TDS
protocol.
