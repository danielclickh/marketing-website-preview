---
title: "What's New in ClickHouse 21.10"
description: "You can now pass ClickHouse data to a custom script, materialize a new column, use positional arguments in your queries, and more."
lead: ""
date: 
lastmod: 
draft: false
images: []
toc: true

duration: "15 minutes"
audience: "Whether you are new to ClickHouse or a long-time user, you will find this lesson helpful in understanding the new features of ClickHouse 21.10"

---

**Overview:** In this lesson, you analyze some Hacker News comments using a Python script - a new feature in ClickHouse 21.10. You will also see how to define a new column based on values in other columns.

Let's get started!

***

**Prerequisites:** You will be running a Docker image that includes ClickHouse 21.10 and a sample dataset already indexed that contains some Hacker News comments, so you will need **Docker** installed if you want to follow along.

*** 


## 1. Startup ClickHouse 21.10

We have built a Docker image that already has ClickHouse installed, along with an already-populated table - so the first step is get ClickHouse up and running: 

{{< detail-tag "Show instructions" >}}

1. Assuming you have Docker installed, run the appropriate following command below for your environment to startup the Docker container:

##### On Linux, you need the `--network host` option:
```bash
docker run -it  --name clickhouse-hackernews -p 9000:9000 -p 9009:9009 -p 8123:8123 --network host --platform linux/amd64 --ulimit nofile=262144:262144 learnclickhouse/public-repo:clickhouse-hackernews-21.10
```

##### On all other environments:
```bash
docker run -it  --name clickhouse-hackernews -p 9000:9000 -p 9009:9009 -p 8123:8123 --platform linux/amd64 --ulimit nofile=262144:262144 learnclickhouse/public-repo:clickhouse-hackernews-21.10
```

2. Wait about 30 seconds for the **clickhouse-hackernews** container to startup and also for the data to get inserted into the **hackernews** table of the **default** database.

3. Point your web browser to <a href="http://localhost:8123/play" target="_blank">http://localhost:8123/play</a>. You should see the embedded ClickHouse Play UI:

<img src="./images/clickhouseui.png" width="600px" alt="" />

4. Let's run a few queries to understand what the dataset looks like. Copy-and-paste the following query into the Play UI, then click the **Run** button (or press **Ctrl/Cmd+Enter**). You will see the column names and data types of the **hackernews** table:
```sql
describe hackernews
```

5. Make sure you have 1,000 rows:
```sql
select count(*) from hackernews
```

6. View some of the data in the table:
```sql
select * from hackernews limit 100
```

You are ready to try out some of the new features... 

{{< /detail-tag >}}

*** 

## 2. Positional Arguments 

It is considered a best practice to use column names in ORDER BY and GROUP BY clauses. For example, the following query groups by **foo** then **baz**:
```sql
SELECT foo, bar, baz
FROM my_table
GROUP BY foo, baz
```

With positional arguments, the following query is identical to the previous query:
```sql
SELECT foo, bar, baz
FROM my_table
GROUP BY 1,3
```

Let's try it out...

{{< detail-tag "Show instructions" >}}

{{% notice note %}}
You need to set **enable_positional_arguments** equal to **1** in order to use positional arguments (they are disabled by default). If you are running multiple commands from the `clickhouse client`, then you can use `SET enable_positional_arguments=1;`. We are using the Play UI which does not allow multiple SQL commands, so we will need to configure that setting in a config file.
{{% /notice %}}

1. The Docker container has a volume that maps the local **my_config.xml** file to **/etc/clickhouse-server/users.d/my_config.xml**, which means its settings will get assigned when ClickHouse starts. Open **my_config.xml** and add the following XML:
```xml
<?xml version="1.0"?>
<yandex>
    <profiles>
        <default>
            <enable_positional_arguments>1</enable_positional_arguments>
        </default>
    </profiles>
</yandex>
```

2. Restart your Docker container:
```bash
docker restart clickhouse-server
```

3. Verify that **enable_positional_arguments** is set properly. You should get **1** from the following query:
```sql
SELECT getSetting('enable_positional_arguments');
```

4. Run the following query, which sorts the top 20 stories by score, then date:
```sql
SELECT  score, time, title from hackernews order by score desc, time desc limit 20
```

<img src="./images/top20stories.png" width="600px" alt="Top 20 stories by score then date" />


5. You can write an identical query using positional arguments:
```sql
SELECT  score, time, title from hackernews order by 1 desc, 2 desc limit 20
```

You should see the same 20 rows sorted in the same order as the previous query.

{{< /detail-tag >}}

*** 

## 3.  The Executable Table Engine

ClickHouse 21.10 introduces two new table engines: **Executable** and **ExecutablePool**, which both allow you to execute a query and pass the results to a custom script that you write. Let's see how they work by looking at an example.

{{< detail-tag "Show instructions" >}}

1. hello

{{< /detail-tag >}}

*** 

## 4.  The EXCEPT Operator

{{< detail-tag "Show instructions" >}}


1. d
    
{{< /detail-tag >}}


*** 

## 5.  The ANY Operator



{{< detail-tag "Show instructions" >}}

1. hello
    
{{< /detail-tag >}}

*** 

**What's next:** If you are new to ClickHouse, be sure to check out the <a href="../gettingstarted/">Getting Started</a> lesson. You can view all of our lessons on the <a href="../../index.html">Learn ClickHouse</a> home page


