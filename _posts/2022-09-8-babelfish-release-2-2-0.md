---
layout: post
author: Bill Ramos
authors: 
    - Bill Ramos
comments: true
title: "Babelfish 2.2.0 is available"
categories:
- releases
---

We’re happy to announce the release of Babelfish 2.2.0, which includes community updates made to PostgreSQL 14.5. This release includes support for a number of features requested by our users:

- Support for old-style function calls with `::` preceding the function name.
- Support for more catalogs: assembly_types, numbered_procedures, triggers, spatial_index_tessellations, plan_guides, synonyms, events, trigger_events, fulltext_indexes, dm_hadr_cluster, xml_indexes, change_tracking_tables, key_constraints, database_filestream_options, filetable_system_defined_objects, hash_indexes, filegroups, master_files, assembly_modules, change_tracking_databases, database_recovery_status, fulltext_catalogs, fulltext_stoplists, fulltext_indexes, fulltext_index_columns, fulltext_languages, selective_xml_index_paths, spatial_indexes, filetables, registered_search_property_lists, syspolicy_configuration, syspolicy_system_health_state
- Support for the `babelfish_pgtsql.escape_hatch_showplan_all` [escape hatch](https://babelfishpg.org/docs/usage/escape_hatches/). When set to `ignore`, the `SET SHOWPLAN_ALL` and `SET STATISTICS PROFILE` will behave like [`SET BABELFISH_SHOWPLAN_ALL` and `SET BABELFISH_STATISTICS PROFILE`](https://babelfishpg.org/docs/usage/query_planning/); when set to `strict`, `SET SHOWPLAN_ALL` and `SET STATISTICS PROFILE` are silently ignored. Note that the query plan information displayed is PostgreSQL-style, rather than SQL Server-style. 

You'll find the full list of improvements made in this release in the [release notes](https://babelfishpg.org/docs/versions/babelfish-2-2-0.html).  Build directions and the Babelfish source distributions for 2.2.0 can be found in the [babelfish-for-postgresql repository](https://github.com/babelfish-for-postgresql/babelfish-for-postgresql/releases/tag/BABEL_2_2_0__PG_14_5).