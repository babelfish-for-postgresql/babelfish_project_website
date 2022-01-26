---
layout: default
title: PostgreSQL hooks
nav_order: 5
---

## PostgreSQL hooks

Babelfish uses protocol hooks to implement the TDS protocol in the PostgreSQL server.  A hook interrupts the server behavior, and invokes the function that is defined by the hook.  Hooks allow Babelfish to modify the server's behavior without making changes to the community PostgreSQL core.

Each hook contains function pointers that are by default set to NULL.  Babelfish invokes the function when the hook's pointer is changed to a non-NULL value.  In this section, you will learn about Babelfish hooks, and what they do.

### Relation name lookup

```C
typedef Oid (*relname_lookup_hook_type) (const char *relname, Oid relnamespace);
```

This hook is invoked when the server needs to replace the native PostgreSQL relation name lookup code. Babelfish uses this hook to override PostgreSQL behavior, implementing SQL Server-styled relation names.


### COLLATION lookup code

```C
typedef Oid (*CLUSTER_COLLATION_OID_hook_type)(void);
```

This hook is invoked when the server needs to let loadable plugins take control when <code>CLUSTER_COLLATION_OID</code> is called. Babelfish uses the hook to control how the PostgreSQL server manages SQL Server collations.


### Preprocessing collation parameters

```C
typedef void (*PreCreateCollation_hook_type) (char collprovider,
                                              bool collisdeterministic,
                                              int32 collencoding,
                                              const char **collcollate, 
                                              const char **collctype,
                                              const char *collversion);
```

This hook is invoked when the server needs to preprocess the parameters that will be used to create a collation. Babelfish uses this hook to implement locale-related differences between PostgreSQL and SQL Server.


### Manage collation names

```C
typedef const char * (*TranslateCollation_hook_type) (const char *collname, 
						      Oid collnamespace, 
						      int32 encoding);
```

This hook is invoked when the server needs to do a second, customized collation lookup when handling SQL Server-specific collations.


### Managing AS clauses

```C
typedef bool (*check_lang_as_clause_hook_type)(const char *lang, 
					       List *as, 
					       char **prosrc_str_p, 
					       char **probin_str_p);
```

This hook is invoked when the server needs to allow an extension language to process the <code>AS</code>-clause.


### Modify CREATE FUNCTION statements

```C
typedef void (*write_stored_proc_probin_hook_type)(CreateFunctionStmt *stmt, 
						   Oid languageOid, 
						   char** probin_str_p);
```

This hook is invoked when the server needs to influence the way procedural code is stored. T-SQL uses JSON behind the scenes when storing a procedure; this hook allows Babelfish to implement this behavior.


### Modify sequence values 

```C
typedef void (*pltsql_sequence_validate_increment_hook_type) 
	      (int64 increment_by, int64 max_value, int64 min_value);

typedef void (*pltsql_sequence_datatype_hook_type) (ParseState *pstate, 
		Oid *newtypid, bool for_identity, DefElem *as_type, 
		DefElem **max_value, DefElem **min_value);
```

This hook is invoked when the server needs to make sequence handling behavior by the PostgreSQL server comparable to the SQL Server behavior.


### Handling cache resets 

```C
typedef void (*pltsql_resetcache_hook_type) ();
```

This hook is invoked when the server needs to reset the cache behavior. <code>IDENTITY</code> values are important to Babelfish in this context. 


### Managing attribute (column) options

```C
typedef bool (*check_extended_attoptions_hook_type) (Node *options);
```

Different types of extensions and protocols require different column options. This hook is invoked when the server needs to  define a validation method for those options. 


### Procedure entry 

```C
typedef void (*non_tsql_proc_entry_hook_type) (int, int);
```

This hook is invoked when the server needs to manage operations when a procedure is entered.


### Transforming planner qual nodes

```C
typedef Node* (*planner_node_transformer_hook_type) (PlannerInfo *root, 
		Node *expr, int kind);
```

This hook is invoked when the server needs to transform qual nodes inside the query planner. A qual is basically a "filter" (for example, <code>foo = 10</code>) used during query execution.


### Pre-parse and post-parse analyze hook

```C
typedef void (*pre_parse_analyze_hook_type) (ParseState *pstate, 
					     RawStmt *parseTree);
```

You can invoke this hook before or after parsing. Use (<code>pre_parse_analyze_hook</code>) before parsing to modify server behavior or (<code>post_parse_analyze_hook</code>) to modify server behavior after parsing.


