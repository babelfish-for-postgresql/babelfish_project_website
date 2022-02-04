# Release Notes publishing checklist

- Add the release note text inside `_includes/releases` folder as a markdown file, without headers.
  As the contents of these files are raw, they can be checkout from external sources (eg, once the docs have 
  been move to the extensions repository).

- Add the version details in `_versions`, with the following content and updating the corresponding
  version number and the correct filename in the `explanation` attribute (without the `_includes` parent
  directory):

```markdown
---
date: 2022-01-01

title: Babelfish 0.1.0
product: Babelfish for PostgreSQL
version: '0.1.0'

components:
  -
    role: engine
    artifact: babelfish
    version: 0.1.0
sections:
  source:
    explanation: "/releases/babelfish-0.1.0.md"
pretty:
  artifacts:
    babelfish: ''
  sections:
    source: 'Babelfish 0.1.0'
---
Babelfish for PostgreSQL is open source software that uses the Apache License version 2 (ALv2) and PostgreSQL Licence. ALv2 grants you well-understood usage rights; you can use, modify, extend, embed, monetize, resell, and offer Babelfish for PostgreSQL as part of your products and services. The source for the entire project is available on [GitHub](https://github.com/babelfish-for-postgresql) and you're welcome to build from source for customized deployments. 
```

The text below the header of this content will be rendered in the right sidebar at the release note page.


> The above bullets will make the releases available in `<url>/versions` permalink and in the documentation
sidebar. The versions route is not accessible from the UI, only by linking. eg: babelfish.org/versions

- Add the release link in the `index.markdown`, to appear in the front page. Be aware of the page name, it will
have the `<artifact>-<version with dots replaced by hyphen>.html` convention:

```markdown
sidebar:
  - title: Releases
    description: List of Babelfish releases.
    links:
      - title: Release 1.0.0
        url: "/versions/babelfish-1-0-0.html"
  ...
  - title: Have a question?
```
