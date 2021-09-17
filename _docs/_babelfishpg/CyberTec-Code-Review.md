---
layout: default
title: CyberTec - Code Review Approach for Babelfish Open Source
parent: Aggregations
nav_order: 2
has_children: false
---


# CyberTec - Code Review Approach for Babelfish Open Source

Start date for the engagement: 30-AUG-2021

### Objective:

The purpose of the code review is to get feedback on conformance of the Babelfish code with the Postgres coding 
conventions. This feedback will provide us time to make changes before we open the code to the community.




We need feedback on understanding

    1. Quality of code with respect to PostgreSQL coding style
    2. Any security violations e.g. unsafe C functions, buffer overflows etc.
    3. Developer friendliness of the code
    4. Check for proper licensing texts in the files - both Babelfish created and sourced from third parties


### Outcome expected from the review:

Clear, actionable, prioritized list of action items that the Babelfish Engineering team can implement.

    1. Detailed feedback calling out where we are compliant and non-compliant with PostgreSQL coding guidelines
    2. Reusability and maintainability of the code
    3. Optimal structuring of the code base – e.g. “extracting out this class will save 50 lines of code”, “this refactoring will 
    make the code easier to test because …”.
    4. Code review feedback will be provided in a prioritized manner as follows. Action to be taken needs to be clearly 
    detailed out for all the categories.

        o Severity 1: Critical. Must fix. Breach of PostgreSQL coding guidelines. If the code is released with this issue, 
        it will poorly reflect on the code quality. If the code was submitted to the PostgreSQL community, they would 
        reject it for non-conformance. 

        o Severity 2: Medium. Some deviation from PostgreSQL coding guidelines, with medium impact. Community 
        will live with this. This could potentially be a project for open source contributors.

        o Severity 3: Low. Nice to have. Fix them if there is time.

### Process for CyberTec to log issues

    1. Log PR with recommended fix for small issues
    2. For larger issues - send a sample along with documentation

### CyberTec Rsources working on the project

github user names

