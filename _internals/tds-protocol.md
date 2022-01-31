---
layout: default
title: The TDS protocol
nav_order: 8
---

## The TDS wire protocol

Babelfish implements SQL Server behavior over the TDS wire protocol on a PostgreSQL server.  Babelfish supports connection over the following networking types with supporting protocols: 

- [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
- VIA (Virtual Interface Architecture)
- [Named pipes](https://en.wikipedia.org/wiki/Named_pipe)
- Transport Layer Security [(TLS)](https://en.wikipedia.org/wiki/Transport_Layer_Security) with Secure Socket Layer [(SSL)](https://datatracker.ietf.org/doc/html/rfc6101)


### Basic message flow

The message flow starts with the client reaching out to the server with a connection request; when the server responds, the client replies with an authentication request.  After successfully authenticating, further client requests and server responses are passed back and forth between the client and server. TDS relies on network transmission order between the client and server to maintain the handshake.  


### TDS Packet Header

Each client request or server response is made up of one or more packets.  Each packet contains a TDS header with the following elements:

- Type: The type of message 
- Status: State of the message
- Length: Length of the message from the start of the packet. This is an unsigned short header to the end of the token data (up to 65535).
- SPID: Session ID of the current connection.
- PacketID: For each packet sent, PacketID is incremented. It is especially important for messages spanning multiple packets. The value is sent as "modulo 255", which means that 1 byte is needed.
- Window: Currently unused. The value sent is 0x0.


### TDS PRELOGIN, the SSL handshake, and LOGIN7

Before a connection is established, the TDS protocol requires PRELOGIN communication to negotiate some important connection attributes. Vital info is exchanged, and the system can terminate the connection attempt if the client and server do not understand each other. 

After successful PRELOGIN communication, the client can facilitate an SSL/TLS handshake. The client negotiates authentication and encryption based on the [SSL configuration](https://babelfishpg.org/docs/internals/tds-protocol/#ssltls-support-for-tds-connections) of your Babelfish server.

Once past PRELOGIN, the client can use LOGIN7 to define the authentication rules that will be used between client and server.


### SSL/TLS support for TDS connections

Babelfish uses native PostgreSQL support for using SSL connections to encrypt client/server communications. See PostgreSQL [documentation](https://www.postgresql.org/docs/13/ssl-tcp.html#SSL-SETUP) for details about configuring server-side SSL functionality.

To use SSL encryption, [compile the PostgreSQL server with support for SSL,](https://www.postgresql.org/docs/13/install-procedure) and set the <code>ssl</code> parameter to <code>on</code> in the postgresql.conf file. The server will listen for SSL and non-SSL connections on the same TCP port, and will negotiate with any connecting client about using SSL. By default, a client can choose whether to require an SSL connection or not. The server will listen for both unencrypted and encrypted connections on the same TCP port, and negotiate the connection type with the connecting client.  If <code>babelfishpg_tds.tds_ssl_encrypt</code> is set to <code>true</code>, end-to-end encryption is enforced for all connections. In that case, if a client requests an unencrypted connection, the connection is rejected.

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



