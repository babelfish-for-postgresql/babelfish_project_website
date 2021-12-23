[![Babelfish Website Build Workload](https://github.com/babelfish-for-postgresql/babelfish_project_website/actions/workflows/jekyll.yml/badge.svg)](https://github.com/babelfish-for-postgresql/babelfish_project_website/actions/workflows/jekyll.yml)

![Babelfish for PostgreSQL logo](assets/images/themed-logo.svg)

- [babelfishpg.org Website](#babelfishpgorg-website)
  - [Building the Website](#building-the-website)
    -[Testing](#testing)
    - [Link checker](link-checker)
  - [Writing style guidelines](writing-style-guidelines)
  - [Submitting a Pull Request](#submitting-a-pull-request)
  - [Getting Help](#getting-help)
  - [Credits](#credits)   
    - [Adding to the Partners Page](#adding-to-the-partners-page)
  - [Copyright](#Copyright)



# Babelfishpg.org website

This repo contains the source for the [babelfishpg.org](https://babelfishpg.org/) website.  The Babelfish project welcomes contributions to the site - review [CONTRIBUTING](#contributing) to learn more about how to contribute to the website.

## Building the website

This site uses [Jekyll](https://jekyllrb.com/). You can build the site and make it available on a local server via `docker-compose up -d`, or by installing all the dependencies on your local environment as follows.

1. Install [Ruby](https://www.ruby-lang.org/en/) and [Bundler](https://bundler.io/), then run `bundle install`.
2. Build and start Jekyll with `bundle exec jekyll serve`.
3. Browse the site at [`http://127.0.0.1:4000/`](http://127.0.0.1:4000/).

Alternatively, build the site with `bundle exec jekyll build`. The HTML output is generated into `/_site`. For the full configuration options when running Jekyll, see [this page](https://jekyllrb.com/docs/configuration/options/).

### Testing

Local test:

```
$ bundle install
$ bundle exec jekyll serve -w
```

To test the GitHub CI locally, you can use [act](https://github.com/nektos/act) by running `act` at the repository's root.

#### Link checker

We use a link checker plugin to ensure that we don't have any broken links on the website. It doesn't run by default since it can slow down the build, especially when running `bundle exec jekyll serve`. To run the link checker, add the ENV flag `JEKYLL_LINK_CHECKER` or `JEKYLL_FATAL_LINK_CHECKER` with any one of the valid values `internal`,`forced`,`all` or `retry`. Each option tests a larger range of links.

```sh
JEKYLL_FATAL_LINK_CHECKER=all bundle exec jekyll build
```

**`JEKYLL_LINK_CHECKER` vs `JEKYLL_FATAL_LINK_CHECKER`**

They both accept the same values with the only difference being that the `JEKYLL_FATAL_LINK_CHECKER` build fails if a broken link is found.

**Options**

1. **internal**: validates only the internal links.
2. **forced**: validates internal links and links that are technically internal but instead link to an external page. For example, `/docs`.
3. **all**: validates all links. This option does not retry retry-able link or follow redirection links such as HTTP:429 (too many attempts, retry after), or HTTP:301 (Permanent redirect).
4. **retry**: validates all the links but also retries links with a retry-able HTTP header.


## Writing style guidelines

When submitting content for addition to the Babelfish guide, please consider the following guidelines:

The documentation should be informal, but not chatty.  Our goal is to produce concise, technically accurate content that helps the user accomplish a task.  It should not include future plans, what we were/are thinking during feature planning, or our reasoning behind implementation decisions. Such information should be in the product roadmap.

Write in active voice, with the assumption that the reader is the person that will perform actions: “You should specify the password associated with...” or instructional:  “Specify the password associated with...”.  Focus on the user’s task, and the steps required to accomplish it.  If all of the steps/information is not included on one page, provide supporting links.

To make the documentation easier to read and understand:

    * Use short but complete sentences.  
    * Be consistent with punctuation.
    * Use bulleted lists and tables where appropriate.

Avoid using:
    * Jargon or Slang - whether marketing, developer, or internal terms
    * Colloquialisms 
    * Questions
    * Latin (vs., e.g., i.e.,  etc)

The Babelfish project supports an environment of diversity and equity.  In the interest of promoting inclusivity, the following words (unless used in a literal/strictly technical manner such as an object name or command) should be avoided.  Alternatives are recommended below.  Instead of: 
    * execute → use start or run 
    * abort → use stop
    * enable → use turn on, activate, start
    * disable → use turn off, deactivate, stop
    * kill → use end or stop
    * blacklist → use deny list
    * master → use primary, main, or leader
    * hang → use stop responding
    * slave → use secondary, replica, or standby
    * black day → use blocked day
    * invalid → use not valid
    * segregate → use isolate or separate
    * it is recommended --> use we recommend

Use contractions where appropriate:  we’re, isn’t, can’t, and so on.

When referring to proprietary products, use the complete company name and the product name once at the start of the page; thereafter, use only the product name. 

  * The term Microsoft SQL Server is the complete company name and product name.  For example: Babelfish extends your PostgreSQL database with the ability to accept database connections from Microsoft SQL Server clients.
  * The term SQL Server refers to the database, the database content, and transactions/procedures/functions that involve more than SQL syntax.  For example: Port 1433 accepts SQL Server commands, with the limitations discussed later in this guide.
  * Use T-SQL when referring to syntax or language.  For example: You should use correct T-SQL syntax when forming commands.
  * Use TDS when referring to the protocol used by SQL Server.  For example: The server listens on port 1466 for client connections in TDS protocol.


## Submitting a pull request

The project is open to contributions. You can submit a [pull request through Github](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) and contribute to Babelfish.

When submitting code or documentation, ensure that your code adheres to
[community standards](https://www.postgresql.org/docs/current/source.html) and
documentation and comments conform to the [Writing style guidelines](#Writing-style-guidelines). This will ease 
the burden of maintenance, and keep the website readable.

Before submitting a pull request, make sure that your code is properly tested; changes made to 
the code should not compromise existing features. We strongly recommend running the tests
before you send a pull request to development. If you submit a new feature, include 
test cases for the feature.  Patches that do not contain tests for new features will not be 
accepted.

We encourage you to properly document their code.  If you are having language difficulty, or 
need help, we recommend reaching out to the Babelfish community.

When documenting a new feature, it is a good idea to provide working examples.
This is especially true for programming interfaces and new SQL functions. 

If you are not a coder yourself, or if you don't want to write your own patch, we
can offer help. Positive feedback is highly appreciated.
We are particularly interested in receiving your feedback:

- for new content,
- to remove inaccuracies,
- to fill information gaps,
- to fix typos or grammatical errors, and
- to improve clarity.

To get involved with the review process, please check out
[Github](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish).


## Getting help

If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](https://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public GitHub issue.

If you find a bug, or have a feature request, please don't hesitate to open an issue in this repository.  If you need help and are unsure where to open an issue, try [forums](https://discuss.babelfishpgcommunity.dev/).


## Credits

If you contribute code, make sure that you are not violating 3rd party rights.
Checking for IP violations beforehand is expected by the community. We want
Babelfish and our users to be free of 3rd party claims. Keeping the code clean benefits 
the community as well our users.

This project has adopted the [Amazon Open Source Code of Conduct](CODE_OF_CONDUCT.md). For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq), or contact [opensource-codeofconduct@amazon.com](mailto:opensource-codeofconduct@amazon.com) with any additional questions or comments.

This website was forked from the BSD-licensed [djangoproject.com](https://github.com/django/djangoproject.com) and merged with just-the-docs theme.

This project is licensed under the [BSD-3-Clause License](LICENSE).

Babelfish for PostgreSQL is available as Open Source software and can be downloaded from Github for
free under the terms of the
[Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) and the
[PostgreSQL license](https://www.postgresql.org/about/licence/).


### Adding to the Partners Page

If you are a partner, you are welcome to add your logo/link to our partners page. Please copy and edit the [sample file](_partners/_sample.md), and submit a pull request.

## Copyright

Copyright Babelfish for PostgreSQL Contributors.
