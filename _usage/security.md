---
layout: default
title: Managing security
nav_order: 7
---

## Babelfish security

Security is an important topic which has to be addressed in a professional
manner. Therefore we want to give an overview of how security is handled and
what can be done to make the database more robust and resistant against attack.
To cover the topic, we need to address the following issues:

- Network security and authentication
- User management and roles

Let's discuss each of those topics in more detail.


### Handling SSL

When a client connects to port 1433, Babelfish compares the SSL setting sent
during the client handshake to the Babelfish SSL parameter setting
(<code>tds_ssl_encrypt</code>) and determines if a connection will be allowed.
If a connection is allowed, encryption behavior is either enforced or not,
depending on your parameter settings and the support for encryption offered by
the client.

The table below shows how Babelfish behaves for each combination:

| Client SSL | Babelfish SSL Setting  | Connection allowed   | Value Returned to client |
| ----------------- | ----------------- | ------- | ----------------- | 
| `ENCRYPT_OFF`   | `tds_ssl_encrypt=0`  | Terminated  | `ENCRYPT_REQ`   |
| `ENCRYPT_OFF`   | `tds_ssl_encrypt=1`   | Allowed | `ENCRYPT_OFF`  |
| `ENCRYPT_ON`    | `tds_ssl_encrypt=0` | Allowed | `ENCRYPT_ON`   |
| `ENCRYPT_ON`    | `tds_ssl_encrypt=1` | Allowed | `ENCRYPT_ON`   |
| `ENCRYPT_NOT_SUP` | `tds_ssl_encrypt=0` | Terminated | `ENCRYPT_REQ` |
| `ENCRYPT_NOT_SUP` | `tds_ssl_encrypt=1` | Allowed | `ENCRYPT_NOT_SUP` |
| `ENCRYPT_REQ`   | `tds_ssl_encrypt=0`   | Allowed | `ENCRYPT_ON`  |
| `ENCRYPT_REQ`   | `tds_ssl_encrypt=0`   | Allowed | `ENCRYPT_ON`  |
| `ENCRYPT_CLIENT_CERTYPT_CLIENT_CERT`  | `tds_ssl_encrypt=0` | Terminated | Unsupported  |
| `ENCRYPT_CLIENT_CERTYPT_CLIENT_CERT`  | `tds_ssl_encrypt=0` | Terminated | Unsupported  |



### User management and roles

By default, Babelfish comes with extra users on top of what PostgreSQL
has to offer. Here is a list of users to be found in a fresh Babelfish
installation: 

- `sysadmin`
- `master_db_owner`
- `master_dbo`
- `master_guest`
- `tempdb_db_owner`
- `tempdb_dbo`
- `tempdb_guest`

These users are MS SQL-specific and try to mimic what the target database is
supposed to look like. 

In addition to that, all users that are normally available in PostgreSQL are
available as well:

- `postgres`
- `pg_monitor`
- `pg_read_all_settings`
- `pg_read_all_stats`
- `pg_stat_scan_tables`
- `pg_read_server_files`
- `pg_write_server_files`
- `pg_execute_server_program`
- `pg_signal_backend`

These users are unchanged, and can be used just like in a normal PostgreSQL
installation.
