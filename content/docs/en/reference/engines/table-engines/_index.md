---
title: Table Engines
draft: false
menu:
  docs:
    parent: "reference"
weight: 20
---


The table engine (type of table) determines:

-   How and where data is stored, where to write it to, and where to read it from.
-   Which queries are supported, and how.
-   Concurrent data access.
-   Use of indexes, if present.
-   Whether multithreaded request execution is possible.
-   Data replication parameters.

## Engine Families

### MergeTree

The most universal and functional table engines for high-load tasks. The property shared by these engines is quick data insertion with subsequent background data processing. `MergeTree` family engines support data replication (with [Replicated\*](../../engines/table-engines/mergetree-family/replication#table_engines-replication) versions of engines), partitioning, secondary data-skipping indexes, and other features not supported in other engines.

Engines in the family:

-   [MergeTree](../../engines/table-engines/mergetree-family/mergetree#mergetree)
-   [ReplacingMergeTree](../../engines/table-engines/mergetree-family/replacingmergetree#replacingmergetree)
-   [SummingMergeTree](../../engines/table-engines/mergetree-family/summingmergetree#summingmergetree)
-   [AggregatingMergeTree](../../engines/table-engines/mergetree-family/aggregatingmergetree#aggregatingmergetree)
-   [CollapsingMergeTree](../../engines/table-engines/mergetree-family/collapsingmergetree#table_engine-collapsingmergetree)
-   [VersionedCollapsingMergeTree](../../engines/table-engines/mergetree-family/versionedcollapsingmergetree#versionedcollapsingmergetree)
-   [GraphiteMergeTree](../../engines/table-engines/mergetree-family/graphitemergetree#graphitemergetree)

### Log

Lightweight [engines](../../engines/table-engines/log-family/index) with minimum functionality. They’re the most effective when you need to quickly write many small tables (up to approximately 1 million rows) and read them later as a whole.

Engines in the family:

-   [TinyLog](../../engines/table-engines/log-family/tinylog#tinylog)
-   [StripeLog](../../engines/table-engines/log-family/stripelog#stripelog)
-   [Log](../../engines/table-engines/log-family/log#log)

### Integration Engines

Engines for communicating with other data storage and processing systems.

Engines in the family:


-   [ODBC](../../engines/table-engines/integrations/odbc)
-   [JDBC](../../engines/table-engines/integrations/jdbc)
-   [MySQL](../../engines/table-engines/integrations/mysql)
-   [MongoDB](../../engines/table-engines/integrations/mongodb)
-   [HDFS](../../engines/table-engines/integrations/hdfs)
-   [S3](../../engines/table-engines/integrations/s3)
-   [Kafka](../../engines/table-engines/integrations/kafka)
-   [EmbeddedRocksDB](../../engines/table-engines/integrations/embedded-rocksdb)
-   [RabbitMQ](../../engines/table-engines/integrations/rabbitmq)
-   [PostgreSQL](../../engines/table-engines/integrations/postgresql)

### Special Engines

Engines in the family:

-   [Distributed](../../engines/table-engines/special/distributed#distributed)
-   [MaterializedView](../../engines/table-engines/special/materializedview#materializedview)
-   [Dictionary](../../engines/table-engines/special/dictionary#dictionary)
-   [Merge](../../engines/table-engines/special/merge#merge)
-   [File](../../engines/table-engines/special/file#file)
-   [Null](../../engines/table-engines/special/null#null)
-   [Set](../../engines/table-engines/special/set#set)
-   [Join](../../engines/table-engines/special/join#join)
-   [URL](../../engines/table-engines/special/url#table_engines-url)
-   [View](../../engines/table-engines/special/view#table_engines-view)
-   [Memory](../../engines/table-engines/special/memory#memory)
-   [Buffer](../../engines/table-engines/special/buffer#buffer)

## Virtual Columns

Virtual column is an integral table engine attribute that is defined in the engine source code.

You shouldn’t specify virtual columns in the `CREATE TABLE` query and you can’t see them in `SHOW CREATE TABLE` and `DESCRIBE TABLE` query results. Virtual columns are also read-only, so you can’t insert data into virtual columns.

To select data from a virtual column, you must specify its name in the `SELECT` query. `SELECT *` does not return values from virtual columns.

If you create a table with a column that has the same name as one of the table virtual columns, the virtual column becomes inaccessible. We do not recommend doing this. To help avoid conflicts, virtual column names are usually prefixed with an underscore.

[Original article](https://clickhouse.com/docs/en/engines/table-engines/) <!--hide-->
