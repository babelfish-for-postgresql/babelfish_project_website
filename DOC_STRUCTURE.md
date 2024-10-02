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

Each one of the `collections` attributes points to the folder in which the content resides, prefixed with an underscore.  For example:


- internals content is in `_internals/`
- client content is in `_client/`

Each document will appear as link in the navigation sidebar. Each markdown file must contain the following header format:

```markdown
---
layout: default
title: Compiling Babelfish from source
nav_order: 2
---
```

The header is self-explanatory; you need to provide at least the `title` and `nav_order` (which is sequential for each section).

## Adding images to content in the documentation (markdown files)

Store the image in a directory with the same name as the page on which it will be displayed:

babelfish_project_website/content_directory/image_file_name.png

Then, and add the following tag to the content:

![under construction](img src=construction.png)

*Note* If you have problems with your image not displaying, check the developer content displayed by the browser (on Chrome, that's under `View`, `Javascript console`) to debug your issues.

## Adding images to posts

Store image files in the `assets/images` folder. To use an image, you can add the following block to :

```html
<img src="bg.png" data-src="img1.jpg" />
```

*Note* If you have problems with your image not displaying, check the developer content displayed by the browser (on Chrome, that's under `View`, `Javascript console`) to debug your issues.

## Issue templates

The issue templates are located in the `.github/ISSUE_TEMPLATE`, in yaml files.

> For more information about issue templates, check [Github's documentation](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository).


## Changing the site index

The site index resides in the `index.markdown` file. The file defines the sidebar and button callouts and onscreen content. The format is a yaml structure, placed in the markdown header.