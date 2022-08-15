---
layout: default
title: Managing security
nav_order: 7
---

## Babelfish security

Babelfish provides a safe environment by: 

- supporting encryption with configurable client SSL connections.  
- securing Babelfish objects with predefined roles.

The following sections discuss each of those topics in more detail.


### Handling SSL for client connections

When a client connects to port 1433, Babelfish compares the SSL setting sent
during the client handshake to the Babelfish SSL parameter setting
(`tds_ssl_encrypt`) and determines if a connection will be allowed.
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

Babelfish creates a number of PostgreSQL roles:

- `sysadmin`
- `master_db_owner`
- `master_dbo`
- `master_guest`
- `tempdb_db_owner`
- `tempdb_dbo`
- `tempdb_guest`

Babelfish also creates a <code>*dbname*&lowbar;db&lowbar;owner</code> and a <code>*dbname*&lowbar;dbo</code> for each database you create in Babelfish.

These roles implement the SQL Server object ownership structure; they are maintained by the database, and should not be used for client connections.

You can use `CREATE LOGIN` to create a new Babelfish login with access to all databases.  Babelfish logins
are implemented as PostgreSQL login roles of the same name.  Note that Babelfish [provides limited support](/docs/usage/limitations-of-babelfish)
for the `CREATE USER` and `CREATE ROLE` statements.
