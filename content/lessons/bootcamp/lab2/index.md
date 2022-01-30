---
title: "Lab 2: Modeling Data"
description: ""
date: 2021-11-17T13:50:40-07:00
lastmod: 2021-11-17T13:50:40-07:00
draft: false
images: []

---

## 1. The system Database

1. Look at the tables in the **system** database:
    ```sql
    SHOW TABLES IN system
    ```

2. Based on the tables in **system**, write a query that displays all the databases defined in your ClickHouse instance:
    {{< detail-tag >}}
```sql
SELECT * FROM system.databases
```
    {{< /detail-tag >}}

3. Write a query that displays all of the tables defined in the **bootcamp** database.
    {{< detail-tag >}}
```sql
SELECT * FROM system.tables WHERE database = 'bootcamp'
```
    {{< /detail-tag >}}

4. Notice the settings of your ClickHouse instance are stored in the **system** database:
    ```sql
    SELECT * FROM system.settings
    ```

5. You can view all the functions defined on your instance:
    ```sql
    SELECT * FROM system.functions ORDER BY name ASC
    ```

6. And just for fun...
    ```sql
    SELECT * FROM system.zeros
    ```

## 2. Database Engines

1. Create a database named **just_testing** that only resides in memory and only lasts for 30 seconds after its last access.
    {{< detail-tag >}}
```sql
CREATE DATABASE just_testing ENGINE = Lazy(30)
```
    {{< /detail-tag >}}

2. Add the following table to your **just_testing**  database:
    ```sql
    CREATE TABLE just_testing.numbers
    ENGINE = Log
    AS 
        SELECT number AS column1, number + 100000 AS column2 
        FROM numbers(10000000)
    ```

{{% notice note %}}
Notice the **numbers** table uses the **Log** engine. A **Lazy** database can only have tables from the **Log** family of engines. 
{{% /notice %}}

3. Write a query that returns the sum all of the values of **column1** in the **numbers** table.
    {{< detail-tag >}}
```sql
SELECT sum(column1) FROM just_testing.numbers
```
    {{< /detail-tag >}}

4. Do not access the **just_testing** database (or its tables) for 30 seconds, then try running the **SELECT** command above again. It will probably work, but there is no guarantee! The **Lazy** database engine is handy for testing things out.


## 3. Table Engines

1. Define a new table named **sum_of_numbers** in your **bootcamp** database that satisfies the following requirements:
    - contains a **String** column named **id**
    - the **id** column is the primary key
    - contains two **UInt64** columns, one named **x** and one named **y**
    - rows with the same primary key are merged into a single row, and the values of **x** and **y** contain the cumulative sum of all rows with the same primary key

    To test your table, insert the following rows and verify that `x=17` and `y=20` for the **hello** rows, and `x=8` and `y=10` for the **world** rows:

    ```sql
    INSERT INTO bootcamp.sum_of_numbers VALUES
        ('hello', 1, 2),
        ('world', 3, 4),
        ('world', 5, 6),
        ('hello', 7, 8),
        ('hello', 9, 10)
    ```

    {{< detail-tag >}}
```sql
CREATE TABLE bootcamp.sum_of_numbers (
    id String,
    x UInt64,
    y UInt64
) 
ENGINE = SummingMergeTree
ORDER BY id
```
    {{< /detail-tag >}}

2. Repeat the previous step, but instead of summing the values of **x** and **y**, satisfy the following requirements:
    - the name of the table is **bootcamp.aggregate_of_numbers**
    - configure **x** to be the minimum of all **x** values
    - configure **y** to be the maximum of all **y** values

    Insert the same values into **aggregate_of_numbers** and verify **x=1** and **y=10** for the **hello** rows; and **x=3** and **y=6** for the **world** rows:
    ```sql
    INSERT INTO bootcamp.aggregate_of_numbers VALUES
      ('hello', 1, 2),
      ('world', 3, 4),
      ('world', 5, 6),
      ('hello', 7, 8),
      ('hello', 9, 10)
   ```

    {{< detail-tag >}}
```sql
CREATE TABLE bootcamp.aggregate_of_numbers (
    id String,
    x SimpleAggregateFunction(min, UInt64),
    y SimpleAggregateFunction(max, UInt64)
) 
ENGINE = AggregatingMergeTree
ORDER BY id
```
    {{< /detail-tag >}}

## 4. Modeling Data

