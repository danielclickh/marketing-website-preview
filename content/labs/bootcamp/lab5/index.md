---
title: "Lab 5: Querying Data"
description: ""
date: 2022-01-19
lastmod: 2022-01-19
draft: false
images: []
menu:
  docs:
    parent: "labs"
    
---

## 1. Simple Functions

1. How would you like to contribute something substantial to this training course? Sure - I can ask you to write a bunch of queries, answer some questions, hold your hands and provide you copy-and-paste answers...but if you are serious about learning ClickHouse, the best way to do it is to figure things out on your own. So here is my request:
    - using ***one or more of the simple functions*** in ClickHouse (find them in the docs), give me a clever, interesting, or useful SQL query that can be executed on the Spotify dataset.
    - Just simple functions for this step - no aggregates yet
    - If you have more than one idea - that's even better!
    - Slack it to me (rich@clickhouse.com) and I will choose a bunch of them to add to this lab for future students.

## 2. Aggregate Functions

1. You knew this was coming. Repeat step 1, but this time use any combination of regular and aggregate functions. I'm no SQL expert, so if you have some experience with frequently-asked questions or common solutions that work well with the Spotify dataset, I would love to see it.
    - Otherwise, send me an easy one! Labs need easy tasks too


## 3. Projections

0. Run the following query and make a note of how long it takes and how many rows were processed:
    ```sql
    SELECT URL, count() AS total FROM bootcamp.spotify GROUP BY URL ORDER BY total DESC
    ```

1. Add a projection to the **bootcamp.spotify** table named **url_projection** for the following query:
    ```sql
    SELECT * ORDER BY URL
    ```

    {{< detail-tag >}}
```sql
ALTER TABLE bootcamp.spotify ADD PROJECTION url_projection (SELECT * ORDER BY URL)
```
    {{< /detail-tag >}}

2. Optimize the table so that your view is processed:
    ```sql
    OPTIMIZE TABLE bootcamp.spotify FINAL
    ```

3. Run the query from step 1 above again and compare the response times. Was there any improvement? 

4. Use **EXPLAIN** to see if your projection was used.

## 4. User Defined Functions

1. If you are curious in how UDFs work, try deploying and invoking the **get_ip** UDF that appeared in the slides. The XML is here. In order for it to work, you will the **host** app installed on your local system.
    ```xml
    <functions>
        <function>
            <type>executable</type>
            <name>get_ip</name>
            <argument>
                <type>String</type>
            </argument>
            <return_type>String</return_type>
            <format>TabSeparated</format>
            <command>
            read line; host $line | awk '/has address/ { print $4;exit }'
            </command>
            <lifetime>0</lifetime>
        </function>
    </functions>
    ```