---
layout: default
title: Configuration variables
nav_order: 3
---

## Configuring Babelfish

Adjusting the behavior of Babelfish to your needs can be done by using
a set of configuration variables. Babelfish provides a rich set of tweaks
which will be described in this section.

The following configuration parameters are available:

- `babelfishpg_tsql.allow_antlr_to_unsupported_grammar_for_testing`
- `babelfishpg_tsql.ansi_defaults`
- `babelfishpg_tsql.ansi_null_dflt_off`
- `babelfishpg_tsql.ansi_null_dflt_on`
- `babelfishpg_tsql.ansi_nulls`
- `babelfishpg_tsql.ansi_padding`
- `babelfishpg_tsql.ansi_warnings`
- `babelfishpg_tsql.arithabort`
- `babelfishpg_tsql.arithignore`
- `babelfishpg_tsql.concat_null_yields_null`
- `babelfishpg_tsql.cursor_close_on_commit`
- `babelfishpg_tsql.database_name`
- `babelfishpg_tsql.datefirst`
- `babelfishpg_tsql.default_locale`
- `babelfishpg_tsql.disable_batch_auto_commit`
- `babelfishpg_tsql.disable_internal_savepoint`
- `babelfishpg_tsql.disable_txn_in_triggers`
- `babelfishpg_tsql.dump_antlr_query_graph`
- `babelfishpg_tsql.enable_antlr_detailed_log`
- `babelfishpg_tsql.enable_ownership_structure`
- `babelfishpg_tsql.escape_hatch_compatibility_level`
- `babelfishpg_tsql.escape_hatch_constraint_name_for_default`
- `babelfishpg_tsql.escape_hatch_database_misc_options`
- `babelfishpg_tsql.escape_hatch_for_replication`
- `babelfishpg_tsql.escape_hatch_fulltext`
- `babelfishpg_tsql.escape_hatch_index_clustering`
- `babelfishpg_tsql.escape_hatch_index_columnstore`
- `babelfishpg_tsql.escape_hatch_join_hints`
- `babelfishpg_tsql.escape_hatch_language_non_english`
- `babelfishpg_tsql.escape_hatch_login_hashed_password`
- `babelfishpg_tsql.escape_hatch_login_misc_options`
- `babelfishpg_tsql.escape_hatch_login_old_password`
- `babelfishpg_tsql.escape_hatch_login_password_must_change`
- `babelfishpg_tsql.escape_hatch_login_password_unlock`
- `babelfishpg_tsql.escape_hatch_nocheck_add_constraint`
- `babelfishpg_tsql.escape_hatch_nocheck_existing_constraint`
- `babelfishpg_tsql.escape_hatch_query_hints`
- `babelfishpg_tsql.escape_hatch_rowguidcol_column`
- `babelfishpg_tsql.escape_hatch_schemabinding_function`
- `babelfishpg_tsql.escape_hatch_schemabinding_procedure`
- `babelfishpg_tsql.escape_hatch_schemabinding_trigger`
- `babelfishpg_tsql.escape_hatch_schemabinding_view`
- `babelfishpg_tsql.escape_hatch_session_settings`
- `babelfishpg_tsql.escape_hatch_storage_on_partition`
- `babelfishpg_tsql.escape_hatch_storage_options`
- `babelfishpg_tsql.escape_hatch_table_hints`
- `babelfishpg_tsql.escape_hatch_unique_constraint`
- `babelfishpg_tsql.fmtonly`
- `babelfishpg_tsql.implicit_transactions`
- `babelfishpg_tsql.language`
- `babelfishpg_tsql.migration_mode`
- `babelfishpg_tsql.nocount`
- `babelfishpg_tsql.noexec`
- `babelfishpg_tsql.numeric_roundabort`
- `babelfishpg_tsql.quoted_identifier`
- `babelfishpg_tsql.rowcount`
- `babelfishpg_tsql.server_collation_name`
- `babelfishpg_tsql.showplan_all`
- `babelfishpg_tsql.showplan_text`
- `babelfishpg_tsql.showplan_xml`
- `babelfishpg_tsql.sql_dialect`
- `babelfishpg_tsql.trace_tree`
- `babelfishpg_tsql.trace_exec_codes`
- `babelfishpg_tsql.trace_exec_counts`
- `babelfishpg_tsql.trace_exec_time`
- `babelfishpg_tsql.textsize`
- `babelfishpg_tsql.use_antlr`
- `babelfishpg_tsql.version`
- `babelfishpg_tsql.xact_abort`


Here are the TDS related settings:

- `babelfishpg_tds.default_server_name`
- `babelfishpg_tds.listen_addresses`
- `babelfishpg_tds.port`
- `babelfishpg_tds.set_db_session_property`
- `babelfishpg_tds.tds_debug_log_level`
- `babelfishpg_tds.tds_default_numeric_precision`
- `babelfishpg_tds.tds_default_numeric_scale`
- `babelfishpg_tds.tds_default_packet_size`
- `babelfishpg_tds.tds_default_protocol_version`
- `babelfishpg_tds.tds_ssl_encrypt`
- `babelfishpg_tds.tds_ssl_max_protocol_version`
- `babelfishpg_tds.tds_ssl_min_protocol_version`
- `babelfishpg_tds.trigger_fault_enabled`
- `babelfishpg_tds.unix_socket_directories`
- `babelfishpg_tds.unix_socket_group`
- `babelfishpg_tds.unix_socket_permissions`

Let us discuss these parameters in more detail.

Escape hatches are described in more detail in the
[section on limitations](usage/limitations-of-babelfish#dealing-with-limitations).

### `babelfishpg_tsql.allow_antlr_to_unsupported_grammar_for_testing`

Variable for internal testing - make `antlr` allow some unsupported grammar.
The default value is `false`.

### `babelfishpg_tsql.ansi_defaults`

When `ANSI_DEFAULTS` is enabled, it enables the following ISO settings:
`ANSI_NULLS`, `ANSI_NULL_DFLT_ON`, `IMPLICIT_TRANSACTIONS`, `ANSI_PADDING`,
`QUOTED_IDENTIFIER`, `ANSI_WARNINGS` and `CURSOR_CLOSE_ON_COMMIT`, but according to [the Microsoft documentation]
(https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/statements/set-ansi-defaults-transact-sql.md)
ODBC and OLE DB automatically set `ANSI_DEFAULTS` to `ON` when connecting.
The driver and provider then set `CURSOR_CLOSE_ON_COMMIT` and
`IMPLICIT_TRANSACTIONS` to `OFF`. So `CURSOR_CLOSE_ON_COMMIT` is actually `OFF` at
connect time, but `ANSI_DEFAULTS` is `ON`.

### `babelfishpg_tsql.ansi_null_dflt_off`

Modifies the behavior of the session to override the default nullability of new
columns when the ANSI `NULL` default option for the database is on.

The setting `ON` is not allowed for option `ANSI_NULL_DFLT_OFF`.
Please use `babelfishpg_tsql.escape_hatch_session_settings` to ignore this
variable.

### `babelfishpg_tsql.ansi_null_dflt_on`

Modifies the behavior of the session to override default nullability of new columns
when the ANSI `NULL` default option for the database is `false`.
Setting to `OFF` is not allowed for the option `ANSI_NULL_DFLT_ON`. Please use
`babelfishpg_tsql.escape_hatch_session_settings` to ignore resulting errors.


### `babelfishpg_tsql.ansi_nulls`

Specifies ISO compliant behavior of the "equal" (`=`) and "not equal" (`<>`) comparison
operators when they are used with `NULL` values.


### `babelfishpg_tsql.ansi_padding`

Setting to `OFF` is not allowed for this option. Please use
`babelfishpg_tsql.escape_hatch_session_settings` to ignore errors.


### `babelfishpg_tsql.ansi_warnings`

Setting to `OFF` is not allowed for this option. Please use
`babelfishpg_tsql.escape_hatch_session_settings` to ignore errors.


### `babelfishpg_tsql.arithabort`

Setting to `OFF` is not allowed for this option. Please use
`babelfishpg_tsql.escape_hatch_session_settings` to ignore errors.


### `babelfishpg_tsql.arithignore`

The setting `ON` is not allowed for this option. Please use
`babelfishpg_tsql.escape_hatch_session_settings` to ignore errors.


### `babelfishpg_tsql.concat_null_yields_null`

If enabled, concatenating a `NULL` value produces a `NULL` result.


### `babelfishpg_tsql.cursor_close_on_commit`

The setting `ON` is not allowed for this option. Please use
`babelfishpg_tsql.escape_hatch_session_settings` to ignore errors.


### `babelfishpg_tsql.database_name`

Predefined Babelfish database name. The default value is `babelfish_db`.


### `babelfishpg_tsql.datefirst`

Sets the first day of the week to a number from 1 through 7.


### `babelfishpg_tsql.default_locale`

The default locale to use when creating a new collation. The default value is
`en_US`. Only superusers can set this variable.


### `babelfishpg_tsql.disable_batch_auto_commit`

Disable auto commit inside procedures. The default value is `false`.


### `babelfishpg_tsql.disable_internal_savepoint`

Disable internal savepoints. The default value is `false`.
What is the purpose of this variable? It controls whether a savepoint is created to
handle undo if a command fails. Savepoints are not started for batch commands, as
error handling must be taken care of at the statement level.

This setting is for Babelfish development only and should not be used by end
users.


### `babelfishpg_tsql.disable_txn_in_triggers`

Disable transactions in triggers. The default value is `false`.
TSQL triggers terminate if there is no transaction active at the end.


### `babelfishpg_tsql.dump_antlr_query_graph`

Dump query graph parsed by ANTLR parser to local disk. The path used is
`/tmp/antlr.dot`.


### `babelfishpg_tsql.enable_antlr_detailed_log`

Enable detailed ATNLR parser logging.


### `babelfishpg_tsql.enable_ownership_structure`

Enable Babelfish ownership structure.  This flag is for Babelfish development
and should not be used by end users.


### `babelfishpg_tsql.escape_hatch_compatibility_level`

Suppresses the error when trying to set the compatibility level.


### `babelfishpg_tsql.escape_hatch_constraint_name_for_default`

Escape hatch for `DEFAULT` option in `ALTER TABLE ADD` constraint.


### `babelfishpg_tsql.escape_hatch_database_misc_options`

Escape hatch for misc options in `CREATE/ALTER DATABASE`.


### `babelfishpg_tsql.escape_hatch_for_replication`

Escape hatch for `[NOT] FOR REPLICATION` option.


### `babelfishpg_tsql.escape_hatch_fulltext`

Escape hatch for fulltext search.


### `babelfishpg_tsql.escape_hatch_index_clustering`

Escape hatch for `CLUSTERED` option in `CREATE INDEX` and constraints.


### `babelfishpg_tsql.escape_hatch_index_columnstore`

Escape hatch for `COLUMNSTORE` option in `CREATE INDEX`.


### `babelfishpg_tsql.escape_hatch_join_hints`

Escape hatch for join hints.


### `babelfishpg_tsql.escape_hatch_language_non_english`

Escape hatch for non-english language.


### `babelfishpg_tsql.escape_hatch_login_hashed_password`

Escape hatch for login hashed passwords.


### `babelfishpg_tsql.escape_hatch_login_misc_options`

Escape hatch for login miscellaneous options.


### `babelfishpg_tsql.escape_hatch_login_old_password`

Escape hatch for old login passwords.


### `babelfishpg_tsql.escape_hatch_login_password_must_change`

Escape hatch for login passwords `must_change` option.


### `babelfishpg_tsql.escape_hatch_login_password_unlock`

Escape hatch for login passwords unlock option.


### `babelfishpg_tsql.escape_hatch_nocheck_add_constraint`

Escape hatch for `WITH [NO]CHECK` option in `ALTER TABLE ADD`.


### `babelfishpg_tsql.escape_hatch_nocheck_existing_constraint`

Escape hatch for `WITH [NO]CHECK` option in `ALTER TABLE` on existing
constraint.


### `babelfishpg_tsql.escape_hatch_query_hints`

Escape hatch for query hints.


### `babelfishpg_tsql.escape_hatch_rowguidcol_column`

Escape hatch for `ROWGUIDCOL` option.


### `babelfishpg_tsql.escape_hatch_schemabinding_function`

Escape hatch for `SCHEMABINDING` option in `CREATE FUNCTION`.


### `babelfishpg_tsql.escape_hatch_schemabinding_procedure`

Escape hatch for `SCHEMABINDING` option in `CREATE PROCEDURE`.


### `babelfishpg_tsql.escape_hatch_schemabinding_trigger`

Escape hatch for `SCHEMABINDING` option in `CREATE TRIGGER`.


### `babelfishpg_tsql.escape_hatch_schemabinding_view`

Escape hatch for `SCHEMABINDING` option in `CREATE VIEW`.


### `babelfishpg_tsql.escape_hatch_session_settings`

Escape hatch for session settings.


### `babelfishpg_tsql.escape_hatch_storage_on_partition`

Escape hatch for `storage_on_partition` option in
`CREATE/ALTER TABLE` and `CREATE INDEX`.


### `babelfishpg_tsql.escape_hatch_storage_options`

Escape hatch for storage options option in `CREATE/ALTER TABLE/INDEX`.


### `babelfishpg_tsql.escape_hatch_table_hints`

Escape hatch for table hints.


### `babelfishpg_tsql.escape_hatch_unique_constraint`

Escape hatch for unique constraints.


### `babelfishpg_tsql.fmtonly`

SQL Server compatibility `FMTONLY` option.


### `babelfishpg_tsql.implicit_transactions`

Enable implicit transactions.
If no transaction is running, start an implicit transaction
for qualified commands when `implicit_transactions` config
option is on.


### `babelfishpg_tsql.language`

T-SQL compatibility language option.


### `babelfishpg_tsql.migration_mode`

Defines if multiple T-SQL databases are supported. Valid options are:
`single-db`, `multi-db` and `NULL` (same as `single-db`).
See the [discussion of single-DB versus multiple-DB setup](docs/installation/single-multiple).


### `babelfishpg_tsql.nocount`

T-SQL compatibility `NOCOUNT` option.


### `babelfishpg_tsql.noexec`

SQL Server compatibility `NOEXEC` option.


### `babelfishpg_tsql.numeric_roundabort`

Ends a query when an overflow or division-by-zero error occurs
during query execution.
The setting `ON` is not allowed for this option.


### `babelfishpg_tsql.quoted_identifier`

Interpret double-quoted strings as quoted identifiers.


### `babelfishpg_tsql.rowcount`

Causes the DB engine to stop processing the query after the
specified number of rows are returned.


### `babelfishpg_tsql.server_collation_name`

Name of the default server collation. The default value is
`sql_latin1_general_cp1_ci_as`.


### `babelfishpg_tsql.showplan_all`

SQL Server compatibility `SHOWPLAN_ALL` option.


### `babelfishpg_tsql.showplan_text`

SQL Server compatibility `SHOWPLAN_TEXT` option.


### `babelfishpg_tsql.showplan_xml`

SQL Server compatibility `SHOWPLAN_XML` option.


### `babelfishpg_tsql.sql_dialect`

Sets the dialect for SQL commands. Valid options are

- `postgres`
- `tsql`
- `pg`


### `babelfishpg_tsql.trace_tree`

Dump compiled parse tree prior to code generation.


### `babelfishpg_tsql.trace_exec_codes`

Trace execution code of iterative executor.


### `babelfishpg_tsql.trace_exec_counts`

Trace execution count of each code for iterative executor.


### `babelfishpg_tsql.trace_exec_time`

Trace execution time of each code for iterative executor.


### `babelfishpg_tsql.textsize`

Set `TEXTSIZE`.


### `babelfishpg_tsql.use_antlr`

Selects the new ANTLR parser for pl/tsql functions, procedures, trigger, and
batches. The default value is `true`.


### `babelfishpg_tsql.version`

Sets the output of the `@@VERSION` variable.


### `babelfishpg_tsql.xact_abort`

Control transactional behavior when an error happens.


### `babelfishpg_tds.default_server_name`

Predefined Babelfish default server name.


### `babelfishpg_tds.listen_addresses`

Sets the host name or IP address(es) for TDS to listen on.


### `babelfishpg_tds.port`

The port to use for the TDS protocol (not standard PostgreSQL).

### `babelfishpg_tds.set_db_session_property`

Set database session property on TDS connections. What it means is that
`babelfishpg_tsql.database_name` is set during the login process. An error will
happen if the `database_name` is not set.


### `babelfishpg_tds.tds_debug_log_level`

Set the debug level for TDS.


### `babelfishpg_tds.tds_default_numeric_precision`

Sets the default precision of numeric type to be sent in
the TDS column metadata if the engine does not specify one.
The default value is 38.


### `babelfishpg_tds.tds_default_numeric_scale`

Sets the default scale of numeric type to be sent in
the TDS column metadata if the engine does not specify one.


### `babelfishpg_tds.tds_default_packet_size`

Sets the default packet size for all the clients being connected.


### `babelfishpg_tds.tds_default_protocol_version`

Sets a default TDS protocol version for all the clients being connected.


### `babelfishpg_tds.tds_ssl_encrypt`

Sets the SSL Encryption option. The default value is `false`.


### `babelfishpg_tds.tds_ssl_max_protocol_version`

Sets the maximum SSL/TLS protocol version to use for the TDS session.


### `babelfishpg_tds.tds_ssl_min_protocol_version`

Sets the maximum SSL/TLS protocol version to use for the TDS session.


### `babelfishpg_tds.trigger_fault_enabled`

Enable fault injection triggers.


### `babelfishpg_tds.unix_socket_directories`

The UNIX socket directory.


### `babelfishpg_tds.unix_socket_group`

The UNIX socket group.


### `babelfishpg_tds.unix_socket_permissions`

UNIX socket permissions.
