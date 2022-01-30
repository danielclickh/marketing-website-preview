---
title: "Lab 4: Scaling ClickHouse"
description: ""
date: 2022-01-19
lastmod: 2022-01-19
draft: false
images: []


---

## 1. Deploy Multiple ClickHouse Servers

{{% notice note %}}
In this lab, you are going to create a replicated table - which requires a cluster of ClickHouse instances. Normally you deploy this on separate machines, but for simplicity you will just run the **clickhouse server** multiple times on your localhost.
{{% /notice %}}

1. You already have ClickHouse running on your local machine, so the first thing you need to do is stop **clickhouse server**. Just hit **Ctrl+c** in the terminal where it is running.

2. Create four new folders on your local machine (in any subfolder you wish, but name the folders **node1**, **node2**, **node3** and **node4**):
    ```bash
    mkdir ~/labs/node1
    mkdir ~/labs/node2
    mkdir ~/labs/node3
    mkdir ~/labs/node4
    ```

3. From the **node1** folder, download the appropriate build of ClickHouse. [See Lab 1 for the links](../lab1/). For example, on M1 Macs use this command:
    ```bash
    cd ~/labs/node1
    curl -O 'https://builds.clickhouse.com/master/macos-aarch64/clickhouse' && chmod a+x ./clickhouse
    ```

4. Copy the **clickhouse** binary to the **node2**, **node3** and **node4** folders:
    ```bash
    cp clickhouse ../node2
    cp clickhouse ../node3
    cp clickhouse ../node4
    ```

5. Create a new **config.xml** file in the **node1** folder that contains the following settings (copy-and-paste the following XML into a new **~/labs/node1/config.xml** file):
    ```xml
    <clickhouse>
        <logger>
            <level>information</level>
            <console>true</console>
        </logger>

        <http_port>8001</http_port>
        <tcp_port>9001</tcp_port>
    	<interserver_http_host>localhost</interserver_http_host>
    	<interserver_http_port>10001</interserver_http_port>

        <path>./</path>

        <uncompressed_cache_size>8589934592</uncompressed_cache_size>
        <mark_cache_size>5368709120</mark_cache_size>
        <mlock_executable>true</mlock_executable>

        <users>
            <default>
                <password/>
                <networks>
                    <ip>::/0</ip>
                </networks>
                <profile>default</profile>
                <quota>default</quota>
                <access_management>1</access_management>
            </default>
        </users>
        <profiles>
            <default>
            </default>
        </profiles>
        <quotas>
            <default/>
        </quotas>
    </clickhouse>
    ```

6. What ports will **node1** be using?

    {{< detail-tag >}}
Notice the **http_port** is set to `8001` (it is `8123` by default) and the **tcp_port** is set to `9001` (it is `9000` by default).
    {{< /detail-tag >}}

7. Perform the following steps:
    - copy your new **config.xml** file to the **node2**, **node3** and **node4** folders
    - configure **node2** to use port **8002**, **9002** and **10002** for HTTP, TCP, and interserver communication
    - similarly, configure **node3** to use ports **8003**, **9003** and **10003**
    - configure **node4** to use port **8004**, **9004** and **10004**

8. Open up 4 terminal windows and run **./clickhouse server** in each of the node folders. You will have ClickHouse running four times on your localhost. You should be abe to click on each of the following links below to verify that all four instances are up and running succcessfully:
    - <a href="http://localhost:8001/play" target="_blank">http://localhost:8001/play</a>
    - <a href="http://localhost:8002/play" target="_blank">http://localhost:8002/play</a>
    - <a href="http://localhost:8003/play" target="_blank">http://localhost:8003/play</a>
    - <a href="http://localhost:8004/play" target="_blank">http://localhost:8004/play</a>

## 2. Define a Cluster

1. Modify your four **config.xml** files and define a **cluster** that satisfies the following requirements:
    - the name of the cluster is **my_cluster**
    - the cluster consists of two shards
    - each shard consists of two replicas
    - put one of the shard's replicas on **node1** and **node2**
    - put the other shard's replicas on **node3** and **node4**
    - remember to set **internal_replication** to **true** for each shard!

    {{< detail-tag >}}
```xml
    <remote_servers>
        <my_cluster>
            <shard>
            <internal_replication>true</internal_replication>
            <replica>
                <host>localhost</host>
                <port>9001</port>
            </replica>
            <replica>
                <host>localhost</host>
                <port>9002</port>
            </replica>
            </shard>
            <shard>
            <internal_replication>true</internal_replication>
            <replica>
                <host>localhost</host>
                <port>9003</port>
            </replica>
            <replica>
                <host>localhost</host>
                <port>9004</port>
            </replica>
            </shard>
        </my_cluster>
    </remote_servers>
```
    {{< /detail-tag >}}

