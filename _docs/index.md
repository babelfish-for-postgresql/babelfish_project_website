---
layout: default
title: Get started
nav_order: 1
redirect_from: /404.html
permalink: /docs
---

# Babelfish for PostgreSQL documentation

This site contains the technical documentation for [BabelfishPG](https://babelfishpg.org/), an Apache-2.0 open source project that adds a Microsoft SQL Server-compatible end-point to PostgreSQL to enable your PostgreSQL database to understand the SQL Server wire protocol and commonly used SQL Server commands. With Babelfish, PostgreSQL now understands T-SQL, Microsoft SQL Server's proprietary SQL dialect, and supports the same communications protocol, so your apps that were originally written for SQL Server can now work with PostgreSQL with fewer code changes and without changing database drivers.


[Get started](#docker-quickstart){: .btn .btn-blue }


---

## Why use BabelfishPG?

BabelfishPG is well-suited to the following use cases:

* Smooth transition of you MSSQL Server compatible source code to an Open Source based database.
* BabelfishPG intends to move forward on its integration to the PostgreSQL community.

Component | Purpose
:--- | :---
[BabelfishPG]({{site.url}}{{site.baseurl}}/BabelfishPG/) | Data store and search engine
[BabelfishPG Dashboards]({{site.url}}{{site.baseurl}}/dashboards/) | Search frontend and visualizations
[Security]({{site.url}}{{site.baseurl}}/security-plugin/) | Authentication and access control for your cluster
[Alerting]({{site.url}}{{site.baseurl}}/monitoring-plugins/alerting/) | Receive notifications when your data meets certain conditions
[SQL]({{site.url}}{{site.baseurl}}/search-plugins/sql/) | Use SQL or a piped processing language to query your data
[Index State Management]({{site.url}}{{site.baseurl}}/im-plugin/) | Automate index operations
[KNN]({{site.url}}{{site.baseurl}}/search-plugins/knn/) | Find “nearest neighbors” in your vector data
[Performance Analyzer]({{site.url}}{{site.baseurl}}/monitoring-plugins/pa/) | Monitor and optimize your cluster
[Anomaly Detection]({{site.url}}{{site.baseurl}}/monitoring-plugins/ad/) | Identify atypical data and receive automatic notifications
[Asynchronous Search]({{site.url}}{{site.baseurl}}/search-plugins/async/) | Run search requests in the background


For specifics around the project, see the [FAQ](https://opensearch.org/faq/).


---

## Docker quickstart
Docker
{: .label .label-green }

1. Install and start [Docker Desktop](https://www.docker.com/products/docker-desktop).
1. Run the following commands:

   ```bash
   docker pull opensearchproject/opensearch:{{site.opensearch_version}}
   docker run -p 9200:9200 -p 9600:9600 -e "discovery.type=single-node" opensearchproject/opensearch:{{site.opensearch_version}}
   ```

1. In a new terminal session, run:

   ```bash
   curl -XGET --insecure https://localhost:9200 -u admin:admin
   ```

To learn more, see [Install and configure OpenSearch]({{site.url}}{{site.baseurl}}/opensearch/install/) and [Install and configure OpenSearch Dashboards]({{site.url}}{{site.baseurl}}/dashboards/install/).


## The secure path forward

OpenSearch includes a demo configuration so that you can get up and running quickly, but before using OpenSearch in a production environment, you must [configure the security plugin manually]({{site.url}}{{site.baseurl}}/security-plugin/configuration/index/): your own certificates, your own authentication method, your own users, and your own passwords.


## Looking for the Javadoc?

See [opensearch.org/javadocs/](https://opensearch.org/javadocs/).


## Get involved

[OpenSearch](https://opensearch.org) is supported by Amazon Web Services. All components are available under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) on [GitHub](https://github.com/opensearch-project/).

The project welcomes GitHub issues, bug fixes, features, plugins, documentation---anything at all. To get involved, see [Contributing](https://opensearch.org/source.html) on the OpenSearch website.
