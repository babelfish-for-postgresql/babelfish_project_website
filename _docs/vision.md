---
layout: default
title: A vision of Babelfish
nav_order: 1
---

## Vision of Babelfish

Every database behaves differently, often in very subtle ways. This can be quite
painful for developers. Differences between various vendors do not make
migrations easier, either. So why not create a solution which allows PostgreSQL
to present itself as more than just one database? Why not create software which
is capable of speaking various protocols and presenting itself as more than just
PostgreSQL?

Welcome to Babelfish.  Babelfish closes the gap between PostgreSQL and
Microsoft SQL Server by teaching PostgreSQL to speak TDS, the native
client-server protocol of Microsoft SQL Server.  In addition, Babelfish
implements support for Microsoft SQL Server's SQL syntax, which makes it easier
to move to PostgreSQL.

However, moving applications is just one side of the equation. Migrating data
is one thing - making sure that applications work properly is another, far
more important thing. In fact, migrating data to PostgreSQL can be relatively
easy, while migrating entire application stacks can be really difficult.

That's exactly why Babelfish is so important. It allows you to take existing
applications, hook them up to TDS-enabled PostgreSQL and run them more quickly
and easily, even while some migration work is still going on.

If you are stuck with a legacy application where the source code is not
available or is too hard to modify for technical or financial reasons, Babelfish
provides an easy way out.  The flexibility and cost savings offered by
open source software projects like PostgreSQL with Babelfish can be significant.


### What Babelfish is not

While Babelfish can ease a lot of the burden Microsoft SQL Server users experience, it is not a drop-in
replacement for everything. There is code (especially some server-side 
procedures related to administration) that is not going
to work on Babelfish. The reason is that every database engine has limitations.
The same is of course true for PostgreSQL and therefore some exotic features cannot be mapped. 
However, we do our best to keep this list as short as humanly possible.

If you want to find out more about limitations: We have dedicated an entire
section to the [limitations](/docs/usage/limitations-of-babelfish).

### Join the Babelfish community

Be part of the community and help to improve Babelfish.
If you want to [contribute to Babelfish](/docs/contributing), you're welcome to.
