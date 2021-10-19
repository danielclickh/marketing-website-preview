---
title: "Sentiment Analysis using ClickHouse and Python"
description: "Use the Python NLTK libraries to perform sentiment analysis on records stored in ClickHouse."
lead: ""
date: 
lastmod: 
draft: false
images: []
toc: true

duration: "30 minutes"
audience: "Anyone interested in learning how to incorporate Python with ClickHouse using the new Executable table engine"

---

**Overview:** In this lesson, we will use the Python Natural Language Toolkit (NLTK) platform to perform sentinment analysis on over 1.6 million records of Hacker News stories and comments. You will be streaming the data through a Python script using the **Eexecutable** table engine.

Let's get started!

***

**Prerequisites:** You will run a Docker Compose file with an image containing ClickHouse 21.10, Python, and a sample dataset already inserted into a table that contains Hacker News comments and stories, so you will need **Docker** installed to be able to follow along.

*** 

## 1. Startup ClickHouse 21.10

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
            image: learnclickhouse/public-repo:clickhouse-nlp-21.10
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
    describe hackernews
    ```

6. Make sure you have 1,125 rows:
    ```sql
    select count(*) from hackernews
    ```

8. View some of the data in the table:
    ```sql
    select * from hackernews limit 100
    ```

You are now ready to try out some of the new features... 

{{< /detail-tag >}}

*** 

## 2. Positional Arguments 

It is considered a best practice to use column names in ORDER BY and GROUP BY clauses. For example, the following query groups by **foo** then **baz**:

    SELECT foo, bar, baz
    FROM my_table
    GROUP BY foo, baz

With positional arguments, the following query is identical to the previous query:

    SELECT foo, bar, baz
    FROM my_table
    GROUP BY 1,3

Let's try it out...

{{< detail-tag "Show instructions" >}}

{{% notice note %}}
You need to set **enable_positional_arguments** to **1** in order to use positional arguments (they are disabled by default). You can use `SET enable_positional_arguments=1;`, but this lesson uses the Play UI which does not allow multiple SQL commands, so we will need to configure this setting in a config file.
{{% /notice %}}

1. To set the **enable_positional_arguments** property, we will take advantage of the **users.d** folder - where config files are automatically loaded at startup. Create a new file named **my_config.xml** that contains the following XML and save it in your **~/whatsnew/** folder (where you saved **docker-compose.yml**):
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

2. Uncomment the **volume** setting in your **docker-compose.yml** file that mounts your local **my_config.xml** to **/etc/clickhouse-server/users.d/**:
    ```yml
    volumes:
      - ./my_config.xml:/etc/clickhouse-server/users.d/my_config.xml
    ```

3. Restart your Docker container by running the following command in the **~/whatsnew** folder:
    ```bash
    docker-compose up -d
    ```

    The `-d` option runs the containers in the background and hides the output - feel free to omit that option if you want to view the log output.

4. Verify that **enable_positional_arguments** is set properly by running the following command in the Play UI. You should get **1** for a response:
    ```sql
    SELECT getSetting('enable_positional_arguments')
    ```

4. Run the following query, which sorts the top 20 stories by score, then date:
    ```sql
    SELECT  score, time, title from hackernews order by score desc, time desc limit 20
    ```

    <img src="./images/top20stories.png" width="600px" alt="Top 20 stories by score then date" />


5. The following query is identical, but uses positional arguments:
    ```sql
    SELECT  score, time, title from hackernews order by 1 desc, 2 desc limit 20
    ```

    You should see the same 20 rows sorted in the same order as the previous query.

{{< /detail-tag >}}

*** 

## 3.  The Executable Table Engine

ClickHouse 21.10 introduces two new table engines: **Executable** and **ExecutablePool**, which both allow you to create a new table that is built by streaming the records from a query response through a custom script. Let's see how they work by looking at an example that removes English stopwords from the Hacker News comments using the Python NLTK package.

{{< detail-tag "Show instructions" >}}

1. When you define an **Executable** table, you specify a script to execute and also a query to specify the records to be processed by the script. For example, run the following **CREATE TABLE** command that defines a new table named **comments_no_stopwords**:
    ```sql
    CREATE TABLE comments_no_stopwords (value String) ENGINE = Executable('remove_stopwords.py', 'TabSeparated', (SELECT text FROM hackernews));
    ```

{{% notice note %}}
Notice that the **comments_no_stopwords** table is built by streaming the **text** column of **hackernews** to the **remove_stopwords.py** script. The table is not populated yet, so we will write the script next. It will be populated when you run a **SELECT** query.
{{% /notice %}}

2. ClickHouse looks in the **user_scripts** folder for your custom scripts, which on Linux is (typically) in **/var/lib/clickhouse/user_scripts**. The **docker-compose.yml** file has a volume that mounts **remove_stopwords.py** to the **user_scripts** folder, so create a new file named **remove_stopwords.py** in the **whatsnew** folder.

3. Copy-and-paste the following Python into **remove_stopwords.py**. We will discuss the important pieces next:
    ```python
    #!/usr/local/bin/python

    import sys
    import nltk

    from nltk.tokenize import word_tokenize

    nltk.download('punkt')
    nltk.download('stopwords')
    stopwords = nltk.corpus.stopwords.words("english")


    def main():
        for comment in sys.stdin:
            words_in_comment = word_tokenize(comment)
            comment_no_stopwords = [word for word in words_in_comment if word.lower() not in stopwords]
            print( ' '.join(comment_no_stopwords) + "\n" )

    if __name__ == "__main__":
        main()
    ```

4. Make sure the Python file is executable:
    ```bash
    chmod +x remove_stopwords.py
    ```

5. Notice inside **main()** there is a **for** loop that reads from **stdin**:
    ```python
    for comment in sys.stdin:
    ```
    The results of **SELECT text FROM hackernews** (as defined in the table definition) are streamed to **remove_stopwords.py** via the standard input, sending a block of rows (about 64k) at a time. 

6. Notice that for each row sent to **remove_stopwords.py**, the **comment** (which is the value of the **text** field in **hackernews**) is tokenized into words, then the stopwords are removed:
    ```python
    words_in_comment = word_tokenize(comment)
    comment_no_stopwords = [word for word in words_in_comment if word.lower() not in stopwords]
    ```

7. How does the script write data back to the ClickHouse table? By printing tab-delimited rows to **stdout**. The output of the following line of code gets inserted into the **comments_no_stopwords** table in the **value** column (which you will notice in the table definition):
    ```python
    print( ' '.join(comment_no_stopwords) + "\n" )
    ```

8. Uncomment the following volume in **docker-compose.yml**:
    ```bash
       - ./remove_stopwords.py:/var/lib/clickhouse/user_scripts/remove_stopwords.py
    ```

9. Restart your Docker container by running the following command in the **~/whatsnew** folder:
    ```bash
    docker-compose up -d
    ```

10. Your Python script still has not executed yet...but it will when you run a query on the **comments_no_stopwords** table. Run the following query, and it should execute fairly quickly since **hackernews** only has about 1,100 rows:
    ```sql
    select * from comments_no_stopwords
    ```

{{% notice note %}}
Use the **max_command_execution_time** property to specify a maximum execution time (in seconds) before throwing an exception. The default is 0, which means your script could run indefinitely.
{{% /notice %}}

11. In the response, you should see the Hacker News comments, but without any stopwords. They will look like the following - notice stopwords like "the", "is", "and" and so on are removed from the text:
    ```bash
    installed iOS4 iPhone 3G saw crawl becoming iPaperWeight . horribly slow launching every app keyboard slow unusable.
    ```

{{% notice note %}}
If you have millions (or billions) of rows, check out **ExecutablePool** - which runs a pool of persistent processes specified by the **pool_size** property.
{{% /notice %}}

{{< /detail-tag >}}

*** 

## 4.  Limiting the Query Log

When you submit a query to ClickHouse, the start and end time of the query is logged in a table named **system.query_log**. If your application is processing a large number of queries per second, then logging those query details can add a lot of load to your system. With the new **log_queries_probability** property, you can reduce that load by only logging a subset of those queries. Let's see how it works...

{{< detail-tag "Show instructions" >}}


1. Run the following query to view the **system.query_log** table:
    ```sql
    select * from system.query_log
    ```

You should see all the queries that you have executed so far in this lesson. Notice that successful queries have two entries in the table: **QueryStart** and **QueryFinish**.

2. Sort the results so that the most recent logs appear first:
    ```sql
    select * from system.query_log order by event_time_microseconds desc
    ```

3. The default value of **log_queries_probability** is **1**, which means 100% of queries will be logged. Run the following query three times, then look in the **system.query_log** table - you will see that all 3 executions were logged.
    ```sql
    SELECT  max(score) as max_score, toDate(time) as day, any(title) as any_title from hackernews group by day order by max_score desc limit 10
    ```

4. Now let's change the value of **log_queries_probability** to 0.25, so that only 25% of queries get logged. Create a new file named **log_query_config.xml** and save it in your **~/whatsnew/** folder:
    ```xml
    <?xml version="1.0"?>
    <yandex>
        <profiles>
            <default>
          <log_queries_probability>0.25</log_queries_probability>
            </default>
        </profiles>
    </yandex>
    ```

5. Uncomment the following line in **docker-compose.yml** to mount the XML file to **/etc/clickhouse-server/users.d/**:
    ```yml
    - ./log_query_config.xml:/etc/clickhouse-server/users.d/log_query_config.xml
    ```

6. Restart the Docker container:
    ```bash
    docker-compose up -d
    ```

7. Run the following query 10 times - a simple query that returns 20 random rows:
    ```sql
    SELECT  * from hackernews order by rand() limit 20
    ```

8. View the **system.query_log** table again:
    ```sql
    select * from system.query_log order by event_time_microseconds desc
    ```

    Notice that only 3 of the 10 queries were logged. 

{{% notice note %}}
If you set **log_queries_probability** to **0**, no queries will get logged in **system.query_log**.
{{% /notice %}}

{{< /detail-tag >}}


*** 

## 5.  Materialize a Column

When you add a new column to a table that involves a computation, you might want to **_materialize the column_** - which performs the computation for all the columns all at once using the **MATERIALIZE COLUMN** command.

{{% notice note %}}
If you do not materialize the column, then the values are computed at the time of a SELECT. That may work well for some use cases, but by materializing the column at definition time, you can increase the performance of your queries because all the row will already have performed the computation.
{{% /notice %}}

{{< detail-tag "Show instructions" >}}

1. Let's add a column to the **hackernews** table that computes the length of the comment string (the column named **text**). Start by adding a new column and defining a default value:
    ```sql
    ALTER TABLE hackernews ADD COLUMN comment_length UInt64 MATERIALIZED length(text)
    ```
    
2. Note that this command returns immediately because it is an asynchronous operation. The new **comment_length** column is being populated in the background, but it runs quickly on our particular dataset.

3. Run the following query to view the new column:
    ```sql
    select text, comment_length from hackernews limit 50
    ```

    You should see the **text** column along with a **comment_length** column containing the number of characters in **text**.


{{< /detail-tag >}}

*** 

**What's next:** If you are new to ClickHouse, be sure to check out the <a href="../gettingstarted/">Getting Started</a> lesson. You can view all of our lessons on the <a href="https://clickhouse.com/learn/">Learn ClickHouse</a> home page


