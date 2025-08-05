---
title: 'Setting up Apache Iceberg locally using PySpark'
slug: 'apache-iceberg-local-pyspark'
excerpt: "In this guide, we'll learn how to set up Apache Iceberg locally using PySpark."
index: 26
---

In this guide, we'll learn how to set up [Apache Iceberg](https://clickhouse.com/engineering-resources/apache-iceberg) locally using PySpark.
We'll learn how to create a table, populate it with data from a Parquet file, and query the resulting table.
We'll then switch gears and see how to populate and query an Apache Iceberg table using ClickHouse.

## Prerequisites

PySpark has a dependency on Java, so we need to install that first.
We'd recommended using [sdkman](https://sdkman.io/), which you can download like this:

```bash
curl -s "https://get.sdkman.io" | bash
```

You can install Java like this:

```bash
sdk install java 17.0.0-tem
```

We'll also be using the [`uv`](https://docs.astral.sh/uv/) package manager, so make sure you have that installed as well.

## Launching PySpark

We're going to launch PySpark using the `uv` tool.

<pre><code type='click-ui' language='bash'>
uv run --with pyspark==3.5.2 pyspark \
--packages org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.7.0 \
--conf spark.sql.extensions=org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions \
--conf spark.sql.catalog.sandbox=org.apache.iceberg.spark.SparkCatalog \
--conf spark.sql.catalog.sandbox.type=hadoop \
--conf spark.sql.catalog.sandbox.warehouse=/tmp/warehouse
</code></pre>

If this works successfully, you should see the following output:

```text
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /__ / .__/\_,_/_/ /_/\_\   version 3.5.2
      /_/

Using Python version 3.12.0 (main, Oct  2 2023 20:56:14)
Spark context Web UI available at http://mac.lan:4040
Spark context available as 'sc' (master = local[*], app id = local-1754397799642).
SparkSession available as 'spark'.
```

## New York Taxis dataset

Next, we're going to download some data from the New York Taxis dataset:

<pre><code type='click-ui' language='bash'>
curl "https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2023-02.parquet" -o yellow_tripdata_2023-02.parquet
curl "https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2023-01.parquet" -o yellow_tripdata_2023-01.parquet
</code></pre>

## Create and populate Apache Iceberg table with PySpark

Let's now go back to our Spark shell and run the following command to create a namespace:

<pre><code type='click-ui' language='python'>
spark.sql("CREATE NAMESPACE IF NOT EXISTS sandbox.quickstart")
</code></pre>

```text
DataFrame[]
```

We can then create an Iceberg table based on the data from the first file that we downloaded:

<pre><code type='click-ui' language='python'>
spark.sql("""
CREATE TABLE sandbox.quickstart.taxi_dataset
USING ICEBERG
AS SELECT * FROM parquet.`yellow_tripdata_2023-01.parquet`
""")
</code></pre>

```text
DataFrame[]
```

## Querying Apache Iceberg with PySpark

We can query this table to make sure it's been created successfully:

<pre><code type='click-ui' language='python'>
spark.table("sandbox.quickstart.taxi_dataset").describe()
</code></pre>


```text
DataFrame[summary: string, VendorID: string, passenger_count: string, trip_distance: string, RatecodeID: string, store_and_fwd_flag: string, PULocationID: string, DOLocationID: string, payment_type: string, fare_amount: string, extra: string, mta_tax: string, tip_amount: string, tolls_amount: string, improvement_surcharge: string, total_amount: string, congestion_surcharge: string, airport_fee: string]
```

How many records will we be working with?


<pre><code type='click-ui' language='python'>
spark.table("sandbox.quickstart.taxi_dataset").count()
</code></pre>


```text
3066766
```

Just over 3 million, not bad.

Let's do one more query to count the number of rides by passenger count:

<pre><code type='click-ui' language='python'>
spark.sql("""
SELECT passenger_count, count(*)
FROM sandbox.quickstart.taxi_dataset
GROUP BY ALL
ORDER BY passenger_count
""").show()
</code></pre>

```text
+---------------+--------+
|passenger_count|count(1)|
+---------------+--------+
|           NULL|   71743|
|            0.0|   51164|
|            1.0| 2261400|
|            2.0|  451536|
|            3.0|  106353|
|            4.0|   53745|
|            5.0|   42681|
|            6.0|   28124|
|            7.0|       6|
|            8.0|      13|
|            9.0|       1|
+---------------+--------+
```

## Working with Apache Iceberg tables from ClickHouse 

Now let's have a look at how to work with Apache Iceberg tables from ClickHouse.
We're going to use [clickhouse-local](https://clickhouse.com/docs/en/operations/utilities/clickhouse-local), which you can launch like this:

<pre><code type='click-ui' language='bash'>
curl https://clickhouse.com  | sh
./clickhouse -mn
</code></pre>

ClickHouse has [supported Iceberg tables](https://clickhouse.com/docs/en/engines/table-engines/integrations/iceberg) since version 23.2. 
We can create a table in ClickHouse that points to an Iceberg table by running the following:

<pre><code type='click-ui' language='sql'>
CREATE TABLE taxi_dataset
ENGINE = IcebergLocal('/tmp/warehouse/quickstart/taxi_dataset/');
</code></pre>

We can then treat this table as if it was any other table, but the queries will be executed against the Iceberg data.

## Writing to Apache Iceberg tables with ClickHouse 

Starting from ClickHouse 24.7, it's now possible to write data to Iceberg tables.
It's an experimental feature as of August 2025, so we need to enable it by running the following:

<pre><code type='click-ui' language='sql'>
SET allow_experimental_insert_into_iceberg = 1;
</code></pre>

We can import the second Parquet file that we downloaded by running the following:

<pre><code type='click-ui' language='sql'>
INSERT INTO taxi_dataset
SELECT * 
FROM file('yellow_tripdata_2023-02.parquet');
</code></pre>

```text
0 rows in set. Elapsed: 0.481 sec. Processed 2.91 million rows, 47.74 MB (6.06 million rows/s., 99.22 MB/s.)
Peak memory usage: 437.60 MiB.
```

## Querying Apache Iceberg with ClickHouse 

We can then query that table like this:

<pre><code type='click-ui' language='sql'>
select count()
FROM taxi_dataset
WHERE tip_amount > 5;
</code></pre>

```text
   ┌─count()─┐
1. │ 1013386 │ -- 1.01 million
   └─────────┘
```

We can also see the history of the table by running the following:

<pre><code type='click-ui' language='sql'>
SELECT * 
FROM system.iceberg_history
FORMAT Vertical;
</code></pre>

```text

Row 1:
──────
database:            default
table:               taxi_dataset
made_current_at:     2025-08-05 13:52:04.270
snapshot_id:         6166062234151479044
parent_id:           0
is_current_ancestor: 1

Row 2:
──────
database:            default
table:               taxi_dataset
made_current_at:     2025-08-05 14:00:42.534
snapshot_id:         1467823196 -- 1.47 billion
parent_id:           6166062234151479044
is_current_ancestor: 1
```

There are two snapshots of the table - the one we created from PySpark and the new one created after ingesting data from ClickHouse.

We can write a time travel query to count the number of tips of more than $5 by providing the `snapshot_id` from the first snapshot:

<pre><code type='click-ui' language='sql'>
select count()
FROM taxi_dataset
WHERE tip_amount > 5
SETTINGS iceberg_snapshot_id = 6166062234151479044;
</code></pre>

```text
   ┌─count()─┐
1. │  517597 │
   └─────────┘
```

We have half as many results when running against the first snapshot.