---
title: "Using AWS S3 with ClickHouse"
description: "You can insert data from S3 files into a ClickHouse table, and write data from a ClickHouse table to a file in S3."
lead: ""
date: 
lastmod: 
draft: false
images: []
toc: true

duration: "20 minutes"
audience: "New users to ClickHouse you want to connect AWS S3 to ClickHouse"

---

**Overview:** In this lesson, you will learn how to use the S3 table engine and S3 function in ClickHouse to read and write data between S3 and ClickHouse. 

Let's get started!

***

### Prerequisites

- You will need ClickHouse installed and running if you want to follow along (see step 1 of our <a href="https://clickhouse.com/learn/lessons/gettingstarted" target="_blank">Getting Started lesson</a>), as well as an AWS account if you want to write to a file in S3.


{{% gated %}}

*** 

## 1. Start ClickHouse 

Let's start up ClickHouse first.  

{{< detail-tag "Show instructions" >}}

1. Let's start by creating a local folder to work in (feel free to name the folder anything you like):
    ```bash
    mkdir ~/clickhouse-s3
    cd ~/clickhouse-s3
    ```

2. 

{{< /detail-tag >}}

*** 

## 2.  Insert a file from S3 into a ClickHouse table

Now that you have ClickHouse running, let's create a new table whose data is in CSV files stored in an S3 bucket.

{{< detail-tag "Show instructions" >}}

1. 

{{< /detail-tag >}}

*** 

## 3.  Write to a file in S3

You can export the results of a query to a file in an S3 bucket.

{{< detail-tag "Show instructions" >}}

1. 

{{< /detail-tag >}}

*** 

## 4.  The S3 table function

The S3 table function is similar to the S3 table engine - let's look at the differences.

{{< detail-tag "Show instructions" >}}

1. 

{{< /detail-tag >}}

{{% /gated %}}

***

**What's next:** Check out the following lessons to continue your journey: 

- The <a href="https://clickhouse.com/learn/lessons/logsvector">Ingest Nginx Logs into ClickHouse using Vector</a> lesson demonstrates how to stream a log file into ClickHouse
- Check out <a href="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10">What's New in ClickHouse 21.10</a>
- View all of our lessons on the <a href="../../index.html">Learn ClickHouse</a> home page

