---
layout: default
title: Troubleshooting
nav_order: 3
---

## Babelfish troubleshooting

This section explains some of the most common problems faced when working with Babelfish, and possible solutions.


### Babelfish starts but I can't run SQL Server code

There are a couple of reasons this can happen. The most common reason is that you have started Babelfish before adding `babelfish_tds` to the `shared_preload_libraries` parameter in the `postgresql.conf` file. If you don't update the parameter value before starting the PostgreSQL server, the library required to process SQL Server commands won't load, and Babelfish won't run.

For detailed installation and configuration instructions, check out the [installation page](/docs/installation/compiling-babelfish-from-source).

Another reason the server might start, but without Babelfish support is that the TDS port is blocked by the firewall. You should
ensure port 1433 is open and available so that your clients can connect. One way to confirm the state of the port is to use telnet. The first example shows a successful connection to port 1433:

```bash
[user@server ~]$ telnet localhost 1433
Trying ::1...
Connected to localhost.
Escape character is '^]'.
whatever message   
Connection closed by foreign host.
```

The following example demonstrates telnet refusing a connection:

```bash
[user@server ~]$ telnet localhost 1433
#Trying ::1...
telnet: connect to address ::1: Connection refused
Trying 127.0.0.1...
telnet: connect to address 127.0.0.1: Connection refused

```


### Babelfish aborts my connection

A Babelfish connection may unexpectedly terminate due to a network failure or Babelfish server crash.
Reproducible connection losses are often related to crashes.

If you want to help the team, you can provide a backtrace of a crashed database. The [PostgreSQL wiki page](https://wiki.postgresql.org/wiki/Getting_a_stack_trace_of_a_running_PostgreSQL_backend_on_Linux/BSD) provides a good overview of how to create backtraces for later inspection. 

After capturing the backtrace, [open an issue](https://github.com/babelfish-for-postgresql/babelfish_extensions/issues) with detailed information about the crash, and attach the backtrace.

