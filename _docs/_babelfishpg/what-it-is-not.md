---
layout: default
title: What is not Babelfish
parent: Definition of Babelfish
nav_order: 3
has_children: false
---

Babelfish is not a migration tool, it will not handle data migrations from SQL Server to Postgres. Also Babelfish is not a proxy or midleware between SQL Server and PostgreSQL. 

The following is a list of functions that are not supported by Babelfish:

| MSSQL Function | Babelfish potential workaround |
| -------------- | ------------------------------ |
| [app_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/app-name-transact-sql.md) | SELECT application_name FROM pg_stat_activity WHERE pid = pg_backend_pid(); |
| [approx_count_distinct](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/approx-count-distinct-transact-sql.md) | |
| [assemblyproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/assemblyproperty-transact-sql.md) | |
| [asymkey_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/asymkey-id-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) | 
| [asymkeyproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/asymkeyproperty-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [atn2](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/atn2-transact-sql.md) | atan2 |
| [cast_and_convert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cast-and-convert-transact-sql.md) | |
| [cert_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cert-id-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html#:~:text=CXX%20environment%20variable).-,--with-openssl,-Build%20with%20support) at build time |
| [certencoded](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certencoded-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html#:~:text=CXX%20environment%20variable).-,--with-openssl,-Build%20with%20support) at build time |
| [certprivatekey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certprivatekey-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html#:~:text=CXX%20environment%20variable).-,--with-openssl,-Build%20with%20support) at build time |
| [certproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/certproperty-transact-sql.md) | Use [OpenSSL flag](https://www.postgresql.org/docs/13/install-procedure.html#:~:text=CXX%20environment%20variable).-,--with-openssl,-Build%20with%20support) at build time |
| [checksum_agg](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/checksum-agg-transact-sql.md) | |
| [col_length](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/col-name-transact-sql.md) | User Defined Function |
| [col_name](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/col-name-transact-sql.md) | select attname from pg_attribute WHERE attrelid = object_id('public.info') and attnum = 1 |
| [columnproperty](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/columnproperty-transact-sql.md) | User defined function to match property names                               |
| [columns_updated](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/columns-updated-transact-sql.md) | SQL allows you to define aliases for the "old" and "new" rows or tables for use in the definition of the triggered action (e.g., CREATE TRIGGER ... ON tablename REFERENCING OLD ROW AS somename NEW ROW AS othername ...). More information [here](https://www.postgresql.org/docs/13/sql-createtrigger.html) | 
| [compress](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/compress-transact-sql.md) | [Gzip extension](https://pgxn.org/dist/gzip/?spm=a2c65.11461447.0.0.7ab13d3a2dbsHD) |
| [connections](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/connections-transact-sql.md) | Can only get active/idle connections with SELECT count(*) FROM pg_stat_activity; |
| [context_info](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/context-info-transact-sql.md) | |
| [cpu_busy](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/cpu-busy-transact-sql.md) | |
| [crypt_gen_random](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/crypt-gen-random-transact-sql.md) | Use [gen_random_uuid()](https://www.postgresql.org/docs/13/pgcrypto.html#id-1.11.7.34.10) with [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [current_request_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-request-id-transact-sql.md) | |
| [current_timezone](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-timezone-transact-sql.md) | |
| [current_transaction_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/current-transaction-id-transact-sql.md) | |
| [database_principal_id](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/database-principal-id-transact-sql.md) | See [pg_database](https://www.postgresql.org/docs/13/catalog-pg-database.html), [pg_db_role_setting](https://www.postgresql.org/docs/13/catalog-pg-db-role-setting.html), [pg_roles](https://www.postgresql.org/docs/13/view-pg-roles.html) |
| [datediff_big](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datediff-big-transact-sql.md) | Need to create UDF similar to one in [this post](http://www.sqlines.com/postgresql/how-to/datediff) using DATE_PART |
| [datefirst](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datefirst-transact-sql.md) | select setting from pg_settings where name = 'datefirst' |
| [datetimeoffsetfromparts])(https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/datetimeoffsetfromparts-transact-sql.md) | |
| [dbts](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/dbts-transact-sql.md) | Use txid_currrent() |
| [decompress](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decompress-transact-sql.md) | |
| [decryptbyasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbyasymkey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbycert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbycert-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbykey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbykey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbykeyautoasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbykeyautoasymkey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbykeyautocert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbykeyautocert-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [decryptbypassphrase](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/decryptbypassphrase-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [difference](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/difference-transact-sql.md) | Use extension [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch.html) |
| [encryptbyasymkey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbyasymkey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [encryptbycert](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbycert-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [encryptbykey](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbykey-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [encryptbypassphrase](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/encryptbypassphrase-transact-sql.md) | [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html) |
| [eomonth](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/eomonth-transact-sql.md) | |
| [eventdata](https://github.com/MicrosoftDocs/sql-docs/blob/live/docs/t-sql/functions/eventdata-transact-sql.md) | |
| 