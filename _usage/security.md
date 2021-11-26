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

Moreover, there will be a <code>*dbname*&lowbar;db&lowbar;owner</code>
and a <code>*dbname*&lowbar;dbo</code> for every database you create in
Babelfish.

These roles implement the SQL Server ownership structure.
They are created and maintained by Babelfish and should not be used by
the application or the end user.

You can use `CREATE LOGIN` to create a new Babelfish login, which
automatically is a user in all databases.  Babelfish logins
are implemented as PostgreSQL login roles of the same name.

Note that Babelfish [does not support](/docs/usage/limitations-of-babelfish)
the statements `CREATE USER` and `CREATE ROLE`.
