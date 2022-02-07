---
toc_folder_title: Integrations
toc_priority: 1
---

# Table Engines for Integrations

ClickHouse provides various means for integrating with external systems, including table engines. Like with all other table engines, the configuration is done using `CREATE TABLE` or `ALTER TABLE` queries. Then from a user perspective, the configured integration looks like a normal table, but queries to it are proxied to the external system. This transparent querying is one of the key advantages of this approach over alternative integration methods, like external dictionaries or table functions, which require to use custom query methods on each use.

List of supported integrations:

-   [ODBC](../../../engines/table-engines/integrations/odbc)
-   [JDBC](../../../engines/table-engines/integrations/jdbc)
-   [MySQL](../../../engines/table-engines/integrations/mysql)
-   [MongoDB](../../../engines/table-engines/integrations/mongodb)
-   [HDFS](../../../engines/table-engines/integrations/hdfs)
-   [S3](../../../engines/table-engines/integrations/s3)
-   [Kafka](../../../engines/table-engines/integrations/kafka)
-   [EmbeddedRocksDB](../../../engines/table-engines/integrations/embedded-rocksdb)
-   [RabbitMQ](../../../engines/table-engines/integrations/rabbitmq)
-   [PostgreSQL](../../../engines/table-engines/integrations/postgresql)
-   [SQLite](../../../engines/table-engines/integrations/sqlite)
