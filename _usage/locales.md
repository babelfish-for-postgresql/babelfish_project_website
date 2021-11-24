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

Babelfish uses version 153.80 of the ICU collation library. For
detailed information about PostgreSQL collation behavior, visit [the
PostgreSQL website](https://www.postgresql.org/docs/14/collation.html).

Babelfish supports *deterministic* and *non-deterministic*
collations:

- A collation that is *deterministic* will consider two characters as
  equal if, and only if, they have the same byte sequence.  For example, `x`
  is not equal to `X` for a deterministic collation.  Collations that are
  deterministic are case-sensitive (CS) and accent-sensitive (AS).

- A non-deterministic collation does not require an identical match.
  Case-insensitivity (CI) is an example of a non-deterministic
  collation. To have `x` compare equal to `X`, choose a
  non-deterministic collation that supports case-insensitivity.

Babelfish and SQL Server follow a naming convention for collations
that describe the collation attributes, as shown in the table below:

| Attribute   | Description                                            |
| ----------- | ------------------------------------------------------ |
| AI          | Accent insensitive                                     |
| AS          | Accent sensitive                                       |
| BIN         | BIN requests data to be sorted in code point order, treating the first character as a wchar. Code point order is a fast deterministic collation. |
| BIN2        | BIN2 requests data to be sorted in code point order. Code point order is a fast deterministic collation. |
| CI          | Case insensitive                                       |
| CS          | Case sensitive                                         |
| PREF        | To sort uppercase letters before lowercase letters, use a PREF collation. If comparison is case-insensitive, the uppercase version of a letter sorts before the lowercase version, if there is no other distinction. The ICU library supports uppercase preference with `colCaseFirst=upper`, but not for `CI_AS` collations. PREF can be applied only to `CS_AS` - deterministic.  |

PostgreSQL doesn't support the `LIKE` clause on non-deterministic
collations, but Babelfish supports it for `CI_AS` collations.
Babelfish doesn't support `LIKE` on AI collations. Pattern matching
operations on non-deterministic collations are also not supported.

To establish Babelfish collation behavior, set the following
parameters :

| Parameter             | Description                                   |
| --------------------- | --------------------------------------------- |
| `default_locale`      | The `default_locale` parameter is used in combination with the collation attributes in the table above to customize collations for a specific language and region. The default value is `en-US`. The default locale applies to all Babelfish collations and to all SQL Server collations that are mapped to Babelfish collations. This parameter may be changed after initial Babelfish database creation time, but it won't affect the locale of existing collations.            |
| `server_collation_name`  | The collation used as the default collation at both the server level and the database level. The default value is `sql_latin1_general_cp1_ci_as`. When you create your PostgreSQL cluster for use with Babelfish, you can choose the &ldquo;Collation name&rdquo; from the following table. Don't modify `server_collation_name` after the Babelfish database is created.  |

The following collations can be used as a server collation or an object
collation:

| Collation Name        | Notes                                         |
| --------------------- | --------------------------------------------- |
| `BBF_Unicode_General_CS_AS` | A collation that is designed to work as well as possible in multi-language environments. |
| `BBF_Unicode_CP1_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1252.txt); CP1 is the abbreviated name for CP1252. |
| `BBF_Unicode_CP1250_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1250.txt) used to represent texts in Central European and Eastern European languages that use Latin script. |
| `BBF_Unicode_CP1251_CS_AS` | [Deterministic 8-bit character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1251.txt), designed to cover languages that use the Cyrillic script. |
| `BBF_Unicode_CP1251_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1253.txt), used to write modern Greek. |
| `BBF_Unicode_CP1254_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1254.txt) that provides support for Turkish. |
| `BBF_Unicode_CP1255_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1255.txt) that provides support for Hebrew. |
| `BBF_Unicode_CP1256_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1256.txt) used to write languages that use Arabic script. |
| `BBF_Unicode_CP1257_CS_AS` | [Deterministic 8-bit, single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1257.txt) used to support the Estonian, Latvian and Lithuanian languages. |
| `BBF_Unicode_CP1258_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1258.txt) used to write Vietnamese characters. |
| `BBF_Unicode_CP874_CS_AS` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit874.txt) used to write Thai characters. |
| `sql_latin1_general_cp1250_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1250.txt) used to represent Latin characters. |
| `sql_latin1_general_cp1251_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1251.txt) that provides support for Latin characters. |
| `sql_latin1_general_cp1_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1252.txt) that provides support for Latin characters.  |
| `sql_latin1_general_cp1253_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1253.txt) that provides support for Latin characters.   |
| `sql_latin1_general_cp1254_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1254.txt) that provides support for Latin characters. |
| `sql_latin1_general_cp1255_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1255.txt) that provides support for Latin characters.   |
| `sql_latin1_general_cp1256_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1256.txt) used to write languages that use Latin characters. |
| `sql_latin1_general_cp1257_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1257.txt) that provides support for Latin characters. |
| `sql_latin1_general_cp1258_cs_as` | [Deterministic single-byte character encoding](https://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WindowsBestFit/bestfit1258.txt) used to write Latin characters. |
| `chinese_prc_cs_as`  | Provides support for Chinese (PRC).  |
| `cyrillic_general_cs_as` | Provides support for Cyrillic. |
| `finnish_swedish_cs_as` | Provides support for Finnish.  |
| `french_cs_as` | Provides support for French. |
| `korean_wansung_cs_as` | Provides support for Korean (with dictionary sort) |
| `latin1_general_cs_as` | Provides support for Latin characters. |
| `modern_spanish_cs_as` | Provides support for Modern Spanish. |
| `polish_cs_as` | Provides support for Polish. |
| `thai_cs_as` | Provides support for Thai. |
| `traditional_spanish_cs_as` | Provides support for Spanish (Traditional sort) |
| `turkish_cs_as`  | Provides support for Turkish. |
| `ukrainian_cs_as`   | Provides support for Ukranian.   |
| `vietnamese_cs_as`  | Provides support for Vietnamese. |

You can use the following collations for database objects, if you want to support more than one locale in a single database:

| Dialect   | Deterministic options | Non-deterministic options         |
| --------- | --------------------- | --------------------------------- |
| `Arabic`    | `Arabic_CS_AS`  | `Arabic_CI_AS`, `Arabic_CI_AI`    |
| `Chinese`   | `Chinese_CS_AS`  | `Chinese_CI_AS`, `Chinese_CI_AI`  |
| `Cyrillic_General`  | `Cyrillic_General_CS_AS` | `Cyrillic_General_CI_AS`, `Cyrillic_General_CI_AI` |
| `Estonian`  |`Estonian_CS_AS` | `Estonian_CI_AS`, `Estonian_CI_AI` | 
| `Finnish_Swedish` | `Finnish_Swedish_CS_AS` | `Finnish_Swedish_CI_AS`, `Finnish_Swedish_CI_AI` | 
| `French`    | `French_CS_AS`        | `French_CI_AS`, `French_CI_AI`    |
| `Greek`     | `Greek_CS_AS`    | `Greek_CI_AS`, `Greek_CI_AI`   |
| `Hebrew`   | `Hebrew_CS_AS`    | `Hebrew_CI_AS`, `Hebrew_CI_AI` |
| `Korean_Wamsung`    | `Korean_Wamsung_CS_AS`  | `Korean_Wamsung_CI_AS`, `Korean_Wamsung_CI_AI` |
| `Modern_Spanish`  | `Modern_Spanish_CS_AS` | `Modern_Spanish_CS_AS`, `Modern_Spanish_CI_AI` |
| `Mongolian` | `Mongolian_CS_AS`     | `Mongolian_CI_AS`, `Mongolian_CI_AI` |
| `Polish`  | `Polish_CS_AS`        | `Polish_CI_AS`, `Polish_CI_AI` |
| `Thai`    | `Thai_CS_AS`          | `Thai_CI_AS`, `Thai_CI_AI` |
| `Traditional_Spanish` | `Traditional_Spanish_CS_AS` | `Traditional_Spanish_CI_AS`, `Traditional_Spanish_CI_AI` |
| `Turkish`   | `Turkish_CS_AS`       | `Turkish_CI_AS`, `Turkish_CI_AI`  |
| `Ukranian`  | `Ukranian_CS_AS`      | `Ukranian_CI_AS`, `Ukranian_CI_AI` |
| `Vietnamese` | `Vietnamese_CS_AS` | `Vietnamese_CI_AS`, `Vietnamese_CI_AI` |

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
SELECT * FROM fn_helpcollation()
```


