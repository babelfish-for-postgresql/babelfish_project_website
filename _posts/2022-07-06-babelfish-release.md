---
layout: post
author: Simon Lightstone
authors: 
    - Simon Lightstone
comments: true
title: "Babelfish 2.1.0 has been released (updated)"
categories:
- releases
---

Update: Babelfish 2.1.0 exposes an issue introduced with community PostgreSQL 14 that is fixed in [PostgreSQL version 14.4](https://www.postgresql.org/docs/release/14.4/).  In response, the Babelfish team has backported the fix and released Babelfish 2.1.0a.  We recommend you move to 2.1.0a as soon as possible to avoid index corruption.

All of the features of Babelfish 2.1.0 are included in Babelfish 2.1.0a.  Our users have asked us to make Babelfish easier to use, and we’ve responded with a feature-packed release.  After installing 2.1.0a, you can browse database tables and column types with SQL Server Management Studio (SSMS).  This release also adds support for creating roles on the TDS port with the CREATE ROLE command, and improves cross-database reference support for queries.

We’re happy to announce that Babelfish delivers on these user requests, as well as others. As always, build directions for Babelfish and its prerequisites, along with Babelfish source distributions for 2.1.0a can be found in the [babelfish-for-postgresql repository](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/tag/BABEL_2_1_0a__PG_14_3).

We hope you relish the benefits and improved usability of Babelfish!

