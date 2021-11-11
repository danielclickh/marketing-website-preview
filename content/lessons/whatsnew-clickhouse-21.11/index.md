---
title: "What's New in ClickHouse 21.11"
description: "Scriptable UDFs, predefined connections to external data sources, running clickhouse-local in interactive mode, and more."
lead: ""
date: 
lastmod: 
draft: false
images: []
toc: true
gated: false

duration: "15 minutes"
audience: "Whether you are new to ClickHouse or a long-time user, you will find this lesson helpful in understanding the new features of ClickHouse 21.11"

---

**Overview:** In this lesson, we will use some Spotify data to demonstrate some of the new features of ClickHouse 21.11, including writing scriptable UDFs, predefining a database connection in a config file, and more.

Let's get started!

***

**Prerequisites:** You will need **Docker** installed to be able to follow along.

*** 

## 1. Startup ClickHouse 21.11

Let's startup ClickHouse 21.11 using a Docker Compose file...

{{< detail-tag "Show instructions" "1" >}}

1. Start by creating a folder to work in. For practical purposes, we will call it **whatsnew-21.11**:
    ```bash
    mkdir ~/whatsnew-21.11
    cd ~/whatsnew-21.11
    ```

2. In your **whatsnew-21.11** folder, create a new file named **docker-compose.yml** that contains the following:
    ```yml
    version: '3.7'

    services:
        clickhouse-server:
            image: learnclickhouse/public-repo:clickhouse-spotify-21.11
            container_name: clickhouse-server
            hostname: clickhouse-server
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

        postgres:
            image: postgres
            container_name: postgres
            hostname: postgres
            ports:
                - "5432:5432"
            restart: always
            environment:
                POSTGRES_PASSWORD: my_password
            command: [ "postgres", "-c", "wal_level=logical", "-c", "max_replication_slots=4"]
    ```

3. Start up the **docker-compose.yml** file;
    ```bash
    docker-compose up -d
    ```

4. Point your web browser to <a href="http://localhost:8123/play" target="_blank">http://localhost:8123/play</a>. You should see the embedded ClickHouse Play UI:

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10/images/playui.png" width="100%" alt="" />

5. Feel free to run a few queries to understand what the dataset looks like. (**NOTE:** The startup script has a 15-second sleep in it to make sure everything starts up properly before inserting data...so you may have to wait a moment.) Copy-and-paste the following query into the Play UI, then click the **Run** button (or press **Ctrl/Cmd+Enter**). You will see the column names and data types of the **hackernews** table:
    ```sql
    describe spotify.songs
    ```

    You should see 1,000,000 rows:
    ```sql
    SELECT count(*) FROM spotify.songs
    ```

    ```sql
    SELECT * FROM spotify.songs ORDER BY Streams DESC LIMIT 1000
    ```

    You are now ready to try out some of the new features... 

{{< /detail-tag >}}

*** 


## 2. Run clickhouse-local in Interactive Mode

The **clickhouse-local** tool has been around for a while, and <a href="https://clickhouse.com/docs/en/operations/utilities/clickhouse-local/" target="_blank">feel free to visit its documentation page</a> to view all the usage parameters. It is similar to **clickhouse-client**, except **clickhouse-local** does not connect to a running server. The **clickhouse-local** utility allows you to perform fast processing on local files using most of the features and the same set of formats and table engines as a ClickHouse server, without the need to deploy and configure a server. 

What's new is that you can now run **clickhouse-local** in **_interactive mode_**. Let's see how it works...

{{< detail-tag "Show instructions" "2" >}}

1. Run the following command to connect to the Docker container:
    ```bash
    docker exec -it clickhouse-server /bin/bash
    ```

2. Start **clickhouse-local** in interactive mode by _not_ specifying a **--query** or **--queries_file** option. Run the following command:
    ```bash
    clickhouse-local
    ```

3. You should see the following interactive prompt:
    ```bash
    root@clickhouse-server:/# clickhouse-local
    <jemalloc>: MADV_DONTNEED does not work (memset will be used instead)
    <jemalloc>: (This is the expected behaviour if you are running under QEMU)
    ClickHouse local version 21.11.2.2 (official build).

    clickhouse-server :)
    ```