1. Review the following rows of data, a subset of 1M rows that consists of the top 200 songs streamed on Spotify each day, in each of 14 regions, over the span of six months in 2017. For example, here are the top 10 US songs on July 29, 2017:

| daily_rank | song_title | artist | streams | URL | date | region |
| ------ |------ |------ |------ |------ |------ |------ |
| 1	| rockstar	| Post Malone	| 1842410	| https://open.spotify.com/ track/7wGoVu4Dady5GV0Sv4UIsx	| 2017-11-29	| us | 
| 2	| Gucci Gang	| Lil Pump	| 1227968	| https://open.spotify.com/ track/43ZyHQITOjhciSUUNPVRHc	| 2017-11-29	| us | 
| 3	| I Fall Apart	| Post Malone	| 1067283	| https://open.spotify.com/ track/75ZvA4QfFiZvzhj2xkaWAh	| 2017-11-29	| us | 
| 4	| Ric Flair Drip (& Metro Boomin)	| Offset	| 950894	| https://open.spotify.com/ track/7sO5G9EABYOXQKNPNiE9NR	| 2017-11-29 | 	us | 
| 5	| Candy Paint	| Post Malone	| 945343	| https://open.spotify.com/ track/42CeaId2XNlxugDvyqHfDf	| 2017-11-29	| us | 
| 6	| Havana	| Camila Cabello	| 916798	| https://open.spotify.com/ track/0ofbQMrRDsUaVKq2mGLEAb	| 2017-11-29	| us |
| 7	| Plain Jane	| A$AP Ferg	| 908199	| https://open.spotify.com/ track/4dVpf9jZjcORqGTLUaeYj9	| 2017-11-29	| us |
| 8	| No Limit | 	G-Eazy	| 904514	| https://open.spotify.com/ track/2Xqd0wUttjueBfdcltADOv	| 2017-11-29	 | us |
| 9	| Too Good At Goodbyes	| Sam Smith | 	855280	| https://open.spotify.com/ track/1mXVgsBdtIVeCLJnSnmtdV	| 2017-11-29	| us |
| 10	| Bank Account	| 21 Savage	| 851122	| https://open.spotify.com/ track/2fQrGHiQOvpL9UgPvtYy6G	| 2017-11-29	| us |

2. Create a table in the **bootcamp** database that satifies the following requirements:
    - the name of the table is **songs**
    - the table uses the **MergeTree** table engine
    - for convenience in later lab instructions, name your columns the same as the column header used in the table above. For example, **daily_rank**, **song_title**, **streams**, and so on
    - choose whatever data types you feel are appropriate for the Spotify data
    - choose a primary key that you think will work best, assuming that common questions will include "Which artist had the most played songs over a given time frame?" and "Which song had the most streams over a given time frame?"

    {{< detail-tag >}}
<br>
There is no exact correct answer, but this table will work fine:

```sql
CREATE TABLE IF NOT EXISTS bootcamp.songs (
    daily_rank		UInt8,
    song_title		String,
    artist		    String,
    streams		    UInt64,
    URL			    String,
    date		    Date,
    region		    FixedString(2)
)
ENGINE = MergeTree()
ORDER BY (artist, song_title)
```
    {{< /detail-tag >}}

3. <a href="https://learnclickhouse.s3.us-east-2.amazonaws.com/datasets/data.tsv">Download the TSV file</a> and save it in your **~labs/bootcamp** folder (the same folder with the **clickhouse** binary).

4. Run the following command to insert the 1 million rows into your **songs** table:
    ```bash
    ./clickhouse client --query="INSERT INTO bootcamp.songs FORMAT TSV" < data.tsv
    ```

5. Verify you have 1M rows:
    ```sql
    SELECT count(*) FROM bootcamp.songs
    ```

6. Let's see which songs had the most streams on a given day:
    ```sql
    SELECT * FROM bootcamp.songs ORDER BY streams DESC
    ```

7. There are a lot of questions that can be answered with this dataset. Try writing a query that uses the **sum** function to determine the top 20 songs that had the most overall streams summed over the entire date range. (In other words, ignore the **date** field and just compute the sum of the streams over all rows with the same **artist** and **song_title**.)
    {{< detail-tag >}}
<br>
Here is one solution that works:

```sql
SELECT 
   artist, 
   song_title, 
   sum(streams) AS sum_streams 
FROM bootcamp.songs 
GROUP BY (artist, song_title) 
ORDER BY sum_streams DESC 
LIMIT 20
```
    {{< /detail-tag >}}

