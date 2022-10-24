---
layout: default
title: Version 1.0.0
nav_order: 1
---

## Babelfish Version 1.0.0

| Feature | Options | Workaround | 
| ------- | ------- | ------- | 

| CHECKSUM | Supported : `arg1=SINGLE ARGUMENT` | | 
| COLLATE | |[DEFAULT_DATABASE workaround](https://babelfishpg.org/docs/workaround/collate_default_database/) | 
| Partitioning | Unsupported |[Partitioning workaround](https://babelfishpg.org/docs/workaround/partitioned_table/) - Babelfish code supports PostgreSQL-style partitioning on the PostgreSQL port, but use of PostgreSQL-styled partitioned tables from the TDS port is not recommended | 
| SET ROWCOUNT | Unsupported : `NONZERO`, `VARIABLE` | [SET ROWCOUNT workaround](https://babelfishpg.org/docs/workaround/set_rowcount/) | 
| WRITETEXT | Unsupported | |
| XML features | Unsupported : `EXIST`, `MODIFY`, `NODES`, `QUERY`, `SELECT FOR XML AUTO`, `SELECT FOR XML AUTO ELEMENTS`, `SELECT FOR XML EXPLICIT`, `SELECT FOR XML PATH ELEMENTS`, `SELECT FOR XML RAW ELEMENTS`, `SELECTIVE XML INDEX`, `VALUE`, `WITH XMLNAMESPACES`, `XML INDEX`, `XML SCHEMA COLLECTION`, `XML TYPE DEFINITION` | |
| expression AT TIME ZONE | Unsupported | |
