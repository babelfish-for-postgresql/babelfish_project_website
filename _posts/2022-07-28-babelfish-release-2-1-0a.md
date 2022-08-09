---
layout: post
author: Simon Lightstone
authors: 
    - Simon Lightstone
comments: true
title: "Babelfish 2.1.0a with community backpatch for indexing"
categories:
- releases
---

We’re happy to announce the release of Babelfish 2.1.0a, which includes community updates made to PostgreSQL 14.4 to patch potential index corruption introduced by the `CREATE INDEX CONCURRENTLY` / `REINDEX CONCURRENTLY` commands. You'll find the full list of improvements made in this release in the [release notes](https://babelfishpg.org/docs/versions/babelfish-2-1-0-a.html).  Build directions and the Babelfish source distributions for 2.1.0a can be found in the [babelfish-for-postgresql repository](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/tag/BABEL_2_1_0a__PG_14_3).