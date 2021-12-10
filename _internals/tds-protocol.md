---
layout: default
title: The TDS protocol
nav_order: 8
---

## The TDS wire protocol

Babelfish exposes PostgreSQL as an Microsoft SQL Server. To achieve that, the community has
implemented the TDS wire protocol which forms the backbone of the entire solution.
In this chapter, we want to take a deeper look at the details of the protocol's
inner workings, and understand how things happen.

### Basic message flow

Let's first dive into the most basic flow of messages.
The following [image](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-tds/ms-tds_files/image001.png) shows the
basic communication exchange on a high level.

As a database protocol, TDS relies on network transmission order and expects a
reliable connection which basically means ...

- TCP
- VIA (Virtual Interface Architecture)
- Named pipes

Optionally, TDS can also implement:

- Transport Layer Security (TLS)/Secure Socket Layer (SSL)
- Session Multiplex Protocol (SMUX), in case the Multiple Active Result Sets
  (MARS) feature is required

UDP and other less reliable methods are not supported.
Before discussing these messages in a bit more detail, we can take a look at a
more detailed [message
flow](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-tds/ms-tds_files/image008.png)
which has kindly been provided by Microsoft as part of their documentation. As
you can see, the flow of a message is not really trivial. However, with a bit of 
reading you can understand it. So let's get down to it and dive into the details.


### TDS Packet Header

The first thing you should be aware of in this context is the structure of a TDS
header. It contains the following elements:

- Type: What type of message are we sending?
- Status: State of the message
- Length: Length of the message from the start of the packet. An unsigned short
  header to the end of the token data is used (up to 65535).
- SPID: Session ID of the current connection.
- PacketID: For each packet sent, this is incremented. It is especially important
  for messages spanning multiple packets. The value is sent as "modulo 255"
  which means that 1 byte is needed.
- Window: Currently unused. The value sent is 0x0.


### TDS PRELOGIN communication

Before a connection has been established, the protocol requires pre-login
communication to negotiate some of the most important connection attributes. We
can see the initial package sent to be some "knock on the door, let me in" thing
going on while the connection is established. This serves various purposes:
First of all, vital info is exchanged, and secondly, the system can terminate the
attempt if client and server do not understand each other in the first place. 

What does that mean in real life? Let's try it out using good old telnet:

```bash
[user@host]$ telnet demo.babelfish.host.com 1433
Trying 1.2.3.4 ...
Connected to demo.babelfish.host.com
Escape character is '^]'.
321312321321
Connection closed by foreign host.
```

As you can see, we can communicate with the host but it terminates the
connection due to a protocol violation.

After a successful <code>PRELOGIN</code>, the client can attempt an additional 
<code>PRELOGIN</code> to facilitate an SSL/TLS handshake to encypt the connection.

Once we are over the <code>PRELOGIN</code> phase, we are ready for 
<code>LOGIN7</code> which defines the authentication rules for use 
between client and server.

### SSL/TLS support for TDS connections

Babelfish uses native PostgreSQL support for using SSL connections to encrypt client/server communications. See PostgreSQL [documentation](https://www.postgresql.org/docs/13/ssl-tcp.html#SSL-SETUP) for details about configuring server-side SSL functionality.
With SSL support compiled in, the PostgreSQL server can be started with SSL enabled by setting the parameter <code>ssl</code> to <code>on</code> in postgresql.conf. The server will listen for both normal and SSL connections on the same TCP port, and will negotiate with any connecting client on whether to use SSL. By default, a client can decide whether to use SSL connections or not. If <code>babelfishpg_tds.tds_ssl_encrypt</code> is set to <code>true</code>, end-to-end encryption is enforced for all connections. In that case, if a client requests for a non-encrypted connection, the connection is rejected.

The table following shows how Babelfish behaves for each combination.

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

### Defining authentication rules

<code>LOGIN7</code> is the TDS ways of defining authentication rules. 
Client and server both have to know how to handle authentication rules, which are vital to security.
Fortunately Microsoft has provided some detailed in-depth description of the
[LOGIN7](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-tds/773a62b6-ee89-4c02-9e5e-344882630aac)
message which can be found on their website.