2. Add the following **zookeeper** configuration to **config.xml**, which lists the hostnames and port numbers where your cluster will be communicating with ClickHouse Keeper (or ZooKeeper):
```xml
	<zookeeper>
		<node>
			<host>localhost</host>
			<port>2001</port>
		</node>
		<node>
			<host>localhost</host>
			<port>2002</port>
		</node>
		<node>
			<host>localhost</host>
			<port>2003</port>
		</node>
	</zookeeper>
```    

3. Verify **my_cluster** is configured properly:
    ```sql
    SELECT * FROM system.clusters
    ```

You should see four replicas. Here is a subset of the reply:
```bash
┌─cluster────┬─shard_num─┬─replica_num─┬─port─┐
│ my_cluster │         1 │           1 │ 9001 │
│ my_cluster │         1 │           2 │ 9002 │
│ my_cluster │         2 │           1 │ 9003 │
│ my_cluster │         2 │           2 │ 9004 │
└────────────┴───────────┴─────────────┴──────┘
```

## 3. Configure ClickHouse Keeper

{{% notice note %}}
For replicated tables, you need a way for the replicas to communicate their status with each other. ZooKeeper historically has been used with ClickHouse (and many other tools) to fill this need. 

In this lab, you are going to configure ***ClickHouse Keeper***, which provides similar features to ZooKeeper but does not require an outside tool. ClickHouse Keeper is written in C++ and can be executed as a standalone process, or within a **clickhouse server** process (which is how you will deploy it).
{{% /notice %}}

1. Within the **config.xml** file of **node1**, add the following configuration:
    ```xml
    <keeper_server>
		<tcp_port>2001</tcp_port>
		<server_id>1</server_id>
		<log_storage_path>./coordination/log</log_storage_path>
		<snapshot_storage_path>./coordination/snapshots</snapshot_storage_path>

		<coordination_settings>
			<operation_timeout_ms>10000</operation_timeout_ms>
			<session_timeout_ms>30000</session_timeout_ms>
			<raft_logs_level>information</raft_logs_level>
		</coordination_settings>

		<raft_configuration>
			<server>
				<id>1</id>
				<hostname>localhost</hostname>
				<port>9111</port>
			</server>
			<server>
				<id>2</id>
				<hostname>localhost</hostname>
				<port>9222</port>
			</server>
			<server>
				<id>3</id>
				<hostname>localhost</hostname>
				<port>9333</port>
			</server>
		</raft_configuration>
	</keeper_server>
    ```

2. In the configuration above, what is happening on port **2001**?
    {{< detail-tag >}}
This ClickHouse Keeper instance will listen for client requests on port **2001**.
    {{< /detail-tag >}}

3. What is happening on port **9111**?
    {{< detail-tag >}}
This ClickHouse Keeper instance will communicate with the other ClickHouse Keeper instances on port **9111**.
    {{< /detail-tag >}}

4. How many servers are in this ClickHouse Keeper configuration?
    {{< detail-tag >}}
There are three. Their **id**'s are 1, 2 and 3, but you can name them whatever you like.
    {{< /detail-tag >}}

5. Copy-and-paste the XML above into the **config.xml** files for **node2** and **node3**. What do you need to change for each node?
    {{< detail-tag >}}
On **node2**, change the **server_id** to **2**. You also need to change the **tcp_port** - set it to **2002**. 

On **node3**, change the **server_id** to **3** and the **tcp_port** to **2003**. 

You do not need to change anything else - the **raft_configuration** is the same on all 3 nodes.
    {{< /detail-tag >}}

6. Changes to **config.xml** are picked up automatically, so you should now have ClickHouse Keeper running on each node. To verify, open a new terminal window and run the following **four letter word** commands (a common feature of ZooKeeper, four letter word commands are also available in ClickHouse Keeper). Run the following commands, which are short for "Are you OK?":
    ```bash
    echo ruok | nc localhost 2001
    echo ruok | nc localhost 2002
    echo ruok | nc localhost 2003
    ```

You should get a response **imok** ("I am OK") on all three nodes. You now have ClickHouse Keeper up and running, and you are ready to create a replicated table.

## 4. Configure Replica Parameters

