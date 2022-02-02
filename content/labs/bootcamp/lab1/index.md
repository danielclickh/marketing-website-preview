---
title: "Lab 1: An Introduction to ClickHouse"
description: ""
date: 2021-11-17T13:50:40-07:00
lastmod: 2021-11-17T13:50:40-07:00
draft: false
images: []
menu:
  docs:
    parent: "labs"
---

## 1. Start ClickHouse

1. There are several ways to install ClickHouse, including DEB and RPM packages. We also provide several pre-built binaries that you can simply download and run. In this lab, you download a pre-built binary of ClickHouse. Start by opening a terminal and creating a new folder for ClickHouse to run in:
    ```bash
    mkdir bootcamp
    cd bootcamp
    ```

2. Find your OS in the following table, then copy-and-paste the corresponding command to download a pre-built ClickHouse binary and make it executable:

    MacOS x86_64:
    ```bash
    curl -O 'https://builds.clickhouse.com/master/macos/clickhouse' && chmod a+x ./clickhouse
    ```

    MacOS Aarch64:
    ```bash
    curl -O 'https://builds.clickhouse.com/master/macos-aarch64/clickhouse' && chmod a+x ./clickhouse
    ```
    
    FreeBSD x86_64:
    ```bash
    curl -O 'https://builds.clickhouse.com/master/freebsd/clickhouse' && chmod a+x ./clickhouse
    ```

    Linux x86_64:
     ```bash
     curl -O 'https://builds.clickhouse.com/master/amd64/clickhouse' && chmod a+x ./clickhouse
     ```

    Linux AArch64:
    ```bash
    curl -O 'https://builds.clickhouse.com/master/aarch64/clickhouse' && chmod a+x ./clickhouse
    ```

    Docker:
    ```bash
    docker run -d --name my-clickhouse-server --ulimit nofile=262144:262144 clickhouse/clickhouse-server
    ```


3. Run the following command to start the ClickHouse server:
    ```bash
    ./clickhouse server
    ```

4. It will only take a few seconds for ClickHouse to start - look for the following message in the console output:
{{% notice info %}}
`<Information> Application: Ready for connections.`
{{% /notice %}}


5. The first time you run the ClickHouse server, it creates a collection of folders and files. Open a new terminal window, change directories to your **bootcamp** folder, and view its contents:
    ```bash
    cd bootcamp
    ls -la
    ```

    Your folder list should look similar to the following:
    ```bash
    drwxr-xr-x  17        544 <date> 19:43 .
    drwxr-xr-x   3         96 <date> 13:44 ..
    -rwxr-xr-x   1  292491143 <date> 13:45 clickhouse
    drwxr-x---   4        128 <date> 19:43 data
    drwxr-x---   2         64 <date> 19:43 dictionaries_lib
    drwxr-x---   2         64 <date> 19:43 flags
    drwxr-x---   2         64 <date> 19:43 format_schemas
    drwxr-x---   8        256 <date> 19:43 metadata
    drwxr-x---   2         64 <date> 19:43 metadata_dropped
    drwxr-x---   3         96 <date> 19:43 preprocessed_configs
    -rw-r-----   1         58 <date> 19:43 status
    drwxr-x---   4        128 <date> 19:43 store
    drwxr-x---   2         64 <date> 19:43 tmp
    drwxr-x---   2         64 <date> 19:43 user_defined
    drwxr-x---   2         64 <date> 19:43 user_files
    drwxr-x---   2         64 <date> 19:43 user_scripts
    -rw-r-----   1         36 <date> 19:43 uuid
    ```

6. Change directories into the **store** folder:
    ```bash
    cd store
    ls -la
    ```

    You will see a couple of subfolders of **store**, but they are empty. You will create a table in the next step and see how the **store** folder changes as you populate the table.

{{% notice note %}}
The **store** folder is where ClickHouse stores the data in your tables. Each table has its own folder, which is which is where the parts subfolders are stored.
{{% /notice %}}


## 2. Define a MergeTree Table

