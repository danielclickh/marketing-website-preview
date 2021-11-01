---
title: "Getting Started with ClickHouse"
description: "By going through this tutorial, you will learn how to start up ClickHouse, create a new table, and insert some data."
date: 2021-10-01
lastmod: 2021-10-01
draft: false
images: []
toc: true
duration: "10 minutes"
audience: "Anyone brand new to ClickHouse"
gated: false

---

**Overview:** In this lesson, you will get ClickHouse up and running on your local machine, create a new database and table, and insert some data into that table. 

Let's get started!

***

**Prerequisites:** 

- You will need a Linux or Mac OS X machine
- Optionally, you can use Docker
- Windows users will need to either:
  - run ClickHouse within the WSL (Windows Subsystem for Linux)
  - install <a href="https://docs.docker.com/desktop/windows/install/" target="_blank">Docker on Windows</a>
  - run Linux in a virtual machine using something like <a href="https://www.virtualbox.org/" target="_blank">VirtualBox</a>
  - create a Linux instance using your favorite cloud provider

*** 

## 1. Installing ClickHouse

There are several ways to install ClickHouse, including DEB and RPM packages. We also provide several pre-built binaries that you can simply download and run. Click on **Show instructions** to get started...

{{< detail-tag "Show instructions" "1" >}}

1. In this lesson, you download a pre-built binary of ClickHouse. Start by opening a terminal and creating a new folder for ClickHouse to run in:
    ```bash
    mkdir clickhouse
    cd clickhouse
    ```

2. Find your OS in the following table, then copy-and-paste the corresponding command to download a pre-built ClickHouse binary and make it executable:

    | Operating System      | Run this command: |
    | ----------- | ----------- |
    | MacOS x86_64      |  `curl -O 'https://builds.clickhouse.com/master/macos/clickhouse' && chmod a+x ./clickhouse`       |
    | MacOS Aarch64   | `curl -O 'https://builds.clickhouse.com/master/macos-aarch64/clickhouse' && chmod a+x ./clickhouse`        |
    | FreeBSD x86_64  | `curl -O 'https://builds.clickhouse.com/master/freebsd/clickhouse' && chmod a+x ./clickhouse`  |
    | Linux x86_64  | `curl -O 'https://builds.clickhouse.com/master/amd64/clickhouse' && chmod a+x ./clickhouse`  |
    | Linux AArch64  | `curl -O 'https://builds.clickhouse.com/master/aarch64/clickhouse' && chmod a+x ./clickhouse`  |
    | Docker | `docker run -d --name my-clickhouse-server --ulimit nofile=262144:262144 clickhouse/clickhouse-server` |


{{% notice note %}}
You will start ClickHouse in the next step, unless you used the Docker command - in which case the ClickHouse server is already running inside the container.
{{% /notice %}}

{{< /detail-tag >}}


*** 

## 2. Starting the ClickHouse Server

The **clickhouse** binary is used to run both the server and the client. Let's start up the server...

{{< detail-tag "Show instructions" "2" >}}


1. Run the following command to start the ClickHouse server:
    ```bash
    ./clickhouse server
    ```

2. It will only take a few seconds for ClickHouse to start - look for the following message in the console output:
{{% notice note %}}
`<Information> Application: Ready for connections.`
{{% /notice %}}


3. The first time you run the ClickHouse server, it creates a collection of folders and files. Open a new terminal window, change directories to your `clickhouse` folder, and view its contents:
    ```bash
    cd clickhouse
    ls -la
    ```

    Your folder list should look similar to the following:
    ```bash
    drwxr-x---  2 user user         64 <date> backups
    -rwxr-xr-x  1 user user  263775639 <date>  clickhouse
    drwxr-x---  4 user user        128 <date>  data
    drwxr-x---  2 user user         64 <date>  dictionaries_lib
    drwxr-x---  2 user user         64 <date>  flags
    drwxr-x---  2 user user         64 <date>  format_schemas
    drwxr-x---  8 user user        256 <date>  metadata
    drwxr-x---  2 user user         64 <date>  metadata_dropped
    drwxr-x---  3 user user         96 <date>  preprocessed_configs
    -rw-r-----  1 user user         59 <date>  status
    drwxr-x---  4 user user        128 <date>  store
    drwxr-x---  2 user user         64 <date>  tmp
    drwxr-x---  2 user user         64 <date>  user_defined
    drwxr-x---  2 user user         64 <date>  user_files
    drwxr-x---  2 user user         64 <date>  user_scripts
    -rw-r-----  1 user user         36 <date>  uuid
    ```

    That's it! You now have the ClickHouse server up and running. Let's see how to interact with it...


