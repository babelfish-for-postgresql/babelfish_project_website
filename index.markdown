---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: homepage
layout_class: sidebar-right
body_class: homepage
sectionid: homepage

meta_description: Babelfish for PostgreSQL is an Apache-2.0 open source project that adds a Microsoft SQL Server-compatible end-point to PostgreSQL to enable your PostgreSQL database to understand the SQL Server wire protocol and commonly used SQL Server commands. With Babelfish, PostgreSQL now understands T-SQL, Microsoft SQL Server's proprietary SQL dialect, and supports the same communications protocol, so your apps that were originally written for SQL Server can now work with PostgreSQL with fewer code changes and without changing database drivers.

download_ctas:
  - os
  - os-d

ctas:
  post: " on GitHub"
  primary:
    text: "Get Started"
    url: "/getstarted/"
  roadmap:
    text: "View the project roadmap"
    url: https://github.com/orgs/babelfish-for-postgresql/projects/1

greeting: "More about Babelfish for PostgreSQL"

headline: "Babelfish for PostgreSQL accelerates your journey to migrate <br> SQL Server applications to PostgreSQL"

long_description: "Babelfish for PostgreSQL is an open source project available under the Apache 2.0 and PostgreSQL licenses. It provides the capability for PostgreSQL to understand queries from applications written for Microsoft SQL Server. Babelfish understands the SQL Server wire-protocol and T-SQL, the Microsoft SQL Server query language, so you don't have to switch database drivers or re-write all of your application queries. With Babelfish, applications currently running on SQL Server can now run directly on PostgreSQL with fewer code changes."

callouts_head: "Principles for development"
callouts_class: list-features
callouts_id: principles
callouts_leader: "When we (the contributors) are successful, Babelfish for PostgreSQL will be:"

version_feature:
  latest_label: "Current Version:"
  date_label: "/"

callout_button:
  title: Get Started
  url: getstarted/

secondary:
  heading: "Stay in the loop"
  content: "Check out the [forums](https://discuss.babelfishpgcommunity.dev) to stay informed."

sidebar:
  - title: Have a question?
    description: Do you have a question regarding Babelfish? Maybe you aren’t the first to ask it. Checkout our frequently asked questions (FAQ) to see if your question is already answered. If not, don’t hesitate to ask in the community forums.
    links:
      - title: Check out the FAQ
        url:  /docs/faq/
      - title: Ask a question
        url: https://github.com/babelfish-for-postgresql/babelfish_extensions/issues
  - title: Founding documents
    links:
      - title: Introducing Babelfish For PostgreSQL
        url: https://youtu.be/xZ3k7Fd6_eU?t=4407
      - title: "Open Sourcing Babelfish"
        url: https://aws.amazon.com/blogs/opensource/want-more-postgresql-you-just-might-like-babelfish/
  - title: Quick Links
    links: 
      - title: Contributors
        url: /contributors/
---
