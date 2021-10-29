---
layout: default
title: PostgreSQL hooks
nav_order: 5
---

## PostgreSQL hooks

In this document, we have already mentioned protocol hooks more than once, since they
form the backbone of the entire Babelfish product. 

The problem is that in many cases, Babelfish must behave differently than
standard PostgreSQL. To handle this inconsistency, hooks are the only way to change the
behavior of PostgreSQL. However, it is not only about changes in behavior. In some
areas, MS SQL has more features than standard PostgreSQL. Hooks do a good job to
fix many of those cases as well. That's why it's important to gain a decent
general understanding of hooks, and to learn which ones have been added to the
core of PostgreSQL so that things such as T-SQL can work in a satisfactory way.

In this section, you will learn about the various hooks and what they are able to do:

### Relation name lookup

```C
typedef Oid (*relname_lookup_hook_type) (const char *relname, Oid relnamespace);
```

This hook allows developers to replace the relation name lookup code with your
own implementation. MS SQL handles relation names in a slighly different way and
we need this hook to overwrite this behavior.


### COLLATION lookup code

```C
typedef Oid (*CLUSTER_COLLATION_OID_hook_type)(void);
```

We provide a function hook variable that lets loadable plugins get control when 
<code>CLUSTER_COLLATION_OID</code> is called. Collations are a bit different in
MS SQL and thus more control over how they are handled is needed.


### Preprocessing collation parameters

```C
typedef void (*PreCreateCollation_hook_type) (char collprovider,
                                              bool collisdeterministic,
                                              int32 collencoding,
                                              const char **collcollate, 
                                              const char **collctype,
                                              const char *collversion);
```

A hook may be registered to preprocess the parameters that will be used to 
create the collation. Again, this is necessary to adjust to locale-related
differences between PostgreSQL and MS SQL.


### Manage collation names

```C
typedef const char * (*TranslateCollation_hook_type) (const char *collname, 
						      Oid collnamespace, 
						      int32 encoding);
```

If a collation does not exist you can use hook to do a second, customized
lookup. We need this to handle MS SQL-specific collations.


### Managing AS clauses

```C
typedef bool (*check_lang_as_clause_hook_type)(const char *lang, 
					       List *as, 
					       char **prosrc_str_p, 
					       char **probin_str_p);
```

Allow extension languages to process the <code>AS</code>-clause themselves.


### Modify CREATE FUNCTION statements

```C
typedef void (*write_stored_proc_probin_hook_type)(CreateFunctionStmt *stmt, 
						   Oid languageOid, 
						   char** probin_str_p);
```

This hook allows us to influence the way procedural code is stored. In case of
T-SQL some JSON magic is happening behind the scenes, which is hard to do without
this hook.


### Modify sequence values 

```C
typedef void (*pltsql_sequence_validate_increment_hook_type) 
	      (int64 increment_by, int64 max_value, int64 min_value);

typedef void (*pltsql_sequence_datatype_hook_type) (ParseState *pstate, 
		Oid *newtypid, bool for_identity, DefElem *as_type, 
		DefElem **max_value, DefElem **min_value);
```

MS SQL has slightly different sequence handling. This hooks allows you to adjust
sequence handling-related behavior in T-SQL.


### Handling cache resets 

```C
typedef void (*pltsql_resetcache_hook_type) ();
```

This hooks allows you to reset the cache behavior. Especially <code>IDENTITY</code> 
values are important to Babelfish in this context. 


### Managing attribute (column) options

```C
typedef bool (*check_extended_attoptions_hook_type) (Node *options);
```

The problem is that different types of extensions and protocols will
need different column options. This hook will allow developers to define a
validation method for those options. 


### Procedure entry 

```C
typedef void (*non_tsql_proc_entry_hook_type) (int, int);
```

Manage operations when a procedure is entered.


### Transforming planner qual nodes

