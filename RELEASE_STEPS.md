# Release Notes publishing checklist

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
date: 2022-01-01

title: Babelfish 1.0.0
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