0. In this step, you will create a database and table. ClickHouse has a UI (called **Play**) that allows you to easily submit queries. Open the UI at <a href="http://localhost:8123/play" target="_blank">http://localhost:8123/play</a>

1. Create a new database named **bootcamp**.

    {{< detail-tag >}}
```sql
CREATE DATABASE bootcamp
```
    {{< /detail-tag >}}

2. Create the following table, which consists of two integer columns and 10 million rows:
    ```sql
    CREATE TABLE bootcamp.my_table 
    ENGINE = MergeTree 
    ORDER BY (column1, column2) 
    AS 
       SELECT number AS column1, number + 100000 AS column2 
       FROM numbers(10000000)
    ```

3. View the contents of the table:
    ```sql
    SELECT * FROM bootcamp.my_table 
    ORDER BY column1 ASC
    ```

    You should see 1 million rows read, 5,000 rows returned, and notice **column2** is 100,000 more than **column1** in each row.

## 3. View the Part Folders

1. Find the folder on your local filesystem where the **my_table** data is stored. It will be somewhere similar to the following:
    ```bash
    cd ~/bootcamp/data/bootcamp/my_table
    ```

2. List the contents of the folder:
    ```bash
    ls -la
    ```

    You should see 10 folders. Each folder is a **_part_**:
    ```bash
    all_10_10_0
    all_1_1_0
    all_1_6_1
    all_2_2_0
    all_3_3_0
    all_4_4_0
    all_5_5_0
    all_6_6_0
    all_7_7_0
    all_8_8_0
    all_9_9_0
    ```

3. Look inside one of the part folders:
    ```bash
    ls -la all_1_1_0
    ```

    Which file contains the granule offsets? What is in the **column1.bin** and **column2.bin** files? What are the **.mrk2** files used for?

## 4. Force a Merge

1. Right now, your table is stored in 10 parts (most likely). Run the following command, which forces a merge to occur:
    ```sql
    OPTIMIZE TABLE bootcamp.my_table
    ```

2. View the contents of the `data/bootcamp/my_table` folder. You should see a new directory that ends in a **1** instead of a **0**. The **1** represents a merge counter, and that is the folder where your merged data resides now.

3. View the number of rows in the new part by viewing the value stored in the **count.txt** file. If you see 10,000,000 as the count, then all of your table is now in a single part. If not, you can run the **OPTIMIZE** command again - which creates a folder that ends in **2**. 

{{% notice note %}}
We used **OPTIMIZE** here in the lab so you can see what happens to the part folders after a merge. In general, you let ClickHouse schedule merges - but there are some rare use cases for calling **OPTIMIZE** and forcing an unscheduled merge.
{{% /notice %}}

## 5. Partition a Table

1. We did not discuss partitions in detail yet, but for now realize that partitions crete a folder structure with the partition value used in the name of the folder. Let's see how it works. Define the following table:
    ```sql
    CREATE TABLE bootcamp.my_partitioned_table 
    ENGINE = MergeTree 
    ORDER BY (column1, column2) 
    PARTITION BY modulo(column1, 4)
        AS 
        SELECT number AS column1, number + 100000 AS column2 
        FROM numbers(10000000)
   ```

2. The partition value is going to be 0, 1, 2 or 3. View the contents of the **my_partitioned_table** folder:
    ```bash
    ls -la ~/bootcamp/data/bootcamp/my_partitioned_table
    ```

    You will see lots of folders that look similar to the following:
    ```bash
    0_1_1_0
    0_1_24_1
    1_2_21_1
    1_2_2_0
    1_31_31_0
    1_34_34_0
    1_37_37_0
    2_16_16_0
    2_19_19_0
    2_3_3_0
    3_10_10_0
    3_13_13_0
    3_20_20_0
    ```

{{% notice note %}}
Partitions are mostly for data management. For example, you can easily move or delete data in a partition; and it is also useful when performing updates or deletes on data in a partition. Do not make your partition keys too granular.

Partitions may or may not speed up your queries. If you are trying to improve query performance, then focus on choosoing a good primary key.
{{% /notice %}}
