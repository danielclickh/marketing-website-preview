---
title: Create a New Table
description: An introduction to creating new tables in ClickHouse.
menu:
  docs:
    parent: "getting-started"
weight: 20

---


## A Brief Intro to Table Engines 

Even the simplest of tables in ClickHouse must specify a **table engine**. The engine determines details about the table like:

- how and where the data is stored, 
- which queries are supported, and 
- whether or not the data is replicated. 

There are many engines to choose from, but for a simple table on a single-node ClickHouse server, [MergeTree](../engines/table-engines/mergetree-family/mergetree.md#mergetree) is your likely choice. The table engine is specified by adding an `ENGINE` clause to the `CREATE TABLE` command, and the ` ENGINE` clause is required.


## A Brief Intro to Primary Keys

If you are new to ClickHouse, then its implementation of primary keys might seem unexpected: 

- primary keys in ClickHouse are _not_ unique for each row in a table
    
In fact, unique keys would be an anti-pattern in ClickHouse because it would slow down the performance of a MergeTree table and possibly cause the server to run out of memory (because the index of primary keys must fit in memory).

The primary key of a ClickHouse table determines how the data is sorted when written to disk. Each unique value of the primary keys creates an entry in the index file for up to (by default) 8,192 rows or 10MB of data, which is referred to as the **index granularity**. This granularity concept creates a **sparse index** that can easily fit in memory, and the granules represent a stripe of the smallest amount of column data that gets processed during `SELECT` queries. (View the **SETTINGS** section of [Query Clauses](../engines/table-engines/mergetree-family/mergetree/#query-clauses) in the documentation for more details.) 

The primary key can be defined using the `PRIMARY KEY` command. If you define a table without a `PRIMARY KEY` specified, then the key becomes the tuple specified in the `ORDER BY` clause - which is actually a common way to define a primary key in ClickHouse tables.


## Creating a New Table

Now that you have at least an introductory understanding of table engines and primary keys in ClickHouse, let's define a simple table. You use the `CREATE TABLE` command to create a new table in ClickHouse:

```sql
CREATE TABLE helloworld.my_table
(
   user_id UInt32,
   message String,
   timestamp DateTime,
   metric Float32
)
ENGINE = MergeTree()
ORDER BY (user_id, toYYYYMM(timestamp))
```

In this example, `my_table` is a MergeTree table with four columns:

- `user_id`:  a 32-bit unsigned integer
- `message`: a String data type, which replaces types like VARCHAR, BLOB, CLOB and others from other database systems
- `timestamp`: a DateTime value, which represents an instant in time
- `metric`: a 32-bit floating point number

The primary key is a tuple of:

- `user_id`
- `toYYYYMM(timestamp)`: the month portion of the given timestamp

In other words, all rows with the same `user_id` and from the same month will have the same primary key. This could be thousands, millions or even billions of records with the same key - which is great for ClickHouse! 

You are now ready to [insert data into a table](../sql-reference/statements/insert-into.md) and [write SELECT queries](../sql-reference/statements/select/index.md).