### Collation limitations and behaviors {#collation.limitations}

Babelfish uses the ICU library for collation support. The following
section lists some of the known limitations and behavior variations of
Babelfish collations.


#### Unicode sorting rules

In SQL Server, &ldquo;SQL&rdquo; collations (those that start with the
letters `SQL_`) sort Unicode-encoded data (`nchar` and
`nvarchar`) one way, but non-Unicode encoded data (`char` and
`varchar`) a different way. Babelfish databases will always be
UTF-8 encoded and will always apply Unicode sorting rules
consistently, regardless of the data type.


#### Secondary-equal collations
 
The default ICU Unicode secondary-equal (`CI_AS`) collation sorts
punctuation marks and other non-alphanumeric characters before
numeric characters, and numeric characters before alphabetic
characters; however, within the set of punctuation or special characters,
the order may be different from that of the corresponding collation
in SQL Server.


#### Tertiary collations

SQL collations, such as `SQL_Latin1_General_Pref_CP1_CI_AS`, support
the `TERTIARY_WEIGHTS` function and the ability to sort strings that
compare equally in a `CI_AS` collation to be sorted upper case
first: `ABC`, `ABc`, `AbC`, `Abc`, `aBC`, `aBc`, `abC`, and finally
`abc`. Thus the `DENSE_RANK() OVER (ORDER BY column)` analytic
function would assess these strings as having the same rank but
would order them upper case first within a partition.