4. You can run the usual SQL commands at the prompt, like **SHOW DATABASES**:
    ```sql
    SHOW DATABASES
    ```

{{% notice note %}}
Notice there is a database named **INFORMATION_SCHEMA** - which is **a new feature of 21.11**! This new database improves ClickHouse's compatibility with SQL-92.
{{% /notice %}}

5. Run the following command to view the tables in **INFORMATION_SCHEMA**:
    ```sql
    SHOW TABLES IN INFORMATION_SCHEMA
    ```

6. Let's query a file that is stored up in S3. Run the following command, which uses the **url** function to create a table in memory based on the TSV file, then finds the artist who, at some point in time, had a day in which one of their songs was the most-streamed song on Spotify:
    ```sql
    SELECT DISTINCT Artist 
    FROM url(
        'https://learnclickhouse.s3.us-east-2.amazonaws.com/datasets/data.tsv',
        'TSV',
        'Position UInt32, TrackName String, Artist String, Streams UInt64, URL String, Date date, Region FixedString(2)'
    ) 
    WHERE Streams >= 1000000     
    ```

7. Let's create a new local CSV file based on a subset of the data in the TSV file in S3:
    ```sql
    SELECT Artist, TrackName, Streams, Date
    FROM url(
        'https://learnclickhouse.s3.us-east-2.amazonaws.com/datasets/data.tsv',
        'TSV',
        'Position UInt32, TrackName String, Artist String, Streams UInt64, URL String, Date date, Region FixedString(2)'
    ) 
    WHERE Streams >= 500000
    INTO OUTFILE 'popular-songs.csv' FORMAT CSV 
    ```
    
7. Let's view the new file - exit **clickhouse-local**:
    ```bash
    exit
    ```

8. View the file and see if it worked:
    ```bash
    more popular-songs.csv
    ```

    It should look like the following:
    ```bash
    "Migos","Bad and Boujee (feat. Lil Uzi Vert)",1371493,"2017-01-01"
    "Drake","Fake Love",1180074,"2017-01-01"
    "The Weeknd","Starboy",1064351,"2017-01-01"
    "The Chainsmokers","Closer",1010492,"2017-01-01"
    "Rae Sremmurd","Black Beatles",874289,"2017-01-01"
    "DRAM","Broccoli (feat. Lil Yachty)",763259,"2017-01-01"
    "Drake","One Dance",753150,"2017-01-01"
    ```

{{% notice note %}}
Notice how convenient it can be to query a text file using the **clickhouse-local** utility. You could use that capability to wrangle and transform your data - similar to tools like `xsv`, `textql`, and `jq`.
{{% /notice %}}

{{< /detail-tag >}}

***


## 3.  Defining an Executable User-Defined Function (UDF)

ClickHouse can call any external executable program or script to process data. You configure the script in an XML file - which includes the path to your executable script. Let's see how it works...

{{< detail-tag "Show instructions" "3" >}}

1. UDFs are configured in XML config files. Let's define a simple function to demonstrate how UDFs are deployed. Create a new file in the **~/whatsnew-21.11** folder named **my_function.xml** that contains the following:
    ```xml
    <functions>
        <function>
            <type>executable</type>
            <name>get_disk_usage</name>
            <return_type>UInt64</return_type>
            <format>TabSeparated</format>
            <command>df -m | grep overlay | awk {'printf $3'}</command>
            <lifetime>0</lifetime>
        </function>
    </functions>
    ```

{{% notice note %}}
There is a setting in **config.xml** named **user_defined_executable_functions_config** that is set to ***_function.xml**, which means that either 1) your function config files need to end in **_function.xml** or 2) you need to redefine this property.
{{% /notice %}}

2. Your XML file needs to be stored in the **user_files** folder of your ClickHouse server, which for our deployment is in **/var/lib/clickhouse**. Run the following command to copy the function's XML config into the **user_files** folder on the ClickHouse server:
    ```bash
    docker cp my_function.xml clickhouse-server:/etc/clickhouse-server
    ```

3. At the Play UI, run the following command to have ClickHouse load your new function:
    ```bash
    SYSTEM RELOAD FUNCTIONS
    ```

4. Run the following command to verify it worked - your function should return:
    ```sql
    SELECT * FROM system.functions WHERE name = 'get_disk_usage'
    ```

