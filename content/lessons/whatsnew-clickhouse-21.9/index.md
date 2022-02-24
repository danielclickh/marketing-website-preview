---
title: "What's New in ClickHouse 21.9"
description: "Check out the new SQL operators, including INTERSECT and EXCEPT."
lead: ""
date: 
lastmod: 
draft: false
images: []
toc: true
gated: false

duration: "10-15 minutes"
audience: "If you want to see how to use the new SQL operators in 21.9, this lesson is for you"

---

**Overview:** The latest release of ClickHouse 21.9 includes support for the subquery operators **INTERSECT**, **EXCEPT**, **ANY** and **ALL**. The operators are a great addition  - you just need to understand a few details about how they work. We will look at some Spotify data that contains the number of times a song was streamed per day.

Let's get started!

***

**Prerequisites:** You will be running a Docker image that includes ClickHouse 21.9 and a sample dataset already indexed that contains streaming details from Spotify, so you will need **Docker** installed if you want to follow along.

*** 


## 1. Startup ClickHouse 21.9

We have built a Docker image that already has ClickHouse installed, along with a table that contains the Spotify data: 

{{< detail-tag "Show instructions" "1" >}}

1. Assuming you have Docker installed, run the appropriate following command for your environment to startup the Docker container:

- On **Linux**, you will need to use the `--network host` option:
    ```bash
    docker run -it  --name clickhouse-spotify --network host -p 9000:9000 -p 9009:9009 -p 8123:8123 --platform linux/amd64 --ulimit nofile=262144:262144 learnclickhouse/public-repo:clickhouse-spotify-21.10
    ```

    On all other environments, use this command:
    ```bash
    docker run -it  --name clickhouse-spotify -p 9000:9000 -p 9009:9009 -p 8123:8123 --platform linux/amd64 --ulimit nofile=262144:262144 learnclickhouse/public-repo:clickhouse-spotify-21.10
    ```

2. Wait about 30 seconds for the **clickhouse-spotify** container to startup and also for the data to get inserted into the **spotify** database.
{{< /detail-tag >}}

*** 

## 2.  Open the ClickHouse SQL Interface

Let's verify you have ClickHouse up and running and the data was inserted successfully.

{{< detail-tag "Show instructions" "2" >}}

1. Point your web browser to <a href="http://localhost:8123/play" target="_blank">http://localhost:8123/play</a>. You should see the embedded ClickHouse Play UI:

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.9/images/clickhouseui.png" width="100%" alt="" />


2. Let's run a few queries to understand what the dataset looks like. Copy-and-paste the following query into the UI, then click the **Run** button (or press **Ctrl/Cmd+Enter**):
    ```sql
    SHOW TABLES IN spotify
    ```

    You should see a table named **songs**.

3. The following command shows the schema of **songs**:
    ```sql
    DESCRIBE spotify.songs
    ```

4. View some of the data in the tables. This query displays 100 days' worth of streaming data:
    ```sql
    SELECT * FROM spotify.songs LIMIT 100
    ```

5. To see the most popular songs, sort by the **Streams** column:
    ```sql
    SELECT * FROM spotify.songs 
    ORDER BY Streams DESC
    ```

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.9/images/topstreams.png" width="100%" alt="" />

Aside from one good day for Taylor Swift , it looks like Kendrick Lamar, Post Malone and Drake have plenty of days where one of their songs was the most-listened to on that day (at least for 2017).

{{< /detail-tag >}}

*** 

## 3.  The INTERSECT Operator

**INTERSECT** does exactly what it sounds like it does: it takes two sets of data and returns their intersection. In other words, it compares to sets of rows and returns only the rows where all the columns are equal in both sets. 

Let's take a look at how it works.

{{< detail-tag "Show instructions" "3" >}}

1. Suppose we want to view artists who had songs with really good days of streaming vs. not-as-good days. In other words, a song that had some great days but also some slow days. The logic could possibly feel like the following SQL, but as you can see this particular query could not possibly have any hits: 
    ```sql
    SELECT * FROM spotify.songs 
    WHERE Streams <= 2000 AND Streams >=1000000
    ```

2. Let's see how many times a song had more than 1,000,000 streams in a day:
    ```sql
    SELECT count(*) FROM spotify.songs 
    WHERE Streams >= 1000000
    ```

    Notice you get 4,440 hits.

3. Now let's see how many times a song had less than 2,000 streams in a day:
    ```sql
    SELECT count(*) FROM spotify.songs 
    WHERE Streams <= 2000
    ```

    This happens much more frequently, with 134,666 hits.

4. To use INTERSECT, you run two queries and the responses they have in common are returned. For equality, the responses of both queries must have the same number and data types of columns. Run the following query, noticing that the two queries select the same columns:
    ```sql
    SELECT TrackName,Artist FROM spotify.songs 
    WHERE Streams <= 2000 
    INTERSECT
    SELECT TrackName,Artist FROM spotify.songs 
    WHERE Streams >= 1000000 
    ```

    You get 19,014 hits, which might seem contradictory because we know the second query only has 4,440 hits. But notice we selected **TrackName** and **Artist** multiple times in both queries, so for example if *Starboy* by **The Weeknd** appeared 20 times in one search and 100 times in the other, you would get 100 rows in the result.

