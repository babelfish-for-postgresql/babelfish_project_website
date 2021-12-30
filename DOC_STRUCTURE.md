# Documentation structure of the Babelfish Website

## Documentation Index and folder structure

The list of the documentation collection is configured in the `_config.yml` file, in the `just_the_docs` attribute. This is the original configuration:


```yaml
just_the_docs:
  # Define the collections used in the theme
  collections:
    docs:
    installation:
      name: Installing Babelfish
      nav_fold: true      
    usage:
      name: Using Babelfish
      nav_fold: true
    client:
      name: Client programming
      nav_fold: true
    internals:
      name: Babelfish internals
      nav_fold: true
    faq:
      name: FAQ and getting help
      nav_fold: true
```

Each one of the `collections` attributes points to the homonimous folder name, prefixed with an underscore:

```
internals -> _internals/
client -> _client/
```

Each folder contains the documentation for each section, and they'll appear as subelements in the documentation sidebar. Each markdown file must contain the following header format:


```markdown
---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---
```

The header is self-explanatory, and you need to configure at least `title` and `nav_order` (which should be sequential for each section).

## Adding images to posts and docs

Images should be placed in the `assets/images` folder. To use the image, you can add the following block to the markdown file:

```html
<img src="bg.png" data-src="img1.jpg" />
```

## Publishing posts

Posts are different from documentation, as they reside in a different folder. The `_posts` folder contains the published posts in markdown format. The header of the posts should follow the below format:

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

> It is possible to commit a post and keep it hidden by using the `draft: true` attribute, which allows to work on a file without publishing it until draft is set to `false`.

## Issue templates

The issue templates are located in the `.github/ISSUE_TEMPLATE`, in yaml files.
For more information about issue template, check [Github's documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository).


## Changing site index

The site index resides in the `index.markdown` file, which contains the index sections.

In this file, resides the sidebar and button callouts. The format is a yaml structure, placed in the markdown header.

