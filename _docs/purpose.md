---
layout: default
title: Purpose of Babelfish
nav_order: 1
---

## Purpose of Babelfish

Babelfish is designed to translate between various database behaviors. 
Vendor differences can make migrating between databases difficult, 
so Babelfish was created to speak more than one protocol and present 
itself as more than PostgreSQL. Specifically, Babelfish closes the gap 
between PostgreSQL and Microsoft SQL Server by teaching PostgreSQL to speak 
TDS, the native client-server protocol of Microsoft SQL Server. In addition, 
Babelfish implements support for Microsoft SQL Server's SQL syntax, which 
makes it easier to move to PostgreSQL.

However, moving applications is just one side of the equation. Migrating data
is one thing - making sure that applications work properly is another, far
more important thing. In fact, migrating data to PostgreSQL can be relatively
easy, while migrating entire application stacks can be quite difficult.

That's exactly why Babelfish is so important. It allows you to take existing
applications, hook them up to TDS-enabled PostgreSQL and run them more quickly
and easily, even while some migration work is still going on.

A typical use-case scenario for Babelfish would be when the source code of an 
application is not available, or is too hard to modify for technical or financial 
reasons. In cases like these, Babelfish provides a critical link that allows 
blocked projects to proceed.


### What Babelfish is not

While Babelfish can ease a lot of the burden Microsoft SQL Server users experience, 
it is not a drop-in replacement for everything. Some code (especially some 
server-side procedures related to administration) does not yet function
on Babelfish. The reason is that every database engine has limitations.
The same is true for PostgreSQL; some exotic features cannot be mapped. 
However, the community does its best to keep this list short.

To find out more information about what will work and what won't, 
read the details in the section called [limitations](/docs/usage/limitations-of-babelfish).

### Join the Babelfish community

Be part of the community and help to make improvements.
You're welcome to [contribute to Babelfish](/docs/contributing).