### Hook into RETURNING qualifiers

```C
typedef void (*pre_transform_returning_hook_type) (CmdType command,
				List *returningList, 
				ParseState *pstate);
```

This hook is invoked when the server needs to handle qualifiers in the returning list of an output clause.


### UPDATE transformations

```C
typedef Node* (*pre_output_clause_transformation_hook_type) (ParseState *pstate, 
				UpdateStmt *stmt, CmdType 
				command);
```

This hook is invoked when the server needs to perform a self-join transformation on <code>UpdateStmt</code> in an output clause.


### Reading global variables on output

```C
typedef bool (*get_output_clause_status_hook_type) (void);
```

This hook is invoked when the server needs to read a global variable (with information) in an output clause.


### Hook into INSERT statements after transformation

```C
typedef void (*post_transform_insert_row_hook_type) (List *icolumns, 
				List *exprList);
```

This hook is invoked when the server needs to allow a plugin to take control after an insert row statement.


### Target list entry (TLE) comparison

```C
typedef bool (*tle_name_comparison_hook_type)(const char *tlename, 
				const char *identifier);
```

This hook is invoked when the server needs to handle the way target list entries are processed. Target lists are a list of columns and expressions that make up a table. An example of a target list is the selection criteria you might provide with a <code>SELECT</code> statement.


### Manage path coercion

```C
typedef CoercionPathType (*find_coercion_pathway_hook_type) (Oid sourceTypeId,
					Oid targetTypeId,
					CoercionContext ccontext,
					Oid *funcid);
```

This hook is invoked when the server needs to confirm that TSQL has an implicit coercion path from <code>sourceTypeId</code> to <code>targetTypeId</code>.


### Handle data type precedence

```C
typedef bool (*determine_datatype_precedence_hook_type) (
						Oid typeId1, 
						Oid typeId2);
```

This hook is invoked when the server needs to control data type-precedence handling. In Babelfish the precedence is as follows:

- <code>sys.sql_variant</code>
- <code>sys.datetimeoffset</code>
- <code>sys.datetime2</code>
- <code>sys.datetime</code>
- <code>sys.smalldatetime</code>
- <code>pg_catalog.date</code>
- <code>pg_catalog.time</code>
- <code>pg_catalog.float8</code>
- <code>pg_catalog.float4</code>
- <code>pg_catalog.numeric</code>
- <code>sys.fixeddecimal</code>
- <code>sys.money</code>
- <code>sys.smallmoney</code>
- <code>pg_catalog.int8</code>
- <code>pg_catalog.int4</code>
- <code>pg_catalog.int2</code>
- <code>sys.tinyint</code>
- <code>sys.bit</code>
- <code>sys.ntext</code>
- <code>pg_catalog.text</code>
- <code>sys.image</code>
- <code>sys.timestamp (currently not supported)</code>
- <code>sys.uniqueidentifier</code>
- <code>sys.nvarchar</code>
- <code>sys.nchar</code>
- <code>sys.varchar</code>
- <code>pg_catalog.varchar</code>
- <code>pg_catalog.char</code>
- <code>sys.bpchar</code>
- <code>pg_catalog.bpchar</code>
- <code>sys.bbf_varbinary</code>
- <code>sys.varbinary</code>
- <code>sys.bbf_binary</code>
- <code>sys.binary</code>


### Finding parameter definitions

```C
typedef Node * (*lookup_param_hook_type)(ParseState *pstate, ColumnRef *cref);
```

This hook is invoked when the server needs to control the lookup process of parameter definitions.


### Controlling function lookups

```C
typedef FuncCandidateList (*func_select_candidate_hook_type) (
					int nargs, 
					Oid *input_typeids, 
					FuncCandidateList candidates, 
					bool unknowns_resolved);
```

This hook is invoked when the server needs to manage different function lookup behavior (for example, to deal with overloading or data types).


### Managing function arguments

```C
typedef void (*make_fn_arguments_from_stored_proc_probin_hook_type)(
					ParseState *pstate,
					List *fargs,
					Oid *actual_arg_types,
					Oid *declared_arg_types,
					Oid funcid);
```

This hook is invoked when the server needs to interface function arguments using <code>probin</code> (an internal field in pg_proc).


### Transforming the target list

```C
typedef void (*pre_transform_target_entry_hook_type)(
					ResTarget *res, 
					ParseState *pstate, 
					ParseExprKind exprKind);
```