{{< /detail-tag >}}


***

## 3. The ClickHouse Play UI

The ClickHouse server includes a **Play UI** for executing SQL commands. In this step you will see how to access the Play UI and run SQL commands.

{{< detail-tag "Show instructions" "3" >}}

1. Go to <a href="http://localhost:8123/play" target="_blank">http://localhost:8123/play</a> to access the Play UI:

<img src="https://clickhouse.com/learn/lessons/gettingstarted/images/playui.png" width="100%" alt="" />

2. You can simply type in SQL commands and click the **Run** button to execute them. For example, run the following command to view the pre-defined databases:
    ```sql
    SHOW DATABASES
    ```

    You should see 4 databases:

<img src="https://clickhouse.com/learn/lessons/gettingstarted/images/databases.png" width="100%" alt="" />

{{% notice note %}}
The **default** database is initially empty and is used for executing commands that do not specify a database. The **system** database is where ClickHouse stores the details about your ClickHouse deployment. 
{{% /notice %}}

3. Run the following command to view the `system` table names:
    ```sql
    SHOW TABLES IN system
    ```

    Notice there are over 60 tables. 

{{% notice note %}}
ClickHouse supports an extended SQL-like language that you will quickly become comfortable with. For example, commands like **CREATE** and **SELECT** are essentially identical to ANSI SQL.
{{% /notice %}}



{{< /detail-tag >}}

***

## 4. Defining a database and table

Defining a database will look very familiar. Defining a table involves some ClickHouse-specific details.

{{< detail-tag "Show instructions" "4" >}}


1. You use the **CREATE DATABASE** command to create a new database. Run the following command in the Play UI to define a new database named **gettingstarted**:
    ```sql
    CREATE DATABASE gettingstarted
    ```

2. You should see **gettingstarted** now in the list of databases:
    ```sql
    SHOW DATABASES
    ```

3. Creating a table is a bit different in that ClickHouse has its own data types, and every table must specify an **Engine** property that determines the type of table to be created.

    Run the following command to define a new **MergeTree** table named **clickstream** in the **gettingstarted** database:
    ```sql
    CREATE TABLE gettingstarted.clickstream (
        customer_id String, 
        time_stamp Date, 
        click_event_type String,
        country_code FixedString(2), 	
        source_id UInt64
    ) 
    ENGINE = MergeTree()
    ORDER BY (time_stamp)
    ```
{{% notice note %}}
The **table engine** determines how and where the data is stored, which queries are supported, support for concurrency, and other details that you will need to gradually understand as you work with ClickHouse. For now, we will use the **MergeTree** engine - a good starting point when you are not sure which engine you need.
{{% /notice %}}

4. Verify **clickstream** was created successfully:
    ```sql
    DESCRIBE gettingstarted.clickstream
    ```

    Your table should look like the following:

<img src="https://clickhouse.com/learn/lessons/gettingstarted/images/describetable.png" width="100%" alt="" />


{{% notice note %}}
Visit the <a href="https://clickhouse.com/docs/en/sql-reference/data-types/" target="_blank">docs</a> for more details on the various ClickHouse data types, but here are a few notes about the data types in your new table:

- The **String** type replaces VARCHAR, BLOB, CLOB and other string-like data types from other databases
- **UInt64** is a 64-bit unsigned integer
- **Date** is one of several ways to store dates in ClickHouse
- If you know the precise length of all strings in a column, then use the **FixedString(_n_)** data type
{{% /notice %}}

{{< /detail-tag >}}


***

## 5. Inserting data into ClickHouse 

