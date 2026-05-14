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


### SSL/TLS support for client connections

Babelfish uses native PostgreSQL support for using SSL connections to encrypt client/server communications. See the PostgreSQL [documentation](https://www.postgresql.org/docs/13/ssl-tcp.html#SSL-SETUP) for details about configuring server-side SSL functionality.

To use SSL encryption, compile the PostgreSQL server with support for SSL, and set the <code>ssl</code> parameter to <code>on</code> in the postgresql.conf file. The server will listen for SSL and non-SSL connections on the same TCP port, and will negotiate with any connecting client about using SSL. By default, a client can choose whether to require an SSL connection or not. The server will listen for both unencrypted and encrypted connections on the same TCP port, and negotiate the connection type with the connecting client.  If <code>babelfishpg_tds.tds_ssl_encrypt</code> is set to <code>true</code>, end-to-end encryption is enforced for all connections. In that case, if a client requests an unencrypted connection, the connection is rejected.

The following table shows how Babelfish interprets SSL settings when a client connects:

| Client SSL setting   | Babelfish SSL setting | Connection allowed?                         | Value returned to client |
|:---------------------|:----------------------|:--------------------------------------------|:-------------------------|
| ENCRYPT_OFF          | tds_ssl_encrypt=false | Allowed, the login packet is encrypted      | ENCRYPT_OFF              |
| ENCRYPT_OFF          | tds_ssl_encrypt=true  | Allowed, the entire connection is encrypted | ENCRYPT_REQ              |
| ENCRYPT_ON           | tds_ssl_encrypt=false | Allowed, the entire connection is encrypted | ENCRYPT_ON               |
| ENCRYPT_ON           | tds_ssl_encrypt=true  | Allowed, the entire connection is encrypted | ENCRYPT_ON               |
| ENCRYPT_NOT_SUP      | tds_ssl_encrypt=false | Yes                                         | ENCRYPT_NOT_SUP          |
| ENCRYPT_NOT_SUP      | tds_ssl_encrypt=true  | No, connection closed                       | ENCRYPT_REQ              |
| ENCRYPT_REQ          | tds_ssl_encrypt=false | Allowed, the entire connection is encrypted | ENCRYPT_ON               |
| ENCRYPT_REQ          | tds_ssl_encrypt=true  | Allowed, the entire connection is encrypted | ENCRYPT_ON               |
| ENCRYPT_CLIENT_CERT  | tds_ssl_encrypt=false | No, connection closed                       | Unsupported              |
| ENCRYPT_CLIENT_CERT  | tds_ssl_encrypt=true  | No, connection closed                       | Unsupported              |


### User management and roles

Babelfish creates a number of T-SQL roles:

- `sysadmin`
- `master_db_owner`
- `master_dbo`
- `master_guest`
- `tempdb_db_owner`
- `tempdb_dbo`
- `tempdb_guest`

Babelfish creates a <code>*dbname*&lowbar;db&lowbar;owner</code> and a <code>*dbname*&lowbar;dbo</code> for each database you create in Babelfish. Additionally following roles are also supported.

| Feature                                                                                   | Supported versions   |
|:------------------------------------------------------------------------------------------|:---------------------|
| Fixed server roles: dbcreator, securityadmin                                              | Version 4.5+, 5.1+  |
| Fixed database roles: db_owner, db_datareader, db_datawriter, db_accessadmin, db_securityadmin | Version 4.5+, 5.1+  |
| ALTER AUTHORIZATION ON DATABASE (change DB owner)                                         | Version 3.4+         |
| Schema-level GRANT/REVOKE (GRANT ... ON SCHEMA::)                                        | Version 3.6+, 4.2+  |
| Object-level GRANT/REVOKE (GRANT ... ON OBJECT::)                                        | All versions         |
| ALTER SERVER ROLE ... ADD MEMBER                                                          | All versions         |

These roles implement the SQL Server object ownership structure; they are maintained by the database, and should not be used for client connections.