A similar result can be obtained with Babelfish by adding a
`COLLATE` clause to the `ORDER BY` clause that specifies a tertiary
`CS_AS` collation that specifies `@colCaseFirst=upper`.
Unfortunately the `colCaseFirst` modifier applies only to strings
that are tertiary-equal (rather than secondary-equal like a `CI_AS`
collation); therefore, tertiary SQL collations cannot be emulated
using a single ICU collation. As a workaround, we recommend that
you use a different collation for `GROUP BY` than you use for `ORDER BY`.

#### PostgreSQL supports exactly one version of each collation

PostgreSQL supports exactly one version of each collation, whereas SQL
Server can support multiple versions of the same collation, typically
by modifying the collation name with a version suffix such as `_80` or `_100`.

#### Character(SC) expansion

A character expansion treats a single character as equal to a
sequence of characters at the primary level. SQL Server's default
`CI_AS` collation supports character expansion, whereas ICU
collations support character expansion only for accent-insensitive
collations.

Character reordering options are currently more restricted in
PostgreSQL than in ICU, and the order of special characters can't
be made to follow the order of special characters in SQL Server
exactly.

When character expansion is required, then an `AI` collation must be
used for comparisons, but such collations are not currently
supported by the `LIKE` operator. A column declared using the default
`CI_AS` collation can use the `LIKE` operator without character
expansion being performed, which is typically the desired behavior,
while preserving the option to explicitly collate any equality
comparisons to use a `CI_AI` collation to do character expansion. If
you create a functional index on a `CI_AS` column with an explicit
`CI_AI` collation, then such an index can be exploited by the
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
full Unicode range (‭1,114,111‬ characters) if supplementary
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
first release.


#### Width-Sensitive

When a single-byte character (half-width) and the same character
represented as a double-byte character (full-width) are treated
differently, the collation is called *width-sensitive (WS)*. WS
collations with the same name as SQL Server won't be provided by
Babelfish in the first release.


#### Variation-Selector Sensitivity

Variation-Selector Sensitivity (VSS) collations distinguish between
ideographic variation selectors in Japanese collations
`Japanese_Bushu_Kakusu_140` and `Japanese_XJIS_140`. A variation
sequence is made up of a base character plus an additional variation
selector. If you don't the select the `_VSS` option, the variation
selector isn't considered in the comparison.

VSS collations will not be provided by Babelfish in the first
release.


#### BIN and BIN2

A BIN2 collation sorts characters according to code point order. The
byte-by-byte binary order of UTF-8 preserves Unicode code point
order, so this is also likely to be the best-performing collation.
If Unicode code point order works for an application, using a BIN2
collation should certainly be considered, but could result in data
being displayed on the client in an order that is culturally
unexpected. New mappings to lower-case characters are added to
Unicode as time progresses, so the `LOWER` function may perform
in a different way on different versions of ICU. This is a special case of
the more general collation versioning problem rather than 
something specific to the BIN2 collation. Babelfish will
provide the `BBF_Latin1_General_BIN2` collation with the
Babelfish distribution to collate in Unicode code point order.
In a BIN collation only the first character is sorted as a wchar,
and remaining characters are sorted byte-by-byte, effectively in
code point order according to its encoding. This does not follow
Unicode collation rules and it won't be supported by
Babelfish.