8. Write a query that answers this question: which artist had the most streams, regardless of song title?
    {{< detail-tag >}}
<br>
It is Ed Sheeran. This query returns the top 10 artists based on the number of streams:

```sql
SELECT 
   artist, 
   sum(streams) AS sum_streams 
FROM bootcamp.songs 
GROUP BY (artist) 
ORDER BY sum_streams DESC 
LIMIT 10
```
    {{< /detail-tag >}}

9. Write a query that answers this question: how many total streams happened in each region during the month of February, 2017?
    {{< detail-tag >}}
```sql
SELECT 
   region,
   sum(streams) AS sum_streams 
FROM bootcamp.songs 
WHERE date >= '2017-02-01' AND date <= '2017-02-28'
GROUP BY (region) 
ORDER BY sum_streams DESC 
```
    {{< /detail-tag >}}

## 5. Materialized Views

1. Define a materialized view (MV) of the **songs** table that satisfies the following requirements:
    - the name of the MV is **streams_by_artist**
    - the MV is in the **bootcamp** database
    - contains the **artist** column which is also the primary key 
    - contains a column named **total_streams** that keeps a running total of the **streams** column for each artist in the **songs** table
    - the MV is populated using the existing data in **songs**

    {{< detail-tag >}}
```sql
CREATE MATERIALIZED VIEW bootcamp.streams_by_artist 
ENGINE = SummingMergeTree
ORDER BY artist
   POPULATE AS
   SELECT
      artist,
      streams
   FROM bootcamp.songs
```
    {{< /detail-tag >}}

2. Verify the view is working by selecting the row for Ed Sheeran. You should get 1,660,634,647.
    ```sql
    SELECT * FROM bootcamp.streams_by_artist WHERE artist = 'Ed Sheeran'
    ```

3. Add the following row to your **songs** table:
    ```sql
    INSERT INTO TABLE bootcamp.songs VALUES
    (62, 'Galway Girl', 'Ed Sheeran', 100, 'https://open.spotify.com/track/0afhq8XCExXpqazXczTSve', '2017-08-01', 'de')
    ```

4. View the totals for Ed Sheeran. How come you get back two rows?
    ```sql
    SELECT * FROM bootcamp.streams_by_artist WHERE artist = 'Ed Sheeran'
    ```
    {{< detail-tag >}}
A **SummingMergeTree** table only computes the sum during merges, and right now the Ed Sheeran data sits in two different parts.
    {{< /detail-tag >}}

5. Run the following query, which is a better design than the query above because it allows for multiple parts. Verify that the new total streams for Ed Sheeran is 100 more than you had before in the **streams_by_artist** table. 
    ```sql
    SELECT sum(streams) FROM bootcamp.streams_by_artist WHERE artist = 'Ed Sheeran' GROUP BY artist
    ```

{{% notice note %}}
Notice that your materialized view **streams_by_artist** updated automatically when you inserted the new row into the **songs** table.
{{% /notice %}}

6. Optimize the **streams_by_artist** table and run the following query. You should get one row this time:
    ```sql
    SELECT * FROM bootcamp.streams_by_artist WHERE artist = 'Ed Sheeran'
    ```
    {{< detail-tag >}}
```sql
OPTIMIZE TABLE bootcamp.streams_by_artist
```
    {{< /detail-tag >}}    

{{% notice note %}}
Using **OPTIMIZE** was just for educational purposes! If you know the data in your table could be in parts, then your queries should allow for that and using the **sum(streams)** with a **GROUP BY** is a much better option.
{{% /notice %}}    

## 6. A View of a View

1. You can chain together materialized views (define a view of a view). Suppose we want a simple computation - the total number of streams of Spotify. We could sum the column in the **songs** table easily enough, but let's take advantage of the view you created in the previous step. Create a new view in the **bootcamp** database that satisfies the following requirements:
    - the name of the view is **streams_overall**
    - the view has one column that represents the running total of all **streams**, computed from the **streams_by_artist** view

    {{< detail-tag >}}
```sql
CREATE MATERIALIZED VIEW bootcamp.streams_overall
ENGINE = AggregatingMergeTree
ORDER BY tuple()
   POPULATE AS
   SELECT
      sumState(streams) as total
   FROM bootcamp.streams_by_artist
```
    {{< /detail-tag >}}    

2. Write a query that returns the value of the **total** column in your new view.
    {{< detail-tag >}}
```sql
SELECT sumMerge(total) FROM bootcamp.streams_overall
```
    {{< /detail-tag >}}  
