---
title: "Lab 7: Managing Data"
description: ""
date: 2022-01-25
lastmod: 2022-01-25
draft: false
images: []

---

## 1. Data Compression

1. In this step, you will create a new table for the Spotify data that uses various techiques and codecs in an attempt to use less disk space. Let's start by looking at how much data the **songs** table is using right now:
    ```sql
    SELECT 
       name, 
       formatReadableSize(data_compressed_bytes), 
       formatReadableSize(data_uncompressed_bytes) 
    FROM system.columns 
    WHERE table = 'songs' 
    ```

2. Define a new table named **bootcamp.songs_compressed** that satisfies the following requirements: 
    - use the same column names that are in the existing **songs** table 
    - for **daily_rank**, use just the **DoubleDelta** codec because **daily_rank** has constantly increasing numeric values (from 1 to 20 for every day's worth and region's worth of data)
    - **song_title** and **URL** are a lot of random text, so try the **ZSTD** codec
    - considering there are 2M rows of data, **artist** has a relatively low cardinality, so use **LowCardinality(String)** for its data type
    -  **streams** changes a lot, so it's not obvious which codec would work best. Let's try **Delta LZ4** and see how it performs
    - for **date**, use **DoubleDelta** and **LZ4**
    - **region** only has a very low cardinality, so configure it to use **LowCardinality(FixedString(2))**
    - use the **MergeTree** table engine
    - sort by **(artist, song_title)**
    {{< detail-tag >}}
```sql
CREATE TABLE IF NOT EXISTS bootcamp.songs_compressed (
    daily_rank		UInt8 CODEC(DoubleDelta),
    song_title		String CODEC(ZSTD),
    artist		LowCardinality(String),
    streams		UInt64 CODEC(Delta LZ4),
    URL			String CODEC(ZSTD),
    date		Date CODEC(DoubleDelta, LZ4),
    region		LowCardinality(FixedString(2))
)
ENGINE = MergeTree()
ORDER BY (artist, song_title)
```
    {{< /detail-tag >}}

3. Copy all the rows from **songs** into **songs_compressed**:
    ```sql
    INSERT INTO bootcamp.songs_compressed SELECT * FROM bootcamp.songs
    ```

4. In a new Play UI window, run the following command to view the data used:
    ```sql
    SELECT 
       name, 
       formatReadableSize(data_compressed_bytes), 
       formatReadableSize(data_uncompressed_bytes) 
    FROM system.columns 
    WHERE table = 'songs_compressed' 
    ```

5. How did it work? 
    - Notice the **LowCardinality** worked well on **artist**, and a slight improvement for **region**
    - The **song_title** column saved almost 50% of space, and **URL** did even better
    - **streams** was only a modest improvement
    - The **date** column was actually worse compression,
    - and **daily_rank** went backwards! The compressed data is bigger than the uncompressed data.

6. Feel free to play around with the codecs and see if you can find one that works better for **date** (or maybe a codec is no help there), and see if there is a codec that improves the compression for **streams**.

## 2. 


## 3. 


    {{< detail-tag >}}
```sql

```
    {{< /detail-tag >}}