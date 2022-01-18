[![Babelfish Website Build Workload](https://github.com/babelfish-for-postgresql/babelfish_project_website/actions/workflows/jekyll.yml/badge.svg)](https://github.com/babelfish-for-postgresql/babelfish_project_website/actions/workflows/jekyll.yml)

![Babelfish for PostgreSQL logo](assets/images/themed-logo.svg)

- [babelfishpg.org Website](#babelfishpgorg-website)
  - [Building the Website](#building-the-website)
    -[Testing](#testing)
    - [Link checker](#link-checker)
  - [Writing style guidelines](#writing-style-guidelines)
  - [Submitting a Pull Request](#submitting-a-pull-request)
  - [Getting Help](#getting-help)
  - [Credits](#credits)   
    - [Adding to the Partners Page](#adding-to-the-partners-page)
  - [Copyright](#copyright)



# Babelfishpg.org website

This repo contains the source for the [babelfishpg.org](https://babelfishpg.org/) website.  The Babelfish project welcomes contributions to the site - review [CONTRIBUTING](#contributing) to learn more.  We also welcome your feedback:

- about new content,
- to remove or report inaccuracies,
- to fill information gaps,
- to fix typos or grammatical errors, and
- to improve clarity.


## Building the website on your local system

You can build the Babelfish website on your local system with either Docker or Jekyll: 

- After [installing Docker](https://jekyllrb.com/docs/installation/), you can build the site in a container with the command, `docker-compose up -d`. 

- After [installing Bundler](https://bundler.io/) and [Jekyll](https://jekyllrb.com/docs/installation/), invoke the following command to prepare the project files for the build:

 ```sh
bundle install
```

Then, you can build the HTML files with the following command:

```sh
bundle exec jekyll build 
```

 The HTML output is generated in the `/_site` folder; please note that while you can review individual pages or updates, the output may contain broken links. To build the Babelfish website, and deploy the build on your desktop in a browser, use the commands:

 ```sh
bundle exec jekyll serve -w
```

Visit the [Jekyll web site](https://jekyllrb.com/docs/configuration/options/) for a full list of build configuration options.

### Link checker

The Babelfish project uses a link checker to ensure that we don't have any broken links on the website. The link checker doesn't run by default since it can significantly slow down the build. To run the link checker during a build, include the option=value pair that best describes the behavior of the build, and the range you'd like to check.  Include:

`JEKYLL_LINK_CHECKER` to validate links, without stopping the build for a broken link. 

`JEKYLL_FATAL_LINK_CHECKER` to validate links, stopping the build for a broken link.

Pair the link checker behavior with a range option; each option tests a larger range of links:

 - **internal**: validates only the internal links.
 - **forced**: validates internal links and links that are technically internal but that link to an external page. For example, `/docs`.
 - **all**: validates all links. This option does not retry links or follow redirection links such as HTTP:429 (too many attempts, retry after), or HTTP:301 (Permanent redirect).
 - **retry**: validates all the links but also retries links with a retry-able HTTP header.

For example:

```sh
JEKYLL_FATAL_LINK_CHECKER=all bundle exec jekyll build
```


## Writing style guidelines

When submitting content for addition to the Babelfish guide, please consider the following guidelines.

You should:

-  Keep the content informal and to the point.   
-  Use short but complete sentences.  
-  Be consistent and correct with punctuation and capitalization.
-  Use bulleted lists and tables where appropriate.
-  Focus on the user’s task, and the steps required to accomplish it.  If all of the steps or information is 
not included on one page, provide supporting links.
-  Share concise, technically accurate content that helps the user understand the product and accomplish a task.  
-  Write in active voice, with the assumption that the reader is the person that will perform actions: 
“You should specify the password associated with...” or instructional:  “Specify the password associated with...”.
-  Use contractions where appropriate:  we’re, isn’t, can’t, and so on.


When referring to proprietary products, use the complete company name and the product name once at the start 
of the page; thereafter, use only the product name. 

-  The term Microsoft SQL Server is the complete company name and product name.  For example: Babelfish 
extends your PostgreSQL database with the ability to accept database connections from Microsoft SQL Server clients.
-  The term SQL Server refers to the database, the database content, and transactions/procedures/functions that 
involve more than SQL syntax.  For example: The TDS port accepts SQL Server commands, with the limitations discussed later in this guide.
-  Use T-SQL when referring to syntax or language.  For example: You should use correct T-SQL syntax when forming commands.
-  Use TDS when referring to the protocol used by SQL Server.  For example: The server listens for client connections in TDS protocol.


Don't:

-  Assume that the user has experience using PostgreSQL; many Babelfish users have SQL Server experience, but haven't used PostgreSQL.
-  Use jargon or slang - whether marketing, developer, or internal terms
-  Use colloquialisms or regionally understood expressions (that may or may not be known to other Babelfish users) 
-  Documentation shouldn't include future plans; that information belongs in a product roadmap.


The Babelfish project supports an environment of diversity and equity.  In the interest of promoting inclusivity, 
the following words (unless used in a literal/strictly technical manner such as an object name or command) should 
be avoided.  Alternatives are recommended below.  Instead of: 

-  execute → use start or run 
-  abort → use stop
-  enable → use turn on, activate, start
-  disable → use turn off, deactivate, stop
-  kill → use end or stop
-  blacklist → use deny list
-  master → use primary, main, or leader
-  hang → use stop responding
-  slave → use secondary, replica, or standby
-  invalid → use not valid
-  segregate → use isolate or separate
-  it is recommended --> use we recommend


If you are sharing documentation about a new feature, it should describe the feature and include usage instructions 
and examples where practical. This is especially true for user interfaces and new SQL functions. 


## Submitting a pull request

The Babelfish project welcomes contributions of features and documentation. You can submit a [pull request 
through Github](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) 
to contribute to Babelfish. Note that commits to the Github repo must be signed off with your 
name and email; include the -s and -m options when submitting your patch. 

When submitting code or documentation, ensure that your code adheres to
[community standards](https://www.postgresql.org/docs/current/source.html) and
documentation and comments conform to the [Writing style guidelines](#Writing-style-guidelines). 

Before submitting a pull request, make sure that your change is properly tested; changes shouldn't 
compromise existing features. We strongly recommend you test your patch
before you send a pull request to development. When you submit a new feature, include 
test cases and documentation for the feature.  Patches that don't include tests and documentation won't be 
accepted.


## Getting help

If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security at our [vulnerability reporting page](https://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public GitHub issue.


## Credits

If you contribute code, make sure that your code does not violate 3rd party rights; check for intellectual property conflicts before you submit a pull request that includes content from other projects. 

This project has adopted the [Open Source Code of Conduct](CODE_OF_CONDUCT.md). For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq), or contact [opensource-codeofconduct@amazon.com](mailto:opensource-codeofconduct@amazon.com) with any additional questions or comments.

This website was forked from the BSD-licensed [djangoproject.com](https://github.com/django/djangoproject.com) and merged with just-the-docs theme.

This project is licensed under the [BSD-3-Clause License](LICENSE).

Babelfish for PostgreSQL is available as open-source software and can be downloaded from Github for free under the terms of the
[Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) and the
[PostgreSQL license](https://www.postgresql.org/about/licence/).


## Copyright

Copyright Babelfish for PostgreSQL Contributors.

Babelfish would not be possible without the hard work and dedication of the people who have contributed to PostgreSQL. Everyone involved in the development of PostgreSQL has our gratitude.
