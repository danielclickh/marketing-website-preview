---
title: "Replicating PosgreSQL Tables to ClickHouse"
description: "Learn how to replicate a table in Postgres to a table in ClickHouse using the MaterializedPostgreSQL database engine."
date: 2021-10-24
lastmod: 2021-10-24
draft: false
images: []
toc: true
duration: "15 minutes"
audience: "Anyone who wants to replicate Postgres data to ClickHouse"
gated: false

---

**Overview:** In this lesson, you will use Docker to startup a ClickHouse container and Postgres container, define a Postgres table, then replicate it to a ClickHouse database. 

Let's get started!

***

**Prerequisites:** You will need **Docker** installed if you want to follow along.

*** 

## 1. Startup Postgres and ClickHouse

You will startup a **docker-compose.yml** file that has ClickHouse 21.10 and a uses the latest **postgres** image.

{{< detail-tag "Show instructions" "1" >}}

1. Let's start by creating a local folder to work in (feel free to name the folder anything you like):
    ```bash
    mkdir ~/postgres
    cd ~/postgres
    ```

2. Create a new file named **docker-compose.yml**, and copy-and-paste the following into it:
    ```yml
    version: '3.7'
    services:
        clickhouse-server:
            image: learnclickhouse/public-repo:clickhouse-server-21.10
            container_name: clickhouse-server
            hostname: clickhouse-server
            ports:
                - "9000:9000"
                - "8123:8123"
                - "9009:9009"
            restart: always
            tty: true
            ulimits:
                memlock:
                    soft: -1
                    hard: -1
                nofile:
                    soft: 262144
                    hard: 262144
            deploy:
                resources:
                    limits:
                        memory: 2g
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
                POSTGRES_PASSWORD: password
            command: [ "postgres", "-c", "wal_level=logical", "-c", "max_replication_slots=4"]    
    ```

3. From a terminal, run the following command from the **~/postgres** folder where you created **docker-compose.yml**:
    ```bash
    docker-compose up
    ```

{{% notice note %}}
Notice that the startup command for **postgres** sets **wal_level** to **logical**, which is required for replication to work. The value of **max_replication_slots** must also be greater than or equal to 2.
{{% /notice %}}

{{< /detail-tag >}}

*** 

## 2. Define and populate the Postgres table

Let's define the table in Postgres to be replicated...

{{< detail-tag "Show instructions" "2" >}}

1. On **Linux** or **Windows**, run the following command to connect to Posgres using **psql**:
    ```bash
    docker run -it --rm postgres psql -h localhost -U postgres
    ```

    On a **Mac**, use the following command:
    ```bash
    docker run -it --rm postgres psql -h host.docker.internal -U postgres
    ```

2. The password is **password** (as defined in the **docker-compose.yml** file).

3. Define the following **orders** table, which is a simple table that was specifically chosen to demonstrate mapping a few data types to ClickHouse:
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

4. Now insert a few rows:
    ```sql
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-24', 'iPhone 13', 1299.95, 1, false);
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-23', 'Galaxy S21', 1379.95, 1, true);
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-24', 'Google Pixel 6', 499.00, 2, false);
    ```

{{% notice note %}}
When you define the ClickHouse database, it will perform an initial data dump - so these initial rows will be inserted into ClickHouse automatically.  
{{% /notice %}}

5. Leave the **psql** prompt open - you will use it again later.

{{< /detail-tag >}}

***

## 3. Define a MaterializedPostgreSQL database

You have two options for replicating Postgres tables to ClickHouse:

- the <a href="https://clickhouse.com/docs/en/engines/table-engines/integrations/materialized-postgresql/" target="_blank">MaterializedPostgreSQL table engine</a>, which replicates a single table
- the <a href="https://clickhouse.com/docs/en/engines/database-engines/materialized-postgresql/" target="_blank">MaterializedPostgreSQL database engine</a>, which can replicate multiple tables

We will take a look at the database engine, but both are configured similarly.

{{< detail-tag "Show instructions" "3" >}}

1. In a new terminal, run the following command to connect to your ClickHouse container:
    ```bash
    docker exec -it clickhouse-server /bin/bash
    ```

2. Startup the **clickhouse-client**:
    ```bash
    clickhouse-client
    ```

3. The **MaterializedPostgreSQL** database engine is experimental, so you will need to set the following property in order to use it:
    ```sql
    SET allow_experimental_database_materialized_postgresql=1
    ```

4. Run the following command to create the **MaterializedPostgreSQL** database:
    ```sql
    CREATE DATABASE orders_replicated
    ENGINE = MaterializedPostgreSQL(
        'postgres:5432',
        'postgres',
        'postgres',
        'password'
    )
    SETTINGS materialized_postgresql_max_block_size =65536,
             materialized_postgresql_tables_list ='orders'
    ```

{{% notice note %}}
The **MaterializedPostgreSQL** engine parameters are:
- `host:port`
- `database`
- `username`
- `password`
{{% /notice %}}

5. Asynchronously, the data in the **orders** table of Postgres is being inserted into a new table in the **orders_replicated** database. Verify it worked by running the following commands:
    ```sql
    SELECT * FROM orders_replicated.orders
    ```

    You should see the same three rows that were in the Postgres table!

6. Let's see how ClickHouse mapped the data types from Postgres:
    ```sql
    DESCRIBE orders_replicated.orders
    ```    

{{< /detail-tag >}}

***

## 4. Add rows to the Postgres table

Let's see what happens when you add data to the Postgres table...

{{< detail-tag "Show instructions" "4" >}}


1. From the **psql** prompt, add two new rows to the **orders** table in Postgres:
    ```sql
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-25', 'iPhone X', 600.00, 3, false);
    INSERT INTO orders (order_date, description, price, quantity, shipped) VALUES ('2021-10-25', 'Samsung Galaxy Z Flip 3', 999.99, 1, true);
    ```

2. Back at the **clickhouse-client** prompt, verify that these two new rows appear in the **orders_replicated.orders** table:
    ```sql
    SELECT * FROM orders_replicated.orders
    ```

    Notice the new rows are automatically replicated over to the corresponding ClickHouse table.

{{< /detail-tag >}}

***


**What's next:** Well done! Notice how easy replication is achieved - the **MaterializedPostgreSQL** is doing all the work for you. Check out the following lessons to continue your journey: 

- The <a href="https://clickhouse.com/learn/lessons/logsvector">Ingest Nginx Logs into ClickHouse using Vector</a> lesson demonstrates how to stream a log file into ClickHouse
- The <a href="https://clickhouse.com/learn/lessons/covidtutorial-grafana">Analyzing Covid-19 Data with Grafana and ClickHouse</a> lesson demonstrates how to connect Grafana to ClickHouse to analyze your data
- Check out <a href="https://clickhouse.com/learn/lessons/whatsnew-clickhouse-21.10">What's New in ClickHouse 21.10</a>
- View all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page
