---
layout: default
title: Contributing code
nav_order: 2
---

## Guidelines for Contributing Code

Thank you for your interest in contributing to Babelfish!
Please read through this document before you submit any pull requests or
issues. It will help us work together more effectively.

Babelfish for PostgreSQL (called &ldquo;Babelfish&rdquo; in the following)
is available as Open Source software and can be downloaded from Github for
free under the terms of the
[Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) and the
[PostgreSQL license](https://www.postgresql.org/about/licence/).

The project is open to contributions. You may send a [pull request via
Github](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
and contribute to Babelfish.

Please first make sure that these basic requirements are met:

### Coding conventions

It's important to follow coding conventions. Check out the
[community standards](https://www.postgresql.org/docs/current/source.html) and
make sure your code conforms to the requirements. Following conventions eases the burden of
maintenance, and make the code more readable for other community members.


### Testing and quality management

Make sure that your code is properly tested. Babelfish comes with a
test suite which covers a variety of scenarios. Changes made to the code should
not compromise existing features. We strongly recommend running the tests
before you send a pull request to development. 

If you add new features, you also need to add tests for them.
Patches that do not contain tests for new features will not be accepted by the
community.


### Documentation and help

The same is true for missing documentation: feature documentation and
explanatory source comments are as important as working code.
We encourage contributors to properly document their code.
If you are having language troubles, or if you need help, we recommend
reaching out to the community for help via Github.

For most new features, it is a good idea to provide working examples.
This is especially true for programming interfaces and new SQL functions. 


### Code review

If you are not a coder yourself, or if you don't want to write your own patch, we
can help you to find people who can review existing code and point to
mistakes or other problems. Positive feedback is highly appreciated.
We are particularly interested in receiving your pull requests

- for new content,
- to remove inaccuracies,
- to fill information gaps,
- to fix typos or grammatical errors, and
- for suggested rewrites to improve clarity.

To help with code review, please check out
[Github](https://github.com/babelfish-for-postgresql/postgresql_modified_for_babelfish) 
and help with the review process.


### Avoiding license violations

If you contribute code, make sure that you are not violating 3rd party rights.
Checking for IP violations beforehand is expected by the community. We want
Babelfish to be free of 3rd party claims and we want to protect our users
from such claims. Keeping the code clean is therefore a good
idea, and benefits the community as well our users.
 