Now that you have a table ready to go, let's insert some data...

{{< detail-tag "Show instructions" "5" >}}


1. A "typical" SQL **INSERT** can be used:
    ```sql
    INSERT INTO gettingstarted.clickstream 
    VALUES ('customer1', '2021-10-02', 'add_to_cart', 'US', 568239 ) 
    ```

2. You can also specify column names (always a best practice):
    ```sql
    INSERT INTO gettingstarted.clickstream (customer_id, time_stamp, click_event_type) 
    VALUES ('customer2', '2021-10-30', 'remove_from_cart' ) 
    ```

3. There is even an **EXCEPT** option for excluding columns:
    ```sql
    INSERT INTO gettingstarted.clickstream (* EXCEPT(country_code)) 
    VALUES ('customer3', '2021-11-07', 'checkout', 307493 ) 
    ```

4. You should now have three rows in your table:
    ```sql
    SELECT * FROM gettingstarted.clickstream
    ```

<img src="https://clickhouse.com/learn/lessons/gettingstarted/images/selecttable.png" width="100%" alt="" />

5. You probably have data in different formats that needs to be inserted into ClickHouse. For details on all the various supported input formats, <a href="https://clickhouse.com/docs/en/interfaces/formats/" target="_blank">check out the formats in the ClickHouse documentation</a>.

6. Play around with the Play UI and run a few **SELECT** commands to see how similar ClickHouse commands are with SQL. Here are a few examples to try out:
    ```sql
    SELECT * FROM gettingstarted.clickstream WHERE country_code = 'US'
    ```

    ```sql
    SELECT source_id FROM gettingstarted.clickstream WHERE time_stamp >= '2021-11-01'
    ```

    ```sql
    SELECT * FROM gettingstarted.clickstream WHERE time_stamp >= toDate(1633193802)
    ```

{{% notice note %}}
- The **toDate** function converts an epoch timestamp into a **Date** object
{{% /notice %}}


{{< /detail-tag >}}

***

## 6. The ClickHouse Client

The **clickhouse** binary includes a client app that connects to a ClickHouse server and allows you to execute SQL commands from a command line or shell script. The client is easy to start...

{{< detail-tag "Show instructions" "6" >}}

1. If you are not using Docker, then run the following command from within the **clickhouse** folder where you downloaded the binary:
    ```bash
    ./clickhouse client 
    ```

    <br/>

    **If you are using Docker,** execute the following command to download and run the ClickHouse client image:
    ```bash
    docker run -it --rm --link my-clickhouse-server:clickhouse-server clickhouse/clickhouse-client --host clickhouse-server
    ```

2. You should see the prompt for the ClickHouse client:
    ```bash
    $ ./clickhouse client
    ClickHouse client version 21.11.1.8277 (official build).
    Connecting to localhost:9000 as user default.
    Connected to ClickHouse server version 21.11.1 revision 54449.

    my-host :)
    ```

3. Now you can run queries as expected with any database client:
    ```sql
    SELECT * FROM gettingstarted.clickstream WHERE click_event_type = 'checkout'
    ```

4. To exit the client, enter **exit**:
    ```bash
    my-host :) exit
    Bye.
    ```

{{% notice note %}}
If you have SQL commands stored in a file, you can pipe the file into the ClickHouse client:
```bash
cat my.sql | ./clickhouse client -mn
```
{{% /notice %}}

Congratulations!! You have now started your ClickHouse journey...

{{< /detail-tag >}}

***


**What's next:** Welcome to the ClickHouse neighborhood! Check out the following lessons to continue your journey: 

- The <a href="https://clickhouse.com/learn/lessons/logsvector">Ingest Nginx Logs into ClickHouse using Vector</a> lesson demonstrates how to stream a log file into ClickHouse
- The <a href="https://clickhouse.com/learn/lessons/covidtutorial-grafana">Analyzing Covid-19 Data with Grafana and ClickHouse</a> lesson demonstrates how to connect Grafana to ClickHouse to analyze your data
- Check out <a href="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10">What's New in ClickHouse 21.10</a>
- View all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page
