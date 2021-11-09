---
title: "Sentiment Analysis using ClickHouse and Python"
description: "Use the Python NLTK libraries to perform sentiment analysis on records stored in ClickHouse."
lead: ""
date: 
lastmod: 
draft: false
images: []
toc: true
gated: false

duration: "30 minutes"
audience: "Anyone interested in learning how to incorporate Python with ClickHouse using the new Executable table engine"

---

**Overview:** In this lesson, we will use the Python Natural Language Toolkit (NLTK) platform to perform sentinment analysis on over 1.6 million records of Hacker News stories and comments. You will be streaming the data through a Python script using the **EexecutablePool** table engine.

Let's get started!

***

**Prerequisites:** You will run a Docker Compose file with an image containing ClickHouse 21.11, Python, and a sample dataset already inserted into a table that contains Hacker News comments and stories, so you will need **Docker** installed to be able to follow along.

*** 

## 1. Startup ClickHouse 21.11

The first step is to get ClickHouse up and running: 

{{< detail-tag "Show instructions" >}}

1. Start by creating a folder to work in. It doesn't matter what you call it, but for practical purposes we will call it **sentiment**:
    ```bash
    mkdir ~/sentiment
    cd sentiment
    ```

2. Create a new file in the **~/sentiment** folder named **docker-compose.yml** that contains the following:
    ```yml
    version: '3.7'

    services:
        clickhouse-nlp:
            image: learnclickhouse/public-repo:clickhouse-nlp-21.11
            container_name: clickhouse-nlp
            hostname: clickhouse-nlp
            ports:
                - "9000:9000"
                - "8123:8123"
                - "9009:9009"
            tty: true
            ulimits:
                nofile:
                    soft: 262144
                    hard: 262144
            cap_add:
            - IPC_LOCK
    ```

3. Start up the **docker-compose.yml** file;
    ```bash
    docker-compose up
    ```

4. Point your web browser to <a href="http://localhost:8123/play" target="_blank">http://localhost:8123/play</a>. You should see the embedded ClickHouse Play UI:

    <img src="./images/clickhouseui.png" width="600px" alt="" />

5. Let's run a few queries to understand what the dataset looks like. Copy-and-paste the following query into the Play UI, then click the **Run** button (or press **Ctrl/Cmd+Enter**). You will see the column names and data types of the **hackernews** table:
    ```sql
    DESCRIBE hackernews
    ```

6. Make sure you have 1,679,361 rows:
    ```sql
    SELECT count(*) FROM hackernews
    ```

8. View some of the data in the table:
    ```sql
    SELECT * FROM hackernews LIMIT 100
    ```

{{% notice note %}}
The **text** column contains the comments, stories, polls and other posts from the Hacker News website. That is the column we will be doing sentiment analysis on.
{{% /notice %}}



{{< /detail-tag >}}

*** 

## 2. The ExecutablePool Engine

ClickHouse 21.10 introduced two new table engines: **Executable** and **ExecutablePool**. They allow you to create a new table whose rows are output from a script that you define (by writing rows to **stdout**). The input can be either streamed from the result of a query from another table (which the script reads through **stdin**), or the script can input data from anywhere! 

Let's try it out...

{{< detail-tag "Show instructions" >}}


1. Let's start with a Python script that reads data from **stdin**, performs sentiment analysis on each record, then outputs the results to **stdout**. Create a new file named **sentiment.py** and save it in your **~/sentiment** folder. Copy-and-paste the following into **sentiment.py**:



{{< /detail-tag >}}

*** 

## 3.  Performing the Sentiment Analysis

.

{{< detail-tag "Show instructions" >}}

1. 

{{< /detail-tag >}}

*** 

## 4.  Frequency Distribution using NLTK

.

{{< detail-tag "Show instructions" >}}

1. 

{{< /detail-tag >}}
 


*** 

**What's next:** If you are new to ClickHouse, be sure to check out the <a href="../gettingstarted/">Getting Started</a> lesson. You can view all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page


