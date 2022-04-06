# Documentation structure of the Babelfish Website

## Documentation Index and folder structure

The website headings are configured in the `_config.yml` file, in the `just_the_docs` attribute. Each value provided in a name attribute will be an expandable heading in the left navigation panel:


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

Each folder contains the documents that reside in that section; each document will appear as link in the navigation sidebar. Each markdown file must contain the following header format:

```markdown
---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---
```

The header is self-explanatory; you need to provide at least the `title` and `nav_order` (which should be sequential for each section).

## Adding images to posts and docs

Images should be placed in the `assets/images` folder. To use the image, you can add the following block to the markdown file:

```html
<img src="bg.png" data-src="img1.jpg" />
```

## Publishing posts

Posts are different from Babelfish documentation. You can access posts from the menu in the upper-right corner of the Babelfish website landing page. Content for the posts section of the website resides in the `_posts` folder in markdown format. The header information for each post should follow the below format:

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

> To commit a post, and keep it hidden, use the `draft: true` attribute. This allows you to work on a file without publishing it. To publish the file, set to `draft: false`.

## Issue templates

The issue templates are located in the `.github/ISSUE_TEMPLATE`, in yaml files.

> For more information about issue templates, check [Github's documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository).


## Changing site index

The site index resides in the `index.markdown` file. The file defines the sidebar and button callouts and onscreen content. The format is a yaml structure, placed in the markdown header.