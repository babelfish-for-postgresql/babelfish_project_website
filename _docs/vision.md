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

Welcome to Babelfish. The idea of the project is to close the gap between
PostgreSQL and other systems by making PostgreSQL speak other protocols such as
TDS, and maybe a lot more in the future. By implementing "MS SQL"-slang, we make
it easier for people to move to PostgreSQL. 

However, moving applications is just one side of the equation. Migrating data
is one thing - making sure that applications work properly is another, far
more important thing. In fact, migrating data to PostgreSQL can be relatively
easy, while migration entire application stacks can be really difficult. 

That's exactly why Babelfish is so important. It allows you to take existing
applications, hook them up to TDS-enabled PostgreSQL and run them more quickly
and more easily, even while some migration work might still be going on. 

A second option is to move application from MS SQL to PostgreSQL without
touching the application at all. Why is that so important? If you get your
source code under control, life is usually easier. But what if you want to move
old legacy applications from Microsoft SQL Server to PostgreSQL, legacy applications which cannot be
modified easily, because the source code is not open, is lost, or is simply too hard to
change? Babelfish is an excellent vehicle to help in this case as well. You can
move away from expensive MS SQL deployments without doing a painful app
migration. Brilliant, isn't it?


### What Babelfish is not

While Babelfish can ease a lot of the burden MS SQL users experience, it is not a drop-in
replacement for everything. There is code (especially some server-side 
procedures related to administration) that is not going
to work on Babelfish. The reason is that every database engine has limitations.
The same is of course true for PostgreSQL and therefore some exotic features cannot be mapped. 
However, we do our best to keep this list as short as humanly possible.

If you want to find out more about limitations: We have dedicated an entire
[section dealing with limitations incompatibilities](/docs/usage/limitations-of-babelfish).

### Preparing for the future

Nothing is perfect, but the community is working hard to make things
function as smoothly as possible. Much of it works already, but more 
work has to go into this area to be even more compatible. In other words: 
We have an exciting future ahead. Many more features will be developed as 
people improve the user experience, raising it to new levels. 

Be part of the community and help to improve Babelfish even more.
If you want to [contribute to Babelfish](/docs/contributing) simply reach
out to the community.

