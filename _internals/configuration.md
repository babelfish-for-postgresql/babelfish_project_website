---
layout: default
title: Configuration parameters
nav_order: 3
---

## Babelfish configuration parameters

You can use Babelfish configuration parameters to adjust the behavior of Babelfish to best fit your needs. Some of these parameters should only be modified before cluster creation, while others should not be modified.

See the following descriptions for more information about each parameter.


### `babelfishpg_tsql.ansi_defaults`

When `ANSI_DEFAULTS` is turned on, it enables the following settings: `ANSI_NULLS`, `ANSI_NULL_DFLT_ON`, `IMPLICIT_TRANSACTIONS`, `ANSI_PADDING`, `QUOTED_IDENTIFIER`, `ANSI_WARNINGS` and `CURSOR_CLOSE_ON_COMMIT`. The driver and provider set `CURSOR_CLOSE_ON_COMMIT` and `IMPLICIT_TRANSACTIONS` to `OFF` (so `CURSOR_CLOSE_ON_COMMIT` is actually `OFF` at connect time, though `ANSI_DEFAULTS` is `ON`).


### `babelfishpg_tsql.ansi_nulls`

Specifies ISO compliant behavior of the "equal" (`=`) and "not equal" (`<>`) comparison
operators when they are used with `NULL` values.


### `babelfishpg_tsql.concat_null_yields_null`

If enabled, concatenating a `NULL` value produces a `NULL` result.


### `babelfishpg_tsql.database_name`

The predefined Babelfish database name. The default value is `babelfish_db`.


### `babelfishpg_tsql.datefirst`

Sets the first day of the week to a number from 1 through 7.


### `babelfishpg_tsql.default_locale`

The default locale to use when creating a new collation. The default value is `en_US`. You should not modify this value after a database is initialized. You must be a superuser to set this parameter.


### `babelfishpg_tsql.disable_batch_auto_commit`

This parameter disables auto commit inside procedures. The default value is `false`.


### `babelfishpg_tsql.disable_txn_in_triggers`

This parameter disables transactions in triggers. The default value is `false`.
TSQL triggers terminate if there is no transaction active at the end.


### `babelfishpg_tsql.fmtonly`

This parameter controls SQL Server compatibility related to the `FMTONLY` option.


### `babelfishpg_tsql.implicit_transactions`

This parameter enables implicit transactions.
If no transaction is running, the server will start an implicit transaction
for qualified commands when the `implicit_transactions` parameter is set to
on.


### `babelfishpg_tsql.migration_mode`

This parameter specifies if multiple T-SQL databases are supported. Valid options are:
`single-db`, `multi-db` and `NULL` (same as `single-db`).
For more information, see the [discussion of single-DB versus multiple-DB setup](docs/installation/single-multiple).

This parameter should not be changed after the database is initialized.


### `babelfishpg_tsql.nocount`

This parameter controls the T-SQL compatibility `NOCOUNT` option.


### `babelfishpg_tsql.noexec`

This parameter controls the SQL Server compatibility `NOEXEC` option.


### `babelfishpg_tsql.quoted_identifier`

This parameter instructs Babelfish to interpret double-quoted strings as quoted identifiers.


### `babelfishpg_tsql.rowcount`

This parameter instructs Babelfish to stop processing the query after the
specified number of rows are returned.


### `babelfishpg_tsql.server_collation_name`