1. [postgresql007](https://github.com/postgresql007)
2. [laurenz](https://github.com/laurenz)
3. https://github.com/psoo 

### Links to Code base

https://github.com/babelfish-for-postgresql/babelfish-internal-review

https://github.com/babelfish-for-postgresql/babelfish-internal-review/tree/main/RDSManfredBabel(Babelfish code on top of Community PostgreSQL)

https://github.com/babelfish-for-postgresql/babelfish-internal-review/tree/main/RDSManfredBabelExtensions(Current Babelfish Extensions)

https://github.com/babelfish-for-postgresql/babelfish-internal-review/tree/main/ManfredBabelIntegrationTests(Babelfish Tests)

### Code structure and directories:

The code that is currently shared has references to APG and is being refactored and clean-up.

    1. TDS extension code, has reference to APG in the function/struct/file names and comments. These are planned to 
    be removed.

| Component | PG Files modified | New Files                     |  Remarks        | 
| -- | -- | -- | -- |
| **Language Extension** |      |                               |                 |
| - Executor             |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/pl_exec.c           |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/pl_exec-2.c         |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/iterative_exec.c    |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  contrib/babelfish-pg-        |                                         |
| - Compiler             |      |  contrib/babelfish-pg         | We will need to supply a                |
|                        |      |  tsql/antlr/TSqlLexer.g4      | Makefile instead of                     |
|                        |      |  contrib/babelfish-pg-        | CMakeLists.txt                          |
|                        |      |  tsql/antlr/TSqlParser.g4     |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/antlr/CMakeLists.txt    |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/stmt_walker.c       |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/codegen.c           |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/dynavec.c           |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/dynastack.c         |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/analyzer.c          |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/prepare.c           |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/compile_context.c   |                 |
| - Utility Functions    |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/pl_handler.c        |                 |
|                        |      |  contrib/babelfish-pg-        |                 |
|                        |      |  tsql/src/pl_funcs.c          |                 |
| - Files                |      |  approx 1000 commits, 143 modified or new files                     |                 |
| - Extension            |      |                               |                 |
| - Pagkages             |      |                               |                 |
| **TDS Extensions**     |      |                               |                 |
| - protocol Backend 
hooks (These are 
the changes 
proposed by Jan 
Wieck for pluggable 
protocol in the 
community thread)    |      | src/include/postmaster/protocol_extension.h                  |                 |
|                        | src/backend/access/common/printtup.c     |                   |                 |
|                        | src/backend/libpq/pqcomm.c               |                   |                 |
|                        | src/backend/postmaster/postmaster.c      |                   |                 |
|                        | src/backend/tcop/postgres.c              |                   |                 |
|                        | src/backend/utils/error/elog.c           |                   |                 |
|                        | src/backend/utils/init/postinit.c        |                   |                 |
|                        | src/backend/utils/misc/guc.c             |                   |                 |
|                          |  src/include/libpq/libpq-be.h                |                       |                               |
|                          |  src/include/libpq/libpq.h                   |                       |                               |
|                          |  src/include/miscadmin.h                     |                       |                               |
|                          |  src/include/postmaster/postmaster.h         |                       |                               |
|                          |  src/include/postmaster/postmaster.h         |                       |                               |
|                          |  src/include/utils/elog.h                    |                       |                               |
| - Extension Code         |                                              | babelfish-pg-tds/tds.c                          |                               |
|                          |                                              | babelfish-pg-tds/tdscomm.c                      |                               |
|                          |                                              | babelfish-pg-tds/tdssecure.c                    |                               |
|                          |                                              | babelfish-pg-tds/tdslogin.c                     |                               |
|                          |                                              | babelfish-pgtds/tdsprotocol.c                  |                               |
|                          |                                              | babelfish-pgtds/tdssqlbatch.c                  |                               |
|                          |                                              | babelfish-pg-tds/tdsxact.c                      |                               |
|                          |                                              | babelfish-pg-tds/tdsrpc.c                       |                               |
|                          |                                              | babelfish-pgtds/tdsrpchelper.c                 |                               |
|                          |                                              | babelfish-pgtds/tdsprinttup.c                  |                               |
|                          |                                              | babelfish-pgtds/tdsresponse.c                  |                               |
|                          |                                              | babelfish-pg-tds/tdstypeio.c                     |                               |
|                          |                                              | babelfish-pgtds/err_handler.c                   |                               |
|                          |                                              | babelfish-pgtds/tds_data_map.c                  |                               |
|                          |                                              | babelfish-pg-tds/tds-secureopenssl.c            |                               |
|                   |                     | babelfish-pg-tds/tds_srv.c              |                               |
|                   |                     | babelfish-pgtds/tdstimestamp.c         |                               |
|                   |                     | babelfish-pgtds/support_funcs.c        |                               |
|                   |                     | babelfish-pg-tds/guc.c                  |                               |
|                   |                     | babelfish-pg-tds/tdsvars.c              |                               |
|                   |                     | babelfish-pgtds/babelfish_encoding     | Copieds some of the postgres files related encoding in TDS so that we can use some of the static functions defined in those files  |
|                   |                     | babelfish-pg-tds/datatypes              | Copieds some of the postgres files related encoding in TDS so that we can use some of the static functions defined in those files  |
| - other Backend code changes                  | src/backend/commands/discard.c                    | babelfish-pg-tds/datatypes              | Created a wrapper of DiscardAll() that's used in reset connection. We can always create a copy of DiscardAll in TDS  |
|                   | src/backend/parser/parse_expr.c  | | Introduced a hook for recognized TSQL variables in transformColumnRef. We've remove the dependency on these hook for all the cases except some cursor related features. We should be able to remove the dependency completely   |
| **Back-end functions**                  |                     |               |                               |
| -                  |                     |               |                               |


### Extension Strategy

Given below is the overall strategy for Extensions. Team is in the process of creating these extensions.


| Extension | Proposed Name | Description          |            
| -- | -- | -- |
| TDS Extension | babelfishpg_tds   | TDS - provides a secondary endpoint that speaks the TDS (SQL Server) network protocol; applications written for SQL Server should connect to this endpoint. TDS Extension has two parts - the extension itself and the protocol hooks that are needed for this extension to work. The protocol hooks have already been submitted to the Community. https://www.postgresql.org/message-id/flat/CAGBW59d5SjLyJLt-jwNv%2BoP6esbD8SCB%3D%3D%3D11WVe5%3DdOHLQ5wQ%40mail.gmail.com               |    
| Language Extension | babelfishpg_tsql  | Provides a procedural language compatible with TSQL Uses ANTLR parser.   |       
| Data Type Extension 2 | babelfishpg_common  | Extension for all other data types developed by Babelfish Engineering team along with the dependent functions, indexes, operators etc All datatypes in other extensions will be extracted and added to this extension.    |  
| Data Type Extension 1 | Fixeddecimal  | This extension was forked from Fixeddecimal datatype developed by 2ndquadrant. We are making sure we properly fork the repo from the original so it tracks back to the original authors giving them credit. We'll track all the development history. **Naming convention**: We would like to keep the same name as in the original source. Additionally, the plan is to submit this back to 2nd Quadrant with the enhancements we have made for use in Babelfish. https://github.com/2ndQuadrant/fixeddecimal/blob/master/fixeddecimal.c     |  

The following documentation will be provided in GitHub

Babelfish Design Document: [Babel Threat Model_v7.pdf](https://quip-amazon.com/-/blob/WPO9AAFMiHd/0qdi0mjEWCUtl0tqBOmWGg?name=Babel%20Threat%20Model_v7.pdf) diagram.

TDS Design Document [TDS Design Document](https://quip-amazon.com/account/login?next=https%3A%2F%2Fquip-amazon.com%2FNbrAAa8rKPcG)