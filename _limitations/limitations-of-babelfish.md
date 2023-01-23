---
layout: default
title: Overview - Differences between Babelfish and SQL Server 
nav_order: 1
---

## Differences between Babelfish and SQL Server

In this section you can find information about functional differences between PostgreSQL with Babelfish
and SQL Server. The information is organized into tables outlining SQL command support (based on the Compass configuration file) and updated by version of Babelfish you are using, and individual pages for non-SQL functionalities.

To efficiently identify the commands and feature options that are not supported by your target version of Babelfish, we recommend you start by running the [Compass utility](https://github.com/babelfish-for-postgresql/babelfish_compass). After applying any updates to your application, test your application; if you encounter errors, consult the following pages for more information.

To review a list of SQL Commands that are not supported for your version, choose from the following reports:

- [Version 2.2.0](/docs/limitations/usf_2.2.0)
- [Version 2.1.0](/docs/limitations/usf_2.1.0)
- [Version 1.3.0](/docs/limitations/usf_1.3.0)
- [Version 1.2.0](/docs/limitations/usf_1.2.0)
- [Version 1.1.0](/docs/limitations/usf_1.1.0)
- [Version 1.0.0](/docs/limitations/usf_1.0.0)

To review a list of supported and unsupported non-SQL features, visit the page for the feature type:

- [Built-in functions](/docs/limitations/bif_limitations)
- [Error Code Mappings](/docs/limitations/error_code_limitations)
- [SET Statements](/docs/limitations/set_limitations)
- [Stored Procedures](/docs/limitations/stored_procedure_limitations)
- [System Catalog Views](/docs/limitations/catalog_limitations)
- [System Functions](/docs/limitations/function_limitations)
- [PostgreSQL Extensions](/docs/limitations/extension_limitations)

Please note that this may not be a complete list of the functional differences
between SQL Server and Babelfish. If you find syntax variations that should be
included in the documentation, please [file an issue to let us know about it](https://github.com/babelfish-for-postgresql/babelfish_project_website/issues).