This parameter specifies the name of the default [server collation](https://babelfishpg.org/docs/usage/locales/). The default value is
`sql_latin1_general_cp1_ci_as`. You should not modify this setting after initializing the database.


### `babelfishpg_tsql.showplan_all`

This parameter controls the SQL Server compatibility `SHOWPLAN_ALL` option.


### `babelfishpg_tsql.showplan_text`

This parameter controls the SQL Server compatibility `SHOWPLAN_TEXT` option.


### `babelfishpg_tsql.showplan_xml`

This parameter controls the SQL Server compatibility `SHOWPLAN_XML` option.


### `babelfishpg_tsql.trace_tree`

This parameter instructs Babelfish to dump the compiled parse tree prior to code generation.


### `babelfishpg_tsql.trace_exec_codes`

This parameter instructs Babelfish to trace the execution code of iterative executors.


### `babelfishpg_tsql.trace_exec_counts`

This parameter instructs Babelfish to trace the execution count of iterative executors.


### `babelfishpg_tsql.trace_exec_time`

This parameter instructs Babelfish to trace the execution time of iterative executors.


### `babelfishpg_tsql.textsize`

This parameter sets the `TEXTSIZE`.


### `babelfishpg_tsql.version`

This parameter sets the output of the `@@VERSION` function.


### `babelfishpg_tsql.xact_abort`

This parameter instructs Babelfish how to control transactional behavior when an error happens.


### `babelfishpg_tds.default_server_name`

This parameter specifies the predefined Babelfish default server name. The default value is Microsoft SQL Server.


### `babelfishpg_tds.listen_addresses`

This parameter sets the host name or IP address(es) for TDS to listen on.


### `babelfishpg_tds.port`

This parameter specifies the port to use for the TDS protocol (not standard PostgreSQL). Accepted values are from 1-65535; the default is 1433.


### `babelfishpg_tds.set_db_session_property`

This parameter specifies the database session property used for TDS connections. This means that
`babelfishpg_tsql.database_name` is set during the login process. An error will
occur if the `database_name` is not set.


### `babelfishpg_tds.tds_debug_log_level`

This parameter specifies the debug level for TDS. Accepted values are 0, 1, 2, 3; a setting of 0 will turn off logging. The default is 1.


### `babelfishpg_tds.tds_default_numeric_precision`

This parameter specifies the default precision of numeric type to be sent in the TDS column metadata if the engine does not specify one.
Accepted values are from 1 to 38; the default value is 8.


### `babelfishpg_tds.tds_default_numeric_scale`

This parameter specifies the default scale of numeric type to be sent in the TDS column metadata if the engine does not specify one. Accepted values are from 0 to 38; the default value is 8.


### `babelfishpg_tds.tds_default_packet_size`

This parameter specifies the default packet size for all the clients being connected. Accepted values range from 512 to 32767; the default value is 4096.


### `babelfishpg_tds.tds_default_protocol_version`

This parameter specifies the default TDS protocol version for all the clients being connected. The accepted values are:

- TDSv7.0
- TDSv7.1
- TDSv7.1.1
- TDSv7.2
- TDSv7.3A
- TDSv7.3B 
- TDSv7.4 
- DEFAULT


### `babelfishpg_tds.tds_ssl_encrypt`

This parameter specifies the SSL encryption used by Babelfish. The default value is `false`.


### `babelfishpg_tds.tds_ssl_max_protocol_version`

Sets the maximum SSL/TLS protocol version to use for the TDS session. The default value is 'TLSv1.2'; accepted values are:

- TLSv1
- TLSv1.1
- TLSv1.2


### `babelfishpg_tds.tds_ssl_min_protocol_version`

Sets the maximum SSL/TLS protocol version to use for the TDS session. The default value is 'TLSv1'; accepted values are:

- TLSv1
- TLSv1.1
- TLSv1.2


### `babelfishpg_tds.trigger_fault_enabled`

This parameter controls fault injection triggers.


### `babelfishpg_tds.unix_socket_directories`

The UNIX socket directory. The default is /tmp.


### `babelfishpg_tds.unix_socket_group`

This parameter controls the UNIX socket group setting.


### `babelfishpg_tds.unix_socket_permissions`

This parameter controls UNIX socket permissions. The default is 0700.



## Parameters that should not be modified

You may come across these parameters in the source code, but you shouldn't change them:

- `babelfishpg_tsql.allow_antlr_to_unsupported_grammar_for_testing`
- `babelfishpg_tsql.ansi_null_dflt_off`
- `babelfishpg_tsql.ansi_null_dflt_on`
- `babelfishpg_tsql.ansi_padding`
- `babelfishpg_tsql.ansi_warnings`
- `babelfishpg_tsql.arithabort`
- `babelfishpg_tsql.arithignore`
- `babelfishpg_tsql.cursor_close_on_commit`
- `babelfishpg_tsql.disable_internal_savepoint`
- `babelfishpg_tsql.language`
- `babelfishpg_tsql.numeric_roundabort`

The following parameter is for specific development use only. Any use of `babelfishpg_tsql.sql_dialect` is not supported as errors, malfunctions or functional incorrect behavior could result:

- `babelfishpg_tsql.sql_dialect`

These parameters are scheduled for removal from the source code, and should not be modified:

- `babelfishpg_tsql.dump_antlr_query_graph`
- `babelfishpg_tsql.enable_antlr_detailed_log`