```C
typedef Node* (*planner_node_transformer_hook_type) (PlannerInfo *root, 
		Node *expr, int kind);
```

This is a hook for plugins to transform qual nodes inside the planner. A qual is
basically a "filter" (e.g. <code>foo = 10</code>) which is handled during query
execution.


### Pre-parse and post-parse analyze hook

```C
typedef void (*pre_parse_analyze_hook_type) (ParseState *pstate, 
					     RawStmt *parseTree);
```

Two hooks are available here. The pre-parse hooks allow us to tap into the
parser before the magic happens. The same can be done after parsing
(<code>post_parse_analyze_hook</code>) to modify behavior.


### Hook into RETURNING qualifiers

```C
typedef void (*pre_transform_returning_hook_type) (CmdType command,
				List *returningList, 
				ParseState *pstate);
```

Hook to handle qualifiers in returning list for output clause.


### UPDATE transformations

```C
typedef Node* (*pre_output_clause_transformation_hook_type) (ParseState *pstate, 
				UpdateStmt *stmt, CmdType 
				command);
```

Hook to perform self-join transformation on <code>UpdateStmt</code> in output clause.


### Reading global variables on output

```C
typedef bool (*get_output_clause_status_hook_type) (void);
```

Hook to read a global variable with info on output clause.


### Hook into INSERT statements after transformation

```C
typedef void (*post_transform_insert_row_hook_type) (List *icolumns, 
				List *exprList);
```

Hook for plugins to get control after an insert row transform.


### Target list entry (TLE) comparison

```C
typedef bool (*tle_name_comparison_hook_type)(const char *tlename, 
				const char *identifier);
```

Handle the way target lists entries are processed. Target lists are basically a
list of columns and expressions making up a table. An example of a target list
is what one would put into a <code>SELECT</code> clause.


### Manage path coercion

```C
typedef CoercionPathType (*find_coercion_pathway_hook_type) (Oid sourceTypeId,
					Oid targetTypeId,
					CoercionContext ccontext,
					Oid *funcid);
```

Hook interface to check TSQL has an implicit coercion path from 
<code>sourceTypeId</code> to <code>targetTypeId</code>.


### Handle data type precedence

```C
typedef bool (*determine_datatype_precedence_hook_type) (
						Oid typeId1, 
						Oid typeId2);
```

A hook to control data type-precedence handling. In Babelfish the precedence is
as follows:

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

A hook to control the lookup process of parameter definitions.


### Controlling function lookups

```C
typedef FuncCandidateList (*func_select_candidate_hook_type) (
					int nargs, 
					Oid *input_typeids, 
					FuncCandidateList candidates, 
					bool unknowns_resolved);
```

A hook to manage different function lookup behavior (to deal with overloading,
data types, etc.).


### Managing function arguments

```C
typedef void (*make_fn_arguments_from_stored_proc_probin_hook_type)(
					ParseState *pstate,
					List *fargs,
					Oid *actual_arg_types,
					Oid *declared_arg_types,
					Oid funcid);
```

Hook interface to process function arguments using <code>probin</code> (which is
an internal field in pg_proc).


### Transforming the target list

```C
typedef void (*pre_transform_target_entry_hook_type)(
					ResTarget *res, 
					ParseState *pstate, 
					ParseExprKind exprKind);
```

A hook to transform the target list (= column list in a table. e.g. in a SELECT
clause).


### Resolve unknown entries in the target list

```C
typedef void (*resolve_target_list_unknowns_hook_type)(ParseState *pstate, 
					List *targetlist);
```

Handle unknown entries in the target list. MS SQL and PostgreSQL are different in
case columns have no assigned names.


### Managing default typmods

```C
typedef void (*check_or_set_default_typmod_hook_type)(TypeName * typeName, 
					int32 *typmod, 
					bool is_cast);
```

Typmod are basically "parameters" for data types (e.g. varchar(20)). This hook
allows you to control the default behavior.


### Control the data type of identity columns