5. The result would be more interesting if we added **DISTINCT** to both queries. This would tell us how many songs had at least one day with more than 1,000,000 streams **and** at least one day with less than 2,000 streams:
    ```sql
    SELECT DISTINCT TrackName,Artist FROM spotify.songs 
    WHERE Streams <= 2000 
    INTERSECT
    SELECT DISTINCT TrackName,Artist FROM spotify.songs 
    WHERE Streams >= 1000000
    ```

    This particular query returns 99 rows.

6. If you want to sort the results, simply sort the first query. For example, the results in this query will be sorted by **TrackName**:
    ```sql
    SELECT DISTINCT TrackName,Artist FROM spotify.songs 
    WHERE Streams <= 2000 ORDER BY TrackName
    INTERSECT
    SELECT DISTINCT TrackName,Artist FROM spotify.songs 
    WHERE Streams >= 1000000
    ```

    If you think about it, the Christmas songs on the list actually make sense - they probably don't get a lot of streams in April!

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.9/images/intersect.png" width="100%" alt="" />

7. Notice that the columns selected in the two queries must have the same data types. The column names do not have to match, as long as the data types lineup (the order of columns in the SELECT clause matters). Try the following query:
    ```sql
    SELECT DISTINCT TrackName,Artist,Date FROM spotify.songs 
    WHERE Streams <= 2000
    INTERSECT
    SELECT DISTINCT TrackName,Artist,URL FROM spotify.songs 
    WHERE Streams >= 1000000
    ```

    You get the following error:
    ```
    Code: 386. DB::Exception: There is no supertype for types Date, String because some of them are String/FixedString and some of them are not. (NO_COMMON_TYPE) (version 21.10.1.8013 (official build))
    ```

    The third column in the first query is a **Date** and the third column in the second query is a **String**, so the query fails.

{{< /detail-tag >}}

*** 

## 4.  The EXCEPT Operator

The **EXCEPT** operator returns the rows that match the first query but throws out the rows that match the second query. Let's see how it works... 

{{< detail-tag "Show instructions" "4" >}}

1. We have already seen in the INTERSECT example above that 99 songs have had good days and bad days. The following query returns songs that have topped 1,000,000 streams in a  day at least once, but have never had a day with less than 2,000 streams:
    ```sql
    SELECT DISTINCT TrackName,Artist FROM spotify.songs 
    WHERE Streams >=1000000
    EXCEPT
    SELECT DISTINCT TrackName,Artist FROM spotify.songs 
    WHERE Streams <= 2000
    ```

    Notice you only get 15 hits.
    
{{< /detail-tag >}}


*** 

## 5.  The ANY Operator

The **ANY** operator compares a given value in one query with a set of values in a subquery. If the given value matches *any* of the hits in the subquery, then that row in the first query is returned. Like most situations, it is best understood by an example:

{{< detail-tag "Show instructions" "5" >}}

1. Review the following query. Can you figure out which artist will get returned?
    ```sql
    SELECT DISTINCT Artist FROM spotify.songs 
    WHERE Streams = ANY (
        SELECT max(Streams) FROM spotify.songs GROUP BY Date
    ) 
    ```

2. Run the query above. You should get 13 artists:

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.9/images/anyoperator.png" width="100%" alt="" />


3. What do the hits mean? Let's break it down...the subquery returns a set of numbers that represent the maximum number of streams in a day. The outer query looks for the **Artist** who had the maximum number of streams that day. Therefore, you are seeing the artist who, at some point in time, had a day in which one of their songs was the most-streamed song on Spotify.
    
{{< /detail-tag >}}

*** 

## 6.  The ALL Operator

The **ALL** operator has the same syntax as ANY, except the Boolean logic is different: for the ALL operator, the given value must match *all* of the values in the set of values returned by the subquery.

{{< detail-tag "Show instructions" "6" >}}

1. Run the following query, which returns the average number of daily streams for each of the 16 regions:
    ```sql
    SELECT Region, avg(Streams) FROM spotify.songs GROUP BY Region
    ```

2. See if you can write a query that returns the artists who have had at least one song with more streams on a day than the average of all the 16 regions.

{{< detail-tag "Show answer" >}}

The following query is one solution:

```sql
SELECT DISTINCT Artist FROM spotify.songs 
WHERE Streams > ALL (
    SELECT avg(Streams) FROM spotify.songs GROUP BY Region
)
```

This event has occurred for 210 artists.

{{< /detail-tag >}}

{{< /detail-tag >}}

***

**What's next:** Check out the following lessons to continue your journey: 

- <a href="https://clickhouse.com/learn/lessonscovidtutorial-grafana/">Learn how to visualize your data using Grafana</a>
- Check out <a href="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10/">What's New in ClickHouse 21.10</a>
- View all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page