This hook is invoked when the server needs to process a target list (for example, a column list in a table or SELECT statement).


### Resolve unknown entries in the target list

```C
typedef void (*resolve_target_list_unknowns_hook_type)(ParseState *pstate, 
					List *targetlist);
```

This hook is invoked when the server needs to handle unknown entries in the target list. SQL Server and PostgreSQL behaviors differ when columns have no assigned names.


### Managing default typmods

```C
typedef void (*check_or_set_default_typmod_hook_type)(TypeName * typeName, 
					int32 *typmod, 
					bool is_cast);
```

This hook is invoked when the server needs to control the default behavior of typmod.  Typmod are basically modifiers for data types (such as varchar(20)).


### Control the data type of identity columns

```C
typedef void (*pltsql_identity_datatype_hook_type) (ParseState *pstate,
```

This hook is invoked when the server needs to manage the data type of identity columns (relevant to T-SQL).


### Control column definitions

```C
typedef void (*post_transform_column_definition_hook_type) (
					ParseState *pstate, 	
					RangeVar* relation, 
					ColumnDef *column, 
					List **alist);
```

This hook is invoked when the server needs to process column definitions after the initial transformation.


### Hooks to extend the backend parser

```C
typedef List * (*raw_parser_hook_type) (const char *str);
```

This hook is invoked when the server needs to control the behavior of the raw parser.


### Re-processing typmod expressions

```C
typedef List * (*rewrite_typmod_expr_hook_type) (List *expr_list);
```

This hook is invoked when the server needs to define the rewrite behavior of Babelfish typemods.


### Validate typmods for numeric types

```C
typedef void (*validate_numeric_typmods_hook_type) (List **typmods, 
			bool isNumeric, 
			void* yyscanner);
```

This hook is invoked when the server needs to validate typmods for numeric types.


### Handling recursive CTEs

```C
typedef bool (*check_recursive_cte_hook_type) (WithClause *with_clause);
```

This hook is invoked when the server needs to adjust the behavior of the PostgreSQL parser and SQL
grammar directly. It allows <code>WITH</code> clauses to be named <code>TIME</code> or <code>ORDINALITY</code>.


### Handling different lengths of identifiers

```C
typedef bool (*truncate_identifier_hook_type)(char *ident, int len, bool warn);
```

This hook is invoked when the server needs to truncate the name of an identifier.  In SQL Server, identifiers can be longer than in PostgreSQL (for example, the <code>name</code>datatype is limited to 255 bytes).


### Calling code before a function is executed

```C
typedef void (*pre_function_call_hook_type) (const char *funcName);
```

This hook is invoked when the server needs to change a function name before a function is called. In the case of Babelfish, some characters in the function name will be replaced with underscores.


### Launching protocol support

```C
typedef void (*listen_init_hook_type)(void);
```

This hook is invoked when the server needs to launch protocol support.


### Control string truncation errors

```C
typedef bool (*suppress_string_truncation_error_hook_type)();
```

This hook is invoked when the server needs to control how errors are handled.  In many parts of the Babelfish code, the server has to truncate strings. 


### Convert C-strings to names

```C
typedef Name (*cstr_to_name_hook_type)(char *s, int len);
```

This hook is invoked when the server needs to handle the <code>name</code> data type.  The name data type is restricted in length and therefore needs truncation rules.


### Handling runtime variables

```C
typedef void (*guc_push_old_value_hook_type) (
				struct config_generic *gconf, 
				GucAction action);
```

This hook is invoked when the server needs to make a temporary change to a GUC (a PostgreSQL runtime variable). 


### Checking configuration variables

```C
typedef	void(*validate_set_config_function_hook_type) (char *name, char *value);
```

This hook is invoked when the server needs to handle Babelfish-specific variables.  Variable changes in Babelfish may not support the same values as in community PostgreSQL.


### Controlling plan invalidation

```C
typedef void (*plansource_complete_hook_type) (CachedPlanSource *plansource);
typedef bool (*plansource_revalidate_hook_type) (CachedPlanSource *plansource);
```

This hook is invoked when the server needs to control plan storage and invalidation.

Inside T-SQL (or even inside a normal connection) plans are often prepared and stored to speed up later execution. Often, the plans have to be invalidated and changed. For example, if a column is dropped plans that reference that column have to be removed because database objects no longer exist. The same can be true when configuration variables are modified.


