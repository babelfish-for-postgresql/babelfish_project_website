---
layout: post
author: Bill Ramos
authors: 
    - Bill Ramos
comments: true
title: "Babelfish 2.2.0 is available"
categories:
- releases
---

We’re happy to announce the release of Babelfish 2.2.0, which includes community updates made to PostgreSQL 14.5. This release includes support for a number of features requested by our users:

- Support for old-style function calls with `::` preceding the function name.
- Support for data migration using the BCP client and the `bcp` utility.
- Support for cross-database stored procedure execution.
- Support for `CROSS APPLY` and `OUTER APPLY` (lateral join).
- Support for additional catalog objects.

You'll find the full list of improvements made in this release in the [release notes](https://babelfishpg.org/docs/versions/babelfish-2-2-0.html).  Build directions and the Babelfish source distributions for 2.2.0 can be found in the [babelfish-for-postgresql repository](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/tag/BABEL_2_2_0__PG_14_5).