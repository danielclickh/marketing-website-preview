---
title: Create a Database
description: How to create a new database in ClickHouse
menu:
  docs:
    parent: "getting-started"
weight: 30
draft: false
---


As in most databases management systems, ClickHouse logically groups tables into **databases**. There is a `default` database that  contains any tables created without specifying a database.

## Creating a New Database

Use the `CREATE DATABASE` command to create a new database in ClickHouse:

```sql
CREATE DATABASE IF NOT EXISTS helloworld
```


## The Predefined Databases

A new installation of ClickHouse has three predefined databases:

```sql
SHOW DATABASES
```

results in:

```
┌─name───────────────┐
│ INFORMATION_SCHEMA │
│ default            │
│ information_schema │
│ system             │
└────────────────────┘
```

!!! note "Note"
    `INFORMATION_SCHEMA` and `information_schema` are the same database. It contains information about the metadata of database objects.


That's it! You can now [create a new table for the database](../create-a-table/).

