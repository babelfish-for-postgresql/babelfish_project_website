---
layout: default
title: Managing Babelfish escape hatches
nav_order: 6
---


## Babelfish escape hatches

To better deal with statements that might fail, Babelfish allows you to define
*escape hatches*. An escape hatch is a flag that can be adjusted by the user and
specifies the behavior of Babelfish when it encounters an unsupported feature or
syntax.

You can use the `sp_babelfish_configure` stored procedure to display or change
the settings of each escape hatch:

- If an escape hatch is set to `ignore`, Babelfish will suppress the error that
the corresponding syntax would otherwise cause.  By default, the change applies
to the current session only.  Include the `server` keyword to apply the changes
persistently on the cluster level as well.
- If an escape hatch is set to `strict`, you may encounter error messages if your SQL code
contains unsupported syntax.  To suppress these error messages, set all
escape hatches to `ignore` by invoking the following command on the TDS port:

```none
sp_babelfish_configure '%', 'ignore', 'server'
```

The following table lists the escape hatches and their default settings:

| Escape hatch | Description | Default |
| ------------ | ----------- | ------- |
| `babelfishpg_tsql.escape_hatch_constraint_name_for_default` | Controls Babelfish behavior related to default constraint names. | strict |
| `babelfishpg_tsql.escape_hatch_database_misc_options` | Controls Babelfish behavior related to the following options on `CREATE` or `ALTER DATABASE`: `CONTAINMENT`, `DB_CHAINING`, `TRUSTWORTHY`, `PERSISTENT_LOG_BUFFER`. | ignore |
| `babelfishpg_tsql.escape_hatch_for_replication` | Controls Babelfish behavior related to the `[NOT] FOR REPLICATION` clause when creating or altering a table. | strict |
| `babelfishpg_tsql.escape_hatch_fulltext` | Controls Babelfish behavior related to `FULLTEXT` features, such as `DEFAULT_FULLTEXT_LANGUAG` in `CREATE/ALTER DATABASE`, `CREATE FULLTEXT INDEX`, or `sp_fulltext_database`. | strict |
| `babelfishpg_tsql.escape_hatch_index_clustering` | Controls Babelfish behavior related to the `CLUSTERED` or `NONCLUSTERED` keywords for indexes and `PRIMARY KEY` or `UNIQUE` constraints. When `CLUSTERED` is ignored, the index or constraint is still created as if `NONCLUSTERED` was specified. | ignore |
| `babelfishpg_tsql.escape_hatch_index_columnstore` | Controls Babelfish behavior related to the `COLUMNSTORE` clause. If you specify ignore, Babelfish creates a regular B-tree index. | strict |
| `babelfishpg_tsql.escape_hatch_join_hints` | Controls the behavior of keywords in a `JOIN` operator: `LOOP`, `HASH`, `MERGE`, `REMOTE`, `REDUCE`, `REDISTRIBUTE`, `REPLICATE`. | ignore |
| `babelfishpg_tsql.escape_hatch_language_non_english` | Controls Babelfish behavior related to languages other than English for onscreen messages. Babelfish currently supports only `us_english` for on-screen messages. `SET LANGUAGE` might use a variable containing the language name, so the actual language being set can only be detected at run time. | strict |
| `babelfishpg_tsql.escape_hatch_login_hashed_password` | `HASHED` password is not supported for `CREATE LOGIN` and `ALTER LOGIN`. | strict |
| `babelfishpg_tsql.escape_hatch_login_misc_options` | This deals with various other unsupported options for `CREATE LOGIN` and `ALTER LOGIN` | strict |
| `babelfishpg_tsql.escape_hatch_login_old_password` | The `OLD_PASSWORD` option of `ALTER LOGIN` is not supported. | strict |
| `babelfishpg_tsql.escape_hatch_login_password_must_change` | The `MUST_CHANGE` password option is not supported for `CREATE LOGIN` and `ALTER LOGIN`. | strict |
| `babelfishpg_tsql.escape_hatch_login_password_unlock` | The `UNLOCK` password option is not supported for `CREATE LOGIN` and `ALTER LOGIN`. | strict |
| `babelfishpg_tsql.escape_hatch_nocheck_add_constraint` | Controls Babelfish behavior related to the `WITH CHECK` or `NOCHECK` clause for constraints. | strict |
| `babelfishpg_tsql.escape_hatch_nocheck_existing_constraint` | Controls Babelfish behavior related to `FOREIGN KEY` or `CHECK` constraints. | strict |
| `babelfishpg_tsql.escape_hatch_query_hints` | Controls Babelfish behavior related to query hints. When this option is set to ignore, the server ignores hints that use the `OPTION (...)` clause to specify query processing aspects. Examples include `SELECT FROM ... OPTION(MERGE JOIN HASH, MAXRECURSION 10))`. | ignore |
| `babelfishpg_tsql.escape_hatch_rowguidcol_column` | Controls Babelfish behavior related to the `ROWGUIDCOL` clause when creating or altering a table. | strict |
| `babelfishpg_tsql.escape_hatch_schemabinding_function` | Controls Babelfish behavior related to the `WITH SCHEMABINDING` clause. By default, the `WITH SCHEMABINDING` clause is ignored when specified with the `CREATE` or `ALTER FUNCTION` command. | ignore |
| `babelfishpg_tsql.escape_hatch_schemabinding_procedure` | Controls Babelfish behavior related to the `WITH SCHEMABINDING` clause. By default, the `WITH SCHEMABINDING` clause is ignored when specified with the `CREATE` or `ALTER PROCEDURE` command. | ignore |
| `babelfishpg_tsql.escape_hatch_schemabinding_trigger` | Controls Babelfish behavior related to the `WITH SCHEMABINDING` clause. By default, the `WITH SCHEMABINDING` clause is ignored when specified with the `CREATE` or `ALTER TRIGGER` command. | ignore |
| `babelfishpg_tsql.escape_hatch_schemabinding_view` | Controls Babelfish behavior related to the `WITH SCHEMABINDING` clause. By default, the `WITH SCHEMABINDING` clause is ignored when specified with the `CREATE` or `ALTER VIEW` command. | ignore |
| `babelfishpg_tsql.escape_hatch_session_settings` | Controls Babelfish behavior toward unsupported session-level `SET` statements. | ignore |
| `babelfishpg_tsql.escape_hatch_storage_on_partition` | Controls Babelfish behavior related to the `ON partition_scheme` column clause when defining partitioning. Babelfish currently doesn't implement partitioning. | strict |
| `babelfishpg_tsql.escape_hatch_storage_options` | Escape hatch on any storage option used in `CREATE`/`ALTER` for `DATABASE`, `TABLE` and `INDEX`.  This includes the clauses `(LOG) ON`, `TEXTIMAGE_ON`, `FILESTREAM_ON` that define storage locations (partitions, filegroups) for tables, indexes, and constraints, and also for a database. This escape hatch setting applies to all of these clauses (including `ON PRIMARY` and `ON DEFAULT`). The exception is when a partition is specified for a table or index with `ON partition_scheme (column)`. | ignore |
| `babelfishpg_tsql.escape_hatch_table_hints` | Controls the behavior of table hints specified using the `WITH (...)` clause. | ignore |
| `babelfishpg_tsql.escape_hatch_unique_constraint` | Controls Babelfish behavior toward unsupported session-level `SET` statements. Set to `ignore` to allow creation of nullable columns on which a `UNIQUE` index or `UNIQUE` constraint is defined.| strict |
