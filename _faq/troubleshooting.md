---
layout: default
title: Troubleshooting
nav_order: 3
---

## Babelfish troubleshooting

In this section, you will learn about the most common problems users face
when dealing with Babelfish. It contains an overview of the most substantial
issues and give solutions to common problems.


### Babelfish starts but I cannot run MS SQL code

There are a couple of reasons why this can happen. The most common one is that
you have started Babelfish but `shared_preload_libraries` are not set properly.
Why is this important? MS SQL support is loaded as a library which has to be
configured at startup. Basically, the design of the hooks used to make MS SQL
support work is set up in a way that it is supposed to work for other database
engines as well. To handle the specific behavior, code has to be loaded. In case
this is not done, Babelfish will not present itself as MS SQL Server on TCP port
1433.

Check out the [installation page](../../installation/compiling-babelfish-from-source) and make sure that
everything of importance has been done.

A second problem that may occur is that the port is closed due to firewall issues. Make
sure port 1433 is open and available so that your clients can connect. So how
can we verify that the port is open and only the client does not work? One useful way
we found is to simply use good old telnet:

```bash
[user@server ~]$ telnet localhost 1433
Trying ::1...
Connected to localhost.
Escape character is '^]'.
whatever message   
Connection closed by foreign host.


[user@server ~]$ telnet localhost 9999
#Trying ::1...
telnet: connect to address ::1: Connection refused
Trying 127.0.0.1...
telnet: connect to address 127.0.0.1: Connection refused

```

### Babelfish aborts my connection

If a connection is suddenly gone after performing an operation, there could be
various reasons for that. Apart from network failures, which can pop up seemingly
randomly, it is possible that Babelfish has crashed. In fact,
reproducible connection losses are often related to crashes.

If you want to help the team, it is highly appreciated if you can provide a
backtrace of a crashed database. How can you produce such a backtrace, in case of
a severe crash?

The [PostgreSQL wiki page](https://wiki.postgresql.org/wiki/Getting_a_stack_trace_of_a_running_PostgreSQL_backend_on_Linux/BSD) 
has a good overview of how to create backtraces for later inspection. 

