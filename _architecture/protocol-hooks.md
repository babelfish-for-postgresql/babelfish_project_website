---
layout: default
title: Protocol Hooks
nav_order: 8
has_children: false
permalink: /docs/architecture/protocol-hooks
user_mermaid: true
---

At the moment of this writing, PostgreSQL only supports the FE/BE protocol and is handled by the [postmaster](https://github.com/postgres/postgres/blob/a1708ab652eaef3e9405d5119721a9a4ecb6fcbd/src/backend/postmaster/postmaster.c). 

In PostgreSQL, the postmaster is responsible (among other things) for initiating the processes that will handle the connections request. 

Basically, the postmaster just waits for a new connection request to arrive, when it comes it creates a new backend process to handle the communication for that connection. 

The communication is handled by the [pq_comm](https://github.com/postgres/postgres/blob/e849f3f1f884ad140b60a24354c6371cbd2efbb6/src/backend/libpq/pqcomm.c)

``` mermaid
sequenceDiagram
    Client->>+postmaster: 
    postmaster->>+postmaster: ConnCreate(ListenSocket[i])
    postmaster->>+pq_comm: StreamConnection(serverFd, port)            
```

Given that the postmaster interacts directly with the pq_comm, is not possible to 
 support more protocols without modifying the postmaster. 

Babelfish supports protocol hooks by modifying several aspects of the PostgreSQL 
 connection management. 

In Babelfish, when the postmaster starts, looks for which are the supported 
 protocols. 

This happens during postmaster initialization phase. 

``` mermaid
sequenceDiagram
    main->>postmaster:PostmasterMain
    postmaster->>tds_srv:list_init_hook
    tds_srv->>tds_srv:pe_listen_init
```

Babelfish also holds in the postmaster a connection callback functions for every 
 socket that is created, that way it can instruct which protocol will be used be 
 each socket.

``` mermaid
sequenceDiagram
    Client->>+postmaster: 
    postmaster->>+postmaster: ConnCreate(ListenSocket[i], ListenConfig[i]);
    postmaster->>+port: proto_config(serverFd, port)->fn_accept
```