```C
typedef void (*pltsql_identity_datatype_hook_type) (ParseState *pstate,
```

Helps to manage the data type of identity columns. This is relevant to T-SQL.


### Control column definitions

```C
typedef void (*post_transform_column_definition_hook_type) (
					ParseState *pstate, 	
					RangeVar* relation, 
					ColumnDef *column, 
					List **alist);
```

Process column definitions after initial transformation.


### Hooks to extend the backend parser

```C
typedef List * (*raw_parser_hook_type) (const char *str);
```

Hook into the raw parser and control its behavior.


### Re-processing typmod expressions

```C
typedef List * (*rewrite_typmod_expr_hook_type) (List *expr_list);
```

Babelfish and PostgreSQL need different typemod handling behavior. This hook
will define the rewrite behavior of this feature.


### Validate typmods for numeric types

```C
typedef void (*validate_numeric_typmods_hook_type) (List **typmods, 
			bool isNumeric, 
			void* yyscanner);
```

<code>numeric</code> is slightly different in Babelfish than in standard 
PostgreSQL. This has been outlined in the section about
[extensions](/docs/internals/software-architecture/) already. This hooks will ensure that
validating typmods for numeric types can be influenced accordingly. 


### Handling recursive CTEs

```C
typedef bool (*check_recursive_cte_hook_type) (WithClause *with_clause);
```

This hook is needed to adjust the behavior of the PostgreSQL parser and SQL
grammar directly. It allows for <code>WITH</code> clauses to be named 
<code>TIME</code> or <code>ORDINALITY</code>.


### Handling different lengths of identifiers

```C
typedef bool (*truncate_identifier_hook_type)(char *ident, int len, bool warn);
```

In MS SQL, identifiers can be longer than in PostgreSQL (the <code>name</code>
datatype is limited to 255 bytes). Therefore, logic is needed to truncate the
name of an identifier. 


### Calling code before a function is executed

```C
typedef void (*pre_function_call_hook_type) (const char *funcName);
```

Before a function is called, this hook can be used to change the function name. In
the case of Babelfish, some characters in the function name will be replaced with
underscores.


### Launching protocol support

```C
typedef void (*listen_init_hook_type)(void);
```

This hook is by far one of the most important ones. It can be found in the postmaster
and is in charge of launching actual protocol support.


### Control string truncation errors

```C
typedef bool (*suppress_string_truncation_error_hook_type)();
```

In many parts of the code, the server has to truncate strings (especially inside
varchar and so on). This hook allows us to control how errors are handled.


### Convert C-strings to names

```C
typedef Name (*cstr_to_name_hook_type)(char *s, int len);
```

This hook is especially important to handle the <code>name</code> data type
which is restricted in length and therefore needs truncation rules.


### Handling runtime variables

```C
typedef void (*guc_push_old_value_hook_type) (
				struct config_generic *gconf, 
				GucAction action);
```

Sometimes, inside T-SQL GUC (= PostgreSQL runtime variables) need to be
changed temporarily, which is made possible with this hook. 


### Checking configuration variables

```C
typedef	void(*validate_set_config_function_hook_type) (char *name, char *value);
```

If variables are changed in Babelfish, those variables might not support the same
values as in standard PostgreSQL. Therefore a function is needed to handle
Babelfish-specific variables.


### Controlling plan invalidation

```C
typedef void (*plansource_complete_hook_type) (CachedPlanSource *plansource);
typedef bool (*plansource_revalidate_hook_type) (CachedPlanSource *plansource);
```

Inside T-SQL (or even inside a normal connection) plans are often prepared and
stored to speed up later execution. Often, these plans have to be
invalidated and changed. One example would be that a column is dropped which
naturally means that some plans have to be removed because objects in the
database simply do not exist anymore. However, the same can be true for changed
config variables and the like.

Those hooks allow you to control this behavior - especially when plans are
invalidated due to changed variables.