5. Test your function with the following command:
    ```sql
    SELECT get_disk_usage()
    ```

{{< /detail-tag >}}

*** 

## 4.  Predefined Database Connections

ClickHouse 21.11 introduces the ability to define connections to external data sources in XML config files. In addition to the convenience, it also allows you to hide the credentials and location of your data sources.

{{< detail-tag "Show instructions" "4" >}}

1. We have Postgres running in a Docker container named **postgres** with a password of **my_password**. In the **~/whatsnew-21.11** folder, create a new XML file named **my_postgres_connection.xml** that contains the following:
    ```xml
    <yandex>
        <named_collections>
            <my_postgres>
                <user>postgres</user>
                <password>my_password</password>
                <host>postgres</host>
                <port>5432</port>
            </my_postgres>
        </named_collections>
    </yandex>
    ```

2. The file goes in **config.d**, so use the following command to copy it there:
    ```bash
    docker cp my_postgres_connection.xml clickhouse-server:/etc/clickhouse-server/config.d/
    ```

3. We will have to restart the ClickHouse server for the new config file to get picked up:
    ```bash
    docker restart clickhouse-server
    ```

4. Let's test it. On Linux or Windows, run the following command to connect to Posgres using **psql**:
    ```bash
    docker run -it --rm postgres psql -h localhost -U postgres
    ```

    On a **Mac**, use the following command:
    ```bash
    docker run -it --rm postgres psql -h host.docker.internal -U postgres
    ```

    The password is **my_password**.

5. Define the following **orders** table:
    ```sql
    CREATE TABLE orders (
        id serial NOT NULL PRIMARY KEY, 
        order_date TIMESTAMP NOT NULL,
        description varchar(120) NOT NULL, 
        price float,
        quantity integer,
        shipped boolean
    );
    ```

6. Now insert a few rows:
    ```sql
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-24', 'iPhone 13', 1299.95, 1, false);
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-23', 'Galaxy S21', 1379.95, 1, true);
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-24', 'Google Pixel 6', 499.00, 2, false);
    ```

7. Back in the Play UI for ClickHouse, create the following table (to match the Postgres table):
    ```sql
    CREATE TABLE postgres_orders (
        id UInt64, 
        order_date DateTime,
        description String, 
        price Float,
        quantity UInt32,
        shipped UInt8
    )
    ENGINE PostgreSQL(my_postgres, database='postgres', table='orders')
    ```

{{% notice note %}}
The first argument to the engine is **my_postgres**, which is the name of your predefined connection in the XML config file.
{{% /notice %}}

8. Now view the contents of the new ClickHouse table - it should contain the 3 rows from the **orders** table in Postgres:
    ```sql
    SELECT * FROM postgres_orders
    ```

{{% notice note %}}
You can define **database** and **table** in the XML file as well, but here we demonstrated how some properties can configured as **key=value** pairs in the Engine constructor. 
{{% /notice %}}

{{< /detail-tag >}}

*** 

## 5.  The New session_log Table

There is a new **system** table named **session_log** that logs all successul and failed login attempts, as well as logout events. Let's check it out...

{{< detail-tag "Show instructions" "5" >}}


1. This one is easy to demonstrate because you have been logging in and out of your ClickHouse server every time you run a query in the Play UI. Run this one:
    ```sql
    SELECT * FROM system.query_log
    ```

    You should see a list of **LoginSuccess** and **Logout** events:

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10/images/session_log.png" width="100%" alt="Session Log Table" />


2. It is easy to generate a failed login attempt. In the Play UI, change the username from **default** to **nobody** (or anything) and run the query again:

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10/images/change_user.png" width="100%" alt="Change User" />

You should see an authentication failed error.

3. Change the user name back to **default**, then run the following query - you should get 1 hit:
    ```sql
    SELECT * FROM system.session_log WHERE type = 'LoginFailure'
    ```

Your failed login should appear in the results:

<img src="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10/images/failed_login.png" width="100%" alt="Failed Login" />


{{< /detail-tag >}}


*** 



**What's next:** If you are new to ClickHouse, be sure to check out the <a href="https://clickhouse.com/learn/lessons/gettingstarted/">Getting Started</a> lesson. You can view all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page.


