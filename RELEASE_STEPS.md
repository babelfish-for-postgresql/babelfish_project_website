# Releasing a new version of Babelfish

**NOTE THAT DATES MAY NOT BE IN THE FUTURE OR THE BUILD WON'T WORK!!!!**

## Adding release notes and version information

Add a new file with the release note content to the `_includes/releases` folder, with the following release-specific header content:

```markdown
- Babelfish Version: 2.1.0
- PostgreSQL Server Version: 14.3
- Download source distributions:
  - [BABEL_2_1_0__PG_14_3.zip](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_1_0__PG_14_3/BABEL_2_1_0__PG_14_3.zip)
  - [BABEL_2_1_0__PG_14_3.tar.gz](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/download/BABEL_2_1_0__PG_14_3/BABEL_2_1_0__PG_14_3.tar.gz)
- Babelfish Compass
  - [Download](https://github.com/babelfish-for-postgresql/babelfish_compass/releases)
- Date: July 7, 2022
```
Followed by the content of the release notes.

Add a new file to the `_versions` folder with the following release-specific information:

```markdown
---
date: 2021-10-28

title: Babelfish 1.0.0
nav_order: 10000

product: Babelfish for PostgreSQL
version: '1.0.0'

components:
  -
    role: engine
    artifact: babelfish
    version: 1.0.0
sections:
  source:
    explanation: "/releases/babelfish-1.0.0.md"
pretty:
  artifacts:
    babelfish: ''
  sections:
    source: 'Babelfish 1.0.0'
---
Babelfish for PostgreSQL is open source software that uses the Apache License version 2 (ALv2) and PostgreSQL License. Project source is freely available on [GitHub](https://github.com/babelfish-for-postgresql). 
```

When specifying a `nav_order` in the header, the order is made up of three clauses (joined without delimiters):
- The first clause is a single digit representing the major version - at this point, `1` or `2`.
- The second clause are two numbers that represent the minor version - if the sub-version number is a single digit, the version is preceded by a `0`.
- The third clause is a pair of numbers representing the point release, again preceded by a `0` if the point release is a single digit.

So, version `2.1.1` is represented in the `nav_order` by the clauses `2` `01` `01`, or the value `20101`.

The text below the header of this file will be rendered at the end of the release notes in the documentation.

The files mentioned above will make the releases available in `<url>/versions` permalink and in the documentation sidebar. The versions route is not accessible from the UI, only by linking. eg: babelfish.org/versions

Add a new file to `_artifacts/babelfish` that contains the following version-specific information:

```markdown
---
role: engine
artifact_id: babelfish
version: 2.1.0
platform: source
architecture: x64
slug: babelfish-2.1.0-source-x64
category: babelfish
---
```

Add the release link in the `index.markdown` file to appear in the front page:

```markdown
sidebar:
  - title: Releases
    description: List of Babelfish releases.
    links:
      - title: Release 2.1.0
        url: "/docs/versions/babelfish-2-1-0.html"
      - title: Release 1.2.1
        url: "/docs/versions/babelfish-1-2-1.html"
      - title: Release 1.2.0
        url: "/docs/versions/babelfish-1-2-0.html"
      - title: Release 1.1.0
        url: "/docs/versions/babelfish-1-1-0.html"
      - title: Release 1.0.0
        url: "/docs/versions/babelfish-1-0-0.html"
  - title: Have a question?
```

## Publishing a blog post for the release

Posts are accessed from the menu in the upper-right corner of the Babelfish website landing page. Content for the posts section of the website resides in the `_posts` folder in markdown format.

The filename should be `DATE-title.md`, whether title should not repeat if the posts are in the same _month_. This is due that the "What's new?" rendering groups posts by month. 
One suggestion is to use the Babelfish version like `2022-04-02-release-notes-2-1-1.md`. The filename is not reflected in the content of the release notes rendered in the website.


The header information for each post should follow the below format:

```markdown
---
layout: post
author: The Babelfish Project Team
authors: 
    - The Babelfish Project Team
comments: true
title: "Announcing Open Source Babelfish for PostgreSQL: An Accelerator for SQL Server Migration"
categories:
- releases
---
```



