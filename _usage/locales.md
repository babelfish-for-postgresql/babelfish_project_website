---
layout: default
title: Locales and language support
nav_order: 4
---

## Locales and language support

A collation specifies the sort order and presentation format of data.
Babelfish maps SQL Server collations to comparable collations
provided by Babelfish. Babelfish predefines Unicode collations with
culturally-sensitive string comparisons and sort orders, and provides a
way to translate the collations in your SQL Server DB to the
closest-matching Babelfish collation. Locale-specific collations
are provided for different languages and regions.

Some collations specify a code page that corresponds to a client-side
encoding. Babelfish will automatically translate from the server
encoding to the client encoding depending on the collation of each
output column.

For detailed information about PostgreSQL collation behavior, visit [the
PostgreSQL website](https://www.postgresql.org/docs/13/collation.html).

Babelfish supports *deterministic* and *non-deterministic*
collations:

- A collation that is *deterministic* will consider two characters as
  equal if, and only if, they have the same byte sequence.  For example, `x`
  is not equal to `X` for a deterministic collation.  Collations that are
  deterministic are case-sensitive (cs) and accent-sensitive (as).

- A non-deterministic collation does not require an identical match.
  Case-insensitivity (ci) is an example of a non-deterministic
  characteristic. To have `x` compare equal to `X`, choose a
  non-deterministic collation that supports case-insensitivity.

Babelfish and SQL Server follow a naming convention for collations
that describe the collation attributes, as shown in the table below:

| Attribute   | Description                                            |
| ----------- | ------------------------------------------------------ |
| `ai`        | Accent insensitive                                     |
| `as`        | Accent sensitive                                       |
| `bin`       | BIN requests data to be sorted in code point order, treating the first character as a wchar. Code point order is a fast deterministic collation. |
| `bin2`      | BIN2 requests data to be sorted in code point order. Code point order is a fast deterministic collation. |
| `ci`        | Case insensitive                                       |
| `cs`        | Case sensitive                                         |
| `pref`      | To sort uppercase letters before lowercase letters, use a `pref` collation. If the comparison is case-sensitive, the uppercase version of a letter sorts before the lowercase version, if there is no other distinction. The ICU library supports uppercase preference with `colCaseFirst=upper`, but not for `ci_as` collations. `pref` can be applied only to `cs_as` (deterministic).  |

PostgreSQL doesn't support the `LIKE` clause on non-deterministic
collations, but Babelfish supports it for `ci_as` collations.
Babelfish doesn't support `LIKE` on `ai` collations. Pattern matching
operations on non-deterministic collations are also not supported.

To establish Babelfish collation behavior, set the following
parameters:

| Parameter             | Description                                   |
| --------------------- | --------------------------------------------- |
| `server_collation_name`  | The collation used as the default collation at both the server level and the database level. The default value is `sql_latin1_general_cp1_ci_as`. When you create your PostgreSQL cluster for use with Babelfish, you can choose the &ldquo;Collation name&rdquo; from the following table. Don't modify `server_collation_name` after the Babelfish database has been created.  |
| `default_locale`      | The `default_locale` parameter is used to customize all locale agnostic collations (that do not have a language in their name) for a specific language and region. The default value is `en-US`.  This parameter is ignored if the chosen collation already implies a locale.  This parameter may be changed after initial Babelfish database creation time, but it won't affect the locale of existing collations. |

The following collations can be used in `server_collation_name` or for column
definitions.  Note that only case insensitive collations are supported.

| Collation Name        | Notes                                         |
| --------------------- | --------------------------------------------- |
| `bbf_unicode_general_ci_as` | Case insensitive collation for the UTF-8 encoding that is designed to work as well as possible in multi-language environments. |
| `bbf_unicode_cp1250_ci_as` | Case insensitive collation for the [Windows-1250 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1250.txt). |
| `bbf_unicode_cp1251_ci_as` | Case insensitive collation for the [Windows-1251 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1251.txt). |
| `bbf_unicode_cp1_ci_as` | Case insensitive collation for the [Windows-1252 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1252.txt). |
| `bbf_unicode_cp1253_ci_as` | Case insensitive collation for the [Windows-1253 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1253.txt). |
| `bbf_unicode_cp1254_ci_as` | Case insensitive collation for the [Windows-1254 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1254.txt). |
| `bbf_unicode_cp1255_ci_as` | Case insensitive collation for the [Windows-1255 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1255.txt). |
| `bbf_unicode_cp1256_ci_as` | Case insensitive collation for the [Windows-1256 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1256.txt). |
| `bbf_unicode_cp1257_ci_as` | Case insensitive collation for the [Windows-1257 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1257.txt). |
| `bbf_unicode_cp1258_ci_as` | Case insensitive collation for the [Windows-1258 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1258.txt). |
| `bbf_unicode_cp874_ci_as` | Case insensitive collation for the [Windows-874 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit874.txt). |
| `sql_latin1_general_cp1250_ci_as` | The same as `bbf_unicode_cp1250_ci_as`. |
| `sql_latin1_general_cp1251_ci_as` | The same as `bbf_unicode_cp1251_ci_as`. |
| `sql_latin1_general_cp1_ci_as` | The same as `bbf_unicode_cp1_ci_as`. |
| `sql_latin1_general_cp1253_ci_as` | The same as `bbf_unicode_cp1253_ci_as`. |
| `sql_latin1_general_cp1254_ci_as` | The same as `bbf_unicode_cp1254_ci_as`. |
| `sql_latin1_general_cp1255_ci_as` | The same as `bbf_unicode_cp1255_ci_as`. |
| `sql_latin1_general_cp1256_ci_as` | The same as `bbf_unicode_cp1256_ci_as`. |
| `sql_latin1_general_cp1257_ci_as` | The same as `bbf_unicode_cp1257_ci_as`. |
| `sql_latin1_general_cp1258_ci_as` | The same as `bbf_unicode_cp1258_ci_as`. |
| `sql_latin1_general_cp874_ci_as` | The same as `bbf_unicode_cp874_ci_as`. |
| `latin1_general_ci_as` | The same as `sql_latin1_general_cp1_ci_as`. |
| `arabic_ci_as` | Provides support for Arabic. |
| `chinese_prc_ci_as`  | Provides support for Chinese (PRC).  |
| `cyrillic_general_ci_as` | Provides support for Cyrillic. |
| `estonian_ci_as` | Provides support for Estonian.  |
| `finnish_swedish_ci_as` | Provides support for Finnish.  |
| `french_ci_as` | Provides support for French. |
| `greek_ci_as` | Provides support for Greek. |
| `hebrew_ci_as` | Provides support for Hebrew. |
| `japanese_ci_as` | Provides support for Japanese. |
| `korean_wansung_ci_as` | Provides support for Korean (with dictionary sort) |
| `modern_spanish_ci_as` | Provides support for Modern Spanish. |
| `mongolian_ci_as` | Provides support for Mongolian. |
| `polish_ci_as` | Provides support for Polish. |
| `thai_ci_as` | Provides support for Thai. |
| `traditional_spanish_ci_as` | Provides support for Spanish (Traditional sort) |
| `turkish_ci_as`  | Provides support for Turkish. |
| `ukrainian_ci_as`   | Provides support for Ukranian.   |
| `vietnamese_ci_as`  | Provides support for Vietnamese. |

For column definitions, you can also use case sensitive or accent insensitive versions of the above collations.  The following binary collations are also supported for columns:

| Collation Name            | Notes                              |
| ------------------------- | ---------------------------------- |
| `latin1_general_bin2`     | Binary collation for the [Windows-1252 single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1252.txt). |
| `latin1_general_100_bin2` | The same as `latin1_general_bin2`. |
| `latin1_general_140_bin2` | The same as `latin1_general_bin2`. |
| `latin1_general_90_bin2`  | The same as `latin1_general_bin2`. |

You can use the following collations for column definitions, if you want to support more than one locale in a single database:

| Dialect   | Deterministic version | Non-deterministic versions         |
| --------- | --------------------- | --------------------------------- |
| `arabic`    | `arabic_cs_as`  | `arabic_ci_as`, `arabic_ci_ai`    |
| `chinese`   | `chinese_cs_as`  | `chinese_ci_as`, `chinese_ci_ai`  |
| `cyrillic_general`  | `cyrillic_general_cs_as` | `cyrillic_general_ci_as`, `cyrillic_general_ci_ai` |
| `estonian`  |`estonian_cs_as` | `estonian_ci_as`, `estonian_ci_ai` | 
| `finnish_swedish` | `finnish_swedish_cs_as` | `finnish_swedish_ci_as`, `finnish_swedish_ci_ai` | 
| `french`    | `french_cs_as`        | `french_ci_as`, `french_ci_ai`    |
| `greek`     | `greek_cs_as`    | `greek_ci_as`, `greek_ci_ai`   |
| `hebrew`   | `hebrew_cs_as`    | `hebrew_ci_as`, `hebrew_ci_ai` |
| `japanese` | `japanese_cs_as`  |  `japanese_ci_as`,  `japanese_ci_ai` |
| `korean_wamsung`    | `korean_wamsung_cs_as`  | `korean_wamsung_ci_as`, `korean_wamsung_ci_ai` |
| `modern_spanish`  | `modern_spanish_cs_as` | `modern_spanish_cs_as`, `modern_spanish_ci_ai` |
| `mongolian` | `mongolian_cs_as`     | `mongolian_ci_as`, `mongolian_ci_ai` |
| `polish`  | `polish_cs_as`        | `polish_ci_as`, `polish_ci_ai` |
| `thai`    | `thai_cs_as`          | `thai_ci_as`, `thai_ci_ai` |
| `traditional_spanish` | `traditional_spanish_cs_as` | `traditional_spanish_ci_as`, `traditional_spanish_ci_ai` |
| `turkish`   | `turkish_cs_as`       | `turkish_ci_as`, `turkish_ci_ai`  |
| `ukranian`  | `ukranian_cs_as`      | `ukranian_ci_as`, `ukranian_ci_ai` |
| `vietnamese` | `vietnamese_cs_as` | `vietnamese_ci_as`, `vietnamese_ci_ai` |

### Managing collations

The ICU library provides collation version tracking to ensure that
indexes that depend on collations can be reindexed when a new version of
ICU becomes available. You can use the following query to identify all
collations in the current database that need to be refreshed and the
objects that depend on them:

```sql
SELECT 	pg_describe_object(refclassid, refobjid, refobjsubid) AS "Collation", 
	pg_describe_object(classid, objid, objsubid) AS "Object" 
FROM 	pg_depend d JOIN pg_collation c 
	ON refclassid = 'pg_collation'::regclass 
		AND refobjid = c.oid 
WHERE 	c.collversion < > pg_collation_actual_version(c.oid) 
ORDER BY 1, 2;
```

Predefined collations are stored in the `sys.fn_helpcollations` table.
You can use the following command to display information about a
collation (such as its lcid, style, and collate flags). To retrieve the
list, connect a psql client to the PostgreSQL port (by default, `5432`)
and enter:

```sql
postgres=# SET search_path = public, pg_temp, sys;
SET
postgres=# \dO
```

Connect to the T-SQL port (by default `1433`) and enter:

```sql
SELECT * FROM fn_helpcollation();
```


### Collation limitations and behaviors {#collation.limitations}

Babelfish uses the ICU library for collation support. The following
section lists some of the known limitations and behavior variations of
Babelfish collations.


### Using CHARINDEX() with a non-deterministic collation

Note: the following limitation applies only to Babelfish version 1.x.x.  This issue has been resolved in version 2.1.0.

`CHARINDEX()` cannot currently be used when the applicable collation is non-deterministic. Babelfish (by default) uses a non-deterministic case-insensitive collation, so you may encounter a run-time error saying "nondeterministic collations are not supported for substring searches". Until this is resolved, this issue can be worked around in two ways:

- You can explicitly convert the expression to a case-sensitive collation and case-fold both arguments by applying LOWER() or UPPER(). For example: 
    `SELECT CHARINDEX('x', a) from t1` becomes: `SELECT CHARINDEX(LOWER('x'), LOWER(a collate sql_latin1_general_cp1_cs_as)) from t1`
- Create a SQL function named `f_charindex()`, and replace `CHARINDEX()` calls with calls to this function:

```sql
create function f_charindex(@s1 varchar(max), @s2 varchar(max)) returns int
as
begin
declare @i int = 1
while len(@s2) >= len(@s1)
begin
   if lower(@s1) = lower(substring(@s2,1,len(@s1))) return @i
   set @i += 1
   set @s2 = substring(@s2,2,999999999)
end
return 0
end
go
```

#### Unicode sorting rules

In SQL Server, &ldquo;SQL&rdquo; collations (those that start with the
letters `SQL_`) sort Unicode-encoded data (`nchar` and
`nvarchar`) one way, but non-Unicode encoded data (`char` and
`varchar`) a different way. Babelfish databases will always be
UTF-8 encoded and will always apply Unicode sorting rules
consistently, regardless of the data type.


#### Secondary-equal collations
 
The default ICU Unicode secondary-equal (`ci_as`) collation sorts
punctuation marks and other non-alphanumeric characters before
numeric characters, and numeric characters before alphabetic
characters; however, within the set of punctuation or special characters,
the order may be different from that of the corresponding collation
in SQL Server.


#### Tertiary collations

SQL collations, such as `sql_latin1_general_pref_cp1_ci_as`, support
the `TERTIARY_WEIGHTS` function and the ability to sort strings that
compare equally in a `ci_as` collation to be sorted upper case
first: `ABC`, `ABc`, `AbC`, `Abc`, `aBC`, `aBc`, `abC`, and finally
`abc`. Thus the `DENSE_RANK() OVER (ORDER BY column)` analytic
function would assess these strings as having the same rank but
would order them upper case first within a partition.

A similar result can be obtained with Babelfish by adding a
`COLLATE` clause to the `ORDER BY` clause that specifies a tertiary
`cs_as` collation that specifies `@colCaseFirst=upper`.
Unfortunately the `colCaseFirst` modifier applies only to strings
that are tertiary-equal (rather than secondary-equal like a `ci_as`
collation); therefore, tertiary SQL collations cannot be emulated
using a single ICU collation. As a workaround, we recommend that
you use a different collation for `GROUP BY` than you use for `ORDER BY`.

#### PostgreSQL supports exactly one version of each collation

PostgreSQL supports exactly one version of each collation, whereas SQL
Server can support multiple versions of the same collation, typically
by modifying the collation name with a version suffix such as `_80` or `_100`.

#### Character expansion

A character expansion treats a single character as equal to a
sequence of characters at the primary level. SQL Server's default
`ci_as` collation supports character expansion, whereas ICU
collations support character expansion only for accent-insensitive
collations.

Character reordering options are currently more restricted in
PostgreSQL than in ICU, and the order of special characters can't
be made to follow the order of special characters in SQL Server
exactly.

When character expansion is required, then an `ai` collation must be
used for comparisons, but such collations are not currently
supported by the `LIKE` operator. A column declared using the default
`ci_as` collation can use the `LIKE` operator without character
expansion being performed, which is typically the desired behavior,
while preserving the option to explicitly collate any equality
comparisons to use a `ci_ai` collation to do character expansion. If
you create a functional index on a `ci_as` column with an explicit
`ci_ai` collation, then such an index can be exploited by the
optimizer to perform equality and grouping operations efficiently.


#### char and varchar encoding
 
When collations that begin with SQL are used for char or varchar
data types, the sort order for characters above ASCII 127 is
determined by the specific code page for that SQL collation. For SQL
collations, strings declared as char or varchar may sort in a different 
way from strings declared as nchar or nvarchar.

PostgreSQL encodes all strings with the database encoding, so will
convert all characters to UTF-8 and sort using Unicode rules.

Since SQL collations sort nchar and nvarchar data types using
Unicode rules, Babelfish encodes all strings on the server
using UTF-8, and sorts nchar and nvarchar strings the same way it
sorts char and varchar strings, using Unicode rules.


#### Supplementary Character

The SQL Server functions `NCHAR`, `UNICODE`, and `LEN` support
characters for code-points outside the Unicode Basic Multilingual
Plane (BMP), whereas non-SC collations use surrogate pair characters
to handle supplementary characters. For Unicode data types, SQL
Server can represent up to 65,535 characters using UCS-2, or the
full Unicode range (1,114,111 characters) if supplementary
characters are used. Supplementary characters aren't supported for
use in metadata, such as in names of database objects, and
collations without SC in the name behave differently in SQL Server
depending on whether the encoding is UTF-16 or UCS-2.


#### Kana-Sensitive

When Japanese Kana characters `Hiragana` and `Katakana` are treated
differently, the collation is called Kana sensitive (KS). ICU
supports the Japanese collation standard `JIS X 4061`. The now
deprecated `colhiraganaQ [on | off]` locale modifier may provide the
same functionality as KS collations, but KS collations of the same
name as SQL Server will not be provided by Babelfish in the
current release.


#### Width-Sensitive

When a single-byte character (half-width) and the same character
represented as a double-byte character (full-width) are treated
differently, the collation is called *width-sensitive (WS)*. WS
collations with the same name as SQL Server won't be provided by
Babelfish in the current release.


#### Variation-Selector Sensitivity

Variation-Selector Sensitivity (VSS) collations distinguish between
ideographic variation selectors in Japanese collations
`Japanese_Bushu_Kakusu_140` and `Japanese_XJIS_140`. A variation
sequence is made up of a base character plus an additional variation
selector. If you don't the select the `_vss` option, the variation
selector isn't considered in the comparison.

VSS collations will not be provided by Babelfish in the current
release.


#### `bin` and `bin2`

A `bin2` collation sorts characters according to code point order. The
byte-by-byte binary order of UTF-8 preserves Unicode code point
order, so this is also likely to be the best-performing collation.
If Unicode code point order works for an application, using a `bin2`
collation should certainly be considered, but could result in data
being displayed on the client in an order that is culturally
unexpected. New mappings to lower-case characters are added to
Unicode as time progresses, so the `lower` function may perform
in a different way on different versions of ICU. This is a special case of
the more general collation versioning problem rather than 
something specific to the `bin2` collation. Babelfish will
provide the `bbf_latin1_general_bin2` collation to collate in Unicode code
point order.
In a BIN collation only the first character is sorted as a wchar,
and remaining characters are sorted byte-by-byte, effectively in
code point order according to its encoding. This does not follow
Unicode collation rules and it won't be supported by
Babelfish.