{{% notice note %}}
The ClickHouse Keeper path needs to be the same for each shard, but each replica needs a unique name. In other words, you want to create four **ReplicatedMergeTree** tables using a single command - and that command has parameters in it ***unique to each replica***. This can be accomplished using parameter substitution - which is implemented via the **macros** section of the ClickHouse config file.
{{% /notice %}}

1.  You can add a **macros** section to **config.xml**, but let's do something different. When you need to add settings to a ClickHouse configuration, you can put multiple, individual XML files in a **config.d** folder. Start by creating a folder on **node1** named **config.d** in the **node1** folder:
    ```bash
    mkdir ~/labs/node1/config.d
    ```

2. Create a new file named **my_macros.xml** and save it in **node1/config.d** that contains the following:
```xml
<clickhouse>
    <distributed_ddl>
            <path>/clickhouse/task_queue/ddl</path>
    </distributed_ddl>
	<macros>
    		<shard>01</shard>
    		<replica>01</replica>
	</macros>
</clickhouse>
 ```

 {{% notice note %}}
If you have ClickHouse Keeper (or ZooKeeper) enabled, then you can execute DDL queries (**CREATE**, **DROP**, **ALTER** or **RENAME**) on a cluster (instead of a single instance). The queries are managed by ClickHouse Keeper, and so you need a path in ClickHouse Keeper to queue up those queries, which is what the **distributed_ddl** setting is used for.
{{% /notice %}}

3. Repeat the previous step on the other nodes so that:
    - **node2** has replica **02** of shard **01**
    - **node3** has replica **01** of shard **02**
    - **node4** has replica **02** of shard **02**

    {{< detail-tag >}}

For example, the **config.d/my_macros.xml** file on **node2** should look like the following:
```xml
<clickhouse>
    <distributed_ddl>
            <path>/clickhouse/task_queue/ddl</path>
    </distributed_ddl>
	<macros>
    		<shard>01</shard>
    		<replica>02</replica>
	</macros>
</clickhouse>
```
    {{< /detail-tag >}}

4. You can use the following query to verify your parameters are defined properly:
    ```sql
    SELECT * FROM system.macros
    ```



## 5. Create a Replicated Table

{{% notice note %}}
A table needs to be created on each node in the cluster. You can run **CREATE TABLE** four times, or you can create the table once using an **ON CLUSTER** clause, which is how you will create the table in this lab.
{{% /notice %}}

1. If you have ClickHouse Keeper configured with a **distributed_ddl** path, you can create a database on all the nodes in a cluster using the **ON CLUSTER** clause. Run the following command on any of your four nodes:
    ```sql
    CREATE DATABASE bootcamp ON CLUSTER my_cluster
    ```

2. You should see in the response that it worked and that all nodes now have the **bootcamp** database created.

3. On any of the four nodes, create a replicated table in the **bootcamp** database that satisfies the following requirements:
    - the name of the table is **my_table**
    - the table gets created on all four nodes in **my_cluster**
    - **my_table** has two **UInt32** columns named **column1** and **column2**
    - the primary key is **(column1, column2)**
    - the ClickHouse Keeper path is **/clickhouse/tables/{shard}/bootcamp/my_table**
    - the replica name is set to **{replica}**

    {{< detail-tag >}}    
```sql
CREATE TABLE bootcamp.my_table ON CLUSTER my_cluster
(
    column1 UInt32,
    column2 UInt32
)
ENGINE = ReplicatedMergeTree(
    '/clickhouse/tables/{shard}/bootcamp/my_table', 
    '{replica}'
)
ORDER BY (column1, column2)
```
    {{< /detail-tag >}}

4. Let's insert some data into your replicated table. On **node2**, run the following command:
    ```sql
    INSERT INTO TABLE bootcamp.my_table VALUES
        (1,2),
        (3,4),
        (5,6),
        (7,8),
        (9,10)
    ```

5. On **node2**, verify it worked:
    ```sql
    SELECT * FROM bootcamp.my_table
    ```

6. Run the **SELECT** query on **node1**. You should see the same response. Is that expected?
    {{< detail-tag >}}    
Yes! Your **node1** contains a replica of the shard on **node2**, so any changes made to either replica will be propogated to the other replica.
    {{< /detail-tag >}}

6. Run the same **SELECT** query on **node3**. What is the response?
    {{< detail-tag >}}    
It is empty! What is happening? Well, you inserted some rows into shard **01** of **my_table**, but shard **02** (which has replicas on **node3** and **node4**) is still empty.
    {{< /detail-tag >}}

7. On **node3**, insert the following rows so that you have data in each of your two shards:
    ```sql
    INSERT INTO TABLE bootcamp.my_table VALUES
        (11,12),
        (13,14),
        (15,16),
        (17,18),
        (19,20)
   ```

8. Run **SELECT * FROM bootcamp.my_table** on **node4** and you should get back the rows above.

9. How do query both shards?
    {{< detail-tag >}}    
In the next step, you will define a new, special table that uses the **Distributed** table engine and is configured to query both shards of **my_table**.
    {{< /detail-tag >}}

## 6. Query a Distributed Table

1. From a conceptual point of view, you have one table with two shards and four replicas. From a behind-the-scenes point of view, you have four separate tables that cleverly talk to each other using ClickHouse Keeper. Does it matter which table/shard/replica you insert data into?
    {{< detail-tag >}}    
No - not really. The replicas are independent and you can insert data into any of them. However, you do want to make sure you spread your data across the two shards evenly, so there are some details you need to be aware of when inserting data. Let's see how a table that uses the **Distributed** table engine can handle some of these details for you.
    {{< /detail-tag >}}

2. On **node1** define a new table in the **bootcamp** database that satisfies the following requirements:
    - the name of the table is **my_distributed_table**
    - it uses the same schema as **bootcamp.my_table**
    - it uses the **Distributed** table engine
    - the table points to the two shards of **my_table**
    - the table uses **column1** as its **sharding_key**
    {{< detail-tag >}}    
```sql
CREATE TABLE bootcamp.my_distributed_table
   AS bootcamp.my_table 
   ENGINE = Distributed(
      my_cluster,
      bootcamp,
      my_table,
      column1
   )
```
    {{< /detail-tag >}}

3. The following query on **node1** should return all the rows of **my_table** in both shards:
    ```sql
    SELECT * FROM bootcamp.my_distributed_table
    ```

4. On any node, insert the following row into **my_distributed_table**. Which shard did it end up on?
    ```sql
    INSERT INTO TABLE bootcamp.my_distributed_table VALUES
        (100, 101)
    ```

    {{< detail-tag >}}    
If you query just the contents of **my_table** on shard **01** (on **node1** or **node2**), you will discover that is where the new row was inserted.
    {{< /detail-tag >}}

5. Insert this row on any node, and notice it ends up on shard **02** (on **node3** and **node4**):
    ```sql
    INSERT INTO TABLE bootcamp.my_distributed_table VALUES
        (101, 102)
    ```

## 7. Insert the Hacker News Dataset

1. On **node1**, delete **my_distributed_table**:
    ```sql
    DROP TABLE bootcamp.my_distributed_table
    ```


2. Delete **my_table** from **my_cluster**.
    {{< detail-tag >}}    
```sql
DROP TABLE bootcamp.my_table ON CLUSTER my_cluster
```
    {{< /detail-tag >}}

2. Copy-and-paste the following **CREATE TABLE** command on one of nodes in **my_cluster**.
    ```sql
    CREATE TABLE bootcamp.hackernews ON CLUSTER my_cluster (
        id UInt32, 
        type String, 
        author String, 
        timestamp DateTime, 
        comment String, 
        children Array(UInt32),
        tokens Array(String)
    ) 
    ENGINE = ReplicatedMergeTree(
        '/clickhouse/tables/{shard}/bootcamp/hackernews', 
        '{replica}'
    )
    ORDER BY (id, type, toYYYYMMDD(timestamp))
    ```

3. Run the follwing **CREATE TABLE** command on **node1**, which defines a **Distributed** table for the shards of **hackernews**.
    ```sql
    CREATE TABLE bootcamp.hackernews_distributed
    AS bootcamp.hackernews 
    ENGINE = Distributed(
        my_cluster,
        bootcamp,
        hackernews,
        id
    )
    ```

4. From the **~/labs/node1/** folder, run the following command, which inserts data into the **hackernews_distributed** table:
    ```bash
    ./clickhouse client --port 9001 --query "
        INSERT INTO bootcamp.hackernews_distributed
        SELECT
            id,
            type,
            lower(author),
            timestamp,
            comment,
            children,
            extractAll(comment, '\\w+') as tokens
        FROM input('id UInt32, type String, author String, timestamp DateTime, comment String, children Array(UInt32)')
        FORMAT TSV
    " < comments.tsv
    ```

5. Run the following command on all four nodes. **node1** and **node2** should have the same rows and about half of the dataset, while **node3** and **node4** should have the other half of the dataset:
    ```sql
    SELECT * FROM bootcamp.hackernews
    ```


Well done!! That was a lot of work, but you should now have a fairly good basis for understanding how scaling and replication is accomplished in ClickHouse.


